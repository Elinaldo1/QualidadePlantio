const connStr = "Server=192.168.1.30; Database=canalog; User Id=WEB; Password=SO@euposso";
const sql = require("mssql");

const cnx = {
  
  conn: ()=>{
  console.log('mssql')
  sql.connect({
  server: '192.168.1.30',
  password: 'SO@euposso',
  user: 'WEB',
  database: 'canalog',
  options:{
  // "encripty" : true,
  "enableArithAbort" : true
}})
  .then(conn => console.log('conectou'))
  .catch(err => console.log('falhou'))
},
}
// cnx.conn();
export default cnx;