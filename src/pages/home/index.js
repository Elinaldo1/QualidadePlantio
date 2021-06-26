import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { version } from '../../../package.json';
import { AuthContext } from '../../contexts/auth';
import { BotaoSair, styles, TextBotao } from './styles';


function Form () {
    
  const navigation = useNavigation();
  const {user, signed, rotas, signOut} = useContext(AuthContext);
  const [modal, setModal] = useState(false);

  useEffect(()=>{
    const nav = navigation.addListener('focus', async()=>{

      !signed ? setModal(true) : setModal(false)
    })
    return nav;
  },[navigation]);

  

  return(
    <View style = {{flex:1, backgroundColor: '#00b33b'}}>

      {/* <Modal style = {{flex: 1, width: '60%', height: '30%'}} animationType = 'slide'  transparent = {false} visible = {modal} >
        <Login/>
      </Modal> */}

      {/* <Header caption="INÍCIO"/> */}
        <StatusBar backgroundColor = '#00b33b' />
        <View style = {{padding:10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00b33b'}}>
                <Image source = {require('../../assets/icoApp.png')} style={{width:80, height:80, justifyContent: 'center'}}/>
                <Text style ={{padding:10, fontWeight: 'bold', color: '#fff', fontSize: 18}} >APONTAMENTOS</Text>
                <Text style ={{padding:10, color: '#fff'}} >V-{version}</Text>
                <Text style ={{padding:10, fontWeight: 'bold', color: '#fff', fontSize: 18}} >Matrícula: {user}</Text>
        </View>
        <View style={styles.container}>
        {/* <Image source = {logo} style={styles.topImage} />
        <Text style={styles.title}>QUALIDADE PLANTIO BSA 2021</Text> */}
      
          <TouchableOpacity style={styles.button} onPress = {()=>{rotas('Infestacao')}}>
              <Text style={styles.buttonText}>Índice Infestação</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress = {()=>{rotas('Muda')}}>
              <Text style={styles.buttonText}>Qualidade Colheita Muda</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress = {()=>{rotas('Mec')}}>
              <Text style={styles.buttonText}>Qualidade Colheita Mecanizada</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress = {()=>{rotas('Plantio')}}>
              <Text style={styles.buttonText}>Qualidade Plantio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress = {()=>{rotas('Admin')}}>
              <Text style={styles.buttonText}>Administrador</Text>
          </TouchableOpacity>
          <BotaoSair onPress = {()=>{signOut()}}>
              <TextBotao style={styles.buttextBoTextBotao}>SAIR</TextBotao>
          </BotaoSair>
     
      </View>     
    </View>            
  )};

  

export default Form; 