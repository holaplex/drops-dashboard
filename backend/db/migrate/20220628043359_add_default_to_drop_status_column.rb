class AddDefaultToDropStatusColumn < ActiveRecord::Migration[5.2]
  def change
    change_column_default :nft_drops, :status, NftDrop::IN_REVIEW
  end
end
