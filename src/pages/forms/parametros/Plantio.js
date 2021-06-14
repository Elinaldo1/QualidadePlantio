import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import { ThemeProvider } from 'styled-components';
import * as Yup from 'yup';
import InputText from '../../../components/forms/input';
import Header from '../../../components/header';
import getRealm, { criarEditarRealm } from '../../../services';
import {
  Botao, BotaoText, BotaoVoltar,
  Campos, CenterView, Container, ContainerInput,
  ContainerMsg, Texto, TituloCampos
} from './styles';

const cores = {
  border: '#111'
}

const ParamPlantio = () => {
  
  const schema = 'ParamPlantio';
  const [parametro, setParametro] = useState([])
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

  function limpaCampos(){
      setValues(values => ({
       ...values,
       sulco: '',
       espaco_linha: '',
       cobricao: '',
       gemas_v_metro: '',
       comp_avaliacao: '',
       
     })
      )};

  function navegar(){
    navigation.navigate('Parâmetros');
  };   
  
  
  const navigation = useNavigation();
  const [values, setValues] = useState ({ 
    sulco: '',
    espaco_linha: '',
    cobricao: '',
    gemas_v_metro: '',
    comp_avaliacao: '',
  })
  
  const validar = Yup.object().shape({
    sulco: Yup.string()
      .required('Sulco não pode está vazio'),    
    espaco_linha: Yup.string()
      .required('Espaço Linha não pode está vazio'),    
    cobricao: Yup.string()
      .required('Cobrição não pode está vazio'),    
    gemas_v_metro: Yup.string()
      .required('Gemas viáveis/metro não pode está vazio'),    
    comp_avaliacao: Yup.string()
      .required('Comprimento avaliação não pode está vazio'),    
  });
  
  async function  handleSubmit () {

     Keyboard.dismiss();
     const isValid = await  validar.isValid(values)
  
     if (isValid){

        const realm = await getRealm()
        
        const id = realm.objects(`${schema}`).sorted('id',true).length > 0
        ? realm.objects(`${schema}`).sorted('id', true)[0].id + 1 : 1;
        
        const data = new Date()
        
        const dados = {
          id: id,
          sulco: values.sulco.toString(),
          espaco_linha: values.espaco_linha.toString(),
          cobricao: values.cobricao.toString(),
          gemas_v_metro: values.gemas_v_metro.toString(),
          comp_avaliacao: values.comp_avaliacao.toString(),
        }
        
        criarEditarRealm(dados,schema)
       
        Alert.alert('Parâmetros Plantio Plantio','Salvo com sucesso!')
        limpaCampos();
        navegar();

  
     }else{Alert.alert('Campo Vazio','Preencha todos os campos obrigatórios')}
    }
    
  return parametro.length > 0 ? (

    <>
    <Header caption = 'CADASTRAR PARÂMETROS PLANTIO' />
    <ContainerMsg>
      <BotaoVoltar>
        <AntDesign name = "arrowleft" size= {30} color = '#fff'/>
        <BotaoText onPress = {()=>navigation.navigate('Parâmetros')} >VISUALIZAR</BotaoText>
      </BotaoVoltar>
      <Texto>Parâmetros já cadastrado!</Texto>
    </ContainerMsg>
    </>
  

  ):(
    <ThemeProvider theme={cores}>
  
    <Header caption = "CADASTRAR PARÂMETROS PLANTIO"/>
    
    <Container
      onMomentumScrollEnd={e => {}}
    >
    <Campos>
      <TituloCampos>PARÂMETROS</TituloCampos> 
    
      <ContainerInput width= '50%' >
        <Texto>Profundidade Sulco(cm)</Texto>
        <InputText
            value={values.sulco}
            onChangeText={text => setValues(values => ({...values, sulco: text}))}
            placeholder = "ex: 10"
        />
      </ContainerInput >
    
      <ContainerInput width= '50%' >
        <Texto>Espaço Linha(Mt)</Texto>
        <InputText
            value={values.espaco_linha}
            onChangeText={text => setValues(values => ({...values, espaco_linha: text}))}
            // keyboardType = 'numeric'
            placeholder = 'ex: 1.2 a 1.11'
            
        />
      </ContainerInput >
    
      <ContainerInput width= '33%' >
        <Texto>Altura Cobrição(cm)</Texto>
        <InputText
              value={values.cobricao}
              onChangeText={text => setValues(values => ({...values, cobricao: text}))}
              // keyboardType = 'numeric'
              placeholder = 'ex: 1 a 5'
              />
      </ContainerInput>
    
      <ContainerInput width= '33%'>
        <Texto>Gemas viáveis/Metro</Texto>
        <InputText
              // keyboardType = 'numeric'
              value={values.gemas_v_metro}
              onChangeText={text => setValues((values) => ({...values, gemas_v_metro: text}))}
              placeholder = 'ex: 1 a 5'
              />
      </ContainerInput>
    
      <ContainerInput width = '33%'> 
        <Texto>Comprimento da Avaliação(Mt)</Texto>
        <InputText 
            keyboardType = 'numeric'
            placeholder = ''
            value={values.comp_avaliacao}
            onChangeText = {text => setValues((values) => ({...values, comp_avaliacao: text}))}
            />
      </ContainerInput>
    
    </Campos>
    </Container>
    
    <CenterView>
    
      <Botao
        onPress={() => handleSubmit()}
        title="SALVAR"
      >
        <BotaoText>Salvar</BotaoText>
      </Botao>
  
    </CenterView>
    
    </ThemeProvider>
  )
}

export default ParamPlantio;

  
