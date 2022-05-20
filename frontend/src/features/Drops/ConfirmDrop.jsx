import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import { dropSelector, clearState } from './dropSlice'

import Header from '../../components/Header'

const ConfirmDrop = () => {
  const { name, nfts } = useSelector(dropSelector)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const IMAGE_DIR = ':3000/images/'

  const handleCancel = () => {
    dispatch(clearState())
    navigate('/drops/create')
  }


  return (
    <>
      <Header selected='Drops' />
      <div className='m-6'>

        <div className='flex justify-between'>
          <span><b>Confirm Drop:</b> {name}</span>
          <span>Count {nfts.length}</span>
        </div>
        <div className='my-5'>
          {nfts.map(nft => (
            <li key={nft.id} className='flex justify-between w-full'>
              <div>{nft.name}</div>
              <div className='flex'>
                <img className='mx-2' width='70' height='150' src={`${IMAGE_DIR}${nft.gallery_filename}`} />
                <video autoPlay muted className='mx-2' width='70' height='150' src={`${IMAGE_DIR}${nft.final_filename}`} />
              </div>
            </li>
          ))}
        </div>

        <div>
          <h2><b>Are you sure you would like to submit this drop? This action cannot be undone.</b></h2>
        </div>
        <div className='flex justify-between mt-6'>
          <button
            className='bg-red-800 font-bold text-white p-3 rounded-md hover:bg-red-700'
            onClick={handleCancel}>No, Cancel Drop</button>
          <div className='flex gap-2'>
            <button
              className={`bg-gray-800 font-bold text-gray-200 p-3 rounded-md hover:bg-gray-700`}
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
            <button
              className={`bg-gray-800 font-bold text-gray-200 p-3 rounded-md hover:bg-gray-700`}
            >Yes, Submit
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmDrop
