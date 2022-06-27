class ConvertNftIdToUuid < ActiveRecord::Migration[5.2]
  def change
    enable_extension 'uuid-ossp'
    add_column :nfts, :uuid, :uuid, default: "uuid_generate_v4()", null: false

    change_table :nfts do |t|
      t.remove :id
      t.rename :uuid, :id
    end

    execute "ALTER TABLE nfts ADD PRIMARY KEY (id);"
  end
end
