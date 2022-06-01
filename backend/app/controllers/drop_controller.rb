class DropController < ApplicationController
  require 'http'
  def index
    drops = NftDrop.all

    render json: { success: true, drops: drops }, status: :ok
  end

  def submit
    drop = NftDrop.find(params[:drop_id])
    nfts_json = mount_json(drop.id)
    File.open("./public/images/#{drop.name.gsub(' ', '_')}/#{drop.name}.json", 'w') do |f|
      file = f.write(nfts_json.to_json)
    end

    render json: { success: true, nfts: nfts_json, drop_name: drop.name }, status: :ok
  end

  def publish
    drop = NftDrop.find(params[:drop_id])
    drop.status = 'Published'
    drop.save!
    nfts_json = mount_json(drop.id)
    render json: { success: true, nfts: nfts_json, drop_name: drop.name }, status: :ok
  end

  def show
    drop = NftDrop.find(params[:drop_id])
    nft = drop.nft

    render json: { success: true, drop_name: drop.name, nfts: nft }, status: :ok
  end

  private

  def mount_json(drop_id)
    drop = NftDrop.find(drop_id)
    nfts = drop.nft

    nfts_json = []
    nfts.each do |nft|
      collection = nft.collection ? nft.collection.name : nil
      school_hash = nft.school
      school = school_hash[:name]
      conference = school_hash.conference.name

      nft_json = {
        'name' => nft.name,
        'description' => nft.description,
        'sku' => nft.sku,
        'upi' => nft.upi,
        'scarcity' => nft.scarcity,
        'creator' => nft.creator,
        'royalty_matrix' => nft.royalty_matrix,
        'award' => nft.award,
        'fan_ranking_points' => nft.fan_ranking_points,
        'unlock' => nft.unlock,
        'candymachine_address' => nft.cm_address,
        'client_id' => nft.clientId,
        'sol_price' => nft.price_in_sol,
        'image_url' => nft.cm_image_url,
        'video_url' => nft.cm_video_url,
        'preview_url' => nft.preview_url,
        'athlete' => nft.legend,
        'sport' => nft.sport,
        'collection' => collection,
        'school' => school,
        'conference' => conference
      }
      nfts_json << nft_json
    end
    nfts_json
  end
end
