import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Header from '../../components/header';
import Parametro from '../../components/parametros/paramColhMecanica';
import getRealm, { excluirRealm } from '../../services/index';
import { Botao, Container, List, styles, TextBotao } from './styles';

export default function PrColhMecanica() {

  const navigation = useNavigation()
  const [parametro, setParametro] = useState([]);
  const schema = 'ParamColhMecanica';
  const [load, setLoad] = useState(true);
 
  useEffect(() => {

    const foco = navigation.addListener('focus', async () =>{

        setLoad(!load)
        const realm = await getRealm();
          
        const data =  realm.objects(schema);
  
        if (data.length>0){
    
          setParametro(data);
        }
      });
      return foco;
  },[load,navigation]);


  async function excluirParam (data) {
    const realm = await getRealm();

    excluirRealm(data,schema,'id');
    
    const paramAtual = await realm.objects(schema).sorted('id',true)
    setParametro(paramAtual);
    alert('Parâmetro '+ data +' excluído!')
  }

  async function editarParam(data){

    Alert.alert('Recurso Indisponível', 'Caso deseje modificar os dados exclua o arquivo e cadastre novamente');
    return
   

    await AsyncStorage.setItem('editar','sim');

    navigation.navigate('cadParamColhMec',{
      id: data.id,
      perda_toleravel: data.perda_toleravel,
      declive: data.declive,
      lombo_ent_lin: data.lombo_ent_lin,
      acamamento: data.acamamento  ,
      perdas_baixo: data.perdas_baixo,
      perdas_medio: data.perdas_medio,
      perdas_alto: data.perdas_alto,
    })
    
  }

  return (
   parametro.length>0 ? (
   <>
      <Header caption="Parâmetros Colheita Mecânica" />
      <Container style={styles.container}>

      <List
        showsVerticalScrollIndicator = {false}
        keyboardsShouldPersistTaps='handle'
        data={parametro}
        // data={dados}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (<Parametro data = {item} excluir = {excluirParam} editar = {editarParam} />)}
      />
      </Container>

    </>
    ):
(      <> 
        <Header caption="Parâmetros Colheita Mecânica" />
        <Container>
          <Botao onPress = {() => navigation.navigate('Cadastrar Parâmetros')} >
            <TextBotao>CADASTRAR PARÂMETROS</TextBotao>
          </Botao>
        </Container>
      </>)
    
  );

}

