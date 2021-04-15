import MSSQL from 'react-native-mssql';


const config = {
  server: '192.168.1.30', //ip address of the mssql database',
  username: 'WEB', //username to login to the database',
  password: 'SO@euposso', //password to login to the database',
  database: 'canalog', //the name of the database to connect to',
  // port: '1234', //OPTIONAL' port of the database on the server',
  // timeout: 5000 //OPTIONAL' login timeout for the server',
}
export const open = async () => {
  try{
    await MSSQL.connect(config);
  }catch{erro => alert(`Não foi posível conenctar ao banco \n ${erro}`)}
};  

export const closed = async() => {
  try{
      await MSSQL.close();
  }catch(erro){}
};
async function exec(query,lin){try{
  await MSSQL.executeUpdate(query)
  console.log('executei a query')
}catch(err) {console.log(lin+'-'+err)} }

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
      alert(erro)
    }})
    
  },

  update:  async function (lin,table,field,value){
    await open().then(async()=>{
    try{ 
          console.log('insert')
          const query = `insert into ${table} (${field}) values(${value})`
          console.log(query)
          // console.log(JSON.stringify(table))
          // console.log(JSON.stringify(field))
          // console.log(JSON.stringify(value))
         
          await exec(query,lin)

          // console.log('executei a query')
   
    }catch{err => console.log(`erro = ${err}`)}
    // const closed = await MSSQL.close();
  }) 
},
  gravar:  async function (){
    await open().then(async()=>{
    try{ 
          console.log('insert')
          const query = `insert into baseqplantio (matricula
            ,responsavel,fazenda,up,plantadora,turno,amostra,esteira,kg_amostra,sulco,cobricao,
            espaco_linha,toletes,gemas_total,gemas_viaveis,gemas_inviaveis,obs,lat,long)
            values((select convert(datetime,'12-4-2021 22:46:69',20)),3333,'Elinado','São Domingos',
            15,291,'B',2,'A',4.5,'34','8','1.55','20','30','18','12','values.obs obeservação','18.444444','49.555555')`
          console.log(query)
          (async()=>{try{
            await MSSQL.executeUpdate(query)
          }catch{err => console.log('sqlqueryerro '+ err)} })()
          console.log('executei a query')
          
    }catch{err => alert(`erro = ${err}`);return}
    // const closed = await MSSQL.close();
  }) 
}

};

export default Helpers;
Helpers.gravar();