import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { AmostraPlantio } from '../../components/Amostra';
import Header from '../../components/header/index';
import getRealm, { excluirRealm } from '../../services/index';
import {
  BotaoCadastro,
  Container, ConteinerMensagem,
  List, styles, Text, TextMensagem
} from './styles';


export default function Amostra() {

  const navigation = useNavigation();
  const [amostras, setAmostras] = useState([]);
  const schema = 'Plantio'
  
  useEffect(() => {
    
    const foco = navigation.addListener('focus', async () =>{
      
      const realm = await getRealm();
      const data =  realm.objects(schema).sorted('id',true);

        if (data.length>0){
            setAmostras(data);
          }
    });
    return foco;
  },[navigation]);

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
       id: data.id, 
       fazenda: data.fazenda,
       variedade: data.variedade,
       up:data.up,
       plantadora:data.plantadora,
       turno:data.turno,
       amostra:data.amostra,
       esteira:data.esteira,
       kg_amostra:data.kg_amostra,
       sulco:data.sulco,
       cobricao:data.cobricao,
       espaco_linha:data.espaco_linha,
       toletes:data.toletes,
       gemas_viaveis:data.gemas_viaveis,
       gemas_inviaveis:data.gemas_inviaveis,
       obs: data.obs,
    }) 
  };

  return amostras.length>0 ? (
    
    <>
      <Header caption="AMOSTRAS PLANTIO" />
      <Container style={styles.container}>
      <Text>{amostras.length} Amostras</Text>
      <List
        showsVerticalScrollIndicator = {false}
        keyboardsShouldPersistTaps='handle'
        data={amostras}
        // data={dados}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (<AmostraPlantio data = {item} editar={editarAmostra} excluir={excluirAmostra} />)}
      />
      </Container>
    </>
  ):(
    <>
    <Header caption="AMOSTRAS PLANTIO" />
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

