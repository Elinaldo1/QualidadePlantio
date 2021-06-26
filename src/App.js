import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import codePush from 'react-native-code-push';
import 'react-native-gesture-handler';
import Routes from '../src/routes';
import AuthProvider from './contexts/auth';


const codePushOptions = {checkFrequence: codePush.CheckFrequency.ON_APP_RESUME}

class App extends React.Component {

      render(){
         
         return( 
            <NavigationContainer>
             <AuthProvider>
               <Routes/>
             </AuthProvider>
            </NavigationContainer>
         )      
      }
};
export default codePush(codePushOptions)(App);