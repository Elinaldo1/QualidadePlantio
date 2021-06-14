import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import { ThemeProvider } from 'styled-components';
import * as Yup from 'yup';
import InputText from '../../../components/forms/input';
import Combobox from '../../../components/forms/Picker';
import Header from '../../../components/header';
import getRealm, { criarEditarRealm } from '../../../services';
import {
  Botao, BotaoText, BotaoVoltar, Campos, CenterView,
  Container, ContainerCampos, ContainerInput, ContainerMsg, Texto, TituloCampos
} from './styles';

const cores = {
  border: '#111'
}

export default function ParamColhMecanica  ({route})  {


  const navigation = useNavigation();
  const [load, setLoad] = useState(true)
  const schema = 'ParamColhMecanica';
  const [parametro, setParametro] = useState([]);
  const [idEdit, setIdEdit] = useState(null);
  const [botaoSalvar, setBotaoSalvar] = useState('Salvar');
  const [editar, setEditar] = useState(false)

  const placeDeclive = {label:'Selecione', value:null, color: '#b3b3b3'};
  const declive = [
    {label:'PLANO', value:'PLANO'},
    {label:'MÉDIO', value:'MÉDIO'},
    {label:'ALTO 12%', value:'ALTO 12%'},
  ]
  const placeLombo = {label:'Selecione', value:null, color: '#b3b3b3'};
  const lombo = [
    {label:'NÃO EXISTE', value:'NÃO EXISTE'},
    {label:'MÉDIO', value:'MÉDIO'},
    {label:'ALTO', value:'ALTO'},
  ]
  const placeAcamamento = {label:'Selecione', value:null, color: '#b3b3b3'};
  const acamamento = [
    {label:'ERETA', value:'ERETA'},
    {label:'INTERMEDIARIA', value:'INTERMEDIARIA'},
    {label:'ACAMADA', value:'ACAMADA'},
  ]

  const [values, setValues] = useState ({ 
    perda_toleravel: '',
    declive: '',
    lombo_ent_lin: '',
    acamamento: '',
    perdas_baixo: '',
    perdas_medio: '',
    perdas_alto: '',
  })

  useLayoutEffect(() => {

   const foco =  navigation.addListener('focus', async () =>{
       
     setLoad(!load)
     const realm = await getRealm();
     
     const data =   realm.objects(schema);
     
     if (data.length>0){(async()=>{  
       setParametro(data);                

       const edt = await AsyncStorage.getItem('editar');
         
           if (edt!==null) {
                setParametro(data);                
                setEditar(true)
                setIdEdit(route.params?.id);
                setValues(values => ({
                  ...values,
                  perda_toleravel: route.params?.perda_toleravel,
                  declive: route.params?.declive,
                  lombo_ent_lin: route.params?.lombo_ent_lin,
                  acamamento: route.params?.acamamento  ,
                  perdas_baixo: route.params?.perdas_baixo,
                  perdas_medio: route.params?.perdas_medio,
                  perdas_alto: route.params?.perdas_alto,

                }));
                
                setBotaoSalvar('Alterar')
          
             }else{
                setEditar(false)
                setValues(values => ({ 
                  ...values, 
                  perda_toleravel:'',
                  declive: '',
                  lombo_ent_lin: '',
                  acamamento: '',
                  perdas_baixo: '',
                  perdas_medio: '',
                  perdas_alto: '',
                  
                }));
                setIdEdit(null)
                setBotaoSalvar('Salvar');
             };
             
       
      }
    )(); }
      await AsyncStorage.removeItem('editar');
      });
      return foco;
    //  return abortController.abort();
  }),[];

  function limpaCampos(){
      setValues(values => ({
       ...values,
       perda_toleravel:'',
       declive: '',
       lombo_ent_lin: '',
       acamamento: '',
       perdas_baixo: '',
       perdas_medio: '',
       perdas_alto: '',
     })
      )};

  function navegar(){
    navigation.navigate('Parâmetros');
  };   
  
  const validar = Yup.object().shape({
    perda_toleravel: Yup.string()
      .required('Comprimento tolete não pode está vazio'),    
    declive: Yup.string()
      .required('Altura corte não pode está vazio'),    
    lombo_ent_lin: Yup.string()
      .required('Tamanho amostra não pode está vazio'),    
    acamamento: Yup.string()
      .required('Qualidade tolete não pode está vazio'),    
    perdas_baixo: Yup.string()
      .required('Tolete Bom não pode está vazio'),    
    perdas_medio: Yup.string()
      .required('Tolete regular avaliação não pode está vazio'),    
    perdas_alto: Yup.string()
      .required('Tolete uim avaliação não pode está vazio'),    
  });
  
  async function  handleSubmit () {

     Keyboard.dismiss();
     const isValid = await  validar.isValid(values)
  
     if (isValid){
       if (idEdit===null){

            const realm = await getRealm()
            
            const id = realm.objects(`${schema}`).sorted('id',true).length > 0
            ? realm.objects(`${schema}`).sorted('id', true)[0].id + 1 : 1;

            
            const dados = {
              id: id,
              perda_toleravel: values.perda_toleravel.toString(),
              declive: values.declive.toString(),
              lombo_ent_lin: values.lombo_ent_lin.toString(),
              acamamento: values.acamamento.toString(),
              perdas_baixo: values.perdas_baixo.toString(),
              perdas_medio: values.perdas_medio.toString(),
              perdas_alto:values.perdas_alto.toString(),
            }
            
            Keyboard.dismiss();
            criarEditarRealm(dados, schema, idEdit)
            
            Alert.alert('Parâmetros Colheita Mecânica','Salvo com sucesso!')
            limpaCampos();
            navegar();
          }else{
            const dados = {
              id: idEdit,
              perda_toleravel: values.perda_toleravel.toString(),
              declive: values.declive.toString(),
              lombo_ent_lin: values.lombo_ent_lin.toString(),
              acamamento: values.acamamento.toString(),
              perdas_baixo: values.perdas_baixo.toString(),
              perdas_medio: values.perdas_medio.toString(),
              perdas_alto:values.perdas_alto.toString(),
            };
            criarEditarRealm(dados, schema, idEdit);
            Alert.alert('Parâmetros Colheita Mecânica','Alterado com sucesso!')
            limpaCampos();
            navegar();

       };


  
     }else{Alert.alert('Campo Vazio','Preencha todos os campos obrigatórios')}
    }
 
  return parametro.length>0 ? (
    <>
    <Header caption = 'CADASTRAR PARÂMETROS COLHEITA MECÂNICA' />
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
  
    <Header caption = "CADASTRAR PARÂMETROS COLHEITA MECÂNICA"/>
    
    <Container
      onMomentumScrollEnd={e => {}}
    >
      <TituloCampos>PARÂMETROS</TituloCampos> 
    <Campos>
    
      <ContainerInput width= '50%' >
        <Texto>Perda Tolerável(Kg)</Texto>
        <InputText
            keyboardType = 'numeric'
            value={values.perda_toleravel}
            onChangeText={text => setValues(values => ({...values, perda_toleravel: text}))}
            placeholder = "ex: 3,5"
        />
      </ContainerInput >
    
      <ContainerInput width= '50%' >
        <Texto>Declive</Texto>
        <Combobox
                placeholder ={placeDeclive}
                items = {declive}
                value={values.declive}
                onValueChange={text => setValues((values)=>({...values,declive: text}))}
                />
      </ContainerInput >
  
      <ContainerInput width= '50%' >
        <Texto>Lombo entre linha</Texto>
        <Combobox
                placeholder ={placeLombo}
                items = {lombo}
                value={values.lombo_ent_lin}
                onValueChange={text => setValues((values)=>({...values,lombo_ent_lin: text}))}
                />
      </ContainerInput >
  
      <ContainerInput width= '50%' >
        <Texto>Acamamento Cana</Texto>
        <Combobox
                placeholder ={placeAcamamento}
                items = {acamamento}
                value={values.acamamento}
                onValueChange={text => setValues((values)=>({...values,acamamento: text}))}
                />
      </ContainerInput >
  
    
    
    </Campos>
  
    <ContainerCampos width = '100%'>
            <Campos>
              <TituloCampos>CLASSIFICAÇÃO DAS PERDAS</TituloCampos>
            <Campos>  
              <TituloCampos>Percentual de perdas(%)</TituloCampos>
              <ContainerInput width = '33%'>
                <Texto>Baixo</Texto>
                <InputText 
                    placeholder = 'ex: < x'
                    // keyboardType = 'numeric'
                    value={values.perdas_baixo}
                    onChangeText = {text => setValues((values)=>({...values, perdas_baixo: text}))}
                    />
              </ContainerInput>
  
              <ContainerInput width = '33%'>
                <Texto>Médio</Texto>
                <InputText
                  placeholder = 'ex: x < x'
                  // keyboardType = 'numeric'
                  value = {values.perdas_medio}
                  onChangeText = {text => setValues((values)=>({...values, perdas_medio: text}))}
                  />
              </ContainerInput>
  
            
              <ContainerInput width= '33%'>
                <Texto>Alto</Texto>
                <InputText
                  placeholder = 'ex: > x'
                  // keyboardType = 'numeric'
                  value = {values.perdas_alto}
                  onChangeText = {text => setValues((values)=>({...values, perdas_alto: text}))}
                  />
              </ContainerInput>
            </Campos>
            </Campos>
      </ContainerCampos>
  
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

function Bloqueio(){
  return(
    <>
    <Header caption = 'CADASTRAR PARÂMETROS COLHEITA MECÂNICA' />
    <ContainerMsg>
      <BotaoVoltar>
        <AntDesign name = "arrowleft" size= {30} color = '#fff'/>
        <BotaoText onPress = {()=>navigation.navigate('Parâmetros')} >VISUALIZAR</BotaoText>
      </BotaoVoltar>
      <Texto>Parâmetros já cadastrado!</Texto>
    </ContainerMsg>
    </>
  )
}

function Form(){
  return(
    <ThemeProvider theme={cores}>
  
    <Header caption = "CADASTRAR PARÂMETROS COLHEITA MECÂNICA"/>
    
    <Container
      onMomentumScrollEnd={e => {}}
    >
      <TituloCampos>PARÂMETROS</TituloCampos> 
    <Campos>
    
      <ContainerInput width= '50%' >
        <Texto>Perda Tolerável(Kg)</Texto>
        <InputText
            keyboardType = 'numeric'
            value={values.perda_toleravel}
            onChangeText={text => setValues(values => ({...values, perda_toleravel: text}))}
            placeholder = "ex: 3,5"
        />
      </ContainerInput >
    
      <ContainerInput width= '50%' >
        <Texto>Declive</Texto>
        <Combobox
                placeholder ={placeDeclive}
                items = {declive}
                value={values.declive}
                onValueChange={text => setValues((values)=>({...values,declive: text}))}
                />
      </ContainerInput >
  
      <ContainerInput width= '50%' >
        <Texto>Lombo entre linha</Texto>
        <Combobox
                placeholder ={placeLombo}
                items = {lombo}
                value={values.lombo_ent_lin}
                onValueChange={text => setValues((values)=>({...values,lombo_ent_lin: text}))}
                />
      </ContainerInput >
  
      <ContainerInput width= '50%' >
        <Texto>Acamamento Cana</Texto>
        <Combobox
                placeholder ={placeAcamamento}
                items = {acamamento}
                value={values.acamamento}
                onValueChange={text => setValues((values)=>({...values,acamamento: text}))}
                />
      </ContainerInput >
  
    
    
    </Campos>
  
    <ContainerCampos width = '100%'>
            <Campos>
              <TituloCampos>CLASSIFICAÇÃO DAS PERDAS</TituloCampos>
            <Campos>  
              <TituloCampos>Percentual de perdas(%)</TituloCampos>
              <ContainerInput width = '33%'>
                <Texto>Baixo</Texto>
                <InputText 
                    placeholder = 'ex: < x'
                    // keyboardType = 'numeric'
                    value={values.perdas_baixo}
                    onChangeText = {text => setValues((values)=>({...values, perdas_baixo: text}))}
                    />
              </ContainerInput>
  
              <ContainerInput width = '33%'>
                <Texto>Médio</Texto>
                <InputText
                  placeholder = 'ex: x < x'
                  // keyboardType = 'numeric'
                  value = {values.perdas_medio}
                  onChangeText = {text => setValues((values)=>({...values, perdas_medio: text}))}
                  />
              </ContainerInput>
  
            
              <ContainerInput width= '33%'>
                <Texto>Alto</Texto>
                <InputText
                  placeholder = 'ex: > x'
                  // keyboardType = 'numeric'
                  value = {values.perdas_alto}
                  onChangeText = {text => setValues((values)=>({...values, perdas_alto: text}))}
                  />
              </ContainerInput>
            </Campos>
            </Campos>
      </ContainerCampos>
  
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

}

// // export default ParamColhMecanica;

  
