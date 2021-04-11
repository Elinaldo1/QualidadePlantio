import AsyncStorage from '@react-native-async-storage/async-storage';
import { withFormik } from 'formik';
import React from 'react';
import { Alert, Keyboard } from 'react-native';
import { ThemeProvider } from 'styled-components';
import * as Yup from 'yup';
import InputText from '../../../components/forms/input';
import Combobox from '../../../components/forms/Picker';
import Header from '../../../components/header';
import Helpers from '../../../databases';
import getRealm from '../../../services';
import { Local } from '../../location';
import {
  Botao, BotaoText, Campos,
  CenterView, Container, ContainerCampos,
  ContainerInput,
  Texto, TituloCampos
} from './styles';


const cores={
  border:'#111', borderW: 0,
};

const placeholder = {label:'Turno', value:null, color: '#b3b3b3'};
const ufs = [
    {label:'A', value:'A'},
    {label:'B', value:'B'},
    {label:'C', value:'C'},
  ]

const FormMuda = (props) => {
  
  

  return(
  <ThemeProvider theme={cores}>

  <Header caption = "MUDA"/>

  <Container
      onMomentumScrollEnd={e => {}}
      >
    <Campos>
      <TituloCampos>IDENTIFICAÇÃO</TituloCampos> 

      <ContainerInput width= '80%' >
        <Texto>Fazenda</Texto>
        <InputText
                value={props.values.fazenda}
                onChangeText={text => props.setFieldValue('fazenda', text)}
                placeholder = "Faz."
                />
      </ContainerInput >

      <ContainerInput width= '20%' >
        <Texto>UP</Texto>
        <InputText
              keyboardType = 'numeric'
              value={props.values.up}
              onChangeText={text => props.setFieldValue('up', text)}
              />
      </ContainerInput>

      <ContainerInput width= '33%'>
        <Texto>Nº Amostra</Texto>
        <InputText
              keyboardType = 'numeric'
              placeholder = '*'
              value={props.values.amostra}
              onChangeText={text => props.setFieldValue('amostra', text)}
              />
      </ContainerInput>

      <ContainerInput width= '33%'>
        <Texto>Colhedora</Texto>
        <InputText
              keyboardType = 'numeric'
              value={props.values.colhedora}
              onChangeText={text => props.setFieldValue('colhedora', text)}
              />
      </ContainerInput>
      
      <ContainerInput width= '33%'>
        <Texto>Turno</Texto>
        <Combobox
              placeholder ={placeholder}
              items = {ufs}
              value={props.values.turno}
              onValueChange={text => props.setFieldValue('turno', text)}
              />
      </ContainerInput>
    </Campos>
    
    <ContainerCampos width = '100%'>
    <ContainerCampos width = '55%'>
          <Campos>
            <TituloCampos>COMPRIMENTO TOLETES</TituloCampos>
            <ContainerInput width = '33%'>
              <Texto>{'< 35'}</Texto>
              <InputText 
                  keyboardType = 'numeric'
                  value={props.values.menor}
                  onChangeText = {text => props.setFieldValue('menor',text)}
                  />
            </ContainerInput>

            <ContainerInput width = '33%'>
              <Texto>35 a 40</Texto>
              <InputText
                keyboardType = 'numeric'
                value = {props.values.padrao}
                onChangeText = {text => props.setFieldValue('padrao', text)}
                />
            </ContainerInput>

          
            <ContainerInput width= '33%'>
              <Texto>{'>40'}</Texto>
              <InputText
                keyboardType = 'numeric'
                value = {props.values.maior}
                onChangeText = {text => props.setFieldValue('maior', text)}
                />
            </ContainerInput>
          </Campos>
    </ContainerCampos>
    <ContainerCampos width = '45%'>
          <Campos>
              <TituloCampos>ALTURA DO CORTE</TituloCampos>
            <ContainerInput width = '100%'>
              <Texto>cm</Texto>
              <InputText 
                keyboardType = 'numeric'
                value = {props.values.altura}
                onChangeText = {text => props.setFieldValue('altura', text)}
              />
            </ContainerInput>
          </Campos>
          </ContainerCampos>      
    </ContainerCampos>

    
    <ContainerCampos width = '100%'>
      <ContainerCampos width = '100%'>
          <Campos>
            <TituloCampos>QUALIDADE TOLETES</TituloCampos>
            <ContainerInput width = '33%'>
              <Texto>BOM</Texto>
              <InputText
                keyboardType = 'numeric'
                value = {props.values.bom}
                onChangeText = {text => props.setFieldValue('bom', text)}
                />
            </ContainerInput>

            <ContainerInput width = '33%'>
              <Texto>REGULAR</Texto>
              <InputText
                keyboardType = 'numeric'
                value = {props.values.regular}
                onChangeText = {text => props.setFieldValue('regular', text)}
                />
            </ContainerInput>

            <ContainerInput width = '33%'>
              <Texto>RUIM</Texto>
              <InputText
                keyboardType = 'numeric'
                value = {props.values.ruim}
                onChangeText = {text => props.setFieldValue('ruim', text)}
                />
            </ContainerInput>
          </Campos>
      </ContainerCampos>   
    </ContainerCampos>
      <ContainerCampos width = '100%'>
          <Campos>
            <TituloCampos>Nº DE GEMAS</TituloCampos>
            <ContainerInput width = '33%'>
              <Texto>Viáveis</Texto>
              <InputText
                keyboardType = 'numeric'
                value = {props.values.gemas_viaveis}
                onChangeText = {text => props.setFieldValue('gemas_viaveis', text)}
                />
            </ContainerInput>

            <ContainerInput width = '33%'>
              <Texto>Inviáveis</Texto>
              <InputText
                keyboardType = 'numeric'
                value = {props.values.gemas_inviaveis}
                onChangeText = {text => props.setFieldValue('gemas_inviaveis', text)}
                />
            </ContainerInput>
            
          </Campos>
      </ContainerCampos>

    <ContainerCampos width = '100%'>
        <Campos>
          <Texto>OBS</Texto>
          <InputText
            multiline = {true}
            height = {50}
            value = {props.values.obs}
            onChangeText = {text => props.setFieldValue('obs',text)}
          />
        </Campos>
    </ContainerCampos>

  </Container>

  <CenterView>

      <Botao
        onPress={()=>alert('nada aqui por enquanto')}
        title="SALVAR"
      >
        <BotaoText>Realm</BotaoText>
      </Botao>
      <Botao
        onPress={()=>props.handleSubmit()}
        title="SALVAR"
      >
        <BotaoText>Salvar</BotaoText>
      </Botao>

      <Botao onPress = {() => Helpers.readAll('caveirao')} >
        <BotaoText >mssql</BotaoText>
      </Botao>
    </CenterView>

    </ThemeProvider>
)};

