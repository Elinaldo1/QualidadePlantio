import { AntDesign } from '@expo/vector-icons';
import React, { useContext, useState } from "react";
import { Image, Keyboard, StatusBar, Text, View } from "react-native";
import { version } from '../../../package.json';
import { AuthContext } from '../../contexts/auth';
import CaixaTexto, { Background, Botao, Styles } from './style';


export default function Login(){
 
  const { signIn } = useContext(AuthContext);
  const [matricula, setMatricula] = useState('');

  async function login(){
    signIn(matricula)
    limpacampos()
  }

  function limpacampos(){
    Keyboard.dismiss();
    setMatricula('');
  }

  return(
 <>
      <Background>
            <StatusBar barStyle = 'default'  backgroundColor = '#00b33b'/>
            <View style = {{flex:1, alignItems: 'center', justifyContent: 'center'}}>
              <Image source = {require('../../assets/icoApp.png')} style={{width:150, height:150, justifyContent: 'center'}}/>
              <Text style ={{padding:10, fontWeight: 'bold', color: '#fff', fontSize: 18}} >APONTAMENTOS</Text>
              <Text style ={{padding:10, color: '#fff'}} >V-{version}</Text>
            </View>
        <View style = { Styles.container }> 
            <Text style ={{padding:10, fontWeight: 'bold', color: 'green', fontSize: 18}} >LOGIN</Text>
            <CaixaTexto
              placeholder = "MATRÍCULA"
              keyboardType="numeric"
              value = {matricula}
              onChangeText={text => setMatricula(text)}
              maxLength = {4}
            />

            <Botao 
            style= {Styles.loginButton} 
            onPress = {() => {login()}}
            >
  
                <AntDesign name= 'arrowright' style = {{fontSize: 30, color: 'green'}} />
            </Botao>
            </View>
      </Background>
   </>   
  );
};