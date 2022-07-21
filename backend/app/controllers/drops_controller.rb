class DropsController < ApplicationController
  before_action :get_drop, only: %i[update show]
  require 'http'
  def index
    drops = NftDrop
            .left_joins(:nft)
            .select('nft_drops.*, nfts.gallery_filename')
            .uniq

    render json: { success: true, drops: drops }, status: :ok
  end

  def show
    render json: { success: true, drop: @drop }, include: [:nft], status: :ok
  end

  def update
    @drop.update(drop_params)
    return render json: { success: true, message: 'Drop updated successfully!', drop: @drop }, include: [:nft], status: :ok if @drop.save

    unless @drop.save
      render json: { success: false, error: 'Error while updating drop', errors: @drop.errors },
             status: :unprocessable_entry
    end
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
    drop.status = 'processing candy machine'
    drop.save!

    drops.nfts.each do |nft|
      ProcessCandyMachineJob.perform_async({
                                             nft_id: nft.id,
                                             drop_id: drop.id
                                           })
    end

    nfts_json = mount_json(drop.id)
    render json: { success: true, nfts: nfts_json, drop_name: drop.name }, status: :ok
  end

  private

  def get_drop
    @drop = NftDrop.find_by(id: params[:id]) if params[:id]
    return render json: { success: false, message: 'Drop not found!' }, status: 404 unless @drop
  end

  def drop_params
    params.permit(:name, :status, :go_live_date, :accessible, :discoverable)
  end

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