const validar = Yup.object().shape({
  fazenda: Yup.string()
    .required('Fazenda não pode está vazio'),
  up:Yup.string()
    .required('UP não pode está vazio'),
  colhedora:Yup.number()
    .required('Colhedora não pode está vazio'),
  turno:Yup.string()
    .required('Turno não pode está vazio'),
  amostra:Yup.number()
    .required('Amostra não pode está vazio'),
  menor:Yup.string()
    .required('<35 não pode está vazio'),
  padrao:Yup.number()
    .required('35 a 40 não pode está vazio'),
  maior:Yup.number()
    .required('>40 não pode está vazio'),
  altura:Yup.number()
    .required('Altura não pode está vazio'),
  bom:Yup.number()
    .required('Toletes bom não pode está vazio'),
  regular:Yup.number()
    .required('Toletes regular não pode está vazio'),
  ruim:Yup.number()
    .required('Toletes ruim não pode está vazio'),
  gemas_viaveis:Yup.number()
    .required('Gemas_viáveis não pode está vazio'),
  gemas_inviaveis:Yup.number()
    .required('Gemas_Inviáveisnão pode está vazio'),    
});

const schema = '';

export default withFormik({
  mapPropsToValues: () => ({ 
    fazenda: '',
    up:'',
    plantadora:'',
    turno:'',
    amostra:'',
    menor:'',
    padrao:'',
    maior:'',
    altura:'',
    bom:'',
    regular:'',
    ruim:'',
    gemas_viaveis:'',
    gemas_inviaveis:'',
    obs: '',
    }),


  handleSubmit: async (values) => {

  //  await validar.validate(values).then(alert('ok')).catch(err=>alert(err))

   Keyboard.dismiss();
   const isValid = await  validar.isValid(values)
   if (isValid){
      // alert('ok')
      // return

  await Local.buscaLocal()
    
  
     await AsyncStorage.getItem('gps')
      .then((resp)=>{

        if (resp!==null){Alert.alert('GPS DESLIGADO',
          `Por favor, ative o GPS \n Caso já tenha ativado ignore este alerta e tente novamente`)
          console.log(`${latitude} - ${longitude}`)
           return false

        }else{
          
          (async () => {
            await  AsyncStorage
              .getItem('houses')
                .then(async (houses) => {
                  if(houses !== null){
                    const coordenadas = JSON.parse(houses)
                    console.log("coord "+houses)
                    latitude =  (coordenadas[0].latitude)
                    longitude = (coordenadas[0].longitude)
                  }else{return false}

                    // alert('realm')
                  const realm = await getRealm()
                  
                  const id = realm.objects(`${schema}`).sorted('id',true).length > 0
                  ? realm.objects(`${schema}`).sorted('id', true)[0].id + 1 : 1;
                  
                  const data = new Date()
                  
                  const dados = {
                    id: id,
                    data:`${data.getDate()}-${data.getMonth()+1}-${data.getFullYear()} ${data.getHours()}:${data.getMinutes()}:${data.getMilliseconds()}`,
                    matricula: '5492',
                    responsavel: 'Elinaldo',
                    amostra: parseInt(values.amostra),
                    fazenda: values.fazenda,
                    up: parseFloat(values.up),
                    colhedora: parseFloat(values.colhedora),
                    turno: values.turno,
                    menor: parseFloat(values.menor),
                    padrao: parseFloat(values.padrao),
                    maior: parseFloat(values.maior),
                    altura:parseFloat(values.altura),
                    bom: parseFloat(values.bom),
                    regular:parseFloat(values.regular),
                    ruim:parseFloat(values.ruim),
                    gemas_viaveis:parseFloat(values.gemas_viaveis),
                    gemas_inviaveis: parseFloat(values.gemas_inviaveis),
                    obs: values.obs,
                    lat:parseFloat(latitude),
                    long:parseFloat(longitude),
                  }
                  
                  console.log('gravando realm1')
                  realm.write(async()=>{
                    console.log('gravando realm2')
                    await realm.create(`${schema}`, dados)
                    Keyboard.dismiss();
                  }
                  
                  )
                  
                }).then(Alert.alert('Qualiade Plantio','Salvo com sucesso!'))
          })();
        }
      }
   )}else{Alert.alert('Campo Vazio','Preencha todos os campos obrigatórios(*)')}

let latitude = null
let longitude = null

}})(FormMuda);
