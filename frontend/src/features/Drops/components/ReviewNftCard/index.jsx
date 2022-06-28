import React from 'react'
import { IMAGE_DIR } from '../../../../helpers/requestHelper'

const ReviewNftCard = ({ nft, schools }) => {

  return (
    <div className='my-6'>
      <div className='text-center my-6'>
        <span className='text-lg'><b>Review:</b> {nft.name}</span>
      </div>
      <div className='flex justify-evenly'>
        <div className='flex gap-2 mr-6 w-2/3'>
          <img className='w-1/2' width='100' height='100' src={`${IMAGE_DIR}${nft.gallery_filename}`} />
          <video className='w-1/2' autoPlay muted width='100' height='100' src={`${IMAGE_DIR}${nft.final_filename}`} />
        </div>
        <div className='text-sm w-1/3'>
          <div className='flex flex-col mb-4'>
            <b>Fan Ranking points:</b>
            <span>{nft.fan_ranking_points}</span>
          </div>
          <div className='flex flex-col mb-4'>
            <b>Description:</b>
            <span>{nft.description}</span>
          </div>
          <div className='flex flex-col mb-4'>
            <span> <b> Scarcity: </b> {nft.scarcity}</span>
            <span> <b> Legend: </b> {nft.legend}</span>
            <span> <b> Sport: </b> {nft.sport}</span>
            <span> <b> School: </b> {schools.find(s => s.id === nft.school_id).name}</span>
            { nft.award && <span> <b> Award: </b> {nft.award}</span> }
            <span> <b>Creator:</b> {nft.creator}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewNftCard
