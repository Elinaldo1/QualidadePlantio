import { StyleSheet } from 'react-native';
import styled from 'styled-components';

export const BotaoSair = styled.TouchableOpacity`
  margin: 10px;
  height: 40px;
  align-self: center;
  width: 50%;
  background-color: #f22;
  border-radius: 10px;
  padding-top:24px;
  padding-bottom: 24px;
  font-size: 16px;
  align-items: center;
  justify-content: center;
  elevation: 10;
`

export const TextBotao = styled.Text`
      color: #fff;
    /* font-weight: 400; */
    font-size: 20px
`

export const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'stretch',
    backgroundColor:'#fff',
    borderTopLeftRadius: 50,
    padding:15
  },

  button: {
    flex:1,
    margin: 10,
    height: 40,
    backgroundColor:'#fff',
    borderRadius: 50,
    paddingHorizontal: 24,
    fontSize: 12,
    alignItems:'center',
    justifyContent:'center',
    elevation: 10
  },
  buttonText: {
    color:'#00b33b',
    fontWeight:'normal',
    fontSize: 20,
    textAlign: 'center'
  }
});