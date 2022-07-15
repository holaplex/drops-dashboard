import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IMAGE_DIR } from '../../../../helpers/requestHelper'

const ReviewNftCard = ({ nfts }) => {
  const [position, setPosition] = useState(0)
  const [nft, setNft] = useState(nfts[position])
  const navigate = useNavigate();

  const handleNext = () => {
    if (position + 1 === nfts.length) {
      navigate('/drops/confirm')
    }
    else {
      setPosition(position + 1)
    }
  }

  useEffect(() => {
    setNft(nfts[position])
  }, [position])


  return (
    <div className="flex flex-col gap-y-4">
      <span className='text-xl md:text-2xl lg:text-2xl font-bold'>Review NFT data  - {position + 1}/{nfts.length}</span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-y-2">
        <div className="images flex flex-row gap-x-2 md:flex-col lg:flex-col lg:gap-4">
          <div className="md:w-1/2 lg:h-3/4 lg:w-[283px] flex flex-col gap-y-2">
            <span>Gallery image</span>
            <img className="rounded  object-fit" src={`${IMAGE_DIR}${nft.gallery_filename}`} />
          </div>
          <div className="md:w-1/2 lg:h-3/4 lg:w-[283px] flex flex-col gap-y-2">
            <span>Final media</span>
            <video className="rounded object-fit" height={283} autoPlay muted src={`${IMAGE_DIR}${nft.final_filename}`} />
          </div>
        </div>

        <div className="info flex flex-col gap-y-2 md:gap-y-5 lg:gap-y-5 md:-ml-20 lg:-ml-20">
          <h2 className="font-semibold text-[#35322F] text-base">{nft.name}</h2>
          <p className="text-[#35322F] text-base font-normal">{nft.description}</p>
          <div>
            <span className="text-xs text-[#747474]">supply</span>
            <p className="font-normal text-base text-[#35322F]">{nft.scarcity}</p>
          </div>
          <div className="price">
            <span className="text-xs text-[#747474]">Price</span>
            <p className="text-[#35322F]">{nft?.price ? nft?.price : 'Free'}</p>
          </div>
          <div className="properties">
            <span className="text-xs text-[#747474]">Properties</span>
            <table className="table-auto w-full">
              <tbody className="text-base font-normal">
                <tr className="border-b border-[#eee] leading-loose text-[#35322F]">
                  <td>Team</td>
                  <td>{nft.creator}</td>
                </tr>
                <tr className="border-b border-[#eee] my-2 leading-loose">
                  <td>Conference</td>
                  <td>ACC</td>
                </tr>
                <tr className="border-b border-[#eee] my-2 leading-loose">
                  <td>Sport</td>
                  <td>{nft.sport}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='flex flex-row justify-end buttons my-2'>
            <div className='flex gap-2'>
              <button
                className={`bg-[#35322F] font-bold text-gray-200 px-4 py-2 rounded-md ${position === 0 ? 'cursor-not-allowed opacity-75' : 'hover:bg-gray-700 '}`}
                disabled={position === 0}
                onClick={() => setPosition(position - 1)}
              >
                Back
              </button>
              <button className={`bg-[#35322F] font-bold text-gray-200 px-4 py-2 rounded-md hover:bg-gray-700`}
                onClick={handleNext} >
                Looks good - Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewNftCard
