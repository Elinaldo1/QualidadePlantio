import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import {
  Botao,
  BotaoCadastro, BotaoText, CenterView, Container,
  ContainerGemas, ContainerSecoes, Data,
  Esteira, Fazenda,

  Id,

  Lat,
  Long, NAmostra,
  Plantadora, Responsavel,

  TituloTexto, Turno, Up
} from './style';



export default function Amostra({data, editar, excluir, novaAmostra}) {
  const navigation = useNavigation();
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
            
            <TituloTexto>Responsavel:</TituloTexto>
            <Responsavel>{data.responsavel}</Responsavel>

            <TituloTexto>Faz.:</TituloTexto>
            <Fazenda>{data.fazenda}</Fazenda>

            <TituloTexto>UP:</TituloTexto>
            <Up>{data.up}</Up>

            <TituloTexto>Ponto:</TituloTexto>
            <Turno>{data.ponto}</Turno>
            
            <TituloTexto>Talhão:</TituloTexto>
            <Up>{data.talhao}</Up>


            <TituloTexto>Cana:</TituloTexto>
            <Plantadora>{data.cana}</Plantadora>  
          </CenterView>

        </ContainerGemas>
    </ContainerSecoes>

    <ContainerSecoes>
      <TituloTexto>ENTRENÓS</TituloTexto>
      <ContainerGemas>
        <CenterView>
          <TituloTexto>Totais:</TituloTexto>
          <NAmostra>{data.entreno_total}</NAmostra>

          <TituloTexto>Brocados:</TituloTexto>
          <Esteira>{data.entreno_bc}</Esteira> 

      <TituloTexto color = "#f228" >Brocados(%):
      </TituloTexto>
          <NAmostra color = "#f22">{((parseInt(data.entreno_bc))/(parseInt(data.entreno_total))*100).toFixed(1)}%</NAmostra>
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
        <Botao onPress = {() => editar(data)} >
          <AntDesign name = 'edit' style = {{fontSize: 20}} />
          <BotaoText>Editar</BotaoText>
        </Botao>
        
        <Botao onPress = {() => excluir(data.id)} >
          <AntDesign name = 'delete' style = {{fontSize: 20}} />
          <BotaoText>Excluir</BotaoText>
        </Botao>
        <BotaoCadastro onPress = {()=>novaAmostra() }>
          <AntDesign name = 'pluscircleo' style = {{fontSize: 30}} />
        </BotaoCadastro>

      </CenterView> 
    
   </Container>):(

     <Container>
      <CenterView>
        <ActivityIndicator size = 'large' color = '#fff' />
      </CenterView> 
     </Container>
   )
  
};
 