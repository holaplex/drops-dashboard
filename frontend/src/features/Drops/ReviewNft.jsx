import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import { dropSelector, clearState } from './dropSlice'

import Header from '../../components/Header'

import ReviewNftCard from './components/ReviewNftCard'

const ReviewNft = () => {
  const { name, nfts } = useSelector(dropSelector)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [position, setPosition] = useState(0)

  const handleCancel = () => {
    dispatch(clearState())
    navigate('/drops/create')
  }

  const handleNext = () => {
    if (position + 1 === nfts.length) {
      navigate('/drops/confirm')
    }
    else {
      setPosition(position + 1)
    }
  }

  return (
    <>
      <Header selected="Drops" />

      <div className='w-full flex justify-center'>
        <div className='w-8/12 m-6'>
          <div className='flex justify-between'>
            <h5 className='text-lg'><i>{name}</i></h5>
            <span>{position + 1} of {nfts.length}</span>
          </div>

          <ReviewNftCard nft={nfts[position]} />

          <div className='flex justify-between'>
            <button
              className='bg-red-800 font-bold text-white p-3 rounded-md hover:bg-red-700'
              onClick={handleCancel}
            >
              No, Cancel Drop
          </button>
            <div className='flex gap-2'>
              <button
                className={`bg-gray-800 font-bold text-gray-200 p-3 rounded-md ${position === 0 ? 'cursor-not-allowed opacity-75' : 'hover:bg-gray-700 '}`}
                disabled={position === 0}
                onClick={() => setPosition(position - 1)}
              >
                Prev
            </button>
              <button
                className={`bg-gray-800 font-bold text-gray-200 p-3 rounded-md hover:bg-gray-700`}
                // disabled={position + 1 === nfts.length}
                onClick={handleNext}
              >
                Next
            </button>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default ReviewNft
