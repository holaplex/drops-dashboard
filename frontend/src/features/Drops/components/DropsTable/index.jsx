import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IMAGE_DIR } from '../../../../helpers/requestHelper';
import { userSelector } from '../../../User/userSlice';
import { getDrops } from '../../dropsActions';
import { clearState, dropSelector } from '../../dropSlice';

const index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isFetching, isSuccess, isError, drops } = useSelector(dropSelector);
  const user = useSelector(userSelector);

  useEffect(() => {
    dispatch(getDrops());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(getDrops());
      dispatch(clearState());
    }
  }, [isFetching, isSuccess, isError]);

  const handleInfo = (drop_id) => {
    navigate(`/drops/info/${drop_id}`);
  };

  const Flag = ({ text, status }) => {
    return (
      <div className='flex items-center'>
        <span
          className={`w-2 h-2  rounded-full mr-1 ${
            status ? 'bg-dropGreen' : 'bg-dropYellow'
          }`}
        ></span>
        <span
          className={`text-xs ${status ? 'text-dropGreen' : 'text-dropYellow'}`}
        >
          {' '}
          {text}
        </span>
      </div>
    );
  };

  return (
    <div className='w-full flex flex-col justify-center items-center my-6 mx-2'>
      <div className='w-full md:w-8/12'>
        <div className='flex flex-row justify-between items-center mb-2'>
          <h1 className='text-gray-800 text-3xl font-bold'>Drops</h1>
          {user.user_type !== 'minting_vendor' && (
            <button
              onClick={() => navigate('/drops/create')}
              className='py-1 px-4 border border-gray-300 text-white text-lg rounded-lg bg-gray-800'
            >
              Add Drop
            </button>
          )}
        </div>

        {isFetching ? (
          <div className='w-full'>
            <div className='w-full'>
              <h1>Loading...</h1>
            </div>
          </div>
        ) : drops.length ? (
          drops.map((drop) => (
            <div
              key={drop.id}
              className='shadow-md rounded my-5 cursor-pointer hover:bg-slate-50'
              onClick={() => {
                handleInfo(drop.id);
              }}
            >
              <div className='p-4 flex flex-row justify-between'>
                <div className='flex flex-row gap-2 items-center'>
                  <img
                    className='h-16 w-16 rounded'
                    src={`${IMAGE_DIR}${drop?.gallery_filename}`}
                    alt='Drop Image'
                  />
                  <h4 className='text-base font-semibold'>{drop.name}</h4>
                </div>
                <div className='flex flex-row gap-5 items-center'>
                  <div className='text-dropGray text-xs'>
                    Golive : {drop?.go_live_date ? drop.go_live_date : 'N/A'}
                  </div>
                  <Flag text='Accessible' status={drop?.accessible} />
                  <Flag text='Discoverable' status={drop?.discoverable} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1>No drops yet!</h1>
        )}
      </div>
    </div>
  );
};

export default index;
