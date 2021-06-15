import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {

  const  [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [login, setLogin] =  useState(false)
  const [logOut, setLogOut] =  useState(false)

useEffect(() => {
  
      async function loadStorage(){
        
        const storageUser = await AsyncStorage.getItem('user')
          if (storageUser !== null) {

            setUser(storageUser)
            setLoading(false)
          }

          setLoading(false);
      };
 
     loadStorage();
}, []);

  async function signIn(matricula){
    if (matricula==''){
      Alert.alert('Inválido','Insira a matrícula')
      return
    }

    setLogin(true)
    setLoading(true)
    await AsyncStorage.setItem('user', matricula.toString())
      .then(async() => {
       const log = await AsyncStorage.getItem('user')
 
            setUser(log),
            setLoading(false)
            setLogin(false)
    
        });
  }
  
 async function signOut(){
   setLogOut(true)
   setLoading(true)
   await AsyncStorage.clear()
    .then(() => {setUser(null)
      setLoading(false)
      setLogOut(false)
    });
  }

async function salvaAmostra(salvar){
  setLoading(true);
  return await salvar(),
  setLoading(false);
}

  return(
    <AuthContext.Provider value ={{signed: !!user, user, loading, login, logOut, signIn, signOut, salvaAmostra}} >
      {children}
    </AuthContext.Provider>
  );
}