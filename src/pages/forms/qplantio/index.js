import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
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
import { Botao, BotaoText, Campos, CenterView, Container, ContainerCampos, ContainerInput, Texto, TituloCampos } from './style';

const placeholder = {label:'Turno', value:null, color: '#b3b3b3'};
const ufs = [
    {label:'A', value:'A'},
    {label:'B', value:'B'},
    {label:'C', value:'C'},
  ]

const cores = {
  border: '#111'
}


const Formi = (props) => {
  const navigation = useNavigation();

  
  return(
    
  <ThemeProvider theme={cores}>

  <Header caption = "QUALIDADE PLANTIO"/>

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
              value={props.values.up}
              onChangeText={text => props.setFieldValue('up', text)}
              keyboardType = 'numeric'
              maxLength = {4}
              />
      </ContainerInput>

      <ContainerInput width= '33%'>
        <Texto>Plantadora</Texto>
        <InputText
              keyboardType = 'numeric'
              value={props.values.plantadora}
              onChangeText={text => props.setFieldValue('plantadora', text)}
              maxLength = {3}
              placeholder = 'px'
              />
      </ContainerInput>

      <ContainerInput width = '33%'> 
        <Texto>Esteira</Texto>
        <InputText 
            maxLength = {1}
            placeholder = 'lado est.'
            value={props.values.esteira}
            onChangeText = {text => props.setFieldValue('esteira',text)}
            placeholder = 'D ou E'
            />
      </ContainerInput>
      

      
      
      <ContainerInput width= '33%'>
        <Texto>Turno</Texto>
        <Combobox
          onValueChange={text => props.setFieldValue('turno', text)}
          placeholder={placeholder}
          items={ufs}
          value={props.values.turno}
          
        />
      </ContainerInput>
    </Campos>
  
    <ContainerCampos width = '100%'>
          <Campos>
            <TituloCampos>AMOSTRA</TituloCampos>
            <ContainerInput width = '50%'>
              <Texto>Nº</Texto>
              <InputText 
                  keyboardType = 'numeric'
                  value={props.values.amostra}
                  onChangeText = {text => props.setFieldValue('amostra',text)}
                  maxLength = {2}
                  />
            </ContainerInput>

            <ContainerInput width = '50%'>
              <Texto>Kg</Texto>
              <InputText
                keyboardType = 'numeric'
                value = {props.values.kg_amostra}
                onChangeText = {text => props.setFieldValue('kg_amostra', text)}
                placeholder = 'kg'
                />
            </ContainerInput>

          </Campos>

          <Campos>
            <TituloCampos>PROFUNDIDADE (CM)</TituloCampos>
            <ContainerInput width= '50%'>
              <Texto>Sulco</Texto>
              <InputText
                keyboardType = 'numeric'
                value = {props.values.sulco}
                onChangeText = {text => props.setFieldValue('sulco', text)}
                placeholder = 'sulco'
                />
            </ContainerInput>

            <ContainerInput width= '50%'>
              <Texto>Cobrição</Texto>
              <InputText
                keyboardType = 'numeric'
                value = {props.values.cobricao}
                onChangeText = {text => props.setFieldValue('cobricao', text)}
                placeholder = 'cobrição'
                />
            </ContainerInput>
          </Campos>
    </ContainerCampos>
    
    <ContainerCampos width = '100%'>
      <ContainerCampos width = '50%'>
          <Campos>
            <TituloCampos>ESPAÇAMENTO</TituloCampos>
            <ContainerInput width = '100%'>
              <Texto>Entre Linha</Texto>
              <InputText
                value = {props.values.espaco_linha}
                keyboardType = 'numeric'
                onChangeText = {text => props.setFieldValue('espaco_linha', text)}
                placeholder = 'entre_linha'
                />
            </ContainerInput>
          </Campos>
      </ContainerCampos>   
    <ContainerCampos width = '50%'>
          <Campos>
            <TituloCampos>TOLETES</TituloCampos>
            <ContainerInput width = '100%'>
              <Texto>Qtd</Texto>
              <InputText
                keyboardType = 'numeric'
                value = {props.values.toletes}
                onChangeText = {text => props.setFieldValue('toletes', text)}
                placeholder = 'toletes'
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
                placeholder = 'viáveis'
                />
            </ContainerInput>

            <ContainerInput width = '33%'>
              <Texto>Inviáveis</Texto>
              <InputText
                keyboardType = 'numeric'
                value = {props.values.gemas_inviaveis}
                onChangeText = {text => props.setFieldValue('gemas_inviaveis', text)}
                placeholder = 'inviáveis'
                />
            </ContainerInput>
            
            <ContainerInput width = '33%'>
              <Texto>Total</Texto>
              <InputText
                keyboardType = 'numeric'
                value = {props.values.gemas_total}
                onChangeText = {text => props.setFieldValue('gemas_total', text)}
                placeholder = 'total'
                />
            </ContainerInput>
          </Campos>
      </ContainerCampos>

    <ContainerCampos width = '100%'>
        <Campos>
          <Texto>OBS</Texto>
          <InputText
            multiline = {true}
            placeholder = 'observação'
            value = {props.values.obs}
            onChangeText = {text => props.setFieldValue('obs',text)}
          />
        </Campos>
    </ContainerCampos>
  </Container>

  <CenterView>

      <Botao
        onPress={props.handleSubmit}
        title="SALVAR"
      >
        <BotaoText>sal</BotaoText>
      </Botao>
      <Botao
        onPress={()=> navigation.navigate('PrPlantio')}
        title="SALVAR"
      >
        <BotaoText>Parâmetros</BotaoText>
      </Botao>

      <Botao onPress = {() => Helpers.readAll('gpsfrota', 'PLANTADORA')} >
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
            plantadora:Yup.number()
              .required('Plantadora não pode está vazio'),
            turno:Yup.string()
              .required('Turno não pode está vazio'),
            amostra:Yup.number()
              .required('Amostra não pode está vazio'),
            esteira:Yup.string()
              .required('Esteira não pode está vazio'),
            kg_amostra:Yup.number()
              .required('Kg_amostra não pode está vazio'),
            sulco:Yup.number()
              .required('Sulco não pode está vazio'),
            cobricao:Yup.number()
              .required('Cobrição não pode está vazio'),
            espaco_linha:Yup.number()
              .required('Espaço_Linha não pode está vazio'),
            toletes:Yup.number()
              .required('Toletes não pode está vazio'),
            gemas_total:Yup.number()
              .required('Gemas_Total não pode está vazio'),
            gemas_viaveis:Yup.number()
              .required('Gemas_viáveis não pode está vazio'),
            gemas_inviaveis:Yup.number()
              .required('Gemas_Inviáveisnão pode está vazio'),    
          });

 async function loadrealm () {
  const realm = await getRealm();
  const data = realm.objects('Plantio');
  data.map(item=>console.log(item))
  // alert(data);
}

