import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import styled, { ThemeProvider } from 'styled-components';
const { width, height } = Dimensions.get('window');

export default function CaixaTexto(props){
  const [cores, setCores] =React.useState({
    borderRes:'#111', borderWRes: 0,
    border:'#111', borderW: 0,
  });
  return(
    <ThemeProvider theme={cores}>
    <InputMatricula
    placeholder = {props.placeholder}
    keyboardType={props.keyboardType}
    value = {props.value}
    onChangeText={props.onChangeText}
    maxLength = {props.maxLength}
    onFocus = {()=>setCores(prevState => {return{...prevState, border:'#111', borderW: 2}})}
    onEndEditing = {() => setCores(prevState => {return{...prevState, border:'#111', borderW: 0}})}
  />
  </ThemeProvider>
  )
}

export const InputMatricula = styled.TextInput`
  height: ${`${height*0.06}px`};
  width: ${`${width-100}px`};
  font-size: 18px;
  text-align: center;
  margin-left: 15px;
  margin-top: 10px;
  margin-right: 10px;
  padding: 5px;
  border-radius: 50px;
  background-color: #fff;
  /* border-bottom-width: 3px; */
  border-width: ${props => `${props.theme.borderW}px`};
  border-color: ${props => props.theme.border};
  elevation: 5;
  
`;

export const Imagem = styled.Image`
    width:${props => props.width};
    height:${props => props.height};
  
    align-self:flex-end;
    border-top-left-radius:16px;
    border-bottom-left-radius:16px;
    border-radius:16px;
    
`;
export const Background = styled.KeyboardAvoidingView `
    flex:1;
    align-items: center;
    justify-content: center;
    background-color: #00b33b;
    /*  */
`;

export const Titulo = styled.Text`
    font-size: 20px;
    color: #1b1111;
    font-weight: bold;
`;

export const TextButton = styled(Titulo)`
    color: #fff;
`

export const Botao = styled.TouchableOpacity `
  background-color: #fff;
  padding: 5px;
  align-items: center;
  border-radius: 100px;
  margin-bottom: 32px;
  margin-top: 32px;
  width: 50%;
`

export const Styles = StyleSheet.create({

  containerform:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  loginButton:{
    backgroundColor:"#fff",
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginBottom: 32,
    marginTop:32,
    width:65,
    height:63,
    borderRightWidth: 7,
    borderWidth: 0.5,
    borderColor: 'green'
  },
  containerlogo:{
    //  flex:1,
  
     /* alignSelf:"flex-end", */
     /* justifyContent: 'center', */
    /* top:40, */
    padding:10,
    justifyContent: "space-between",
    marginBottom:30,
    width: '100%',
    height:'50%'
    
    /* width:width-10,
    height: height * 0.32, */
     /* backgroundColor:'#fff' */
  },
  containerTitulo:{
    alignItems: 'center',
    position: 'absolute',
    width: width - 80,
    // borderBottomWidth: 5,
    marginBottom:10,
    height: height * 0.06,
    bottom: width * 0.05 - 43,
    marginHorizontal: 40,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset:{
      width:0,
      height:0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation:7,
  },
  container:{
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius:30,
    borderTopRightRadius:30
    
   
  },
  title:{
    fontSize:20,
    fontWeight:"bold",
    color:"#fff",
  },


});


