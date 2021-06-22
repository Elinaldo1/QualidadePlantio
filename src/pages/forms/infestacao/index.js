import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import { ThemeProvider } from 'styled-components';
import * as Yup from 'yup';
import InputText from '../../../components/forms/input';
import Header from '../../../components/header';
import getRealm, { criarEditarRealm } from '../../../services';
import { Local } from '../../location';
import {
  Botao, BotaoText, Campos, CamposCana,
  CenterView, Container,
  ContainerInput,
  Texto, TituloCampos
} from './styles';

const cores={
  border:'#111', borderW: 0,
};

const placeholder = {label:'Turno', value:null, color: '#b3b3b3'};
const ufs = [
    {label:'A', value:'A'},
    {label:'B', value:'B'},
    {label:'C', value:'C'},
  ]
function Infestacao({route}){

  const schema = 'Infestacao';
  const navigation = useNavigation();

  const [idEdit, setIdEdit] = useState(null)
  const [botaoSalvar, setBotaoSalvar] = useState('Salvar')

  const [cana1, setCana1] = useState({
    cana: '1',
    entreno_total: '',
    entreno_bc: '',
  });
  const [cana2, setCana2] = useState({
    cana: '2',
    entreno_total: '',
    entreno_bc: '',
  });
  const [cana3, setCana3] = useState({
    cana: '3',
    entreno_total: '',
    entreno_bc: '',
  });
  const [cana4, setCana4] = useState({
    cana: '4',
    entreno_total: '',
    entreno_bc: '',
  });
  const [cana5, setCana5] = useState({
    cana: '5',
    entreno_total: '',
    entreno_bc: '',
  });

  const canas = {
    cana1:{
      cana: '1',
      entreno_total: cana1.entreno_total,
      entreno_bc: cana1.entreno_bc,
    },
    cana2:{
      cana: '2',
      entreno_total: cana2.entreno_total,
      entreno_bc: cana2.entreno_bc,
    },
    cana3:{
      cana: '3',
      entreno_total: cana3.entreno_total,
      entreno_bc: cana3.entreno_bc,
    },
    cana4:{
      cana: '4',
      entreno_total: cana4.entreno_total,
      entreno_bc: cana4.entreno_bc,
    },
    cana5:{
      cana: '5',
      entreno_total: cana5.entreno_total,
      entreno_bc: cana5.entreno_bc,
    },
  }


  const [values, setValues] = useState ({ 
    fazenda: '',
    up:'',
    ponto:'',
    talhao:'',
  })

  

  useCallback(() => {
    const foco = navigation.addListener('focus', async ()=>{

     await AsyncStorage.getItem('editar').then(
       (res)=>{
         if (res===null) {

            setIdEdit(null);
            setValues(values => ({
              ...values, 
              fazenda: '',
              up:'',
              ponto:'',
              talhao:'',
            }));
            setCana1(values => ({ ...values, entreno_total:'', entreno_bc:'' }))
            setCana2(values => ({ ...values, entreno_total:'', entreno_bc:'' }))
            setCana3(values => ({ ...values, entreno_total:'', entreno_bc:'' }))
            setCana4(values => ({ ...values, entreno_total:'', entreno_bc:'' }))
            setCana5(values => ({ ...values, entreno_total:'', entreno_bc:'' }))
            setBotaoSalvar('Salvar');
          }else{
                 
            setIdEdit(route.params?.id)
            setBotaoSalvar('Alterar');
            setValues(values => ({ 
              ...values,  
              fazenda: route.params?.fazenda,
              up:route.params?.up,
              ponto:route.params?.ponto,
              talhao:route.params?.talhao,             
            }));
            switch (route.params?.cana) {
              case '1':
                                   setCana1(
                    values => ({...values, entreno_total: route.params?.entreno_total, entreno_bc: route.params?.entreno_bc})
                    );
                    setCana2(values => ({ ...values, entreno_total:'-', entreno_bc:'-' }))
                    setCana3(values => ({ ...values, entreno_total:'-', entreno_bc:'-' }))
                    setCana4(values => ({ ...values, entreno_total:'-', entreno_bc:'-' }))
                    setCana5(values => ({ ...values, entreno_total:'-', entreno_bc:'-' }))
                    
                    return;
                 case '2':
                                       setCana2(
                      values => ({...values, entreno_total: route.params?.entreno_total, entreno_bc: route.params?.entreno_bc})
                      );
                      setCana1(values => ({ ...values, entreno_total:'-', entreno_bc:'-' }))
                      setCana3(values => ({ ...values, entreno_total:'-', entreno_bc:'-' }))
                      setCana4(values => ({ ...values, entreno_total:'-', entreno_bc:'-' }))
                      setCana5(values => ({ ...values, entreno_total:'-', entreno_bc:'-' }))
                      
                      return;
                    case '3':
                    
                      setCana3(
                        values => ({...values, entreno_total: route.params?.entreno_total, entreno_bc: route.params?.entreno_bc})
                        );
                      setCana1(values => ({ ...values, entreno_total:'-', entreno_bc:'-' }))
                      setCana2(values => ({ ...values, entreno_total:'-', entreno_bc:'-' }))
                      setCana4(values => ({ ...values, entreno_total:'-', entreno_bc:'-' }))
                      setCana5(values => ({ ...values, entreno_total:'-', entreno_bc:'-' }))
                      
                        return;
                      case '4':
                          setCana4(
                           values => ({...values, entreno_total: route.params?.entreno_total, entreno_bc: route.params?.entreno_bc})
                          );
                          setCana1(values => ({ ...values, entreno_total:'-', entreno_bc:'-'}))
                          setCana2(values => ({ ...values, entreno_total:'-', entreno_bc:'-' }))
                          setCana3(values => ({ ...values, entreno_total:'-', entreno_bc:'-' }))
                          setCana5(values => ({ ...values, entreno_total:'-', entreno_bc:'-' }))
                          
                            return;
                          case '5':
                            setCana5(
                              values => ({...values, entreno_total: route.params?.entreno_total, entreno_bc: route.params?.entreno_bc})
                            );
                            setCana1(values => ({ ...values, entreno_total:'-', entreno_bc:'-' }))
                            setCana2(values => ({ ...values, entreno_total:'-', entreno_bc:'-' }))
                            setCana3(values => ({ ...values, entreno_total:'-', entreno_bc:'-' }))
                            setCana4(values => ({ ...values, entreno_total:'-', entreno_bc:'-' }))
                          
                          return;

             }

          };
       }   
     )
    async function limpaEditar(){
      await AsyncStorage.removeItem('editar');
    };
    limpaEditar(); 
   }    
   );
   return foco;
},[navigation]);

    function limpaCampos(){
      setCana1(
        values =>({
          ...values,
          entreno_bc:'',
          entreno_total:'',
        })
      );
      setCana2(
        values =>({
          ...values,
          entreno_bc:'',
          entreno_total:'',
        })
      );
      setCana3(
        values =>({
          ...values,
          entreno_bc:'',
          entreno_total:'',
        })
      );
      setCana4(
        values =>({
          ...values,
          entreno_bc:'',
          entreno_total:'',
        })
      );
      setCana5(
        values =>({
          ...values,
          entreno_bc:'',
          entreno_total:'',
        })
      );
      setValues(
      values => ({ 
      ...values,   
       fazenda: '',
       up:'',
       ponto:'',
       talhao:'',     
      }));
      setBotaoSalvar('Salvar')
    }

  const validar = Yup.object().shape({
    fazenda: Yup.string().required(),
    up:Yup.number().required(),
    ponto:Yup.number().required(),
    talhao:Yup.number().required(), 
    });

  async function handleSubmit () {

    //  await validar.validate(values).then(alert('ok')).catch(err=>alert(err))
  
     Keyboard.dismiss();
     const isValid = await  validar.isValid(values)
     if (isValid){
       if (cana1.entreno_bc==='' ||cana1.entreno_total===''){
        Alert.alert('Campo Vazio','Preencha todos os campos Cana 1');
        return
       }
       if (cana2.entreno_bc===''||cana2.entreno_total===''){
        Alert.alert('Campo Vazio','Preencha todos os campos Cana 2');
        return
       }
       if (cana3.entreno_bc===''||cana3.entreno_total===''){
        Alert.alert('Campo Vazio','Preencha todos os campos Cana 3');
        return
       }
       if (cana4.entreno_bc===''||cana4.entreno_total===''){
        Alert.alert('Campo Vazio','Preencha todos os campos Cana 4');
        return
       }
       if (cana5.entreno_bc===''||cana5.entreno_total===''){
        Alert.alert('Campo Vazio','Preencha todos os campos Cana 5');
        return
       }
        // alert('ok')
        // return
    if (idEdit===null){

      await Local.buscaLocal()
        
      
         await AsyncStorage.getItem('gps')
          .then((resp)=>{
    
            if (resp!==null){Alert.alert('GPS DESLIGADO',
              `Por favor, ative o GPS \n Caso já tenha ativado ignore este alerta e tente novamente`)
              console.log(`${latitude} - ${longitude}`)
               return false
    
            }else{
              
              (async () => {
                await  AsyncStorage
                  .getItem('houses')
                    .then(async (houses) => {
                      if(houses !== null){
                        const coordenadas = JSON.parse(houses)
                        console.log("coord "+houses)
                        latitude =  (coordenadas[0].latitude)
                        longitude = (coordenadas[0].longitude)
                      }else{return false}
  
                      const data = new Date()
                      const dia = data.getDate();
                      const mes = data.getMonth()+1;
                      const ano = data.getFullYear();
                      const hora = data.getHours();
                      const min = data.getMinutes();
                      const seg = data.getSeconds();
                      
                      (async() => {
                        
                        const responsavel = await AsyncStorage.getItem('user')
                        console.log('ini for')
                        for (let prop in canas){
                          
                            const realm = await getRealm()
                            let result = canas[prop].cana
 
                            const id = realm.objects(`${schema}`).sorted('id',true).length > 0
                            ? realm.objects(`${schema}`).sorted('id', true)[0].id + 1 : 1;
                            // console.log(' depois do id')
                            
        
                            const dados = {
                              id: id,
                              data:`${ano}-${mes}-${dia} ${hora}:${min}:${seg}`,
                              responsavel: responsavel,
                              fazenda: values.fazenda,
                              up: values.up.toString(),
                              ponto: values.ponto.toString(),
                              talhao: values.talhao.toString(),
                              cana: canas[prop].cana.toString(),
                              entreno_total: canas[prop].entreno_total.toString(),
                              entreno_bc: canas[prop].entreno_bc.toString(),
                              lat:parseFloat(latitude),
                              long:parseFloat(longitude),
                            }
                            
                            criarEditarRealm(dados, schema, idEdit);

                          }//fim loop
                      })();
                      
                      Keyboard.dismiss();
                      
                    }).then(
                        Alert.alert('Índice Infestação','Salvo com sucesso!'),
                        limpaCampos()
                      );
              })();
            }
          });
        } else {
          
          const cana = `cana${route.params?.cana}`

          const dados = {
            id: idEdit,
            fazenda: values.fazenda,
            up: values.up.toString(),
            ponto: values.ponto.toString(),
            talhao: values.talhao.toString(),
            cana: route.params?.cana,
            entreno_total: canas[cana].entreno_total,
            entreno_bc: canas[cana].entreno_bc,
          }
          criarEditarRealm(dados, schema, idEdit)
            .then(
              Alert.alert('Índice Infestação',`Amostra ${idEdit} \n  Fazenda: ${route.params?.fazenda}\n  Talhão: ${route.params?.talhao}\n  Ponto: ${route.params?.ponto}\n  Cana: ${route.params?.cana}\nAlterado com sucesso!`),
              setIdEdit(null),
              limpaCampos()
            )
        } ;
        }else{Alert.alert('Campo Vazio','Preencha todos os campos obrigatórios(*)')}
  
  let latitude = null
  let longitude = null
  
  }

  return(
  <ThemeProvider theme={cores}>

  <Header caption = "Levantamento Infestação"/>
  <Container
    onMomentumScrollEnd={e => {}}
  >
  <Campos>
    <TituloCampos>IDENTIFICAÇÃO</TituloCampos> 
  
    <ContainerInput width= '100%' >
      <Texto>Fazenda</Texto>
      <InputText
          value={values.fazenda}
          onChangeText={text => setValues(values => ({...values, fazenda: text}))}
      />
    </ContainerInput >
  
    <ContainerInput width= '33%' >
      <Texto>Ponto</Texto>
      <InputText
          value={values.ponto}
          onChangeText={text => setValues(values => ({...values, ponto: text}))}
          keyboardType = 'numeric'        
      />
    </ContainerInput >
  
    <ContainerInput width= '33%' >
      <Texto>Talhao</Texto>
      <InputText
            value={values.talhao}
            onChangeText={text => setValues(values => ({...values, talhao: text}))}
            keyboardType = 'numeric'
            />
    </ContainerInput>
  
    <ContainerInput width= '33%'>
      <Texto>UP</Texto>
      <InputText
            keyboardType = 'numeric'
            value={values.up}
            onChangeText={text => setValues((values) => ({...values, up: text}))}
            />
    </ContainerInput> 
  </Campos>

  <Campos> 
      
      <TituloCampos>ENTRENÓS</TituloCampos> 
      <CamposCana width = '46%'>
        <TituloCampos>Cana 1</TituloCampos> 
      
        <ContainerInput width= '50%' >
          <Texto>Totais</Texto>
          <InputText
                value={cana1.entreno_total}
                onChangeText={text => setCana1(values => ({...values, entreno_total:text}))}
                editable={idEdit !==null ? route.params?.cana ==1 ? true : false :true}
                keyboardType = 'numeric'
                />
        </ContainerInput>
      
        <ContainerInput width= '50%'>
          <Texto>Brocados</Texto>
          <InputText
                keyboardType = 'numeric'
                value={cana1.entreno_bc}
                onChangeText={text => setCana1(values => ({...values, entreno_bc:text}))}
                editable={idEdit !==null ? route.params?.cana ==1 ? true : false :true}               
         />
        </ContainerInput> 
      </CamposCana>

       <CamposCana width = '46%'>
        <TituloCampos>Cana 2</TituloCampos> 
      
        <ContainerInput width= '50%' >
          <Texto>Totais</Texto>
          <InputText
                value={cana2.entreno_total}
                onChangeText={text => setCana2(values => ({...values, entreno_total:text}))}
                editable={idEdit !==null ? route.params?.cana ==2 ? true : false :true}                
                keyboardType = 'numeric'
                />
        </ContainerInput>
      
        <ContainerInput width= '50%'>
          <Texto>Brocados</Texto>
          <InputText
                keyboardType = 'numeric'
                value={cana2.entreno_bc}
                onChangeText={text => setCana2(values => ({...values, entreno_bc:text}))}
                editable={idEdit !==null ? route.params?.cana ==2 ? true : false :true} 
                />
        </ContainerInput> 
      </CamposCana>
  
      <CamposCana width = '46%'>
        <TituloCampos>Cana 3</TituloCampos> 
      
        <ContainerInput width= '50%' >
          <Texto>Totais</Texto>
          <InputText
                value={cana3.entreno_total}
                onChangeText={text => setCana3(values => ({...values, entreno_total:text}))}
                editable={idEdit !==null ? route.params?.cana ==3 ? true : false :true} 
                keyboardType = 'numeric'
                />
        </ContainerInput>
      
        <ContainerInput width= '50%'>
          <Texto>Brocados</Texto>
          <InputText
                keyboardType = 'numeric'
                value={cana3.entreno_bc}
                onChangeText={text => setCana3(values => ({...values, entreno_bc:text}))}
                editable={idEdit !==null ? route.params?.cana ==3 ? true : false :true} 
                />
        </ContainerInput> 
      </CamposCana>

      <CamposCana width = '46%'>
        <TituloCampos>Cana 4</TituloCampos> 
      
        <ContainerInput width= '50%' >
          <Texto>Totais</Texto>
          <InputText
                value={cana4.entreno_total}
                onChangeText={text => setCana4(values => ({...values, entreno_total:text}))}
                editable={idEdit !==null ? route.params?.cana ==4 ? true : false :true}
                keyboardType = 'numeric'
                />
        </ContainerInput>
      
        <ContainerInput width= '50%'>
          <Texto>Brocados</Texto>
          <InputText
                keyboardType = 'numeric'
                value={cana4.entreno_bc}
                onChangeText={text => setCana4(values => ({...values, entreno_bc:text}))}
                editable={idEdit !==null ? route.params?.cana ==4 ? true : false :true}
                />
        </ContainerInput> 
      </CamposCana>

      <CamposCana width = '50%'>
        <TituloCampos>Cana 5</TituloCampos> 
      
        <ContainerInput width= '50%' >
          <Texto>Totais</Texto>
          <InputText
                value={cana5.entreno_total}
                onChangeText={text => setCana5(values => ({...values, entreno_total:text}))}
                editable={idEdit !==null ? route.params?.cana ==5 ? true : false :true}
                 keyboardType = 'numeric'
                />
        </ContainerInput>
      
        <ContainerInput width= '50%'>
          <Texto>Brocados</Texto>
          <InputText
                keyboardType = 'numeric'
                value={cana5.entreno_bc}
                onChangeText={text => setCana5(values => ({...values, entreno_bc:text}))}
                editable={idEdit !==null ? route.params?.cana ==5 ? true : false :true}
                />
        </ContainerInput> 
      </CamposCana>
  </Campos>
  </Container>

  <CenterView>
      <Botao
        onPress={() => handleSubmit()}
        title="SALVAR"
      >
        <BotaoText>{botaoSalvar}</BotaoText>
      </Botao>

    </CenterView>

    </ThemeProvider>
)};


export default memo(Infestacao);
  




  
