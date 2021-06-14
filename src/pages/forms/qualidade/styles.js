import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
const { width, height } = Dimensions.get('window');


export const Container = styled.ScrollView `
  flex: 1;
  background-color: #fff1;
  padding: 5px;
  height:${props => props.height ? props.height : 'auto'};
`
export const Modal = styled.Modal ``;
export const ModalAmostra = styled.Modal ``;

export const Texto = styled.Text `
  font-size: 12px;
  /* margin-left: 15px; */
  /* align-self: flex-start; */
  color: #1119;
  font-weight: bold;
  text-align: center;
  font-style: italic;
`
export const InputText = styled.TextInput `
  height: 30px;
  /* margin-left: 5px;
  margin-right: 5px; */
  margin-bottom: 10px;
  margin-right: 10px;
  padding: 5px;
  width: 100%;
  border-radius: 5px;
  background-color: #fff;
  text-align: center;
  border-bottom-width: 3px;
  border-color: ${props => props.theme.border}
  
`;
export const InputObs = styled(InputText) `
  height:  ${props => `${props.height}px`};
`;

export const CenterView = styled.View `
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding-top: 10px;
  padding-bottom:10px;
  background-color: #00b333;
`

export const Botao = styled.TouchableOpacity `
    /* background-color: #fff; */
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 40px;
    border-radius: 50px;
    padding: 2px;
    width: 25%;
    border-width:1px;
    border-color:#fff;
    background: #d6d5;
    elevation:1;
`
export const BotaoText = styled.Text `
  font-size: 14px;
  text-align: center;
  font-weight: bold;
  color: #fff;

`;

export const Campos = styled.View`
    flex: 1;
    flex-direction: row;
    flex-wrap: wrap;
    /* width: ${width * parseFloat('50%')/100} ;  */
    /* height:${height * parseFloat('25%')/100}; */
    height:${props => props.height ? props.height : 'auto'};
    background-color:#fff;
    /* background-color:rgba(205,205,193,0.8); */
    margin:2px;
    border-radius:5px;
    align-items: center;
    justify-content: center;
    padding:5px;
    padding-left:10px;
    /* border-width: 0.3px; */
    elevation: 10;    
`;

export const ContainerCampos =  styled.View `
      width: ${props => props.width};
      flex-direction: row;
     
`

export const ContainerInput = styled.View `
  
  width: ${props=>props.width};
  align-items: stretch;
  justify-content: space-between;
  padding-right:5px;
`;

export const TituloCampos = styled.Text `
  font-size: 14px;
  text-align: center;
  font-weight: bold;
  padding-bottom: 5px;
  width: 100%;
  border-bottom-width: 1px;
  border-color: #fff;
  color: #006400;
  
`;

