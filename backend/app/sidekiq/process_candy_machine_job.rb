# TODO find a better place for this
require "graphql/client"
require "graphql/client/http"
module CandyMachineFactory
  # Configure GraphQL endpoint using the basic HTTP network adapter.
  HTTP = GraphQL::Client::HTTP.new("https://factory.holaplex.tools/graphql")
  Schema = GraphQL::Client.load_schema(HTTP)
  Client = GraphQL::Client.new(schema: Schema, execute: HTTP)
  CreateCandyMachine = Client.parse  <<-'GRAPHQL'
    mutation(
      $config: JSON!
      $filesZipUrl: String!
      $keyPair: String!
      $env: String!
      $rpc: String!
      $collectionMint: String!
      $setCollectionMint: Boolean!
      $guid: String!
      $callbackUrl: String!
    ) {
      candyMachineUpload(
        config: $config
        filesZipUrl: $filesZipUrl
        keyPair: $keyPair
        env: $env
        rpc: $rpc
        collectionMint: $collectionMint
        setCollectionMint: $setCollectionMint
        guid: $guid
        callbackUrl: $callbackUrl
      ) {
        processId
      }
    }

  GRAPHQL

end


class ProcessCandyMachineJob
  include Sidekiq::Worker
  attr_accessor :nft, :drop, :solana_price

  def perform(id_hash)
    @nft = Nft.find id_hash[:nft_id]
    @solana_price = get_solana_price

    keypair = ENV.fetch('KEYPAIR')
    host = ENV.fetch('HOST')

    collectionMint = 'B1q23k6N7MWKuxyWQtpUvh8noKgU9EY6fsorZnPHmLKm'

    puts CandyMachineFactory::Client.schema
    response = CandyMachineFactory::Client.query(
      CandyMachineFactory::CreateCandyMachine, 
      variables: { 
        config: config,
        filesZipUrl: "#{host}/api/v1/nfts/#{@nft.id}/zip",
        keyPair: keypair,
        env: 'mainnet',
        rpc: 'https://holaplex.rpcpool.com/',
        collectionMint: collectionMint,
        setCollectionMint: true,
        guid: @nft.id,
        callbackUrl: "#{host}/api/v1/nfts/callback",
      }.tap{|h| p h})

    pid = response.data&.candy_machine_upload&.process_id
    puts pid

      return if pid&.empty?

      @nft.update(status: Nft::SUBMITTED)
  end

  def get_solana_price
    response = HTTP.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
    )
    json = JSON.parse(response.body)
    json["solana"]["usd"]
  end

  def config
    nft_storage_token = ENV.fetch('NFT_STORAGE_TOKEN')
    {
      "price": nft.price / solana_price,
      "number": nft.scarcity.to_i,
      "gatekeeper": nil,
      "solTreasuryAccount": "2YZwtDSEeu3Tnmh6bbPwWWXJywTX9jGW6jbb1Sn2Z9Pj", # campus corporate pubkey
      "splTokenAccount": nil,
      "splToken": nil,
      "goLiveDate": Time.now.to_i,
      "endSettings": nil,
      "whitelistMintSettings": nil,
      "hiddenSettings": nil,
      "storage": "nft-storage",
      "ipfsInfuraProjectId": nil,
      "ipfsInfuraSecret": nil,
      "awsS3Bucket": nil,
      "nftStorageKey": nft_storage_token,
      "noRetainAuthority": false,
      "noMutable": false
    }
  end
end
