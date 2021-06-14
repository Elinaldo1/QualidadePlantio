export default class ConfigServidor{
  
  static schema = {
    name: 'ConfigServidor',
    primaryKey: 'id',
    properties:{
      id: { type: 'int', indexed: true },
      server:'string',  //ip address of the mssql database',
      username: 'string', //username to login to the database',
      password: 'string', //password to login to the database',
      database: 'string', //the name of the database to connect to',
      // port: '1234', //OPTIONAL' port of the database on the server',
      // timeout: 5000 //OPTIONAL' login timeout for the server',
      }
    }
  };