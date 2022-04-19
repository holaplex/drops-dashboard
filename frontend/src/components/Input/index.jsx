import React from 'react';

import { CustomInput } from './styles';

const Input = React.forwardRef((rest, ref) => {
  return <CustomInput ref={ref} {...rest} />;
});

export default Input;
