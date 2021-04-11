
   // import { useEffect } from 'react';
   // import * as Updates from 'expo-updates';
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
// import Formi from './src/pages/forms/Cadastro/index';
// import Form from './src/pages/forms/form1';
// import Grafico from './src/pages/graficos';
// import Home from './src/pages/home';
// import Login from './src/pages/login';
import Routes from './Routes';
import { isSignedIn } from './services/auth';




export default class App extends React.Component {

      state = {
         signed: false,
         signLoaded: false,
      };

      componentDidMount() {
         isSignedIn()
            .then(res => this.setState({ signed: res, signLoaded: true }))
            .catch(err => alert(err));
      }
      
      

      render(){

         const AppStack = createStackNavigator();
         const { signLoaded, signed } = this.state;

         if (!signLoaded) {
            return null;
         }
         
         return( <Routes/>
         //    <NavigationContainer>
         //     <AppStack.Navigator headerMode='none' screenOptions = {{headerShown: signed}} >
         //  {signed ? (alert('fora'),
         //     <>
         //       <AppStack.Screen name="Home" component={Home} />
         //     </>
         //  ) : ( alert('entrou'),
         //  <>
         //       {/* <AppStack.Screen name="Grafico" component={Grafico} /> */}
         //       <AppStack.Screen name="Login" component={Login} />
         //       <AppStack.Screen name="Form" component={Form} />
         //       <AppStack.Screen name="Formik" component={Formi} />
         //      </> 
         //  )}
         //     </AppStack.Navigator>
         //    </NavigationContainer> 
    )

            
         }

      }
      // useEffect(() => {
      //    async function updateapp(){
      //       const { isAvailable } = await Updates.checkForUpdateAsync()
   
      //       if (isAvailable) {
      //          await Updates.fetchUpdateAsync()
      //          await Updates.reloadAsync()
      //       }
      //    }
      //    updateapp();
      // },[]);
   