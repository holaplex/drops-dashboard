class AddStatusToNftDropTable < ActiveRecord::Migration[5.2]
  def change
    add_column :nft_drops, :status, :string, default: 'Waiting'
  end
end
