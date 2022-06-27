class NftController < ApplicationController
  require 'roo'

  def zip
    nft =  Nft.find params[:id]

    data = File.read(nft.zipped_assets_uri)

    send_data(data, filename: 'assets.zip')
  end

  def callback
    # {candyMachineId: candyMachine, creator: walletKeyPair.publicKey.toBase58(), guid: guid}
    nft = Nft.find(params[:guid])

    nft.update(
      cm_address: params[:candyMachineId],
      status: Nft::ONCHAIN
    )


    
    
    # async 
    # # register the candy machine with xmint
    # # update the status in the database
    # # ping api.campuslegends.com to set it live

    render json: {}, status: :ok

  end

  def upload_excel
    file = params[:file]

    xlsx = Roo::Spreadsheet.open(file,  extension: :xlsx)

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
          nft[:gallery_filename] = "/#{nft_drop.name}/#{nft_image[:name]}".gsub(' ', '_')
          nft[:final_filename] = "/#{nft_drop.name}/#{nft_final_media[:name]}".gsub(' ', '_')
          # path = nft.make_watermark("./public/images#{nft[:final_filename]}",nft_final_media, nft_drop.name)
          # Net::SCP.upload!("assets.campuslegends.com", "assets",
          #   path, "/home/assets/assets/images/preview-videos", 
          #   :ssh => { :keys => "new_key", :passphrase => 'new_key' })
          # nft[:preview_url] = "https://assets.campuslegends.com/images/preview-videos/#{nft_final_media[:name]}"

          nft[:nft_drop_id] = nft_drop[:id]
          nft.save!
          nfts.push(nft)

          seller_fee_basis_points = nft[:royalty_matrix]&.to_i 
          seller_fee_basis_points =  [10000, seller_fee_basis_points].min

          attributes_list = [
            {
              trait_type: "legend",
              value: nft.legend
            },
            {
              trait_type: "conference",
              value: nft.conference&.name,
            },
            {
              trait_type: "school",
              value: nft.school&.name,
            },
            {
              trait_type: "sport",
              value: nft.sport,
            },
            {
              trait_type: "award",
              value: nft.award,
            },
          ]

          category = nft.cm_video_url.present? ? 'video' : 'image'

          # 0.json, 0.png

          payload = {
            _id: nft.id,
            name: nft[:name],
            symbol: 'CLHP',
            description: nft[:description],
            seller_fee_basis_points: seller_fee_basis_points,
            image: '0.png',
            animation_url: '0.mp4',
            attributes: attributes_list,
            external_url: 'campus.io',
            properties: {
              category: category,
              files: [
                { uri: '0.png', type: 'image/png' },
                { uri: '0.mp4', type: 'video/mp4' },
              ],
              creators: [
                { address: 'campEwCXkqfySan6a7R71BTBSurfLsfqHgShC11J3Bj', share: 100 },
              ],
            },
          }



          ZipAssetsJob.perform_async(
            payload,
            nft_image[:destination],
            nft_final_media[:destination],
            nft.scarcity.to_s,
          )

          pp 'JSON', payload
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
