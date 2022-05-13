import React from 'react'

export const Summary = () => {
  return (
    <div className='w-full flex flex-col p-6'>
      <div className='w-full flex flex-col'>
        <div>
          <h5>
            March Madness Drop #1</h5>
        </div>
        <div className='w-full flex flex-column justify-between mt-6'>
          <h6>Summary of CSV</h6>
          <small>Count: 152</small>
        </div>
      </div>
      <div className='mt-6'>
        <ul className='flex'>
          <li className='flex justify-between w-full'>
            <div>2022 Tournament Basketball: Caleb Love</div>
            <div className='flex'>
              <img className='mx-2' width='50' height='50' src='https://ca.slack-edge.com/T02ERR4SW56-U02E26PTXTM-9c36fd83e6d5-512' />
              <img className='mx-2' width='50' height='50' src='https://ca.slack-edge.com/T02ERR4SW56-U02E26PTXTM-9c36fd83e6d5-512' />

            </div>
          </li>
        </ul>
        <div className='flex justify-between mt-6'>
          <button className='bg-gray-800 font-bold text-gray-200 p-3 rounded-md hover:bg-gray-700' >No, Cancel</button>
          <button className='bg-gray-800 font-bold text-gray-200 p-3 rounded-md hover:bg-gray-700' >Next</button>
        </div>
      </div>
    </div>
  )
}
export default Summary
