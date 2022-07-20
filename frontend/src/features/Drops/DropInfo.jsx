import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { dropSelector, clearState } from './dropSlice'
import { show, update } from './dropsActions'
import Header from '../../components/Header'
import { IMAGE_DIR } from '../../helpers/requestHelper'

const Info = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { drop_id } = useParams();
  const { name, goLiveDate, accessible, discoverable, nfts, isSuccess, isFetching, isError } = useSelector(dropSelector)
  const [position, setPosition] = useState(0)
  const [loading, setLoading] = useState(!!drop_id)
  const [localAccessible, setAccessible] = useState(accessible)
  const [localDiscoverable, setDiscoverable] = useState(discoverable)

  useEffect(() => {
    if (drop_id) {
      dispatch(show(drop_id))
    }
  }, [])

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState())
      setLoading(false)
    }
  }, [isSuccess, isFetching, isError])

  const handleUpdate = () => {
    console.log(localAccessible)
    // dispatch(update({ id: drop_id, name, accessible:localAccessible, discoverable:localDiscoverable }))
  }
  return (
    <>
      <Header selected='Drops' />
      <div className='flex p-36 gap-12'>
        <div className='w-2/3'>
          <div className='flex items-center mb-3'>
            <BiArrowBack size={24} className='text-dropGray mr-2 cursor-pointer' />
            <h2 className='font-bold text-dropBlack text-3xl'>University of North Carolina 2022 Team</h2>
          </div>
          <span className='font-semibold text-dropBlack'> <span className='text-dropGray'> Go live: </span>{goLiveDate} </span>
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
                      <img src={`${IMAGE_DIR}${nft.gallery_filename}`} className="w-14 h-15 rounded" />
                      <h4>{nft.name}</h4>
                    </div>
                    <div className='flex items-center gap-4 font-bold'>
                      <span className='rounded-lg border-[1px] border-opacity-50 px-4 py-2 border-dropGray'>Supply of {nft.scarcity}</span>
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
              <label htmlFor="green-toggle-1" className="relative mr-5 cursor-pointer w-fit" onClick={() => handleUpdate()}>
                <input type="checkbox" value="" id="green-toggle-1" class="sr-only peer" checked={localAccessible} onChange={() => setAccessible(!localAccessible)} />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-dropGray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-dropGreen"></div>
              </label>
            </div>

            <hr className='my-4' />
            <div className='flex flex-col'>
              <h4 className='font-bold text-dropBlack mb-1'>Discoverable</h4>
              <span className='text-xs mb-4'>The NFTs cards will be displayed on the relevant team and athlete pages on campus.io</span>
              <label htmlFor="green-toggle-2" className="relative mr-5 cursor-pointer w-fit">
                <input type="checkbox" value="" id="green-toggle-2" class="sr-only peer" checked={localDiscoverable} onChange={() => setDiscoverable(!localDiscoverable)} />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-dropGray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-dropGreen"></div>
              </label>
            </div>
          </div>
          <div className='flex flex-1'></div>
        </div>

      </div>
    </>
  )
}

export default Info

