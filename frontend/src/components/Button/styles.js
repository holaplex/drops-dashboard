import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 40px;
  margin: 0.5rem 0;
  border-radius: 10px;
  border: 0;
  background-color: #5b11a6;
  color: white;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};

  &:hover {
    background-color: rebeccapurple;
  }
`;
