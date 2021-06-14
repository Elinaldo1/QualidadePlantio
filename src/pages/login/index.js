import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from "react";
import { Keyboard, View } from "react-native";
import { ThemeProvider } from 'styled-components';
import { AuthContext } from '../../contexts/auth';
import CaixaTexto, { Background, Botao, Imagem, Styles, Titulo } from './style';


export default function Login(){

  const [cores, setCores] = useState({
    borderRes:'#111', borderWRes: 0,
    border:'#111', borderW: 0,
  });
  
  
  const data = new Date()
  
  const { signIn } = useContext(AuthContext);
  const navigation = useNavigation();
  const [dimensaoImagem, setdimensaoImagem] = useState(null);
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
    
    <ThemeProvider theme={cores}> 
    
      <Background>

        <View 
          onLayout = {({ nativeEvent: { layout:{width, height}}}) => setdimensaoImagem({width, height})}
          style = { Styles.containerlogo } >
          <Imagem
              source={require('../../assets/BSA-WALLPAPER-LU.png')} 
              resizeMode="cover"
              width = {'100%'}
              height = {'100%'}
          />

          <View style={Styles.containerTitulo}>
            <Titulo>QUALIDADE</Titulo>
          </View>
        </View>

        <View style = { Styles.container }> 
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
  
                <AntDesign name= 'arrowright' style = {{fontSize: 30, color: '#111'}} />
            </Botao>
            </View>
      </Background>
    </ThemeProvider>  
  );
};