
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from "react";
import { View } from "react-native";
import { ThemeProvider } from 'styled-components';
import CaixaTexto, { Background, Botao, Imagem, Styles, Titulo } from './style';


export default function Login(){

  const [ language, setLanguage ] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState();

  const [cores, setCores] = useState({
    borderRes:'#111', borderWRes: 0,
    border:'#111', borderW: 0,
  });

  const data = new Date()

  const navigation = useNavigation();
  const [dimensaoImagem, setdimensaoImagem] = useState(null);
  const [matricula, setMatricula] = useState('');
  const [respons, setRespons] = useState('');
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
            <Titulo>QUALIDADE PLANTIO</Titulo>
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
            <CaixaTexto
              placeholder = "RESPONSÀVEL"
              value = {respons}
              onChangeText={text => setRespons(text)}
            />

            <Botao 
            style= {Styles.loginButton} 
            // onPress ={()=> {onSignIn().then(() => navigation.navigate({screen: 'Home'}));}}
            onPress = {() => alert({respons})}
            >
  
                <AntDesign name= 'arrowright' style = {{fontSize: 30, color: '#111'}} />
            </Botao>
            </View>
      </Background>
    </ThemeProvider>  
  );
};