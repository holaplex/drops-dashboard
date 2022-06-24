require 'open-uri'
require 'zip'
require 'fileutils'
require 'nft_storage'

# setup authorization
NFTStorage.configure do |config|
  config.access_token = ENV.fetch("NFT_STORAGE_TOKEN", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJmQTVkRjFCODQyNGJBRjg2NjAzMDRFNDVENmMzOGVlNDY1ZDE0MDMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1NjEwOTU1MzM5MiwibmFtZSI6ImNhbXB1cyJ9.5UyOHRRJjbvmwgjX6bDdHrBogZnHByXCKTuteNV3jyk")
end



class ProcessDropJob
  include Sidekiq::Job
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
    directory = File.realdirpath(metadata["_id"])
    Dir.mkdir(directory)
    open(image_url) do |image|
      File.open(File.join(directory, "0.png"), "wb") do |file|
        file.write(image.read)
      end
    end
    
    open(video_url) do |image|
      File.open(File.join(directory, "0.mp4"), "wb") do |file|
        file.write(image.read)
      end
    end

    (1...scarcity).each do |n|
      FileUtils.cp(File.join(directory, "0.png"), File.join(directory, "#{n}.png"))
      FileUtils.cp(File.join(directory, "0.mp4"), File.join(directory, "#{n}.mp4"))
    end

    zipfile_path = "."
    zipper = ZipFileGenerator.new(directory, zipfile_path)
    zipper.write


    api_instance = NFTStorage::NFTStorageAPI.new
    body = File.open(zipfile_path) # File | 

    begin
      # Store a file
      result = api_instance.store(body)
      puts result
    rescue NFTStorage::ApiError => e
      puts "Error when calling NFTStorageAPI->store: #{e}"
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