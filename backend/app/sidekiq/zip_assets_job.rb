require 'zip'
require 'fileutils'
require 'http'
require 'json'
require 'open-uri'




class ZipAssetsJob
  include Sidekiq::Worker


  def perform(metadata, image_url, video_url, scarcity)
    puts "**** RUNNING DROP JOB ****"
    puts metadata
    puts image_url
    puts video_url
    puts scarcity
    puts "^^^ RUNNING DROP JOB ^^^^"
    begin
      directory = File.realdirpath(metadata["_id"].to_s)
      if File.directory?(directory) 
        FileUtils.remove_dir(directory) # make sure we start fresh every job
      end
      Dir.mkdir(directory)
      URI.open(image_url) do |image|
        path = File.realdirpath(File.join(directory, "0.png"))
        File.open(path, "w+") { |file| file.write(image.read) }
      end
      
      URI.open(video_url) do |image|
        path = File.realdirpath(File.join(directory, "0.mp4"))
        File.open(path, "w+") do |file|
          file.write(image.read)
        end
      end
      File.open(File.realdirpath(File.join(directory, "0.json")), "w+") do |file|
        file.write(JSON.dump(metadata))
      end

      (1...scarcity.to_i).each do |n|
        puts "making files #{n}"
        FileUtils.cp(File.join(directory, "0.json"),  File.realdirpath(File.join(directory, "#{n}.json")))
        FileUtils.cp(File.join(directory, "0.png"), File.realdirpath(File.join(directory, "#{n}.png")))
        FileUtils.cp(File.join(directory, "0.mp4"), File.realdirpath(File.join(directory, "#{n}.mp4")))
      end

      puts "files generated based on scarcity of #{scarcity} !!!!"

      zip_dir = File.realdirpath("zip_#{metadata["_id"]}")
      if File.directory?(zip_dir) 
        FileUtils.remove_dir(zip_dir) # make sure we start fresh every job
      end
      Dir.mkdir(zip_dir)
      zipfile_path = File.join(zip_dir, "#{metadata["_id"].to_s}.zip")
      zipper = ZipFileGenerator.new(directory,  File.realdirpath(zipfile_path))
      zipper.write

      puts "zipping done !!!"
      nft = Nft.find(metadata["_id"].to_i)
      nft.update(
        zipped_assets_uri: zipfile_path
        status: Nft::ZIPPED
      )

    rescue StandardError => e
      puts "Drop job error: #{e}"
    end


  end
end

class ZipFileGenerator
  # Initialize with the directory to zip and the location of the output archive.
  def initialize(input_dir, output_file)
    @input_dir = input_dir
    @output_file = output_file
  end

  # Zip the input directory.
  def write
    puts "zipping!"
    entries = Dir.entries(@input_dir) - %w[. ..]

    ::Zip::File.open(@output_file, create: true) do |zipfile|
      write_entries(entries, '', zipfile)
      zipfile.close
    end
    puts "all zipped up"
  end


  private

  # A helper method to make the recursion work.
  def write_entries(entries, path, zipfile)
    entries.each do |e|
      zipfile_path = path == '' ? e : File.join(path, e)
      disk_file_path = File.join(@input_dir, zipfile_path)
      puts "zipping #{disk_file_path}"

      if File.directory? disk_file_path
        recursively_deflate_directory(disk_file_path, zipfile, zipfile_path)
      else
        put_into_archive(disk_file_path, zipfile, zipfile_path)
      end
    end
    puts "zipped every file"

  end

  def recursively_deflate_directory(disk_file_path, zipfile, zipfile_path)
    zipfile.mkdir zipfile_path
    subdir = Dir.entries(disk_file_path) - %w[. ..]
    write_entries subdir, zipfile_path, zipfile
  end

  def put_into_archive(disk_file_path, zipfile, zipfile_path)
    zipfile.add(zipfile_path, disk_file_path)
  end
end