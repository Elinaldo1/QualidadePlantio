import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'stretch',
    backgroundColor:'#fff',
    padding:15
  },

  button: {
    margin: 10,
    height: 40,
    backgroundColor:'#fff',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems:'center',
    justifyContent:'center',
    elevation: 10
  },
  buttonText: {
    color:'#00b33b',
    fontWeight:'bold',
    fontSize: 20,
  }
});

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginTop:10,
    height:60,
    backgroundColor:"#ff1",
    borderRadius:10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'stretch',
    fontWeight: 'bold',
  },
  inputAndroid: {
    marginTop:10,
    height:60,
    backgroundColor:"#ff1",
    borderRadius:10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'stretch',
    fontWeight: 'bold',
  },
  inputAndroidContainer:{
    justifyContent:'center',
    alignItems: 'center',
  },
  placeholder:{
    color:'#1119'
   },
   headlessAndroidContainer:{
     // backgroundColor:"#fff",
     height:40,
     borderRadius:5
   }
});
export const ListBox = StyleSheet.create({
  inputAndroid:{
    backgroundColor:'#fff',
    color: 'black',
    fontWeight: 'bold',
    fontSize:20,
    borderRadius:10,
    borderBottomWidth:3,
    alignItems: 'center',
    height:40,
    width:100,
    
   },
   inputAndroidContainer:{
      justifyContent:'center',
      alignItems: 'center',
    },
    placeholder:{
      color:'#1119'
     },
     headlessAndroidContainer:{
       // backgroundColor:"#fff",
       height:40,
       borderRadius:5
     }
   })