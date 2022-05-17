class CreateNftDrop < ActiveRecord::Migration[5.2]
  def change
    create_table :nft_drops do |t|
      t.string :name
      t.timestamps
    end
  end
end
