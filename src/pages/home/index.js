import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Header from '../../components/header/index';
import { AuthContext } from '../../contexts/auth';
import { styles } from './styles';


function Form () {
    
  const navigation = useNavigation();
  const {user} = useContext(AuthContext);

  return(
    <>
      <Header caption="INÍCIO" user = {user.matricula}>
       
      <TouchableOpacity onPress = {() => navigation.goBack()}>
        <AntDesign name = "arrowleft" size = {25} />
      </TouchableOpacity>
      </Header> 

      <View style={styles.container}>
        {/* <Image source = {logo} style={styles.topImage} />
        <Text style={styles.title}>QUALIDADE PLANTIO BSA 2021</Text> */}
      

          <TouchableOpacity style={styles.button} onPress = {()=>{navigation.navigate('Índice Infestação')}}>
              <Text style={styles.buttonText}>Índice Infestação</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress = {()=>{navigation.navigate('Colheita Muda')}}>
              <Text style={styles.buttonText}>Colheita Muda</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress = {()=>{navigation.navigate('Colheita Mecanizada')}}>
              <Text style={styles.buttonText}>Colheita Mecanizada</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress = {()=>{navigation.navigate('Plantio')}}>
              <Text style={styles.buttonText}>Plantio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress = {()=>{navigation.navigate('Admin')}}>
              <Text style={styles.buttonText}>Administrador</Text>
          </TouchableOpacity>
     
      </View>     
    </>            
  )};

  

export default Form; 