import React from 'react'
import { BiArrowBack } from 'react-icons/bi'

const nfts = [
  { id: 1, name: 'Brady Manek', supply: 350, price: 0 },
  { id: 2, name: 'Kerwin Walton', supply: 500, price: 35 },
  { id: 3, name: 'Kerwin Walton', supply: 500, price: 35 }
]

const Info = () => {
  return (
    <div className='flex p-36 gap-12'>
      <div>
        <div className='flex items-center mb-3'>
          <BiArrowBack size={24} className='text-gray mr-2 cursor-pointer' />
          <h2 className='font-bold text-3xl'>University of North Carolina 2022 Team</h2>
        </div>
        <span className='font-semibold'> <span className='text-gray'> Go live: </span> July 10, 2022 10:00am PST</span>
        <hr className="mt-6 text-gray bg-gray" />
        <div className='mt-12'>
          <h2 className='font-bold text-2xl'>Nfts</h2>
          <div>
            {nfts.map(nft => (
              <h1>{nft.name}</h1>
            ))}
          </div>
        </div>
      </div>
      <div>
        Right
      </div>
    </div>
  )
}

export default Info

