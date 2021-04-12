import React, { useEffect, useState } from 'react';
import Amostras from '../../components/Amostra';
import Header from '../../components/header/index';
import { querie } from '../../databases';
import insert from '../../services/enviadados';
import getRealm from '../../services/index';
import { Botao, Container, List, styles, TextBotao } from './styles';


export default function Amostra() {

    // const navigation = useNavigation();
    const [amostras, setAmostras] = useState([]);
    // const [Total, setTotal] = useState(0)
    // const [valorAtual, setValorAtual] = useState(0)
    
    const data = new Date()
    const dataHora = `${data.getDate()}-${data.getMonth()+1}-${data.getFullYear()} ${data.getHours()}:${data.getMinutes()}:${data.getMilliseconds()}`

    const dados = [{
      id: 2,
      data: dataHora,
      matricula: '5555',
      responsavel: 'Elinaldo',
      fazenda: 'Sao Domingos',
      up: '15',
      plantadora: '299',
      turno: 'B',
      amostra: '2',
      esteira: 'D',
      kg_amostra: '4.5',
      sulco: '34',
      cobricao: '8',
      espaco_linha: '1.55',
      toletes: '20',
      gemas_total: '30',
      gemas_viaveis: '18',
      gemas_inviaveis: '12',
      obs: 'values.obs obeservação',
      lat:'-18.444444',
      long: '49.555555',
    },{
      id: 3,
      data: dataHora,
      matricula: '4444',
      responsavel: 'Elinado',
      fazenda: 'São Domingos',
      up: 15,
      plantadora: 291,
      turno: 'B',
      amostra: 2,
      esteira: 'A',
      kg_amostra: 4.5,
      sulco: 34,
      cobricao: 8,
      espaco_linha: 1.55,
      toletes: 20,
      gemas_total: 30,
      gemas_viaveis: 18,
      gemas_inviaveis: 12,
      obs: 'values.obs obeservação',
      lat:'18.444444',
      long: '49.555555',
    },
    {
      id: 4,
      data: dataHora,
      matricula: '3333',
      responsavel: 'Elinado',
      fazenda: 'São Domingos',
      up: 15,
      plantadora: 291,
      turno: 'B',
      amostra: 2,
      esteira: 'A',
      kg_amostra: 4.5,
      sulco: 34,
      cobricao: 8,
      espaco_linha: 1.55,
      toletes: 20,
      gemas_total: 30,
      gemas_viaveis: 18,
      gemas_inviaveis: 12,
      obs: 'values.obs obeservação',
      lat:'18.444444',
      long: '49.555555',
    }
  ]
 
  useEffect(() => {
    async function loadrealm () {
      const realm = await getRealm();
      const data =  realm.objects('Plantio').sorted('id',true);
      setAmostras(data);
    };

    loadrealm();
    
  },[])

  excluirAmostra = async (data) => {
    const realm = await getRealm();
    realm.write(() => {
      if(realm.objects('Plantio').filtered('id='+data).length>0){
        realm.delete(
          realm.objects('Plantio').filtered('id='+data)
        )
      };
    });
  
    const amostrasAtuais = await realm.objects('Plantio').sorted('id',true)
    setAmostras(amostrasAtuais);
    alert('Registro '+ data +' excluído!')
  }

  function editarAmostra(){
    alert('editar')
  }

  async function enviadados (){
    await loadrealm().then(
      insert(amostras,querie))
  }

  return (
    
    <>
      <Header caption="AMOSTRAS" />
      <Container style={styles.container}>

      <List
        showsVerticalScrollIndicator = {false}
        keyboardsShouldPersistTaps='handle'
        data={amostras}
        // data={dados}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (<Amostras data = {item} editar={editarAmostra} excluir={excluirAmostra} />)}
      />
      </Container>
        
       {/* <Botao onPress = {()=>{loadrealm()}}>
         <TextBotao>busca amostras</TextBotao>
       </Botao> */}
       <Botao onPress = {()=>enviadados()}>
         <TextBotao>teste</TextBotao>
       </Botao>
    </>
  );

}

