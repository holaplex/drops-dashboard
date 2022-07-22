import React from 'react'
import WarningIcon from '../../../../assets/Warning.svg'

const ConfirmationModal = ({isError, isFetching, handleSubmit, handleCancel}) => {
  return (
    <div
      className='flex w-full h-full justify-center items-center overflow-hidden absolute inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full
      '
    >
      <div className='md:w-1/2 p-8 rounded-16 mx-2 drop-shadow-lg bg-white'>
        <div className='flex flex-col gap-y-7'>
          {isError && (
            <p className='text-red-500 text-base font-normal'>
              Error creating drop!
            </p>
          )}
          <h2 className='text-2xl font-bold'>Confirmation</h2>
          <div className='bg-dropYellow p-3  rounded z-0'>
            <div className='flex flex-row gap-x-3 items-center'>
              <img src={WarningIcon} alt='Warning Icon' />
              <span className='text-dropDarkYellow  z-50 text-base font-semibold'>
                Are you sure you are ready to create this drop? Once created on-{' '}
                <br />
                chain items will be added, this is not reversable.
              </span>
            </div>
          </div>
          <div>
            <h3 className='text-dropGray font-normal text-xs'>
              Estimated cost
            </h3>
            <span className='font-bold text-2xl'>3.2 SOL</span>
          </div>

          <div className='flex flex-row justify-end buttons'>
            <div className='flex gap-2'>
              <button
                className="bg-dropGray font-medium text-gray-200 px-4 py-2 rounded-md  'hover:bg-gray-700"
                onClick={handleCancel}
              >
                Back
              </button>
              <button
                className={`bg-dropCharcoal font-medium text-gray-200 px-4 py-2 rounded-md hover:bg-gray-700`}
                onClick={handleSubmit}
                disabled={isFetching}
              >
                {isFetching ? 'Creating...' : 'Create drop'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
