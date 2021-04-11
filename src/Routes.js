import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Form from './pages/forms/cadSetor';
import FormMuda from './pages/forms/qmuda/index';
import Formi from './pages/forms/qplantio/index';
// import Local from './pages/location';
import Login from './pages/login';
import PrPlantio from './pages/parametros';
import Amostra from './pages/viewamostra';



const AppStack = createStackNavigator();
const Drawer   = createDrawerNavigator();
// const Tab = createBottomTabNavigator();

const Routes = () => {
  return(

     <NavigationContainer>
      {/* <Tab.Navigator initialRouteName = "Login"
          tabBarOptions = {
            {
              style: {
                elevation: 0,
                shadowOpacity: 0,
                height: 30,
              },
              labelStyle: {
                fontSize:14,
                height: 20,
                fontWeight: 'bold',
              },
              tabStyle:{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              },
              iconStyle:{
                fontSize:25,
                height:30,
                color:'red'
              },
              
              //  activeBackgroundColor: "#3b3b",
              // inactiveBackgroundColor: "#313131"
              
    
            }
        
      }>
      <Tab.Screen name = "Login" component = {Login} />
      <Tab.Screen name = "Home" component = {Home} />
      <Tab.Screen name = "Form" component = {Form} />
      <Tab.Screen name = "Plantio" component = {Formi} />
      <Tab.Screen name = "Muda" component = {FormMuda} />
      <Tab.Screen name = "Graficos" component = {Grafico} />
     </Tab.Navigator> */}

       {/* <AppStack.Navigator headerMode='none' >
          <AppStack.Screen name="Login" component={Login} />
          <AppStack.Screen name="Home" component={Home} />
          <AppStack.Screen name="Form" component={Form} />
          <AppStack.Screen name="Formik" component={Formi} />
        </AppStack.Navigator> */}
         <Drawer.Navigator
        
        initialRouteName = "Login" 
        drawerStyle = {style.container} 
        drawerContentOptions= {{ 
          activeBacgroundColor: "#fff",
         inactiveTintColor: "#fff"
        }} >
              <Drawer.Screen name="Login" component  = {Login} 
            options = {
              {
                drawerLabel: (({focused}) => <Text style={{color: focused ? '#fff' : '#ff39' }}>Login</Text>)
                // drawerIcon: (({focused})=> <Icon color={focused ? '#f' : '#ff'} name = 'Home' /> )
              }
            } 
            />         
              {/* <Drawer.Screen name="Local" component  = {Local} 
            options = {
              {
                drawerLabel: (({focused}) => <Text style={{color: focused ? '#fff' : '#ff39' }}>Local</Text>)
                // drawerIcon: (({focused})=> <Icon color={focused ? '#f' : '#ff'} name = 'Home' /> )
              }
            } 
            />          */}

            <Drawer.Screen name="Amostra" component  = {Amostra} 
            options = {
              {
                drawerLabel: (({focused}) => <Text style={{color: focused ? '#fff' : '#ff39' }}>Amostras</Text>)
                // drawerIcon: (({focused})=> <Icon color={focused ? '#f' : '#ff'} name = 'Home' /> )
              }
            } 
            />
            <Drawer.Screen name="Form" component  = {Form}
              options = {
                {
                  drawerLabel: (({focused}) => <Text style={{color: focused ? '#fff' : '#ff39' }}>Tela 2</Text>)
                  // drawerIcon: (({focused})=> <Icon color={focused ? '#f' : '#ff'} name = 'Home' /> )
                }
              }
            />
            <Drawer.Screen name="Qualidade Colheita" component = {FormMuda}
              options = {
                {
                  drawerLabel: (({focused}) => <Text style={{color: focused ? '#fff' : '#ff39' }}>Qualidade Colheita</Text>)
                  // drawerIcon: (({focused})=> <Icon color={focused ? '#f' : '#ff'} name = 'Home' /> )
                }
              }          
            />
              <Drawer.Screen name="Qualidade Plantio" component = {Formi}
              options = {
                {
                  drawerLabel: (({focused}) => <Text style={{color: focused ? '#fff' : '#ff39' }}>Qualidade Plantio</Text>)
                  // drawerIcon: (({focused})=> <Icon color={focused ? '#f' : '#ff'} name = 'Home' /> )
                }
              }          
            />          
              <Drawer.Screen name="PrPlantio" component = {PrPlantio}
              options = {
                {
                  drawerLabel: (({focused}) => <Text style={{color: focused ? '#fff' : '#ff39' }}>Parâmetros Plantio</Text>)
                  // drawerIcon: (({focused})=> <Icon color={focused ? '#f' : '#ff'} name = 'Home' /> )
                }
              }          
            />          
        
        </Drawer.Navigator>
    </NavigationContainer>

  );
}

export default Routes;

const style = StyleSheet.create({
  container:{
    backgroundColor: "#363636",
    paddingVertical: 10
  },

});