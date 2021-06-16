import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Keyboard, RefreshControl, StatusBar, View } from 'react-native';
import { ThemeProvider } from 'styled-components';
import * as Yup from 'yup';
import { AmostraMuda } from '../../../components/Amostra';
import InputText from '../../../components/forms/input';
import Combobox from '../../../components/forms/Picker';
import Header from '../../../components/header';
import getRealm, { criarEditarRealm, excluirRealm } from '../../../services';
import { BotaoCadastro, ConteinerMensagem, List, Text, TextMensagem } from '../../amostras/styles';
import { Local } from '../../location';
import {
  Botao, BotaoText, Campos,
  CenterView, Container, ContainerCampos,
  ContainerInput,
  Modal, ModalAmostra,
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
  
const schema = 'SchemaMuda';

export default function FormMuda ({route}){

  const [ loading, setLoading ] = useState(false);
  const navigation = useNavigation();
  const [idEdit, setIdEdit] = useState(null)
  const [botaoSalvar, setBotaoSalvar] = useState('Salvar')

  const [modalPrevia, setModalPrevia] = useState(false)
  const [dadosPrevia, setDadosPrevia] = useState(null)
  const [modalAmostra, setModalAmostra] = useState(false)
  
  const [values, setValues] = useState ({ 
    fazenda: '',
    variedade:'',
    up:'',
    colhedora:'',
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
                 fazenda: route.params?.fazenda,
                 variedade:route.params?.variedade,
                 up:route.params?.up,
                 colhedora:route.params?.colhedora,
                 turno:route.params?.turno,
                 amostra:route.params?.amostra,
                 menor:route.params?.tol_menor,
                 padrao:route.params?.tol_padrao,
                 maior:route.params?.tol_maior,
                 altura:route.params?.altura_ct,
                 bom:route.params?.tol_bom,
                 regular:route.params?.tol_regular,
                 ruim:route.params?.tol_ruim,
                 gemas_viaveis:route.params?.gemas_viaveis,
                 gemas_inviaveis:route.params?.gemas_inviaveis,
                 obs: route.params?.obs,
               })
               );
               
               setBotaoSalvar('Alterar');
            }else{
               setValues(values => ({ 
                 ...values, 
                 fazenda: '',
                 variedade:'',
                 up:'',
                 colhedora:'',
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
 }),[navigation];

   async function previa(){
      await criarEditarRealm(dadosPrevia, schema, idEdit).then(
        () => {
          // setModalPrevia(false)
          Alert.alert( 'Qualiade Colheita Muda','Salvo com sucesso!'),
          limpaCampos()
        }
      )
    }

    function limpaCampos(){
      setValues(
      values => ({ 
      ...values,   
      fazenda: '',
      variedade: '',
      up:'',
      colhedora:'',
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
      obs: '',}))
    }

  const validar = Yup.object().shape({
    fazenda: Yup.string()
      .required('Fazenda não pode está vazio'),
    variedade: Yup.string()
      .required('Variedade não pode está vazio'),
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
                      const dia = data.getDate();
                      const mes = data.getMonth()+1;
                      const ano = data.getFullYear();
                      const hora = data.getHours();
                      const min = data.getMinutes();
                      const seg = data.getSeconds();
  
                      const dados = {
                        id: id,
                        data:`${ano}-${mes}-${dia} ${hora}:${min}:${seg}`,
                        responsavel: await AsyncStorage.getItem('user'),
                        amostra: values.amostra.toString(),
                        fazenda: values.fazenda,
                        variedade: values.variedade,
                        up: values.up.toString(),
                        colhedora: values.colhedora.toString(),
                        turno: values.turno.toString(),
                        tol_menor: values.menor.toString(),
                        tol_padrao: values.padrao.toString(),
                        tol_maior: values.maior.toString(),
                        altura_ct:values.altura.toString(),
                        tol_bom: values.bom.toString(),
                        tol_regular:values.regular.toString(),
                        tol_ruim:values.ruim.toString(),
                        gemas_viaveis:values.gemas_viaveis.toString(),
                        gemas_inviaveis: values.gemas_inviaveis.toString(),
                        obs: values.obs,
                        lat:parseFloat(latitude),
                        long:parseFloat(longitude),
                      }
                      
                      setDadosPrevia(dados);
                      previa();
                      
                    }).then(() =>{ 
                      Keyboard.dismiss()
                      // setModalPrevia(true)
                    }
                    );
              })();
            }
          }
       )
       
      } else {
        const dados = {
          id: idEdit,
          amostra: values.amostra.toString(),
          fazenda: values.fazenda,
          variedade: values.variedade,
          up: values.up.toString(),
          colhedora: values.colhedora.toString(),
          turno: values.turno.toString(),
          tol_menor: values.menor.toString(),
          tol_padrao: values.padrao.toString(),
          tol_maior: values.maior.toString(),
          altura_ct:values.altura.toString(),
          tol_bom: values.bom.toString(),
          tol_regular:values.regular.toString(),
          tol_ruim:values.ruim.toString(),
          gemas_viaveis:values.gemas_viaveis.toString(),
          gemas_inviaveis: values.gemas_inviaveis.toString(),
          obs: values.obs,
        }
        await criarEditarRealm(dados, schema, idEdit)
          .then(()=>{
            limpaCampos();
            Alert.alert('Qualiade Colheita Muda', 'Amostra '+idEdit+' alterado com sucesso!')
          })
      }; 
    }else{Alert.alert('Campo Vazio','Preencha todos os campos obrigatórios(*)')}
  
  let latitude = null
  let longitude = null
  
  }
  
  const [amostras, setAmostras] = useState([]);
  
  
  async function buscaAmostra(){

    setModalAmostra(true);
    setLoading(true)
    const realm = await getRealm();
    
    const data =  realm.objects(schema).sorted('id',true);
    
    if (data.length>0){
      setAmostras(data);
    };
    setLoading(false)

  }
  
     async function excluirAmostra (data) {

        
        const realm = await getRealm();
  
        excluirRealm(data,schema,'id');
        
        const amostrasAtuais = await realm.objects(schema).sorted('id',true)
        setAmostras(amostrasAtuais);
        alert('Registro '+ data +' excluído!')
    }
  
     async function editarAmostra(data){
       console.log( JSON.stringify(data) )
       setIdEdit(data.id)
        setValues( values =>({
          ...values,
          variedade: data.variedade,
          fazenda: data.fazenda,
          up:data.up,
          colhedora:data.colhedora,
          turno:data.turno,
          amostra:data.amostra,
          menor:data.tol_menor,
          padrao:data.tol_padrao,
          maior:data.tol_maior,
          altura:data.altura_ct,
          bom:data.tol_bom,
          regular:data.tol_regular,
          ruim:data.tol_ruim,
          gemas_viaveis:data.gemas_viaveis,
          gemas_inviaveis:data.gemas_inviaveis,
          obs: data.obs,
      }))
        setModalAmostra(false);
        setBotaoSalvar('Alterar');
     }

  return(
  <ThemeProvider theme={cores}>
   
   <Modal animationType = 'slide'  transparent = {false} visible = {modalPrevia}>

    <AmostraMuda 
      data= {dadosPrevia} 
      excluir = { ()=> setModalPrevia(false) }
      editar = {previa}/>

   </Modal> 
      
   <ModalAmostra animationType = 'slide'  transparent = {false} visible = {modalAmostra} >
    {amostras.length>0 ? (

    <>
      {/* <Header caption="AMOSTRAS COLHEITA MUDA" /> */}
      <StatusBar />
      <View style={{flex: 1, backgroundColor: '#00b33c', padding: 0}}>
        <Text >
          {amostras.length} Amostras Colheita Muda
        </Text>
        <List
         refreshControl = {
          <RefreshControl
            refreshing = {loading}
            onRefresh = {() => buscaAmostra()}
          />
          }
          showsVerticalScrollIndicator = {false}
          keyboardsShouldPersistTaps='handle'
          data={amostras}
          // data={dados}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (<AmostraMuda data = {item} editar={editarAmostra} excluir={excluirAmostra} novaAmostra = {()=> setModalAmostra(false)} />)}
        />
      </View>

       {/* <Botao onPress = {()=>enviadados()}>
         <TextBotao>teste</TextBotao>
       </Botao> */}

    </>
  ):(
    <>
    {/* <Header caption="AMOSTRAS COLHEITA MUDA" /> */}
    <View style={{flex: 1, backgroundColor: '#00b33c', padding: 0}}>
       <BotaoCadastro onPress = {()=> setModalAmostra(false) }>
         <AntDesign name = 'addfile' size = {50} color = '#111' style={{marginBottom:15}}  />
         <TextMensagem>NOVA AMOSTRA</TextMensagem>
       </BotaoCadastro>
       <ConteinerMensagem>
         <TextMensagem>! Não tem amostras cadastradas</TextMensagem>
         <TextMensagem>Após o cadastro volte aqui para conferir</TextMensagem>

       </ConteinerMensagem>
    </View>
    </>
  )}
   </ModalAmostra>

  <Header caption = "MUDA"/>

  <Container
      onMomentumScrollEnd={e => {}}
      >
    <Campos>
      <TituloCampos >IDENTIFICAÇÃO</TituloCampos> 

      <ContainerInput width= '100%' >
        <Texto>Fazenda</Texto>
        <InputText
                value={values.fazenda}
                onChangeText={text => setValues((values)=>({...values,fazenda: text}))}
                placeholder = "Faz."
                />
      </ContainerInput >

      <ContainerInput width= '50%' >
        <Texto>Variedade</Texto>
        <InputText
              // keyboardType = 'numeric'
              value={values.variedade}
              onChangeText={text => setValues((values)=>({...values,variedade: text}))}
              />
      </ContainerInput>
      <ContainerInput width= '50%' >
        <Texto>UP</Texto>
        <InputText
              keyboardType = 'numeric'
              value={values.up}
              onChangeText={text => setValues((values)=>({...values,up: text}))}
              />
      </ContainerInput>

      <ContainerInput width= '33%'>
        <Texto>Nº Amostra</Texto>
        <InputText
              keyboardType = 'numeric'
              placeholder = '*'
              value={values.amostra}
              onChangeText={text => setValues((values)=>({...values, amostra: text}))}
              />
      </ContainerInput>

      <ContainerInput width= '33%'>
        <Texto>Colhedora</Texto>
        <InputText
              keyboardType = 'numeric'
              value={values.colhedora}
              onChangeText={text => setValues((values)=>({...values, colhedora: text}))}
              />
      </ContainerInput>
      
      <ContainerInput width= '33%'>
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
    <ContainerCampos width = '55%'>
          <Campos>
            <TituloCampos>COMPRIMENTO TOLETES</TituloCampos>
            <ContainerInput width = '33%'>
              <Texto>{'< 35'}</Texto>
              <InputText 
                  keyboardType = 'numeric'
                  value={values.menor}
                  onChangeText = {text => setValues((values)=>({...values, menor: text}))}
                  />
            </ContainerInput>

            <ContainerInput width = '33%'>
              <Texto>35 a 40</Texto>
              <InputText
                keyboardType = 'numeric'
                value = {values.padrao}
                onChangeText = {text => setValues((values)=>({...values, padrao: text}))}
                />
            </ContainerInput>

          
            <ContainerInput width= '33%'>
              <Texto>{'>40'}</Texto>
              <InputText
                keyboardType = 'numeric'
                value = {values.maior}
                onChangeText = {text => setValues((values)=>({...values, maior: text}))}
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
                value = {values.altura}
                onChangeText = {text => setValues((values)=>({...values, altura: text}))}
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
                value = {values.bom}
                onChangeText = {text => setValues((values)=>({...values,bom: text}))}
                />
            </ContainerInput>

            <ContainerInput width = '33%'>
              <Texto>REGULAR</Texto>
              <InputText
                keyboardType = 'numeric'
                value = {values.regular}
                onChangeText = {text => setValues((values)=>({...values, regular: text}))}
                />
            </ContainerInput>

            <ContainerInput width = '33%'>
              <Texto>RUIM</Texto>
              <InputText
                keyboardType = 'numeric'
                value = {values.ruim}
                onChangeText = {text => setValues((values)=>({...values, ruim: text}))}
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
                onChangeText = {text => setValues((values)=>({...values, gemas_viaveis: text}))}
                />
            </ContainerInput>

            <ContainerInput width = '33%'>
              <Texto>Inviáveis</Texto>
              <InputText
                keyboardType = 'numeric'
                value = {values.gemas_inviaveis}
                onChangeText = {text => setValues((values)=>({...values, gemas_inviaveis: text}))}
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
          <AntDesign name = 'save' size = {20} color = '#fff' />
          <BotaoText>{botaoSalvar}</BotaoText>
        </Botao>
        <Botao
          onPress={()=> navigation.navigate('Parâmetros')}
          title="SALVAR"
        >
          <BotaoText>Parâmetros</BotaoText>
        </Botao>

        <Botao onPress = {() => buscaAmostra()} >
          <BotaoText >Amostras</BotaoText>
        </Botao>
      </CenterView>

    </ThemeProvider>
);


}



  
