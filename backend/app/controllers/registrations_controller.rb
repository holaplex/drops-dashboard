# frozen_string_literal: true

class RegistrationsController < Devise::RegistrationsController
  def create
    user = User.new(sign_up_params)
    puts sign_up_params
    if user.save
      access_token = Doorkeeper::AccessToken.find_or_create_for(
        application: nil,
        resource_owner: user,
        scopes: {},
        expires_in: Doorkeeper.configuration.access_token_expires_in.to_i,
        use_refresh_token: true
      )

      render json: {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          user_type: user.user_type,
          token: {
            token_type: 'bearer',
            access_token: access_token.token,
            expires_in: access_token.expires_in,
            refresh_token: access_token.refresh_token,
            created_at: access_token.created_at.to_time.to_i
          }
        }
      }
    else
      render json: { messages: user.errors.full_messages }, status: 422
    end
  end
end
