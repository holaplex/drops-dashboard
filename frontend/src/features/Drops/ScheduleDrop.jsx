import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'

const ScheduleDrop = () => {

  const [loading, setLoading] = useState(!!false)
  const navigate = useNavigate()


  const handleCancel = () => {
    navigate('/drops/create')
  }

  const Input = ({ label, type, placeholder, children }) => {
    return (
      <div className="flex flex-col gap-y-2">
        <lable className="text-base font-semibold">{label}</lable>
        {children}
        <input className="bg-[#eee] px-4 py-2 rounded" type={type} placeholder={placeholder} />
      </div>
    )

  }

  return !loading ? (
    <>
      <Header selected="Drops" />
      <div className='w-full flex justify-center'>
        <div className='w-11/12 md:w-8/12 my-6'>
          <div className='flex flex-col gap-y-4 md:gap-y-5 lg:gap-y-10 justify-center'>
            <div className="flex flex-row justify-between items-center">
              <h2 className='text-3xl lg:text-4xl font-bold'>Create new drop</h2>
              <button className="cursor-pointer" onClick={handleCancel}>X</button>
            </div>

            <div className="md:w-34-375rem m-auto flex flex-col md:gap-y-14 justify-center">
              <div className="flex flex-col gap-y-4 md:gap-y-14">
                <h2 className="text-2xl font-bold">Drop data</h2>
                <Input label="Create drop" placeholder="eg. Conference 2022" type="text" />
                <Input label="Go live date/time" placeholder="eg. Conference 2022" type="datetime-local">
                  <span className="text-xs font-normal">The NFT cards will be displayed and details pages will be accessible prior to the go live date/time</span>
                </Input>
              </div>

              <div className='flex flex-row justify-end buttons my-2'>
                <div className='flex gap-2'>
                  <button
                    className="bg-sonic-silver font-medium text-gray-200 px-4 py-2 rounded-md  'hover:bg-gray-700" >
                    Back
                  </button>
                  <button className={`bg-dark-charcoal font-medium text-gray-200 px-4 py-2 rounded-md hover:bg-gray-700`} >
                    Create drop
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  ) : (
    <h1>Loading!</h1>
  )
}

export default ScheduleDrop
