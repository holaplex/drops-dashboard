import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import { dropSelector, clearState } from './dropSlice'
import Header from '../../components/Header'

export const Summary = () => {
  const { name, nfts } = useSelector(dropSelector)
  const navigate = useNavigate();
  const dispatch = useDispatch();
   const IMAGE_DIR = window.location.origin + ':3000/images/'
  const handleCancel = () => {
    dispatch(clearState())
    navigate('/drops/create')
  }

  return (
    <>
      <Header selected="Drops" />
      <div className='flex justify-center items-center'>
        <div className='w-2/3 justify-center flex flex-col p-6'>
          <div className='w-full flex flex-col'>
            <div>
              <h5>
                <i>{name}</i>
              </h5>
            </div>
            <div className='w-full flex flex-column justify-between mt-6'>
              <h1>Summary of CSV</h1>
              <h5><i>Count: {nfts.length}</i> </h5>
            </div>
          </div>
          <div className='mt-6'>
            <ul className='flex flex-col'>
              {nfts.map(nft => (
                <li key={nft.id} className='flex justify-between w-full'>
                  <div>{nft.name}</div>
                  <div className='flex'>
                    <img className='mx-2' width='70' height='150' src={`${IMAGE_DIR}${nft.gallery_filename}`} />
                    <video autoPlay muted className='mx-2' width='70' height='150' src={`${IMAGE_DIR}${nft.final_filename}`} />
                  </div>
                </li>
              ))}

            </ul>
            <div className='flex justify-between mt-6'>
              <button onClick={() => handleCancel()} className='bg-gray-800 font-bold text-gray-200 p-3 rounded-md hover:bg-gray-700' >No, Cancel</button>
              <button onClick={() => navigate('/drops/review')} className='bg-gray-800 font-bold text-gray-200 p-3 rounded-md hover:bg-gray-700' >Next</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Summary
