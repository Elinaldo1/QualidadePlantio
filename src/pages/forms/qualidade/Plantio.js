import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import { ThemeProvider } from 'styled-components';
import * as Yup from 'yup';
import InputText from '../../../components/forms/input';
import Combobox from '../../../components/forms/Picker';
import Header from '../../../components/header';
import getRealm, { criarEditarRealm, criarRealm } from '../../../services';
import { Local } from '../../location';
import {
  Botao, BotaoText, Campos,
  CenterView, Container, ContainerCampos, ContainerInput, Texto, TituloCampos
} from './styles';

const placeholder = {label:'Turno', value:null, color: '#b3b3b3'};
const ufs = [
    {label:'A', value:'A'},
    {label:'B', value:'B'},
    {label:'C', value:'C'},
  ]

const cores = {
  border: '#111'
}


export default function Formi ({route}){
 
  const navigation = useNavigation();
  const [botaoSalvar, setBotaoSalvar] = useState('Salvar');
  const [idEdit, setIdEdit] = useState(null);

  const [values, setValues] = useState({ 
       fazenda: '',
       variedade: '',
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
       gemas_viaveis:'',
       gemas_inviaveis:'',
       obs: '',
 })

useEffect(() => {
    const foco = navigation.addListener('focus', async ()=>{

      await AsyncStorage
      .getItem('editar').then(
        (res)=>{
          // console.log(res)
           if (res!==null) {
              setIdEdit(route.params?.id);
              setValues(values => ({
                ...values,
                fazenda:(route.params?.fazenda),
                up:JSON.stringify(route.params?.up),
                variedade: (route.params?.variedade),
                plantadora:JSON.stringify(route.params?.plantadora),
                turno:(route.params?.turno),
                amostra:JSON.stringify(route.params?.amostra),
                esteira:(route.params?.esteira),
                kg_amostra:(route.params?.kg_amostra),
                sulco:JSON.stringify(route.params?.sulco),
                cobricao:JSON.stringify(route.params?.cobricao),
                espaco_linha:(route.params?.espaco_linha),
                toletes:JSON.stringify(route.params?.toletes),
                gemas_viaveis:JSON.stringify(route.params?.gemas_viaveis),
                gemas_inviaveis:JSON.stringify(route.params?.gemas_inviaveis),
                obs: (route.params?.obs),
              })
              );
              
              setBotaoSalvar('Alterar');
           }else{
              setValues(values => ({ 
                ...values, 
                fazenda: '',
                variedade: '',
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
                gemas_viaveis:'',
                gemas_inviaveis:'',
                obs: '',
              }));
              setIdEdit(null)
              setBotaoSalvar('Salvar');
           };
        }   
      )
      await AsyncStorage.removeItem('editar');
    }    
    );
    return foco;
},[navigation]);

  function limpaCampos(){
        setValues(values => ({
         ...values,
         fazenda: '',
         up:'',
         variedade: '',
         plantadora:'',
         turno:'',
         amostra:'',
         esteira:'',
         kg_amostra:'',
         sulco:'',
         cobricao:'',
         espaco_linha:'',
         toletes:'',
         gemas_viaveis:'',
         gemas_inviaveis:'',
         obs: '',
         
       })
       );
       setBotaoSalvar('Salvar');
  };

    const validar = Yup.object().shape({
      fazenda: Yup.string()
        .required('Fazenda não pode está vazio'),
      up:Yup.string()
        .required('UP não pode está vazio'),
      plantadora:Yup.number()
        .required('Plantadora não pode está vazio'),
      variedade:Yup.string()
        .required('Variedade não pode está vazio'),
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
      gemas_viaveis:Yup.number()
        .required('Gemas_viáveis não pode está vazio'),
      gemas_inviaveis:Yup.number()
        .required('Gemas_Inviáveisnão pode está vazio'),    
    });
    
    async function  handleSubmit () {

      // limpaCampos();
      let lat = null
      let long = null
      const schema = 'Plantio';

       Keyboard.dismiss();
       const isValid = await  validar.isValid(values)
       if (isValid){
          if (idEdit===null){

            await Local.buscaLocal().catch(err=>alert(err))
            
            
           //  console.log('buscoulocal')
            await AsyncStorage.getItem('gps')
            .then((resp)=>{
   
               if (resp!==null){Alert.alert('GPS DESLIGADO',
                 `Por favor, ative o GPS \n Caso já tenha ativado ignore este alerta e tente novamente`)
                  return false
   
               }else{
                 // console.log('async'),
                 (async () => {
                   await  AsyncStorage
                     .getItem('houses')
                       .then(async (houses) => {
                         if(houses !== null){
                           const coordenadas = JSON.parse(houses)
                           // console.log("coord "+ houses)
                           lat = coordenadas[0].latitude
                           long = coordenadas[0].longitude
                         }else{ return }
                         
                         const realm = await getRealm();

                         const id = realm.objects(`${schema}`).sorted('id',true).length > 0
                         ? realm.objects(`${schema}`).sorted('id', true)[0].id + 1 : 1;
                         
                         const data = new Date()
                         const dia = data.getDate();
                         const mes = data.getMonth()+1;
                         const ano = data.getFullYear();
                         const hora = data.getHours();
                         const min = data.getMinutes();
                         const seg = data.getSeconds();
   
                         const dados = {
                           id: id,
                           data:`${ano}-${mes}-${dia} ${hora}:${min}:${seg}`,
                           matricula: await AsyncStorage.getItem('user'),
                           responsavel: '',
                           variedade: values.variedade,
                           amostra: parseInt(values.amostra),
                           fazenda: values.fazenda,
                           up: parseFloat(values.up),
                           plantadora: parseFloat(values.plantadora),
                           turno: values.turno,
                           esteira: values.esteira,
                           kg_amostra: values.kg_amostra.toString(),
                           sulco: parseFloat(values.sulco),
                           cobricao:parseFloat(values.cobricao),
                           espaco_linha: values.espaco_linha.toString(),
                           toletes:parseFloat(values.toletes),
                           gemas_total:parseFloat(parseInt(values.gemas_viaveis)+parseInt(values.gemas_inviaveis)),
                           gemas_viaveis:parseFloat(values.gemas_viaveis),
                           gemas_inviaveis: parseFloat(values.gemas_inviaveis),
                           obs: values.obs,
                           peso_m_tol: parseFloat(parseFloat(values.kg_amostra)/parseInt(values.toletes)).toFixed(2).toString(),
                           tolete_metro: parseFloat(parseFloat(values.toletes)/2).toFixed(2).toString(),
                           gv_mt: parseFloat(parseInt(values.gemas_viaveis)/2).toFixed(2).toString(),
                           muda_ha: parseFloat((parseFloat(values.toletes)/2) * (parseFloat(values.kg_amostra)/parseInt(values.toletes))*0.66667).toFixed(2).toString(),
                           lat: parseFloat(lat) ,
                           long: parseFloat(long) ,
                         }
   
                         Keyboard.dismiss();
                         await criarRealm(dados, schema);

                       }).then(() => {
                         limpaCampos();                  
                         Alert.alert('Qualiade Plantio','Salvo com sucesso!')
                       });
                    })();
                  }
                });
              }else{
                
                  const dados = {
                    id: idEdit,
                    variedade: values.variedade,
                    amostra: parseInt(values.amostra),
                    fazenda: values.fazenda,
                    up: parseFloat(values.up),
                    plantadora: parseFloat(values.plantadora),
                    turno: values.turno,
                    esteira: values.esteira,
                    kg_amostra: values.kg_amostra.toString(),
                    sulco: parseFloat(values.sulco),
                    cobricao:parseFloat(values.cobricao),
                    espaco_linha: values.espaco_linha.toString(),
                    toletes:parseFloat(values.toletes),
                    gemas_total:parseFloat(parseInt(values.gemas_viaveis)+parseInt(values.gemas_inviaveis)),
                    gemas_viaveis:parseFloat(values.gemas_viaveis),
                    gemas_inviaveis: parseFloat(values.gemas_inviaveis),
                    obs: values.obs,
                    peso_m_tol: parseFloat(parseFloat(values.kg_amostra)/parseInt(values.toletes)).toFixed(2).toString(),
                    tolete_metro: parseFloat(parseFloat(values.toletes)/2).toFixed(2).toString(),
                    gv_mt: parseFloat(parseInt(values.gemas_viaveis)/2).toFixed(2).toString(),
                    muda_ha: parseFloat((parseFloat(values.toletes)/2) * (parseFloat(values.kg_amostra)/parseInt(values.toletes))*0.66667).toFixed(2).toString(),
                  }
                  await criarEditarRealm(dados, schema, idEdit)
                  .then(()=>{
                    (async()=>{

                      limpaCampos();
                      Alert.alert('Qualiade Plantio','Amostra '+ idEdit +' Alterado com sucesso!')
                  
                    })()
                });
          };//cond idEdit
        //  console.log('validou')
       }else{Alert.alert('Campo Vazio','Preencha todos os campos obrigatórios(*)')}
  }

  return(
    <ThemeProvider theme={cores}>

    <Header caption = "QUALIDADE PLANTIO"/>
  
    <Container
        onMomentumScrollEnd={e => {}}
    >
      <Campos>
        <TituloCampos>IDENTIFICAÇÃO</TituloCampos> 
  
        <ContainerInput width= '100%' >
          <Texto>Fazenda</Texto>
          <InputText
              value={values.fazenda}
              onChangeText={text => setValues(values => ({...values, fazenda: text}))}
              placeholder = "Faz."
          />
        </ContainerInput >
  
        <ContainerInput width= '67%' >
          <Texto>Variedade</Texto>
          <InputText
              value={values.variedade}
              onChangeText={text => setValues(values => ({...values, variedade: text}))}
              
          />
        </ContainerInput >
  
        <ContainerInput width= '33%' >
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
              <ContainerInput width = '50%'>
                <Texto>Viáveis</Texto>
                <InputText
                  keyboardType = 'numeric'
                  value = {values.gemas_viaveis}
                  onChangeText = {text => setValues((values) => ({...values, gemas_viaveis: text}))}
                  placeholder = 'viáveis'
                  />
              </ContainerInput>
  
              <ContainerInput width = '50%'>
                <Texto>Inviáveis</Texto>
                <InputText
                  keyboardType = 'numeric'
                  value = {values.gemas_inviaveis}
                  onChangeText = {text => setValues((values) => ({...values, gemas_inviaveis: text}))}
                  placeholder = 'inviáveis'
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
          {/* <AntDesign name = 'save' size = {23} /> */}
          <BotaoText>{botaoSalvar}</BotaoText>
        </Botao>
      </CenterView>
  
      </ThemeProvider>
  );



};
