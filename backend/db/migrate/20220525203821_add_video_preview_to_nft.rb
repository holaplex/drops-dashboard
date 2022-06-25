class AddVideoPreviewToNft < ActiveRecord::Migration[5.2]
  def change
    unless column_exists?(:nfts, :preview_url) 
      add_column :nfts, :preview_url, :string
    end
  end
end
