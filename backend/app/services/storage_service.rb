class StorageService
  class << self
    def download(path)
      result = client.get_object(
        bucket: 'ergodriven-updates',
        key: path
      )

      Base64.encode64(result.body.string)
    end

    def upload(name, file)
      file_name = '/tmp/' + name

      File.open(file_name, 'wb') do |f|
        f.write(Base64.decode64(file))
      end

      result = client.put_object(
        bucket: 'drop-dashboard',
        key: name,
        body: IO.read(file_name)
      )
    end

    def client
      cred = Aws::Credentials.new(ENV['AWS_ACCESS_KEY_ID'], ENV['AWS_SECRET_ACCESS_KEY'])
      sns = Aws::S3::Client.new(region: 'us-west-2', credentials: cred)
    end
  end
end
