import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { AmostraInfestacao } from '../../components/Amostra';
import Header from '../../components/header/index';
import insert from '../../services/enviadados';
import getRealm, { excluirRealm } from '../../services/index';
import { Botao, BotaoCadastro, Container, ConteinerMensagem, List, styles, Text, TextBotao, TextMensagem } from './styles';


export default function Amostra() {

  const navigation = useNavigation();
  const [amostras, setAmostras] = useState([]);
  const [TidEdit, setIdEdit] = useState(null);
  // const [valorAtual, setValorAtual] = useState(0)
  const [load, setLoad] = useState(true);
  const schema = 'Infestacao'
  
 useEffect(() => {

   const foco =  navigation.addListener('focus', async () =>{

        setLoad(!load)
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

    AsyncStorage.setItem('editar','sim');
    // console.log('levando dados '+ JSON.stringify(data))
    navigation.navigate('Apontar Amostra',{
      id: data.id,
      fazenda: data.fazenda,
      up: data.up,
      ponto: data.ponto,
      talhao: data.talhao,
      cana: data.cana,
      entreno_total: data.entreno_total,
      entreno_bc: data.entreno_bc,

    })
      
   }

  async function enviadados (){
    if (amostras.length>0){ 
      await insert(amostras, 'baselevinfestacao', schema)
    }else{
      Alert.alert('Sync Amostras','Não há dados para enviar')
    }
  }  

  return amostras.length>0 ? (
    
    <>
      <Header caption="AMOSTRAS INFESTAÇÃO" />
      <Container style={styles.container}>
      <Text>{amostras.length} Amostras</Text>
      <List
        showsVerticalScrollIndicator = {false}
        keyboardsShouldPersistTaps='handle'
        data={amostras}
        // data={dados}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (<AmostraInfestacao data = {item} editar={editarAmostra} excluir={excluirAmostra}
          novaAmostra = {()=>navigation.navigate('Apontar Amostra')} />)}
      />
      </Container>
{/*         
       <Botao onPress = {()=>{excluirSchemaRealm(schema)}}>
         <TextBotao>busca amostras</TextBotao>
       </Botao> */}
       <Botao onPress = {()=>enviadados()}>
         <TextBotao>Enviar ao Server</TextBotao>
       </Botao>

    </>
  ):(
    <>
    <Header caption="AMOSTRAS INFESTAÇÃO" />
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

