import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    backgroundColor:'#00b33c'
  },
  inputContainer: {
    margin: 20,
    alignItems: 'stretch',
   //  backgroundColor:''
  },
  topImage:{
    margin: 20, 
    
  },
  title:{
    fontSize:20,
    color:"#fff"
  },
  input:{
    marginTop: 10,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'stretch',
  },
  button: {
    marginTop: 10,
    height: 60,
    backgroundColor:'green',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems:'center',
    justifyContent:'center',
  },
  buttonText: {
    color:'#fff',
    fontWeight:'bold',
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