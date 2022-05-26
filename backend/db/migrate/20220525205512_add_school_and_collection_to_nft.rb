class AddSchoolAndCollectionToNft < ActiveRecord::Migration[5.2]
  def change
    add_reference :nfts, :school, foreign_key: true
    add_reference :nfts, :collection, foreign_key: true
  end
end
