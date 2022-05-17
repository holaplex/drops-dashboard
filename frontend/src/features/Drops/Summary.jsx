import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import { dropSelector, clearState } from './dropSlice'

export const Summary = () => {
  const { name, nfts } = useSelector(dropSelector)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(clearState())
    navigate('/drops/create')
  }

  return (
    <div className='w-full flex flex-col p-6'>
      <div className='w-full flex flex-col'>
        <div>
          <h5>
            {name}
          </h5>
        </div>
        <div className='w-full flex flex-column justify-between mt-6'>
          <h6>Summary of CSV</h6>
          <small>Count: {nfts.length}</small>
        </div>
      </div>
      <div className='mt-6'>
        <ul className='flex flex-col'>
          {nfts.map(nft => (
            <li key={nft.id} className='flex justify-between w-full'>
              <div>{nft.name}</div>
              <div className='flex'>
                <img className='mx-2' width='50' height='50' src='https://ca.slack-edge.com/T02ERR4SW56-U02E26PTXTM-9c36fd83e6d5-512' />
                <img className='mx-2' width='50' height='50' src='https://ca.slack-edge.com/T02ERR4SW56-U02E26PTXTM-9c36fd83e6d5-512' />
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
  )
}
export default Summary
