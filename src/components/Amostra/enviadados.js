
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Amostra({data}) {
 
  const navigation = useNavigation();
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
        texts.push(<Text style = {estilo[0]} >{result}</Text>)
        // console.log('resul '+index+' - '+result)
      }
 
    };
  return (
    <View style = {{marginBottom: 10, padding: 10, backgroundColor: '#fff', borderRadius: 5}} >
    {texts}
    {/* {data.id          &&  <Text style= {{alignSelf: 'center', fontWeight: 'bold', color: '#111' }} >{data.id}</Text>} */}
    {/* {data.msg         &&  <Text style= {{color: '#f229'}} >{data.msg}</Text>} */}
    {/* {data.inicioEnvio &&  <Text style= {{color: 'green', fontWeight: 'bold'}} >{data.inicioEnvio}</Text>} */}
    {/* {data.dados       &&  <Text style= {{}} >{data.dados}</Text>}
    {data.enviando    &&  <Text style= {{}} >{data.enviando}</Text>} */}
    {/* {data.serverOk    &&  <Text style= {{color: 'green'}} >{data.serverOk}</Text>}
    {data.envioOk     &&  <Text style= {{color: 'green'}} >{data.envioOk}</Text>} */}
    {/* {data.falhaEnvio  &&  <Text style= {{color: '#f229'}} >{data.falhaEnvio}</Text>}
    {data.serverFalha &&  <Text style= {{color: '#f229'}} >{data.serverFalha}</Text>}
    {data.erroInsert  &&  <Text style= {{color: '#f229'}} >{data.erroInsert}</Text>} */}
    {/* {data.fimEnvioOk  &&  <Text style= {{fontWeight: 'bold', color: 'green'}} >{data.fimEnvioOk}</Text>} */}
    {/* {data.fimEnvioFalha  &&  <Text style= {{fontWeight: 'bold', color: '#f22'}} >{data.fimEnvioFalha}</Text>} */}
    {/* {data.enviados    &&  <Text style= {{color: '#00b341'}} >{data.enviados}</Text>}
    {data.naoEnviados &&  <Text style= {{color: '#f22'}} >{data.naoEnviados}</Text>}
    {data.limpeza     &&  <Text style= {{}} >{data.limpeza}</Text>}
    {data.excluidos   &&  <Text style= {{}} >{data.excluidos}</Text>}
    {data.fimLimpeza  &&  <Text style= {{}} >{data.fimLimpeza}</Text>} */}
    {/* {data.fim         &&  <Text style= {{fontWeight: 'bold', color: '#111'}} >{data.fim}</Text>} */}

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