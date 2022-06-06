class Nft < ApplicationRecord
  belongs_to :collection, optional: true
  belongs_to :school, optional: true
  belongs_to :nft_drop, optional: true
  has_one :conference, through: :school
  def self.import_from_spreadsheet_row(row, headers, drop_name = nil, drop_id)
    map = {
      nft_name: :name, nft_description: :description, "edition_/_scarcity": :scarcity, edition_scarcity: :scarcity,
      gallery_image: :gallery_url, final_media: :final_url, gallery_image_asset: :gallery_url,
      final_media_asset: :final_url
    }

    hash = {}
    row.each_with_index do |val, idx|
      sym = headers[idx].parameterize.gsub(/-/, '_').to_sym
      sym = map[sym] if map[sym]
      hash[sym] = val
    end

    import_from_hash(hash, drop_name, drop_id)
  end

  def self.import_from_hash(hash, _drop_name = nil, drop_id)
    hash[:nft_drop_id] = drop_id
    if !hash[:price].blank? && hash[:price].is_a?(String)
      p = begin
        hash[:price].sub(/[$\t ]/, '').to_f
      rescue StandardError
        nil
      end
      hash[:price] = p
    end

    if !hash[:fan_ranking_points].blank? && hash[:fan_ranking_points].is_a?(String)
      hash[:fan_ranking_points] = begin
        hash[:fan_ranking_points].gsub(/[^0-9.]/, '').to_i
      rescue StandardError
        nil
      end
    end

    fields = hash.slice(:name, :description, :sku, :upi, :scarcity, :gallery_url, :fan_ranking_points, :unlock,
                        :final_url, :creator, :royalty_matrix, :legend, :sport, :award, :price, :drop_name, :nft_drop_id)
    pp 'FIELDS', fields
    nft = Nft.where(final_url: hash[:final_url]).first_or_initialize(fields)

    # if nft.errors.count > 0
    #   raise "#{hash[:name]} had errors!"
    # else
    # nft.drop_name ||= drop_name
    nft.upi = nft.upi.gsub(/[.][0-9]$/, '') unless nft.upi.blank?
    if !nft.school && !hash[:school].blank?
      nft.school = School.where(name: hash[:school]).first_or_initialize(conference: Conference.where(name: hash[:conference]).first_or_initialize)
    end
    if !nft.collection && !hash[:collection].blank?
      nft.collection = Collection.where(name: hash[:collection]).first_or_initialize
    end
    nft.save!
    nft
    # end
  end

  def has_watermark?
    File.exists?(self.watermark_filename)
  end
  
  def do_watermark(src, dst, watermark="./app/assets/images/watermark-45.png")
    system("ffmpeg -hide_banner -loglevel error  -i #{src} -i #{watermark} -filter_complex 'overlay=0:0' -y #{dst}")
  end
  
  def make_watermark(src, dst_file, drop_name)
    Dir.mkdir("./public/images/watermarked/#{drop_name}") unless File.exists?("./public/images/watermarked/#{drop_name}")
    dst = "./public/images/watermarked/#{drop_name}/#{dst_file}"
    res = true
    if (File.exists?(src))
      res = do_watermark(src, dst, "./app/assets/images/watermark-45.png")
    end
    dst
  end

end
