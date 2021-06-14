import styled from 'styled-components';

export const Container = styled.View `

  
  padding: 10px;
  border-radius: 5px;
  background: #fff;
  margin-bottom: 15px;
  elevation:7;
`;
export const ContainerSecoes = styled.View `
  align-items: center;
  border-bottom-width: 1px;
  border-radius: 10px;
  border-color: #1114;
  padding-top: 1px;
  margin-bottom:5px
  
`;

export const ContainerGemas = styled.View `
  padding: 5px;
  border-radius: 5px;
  background: #fff;
  margin-bottom: 5px;
  align-items:center;
  justify-content: space-around;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  

`;



export const Texto = styled.Text `
    font-size: 16px;
    font-style: italic;
    margin-right: 15px;
`;
export const TituloTexto = styled(Texto) `
  font-weight: bold;
  margin-right:5px;
`;
export const TituloGemas = styled(Texto) `
  font-weight: bold;
  margin-right:5px;
`;

export const CenterView = styled.View `
    flex-direction: row;
    margin-top: 15px;
    flex-wrap: wrap;
`;

export const Botao = styled.TouchableOpacity `
    background-color: #ddd;
    padding: 5px;
    margin-right: 15px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    
`;

export const BotaoText = styled(Texto) `
  color: #000;
  font-size: 16px;
  text-align: center

`;