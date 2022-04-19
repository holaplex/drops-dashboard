import React from 'react';

import { Container } from './styles';

function Button({ text, onClick, disabled, rest }) {
  return (
    <Container disabled={disabled} onClick={onClick} {...rest}>
      {text}
    </Container>
  );
}

export default Button;
