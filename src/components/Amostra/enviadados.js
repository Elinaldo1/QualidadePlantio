
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Amostra({data}) {
 
  const estilo = [{}]
  const texts = [];
  texts.splice(0);

    for (const index in data){
            
      const result = data[index]
      
      estilo.splice(0);
      if (index == 'id'){estilo.push(Style.id)};
      if (index == 'inicioEnvio'){estilo.push(Style.titulo)};
      if (index == 'fimEnvioOk'){estilo.push(Style.titulo)};
      if (index == 'limpeza'){estilo.push(Style.titulo)};
      if (index == 'fimLimpeza'){estilo.push(Style.titulo)};

      if (index == 'fimEnvioFalha'){estilo.push(Style.erroDestaque)};

      if (index == 'fim'){estilo.push(Style.fim)}; 

      if (index == 'msg'){estilo.push(Style.erros)};
      if (index.indexOf('falhaEnvio') == 0 ){estilo.push(Style.erros)};
      if (index.indexOf ('serverFalha')==0 ){estilo.push(Style.erros)};
      if (index == 'erroInsert'){estilo.push(Style.erros)};

      if (index == 'naoEnviados'){estilo.push(Style.naoEnviados)};

      if (index == 'enviados'){estilo.push(Style.msgOk)};
      if (index == 'excluidos'){estilo.push(Style.msgOk)};
      if (index.indexOf('serverOk') == 0 ){estilo.push(Style.msgOk)};
      if (index.indexOf('envioOk') == 0 ){estilo.push(Style.msgOk)};

      if (result !== ''){
      
        texts.push(<Text key= {result} style = {estilo[0]}>{result}</Text>)
        // console.log('resul '+index+' - '+result)
      }
 
    };
  return (
    <View style = {
        {
          marginBottom: 10,
          padding: 10,
          backgroundColor: '#fff',
          borderRadius: 5
        }
      } >
      {texts}
    </View>
 )
}

const Style = StyleSheet.create({
  id:{
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#111',
    width: '100%',
    textAlign: 'center'
  },
  titulo:{
    color: 'green',
    fontWeight: 'bold'
  },
  tituloFalha:{
    fontWeight: 'bold', 
    color: '#f22'
  },
  fim:{
    alignSelf: 'center',
    fontWeight: 'bold', 
    color: '#111'
  },
  msgOk:{
    color: '#00b341'
  },
  erros: {
    color:'#f229',
  },
  erroDestaque: {
    fontWeight: 'bold',
    color: '#f22'
  },
  naoEnviados:{
    color: '#f22',
  }
})