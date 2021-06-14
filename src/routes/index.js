import React, { useContext } from 'react';
import Splash from '../components/Carregamento';
import { AuthContext } from '../contexts/auth';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

function Routes(){
    // return (<AppRoutes/>)
    const {signed, loading, login} = useContext(AuthContext);
    
    if(loading){
        return(
            login ? (<Splash message = 'Logando Usuário...' />) : (<Splash message = 'Saindo...' />)         
        );
    };
    
    return(
        signed ?<AppRoutes/> : <AuthRoutes/> 
    );
};

export default Routes;