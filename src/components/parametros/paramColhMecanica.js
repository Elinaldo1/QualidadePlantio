import React from 'react';
import {
  Botao,
  BotaoText, CenterView, Container,
  ContainerGemas, ContainerSecoes,
  Texto,
  TituloTexto
} from './styles';


export default function ParamColhMecanica({data, editar, excluir}) {
 return (
   <Container> 
    <ContainerSecoes> 
      <TituloTexto>PERDA TOLERÁVEL</TituloTexto>
      <ContainerGemas> 
        <CenterView>
          <Texto>{data.perda_toleravel} cm</Texto>
        </CenterView>       
      </ContainerGemas>
    </ContainerSecoes>

    <ContainerSecoes>
        <TituloTexto>DECLIVE</TituloTexto>
        <ContainerGemas> 
          <CenterView>
            <Texto>{data.declive}</Texto>
          </CenterView>
        </ContainerGemas>
    </ContainerSecoes>

    <ContainerSecoes>
      <TituloTexto>LOMBO ENTRE LINHA</TituloTexto>
      <ContainerGemas>
        <CenterView>
          <Texto>{data.lombo_ent_lin}</Texto>
        </CenterView>
      </ContainerGemas>
    </ContainerSecoes>
    
     
    <ContainerSecoes>
      <TituloTexto>ACAMAMENTO CANA</TituloTexto> 
      <ContainerGemas>
        <CenterView>
          <Texto>{data.acamamento}</Texto>
        </CenterView>
      </ContainerGemas>
     </ContainerSecoes>

    <ContainerSecoes>
      <TituloTexto>NÍVEL DE PERDAS %</TituloTexto> 
      <ContainerGemas>
        <CenterView>
          <Texto>Baixo:</Texto>
          <Texto>{data.perdas_baixo}</Texto>
        </CenterView>
        <CenterView>
          <Texto>Médio:</Texto>
          <Texto>{data.perdas_medio}</Texto>
        </CenterView>
        <CenterView>
          <Texto>Alto:</Texto>
          <Texto>{data.perdas_alto}</Texto>
        </CenterView>
      </ContainerGemas>
     </ContainerSecoes>
 
      <CenterView>
        <Botao onPress = {() => {editar(data)}} >
          <BotaoText>Editar</BotaoText>
        </Botao>
        
        <Botao onPress = {() => {excluir(data.id)}} >
          <BotaoText>Excluir</BotaoText>
        </Botao>
      </CenterView> 
    
   </Container>
  );
}
 