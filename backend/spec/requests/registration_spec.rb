require 'rails_helper'

RSpec.describe 'Tokens', type: :request do
  let(:email) { 'lorem@ipsum.com' }
  let(:password) { '123456' }

  it 'succesfully returns an access_token' do
    post '/api/v1/users', params: { user: { email: email, password: password } }

    aggregate_failures 'response should be complete' do
      parsed_response = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(parsed_response['id']).not_to be_nil
      expect(parsed_response['email']).to eq email
    end
  end
end
