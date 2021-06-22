import React, { useContext } from 'react';
import Splash from '../components/Carregamento';
import { AuthContext } from '../contexts/auth';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

function Routes(){
    
    const {signed, loading, login} = useContext(AuthContext);
    
    if(loading){
        return(
            <Splash message = 'Carregando...' />        
            );
        };

    return(      
        signed ?<AppRoutes/> : <AuthRoutes/> 
        // <AppRoutes/> 
    );
};

export default Routes;