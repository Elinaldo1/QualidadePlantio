import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import { ThemeProvider } from 'styled-components';
import * as Yup from 'yup';
import InputText from '../../../components/forms/input';
import Combobox from '../../../components/forms/Picker';
import Header from '../../../components/header';
import getRealm, { criarEditarRealm } from '../../../services';
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

const placeholder = {label:'Turno *', value:null, color: '#b3b3b3'};
const ufs = [
    {label:'A', value:'A'},
    {label:'B', value:'B'},
    {label:'C', value:'C'},
  ]

export default function FormColhMec({route}){

  const schema = 'SchemaColhMecanica';
  const navigation = useNavigation();
  const [idEdit, setIdEdit] = useState(null);
  const [botaoSalvar, setBotaoSalvar] = useState('Salvar');

  const [values, setValues] = useState({ 
    codFazenda: '',
    fazenda:'',
    area:'9.9',
    colhedora:'',
    turno:'',
    talhao: '',
    amostra:'',
    frente:'',
    lider:'',
    operador:'',
    tolete:'',
    inteira:'',
    estilhaco:'',
    toco:'',
    pedaco:'',
    ponta:'',
    obs: '',
    }) 

  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', async() => {
      // tela focada, chame a função desejada

        // console.log('route '+ JSON.stringify('editarchMec '+route.params)) 
        await AsyncStorage
        .getItem('editar').then(
          (res)=>{
            // console.log(res)
             if (res!==null) {
                setIdEdit(route.params?.id)
                setBotaoSalvar('Alterar');
                setValues(values => ({
                  ...values,
                  codFazenda: route.params?.codFazenda,
                  fazenda:route.params?.fazenda,
                  colhedora:route.params?.colhedora,
                  turno:route.params?.turno,
                  talhao: route.params?.talhao,
                  amostra:route.params?.amostra,
                  frente:route.params?.frente,
                  lider:route.params?.lider,
                  operador:route.params?.operador,
                  tolete:route.params?.tolete,
                  inteira:route.params?.inteira,
                  estilhaco:route.params?.estilhaco,
                  toco:route.params?.toco,
                  pedaco:route.params?.pedaco,
                  ponta:route.params?.ponta,
                  obs: route.params?.obs
                  }
                ))
             }else{
                setIdEdit(null)
                setBotaoSalvar('Salvar');
                setValues(values => ({
                  ...values,
                    codFazenda: '',
                    fazenda:'',
                    colhedora:'',
                    turno:'',
                    talhao: '',
                    amostra:'',
                    frente:'',
                    lider:'',
                    operador:'',
                    tolete:'',
                    inteira:'',
                    estilhaco:'',
                    toco:'',
                    pedaco:'',
                    ponta:'',
                    obs: '',
                }))
             };
          }
        );
        await AsyncStorage.removeItem('editar');
    });
   // Retorne a função para cancelar a inscrição do evento para que seja removido na desmontagem 
   return unsubscribe;
  }, [navigation]);

    function limpaCampos(){
      setValues(
      values => ({ 
      ...values,   
      codFazenda: '',
      fazenda:'',
      colhedora:'',
      turno:'',
      talhao: '',
      amostra:'',
      frente:'',
      lider:'',
      operador:'',
      tolete:'',
      inteira:'',
      estilhaco:'',
      toco:'',
      pedaco:'',
      ponta:'',
      obs: '',}))
    }

  const validar = Yup.object().shape({
    // codFazenda: Yup.string().required(),
    // fazenda: Yup.string().required(),
    colhedora:Yup.number().required(),
    turno:Yup.string().required(),
    // talhao:Yup.string().required(),
    amostra:Yup.number().required(),
    frente:Yup.string().required(),
    // lider:Yup.number().required(),
    // operador:Yup.number().required(),
    tolete:Yup.number().required(),
    estilhaco:Yup.number().required(),
    toco:Yup.number().required(),
    pedaco:Yup.number().required(),
    ponta:Yup.number().required(),    
  });
  
  async function handleSubmit () {

    //  await validar.validate(values).then(alert('ok')).catch(err=>alert(err))
  
     Keyboard.dismiss();
     const isValid = await  validar.isValid(values)
     if (isValid){
       if (idEdit===null){

         await Local.buscaLocal()
           await AsyncStorage.getItem('gps')
             .then((resp)=>{
       
               if (resp!==null){Alert.alert('GPS DESLIGADO',
                 `Por favor, ative o GPS \n Caso já tenha ativado ignore este alerta e tente novamente`)
                  return false
       
               }else{
                 
                 (async () => {
                   await  AsyncStorage
                     .getItem('houses')
                       .then(async (houses) => {
                         if(houses !== null){
                           const coordenadas = JSON.parse(houses)
                           
                           latitude =  (coordenadas[0].latitude)
                           longitude = (coordenadas[0].longitude)
                         }else{return false}
     
                           const realm = await getRealm()
                           
                           const id = realm.objects(`${schema}`).sorted('id',true).length > 0
                           ? realm.objects(`${schema}`).sorted('id', true)[0].id + 1 : 1;
                           // console.log(' depois do id')
                         
                         const data = new Date()
                         const dia = data.getDate();
                         const mes = data.getMonth()+1;
                         const ano = data.getFullYear();
                         const hora = data.getHours();
                         const min = data.getMinutes();
                         const seg = data.getSeconds();
                         
                         const totalPerda= (parseFloat(values.tolete)+parseFloat(values.estilhaco)+
                         parseFloat(values.toco)+parseFloat(values.ponta)+ 
                         parseFloat(values.pedaco)+ parseFloat(values.inteira))
       
                         const perdaHa = parseFloat(((totalPerda*10000)/9.9)/1000).toFixed(3).toString()
            
                         const dados = {
                           id: id,
                           data:`${ano}-${mes}-${dia} ${hora}:${min}:${seg}`,
                           responsavel: await AsyncStorage.getItem('user'),
                           talhao: values.talhao.toString(),
                           amostra: values.amostra.toString(),
                           codFazenda: values.codFazenda,
                           fazenda: values.fazenda,
                           area: values.area.toString(),
                           colhedora: values.colhedora.toString(),
                           turno: values.turno.toString(),
                           frente: values.frente.toString(),
                           lider: values.lider.toString(),
                           operador: values.operador.toString(),
                           tolete:values.tolete.toString(),
                           inteira: values.inteira.toString(),
                           estilhaco:values.estilhaco.toString(),
                           toco:values.toco.toString(),
                           pedaco:values.pedaco.toString(),
                           ponta: values.ponta.toString(),
                           perda_ha: perdaHa,
                           obs: values.obs,
                           lat:parseFloat(latitude),
                           long:parseFloat(longitude),
                         }
                         
                         Keyboard.dismiss();
                         await criarEditarRealm(dados, schema, idEdit);
                         
                       }).then(() => {   

                              limpaCampos(),
                             Alert.alert('Qualiade Colheita Mecanizada','Salvo com sucesso!');
                           
                        }
                        )
                      })();
                    }
                  });
                }else{

                  const totalPerda= (parseFloat(values.tolete)+parseFloat(values.estilhaco)+
                  parseFloat(values.toco)+parseFloat(values.ponta)+ 
                  parseFloat(values.pedaco)+ parseFloat(values.inteira))

                  const perdaHa = parseFloat(((totalPerda*10000)/9.9)/1000).toFixed(3).toString()

                  const dados = {
                    id: idEdit,
                    talhao: values.talhao.toString(),
                    amostra: values.amostra.toString(),
                    codFazenda: values.codFazenda,
                    fazenda: values.fazenda,
                    area: values.area.toString(),
                    colhedora: values.colhedora.toString(),
                    turno: values.turno.toString(),
                    frente: values.frente.toString(),
                    lider: values.lider.toString(),
                    operador: values.operador.toString(),
                    tolete:values.tolete.toString(),
                    inteira: values.inteira.toString(),
                    estilhaco:values.estilhaco.toString(),
                    toco:values.toco.toString(),
                    pedaco:values.pedaco.toString(),
                    ponta: values.ponta.toString(),
                    perda_ha: perdaHa,
                    obs: values.obs,
                  }
                  await criarEditarRealm(dados, schema, idEdit)
                    .then(() =>{
                      Alert.alert('Qualiade Colheita Mecanizada',`Amostra: ${idEdit} Alterada com sucesso!`),
                      limpaCampos()
                    })
       }//cond id edit

    }else{Alert.alert('Campo Vazio','Preencha todos os campos obrigatórios(*)')}
  
  let latitude = null
  let longitude = null
  
  }

  return(
    <ThemeProvider theme={cores}>

    <Header caption = "Colheita Mecânica"/>
  
    <Container
        onMomentumScrollEnd={e => {}}
        >
      <Campos>
        <TituloCampos>IDENTIFICAÇÃO</TituloCampos> 
        
        <ContainerInput width = '20%'>
            <Texto>Frente</Texto>
            <InputText 
                keyboardType = 'numeric'
                value={values.frente}
                onChangeText = {text => setValues((values)=>({...values, frente: text}))}
                placeholder = "*"
            />
        </ContainerInput>
  
        <ContainerInput width= '80%' >
          <Texto>Fazenda</Texto>
          <InputText
                  value={values.fazenda}
                  onChangeText={text => setValues((values)=>({...values,fazenda: text}))}
                  placeholder = "Faz."
                  />
        </ContainerInput >
        <ContainerInput width= '25%' >
          <Texto>Cód. Fazenda</Texto>
          <InputText
                  value={values.codFazenda}
                  onChangeText={text => setValues((values)=>({...values,codFazenda: text}))}
                  keyboardType = 'numeric'
                  placeholder = "Cód"
                  />
        </ContainerInput >
  
        <ContainerInput width= '25%'>
          <Texto>Talhão</Texto>
          <InputText
                keyboardType = 'numeric'
                placeholder = ''
                value={values.talhao}
                onChangeText={text => setValues((values)=>({...values, talhao: text}))}
                />
        </ContainerInput>
  
        <ContainerInput width= '25%'>
          <Texto>Nº Amostra</Texto>
          <InputText
                keyboardType = 'numeric'
                placeholder = '*'
                value={values.amostra}
                onChangeText={text => setValues((values)=>({...values, amostra: text}))}
                />
        </ContainerInput>
  
        <ContainerInput width= '25%' >
          <Texto>Líder</Texto>
          <InputText
                keyboardType = 'numeric'
                placeholder = 'matrícula'
                maxLength = {4}
                value={values.lider}
                onChangeText={text => setValues((values)=>({...values,lider: text}))}
                />
        </ContainerInput>
  
        <ContainerInput width= '25%'>
          <Texto>Colhedora</Texto>
          <InputText
                placeholder = 'px *'
                keyboardType = 'numeric'
                value={values.colhedora}
                onChangeText={text => setValues((values)=>({...values, colhedora: text}))}
                />
        </ContainerInput>
  
        <ContainerInput width= '25%'>
          <Texto>Operador</Texto>
          <InputText
                placeholder = 'matrícula'
                keyboardType = 'numeric'
                value={values.operador}
                maxLength = {4}
                onChangeText={text => setValues((values)=>({...values, operador: text}))}
                />
        </ContainerInput>
        
        <ContainerInput width= '25%'>
          <Texto>Turno</Texto>
          <Combobox
                placeholder ={placeholder}
                items = {ufs}
                value={values.turno}
                onValueChange={text => setValues((values)=>({...values,turno: text}))}
                />
        </ContainerInput>
      </Campos>
      
      <ContainerCampos width = '100%'>
            <Campos>
              <TituloCampos>PESO(Kg) PERDAS</TituloCampos>
  
              <ContainerInput width = '33%'>
                <Texto>Tolete</Texto>
                <InputText 
                  placeholder = 'ex: 1.5 *'
                  keyboardType = 'numeric'
                  value = {values.tolete}
                  onChangeText = {text => setValues((values)=>({...values, tolete: text}))}
                  />
              </ContainerInput>
  
              <ContainerInput width = '33%'>
                <Texto>inteira</Texto>
                <InputText
                  placeholder = 'ex: 1.5 *'
                  keyboardType = 'numeric'
                  value = {values.inteira}
                  onChangeText = {text => setValues((values)=>({...values,inteira: text}))}
                  />
              </ContainerInput>
  
              <ContainerInput width = '33%'>
                <Texto>Estilhaco</Texto>
                <InputText
                  placeholder = 'ex: 1.5 *'
                  keyboardType = 'numeric'
                  value = {values.estilhaco}
                  onChangeText = {text => setValues((values)=>({...values, estilhaco: text}))}
                  />
              </ContainerInput>
  
              <ContainerInput width = '33%'>
                <Texto>Toco</Texto>
                <InputText
                  placeholder = 'ex: 1.5 *'
                  keyboardType = 'numeric'
                  value = {values.toco}
                  onChangeText = {text => setValues((values)=>({...values, toco: text}))}
                  />
              </ContainerInput>
  
              <ContainerInput width = '33%'>
                <Texto>Pedaço</Texto>
                <InputText
                  placeholder = 'ex: 1.5 *'
                  keyboardType = 'numeric'
                  value = {values.pedaco}
                  onChangeText = {text => setValues((values)=>({...values, pedaco: text}))}
                  />
              </ContainerInput>
  
              <ContainerInput width = '33%'>
                <Texto>Ponta</Texto>
                <InputText
                  placeholder = 'ex: 1.5 *'
                  keyboardType = 'numeric'
                  value = {values.ponta}
                  onChangeText = {text => setValues((values)=>({...values, ponta: text}))}
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
              value = {values.obs}
              onChangeText = {text => setValues((values)=>({...values, obs: text}))}
            />
          </Campos>
      </ContainerCampos>
  
    </Container>
  
    <CenterView>
    <Botao
          onPress={() => handleSubmit()}
          title="SALVAR"
        >
          {/* <AntDesign name = 'save' size = {23} /> */}
          <BotaoText>{botaoSalvar}</BotaoText>
        </Botao>

      </CenterView>
  
      </ThemeProvider>
  );

function ExibeAmostra(){
  return (
     <Texto>Amostra</Texto>
   );
}

}
