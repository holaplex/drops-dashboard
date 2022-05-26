class AddVideoPreviewToNft < ActiveRecord::Migration[5.2]
  def change
    add_column :nfts, :preview_url, :string
  end
end
