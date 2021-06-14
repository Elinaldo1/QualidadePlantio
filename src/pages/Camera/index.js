import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import styled from 'styled-components/native';
import Header from '../../components/header';



export default function Camera() {

  const [type, setType] = useState(RNCamera.Constants.Type.back);
  const [open, setOpen] = useState(false);

  function takePicture() {
    setOpen(true)
  };

 return (
   <Container>
     <Header caption = 'Câmera' />
     <RNCamera 
      style= {Style.preview}
      type = {type}
      flashMode = {RNCamera.Constants.FlashMode.auto}
      androidCameraPermissionOptions = {{
        title: 'Permissão para usar a câmera',
        message: 'Autorizar uso',
        buttonNegative: 'Permissão negada',
        buttonPositive: 'Permissão concedida'
      }}
    >
      {({ camera, status, recordAndroidPermissionsStatus }) => {
        if( status !== 'READY') return <View/>;
        return(
          <View
           style = {{ marginBottom: 35, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}
          >
            <TouchableOpacity
              onPress = {() => takePicture()}
              style = {Style.capture}
            >
              <Text>Tirar Foto</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress = {() => {}}
              style = {Style.capture}
            >
              <Text>Album</Text>
            </TouchableOpacity>
          </View>
        )
      }}
     </RNCamera>

     <Modal 
      animationType = 'slide'
      transparent = {false}
      visible = {open}
      
     >
        <View
          style = {{ felx: 1, justifyContent: 'center', alignItems: 'center', margin: 20 }}
        >
          <TouchableOpacity
            style = {{ margin: 15, borderWidth: 1 }}
            onPress = {() => setOpen(false)}
          >
            <Text style = {{fontSize: 25}}>Fechar</Text>
          </TouchableOpacity>

          <TouchableOpacity
              onPress = {() => {}}
              style = {Style.capture}
            >
              <Text>Album</Text>
            </TouchableOpacity>
        </View>
     </Modal>

   </Container>
  );
}

export const Style = StyleSheet.create({
  preview:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
     backgroundColor: '#fff',
     borderRadius: 5, 
     padding: 15,
     paddingHorizontal: 20,
     alignSelf: 'center',
     margin: 20
  }
});

export const Container = styled.View`
    flex: 1;
    justify-content: center;
`;