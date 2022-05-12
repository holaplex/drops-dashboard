class NftController < ApplicationController
  require 'roo'
  # Read the file, populate database,
  def upload
    file = params[:file]

    xlsx = Roo::Spreadsheet.open(file)
    # pp 'XLSL', xlsx

    tabs = xlsx.sheets

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
        nft = Nft.import_from_spreadsheet_row(sheet.row(i), headers, tab) if sheet.row(i)[0]
        pp 'NFT', nft
        i += 1
      end
    end
    render json: { success: true }, status: :ok
  end
end
