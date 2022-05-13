class GoogleService
    require "google/apis/drive_v3"
    require "googleauth"
    require "googleauth/stores/file_token_store"
    require "fileutils"

    OOB_URI = "urn:ietf:wg:oauth:2.0:oob".freeze
    APPLICATION_NAME = "drop-dashboard".freeze
    CREDENTIALS_PATH = "./google-client-secret.json".freeze
    # The file token.yaml stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
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
          code = "4/0AX4XfWjgOUVpEX_ZVg6s75zXTatpirzf5Wg4leKN3-o3DbK1LG9pgMlAzTmN0ukzDlTJOA"
          credentials = authorizer.get_and_store_credentials_from_code(
            user_id: user_id, code: code, base_url: OOB_URI
          )
        end
        credentials
      end

    def self.get_file_from_drive(id)
        # Initialize the API
        drive_service = Google::Apis::DriveV3::DriveService.new
        drive_service.client_options.application_name = APPLICATION_NAME
        drive_service.authorization = authorize

        response = drive_service.get_file(id, supports_all_drives: true)
    end
  
end