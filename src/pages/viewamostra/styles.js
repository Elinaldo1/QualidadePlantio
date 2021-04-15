import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({

  title: {
    //flex:1,
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: '#ff1'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#d3f6',
    padding: 10,
    borderRadius: 10,
  }
});

export const Container = styled.View `
flex: 1;
background-color: #00b33c;
padding: 5px;
`;

 export const Text = styled.Text`
/* deve ficar na pasta components */
 font-weight: 'bold';
 font-size: 20px;
 color:#fff;
 /* backgroundColor:#f11; */

`;
 export const Botao = styled.TouchableOpacity`
  height:40px;
  background-color: #fff;
  padding:10px;
  border-radius: 10px;
`;
 export const BotaoCadastro = styled.TouchableOpacity`
  flex:1;
  background-color: #fff;
  padding:10px;
  border-radius: 10px;
  /* flex-direction: row; */
  align-items: center;
  justify-content: center;
  margin: 40px
`;

export const ConteinerMensagem = styled(Container) `
      align-items: center;
      justify-content: center;

`

export const TextBotao = styled.Text `
  font-size: 17px;
  text-align: center;
`
export const TextMensagem = styled.Text `
  font-size: 20px;
  text-align: center;
  color: #f119;
  
`


export const Title = styled.Text `
    font-size: 22px;
    margin-left: 15px;
    margin-top: 10px;
    color: #fff;
    justify-content: center;
`

export const Input = styled.TextInput `
  height: 40px;
  margin-left: 15px;
  margin-bottom: 10px;
  margin-right: 15px;
  border-radius: 5px;
  background-color: #fff;
  border-bottom-width:3px;
`

export const CenterView = styled.View `
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
`

export const List = styled.FlatList.attrs({
  contentContainerStyle: { paddingHorizontal: 5 }
})`
  margin-top: 20px;


`;