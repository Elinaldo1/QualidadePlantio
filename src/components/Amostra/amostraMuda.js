import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import {
  Botao,
  BotaoCadastro, BotaoText, CenterView, Cobricao, Container,
  ContainerGemas, ContainerSecoes, Data,
  Espaco_linha, Fazenda,
  Gemas_inviaveis, Gemas_total,
  Gemas_viaveis, Id,

  Lat,
  Long, NAmostra,
  Obs, Plantadora, Responsavel,
  Sulco,
  TituloTexto, Turno, Up
} from './style';



export default function AmostraMuda({data, editar, excluir, novaAmostra}) {
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
          {/* </CenterView>

          <CenterView> */}
            <TituloTexto>Faz.:</TituloTexto>
            <Fazenda>{data.fazenda}</Fazenda>

            <TituloTexto>UP:</TituloTexto>
            <Up>{data.up}</Up>
          {/* </CenterView>
          
          <CenterView> */}
            <TituloTexto>Variedade:</TituloTexto>
            <Up>{data.variedade}</Up>

            <TituloTexto>Turno:</TituloTexto>
            <Turno>{data.turno}</Turno>
          {/* </CenterView>

          <CenterView> */}
            <TituloTexto>Frota:</TituloTexto>
            <Plantadora>{data.colhedora}</Plantadora>  
          {/* </CenterView>

        <CenterView> */}
          <TituloTexto>Nº Amostra:</TituloTexto>
          <NAmostra>{data.amostra}</NAmostra>
        </CenterView>

        </ContainerGemas>
    </ContainerSecoes>
    
    <ContainerSecoes> 
      <TituloTexto>COMPRIMENTO TOLETES</TituloTexto>
      <ContainerGemas> 
        <CenterView>

          <TituloTexto>{'<35 cm: '}</TituloTexto>
          <Sulco>{data.tol_menor}</Sulco>

          <TituloTexto color = "green">35 a 40 cm: </TituloTexto>
          <Cobricao color = "green">{data.tol_padrao}</Cobricao>

          <TituloTexto>{'>40 cm: '}</TituloTexto>
          <Cobricao>{data.tol_maior}</Cobricao>
        </CenterView>
      </ContainerGemas>
    </ContainerSecoes>
    
     
    <ContainerSecoes>
      <TituloTexto>ALTURA DO CORTE</TituloTexto> 
      <ContainerGemas>
        <CenterView>
          <TituloTexto>Altura:</TituloTexto>
          <Espaco_linha>{data.altura_ct} cm</Espaco_linha>
        </CenterView>
      </ContainerGemas>
     </ContainerSecoes>

    <ContainerSecoes>
      <TituloTexto>QUALIDADE TOLETES</TituloTexto> 
      <ContainerGemas>
        <CenterView>
          <TituloTexto color = "green">Bom:</TituloTexto>
          <Gemas_total color = "green">{data.tol_bom}</Gemas_total>

          <TituloTexto>Regular:</TituloTexto>
          <Gemas_viaveis>{data.tol_regular}</Gemas_viaveis>

          <TituloTexto color = "red">Ruim:</TituloTexto>
          <Gemas_inviaveis color = "red">{data.tol_ruim}</Gemas_inviaveis>
        </CenterView>   
      </ContainerGemas>
     </ContainerSecoes>
    
    <ContainerSecoes>
      <TituloTexto>N° DE GEMAS</TituloTexto> 
      <ContainerGemas>
        <CenterView>
          <TituloTexto color = "green">Viáveis:</TituloTexto>
          <Gemas_total color = "green">{data.gemas_viaveis}</Gemas_total>

          <TituloTexto color = "red">Inviáveis:</TituloTexto>
          <Gemas_viaveis color = "red">{data.gemas_inviaveis}</Gemas_viaveis>

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
        <Botao onPress = {() => editar(data)} >
          <AntDesign name = 'edit' style = {{fontSize: 20}} />
          <BotaoText>Editar</BotaoText>
        </Botao>
        
        <Botao onPress = {() => excluir(data.id)} >
          <AntDesign name = 'delete' style = {{fontSize: 20}} />
          <BotaoText>Excluir</BotaoText>
        </Botao>
        <BotaoCadastro onPress = {()=>{novaAmostra()}}>
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
 