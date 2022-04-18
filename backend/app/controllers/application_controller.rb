# frozen_string_literal: true

class ApplicationController < ActionController::API
  # protect_from_forgery unless: -> { request.format.json? }
  before_action :devise_configure_permitted_parameters, if: :devise_controller?

  # This is how one would protect a resource, can be used in any controller:
  # before_action :doorkeeper_authorize! # Require access token for all actions

  # Overrides devise current_user method to also be possibly used with Doorkeeper
  def current_user
    @current_user ||=
      if doorkeeper_token
        puts 'Setting it up!'
        User.find(doorkeeper_token.resource_owner_id)
      else
        warden.authenticate(scope: :user)
      end
  end

  protected

  def devise_configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
  end
end
