import React from 'react'
import { BiArrowBack } from 'react-icons/bi'

const nfts = [
  { id: 1, name: 'Brady Manek', supply: 350, price: 0 },
  { id: 2, name: 'Kerwin Walton', supply: 500, price: 35 },
  { id: 3, name: 'Kerwin Walton', supply: 500, price: 35 }
]
const image = 'https://uerdkdfclxjqw6xrftm46px2oacmr3vfdlcwbztvsr2of7tjhkkq.arweave.net/oSI1DKJd0wt68SzZzz76cATI7qUaxWDmdZR04v5pOpU?ext=jpg'
const Info = () => {
  return (
    <div className='flex p-36 gap-12'>
      <div className='w-2/3'>
        <div className='flex items-center mb-3'>
          <BiArrowBack size={24} className='text-dropGray mr-2 cursor-pointer' />
          <h2 className='font-bold text-dropBlack text-3xl'>University of North Carolina 2022 Team</h2>
        </div>
        <span className='font-semibold text-dropBlack'> <span className='text-dropGray'> Go live: </span> July 10, 2022 10:00am PST</span>
        <hr className="mt-6 text-dropGray bg-gray" />
        <div className='mt-12'>
          <h2 className='font-bold text-2xl'>NFTs</h2>
          <div className='mt-5'>
            {nfts.map((nft, index) => (
              <>
                {index === 0 && (
                  <hr className="mt-6 text-dropGray bg-gray" />
                )}
                <div className={`flex justify-between w-full my-4 `}>
                  <div className='flex items-center gap-4 font-bold'>
                    <img src={image} className="w-14 h-15 rounded" />
                    <h4>{nft.name}</h4>
                  </div>
                  <div className='flex items-center gap-4 font-bold'>
                    <span className='rounded-lg border-[1px] border-opacity-50 px-4 py-2 border-dropGray'>Supply of {nft.supply}</span>
                    <span className='rounded-lg border-[1px] border-opacity-50 px-4 py-2 border-dropGray'>{nft.price ? `$${nft.price}` : 'Free'}</span>
                    <button className='rounded-lg border-[1px] border-opacity-50 px-4 py-2 text-white bg-black'>Share</button>
                  </div>
                </div>
                <hr className="mt-6 text-dropGray bg-gray" />
              </>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className='rounded-xl shadow-lg p-6'>
          <div className='flex flex-col'>
            <h4 className='font-bold text-dropBlack mb-1'>Accessible</h4>
            <span className='text-xs mb-4'>The NFTs will be available for purchase on go live date on campus.io</span>
            <label htmlFor="green-toggle-1" className="inline-flex justify-center relative mr-5 items-center cursor-pointer w-fit  w-[56px] h-[32px]">
              <input type="checkbox" value="" id="green-toggle-1" class="sr-only peer  w-[56px] h-[32px]" />
              <div className=" w-[56px] h-[32px] w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-dropGray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-dropGreen"></div>
            </label>
          </div>

          <hr className='my-4' />
          <div className='flex flex-col'>
            <h4 className='font-bold text-dropBlack mb-1'>Discoverable</h4>
            <span className='text-xs mb-4'>The NFTs cards will be displayed on the relevant team and athlete pages on campus.io</span>
            <label htmlFor="green-toggle-2" className="relative mr-5 cursor-pointer w-fit">
              <input type="checkbox" value="" id="green-toggle-2" class="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-dropGray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-dropGreen"></div>
            </label>
          </div>
        </div>
        <div className='flex flex-1'></div>
      </div>

    </div>
  )
}

export default Info

