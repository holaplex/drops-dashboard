require 'rails_helper'

RSpec.describe 'Tokens', type: :request do
  password = '123456'
  email = 'lorem@ipsum.com'

  let!(:user) { User.create(email: email, password: password) }

  it 'succesfully returns an access_token' do
    post '/api/v1/oauth/token',
         params: {
           'grant_type': 'password',
           'email': email,
           'password': password,
         }

    aggregate_failures 'response should be complete' do
      parsed_response = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(parsed_response['access_token']).not_to be_nil
      expect(parsed_response['refresh_token']).not_to be_nil
      expect(parsed_response['token_type']).to eq 'Bearer'
    end
  end

  it 'refreshes expired tokens' do
    expired_token =
      Doorkeeper::AccessToken.find_or_create_for(
        application: nil,
        resource_owner: user,
        scopes: {},
        expires_in: 0,
        use_refresh_token: true,
      )

    post '/api/v1/oauth/token',
         params: {
           'grant_type': 'refresh_token',
           'refresh_token': expired_token.refresh_token,
         }

    aggregate_failures 'response should be complete' do
      parsed_response = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(parsed_response['access_token']).not_to be_nil
      expect(parsed_response['refresh_token']).not_to be_nil
      expect(parsed_response['token_type']).to eq 'Bearer'
    end
  end
end
