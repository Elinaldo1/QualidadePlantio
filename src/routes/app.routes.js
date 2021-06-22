import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/auth';
// import CustomDrawer from '../components/CustomDrower/index';
// import { ColhMec, ColhMuda, Infestacao, Plantio, Servidor } from '../pages/forms';
// import Home from '../pages/home';
import SignUp, { Admin, PgColhMec, PgColhMuda, PgInfestacao, PgPlantio } from '../pages/SignUp';

const AppStack = createStackNavigator();
const AppDrawer = createDrawerNavigator();


function AppRoutes(){
    const {rota} = useContext (AuthContext);

    switch (rota) {
        case 'Infestacao':
            return(<PgInfestacao/>)
            break;
        case 'Muda':
            return(<PgColhMuda/>)
        case 'Mec':
            return(<PgColhMec/>)
        case 'Plantio':
            return(<PgPlantio/>)
        case 'Admin': 
            return (<Admin/>)    
        default:
            return(<SignUp/>)
    }

    return(
      <SignUp/>  
    // <AppDrawer.Navigator
    // screenOptions = {{ unmountOnBlur: true, headerShown:false}}
    // drawerContent={ (props) => <CustomDrawer {...props} /> }
    // drawerContentOptions={{
    //     labelStyle:{
    //         fontWeight: 'bold'
    //     },
        
    //     activeTintColor: '#FFF',
    //     activeBackgroundColor: '#00b94a',
    //     inactiveBackgroundColor: '#0009',
    //     inactiveTintColor: '#DDD',
    //     itemStyle: {
    //         marginVertical: 5,
    //     }
    // }}
    // >
    //     <AppStack.Screen name="SignUp" component={SignUp}/>

    // </AppDrawer.Navigator>
    );
}

export default AppRoutes;
