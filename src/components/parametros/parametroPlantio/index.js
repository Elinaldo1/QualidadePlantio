import React from 'react';
import {
  Botao,
  BotaoText, CenterView, Container,
  ContainerGemas, ContainerSecoes,
  Texto,
  TituloTexto
} from './styles';


export default function ParamPlantio({data}) {
 return (
   <Container> 
    <ContainerSecoes> 
      <TituloTexto>PROFUNDIDADE SULCAÇÂO</TituloTexto>
      <ContainerGemas> 
        <CenterView>
          <Texto>{data.sulco} cm</Texto>
        </CenterView>       
      </ContainerGemas>
    </ContainerSecoes>

    <ContainerSecoes>
        <TituloTexto>ESPAÇAMENTO ENTRE_LINHAS</TituloTexto>
        <ContainerGemas> 
          <CenterView>
            <Texto>{data.espaco_linha} Mt</Texto>
          </CenterView>
        </ContainerGemas>
    </ContainerSecoes>

    <ContainerSecoes>
      <TituloTexto>ALTURA COBRIÇÂO</TituloTexto>
      <ContainerGemas>
        <CenterView>
          <Texto>{data.cobricao} cm</Texto>
        </CenterView>
      </ContainerGemas>
    </ContainerSecoes>
    
     
    <ContainerSecoes>
      <TituloTexto>GEMAS VIÀVEIS/METRO</TituloTexto> 
      <ContainerGemas>
        <CenterView>
          <Texto>{data.gemas_viaveis}</Texto>
        </CenterView>
      </ContainerGemas>
     </ContainerSecoes>
 
      <CenterView>
        <Botao onPress = {() => {}} >
          <BotaoText>Editar</BotaoText>
        </Botao>
        
        <Botao onPress = {() => {}} >
          <BotaoText>Excluir</BotaoText>
        </Botao>
      </CenterView> 
    
   </Container>
  );
}
 