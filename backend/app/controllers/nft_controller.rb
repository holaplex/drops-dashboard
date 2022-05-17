class NftController < ApplicationController
  require 'roo'
  # Read the file, populate database,
  def upload
    file = params[:file]

    xlsx = Roo::Spreadsheet.open(file)

    #     pp params
    nft_drop = NftDrop.create(name: params[:name])

    tabs = xlsx.sheets
    nfts = []
    tabs.each do |tab|
      sheet = xlsx.sheet(tab)
      last = sheet.last_row + 1

      # Advance our row number to the first row that has "NFT Name" in it.
      i = 0
      i += 1 while sheet.row(i)[0] != 'NFT Name' && i < last

      headers = sheet.row(i)
      i += 2
      while i < last
        unless sheet.row(i)[0].nil?
          nft = Nft.import_from_spreadsheet_row(sheet.row(i), headers, tab, nft_drop[:id])
          image_id = nft[:gallery_url].split('d/', -1)[1].split('/v', -1)[0]
          final_media_id = nft[:final_url].split('d/', -1)[1].split('/v', -1)[0]
          nft_image = GoogleService.get_drive_media(image_id, 'gallery')
          nft_final_media = GoogleService.get_drive_media(final_media_id, 'final')
          nft[:gallery_filename] = nft_image
          nft[:final_filename] = nft_final_media
          nfts.push(nft)
        end
        i += 1
      end
    end
    render json: { success: true, nfts: nfts}, status: :ok
  end
end
