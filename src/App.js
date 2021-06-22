import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
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