# frozen_string_literal: true

class UsersController < ::ApplicationController
  before_action :doorkeeper_authorize!, only: %i[me index]

  def me
    render json: current_user
  end

  def index
    render json: User.all
  end

  def forgot_password
    email = params[:email]
    puts request.host_with_port
    if email.present?
      @user = User.find_by(email: email)

      if @user.present?
        UserMailer.with(user_id: @user.id, host: request.host_with_port, ssl: request.ssl?).forgot_password.deliver
        render json: { message: 'Email sent' }
      else
        render json: { message: 'Email not found' }, status: :not_found
      end
    else
      render json: { message: 'Email not provided' }, status: :bad_request
    end
  end

  def reset_password
    @user = User.with_reset_password_token(params[:reset_password_token])
    if @user.present?
      @user.reset_password(params[:password], params[:password])
      @user.save
      render json: { message: 'Password reset' }
    else
      render json: { error: 'Token not found' }, status: :not_found
    end
  end
end
