class NftDrop < ApplicationRecord
  has_many :nft

  def with_image
    nft.first[:gallery_filename] unless nft.empty?
  end
end
