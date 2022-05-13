class GoogleService
  # I hate google almost as much as I hate DHH.
    require "google/apis/drive_v3"
    require "googleauth"
    require "googleauth/stores/file_token_store"
    require "fileutils"

    OOB_URI = "urn:ietf:wg:oauth:2.0:oob".freeze
    APPLICATION_NAME = "drop-dashboard".freeze
    CREDENTIALS_PATH = "./google-client-secret.json".freeze

    TOKEN_PATH = "token.yaml".freeze
    SCOPE = Google::Apis::DriveV3::AUTH_DRIVE_METADATA_READONLY

    def self.authorize
        client_id = Google::Auth::ClientId.from_file CREDENTIALS_PATH
        token_store = Google::Auth::Stores::FileTokenStore.new file: TOKEN_PATH
        authorizer = Google::Auth::UserAuthorizer.new(client_id, SCOPE, token_store, "http://localhost:1")
        user_id = "default"
        credentials = authorizer.get_credentials user_id
        if credentials.nil?
          url = authorizer.get_authorization_url
          code = "4/0AX4XfWim0ki4YWp16H1ftvyinCdIVIFMz4GndOJ-MEUqjAS9tzX_dkapJSFxSXrIBAoRFw"
          credentials = authorizer.get_and_store_credentials_from_code(
            user_id: user_id, code: code, base_url: OOB_URI
          )
        end
        credentials
      end

    def self.get_drive_media(id, type)
        begin
          file_extension = type == "gallery" ? "jpg" : "mp4"
        drive_service = Google::Apis::DriveV3::DriveService.new
        drive_service.client_options.application_name = APPLICATION_NAME
        drive_service.authorization = authorize

        response = drive_service.get_file(id, supports_all_drives: true, download_dest: "./tmp/image/#{id}.#{file_extension}")
        return "#{id}.#{file_extension}" 
        rescue => error
          puts "An error occurred: #{error}"
        end
    end
end