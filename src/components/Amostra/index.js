import React from 'react';
import { ActivityIndicator } from 'react-native';
import {
  Botao,
  BotaoText, CenterView, Cobricao, Container,
  ContainerGemas, ContainerSecoes, Data,
  Espaco_linha, Esteira, Fazenda,
  Gemas_inviaveis, Gemas_total,
  Gemas_viaveis, Id,
  Kg_amostra,
  Lat,
  Long, Matricula, NAmostra,
  Obs, Plantadora, Responsavel,
  Sulco,
  TituloGemas, TituloTexto, Toletes, Turno, Up
} from './style';


export default function Amostra({data, editar, excluir}) {
 return  data ? (
   <Container>
    <ContainerSecoes>
      <ContainerGemas>
        <CenterView>
          <TituloTexto>REGISTRO:</TituloTexto>
          <Id>{data.id}</Id>

          <TituloTexto>Data:</TituloTexto>
          <Data>{data.data}</Data>
        </CenterView>
      </ContainerGemas>
    </ContainerSecoes>
     
    <ContainerSecoes>
        <TituloTexto>IDENTIFICAÇÃO</TituloTexto>
        <ContainerGemas> 
          <CenterView>
            <TituloTexto>Matricula:</TituloTexto>
            <Matricula>{data.matricula}</Matricula>
          </CenterView>

          <CenterView>
            <TituloTexto>Responsavel:</TituloTexto>
            <Responsavel>{data.responsavel}</Responsavel>
          </CenterView>

          <CenterView>
            <TituloTexto>Faz.:</TituloTexto>
            <Fazenda>{data.fazenda}</Fazenda>

            <TituloTexto>UP:</TituloTexto>
            <Up>{data.up}</Up>

            <TituloTexto>Turno:</TituloTexto>
            <Turno>{data.turno}</Turno>
          </CenterView>
          
          <CenterView>
            <TituloTexto>Frota:</TituloTexto>
            <Plantadora>{data.plantadora}</Plantadora>
            
          </CenterView>
        </ContainerGemas>
    </ContainerSecoes>

    <ContainerSecoes>
      <TituloTexto>AMOSTRA</TituloTexto>
      <ContainerGemas>
        <CenterView>
          <TituloTexto>Nº:</TituloTexto>
          <NAmostra>{data.amostra}</NAmostra>

          <TituloTexto>Esteira:</TituloTexto>
          <Esteira>{data.esteira}</Esteira> 
          
          <TituloTexto>Kg_Amostra:</TituloTexto>
          <Kg_amostra>{data.kg_amostra} Kg</Kg_amostra> 
        </CenterView>
      </ContainerGemas>
    </ContainerSecoes>
    
    <ContainerSecoes> 
      <TituloTexto>PROFUNDIDADE E ESPAÇAMENTO</TituloTexto>
      <ContainerGemas> 
        <CenterView>

          <TituloTexto>Sulco:</TituloTexto>
          <Sulco>{data.sulco} cm</Sulco>

          <TituloTexto>Cobrição:</TituloTexto>
          <Cobricao>{data.cobricao} cm</Cobricao>
        </CenterView>
        
        <CenterView>
          <TituloTexto>Entre Linha:</TituloTexto>
          <Espaco_linha>{data.espaco_linha} Mt</Espaco_linha>
        </CenterView>
      </ContainerGemas>
    </ContainerSecoes>
    
     
    <ContainerSecoes>
      <TituloTexto>GEMAS</TituloTexto> 
      <ContainerGemas>
        <CenterView>
          <TituloTexto>Total:</TituloTexto>
          <Gemas_total>{data.gemas_total}</Gemas_total>

          <TituloTexto>Viaveis:</TituloTexto>
          <Gemas_viaveis>{data.gemas_viaveis}</Gemas_viaveis>

          <TituloTexto>Inviáveis:</TituloTexto>
          <Gemas_inviaveis>{data.gemas_inviaveis}</Gemas_inviaveis>
        </CenterView>
        
        <CenterView>
          <TituloGemas>Qtd Toletes:</TituloGemas>
          <Toletes>{data.toletes}</Toletes>
        </CenterView>
      </ContainerGemas>
     </ContainerSecoes>

    <ContainerSecoes>
      <TituloTexto>OBSERVAÇÃO</TituloTexto>
      <ContainerGemas>
        <CenterView> 
          <Obs>{data.obs}</Obs>
        </CenterView>
      </ContainerGemas>
    </ContainerSecoes> 

     <ContainerSecoes>
      <TituloTexto>LOCALIZAÇÃO</TituloTexto>
        <ContainerGemas> 
          <CenterView>
            <TituloTexto>Lat:</TituloTexto>
            <Lat>{data.lat}</Lat>
          </CenterView>
          
          <CenterView>
            <TituloTexto>Long:</TituloTexto>
            <Long >{data.long}</Long>
          </CenterView>
        </ContainerGemas>
      </ContainerSecoes>
 
      <CenterView>
        <Botao onPress = {() => editar(data.id)} >
          <BotaoText>Editar</BotaoText>
        </Botao>
        
        <Botao onPress = {() => excluir(data.id)} >
          <BotaoText>Excluir</BotaoText>
        </Botao>
      </CenterView> 
    
   </Container>):(
     <Container>
      <CenterView>
        <Botao onPress = {() => editar(data.id)} >
          <BotaoText>Editar</BotaoText>
        </Botao>
        
        <Botao onPress = {() => excluir(data.id)} >
          <BotaoText>Excluir</BotaoText>
        </Botao>
      </CenterView> 
       <ActivityIndicator size = 'large' color = '#fff' />
     </Container>
   );
  
};
 