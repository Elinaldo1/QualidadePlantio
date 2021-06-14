import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Alert, Keyboard, RefreshControl, TouchableOpacity, View } from 'react-native';
import { ThemeProvider } from 'styled-components';
import * as Yup from 'yup';
import Amostra from '../../../components/Amostra/enviadados';
import InputText from '../../../components/forms/input';
import Header from '../../../components/header';
import { open } from '../../../databases';
import getRealm from '../../../services';
import insert from '../../../services/enviadados';
import {
  Botao, BotaoText, Campos, CenterView,
  Container, ContainerInput, Texto, TituloCampos
} from '../qualidade/styles';
import { List } from './styles';

const cores = {
  border: '#111', borderW: 0,
}

const ConfigServidor = () => {

  const dados = [{}];
  const [load, setLoad] = useState(false)
  const [serv, setServ] = useState(false);
  const [data, setData] = useState(dados);
  const [hidePass, setHidePass] = useState(true);
  const [iconPass, setIconPass] = useState('eye');
  const [nameBotao, setNameBotao] = useState ('Conectar')

  const sync = [
    {schema:'Plantio', table:'BaseQPlantio'},
    {schema:'SchemaMuda', table:'BaseQChMuda'},
    {schema:'SchemaColhMecanica', table:'BaseQChMec'},
    {schema:'Infestacao', table:'BaselevInfestacao'}
  ];

  function limpaCampos(){
      setValues(values => ({
       ...values,
       server: '',
       username: '',
       password: '',
       database: ''
     })
      )};

  async function navegar(){
    const server = JSON.parse(await AsyncStorage.getItem('server'))

    await open().then(
      res => {
        if(res){
          
          Alert.alert('Conectar ao Servidor','Conectado')
          setServ(true)
          setNameBotao('Enviar Dados')
        }else{
          
          Alert.alert('Conectar ao Servidor','Falha na Conexão')
          setServ(false)
          setNameBotao('Conectar')
        }
      }
    )
    return server
    // navigation.navigate('Parâmetros Muda');
  };   
  
  

  const [values, setValues] = useState ({ 
    id: '1',
    server: '192.168.1.30',
    username: 'WEB',
    password: 'SO@euposso',
    database: 'canalog'
  })
  
  const validar = Yup.object().shape({
    server: Yup.string()
      .required('Server não pode está vazio'),    
    username: Yup.string()
      .required('Username não pode está vazio'),    
    password: Yup.string()
      .required('Password não pode está vazio'),    
    database: Yup.string()
      .required('Database não pode está vazio')   
  });

  async function enviadados (){

    dados.splice(0);

    for (const index in sync) {
      setLoad(true)
      const tabela = sync[index].table
      const schema = sync[index].schema

      const realm = await getRealm();
      const data =  realm.objects(schema).sorted('id',true);
      
      await insert(data,tabela, schema).then(
        async(res) => {
          dados.push(JSON.parse(res));
          console.log('dados '+dados)
          onRefresh();
          console.log('data '+data)
          setLoad(false)
        }
      );
    };
  }; 

  function onRefresh(){

      setData(dados)
      // console.log(data);
  }
  
  async function  handleSubmit () {

     Keyboard.dismiss();
     const isValid = await  validar.isValid(values)

     const dados = {
          server:   values.server.toString(),
          username: values.username.toString(),
          password: values.password.toString(),
          database: values.database.toString(),
        }
        
        await AsyncStorage.removeItem('server');
        await AsyncStorage.setItem('server',JSON.stringify(dados)).then(
        )
        
        navegar().then(
          res => {
            if(serv){
              limpaCampos();
            }
          }
        )

  
    //  }else{Alert.alert('Campo Vazio','Preencha todos os campos obrigatórios')}
    }
    
  return (
  
  <ThemeProvider theme={cores}>
  
  <Header caption = "CONFIG SERVIDOR"/>
  
  
  { !serv ? 
  <Container
    onMomentumScrollEnd={e => {}}
  >
  <Campos>
    <TituloCampos>SERVIDOR</TituloCampos> 
  
    <ContainerInput width= '50%' >
      <Texto>Server</Texto>
      <InputText
          // keyboardType = 'numeric'
          value={values.server}
          onChangeText={text => setValues(values => ({...values, server: text}))}
      />
    </ContainerInput >
  
    <ContainerInput width= '50%' >
      <Texto>Username</Texto>
      <InputText
          value={values.username}
          onChangeText={text => setValues(values => ({...values, username: text}))}
 
      />
    </ContainerInput >
   
    <ContainerInput width= '40%' >
        <Texto>Password</Texto>
            
        <InputText
              value={values.password}
              onChangeText={text => setValues(values => ({...values, password: text}))}
              secureTextEntry = {hidePass}
              
              />

    </ContainerInput>

    <ContainerInput width = '10%'>
       <Texto></Texto>
        <TouchableOpacity 
        onPress = {()=> {if (hidePass){
            setHidePass(false)
            setIconPass('eye-off')
          }else{
            setHidePass(true)
            setIconPass('eye')
        }} }
        style = {{alignItems: 'center', justifyContent: 'center', paddingRight: 5, marginBottom: 10 }} > 
          <Ionicons  name = {iconPass} size = {20}  />
        </TouchableOpacity>    

    </ContainerInput>

    <ContainerInput width= '50%'>
      <Texto>Database</Texto>
      <InputText
            // keyboardType = 'numeric'
            value={values.database}
            onChangeText={text => setValues((values) => ({...values, database: text}))}
            // placeholder = 'Descrição'
            />
    </ContainerInput>
  
  </Campos>
  </Container> 

  : 
dados.length >0 ?
 <View style = {{ flex: 1, backgroundColor: '#00b33b'}} >
  
       <List
        
        refreshControl = {
        <RefreshControl 
          refreshing = {load}
          onRefresh = {() => onRefresh()}
        />
        }
        showsVerticalScrollIndicator = {false}
        keyboardsShouldPersistTaps='handle'
        data={data}
        // data={dados}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (<Amostra data = {item}/>)}
      />
  </View>: <View style = {{ flex: 1, backgroundColor: '#00b33b'}} ></View>
  }


<CenterView>
    <Botao
      onPress={() => !serv ? handleSubmit() : enviadados()}
      title="SALVAR"
    >
      <BotaoText>{nameBotao}</BotaoText>
    </Botao>

{  serv ?
       <Texto>Conectado!</Texto>
 : null}
  </CenterView> 
</ThemeProvider>
) 
}

export default ConfigServidor;

  
