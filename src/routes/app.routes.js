import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import CustomDrawer from '../components/CustomDrower/index';
// import { ColhMec, ColhMuda, Infestacao, Plantio, Servidor } from '../pages/forms';
// import Home from '../pages/home';
import SignUp from '../pages/SignUp';

const AppDrawer = createDrawerNavigator();

function AppRoutes(){
    return(
    <AppDrawer.Navigator
  
    drawerContent={ (props) => <CustomDrawer {...props} /> }
    drawerContentOptions={{
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
    }}
    >
        <AppDrawer.Screen name="SignUp" component={SignUp}/>

    </AppDrawer.Navigator>
    );
}

export default AppRoutes;
