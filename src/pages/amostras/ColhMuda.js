import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { AmostraMuda } from '../../components/Amostra';
import Header from '../../components/header';
import getRealm, { excluirRealm } from '../../services/index';
import {
  BotaoCadastro, Container, ConteinerMensagem, List,
  styles, Text, TextMensagem
} from './styles';

export default function Amostra( ) {

  const navigation = useNavigation();
  const [amostras, setAmostras] = useState([]);
  const schema = 'SchemaMuda'
  
  useEffect(() => {

    const foco = navigation.addListener('focus', async () =>{
        buscaAmostra();
      });
      return foco;
  },[navigation]);

  async function buscaAmostra(){
    const realm = await getRealm();
    const data =  realm.objects(schema).sorted('id',true);

    if (data.length>0){

      setAmostras(data);
    }
  }

   async function excluirAmostra (data) {
      const realm = await getRealm();

      excluirRealm(data,schema,'id');
      
      const amostrasAtuais = await realm.objects(schema).sorted('id',true)
      setAmostras(amostrasAtuais);
      alert('Registro '+ data +' excluído!')
  }

   async function editarAmostra(data){

     await AsyncStorage.setItem('editar','sim')

     navigation.navigate('Apontar Amostra',{
      id:data.id, 
      data: data.data,
      responsavel: data.responsavel,
      variedade: data.variedade,
      fazenda: data.fazenda,
      up:data.up,
      colhedora:data.colhedora,
      turno:data.turno,
      amostra:data.amostra,
      tol_menor:data.tol_menor,
      tol_padrao:data.tol_padrao,
      tol_maior:data.tol_maior,
      altura_ct:data.altura_ct,
      tol_bom:data.tol_bom,
      tol_regular:data.tol_regular,
      tol_ruim:data.tol_ruim,
      gemas_viaveis:data.gemas_viaveis,
      gemas_inviaveis:data.gemas_inviaveis,
      obs: data.obs,
      })
      
   }

  return amostras.length>0 ? (
    
    <>
      <Header caption="AMOSTRAS COLHEITA MUDA" />
      <Container style={styles.container}>
        <Text>{amostras.length} Amostras</Text>
        <List
          showsVerticalScrollIndicator = {false}
          keyboardsShouldPersistTaps='handle'
          data={amostras}
          // data={dados}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (<AmostraMuda 
            data = {item} 
            editar={editarAmostra} 
            excluir={excluirAmostra}
            novaAmostra = {() => navigation.navigate('Apontar Amostra')}
            />)}
        />
      </Container>

    </>
  ):(
    <>
    <Header caption="AMOSTRAS COLHEITA MUDA" />
    <Container style={styles.container}>
       <BotaoCadastro onPress = {()=>navigation.navigate('Apontar Amostra')}>
         <AntDesign name = 'addfile' size = {50} color = '#111' style={{marginBottom:15}}  />
         <TextMensagem>NOVA AMOSTRA</TextMensagem>
       </BotaoCadastro>
       <ConteinerMensagem>
         <TextMensagem>! Não tem amostras cadastradas</TextMensagem>
         <TextMensagem>Após o cadastro volte aqui para conferir</TextMensagem>

       </ConteinerMensagem>
    </Container>
    </>
  )

}

