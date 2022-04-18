# frozen_string_literal: true

class UsersController < ::ApplicationController
  before_action :doorkeeper_authorize!, only: %i[me index]

  def me
    render json: current_user
  end

  def index
    render json: User.all
  end
end
