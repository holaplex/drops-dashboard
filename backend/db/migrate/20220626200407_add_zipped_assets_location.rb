class AddZippedAssetsLocation < ActiveRecord::Migration[5.2]
  def change
     add_column :nfts, :zipped_assets_uri, :string
  end
end
