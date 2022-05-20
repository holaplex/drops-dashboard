import React from 'react'
import { IMAGE_DIR } from '../../../../helpers/requestHelper'

const ReviewNftCard = ({ nft }) => {

  return (
    <div className='my-6'>
      <div className='text-center my-6'>
        <span><b>Review:</b> {nft.name}</span>
      </div>
      <div className='flex justify-evenly'>
        <div className='flex w-1/2'>
          <img className='mx-2' width='300' height='500' src={`${IMAGE_DIR}${nft.gallery_filename}`} />
          <video autoPlay muted className='mx-2' width='300' height='500' src={`${IMAGE_DIR}${nft.final_filename}`} />
        </div>
        <div className='text-sm'>
          <div className='flex flex-col'>
            <b>Fan Ranking points:</b>
            <span>{nft.fan_ranking_points}</span>
          </div>
          <div className='flex flex-col'>
            <b>Description:</b>
            <span>{nft.description}</span>
          </div>
          <div className='flex flex-col'>
            <b>Details:</b>
            <span>Rarity</span>
            <span>Edition of {nft.scarcity}</span>
            <span>Creator</span>
            <span>{nft.creator}</span>
            <span>Blockchain</span>
            <span>Solana</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewNftCard
