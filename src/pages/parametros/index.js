import React, { useEffect, useState } from 'react';
import Header from '../../components/header';
import Parametro from '../../components/parametros/parametroPlantio';
import getRealm from '../../services/index';
import { Botao, Container, List, styles, TextBotao } from './styles';

export default function Prlantio() {

  const [parametro, setParametro] = useState([]);

  const dados = [
    {sulco: '35',
    cobricao: '7 a 10',
    espaco_linha: '1.45 a 1.55',
    gemas_viaveis: '15 a 18',
    comprimento: '2',}

]
 
useEffect(() => {
  
  
  async function loadrealm () {
    const realm = await getRealm();
      
    const data =  realm.objects('ParamPlantio');
    setParametro(data);
    console.log(data.isEmpty())
    console.log('p '+parametro.length)
    // console.log(JSON.stringify(data[2]))
     data.map(item=>console.log(item))
    }
  loadrealm();
  },[])

  return (
   parametro.length>0 ? (
   <>
      <Header caption="Parâmetros plantio" />
      <Container style={styles.container}>

      <List
        showsVerticalScrollIndicator = {false}
        keyboardsShouldPersistTaps='handle'
        data={parametro}
        // data={dados}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (<Parametro data = {item} />)}
      />
      </Container>

    </>
    ):
(      <> 
        <Header caption="Parâmetros plantio" />
        <Container>
          <Botao>
            <TextBotao>CADASTRAR PARÂMETROS</TextBotao>
          </Botao>
        </Container>
      </>)
    
  );

}

