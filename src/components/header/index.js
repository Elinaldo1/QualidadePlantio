import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import { styles } from './styles';

function Header(texto) {

  const navigation = useNavigation();
  const { user, signOut } = useContext(AuthContext);

  async function logOut(){
    signOut();
  }

  return (
 
    <View style= {styles.container}>

        <StatusBar backgroundColor = '#00b33b'/>

        <TouchableOpacity style={styles.BotaoMenu}  onPress={()=>{navigation.toggleDrawer();}}>
          <AntDesign name = 'menuunfold' style = {{fontSize:25, color: '#fff'}}/>
        </TouchableOpacity>
        {/* <Image style={styles.imagem} source={require('../../assets/cadastrar.png')} resizeMode = 'cover' /> */}
        <Text style={styles.headertext}> {texto.caption} </Text>

        <View style ={styles.containerUser}>
          <Text style={styles.textUser}>Matrícula:  {user}</Text>
        </View>

        <TouchableOpacity onPress = {()=>{logOut()}} style={styles.Botao}>
          <AntDesign name = 'logout' style = {{fontSize:18, paddingRight:5, color: '#fff'}}/>
          <Text style={styles.textUser}> Exit</Text>
        </TouchableOpacity>
        
    </View>

  );
}
export default Header;

