import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import CustomDrawer from '../../components/CustomDrower';
import { AmColhMec, AmColhMuda, AmInfestacao, AmPlantio } from '../../pages/amostras';
import { CadParamColhMec, CadParamColhMuda, CadParamPlantio, ColhMec, ColhMuda, Infestacao, Plantio, Servidor } from '../../pages/forms';
import Home from '../../pages/home';
import { PrColhMecanica, PrMuda, PrPlantio } from '../../pages/parametros';
import Camera from '../Camera';

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
    }
};

//========Rota Inicial==================================================================
export default function Inicio() {
 return (
   <AppDrawer.Navigator
    initialRouteName = "Home"
    drawerContent={ (props) => <CustomDrawer activeScreen = 'INÍCIO' {...props} /> }
    drawerContentOptions={StyleDrawer}
   >
       <AppDrawer.Screen name="Home" component={Home}/>
       <AppDrawer.Screen name="Índice Infestação" component={PgInfestacao}/>
       <AppDrawer.Screen name="Plantio" component={PgPlantio}/>
       <AppDrawer.Screen name="Colheita Muda" component={PgColhMuda}/>
       <AppDrawer.Screen name="Colheita Mecanizada" component={PgColhMec}/>
       <AppDrawer.Screen name="Admin" component={Admin}/>      
       <AppDrawer.Screen name="Câmera" component={Camera}/>          
   </AppDrawer.Navigator>
  );
};
//========================================================================================
export function PgPlantio() {
    return (
      <AppDrawer.Navigator
        initialRouteName = "Apontar Amostra"
        drawerContent={ (props) => <CustomDrawer activeScreen = 'PLANTIO' {...props} /> }
        drawerContentOptions={StyleDrawer}
      >
          <AppDrawer.Screen name="Home" component={Inicio}/>
          <AppDrawer.Screen name="Apontar Amostra" component={Plantio}/>
          <AppDrawer.Screen name="Amostras" component={AmPlantio}/>
          <AppDrawer.Screen name="Parâmetros" component={PrPlantio}/>
          <AppDrawer.Screen name="Cadastrar Parâmetros" component={CadParamPlantio} />        
      </AppDrawer.Navigator>
     );
   }
//======================================================================================
   export function PgColhMuda() {
    return (
      <AppDrawer.Navigator 
        initialRouteName = "Apontar Amostra"
        drawerContent={ (props) => <CustomDrawer activeScreen = 'COLHEITA MUDA' {...props} /> }
        drawerContentOptions={StyleDrawer}
      >
          <AppDrawer.Screen name="Home" component={Inicio}/>
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
      >
          <AppDrawer.Screen name="Home" component={Inicio}/>
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
      >
          <AppDrawer.Screen name="Home" component={Inicio}/>
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
      >
          <AppDrawer.Screen name="Home" component={Inicio}>
          </AppDrawer.Screen>
          <AppDrawer.Screen name="Admin" component={Servidor}/>    
      </AppDrawer.Navigator>
     );
   }