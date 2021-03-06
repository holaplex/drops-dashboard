import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import { dropSelector, clearState } from './dropSlice';
import { update } from './dropsActions';
import Header from '../../components/Header';
import ConfirmationModal from '../Drops/components/ConfirmationModal';

const ScheduleDrop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, isFetching, isSuccess, isError } = useSelector(dropSelector);
  const [loading, setLoading] = useState(!id);
  const [name, setName] = useState('');
  const [nameDirty, setNameDirty] = useState(false);
  const [golive, setGoLive] = useState('');
  const [goliveDirty, setGoLiveDirty] = useState(false);
  const [timezone, setTimeZone] = useState('PST');
  const [showModal, setShowModal] = useState(false);

  const handleCancel = () => {
    dispatch(clearState());
    navigate('/drops/create');
  };

  const handleCreateDrop = () => {
    if (name && golive && timezone) {
      setShowModal(true);
    }
    setNameDirty(true);
    setGoLiveDirty(true);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/drops');
    }
    dispatch(clearState());
  }, [isSuccess]);

  const handleSubmit = () => {
    const data = {
      id: id,
      name: name,
      go_live_date: golive + ' ' + timezone,
    };
    dispatch(update(data));
  };

  return !loading ? (
    <>
      <Header selected='Drops' />
      {showModal && (
        <ConfirmationModal
          handleSubmit={handleSubmit}
          isError={isError}
          isFetching={isFetching}
          handleCancel={() => setShowModal(false)}
        />
      )}
      <div className={`w-full flex justify-center`}>
        <div className='w-11/12 md:w-8/12 my-6'>
          <div className='flex flex-col gap-y-4 md:gap-y-5 lg:gap-y-10 justify-center'>
            <div className='flex flex-row justify-between items-center'>
              <h2 className='text-3xl lg:text-4xl font-bold'>
                Create new drop
              </h2>
              <button className='cursor-pointer' onClick={handleCancel}>
                <AiOutlineClose
                  size={24}
                  className='text-dropGray mr-2 cursor-pointer'
                />
              </button>
            </div>

            <div
              className={`md:w-34-375rem m-auto flex flex-col gap-y-8 justify-center ${
                showModal && 'hidden'
              }`}
            >
              <div className='flex flex-col gap-y-4 md:gap-y-14'>
                <h2 className='text-2xl font-bold'>Drop data</h2>

                <div className='flex flex-col gap-y-2'>
                  <label className='text-base font-semibold'>Create Drop</label>
                  <input
                    className={`bg-dropBrightGray px-4 py-2 rounded ${
                      !name && nameDirty && 'border border-red-500'
                    }`}
                    type='text'
                    placeholder='eg. Conference 2022'
                    onChange={(e) => {
                      setName(e.target.value);
                      setNameDirty(true);
                    }}
                    value={name}
                  />
                </div>

                <div className='flex flex-row gap-x-2 items-end'>
                  <div className='w-3/4'>
                    <div className='flex flex-col gap-y-2'>
                      <label className='text-base font-semibold'>
                        Go live date/time
                      </label>
                      <span className='text-xs font-normal'>
                        The NFT cards will be displayed and details pages will
                        be accessible prior to the go live date/time
                      </span>
                      <input
                        className={`bg-dropBrightGray px-4 py-2 rounded ${
                          !golive && goliveDirty && 'border border-red-500'
                        }`}
                        type='datetime-local'
                        onChange={(e) => {
                          setGoLive(e.target.value);
                          setGoLiveDirty(true);
                        }}
                        value={golive}
                      />
                    </div>
                  </div>

                  <div className='flex flex-col gap-y-2 w-1/4'>
                    <div className='inline-block relative'>
                      <select
                        className='block appearance-none w-full bg-dropBrightGray px-4 py-2 rounded'
                        value={timezone}
                        onChange={(e) => {
                          setTimeZone(e.target.value);
                        }}
                      >
                        <option value='PST'>PST</option>
                        <option value='HST'> HST </option>
                        <option value='HDT'> HDT </option>
                        <option value='AKDT'> AKDT </option>
                        <option value='MST'> MST </option>
                        <option value='MDT'> MDT </option>
                        <option value='CDT'> CDT </option>
                        <option value='EDT'> EDT </option>
                      </select>
                      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700'>
                        <svg
                          className='fill-current h-4 w-4'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                        >
                          <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex flex-row justify-end buttons'>
                <div className='flex gap-2'>
                  <button
                    className="bg-dropGray font-medium text-gray-200 px-4 py-2 rounded-md  'hover:bg-gray-700"
                    onClick={() => {
                      navigate('/drops/review');
                    }}
                  >
                    Back
                  </button>
                  <button
                    className={`bg-dropCharcoal font-medium text-gray-200 px-4 py-2 rounded-md hover:bg-gray-700`}
                    onClick={handleCreateDrop}
                  >
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
  );
};

export default ScheduleDrop;
