class AddFieldsToDropsTable < ActiveRecord::Migration[5.2]
  def change
    add_column :nft_drops, :go_live_date, :string
    add_column :nft_drops, :discoverable, :boolean, default: false
    add_column :nft_drops, :accessible, :boolean, default: false
  end
end
