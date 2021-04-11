import MSSQL from 'react-native-mssql';


const config = {
  server: '192.168.1.30', //ip address of the mssql database',
  username: 'WEB', //username to login to the database',
  password: 'SO@euposso', //password to login to the database',
  database: 'canalog', //the name of the database to connect to',
  // port: 1234' //OPTIONAL' port of the database on the server',
  // timeout: 5' //OPTIONAL' login timeout for the server',
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

  update:  async function (table,field,value){
    await open().then(async()=>{
    try{ 
          console.log('insert')
          const query = `insert into ${table} (${field}) values(${value})`
          console.log(query)
          await MSSQL.executeUpdate(query);
          
    }catch{err => console.log(`erro = ${err}`)}
    // const closed = await MSSQL.close();
  }) 
}

};

export default Helpers;



export const querie = [
  'data',      
  'matricula',
  'responsavel',
  'fazenda',
  'up',
  'plantadora',
  'turno',
  'amostra',
  'esteira',
  'kg_amostra',
  'sulco',
  'cobricao',
  'espaco_linha',
  'toletes',
  'gemas_total',
  'gemas_viaveis',
  'gemas_inviaveis',
  'obs',
  //  'peso_m_tol',
  //  'tolete_metro',
  //  'gv_mt',
  //  'muda_ha',
  'lat',
  'long']
    //  VALUES
    //        (<DATA' datetime'>',
    //        '<FAZENDA' varchar(50)'>',
    //        '<UP' varchar(4)'>',
    //        '<RESPONSAVEL' varchar(20)'>',
    //        '<MATRICULA' varchar(4)'>',
    //        '<TURNO' varchar(1)'>',
    //        '<AMOSTRA' int'>',
    //        '<PLANTADORA' varchar(4)'>',
    //        '<ESTEIRA' varchar(1)'>',
    //        '<SULCO' numeric(18'2)'>',
    //        '<COBRICAO' numeric(18'2)'>',
    //        '<ESPACO_LINHA' numeric(18'2)'>',
    //        '<GEMAS_TOTAL' int'>',
    //        '<GEMAS_VIAVEIS' int'>',
    //        '<GEMAS_INVIAVEIS' int'>',
    //        '<TOLETES' int'>',
    //        '<KG_AMOSTRA' numeric(18'2)'>',
    //        '<OBS' varchar(255)'>',
    //        '<Peso_M_Tol' numeric(18'2)'>',
    //        '<TOLETE_METRO' numeric(18'2)'>',
    //        '<GV_MT' numeric(18'2)'>',
    //        '<MUDA_HA' numeric(18'2)'>',
    //        '<ID' int'>',
    //        '<lat' float'>',
    //        '<Long' float'>)`'