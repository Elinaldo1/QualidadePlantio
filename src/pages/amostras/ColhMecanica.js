import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { AmostraColhMecanica } from '../../components/Amostra';
import Header from '../../components/header/index';
import { AuthContext } from '../../contexts/auth';
import insert from '../../services/enviadados';
import getRealm, { excluirRealm } from '../../services/index';
import { Botao, BotaoCadastro, Container, ConteinerMensagem, List, styles, Text, TextBotao, TextMensagem } from './styles';

export default function Amostra() {

  const navigation = useNavigation();
  const [amostras, setAmostras] = useState([]);
  const [idEdit, setIdEdit] = useState(null);
  // const [valorAtual, setValorAtual] = useState(0)
  const [load, setLoad] = useState(true);
  const schema = 'SchemaColhMecanica'

  const {usuario} = useContext(AuthContext);
  
  useEffect(() => {

    const foco = navigation.addListener('focus', async () =>{

        setLoad(!load)
        const realm = await getRealm();
        const data =  realm.objects(schema).sorted('id',true);
         
        if (data.length>0){
    
          setAmostras(data);
        }
      });
      return foco;
  },[navigation]);

     async function usuarios(){
       await usuario()
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
      codFazenda: data.codFazenda,
      fazenda:data.fazenda,
      colhedora:data.colhedora,
      turno:data.turno,
      talhao: data.talhao,
      amostra:data.amostra,
      frente:data.frente,
      lider:data.lider,
      operador:data.operador,
      tolete:data.tolete,
      inteira:data.inteira,
      estilhaco:data.estilhaco,
      toco:data.toco,
      pedaco:data.pedaco,
      ponta:data.ponta,
      obs: data.obs
      })
      
  }

  async function enviadados (){
    if (amostras.length>0){ 
      await insert(amostras,'baseqchmec',schema)
    }else{
      Alert.alert('Sync Amostras','Não há dados para enviar')
    }
  }  

  return amostras.length>0 ? (
    
    <>
      <Header caption="AMOSTRAS COLHEITA MECÂNICA" />
      <Container style={styles.container}>
      <Text>{amostras.length}  Amostras</Text>
      <List
        showsVerticalScrollIndicator = {false}
        keyboardsShouldPersistTaps='handle'
        data={amostras}
        // data={dados}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (<AmostraColhMecanica data = {item} editar={editarAmostra} 
          excluir={excluirAmostra} 
          novaAmostra={() => navigation.navigate('Apontar Amostra')}
          />)}
      />
      </Container>
{/*         
       <Botao onPress = {()=>{excluirSchemaRealm(schema)}}>
         <TextBotao>busca amostras</TextBotao>
       </Botao> */}
       <Botao onPress = {()=>enviadados()}>
         <TextBotao>enviar ao server</TextBotao>
       </Botao>

    </>
  ):(
    <>
    <Header caption="AMOSTRAS COLHEITA MECÂNICA" />
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

