import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { dropSelector, clearState } from './dropSlice';
import { show } from './dropsActions';
import Header from '../../components/Header';
import ReviewNftCard from './components/ReviewNftCard';

const ReviewNft = () => {
  const dispatch = useDispatch();
  const { drop_id } = useParams();
  const { nfts, isSuccess, isFetching, isError } = useSelector(dropSelector);
  const [loading, setLoading] = useState(!!drop_id);
  const navigate = useNavigate();

  useEffect(() => {
    if (drop_id) {
      dispatch(show(drop_id));
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState());
      setLoading(false);
    }
  }, [isSuccess, isFetching, isError]);

  const handleCancel = () => {
    dispatch(clearState());
    navigate('/drops/create');
  };

  return !loading ? (
    <>
      <Header selected='Drops' />
      <div className='w-full flex justify-center'>
        <div className='w-11/12 md:w-8/12 my-6'>
          <div className='flex flex-col gap-y-2 md:gap-y-5 lg:gap-y-10'>
            <div className='flex flex-row justify-between items-center'>
              <h2 className='text-3xl lg:text-4xl font-bold'>
                Create new drop
              </h2>
              {!drop_id && (
                <button className='cursor-pointer' onClick={handleCancel}>
                  <AiOutlineClose
                    size={24}
                    className='text-dropGray mr-2 cursor-pointer'
                  />
                </button>
              )}
            </div>
            <ReviewNftCard nfts={nfts} />
          </div>
        </div>
      </div>
    </>
  ) : (
    <h1>Loading!</h1>
  );
};

export default ReviewNft;
