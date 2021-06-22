import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import React, { memo, useContext } from 'react';
import { Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../../contexts/auth';
// import AuthProvider from '../../contexts/auth';
import { SubtituloDraewr, TituloDrawer } from './style';



function CustomDrower(props) {

  const { rotas, signOut } = useContext(AuthContext);

 return (
   <>
   {/* <AuthProvider> */}
    <View style = {{padding:10, width:'100%', height: '18%', backgroundColor:'#fff', alignItems: 'center'}}>
      <Image source = {require('../../assets/icoApp.png')} style={{width:60, height:60}}/>
      <TituloDrawer>Apontamentos</TituloDrawer>
      <SubtituloDraewr>{props.activeScreen}</SubtituloDraewr>
    </View>
  <DrawerContentScrollView {...props} style = {{backgroundColor:'#fff'}} >
    <DrawerItem {...props}
      label = 'Home'
      onPress = {()=>{rotas('Home')}}
    />
    <DrawerItemList {...props}/>


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

  {/* </AuthProvider> */}

  </>
  );
};

export default memo(CustomDrower);