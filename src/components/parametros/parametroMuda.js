import React from 'react';
import {
  Botao,
  BotaoText, CenterView, Container,
  ContainerGemas, ContainerSecoes,
  Texto,
  TituloTexto
} from './styles';


export default function ParamMuda({data, editar, excluir}) {
 return (
   <Container> 
    <ContainerSecoes> 
      <TituloTexto>COMPRIMENTO TOLETE</TituloTexto>
      <ContainerGemas> 
        <CenterView>
          <Texto>{data.comp_tolete} cm</Texto>
        </CenterView>       
      </ContainerGemas>
    </ContainerSecoes>

    <ContainerSecoes>
        <TituloTexto>ALTURA DO CORTE</TituloTexto>
        <ContainerGemas> 
          <CenterView>
            <Texto>{data.altura_corte} Mt</Texto>
          </CenterView>
        </ContainerGemas>
    </ContainerSecoes>

    <ContainerSecoes>
      <TituloTexto>TAMANHO DA AMOSTRA</TituloTexto>
      <ContainerGemas>
        <CenterView>
          <Texto>{data.tam_amostra} UN</Texto>
        </CenterView>
      </ContainerGemas>
    </ContainerSecoes>
    
     
    <ContainerSecoes>
      <TituloTexto>QUALIDADE TOLETES</TituloTexto> 
      <ContainerGemas>
        <CenterView>
          <Texto>{data.qualidade_tolete}</Texto>
        </CenterView>
      </ContainerGemas>
     </ContainerSecoes>
     
    <ContainerSecoes>
      <TituloTexto>TOLETE BOM</TituloTexto> 
      <ContainerGemas>
        <CenterView>
          <Texto>{data.tolete_bom}</Texto>
        </CenterView>
      </ContainerGemas>
     </ContainerSecoes>

    <ContainerSecoes>
      <TituloTexto>TOLETE REGULAR</TituloTexto> 
      <ContainerGemas>
        <CenterView>
          <Texto>{data.tolete_regular}</Texto>
        </CenterView>
      </ContainerGemas>
    </ContainerSecoes>

    <ContainerSecoes>
      <TituloTexto>TOLETE RUIM</TituloTexto> 
      <ContainerGemas>
        <CenterView>
          <Texto>{data.tolete_ruim}</Texto>
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
 