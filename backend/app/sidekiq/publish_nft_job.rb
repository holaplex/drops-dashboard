require 'http'
class PublishNftJob
  include Sidekiq::Worker

  # # register the candy machine with xmint
  # # update the status in the database
  # # ping api.campuslegends.com to set it live
  def perform(nft_id)
    nft = Nft.find(nft_id)
    reponse = register_cm_with_crossmint(nft)

    collection_id = response.data['collection_id']

    # TODO: createa collection_id column
    Nft.update(
      xmint_colllection_id: collection_id
    )

    ### publish to campuslegends
    ## TO DO HANDLE FAILUE OF POST REQUEST :D 
    resp = HTTP.post('https://api.campuslegends.com/api/v1/publish', 
      body: {
      drop_name: nft.name,
      nft: [
        {
          name: nft.name,
          description: nft.description,
          sku: nft.sku,
          upi: nft.upo,
          scarcity: nft.scarcity,
          creator: nft.creator,
          royalty_matrix: nft.royalty_matrix,
          award: nft.award,
          fan_ranking_points: nft.fan_ranking_points,
          unlock: nft.unlock, 
          candymachine_address: nft.cm_address,
          client_id: nft.client_id,
          sol_price: nft.price_in_sol,
          image_url: nft.cm_image_url,
          video_url: nft.cm_video_url,
          preview_url: nft.preview_url,
          # collections: "", # TODO: Figure this out if needed
          conference: nft.conference.name,
          school: nft.school.name,
          sport: nft.sport.name,
          athlete: nft.legend,
      }
      ]
    })

  end

  def register_cm_with_crossmint(nft)

    project_id = ENV.fetch('X-PROJECT-ID')
    client_secret = ENV.fetch('X-CLIENT-SECRET')

    response = HTTP
    .headers(
      "accept" => 'application/json',
      "Content-Type" => 'application/json',
      "X-PROJECT-ID" => project_id,
      "X-CLIENT-SECRET" => client_secret,
      "Content-Type" => 'application/zip',
    )
    .post('https://www.crossmint.io/api/v1-alpha1/collections',
      body: 
        {
          "contractType": "candy-machine",
          "chain": "solana",
          "args": {
            "candyMachineId": nft.cm_address
          },
          "metadata": {
            "title": nft.name,
            "description": nft.description,
            "imageUrl": nft.gallery_url
          }
        }
    )
    response
  end
end
