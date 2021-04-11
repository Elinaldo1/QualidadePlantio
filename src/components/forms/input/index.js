import React from 'react';
import { ThemeProvider } from 'styled-components';
import { InputT } from './styles';


export default function InputText(props){
  const [cores, setCores] =React.useState({
    borderRes:'#1117', borderWRes: 0,
    border:'#1117', borderW: 0
  });
  return(
    <ThemeProvider theme={cores}>
      <InputT
      multiline = {props.multiline}
      placeholder = {props.placeholder}                                                                                                                                                                  
      keyboardType={props.keyboardType}
      // value = {matricula}
      onChangeText={props.onChangeText}
      maxLength = {props.maxLength}
      onFocus = {()=>setCores(prevState => {return{...prevState, border:'#1117', borderW: 2}})}
      onEndEditing = {() => setCores(prevState => {return{...prevState, border:'#1117', borderW: 0}})}
    />
  </ThemeProvider>
  )
}


