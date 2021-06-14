import React, { createContext, useState } from 'react';

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {

  const  [salvar, setSalvar] = useState(null)
  const [loading, setLoading] = useState(true)

// useLayoutEffect(() => {
//       async function loadStorage(){
        
//         const log = await AsyncStorage.getItem('user')
//           if (log !==null) {

//             setUser(log)
//             setLoading(false)
//           }

//           setLoading(false);
//       };

//       loadStorage();
// }, []);


async function salvaAmostra(salvar, isValid){
  // if (isValid){
    //   Alert.alert('Inválido','Insira a matrícula')
    //   return
    // }
  setSalvar('sim')
  setLoading(true);
  await salvar(),
  setSalvar(null),
  setLoading(false);
}

  return(
    <AuthContext.Provider value ={{signed: !!salvar, salvar, loading, salvaAmostra}} >
      {children}
    </AuthContext.Provider>
  );
}