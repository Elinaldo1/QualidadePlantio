import React, { useContext } from 'react';
import Splash from '../components/Carregamento';
import { AuthContext } from '../contexts/auth';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

function Routes(){

    // async function loadStorage(){
        
    //     const log = await AsyncStorage.getItem('user')
    //       if (log !==null) {

    //         setUser(log)
    //         setLoading(false)
    //       }

    //       setLoading(false);
    //   };

    //    loadStorage();
    
    const {signed, loading, login} = useContext(AuthContext);
    
    if(loading){
        return(
            login ? (<Splash message = 'Logando Usuário...' />) : (<Splash message = 'Aguarde...' />)         
        );
    };
    
    return(
        signed ?<AppRoutes/> : <AuthRoutes/> 
    );
};

export default Routes;