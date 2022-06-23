class NftController < ApplicationController
  require 'roo'

  def upload_excel
    file = params[:file]

    xlsx = Roo::Spreadsheet.open(file)

    nft_drop = NftDrop.create(name: params[:name])

    tabs = xlsx.sheets
    nfts = []
    tabs.each do |tab|
      sheet = xlsx.sheet(tab)
      last = sheet.last_row + 1

      i = 0
      i += 1 while sheet.row(i)[0] != 'NFT Name' && i < last

      headers = sheet.row(i)
      i += 2
      while i < last
        unless sheet.row(i)[0].nil?
          nft = Nft.import_from_spreadsheet_row(sheet.row(i), headers, tab, nft_drop[:id])
          image_id = nft[:gallery_url].split('d/', -1)[1].split('/v', -1)[0]
          final_media_id = nft[:final_url].split('d/', -1)[1].split('/v', -1)[0]
          nft_image = GoogleService.get_drive_media(image_id, 'gallery', nft_drop.name)
          nft_final_media = GoogleService.get_drive_media(final_media_id, 'final', nft_drop.name)
          nft[:gallery_filename] = "/#{nft_drop.name}/#{nft_image}".gsub(' ', '_')
          nft[:final_filename] = "/#{nft_drop.name}/#{nft_final_media}".gsub(' ', '_')
          path = nft.make_watermark("./public/images#{nft[:final_filename]}",nft_final_media, nft_drop.name)
          Net::SCP.upload!("assets.campuslegends.com", "assets",
            path, "/home/assets/assets/images/preview-videos", 
            :ssh => { :keys => "new_key", :passphrase => 'new_key' })
          nft[:preview_url] = "https://assets.campuslegends.com/images/preview-videos/#{nft_final_media}"

          nft[:nft_drop_id] = nft_drop[:id]
          nft.save!
          nfts.push(nft)

          json = {
            name: nft[:name],
            symbol: 'TDO', # TODO
            description: nft[:description],
            seller_fee_basis_points: nft[:royalty_matrix], # TODO: ????????
            image: nft[:cm_image_url], # TODO: ???
            animation_url: nft[:cm_video_url], # TODO: ???
            collection: {
              name: nft[:collection_id].to_s, # TODO: very wrong and bad fix this
              family: '', # TODO
            },
            attributes: [
              # TODO: uh...do we store this anywhere?
              { trait_type: '', value: nil },
            ],
            external_url: '', # TODO: ? what even is this
            properties: {
              files: [
                # TODO: enumerate the files, i guess??
                { uri: '', type: '' },
              ],
              # TODO: um...
              category: '',
              creators: [
                # TODO: same as attributes...where is this?
                { address: '', share: -1 },
              ],
            },
          }

          # TODO: like literally all of this
          json = JSON.dump(json)

          pp 'JSON', json
        end
        i += 1
      end
    end
    render json: { success: true, nfts: nfts, drop_name: nft_drop[:name], drop_id: nft_drop[:id] }, status: :ok
  end

  def upload_minted
    file = params[:file]
    drop = NftDrop.find(params[:drop_id])
    drop.status = 'Mint Completed'
    drop.save!
    tmp = file.tempfile
    destiny_file = File.join('public', 'uploads', file.original_filename)
    FileUtils.move tmp.path, destiny_file

    render json: { success: true, drop: drop }, status: :ok
  end
end
