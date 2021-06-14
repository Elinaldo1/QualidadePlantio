import AsyncStorage from '@react-native-async-storage/async-storage';
import MSSQL from 'react-native-mssql';

export async function open () {
  
  const server = JSON.parse(await AsyncStorage.getItem('server'));
  const config = {
    server:   server.server,   // '192.168.1.30', //ip address of the mssql database',
    username: server.username, // 'WEB', //username to login to the database',
    password: server.password, // 'SO@euposso', //password to login to the database',
    database: server.database, // 'canalog', //the name of the database to connect to',
    // port: '1234', //OPTIONAL' port of the database on the server',
    // timeout: 5000 //OPTIONAL' login timeout for the server',
  }

    let cnx = ''
    try{
      cnx = await MSSQL.connect(config); 
      return true // 'Conectar ao Servidor: '+cnx
    }catch(err) {
      return false//'Conectar ao Servidor: Failled!'
    }
      
};  

export const closed = async() => {
  let cnx = ''
  try{
      cnx = await MSSQL.close();
      return 'Server: '+cnx
  }catch(erro){return 'Server: Falha ao fechar Conexão'}
};

async function exec(query,lin){
    try{
      await MSSQL.executeUpdate(query)
      return true //`Amostra ${parseInt(lin) + 1} Enviado com sucesso`
    }catch(err) {
      return err //`Amostra ${parseInt(lin)+1} não enviado \n ERRO!(${err})`
    } 
}
 
const Helpers ={
  
    readAll: async function (table, filtro){
    await open().then(async()=>{
    try{     
      const query = `SELECT codfrota FROM ${table} g where g.categoria in ('${filtro}')`
      const result = await MSSQL.executeQuery(query);
      alert(JSON.stringify(result))
      console.log(result)
      console.log('show readAll')
    }catch(erro){
      console.log(erro)
      console.log(erro)
    }})
    
  },

  update:  async function (lin,table,field,value){

      const log = [];
      log.splice(0);

      const envio = await open().then(async(res)=>{

      // console.log(res)
      if (res) {

          // console.log('Server: Connection Successful!');
          log.push(`"serverOk${lin}":"Connection Successful!"`);
          // log.push(`"enviando":"Enviando amostra..."`);
          
          const query = `insert into ${table} (${field}) values(${value})`;

          const executar = await exec(query,lin).then(ress => {
                if (ress==true){
                  // console.log (/*`Amostra ${parseInt(lin) + 1}:*/ `Enviado com sucesso`);
                  log.push(`"envioOk${lin}":"Enviado com sucesso"`);
                  // return true
                  
                  return log;
                }else{
                  // console.log (/*`Amostra ${parseInt(lin)+1}:*/ `Falha no envio!: ${res}`);
                  log.push(`"falhaEnvio${lin}":"Falha no envio!: ${res}"`);
                  // return false
                  
                  return log;
                }
          });
          return executar
      } else{
          // console.log('Server: Conexao falhou!');
          log.push(`"serverFalha":"Conexao falhou!"`);
          // return res
          return log;
      } 
      
      // console.log(query)
      // console.log(JSON.stringify(table))
      // console.log(JSON.stringify(field))
      // console.log(JSON.stringify(value))
      

  })
  return envio 
},

};

export default Helpers;
