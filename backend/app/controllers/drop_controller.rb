class  DropController < ApplicationController
  
  def index
    drops = NftDrop.all

    render json: { success: true, drops: drops }, status: :ok
  end
end
