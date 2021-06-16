
   // import { useEffect } from 'react';
   // import * as Updates from 'expo-updates';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
// import Formi from './src/pages/forms/Cadastro/index';
// import Form from './src/pages/forms/form1';
// import Grafico from './src/pages/graficos';
// import Home from './src/pages/home';
// import Login from './src/pages/login';
import Routes from '../src/routes';
import AuthProvider from './contexts/auth';

export default class App extends React.Component {

      render(){
         
         return( 
            <NavigationContainer>
             <AuthProvider>
               <Routes/>
             </AuthProvider>
            </NavigationContainer>
         )

            
         }

}