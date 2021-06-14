import styled from 'styled-components';

export const Container = styled.View `

  justify-content: center;
  padding: 10px;
  border-radius: 5px;
  background: #fff;
  margin: 3px;
  elevation:7;
`;
export const ContainerSecoes = styled.View `
  align-items: center;
  border-bottom-width: 1px;
  border-radius: 10px;
  border-color: #1114;
  padding-top: 1px;

  
`;

export const ContainerGemas = styled.View `
  padding: 5px;
  border-radius: 5px;
  background: #fff;
  margin-bottom: 5px;
  align-items:center;
  justify-content: space-evenly;
  width: 100%;
  flex-direction: row; 
   flex-wrap: wrap;

`;



export const Texto = styled.Text `
    font-size: 14px;
    font-style: italic;
    margin-right: 15px;
    color:${props => props.color ? props.color :"#1119" };
`;
export const TituloTexto = styled(Texto) `
  font-weight: bold;
  margin-right:5px;
  color:${props => props.color ? props.color :"#1119" }; 
`;
export const TituloGemas = styled(Texto) `
  font-weight: bold;
  margin-right:5px;
`;
export const Id = styled(Texto) `

`;

export const Data = styled(Texto) `

`;

export const Matricula = styled(Texto) `

`;

export const Responsavel = styled(Texto) `

`;

export const Amostra = styled(Texto) `

`;

export const Fazenda = styled(Texto) `

`;

export const Up = styled(Texto) `

`;

export const Plantadora = styled(Texto) `

`;
 
export const Turno = styled(Texto) `

`;
 
export const NAmostra = styled(Texto) `

`;

export const Esteira = styled(Texto) `

`;
 
export const Kg_amostra = styled(Texto) `

`;
 
export const Sulco = styled(Texto) `

`;

export const Cobricao = styled(Texto) `

`;

export const Espaco_linha = styled(Texto) `

`;

export const Toletes = styled(Texto) `

`;

export const Gemas_total = styled(Texto) `

`;

export const Gemas_viaveis = styled(Texto) `

`;

export const Gemas_inviaveis = styled(Texto) `

`;

export const Obs = styled(Texto) `

`;

export const Lat = styled(Texto) `

`;

export const Long = styled(Texto) `

`;

export const CenterView = styled.View `
    flex-direction: row;
    margin-top: 15px;
    flex-wrap: wrap;
    align-items:center;
    justify-content:center
`;

export const Botao = styled.TouchableOpacity `
    background-color: #ddd;
    padding: 5px;
    margin-right: 15px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    flex-direction:row;
    
`;
export const BotaoCadastro = styled.TouchableOpacity `
   
    margin-right: 15px;
    border-radius: 50px;
    align-items: center;
    justify-content: center;
    align-self: flex-end;

    
`;

export const BotaoText = styled(Texto) `
  color: #000;
  font-size: 16px;
  text-align: center

`;