class NftController < ApplicationController
  require 'roo'
  # Read the file, populate database,
  def upload
    file = params[:file]

    xlsx = Roo::Spreadsheet.open(file)
    # pp 'XLSL', xlsx

    tabs = xlsx.sheets
    nfts = []
    tabs.each do |tab|
      # pp 'TAB', tab
      sheet = xlsx.sheet(tab)
      last = sheet.last_row + 1

      # Advance our row number to the first row that has "NFT Name" in it.
      i = 0
      i += 1 while sheet.row(i)[0] != 'NFT Name' && i < last

      headers = sheet.row(i)

      i += 2
      while i < last
        unless sheet.row(i)[0].nil?
          nft = Nft.import_from_spreadsheet_row(sheet.row(i), headers, tab)
          image_id = nft[:gallery_url].split('d/', -1)[1].split('/v', -1)[0]
          final_media_id = nft[:final_url].split('d/', -1)[1].split('/v', -1)[0]
          nft_image = GoogleService.get_drive_media(image_id, 'gallery')
          nft_final_media = GoogleService.get_drive_media(final_media_id, 'final')
          nfts.push({ nft_image: nft_image, nft_final_media: nft_final_media, nft_id: nft[:id] })
        end
        i += 1
      end
    end
    pp nfts
    render json: { success: true, nfts: nfts }, status: :ok
  end
end
