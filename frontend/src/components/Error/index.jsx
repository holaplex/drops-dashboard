import React from 'react';

import { CustomError } from './styles';

function Error({ text }) {
  return <CustomError>{text}</CustomError>;
}

export default Error;
