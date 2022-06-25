require 'open-uri'
require 'zip'
require 'fileutils'
require 'http'




class ProcessDropJob
  include Sidekiq::Worker
  # download media files
  # scarcity # of times, create duplicates, modifying json and filename
  # save them in a single dir
  # zip it up.
  # put it on nft storage
  # save to database (you'll need to add a column)
  # call candy machine job.
  # ... check candy machine jobs
  # ... something tell campus legends
  # profit!

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
      open(image_url) do |image|
        path = File.realdirpath(File.join(directory, "0.png"))
        File.open(path, "w+") do |file|
          file.write(image.read)
        end
      end
      
      open(video_url) do |image|
        path = File.realdirpath(File.join(directory, "0.mp4"))
        File.open(path, "w+") do |file|
          file.write(image.read)
        end
      end
      File.open(File.realdirpath(File.join(directory, "0.json")), "w+") do |file|
        file.write(image.read)
      end

      (1...scarcity.to_i).each do |n|
        FileUtils.cp(File.join(directory, "0.json"),  File.realdirpath(File.join(directory, "#{n}.json")))
        FileUtils.cp(File.join(directory, "0.mp4"), File.realdirpath(File.join(directory, "#{n}.mp4")))
        FileUtils.cp(File.join(directory, "0.mp4"), File.realdirpath(File.join(directory, "#{n}.mp4")))
      end

      zip_dir = File.realdirpath("zip")
      if File.directory?(zip_dir) 
        FileUtils.remove_dir(zip_dir) # make sure we start fresh every job
      end
      Dir.mkdir(zip_dir)
      zipfile_path = File.join("zip", "#{metadata["_id"].to_s}")
      zipper = ZipFileGenerator.new(directory,  File.realdirpath(zipfile_path))
      zipper.write


      api_instance = NFTStorage::NFTStorageAPI.new

      begin

        token = ENV.fetch("NFT_STORAGE_TOKEN", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJmQTVkRjFCODQyNGJBRjg2NjAzMDRFNDVENmMzOGVlNDY1ZDE0MDMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1NjEwOTU1MzM5MiwibmFtZSI6ImNhbXB1cyJ9.5UyOHRRJjbvmwgjX6bDdHrBogZnHByXCKTuteNV3jyk")
        response = HTTP
        .auth("Bearer #{token}")
        .headers(
          "accept" => 'application/json',
          "Content-Type" => 'application/zip',
        )
        .post('https://api.nft.storage/upload',
          body: File.read(zipfile_path)
          
        )
        puts "**** NFT STORAGE RESULT ****"
        puts response
        puts "**** NFT STORAGE RESULT ****"
      rescue NFTStorage::ApiError => e
        puts "Error when calling NFTStorageAPI->store: #{e}"
      end
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
    entries = Dir.entries(@input_dir) - %w[. ..]

    ::Zip::File.open(@output_file, create: true) do |zipfile|
      write_entries entries, '', zipfile
    end
  end

  private

  # A helper method to make the recursion work.
  def write_entries(entries, path, zipfile)
    entries.each do |e|
      zipfile_path = path == '' ? e : File.join(path, e)
      disk_file_path = File.join(@input_dir, zipfile_path)

      if File.directory? disk_file_path
        recursively_deflate_directory(disk_file_path, zipfile, zipfile_path)
      else
        put_into_archive(disk_file_path, zipfile, zipfile_path)
      end
    end
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