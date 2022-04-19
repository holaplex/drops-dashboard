import styled from 'styled-components';

export const CustomInput = styled.input`
  width: 200px;
  height: 20px;
  border: 1px solid black;
  border-radius: 5px;
  padding-left: 5px;
  outline: none;
  margin: 0.5rem 0;
  &:focus {
    border-color: red;
  }
`;
