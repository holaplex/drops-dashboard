import React, { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { dropSelector, clearState } from './dropSlice';
import { show, update } from './dropsActions';
import Header from '../../components/Header';
import { IMAGE_DIR } from '../../helpers/requestHelper';
import QRModal from '../Drops/components/QrModal'
import useComponentVisible from '../../hooks/useComponentVisible'

const Info = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { drop_id } = useParams();

  const [localAccessible, setAccessible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localDiscoverable, setDiscoverable] = useState(false);
  const [url, setUrl] = useState('http://www.campus.io/redeem/conference-2022');

  const {
    name,
    goLiveDate,
    accessible,
    discoverable,
    nfts,
    isSuccess,
    isError,
  } = useSelector(dropSelector);
  const { isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  useEffect(() => {
    if (drop_id) {
      dispatch(show(drop_id));
    }
  }, [drop_id]);

  useEffect(() => {
    setDiscoverable(discoverable);
    setAccessible(accessible);
  }, [accessible, discoverable]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState());
      setLoading(false);
    }
  }, [isSuccess]);

  const handleUpdate = (value) => {
    if (drop_id) {
      setLoading(true);
      dispatch(
        update({
          id: drop_id,
          accessible: value.accessible,
          discoverable: value.discoverable,
        })
      );
    }
  };

  const formatDateTime = (datePassed) => {
    if (!datePassed) return;
    const dateArray = datePassed.split(' '); //datePassed is a string with timezone attached
    const date = new Date(dateArray[0]);
    const timezone = dateArray[1];
    return (
      date.toLocaleDateString('en-US', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }) +
      ' ' +
      timezone
    );
  };

  return (
    <>
      <Header selected='Drops' />
      {isComponentVisible && <QRModal url={url} />}
      <div className='flex flex-col md:flex-row p-1 md:p-36 md:gap-12'>
        <div className='md:w-2/3'>
          <div className='flex items-center mb-3'>
            <BiArrowBack
              size={24}
              className='text-dropGray mr-2 cursor-pointer'
              onClick={() => {
                navigate('/drops');
              }}
            />
            <h2 className='font-bold text-dropBlack text-3xl'>{name}</h2>
          </div>
          <span className='font-semibold text-dropBlack'>
            <span className='text-dropGray'> Go live: </span>
            {formatDateTime(goLiveDate)}
          </span>
          <hr className='mt-6 text-dropGray bg-gray' />
          <div className='mt-12'>
            <h2 className='font-bold text-2xl'>NFTs</h2>
            <div className='mt-5'>
              {nfts &&
                nfts.length > 0 &&
                nfts.map((nft, index) => (
                  <div key={index}>
                    {index === 0 && (
                      <hr className='mt-6 text-dropGray bg-gray' />
                    )}
                    <div className={`flex justify-between w-full my-4 `}>
                      <div className='flex items-center gap-4 font-bold'>
                        <img
                          src={`${IMAGE_DIR}${nft.gallery_filename}`}
                          className='w-14 h-15 rounded'
                        />
                        <h4>{nft.name}</h4>
                      </div>
                      <div className='flex items-center gap-4 font-bold'>
                        <span className='rounded-lg border-[1px] border-opacity-50 px-4 py-2 border-dropGray'>
                          Supply of {nft.scarcity}
                        </span>
                        <span className='rounded-lg border-[1px] border-opacity-50 px-4 py-2 border-dropGray'>
                          {nft.price ? `$${nft.price}` : 'Free'}
                        </span>
                        <button
                          className='rounded-lg border-[1px] border-opacity-50 px-4 py-2 text-white bg-black'
                          onClick={() => setIsComponentVisible(true)}
                        >
                          Share
                        </button>
                      </div>
                    </div>
                    <hr className='mt-6 text-dropGray bg-gray' />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className='rounded-xl shadow-lg p-6'>
            <div className='flex flex-col'>
              <h4 className='font-bold text-dropBlack mb-1'>Accessible</h4>
              <span className='text-xs mb-4'>
                The NFTs will be available for purchase on go live date on
                campus.io
              </span>
              <label
                htmlFor='green-toggle-1'
                className='relative mr-5 cursor-pointer w-fit'
              >
                <input
                  type='checkbox'
                  value={localAccessible}
                  id='green-toggle-1'
                  className='sr-only peer'
                  checked={localAccessible}
                  onChange={(e) => {
                    setAccessible(e.target.checked);
                    handleUpdate({ accessible: e.target.checked });
                  }}
                  disabled={loading}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-dropGray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-dropGreen"></div>
              </label>
            </div>

            <hr className='my-4' />
            <div className='flex flex-col'>
              <h4 className='font-bold text-dropBlack mb-1'>Discoverable</h4>
              <span className='text-xs mb-4'>
                The NFTs cards will be displayed on the relevant team and
                athlete pages on campus.io
              </span>
              <label
                htmlFor='green-toggle-2'
                className='relative mr-5 cursor-pointer w-fit'
              >
                <input
                  type='checkbox'
                  value={localDiscoverable}
                  id='green-toggle-2'
                  className='sr-only peer'
                  checked={localDiscoverable}
                  onChange={(e) => {
                    setDiscoverable(e.target.checked);
                    handleUpdate({ discoverable: e.target.checked });
                  }}
                  disabled={loading}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-dropGray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-dropGreen"></div>
              </label>
            </div>
          </div>
          <div className='flex flex-1'></div>
        </div>
      </div>
    </>
  );
};

export default Info;
