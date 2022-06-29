class AddXMintCollectionIdToNfts < ActiveRecord::Migration[5.2]
  def change
    add_column :nfts, :xmint_colllection_id, :string
  end
end