const schema = 'Plantio';


export default withFormik({
  
   enableReinitialize: true,
   mapPropsToValues: () => ({ 
        fazenda: '',
        up:'',
        plantadora:'',
        turno:'',
        amostra:'',
        esteira:'',
        kg_amostra:'',
        sulco:'',
        cobricao:'',
        espaco_linha:'',
        toletes:'',
        gemas_total:'',
        gemas_viaveis:'',
        gemas_inviaveis:'',
        obs: '',
        }),
  

      handleSubmit: async (values) => {
       console.log(values)
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
                        data:`$${data.getMonth()+1}-${data.getDate()}-${data.getFullYear()} ${data.getHours()}:${data.getMinutes()}:${data.getMilliseconds()}`,
                        matricula: '5492',
                        responsavel: 'Elinaldo',
                        amostra: parseInt(values.amostra),
                        fazenda: values.fazenda,
                        up: parseFloat(values.up),
                        plantadora: parseFloat(values.plantadora),
                        turno: values.turno,
                        esteira: values.esteira,
                        kg_amostra: parseFloat(values.kg_amostra),
                        sulco: parseFloat(values.sulco),
                        cobricao:parseFloat(values.cobricao),
                        espaco_linha: parseFloat(values.espaco_linha),
                        toletes:parseFloat(values.toletes),
                        gemas_total:parseFloat(values.gemas_total),
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
  
}})(Formi);
