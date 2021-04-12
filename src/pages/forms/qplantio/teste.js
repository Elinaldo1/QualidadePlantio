import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
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


const Formi = () => {
  const navigation = useNavigation();
  const [values, setValues] = useState ({ 
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
    })

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
    
    async function  handleSubmit () {
      
      let lat = null
      let long = null
      const schema = 'Plantio';
      console.log(values)

       Keyboard.dismiss();
       const isValid = await  validar.isValid(values)
       if (isValid){
          // alert('ok')
          // return
         console.log('validou')
         await Local.buscaLocal().catch(err=>alert(err))
         
         
         console.log('buscoulocal')
         await AsyncStorage.getItem('gps')
         .then((resp)=>{

            if (resp!==null){Alert.alert('GPS DESLIGADO',
              `Por favor, ative o GPS \n Caso já tenha ativado ignore este alerta e tente novamente`)
               return false

            }else{
              console.log('async'),
              (async () => {
                await  AsyncStorage
                  .getItem('houses')
                    .then(async (houses) => {
                      if(houses !== null){
                        const coordenadas = JSON.parse(houses)
                        console.log("coord "+ houses)
                        lat = coordenadas[0].latitude
                        long = coordenadas[0].latitude
                      }else{ return }
                      
                      // alert('realm')
                      console.log("realmget ")
                      const realm = await getRealm()
                      console.log("passei realmget ")
                      
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
                        lat: parseFloat(lat) ,
                        long: parseFloat(long) ,
                      }
                      
                      console.log('gravando realm1')
                      realm.write(async()=>{
                        console.log('gravando realm2')
                        await realm.create(`${schema}`, dados)
                        console.log(dados)
                        limpaCampos();
                        Keyboard.dismiss();
                      }
                      
                      )
                      
                    }).then(Alert.alert('Qualiade Plantio','Salvo com sucesso!'))
              })();
            }
          }
       )}else{Alert.alert('Campo Vazio','Preencha todos os campos obrigatórios(*)')}
  }

 limpaCampos = async()=>{
     setValues(values => ({
      ...values,
      fazenda: 'teste',
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
      
    })
    )};

  return(
    
  <ThemeProvider theme={cores}>

  <Header caption = "QUALIDADE PLANTIO t"/>

  <Container
      onMomentumScrollEnd={e => {}}
  >
    <Campos>
      <TituloCampos>IDENTIFICAÇÃO</TituloCampos> 

      <ContainerInput width= '80%' >
        <Texto>Fazenda</Texto>
        <InputText
            value={values.fazenda}
            onChangeText={text => setValues(values => ({...values, fazenda: text}))}
            placeholder = "Faz."
        />
      </ContainerInput >

      <ContainerInput width= '20%' >
        <Texto>UP</Texto>
        <InputText
              value={values.up}
              onChangeText={text => setValues(values => ({...values, up: text}))}
              keyboardType = 'numeric'
              maxLength = {4}
              />
      </ContainerInput>

      <ContainerInput width= '33%'>
        <Texto>Plantadora</Texto>
        <InputText
              keyboardType = 'numeric'
              value={values.plantadora}
              onChangeText={text => setValues((values) => ({...values, plantadora: text}))}
              maxLength = {3}
              placeholder = 'px'
              />
      </ContainerInput>

      <ContainerInput width = '33%'> 
        <Texto>Esteira</Texto>
        <InputText 
            maxLength = {1}
            placeholder = 'lado est.'
            value={values.esteira}
            onChangeText = {text => setValues((values) => ({...values, esteira: text}))}
            placeholder = 'D ou E'
            />
      </ContainerInput>
      

      
      
      <ContainerInput width= '33%'>
        <Texto>Turno</Texto>
        <Combobox
          onValueChange={text => setValues((values) => ({...values, turno: text}))}
          placeholder={placeholder}
          items={ufs}
          value={values.turno}
          
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
                  value={values.amostra}
                  onChangeText = {text => setValues((values => ({...values, amostra: text})))}
                  maxLength = {2}
                  />
            </ContainerInput>

            <ContainerInput width = '50%'>
              <Texto>Kg</Texto>
              <InputText
                keyboardType = 'numeric'
                value = {values.kg_amostra}
                onChangeText = {text => setValues((values) => ({...values, kg_amostra: text}))}
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
                value = {values.sulco}
                onChangeText = {text => setValues((values) => ({...values, sulco: text}))}
                placeholder = 'sulco'
                />
            </ContainerInput>

            <ContainerInput width= '50%'>
              <Texto>Cobrição</Texto>
              <InputText
                keyboardType = 'numeric'
                value = {values.cobricao}
                onChangeText = {text => setValues((values) => ({...values, cobricao: text}))}
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
                value = {values.espaco_linha}
                keyboardType = 'numeric'
                onChangeText = {text => setValues((values) => ({...values, espaco_linha: text}))}
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
                value = {values.toletes}
                onChangeText = {text => setValues((values) => ({...values, toletes: text}))}
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
                value = {values.gemas_viaveis}
                onChangeText = {text => setValues((values) => ({...values, gemas_viaveis: text}))}
                placeholder = 'viáveis'
                />
            </ContainerInput>

            <ContainerInput width = '33%'>
              <Texto>Inviáveis</Texto>
              <InputText
                keyboardType = 'numeric'
                value = {values.gemas_inviaveis}
                onChangeText = {text => setValues((values) => ({...values, gemas_inviaveis: text}))}
                placeholder = 'inviáveis'
                />
            </ContainerInput>
            
            <ContainerInput width = '33%'>
              <Texto>Total</Texto>
              <InputText
                keyboardType = 'numeric'
                value = {values.gemas_total}
                onChangeText = {text => setValues((values) => ({...values, gemas_total:text}))}
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
            value = {values.obs}
            onChangeText = {text => setValues((values)=>({...values,obs:text}))}
          />
        </Campos>
    </ContainerCampos>
  </Container>

  <CenterView>

      <Botao
        onPress={() => handleSubmit()}
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


export default Formi;