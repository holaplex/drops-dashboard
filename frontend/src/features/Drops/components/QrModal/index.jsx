import React, { useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import Logo from '../../../../assets/Icon_GLD.png';
import useComponentVisible from '../../../../hooks/useComponentVisible';

const QRModal = ({ url }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isQRCopied, setIsQRCopied] = useState(false);
  const { ref } = useComponentVisible(false);
  const copyTextToClipboard = async (text) => {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      if (document) {
        return document.execCommand('copy', true, text);
      }
    }
  };

  const handleCopyClick = (context) => {
    copyTextToClipboard(url)
      .then(() => {
        if (context && context === 'qr') {
          setIsQRCopied(true);
          setTimeout(() => {
            setIsQRCopied(false);
          }, 1500);
        } else {
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='flex w-full h-full justify-center items-center overflow-hidden absolute inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'>
      <div
        className='w-400 p-8 rounded-16 bg-white z-50 overflow-auto'
        ref={ref}
      >
        <div className='flex flex-col gap-y-4'>
          <div className='flex flex-row justify-between items-center'>
            <QRCode
              qrStyle='squares'
              removeQrCodeBehindLogo
              logoImage={Logo}
              value={url}
              size={105}
            />
            <button
              className='bg-dropCharcoal text-white h-10 px-6 py-2 rounded-lg'
              onClick={() => handleCopyClick('qr')}
            >
              {' '}
              {isQRCopied ? 'Copied!' : 'Copy QR code'}{' '}
            </button>
          </div>
          <div className='flex flex-row justify-between gap-x-2 items-center border p-2 rounded-lg '>
            <div>
              <span className='text-dropGray text-xs font-normal'>URL</span>
              <p className='text-xs font-normal whitespace-normal mr-1'>
                {url}
              </p>
            </div>
            <button
              className='bg-dropCharcoal text-white h-10 px-6 py-2 rounded-lg'
              onClick={() => handleCopyClick('not-qr')}
            >
              {isCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRModal;
