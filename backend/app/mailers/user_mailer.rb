class UserMailer < ApplicationMailer

    def forgot_password
      @user = User.find(params[:user_id])
      raw, hashed = Devise.token_generator.generate(User, :reset_password_token)
      @user.reset_password_token = hashed
      @user.reset_password_sent_at = Time.now.utc
      @user.save
      @token = raw
      @url = "http://localhost:3001/reset-password/#{@token}"
      mail(to: @user.email, subject: 'Forgot password')
    end
  end