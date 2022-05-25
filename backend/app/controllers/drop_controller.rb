class DropController < ApplicationController
  def index
    drops = NftDrop.all

    render json: { success: true, drops: drops }, status: :ok
  end

  def show
    drop = NftDrop.find(params[:drop_id])
    nft = drop.nft

    render json: { success: true, drop_name: drop.name, nfts: nft }, status: :ok
  end
end
