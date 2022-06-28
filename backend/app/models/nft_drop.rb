class NftDrop < ApplicationRecord
  has_many :nft

  #### NFT DROP STATUSES ####
  IN_REVIEW = 'in_review' # starting state
  PROCESSING = 'processing' # building candy machines
  LIVE = 'onchain' # candy machines created
  ########################


end
