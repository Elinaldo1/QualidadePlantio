import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Amostras from '../../components/Amostra';
import Header from '../../components/header/index';
import { querie } from '../../databases';
import insert from '../../services/enviadados';
import getRealm, { excluirRealm } from '../../services/index';
import { Botao, BotaoCadastro, Container, ConteinerMensagem, List, styles, TextBotao, TextMensagem } from './styles';


export default function Amostra() {

  useEffect(() => {
    
    loadrealm();
    
  },[])
  async function loadrealm () {
    const realm = await getRealm();
    const data =  realm.objects('Plantio').sorted('id',true);
    setAmostras(data);
  };

    const navigation = useNavigation();
    const [amostras, setAmostras] = useState([]);
    // const [Total, setTotal] = useState(0)
    // const [valorAtual, setValorAtual] = useState(0)


   async function excluirAmostra (data) {
    const realm = await getRealm();

    excluirRealm(data,'Plantio','id');
    
    const amostrasAtuais = await realm.objects('Plantio').sorted('id',true)
    setAmostras(amostrasAtuais);
    alert('Registro '+ data +' excluído!')
  }

  function editarAmostra(){
    alert('editar')
  }

  async function enviadados (){
    if (amostras.length>0){ 
      await insert(amostras,querie)
        .catch(err => Alert.alert('Erro ao enviar',err))
      
      Alert.alert(`enviado ${amostras.length} de ${amostras.length} amostras`)  
    }else{
      Alert.alert('Sync Amostras','Não há dados para enviar')
    }
  }  

  return amostras.length>0 ? (
    
    <>
      <Header caption="AMOSTRAS" />
      <Container style={styles.container}>

      <List
        showsVerticalScrollIndicator = {false}
        keyboardsShouldPersistTaps='handle'
        data={amostras}
        // data={dados}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (<Amostras data = {item} editar={editarAmostra} excluir={excluirAmostra} />)}
      />
      </Container>
{/*         
       <Botao onPress = {()=>{excluirSchemaRealm('Plantio')}}>
         <TextBotao>busca amostras</TextBotao>
       </Botao> */}
       <Botao onPress = {()=>enviadados()}>
         <TextBotao>teste</TextBotao>
       </Botao>

    </>
  ):(
    <>
    <Header caption="AMOSTRAS" />
    <Container style={styles.container}>
       <BotaoCadastro onPress = {()=>navigation.navigate('Qualidade Plantio')}>
         <AntDesign name = 'addfile' size = {50} color = '#111'  />
       </BotaoCadastro>
       <ConteinerMensagem>
         <TextMensagem>! Não tem amostras cadastradas</TextMensagem>
         <TextMensagem>Após o cadastro volte aqui para conferir</TextMensagem>

       </ConteinerMensagem>
    </Container>
    </>
  )

}

