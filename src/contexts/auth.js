import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, memo, useEffect, useState } from 'react';
import { Alert } from 'react-native';

export const AuthContext = createContext({});

function AuthProvider({ children }) {

  const [user, setUser] = useState(null)
  const [rota, setRota] = useState(null)
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
      if (rota!==null){

        const storageRota = await AsyncStorage.getItem('rota')
          if (storageRota !== null) {
    
            setRota(storageRota)
            setLoading(false)
          }
      }
  
        setLoading(false);
    };
 
     loadStorage();
}, []);

async function rotas(rota){

  setLogin(true)
  setLoading(true)
  if (rota!==null){

    await AsyncStorage.setItem('rota', rota.toString())
      .then(async() => {
       const log = await AsyncStorage.getItem('rota')
  
            setRota(log)
            setLoading(false)
            setLogin(false)
            
          });
        }
        setLoading(false)
        setLogin(false)
}

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
            setRota('Home')
            setUser(log),
            setLoading(false)
            setLogin(false)
    
        });
  }
  
 async function signOut(){
   setLogOut(true)
   setLoading(true)
   await AsyncStorage.multiRemove(['user','rota'])
    .then(() => {
      setRota(null)
      setUser(null)
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
    <AuthContext.Provider value ={{signed: !!user, user, rota, loading, login, logOut, rotas, signIn, signOut, salvaAmostra}} >
      {children}
    </AuthContext.Provider>
  );
};

export default memo(AuthProvider);