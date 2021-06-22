import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import { ThemeProvider } from 'styled-components';
import * as Yup from 'yup';
import InputText from '../../../components/forms/input';
import Header from '../../../components/header';
import getRealm, { criarEditarRealm } from '../../../services';
import {
  Botao, BotaoText, BotaoVoltar, Campos, CenterView,
  Container, ContainerInput, ContainerMsg, Texto, TituloCampos
} from './styles';

const cores = {
  border: '#111'
}

const ParamMuda = ({route}) => {


  const navigation = useNavigation();
  const [load, setLoad] = useState(true)
  const schema = 'ParamMuda';
  const [parametro, setParametro] = useState([]);
  const [idEdit, setIdEdit] = useState(null);
  const [botaoSalvar, setBotaoSalvar] = useState('Salvar');
  const [editar, setEditar] = useState(false)

  const [values, setValues] = useState ({ 
    comp_tolete: '',
    altura_corte: '',
    tam_amostra: '',
    qualidade_tolete: '',
    tolete_bom: '',
    tolete_regular: '',
    tolete_ruim:'',
  })

  useEffect(() => {

    const foco =  navigation.addListener('focus', async () =>{
        
      setLoad(!load)
      const realm = await getRealm();
      
      const data =   realm.objects(schema);
      
      if (data.length>0){(async()=>{  
        
        setParametro(data);
        const edt = await AsyncStorage.getItem('editar');
          
            if (edt!==null) {
 
                 setEditar(true)
                 setIdEdit(route.params?.id);
                 setBotaoSalvar('Alterar')
                 setValues(values => ({
                   ...values,
                   comp_tolete: route.params?.comp_tolete,
                   altura_corte: route.params?.altura_corte,
                   tam_amostra: route.params?.tam_amostra,
                   qualidade_tolete: route.params?.qualidade_tolete,
                   tolete_bom: route.params?.tolete_bom,
                   tolete_regular: route.params?.tolete_regular,
                   tolete_ruim:route.params?.tolete_ruim,
 
                 }));
                 
           
              }else{
                 setEditar(false)
                 setIdEdit(null)
                 setBotaoSalvar('Salvar');
                 setValues(values => ({ 
                   ...values, 
                   comp_tolete: '',
                   altura_corte: '',
                   tam_amostra: '',
                   qualidade_tolete: '',
                   tolete_bom: '',
                   tolete_regular: '',
                   tolete_ruim:'',
 
                 }));
              };        
       }
     )(); }
       await AsyncStorage.removeItem('editar');
       });
       return foco;
 
   },[navigation]);

  function limpaCampos(){
      setValues(values => ({
       ...values,
       comp_tolete: '',
       altura_corte: '',
       tam_amostra: '',
       qualidade_tolete: '',
       tolete_bom: '',
       tolete_regular: '',
       tolete_ruim:'',
     })
      )};

  function navegar(){
    navigation.navigate('Parâmetros');
  };   
  
  const validar = Yup.object().shape({
    comp_tolete: Yup.string()
      .required('cComprimento tolete não pode está vazio'),    
    altura_corte: Yup.string()
      .required('Altura corte não pode está vazio'),    
    tam_amostra: Yup.string()
      .required('Tamanho amostra não pode está vazio'),    
    qualidade_tolete: Yup.string()
      .required('Qualidade tolete não pode está vazio'),    
    tolete_bom: Yup.string()
      .required('Tolete Bom não pode está vazio'),    
    tolete_regular: Yup.string()
      .required('Tolete regular avaliação não pode está vazio'),    
    tolete_ruim: Yup.string()
      .required('Tolete uim avaliação não pode está vazio'),    
  });
  
  async function  handleSubmit () {
    
    
    console.log(values)
  
     Keyboard.dismiss();
     const isValid = await  validar.isValid(values)
  
     if (isValid){

        if (idEdit===null){

              const realm = await getRealm()
              
              const id = realm.objects(`${schema}`).sorted('id',true).length > 0
              ? realm.objects(`${schema}`).sorted('id', true)[0].id + 1 : 1;
              
              const data = new Date()
              
              const dados = {
                id: id,
                comp_tolete: values.comp_tolete.toString(),
                altura_corte: values.altura_corte.toString(),
                tam_amostra: values.tam_amostra.toString(),
                qualidade_tolete: values.qualidade_tolete.toString(),
                tolete_bom: values.tolete_bom.toString(),
                tolete_regular: values.tolete_regular.toString(),
                tolete_ruim: values.tolete_ruim.toString(),
              }
              
              Keyboard.dismiss();
              criarEditarRealm(dados, schema, idEdit).then(
                Alert.alert('Parâmetros Plantio Plantio','Salvo com sucesso!'),
                limpaCampos(),
                navegar()
                )
              }else{
                const dados = {
                  id: idEdit,
                  comp_tolete: values.comp_tolete.toString(),
                  altura_corte: values.altura_corte.toString(),
                  tam_amostra: values.tam_amostra.toString(),
                  qualidade_tolete: values.qualidade_tolete.toString(),
                  tolete_bom: values.tolete_bom.toString(),
                  tolete_regular: values.tolete_regular.toString(),
                  tolete_ruim: values.tolete_ruim.toString(),
                }
                criarEditarRealm(dados, schema, idEdit).then(
                  Alert.alert('Parâmetros Plantio Plantio','Alterado com sucesso!'),
                  limpaCampos(),
                  navegar()               
                )
        };

  
     }else{Alert.alert('Campo Vazio','Preencha todos os campos obrigatórios')}
    }

      return parametro.length>0 ? (
        <>
        <Header caption = 'CADASTRAR PARÂMETROS MUDA' />
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
      
      <Header caption = "CADASTRAR PARÂMETROS MUDA"/>
      
      <Container
        onMomentumScrollEnd={e => {}}
      >
      <Campos>
        <TituloCampos>PARÂMETROS</TituloCampos> 
      
        <ContainerInput width= '50%' >
          <Texto>Compt Tolete(cm)</Texto>
          <InputText
              keyboardType = 'numeric'
              value={values.comp_tolete}
              onChangeText={text => setValues(values => ({...values, comp_tolete: text}))}
              placeholder = "ex: 3"
          />
        </ContainerInput >
      
        <ContainerInput width= '50%' >
          <Texto>Altura Corte(cm)</Texto>
          <InputText
              value={values.altura_corte}
              onChangeText={text => setValues(values => ({...values, altura_corte: text}))}
              // keyboardType = 'numeric'
              placeholder = 'ex: 3'
              
          />
        </ContainerInput >
      
        <ContainerInput width= '50%' >
          <Texto>Tam. da Amostra(Un)</Texto>
          <InputText
                value={values.tam_amostra}
                onChangeText={text => setValues(values => ({...values, tam_amostra: text}))}
                // keyboardType = 'numeric'
                placeholder = 'ex: 3'
                />
        </ContainerInput>
      
        <ContainerInput width= '50%'>
          <Texto>Qualid. Toletes</Texto>
          <InputText
                // keyboardType = 'numeric'
                value={values.qualidade_tolete}
                onChangeText={text => setValues((values) => ({...values, qualidade_tolete: text}))}
                placeholder = 'Descrição'
                />
        </ContainerInput>
      
        <ContainerInput width = '33%'> 
          <Texto>Tolete Bom</Texto>
          <InputText 
              keyboardType = 'numeric'
              placeholder = 'Descrição'
              value={values.tolete_bom}
              onChangeText = {text => setValues((values) => ({...values, tolete_bom: text}))}
              />
        </ContainerInput>  
    
        <ContainerInput width = '33%'> 
          <Texto>Tolete Regular</Texto>
          <InputText 
              keyboardType = 'numeric'
              placeholder = 'Descrição'
              value={values.tolete_regular}
              onChangeText = {text => setValues((values) => ({...values, tolete_regular: text}))}
              />
        </ContainerInput>
    
        <ContainerInput width = '33%'> 
          <Texto>Tolete Ruim</Texto>
          <InputText 
              keyboardType = 'numeric'
              placeholder = 'Descrição'
              value={values.tolete_ruim}
              onChangeText = {text => setValues((values) => ({...values, tolete_ruim: text}))}
              /> 
        </ContainerInput>
      
      </Campos>
      </Container>
      
      <CenterView>
      
        <Botao
          onPress={() => handleSubmit()}
          title="SALVAR"
        >
          <BotaoText>{botaoSalvar}</BotaoText>
        </Botao>
    
      </CenterView>
      
      </ThemeProvider>
      )
}

export default ParamMuda;

  
