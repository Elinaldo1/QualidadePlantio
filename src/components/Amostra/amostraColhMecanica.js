import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import {
  Botao,
  BotaoCadastro, BotaoText, CenterView, Cobricao, Container,
  ContainerGemas, ContainerSecoes, Data,
  Espaco_linha, Esteira, Fazenda,
  Gemas_inviaveis, Gemas_total,
  Gemas_viaveis, Id,
  Lat,
  Long, NAmostra,
  Obs, Plantadora, Responsavel,
  Sulco,
  TituloTexto, Turno, Up
} from './style';



export default function AmostraColhMecanica({data, editar, excluir, novaAmostra}) {
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
            <TituloTexto>Líder:</TituloTexto>
            <Responsavel>{data.lider}</Responsavel>
          {/* </CenterView>

          <CenterView> */}
            <TituloTexto>Fazenda:</TituloTexto>
            <Fazenda>{data.fazenda}</Fazenda>

            <TituloTexto>Código Fazenda:</TituloTexto>
            <Fazenda>{data.codFazenda}</Fazenda>

            <TituloTexto>Área:</TituloTexto>
            <Up>{data.area} m²</Up>
            
          {/* </CenterView>
          <CenterView> */}
            <TituloTexto>Frente:</TituloTexto>
            <Up>{data.frente}</Up>
          

            <TituloTexto>Turno:</TituloTexto>
            <Turno>{data.turno}</Turno>
          {/* </CenterView>

          <CenterView> */}
            <TituloTexto>Frota:</TituloTexto>
            <Plantadora>{data.colhedora}</Plantadora>  
          {/* </CenterView>

          <CenterView> */}
            <TituloTexto>Operador:</TituloTexto>
            <Plantadora>{data.operador}</Plantadora>  
          </CenterView>

        </ContainerGemas>
    </ContainerSecoes>

    <ContainerSecoes>
      <TituloTexto>AMOSTRA</TituloTexto>
      <ContainerGemas>
        <CenterView>
          <TituloTexto>Nº:</TituloTexto>
          <NAmostra>{data.amostra}</NAmostra>

          <TituloTexto>Talhão:</TituloTexto>
          <Esteira>{data.talhao}</Esteira> 

        </CenterView>
      </ContainerGemas>
    </ContainerSecoes>
    
    <ContainerSecoes> 
      <TituloTexto>PESO(kG) PERDAS</TituloTexto>
      <ContainerGemas> 
        <CenterView>

          <TituloTexto>Tolete:</TituloTexto>
          <Sulco>{data.tolete}</Sulco>

          <TituloTexto>Cana Inteira:</TituloTexto>
          <Cobricao>{data.inteira}</Cobricao>
 
          <TituloTexto>Estilhaço:</TituloTexto>
          <Espaco_linha>{data.estilhaco}</Espaco_linha>

          <TituloTexto>Toco:</TituloTexto>
          <Gemas_total>{data.toco}</Gemas_total>

          <TituloTexto>Pedaço:</TituloTexto>
          <Gemas_viaveis>{data.pedaco}</Gemas_viaveis>

          <TituloTexto>Ponta:</TituloTexto>
          <Gemas_inviaveis>{data.ponta}</Gemas_inviaveis>
        </CenterView>
      
        <CenterView> 
      <TituloTexto color = "#f22">PERDAS/Há:</TituloTexto>
          <Obs color = "#f229">{data.perda_ha} Tn/há</Obs>
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
 