import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React, { useContext } from 'react';
import { Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AuthProvider, { AuthContext } from '../../contexts/auth';
import { SubtituloDraewr, TituloDrawer } from './style';



export default function CustomDrower(props) {

  const { signOut } = useContext(AuthContext);

 return (
   <>
   <AuthProvider>
    <View style = {{padding:10, width:'100%', height: '18%', backgroundColor:'#fff', alignItems: 'center'}}>
      <Image source = {require('../../assets/icoApp.png')} style={{width:60, height:60}}/>
      <TituloDrawer>Apontamento Qualidade</TituloDrawer>
      <SubtituloDraewr>{props.activeScreen}</SubtituloDraewr>
    </View>
  <DrawerContentScrollView {...props} style = {{backgroundColor:'#fff'}} >
    <DrawerItemList {...props}/>

    {/* <DrawerItemList 
      {...props}
      label = 'EXIT'
      inactiveBackgroundColor = '#f228'
      onPress = {()=>alert('sair')}
    /> */}
  </DrawerContentScrollView>

  <View style = {{width:'100%', height: 40,
   backgroundColor:'#fff',
    alignItems: 'center',
    justifyContent:'center',
    padding:7,
    marginBottom:10,
    marginTop:10 }}>

      <TouchableOpacity 
          style ={{backgroundColor: '#f22',
                alignItems: 'center',
                justifyContent: 'center',
                width:200,
                height:40,
                borderRadius:5
                 }}
          onPress = {() => signOut()}     
        >
        <Text style = {{fontWeight:'bold', color: '#fff', textAlign: 'center'}}>SAIR</Text>
      </TouchableOpacity>
  </View>

  </AuthProvider>

  </>
  );
}