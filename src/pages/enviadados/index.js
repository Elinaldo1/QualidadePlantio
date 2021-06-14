import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Header from '../../components/header';
import Parametro from '../../components/parametros/parametroMuda';
import getRealm, { excluirRealm } from '../../services/index';
import { Botao, Container, List, styles, TextBotao } from './styles';

export default function PrMuda() {

  const navigation = useNavigation()
  const [parametro, setParametro] = useState([]);
  const schema = 'ParamMuda';
  const [load, setLoad] = useState(true);
 
  useEffect(() => {

    navigation.addListener('focus', async () =>{

        setLoad(!load)
        const realm = await getRealm();
          
        const data =  realm.objects(schema);
  
        if (data.length>0){
    
          setParametro(data);
        }
      })
  },[load,navigation]);


  async function excluirParam (data) {
    const realm = await getRealm();

    excluirRealm(data,schema,'id');
    
    const paramAtual = await realm.objects(schema).sorted('id',true)
    setParametro(paramAtual);
    alert('Parâmetro '+ data +' excluído!')
  }

  function editarParam(data){
      Alert.alert('Recurso Indisponível', 'Caso deseje modificar os dados exclua o arquivo e cadastre novamente')
  }

  return (
   parametro.length>0 ? (
   <>
      <Header caption="Eviar Dados" />
      <Container style={styles.container}>

      <List
        showsVerticalScrollIndicator = {false}
        keyboardsShouldPersistTaps='handle'
        data={parametro}
        // data={dados}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (<Parametro data = {item} excluir = {excluirParam} editar = {editarParam}/>)}
      />
      </Container>

    </>
    ):
(      <> 
        <Header caption="Parâmetros Muda" />
        <Container>
          <Botao onPress = {() => navigation.navigate('cadParamColhMuda')} >
            <TextBotao>CADASTRAR PARÂMETROS</TextBotao>
          </Botao>
        </Container>
      </>)
    
  );

}