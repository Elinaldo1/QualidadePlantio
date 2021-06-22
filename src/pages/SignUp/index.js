import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React, { memo } from 'react';
import CustomDrawer from '../../components/CustomDrower';
import { AmColhMec, AmColhMuda, AmInfestacao, AmPlantio } from '../../pages/amostras';
import { CadParamColhMec, CadParamColhMuda, CadParamPlantio, ColhMec, ColhMuda, Infestacao, Plantio, Servidor } from '../../pages/forms';
import { PrColhMecanica, PrMuda, PrPlantio } from '../../pages/parametros';
import Home from '../home';

const AppStack = createStackNavigator();
const AppDrawer = createDrawerNavigator();

const StyleDrawer = {
    labelStyle:{
      fontWeight: 'bold'
    },
    
    activeTintColor: '#FFF',
    activeBackgroundColor: '#00b94a',
    inactiveBackgroundColor: '#0009',
    inactiveTintColor: '#DDD',
    itemStyle: {
        marginVertical: 5,
    },

};

//========Rota Inicial==================================================================
function Inicio() {
 return (
   <AppStack.Navigator
    initialRouteName = "Home"
    // drawerContent = {(props) => <CustomDrawer activeScreen = 'HOME' {...props} />}
    // drawerContentOptions = {StyleDrawer}
    screenOptions = {{headerShown:false, unmountOnBlur: true}}
   >
       <AppDrawer.Screen name="Home" component={Home}/>
   </AppStack.Navigator>
  );
};
export default memo(Inicio);
//========================================================================================
export function PgPlantio() {
    return (
      <AppDrawer.Navigator
        initialRouteName = "Apontar Amostra"
        drawerContent={ (props) => <CustomDrawer activeScreen = 'PLANTIO' {...props} /> }
        drawerContentOptions={StyleDrawer}
        screenOptions = {{headerShown:false, unmountOnBlur:true}}
      >
          <AppDrawer.Screen name="Apontar Amostra" component={Plantio}/>
          <AppDrawer.Screen name="Amostras" component={AmPlantio}/>
          <AppDrawer.Screen name="Parâmetros" component={PrPlantio}/>
          <AppDrawer.Screen name="Cadastrar Parâmetros" component={CadParamPlantio} />        
      </AppDrawer.Navigator>
     );
   };
//======================================================================================
   export function PgColhMuda() {
    return (
      <AppDrawer.Navigator 
        initialRouteName = "Apontar Amostra"
        drawerContent={ (props) => <CustomDrawer activeScreen = 'COLHEITA MUDA' {...props} /> }
        drawerContentOptions={StyleDrawer}
        screenOptions = {{headerShown:false, unmountOnBlur: true}}
      >
          <AppDrawer.Screen name="Apontar Amostra" component={ColhMuda}/>
          <AppDrawer.Screen name="Amostras" component={AmColhMuda}/>
          <AppDrawer.Screen name="Parâmetros" component={PrMuda}/>
          <AppDrawer.Screen name="Cadastrar Parâmetros" component={CadParamColhMuda} />        
      </AppDrawer.Navigator>
     );
   }
//==============================================================================================

export function PgColhMec() {
    return (
      <AppDrawer.Navigator  
        initialRouteName = "Apontar Amostra"
        drawerContent={ (props) => <CustomDrawer activeScreen = 'COLHEITA MECÂNICA' {...props} /> }
        drawerContentOptions={StyleDrawer}
        screenOptions = {{headerShown:false, unmountOnBlur: true}}
      >
          <AppDrawer.Screen name="Apontar Amostra" component={ColhMec}/>
          <AppDrawer.Screen name="Amostras" component={AmColhMec}/>
          <AppDrawer.Screen name="Parâmetros" component={PrColhMecanica}/>
          <AppDrawer.Screen name="Cadastrar Parâmetros" component={CadParamColhMec} />       
      </AppDrawer.Navigator>
     );
   }

   //=================================================================
   export function PgInfestacao() {
    return (
      <AppDrawer.Navigator
        initialRouteName = "Apontar Amostra"
        drawerContent={ (props) => <CustomDrawer activeScreen = 'ÍNDICE INFESTAÇÃO' {...props} /> }
        drawerContentOptions={StyleDrawer}
        screenOptions = {{headerShown:false, unmountOnBlur:true}}
      >
          <AppDrawer.Screen name="Apontar Amostra" component={Infestacao}/>
          <AppDrawer.Screen name="Amostras" component={AmInfestacao}/>      
      </AppDrawer.Navigator>
     );
   }

   //=======================================================================
   export function Admin() {
    return (
      <AppDrawer.Navigator   
        initialRouteName = "Admin"
        drawerContent={ (props) => <CustomDrawer activeScreen = 'ADMINISTRADOR' {...props} /> }
        drawerContentOptions={StyleDrawer}
        screenOptions = {{headerShown:false, unmountOnBlur:true}}
      >
          <AppDrawer.Screen name="Admin" component={Servidor}/>    
      </AppDrawer.Navigator>
     );
   }