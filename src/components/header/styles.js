import { StyleSheet } from 'react-native';

export const styles= StyleSheet.create({
  container:{
    //  maxHeight: '20%',
    // height:10,
    padding: 10,
    paddingLeft:5,
    paddingBottom: 0,
    backgroundColor: '#00b33c',
    alignItems:'center',
    justifyContent: 'center',
    borderRadius:1,
    paddingHorizontal:24,
    flexDirection:'row',
    flexWrap: 'wrap',
  },
  headertext:{
    width:'80%',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color:'#fff',
    paddingBottom:10,

  },
  imagem:{
    height: 40,
    width: 40,
    
  },
  containerUser:{
    width:'80%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    // flexDirection: 'row',
    paddingTop:10,
    borderColor: '#fff',
    borderTopWidth:2,
    borderLeftWidth:2,
    paddingBottom:10,
    borderTopLeftRadius:30,
    paddingLeft:10,
    
    
  },
  textUser:{
    color: '#fff',
    fontStyle: 'italic',
    fontSize: 15,
    paddingRight: 20,
    fontWeight: 'bold',
    
  },
  Botao:{
    
    width:'20%',
    flexDirection: 'row',
    borderRadius:50,
    borderWidth:1,
    borderColor: '#fff',
    padding: 5,
    elevation:5
  },
  BotaoMenu:{
    width: '20%',
    flexDirection: 'row',
    borderRadius:50,
    
    
    // borderWidth:1,
    // borderColor: '#fff',
    paddingLeft: 15,
    paddingBottom:10,
   
    
    
  }
});


