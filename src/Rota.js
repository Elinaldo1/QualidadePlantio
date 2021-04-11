import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Formi from './pages/forms/Cadastro/index';
import Form from './pages/forms/form1';
import Home from './pages/home';
import Login from './pages/login';
// import FormMuda from './pages/forms/form2/index';
 const AppStack = createStackNavigator();
          
// const Drawer   = createDrawerNavigator();
// const Tab = createBottomTabNavigator();
export const SignedOutRoutes = ()=>{
    return(
      <NavigationContainer>
       <AppStack.Navigator headerMode='none' initialRouteName='Login' >
          <AppStack.Screen name="Login" component={Login} />
       </AppStack.Navigator>
      </NavigationContainer>
    );    
};
export const SignedInRoutes = ()=>{
  return(
      <NavigationContainer>
       <AppStack.Navigator headerMode='none' initialRouteName='Home' >
          <AppStack.Screen name="Home" component={Home} />
          <AppStack.Screen name="Form" component={Form} />
          <AppStack.Screen name="Formik" component={Formi} />
        </AppStack.Navigator>
        </NavigationContainer>
  );
};
export const createRootNavigator= (signedIn = false) => {
    return(
            <NavigationContainer>
             <AppStack.Navigator headerMode='none' screenOptions={{headerShown: signedIn}} >
          {signedIn ? (
             <>
               <AppStack.Screen name="Login" component={Login} />
             </>
          ) : (
              <>
               <AppStack.Screen name="Home" component={Home} />
               <AppStack.Screen name="Form" component={Form} />
               <AppStack.Screen name="Formik" component={Formi} />
              </> 
          )}
             </AppStack.Navigator>
            </NavigationContainer> 
    )
};    
