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
