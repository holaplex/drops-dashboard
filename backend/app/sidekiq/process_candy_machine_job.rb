# TODO find a better place for this
module CandyMachineFactory
  # Configure GraphQL endpoint using the basic HTTP network adapter.
  HTTP = GraphQL::Client::HTTP.new("https://factory.holaplex.tools/graphql")
  Schema = GraphQL::Client.load_schema(HTTP)
  Client = GraphQL::Client.new(schema: Schema, execute: HTTP)
  CreateCandyMachine = Client.parse  <<-'GRAPHQL'
    mutation createCandyMachine(
      $config: JSON!
      $filesZipUrl: String!
      $encryptedKeypair: EncryptedMessage!
      $env: String!
      $rpc: String!
      $collectionMint: String!
      $setCollectionMint: Boolean!
    ) {
      candyMachineUpload(
        config: $config
        filesZipUrl: $filesZipUrl
        encryptedKeypair: $encryptedKeypair
        env: $env
        rpc: $rpc
        collectionMint: $collectionMint
        setCollectionMint: $setCollectionMint
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
    @drop = NftDrop.find id_hash[:drop_id]
    @solana_price = get_solana_price

    CandyMachineFactory::Client.query(
      CandyMachineFactory::CreateCandyMachine, 
      variables: { 
        config: config.to_json,
        filesZipUrl: String!
        # encryptedKeypair: EncryptedMessage!
        env: 'mainnet',
        rpc: 'https://holaplex.rpcpool.com/',
        collectionMint: String!
        setCollectionMint: true
      })
  end

  def get_solana_price
    response = HTTP.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
    )
    response["solana"]["usd"]
  end

  def config
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
      "storage": "arweave",
      "ipfsInfuraProjectId": nil;,
      "ipfsInfuraSecret": nil,
      "awsS3Bucket": nil,
      "nftStorageKey": # need this
      "noRetainAuthority": false,
      "noMutable": false
    }
  end
end