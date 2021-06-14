import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CustomDrower from './components/CustomDrower';
import { AmColhMec, AmColhMuda, AmInfestacao, AmPlantio } from './pages/amostras';
import ConfigServer from './pages/forms/configservidor';
import Infestacao from './pages/forms/infestacao';
import { CadParamColhMec, CadParamColhMuda, CadParamPlantio } from './pages/forms/parametros';
import { ColhMec, ColhMuda, Plantio } from './pages/forms/qualidade';
import Form from './pages/home';
// import Local from './pages/location';
import Login from './pages/login';
import { PrColhMecanica, PrMuda, PrPlantio } from './pages/parametros';





const AppStack = createStackNavigator();
const Drawer   = createDrawerNavigator();
// const Tab = createBottomTabNavigator();

const Routes = () => {
  return(

     <NavigationContainer>
         <Drawer.Navigator
        drawerContent = {CustomDrower}
        initialRouteName = "Home" 
        drawerContentOptions = {{
          
          labelStyle:{
            fontWeight: 'bold',
          },
          activeBackgroundColor: '#00b33b',
          activeTintColor: '#fff',
          inactiveBackgroundColor:'#1111'
        }}

>
            <Drawer.Screen name="Home" component  = {Form}/>
            <Drawer.Screen name="Login" component  = {Login}/>         
            <Drawer.Screen name="Levantamento Infestação" component  = {Infestacao}/>
            <Drawer.Screen name="Amostra Infestação" component  = {AmInfestacao}/>
            <Drawer.Screen name="Amostra Plantio" component  = {AmPlantio}/>
            <Drawer.Screen name="Amostra Colheita Muda" component  = {AmColhMuda}/>
            <Drawer.Screen name="Amostra Colheita Mecânica" component  = {AmColhMec}/>
            <Drawer.Screen name="Qualidade Colheita Muda" component = {ColhMuda}/>
            <Drawer.Screen name="Qualidade Colheita Mecânica" component = {ColhMec}/>
            <Drawer.Screen name="Qualidade Plantio" component = {Plantio}/>          
            <Drawer.Screen name="Parâmetros Plantio" component = {PrPlantio}/>          
            <Drawer.Screen name="Parâmetros Muda" component = {PrMuda}/>          
            <Drawer.Screen name="Parâmetros Colheita Mecanica" component = {PrColhMecanica}/>          
            <Drawer.Screen name="cadParamColhMuda" component = {CadParamColhMuda}/>          
            <Drawer.Screen name="cadParamColhMec" component = {CadParamColhMec}/>          
            <Drawer.Screen name="CadParamPlantio" component = {CadParamPlantio}/>               
            <Drawer.Screen name="Config Server" component = {ConfigServer}/>               
        </Drawer.Navigator>
    </NavigationContainer>

  );
}

export default Routes;
