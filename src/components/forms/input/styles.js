import styled from 'styled-components';



export const InputT = styled.TextInput`
  margin-bottom: 10px;
  height: 30px;
  margin-right: 10px;
  padding: 5px;
  width: ${props => props.width ? props.width : '100%' };
  border-radius: 5px;
  background-color: #fff;
  text-align: center;
  /* border-bottom-width: 2px; */
  border-width: ${props => `${props.theme.borderW}px`};
  border-color: ${props => props.theme.border};
  elevation: 5;
`;