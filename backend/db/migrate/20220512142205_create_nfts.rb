class CreateNfts < ActiveRecord::Migration[5.2]
  def change
    create_table :nfts do |t|
      t.string :name
      t.string :description
      t.string :sku
      t.string :upi
      t.integer :scarcity
      # t.references :collection, null: true, foreign_key: true
      t.string :gallery_url
      t.string :gallery_filename
      t.string :final_url
      t.string :final_filename
      t.string :creator
      t.integer :royalty_matrix
      t.string :legend
      # t.references :school, null: true, foreign_key: true
      t.string :sport
      t.string :award
      t.string :fan_ranking_points
      t.string :unlock
      t.float :price, default: 0.0
      t.string :currency, default: 'USD'
      t.string :drop_name
      t.string :gallery_type
      t.string :final_type
      t.string :cm_address
      t.string :cm_image_url
      t.string :cm_video_url
      t.string :clientId
      t.string :price_in_sol
      t.string :sol_usdt
      t.string :sol_usdt_when
      t.timestamps
    end
  end
end
