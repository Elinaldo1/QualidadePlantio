import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';



function Header(texto) {
  return (
  <View style= {styles.container}>
      <StatusBar backgroundColor = '#00b33b'/>
      <TouchableOpacity style={styles.BotaoMenu}>
        <AntDesign name = 'menuunfold' style = {{fontSize:20, color: '#fff'}}/>
      </TouchableOpacity>
    {/* <Image style={styles.imagem} source={require('../../assets/cadastrar.png')} resizeMode = 'cover' /> */}
    <Text style={styles.headertext}> {texto.caption} </Text>
    <View style ={styles.containerUser}>
      <Text style={styles.textUser}>5492</Text>
      <Text style={styles.textUser}>Elinaldo Sa Correia da silva</Text>
      

    </View>
      <TouchableOpacity style={styles.Botao}>
        <AntDesign name = 'logout' style = {{fontSize:20, color: '#fff'}}/>
        <Text style={styles.textUser}>Exit</Text>
      </TouchableOpacity>
  </View>
  );
}
export default Header;

