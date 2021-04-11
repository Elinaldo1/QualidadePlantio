import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import logo from '../../../assets/cadastrar.png';
import Header from '../../../components/header/index';
import { styles } from './styles';

function Form () {
  
   const placeholder = { label:'Selecione', value:null, color: 'black' };
   const [selecao, setSelecao] = useState("Selecione o estado");
   const [ufs,     setEstados] = useState([]);

  //=================================Ler campos do formulário
   const [nome,   setNome]   = useState('');
   const [idade,  setIdade]  = useState(0);
   const [estado, setEstado] = useState('');
   
  //a function handle(retorna string por parametro) será disparada ao alterar os campos(onChangeText)
  //retorna string, padrão dos inputText(por isso iade será convertido para int)   
   function handleNameChange  (nome)   {setNome(nome)};
   function handleIdadeChange (idade)  {setIdade(parseInt (idade))};
  //  function handleEstadoChange(estado) {setEstado(estado)};
  
   function handleButtonPress() {
    //  alert(nome+'\n'+idade+'\n'+estado);
    //  console.log(nome,idade,estado)
    axios.post('http://192.168.0.103:3031/cadastro', {nome, idade, estado})
    .then(
      response=>alert(response.data.dados.length + ' cadastros')
    )
   }
  // ================================Ler campos do formulário

  // ================================Chamer api estados e modificar estado[]
  // useEffect(()=>{
  // setEstados([estado,'PA','MA','BA','SP','RJ','AM','MG','GO','TO','SE','ES','SC','RS','MT','AL','RN','RO']);
  //  },[]);

   useEffect(()=>{
       axios.get('http://192.168.0.103:3000/clients'/*'http://192.168.0.103:3030/estados'*/)
        .then(Response =>
            setEstados(Response.data.map(estado=> estado.endereço.cidade))
        );  
                  },[]);
 // ================================Chamer api estados e modificar estado[]      
  const navigation = useNavigation();
  
  return(
    <>
      <Header caption="PLANTIO BSA 2021">
        
        
      <TouchableOpacity onPress = {() => navigation.goBack()}>
        <AntDesign name = "arrowleft" size = {25} />
      </TouchableOpacity>
      </Header> 

      <View style={styles.container}>
        <Image source = {logo} style={styles.topImage} />
        <Text style={styles.title}>QUALIDADE PLANTIO BSA 2021</Text>
      </View>
      
       <KeyboardAvoidingView /*style={styles.inputContainer} */>   
             {/* quando o form é grande use ScrollView para rolar, normal(View) */}
            <TextInput style={styles.input} placeholder="Fazenda" onChangeText = {handleNameChange} />
            <TextInput style={styles.input} placeholder="Responsável" keyboardType={"numeric"} onChangeText = {handleIdadeChange} />
            
             {/* <RNPickerSelect /*style={pickerSelectStyles} selectedValue={selecao} 
                   onValueChange={(itemValue, index)=>{setSelecao(itemValue);setEstado(itemValue)}}  >
                {ufs.map((item,index)=>{
                  return <Picker.Item label ={item} value={item} key={index}/>
                })}

              useNativeAndroidPickerStyle={false}
              style={pickerSelectStyles}
              placeholder={placeholder}
              onValueChange={(value) => props.setFieldValue('amostra',value)}
              items={ufs}>
            </RNPickerSelect> */}
     
       </KeyboardAvoidingView>

       <TouchableOpacity style={styles.button} onPress = {handleButtonPress}>
          <Text style={styles.buttonText}>Salvar</Text>
       </TouchableOpacity>
        
    </>            
  )};

  

export default Form; 