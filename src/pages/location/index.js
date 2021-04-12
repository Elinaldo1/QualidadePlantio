
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Alert, StyleSheet } from 'react-native';

  
   export const Local ={
     
    buscaLocal: async () => {

    const local = [] 
    const verGps = await Location.hasServicesEnabledAsync()
    await AsyncStorage.removeItem('gps')
  
    if(!verGps){
      await AsyncStorage.setItem('gps',"false")
      //  Alert.alert('GPS Desligado','Ative a localização para prosseguir');
      return;
    }

    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      
      Alert.alert('','Permissão negada pelo usuário')
      
      return;
    }

    let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.BestForNavigation});
    const { latitude , longitude } = location.coords
    local.push({latitude: latitude, longitude:longitude })

   await AsyncStorage
         .removeItem('houses')
         .then(

           await AsyncStorage
                 .setItem('houses', JSON.stringify(local))
                 .then(
                   
                  // await  AsyncStorage
                  //        .getItem('houses')
                  //        .then(houses => console.log(JSON.parse(houses)[0].latitude))
                 )
         )

  },

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    
  },
  overlay:{
    backgroundColor:"#00000070",
    height:"100%",
    width:"100%",
    justifyContent:"center",
    alignItems:"center"
  },
  heading1:{
    color:"#fff",
    fontWeight:"bold",
    fontSize:30,
    margin:20
  },
  heading2:{
    color:"#fff",
    margin:5,
    fontWeight:"bold",
    fontSize:15
  },
  heading3:{
    color:"#fff",
    margin:5
  },
  button:{
    width:'50%',
    height:60,
    borderRadius:10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'green',
  },
  containerr: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});