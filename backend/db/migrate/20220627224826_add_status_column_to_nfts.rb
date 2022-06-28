class AddStatusColumnToNfts < ActiveRecord::Migration[5.2]
  def change
    add_column :nfts, :status, :string, default: 'initialized'
  end
end
