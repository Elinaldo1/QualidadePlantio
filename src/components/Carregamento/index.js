import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';


export default function Carregamento(props) {
 return (
  
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00b33b'}}>
        <ActivityIndicator size="large"  color="#fff" />
        {props.message && <Text style= {Style.message} >{props.message}</Text>}
    </View>
  );
}

const Style = StyleSheet.create({
  message:{
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  }
})