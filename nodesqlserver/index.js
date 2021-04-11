
const database = require('./db');
const logagricola = require('./produto');

async function create(){

  try {
     const resultado = await database.sync();
    // console.log(resultado);
    const resultadoCreate = await logagricola.create({
      tplog:2,
      data: null,
      frota:'168',
      local: 'bsa3',
      idparada: 5,
      status: 3,
      dtretorno: null,
      obs: 'teste1',
      idoperacao: 2,
      trela: null
    });
    console.log(resultadoCreate);
    // console.log(resultado);
    console.log('valeu garoto')
  } catch (error) {
    console.log(error);
    console.log('não deu')
  }
};

async function readAll(){
  try{
    const logs = await logagricola.findAll();
    console.log(logs)
    console.log('show readAll')
  }catch(erro){
    console.log(erro)
  }
}

async function readPk(id){
  try{
   const logs = await logagricola.findByPk(id) ;
   
    console.log(logs),
    console.log('show readPk')

  }catch(erro){
    console.log(erro)
  }
}

async function update(){
  try{
    const log = await logagricola.findByPk(2) ;
    log.obs = "update sequelize1";
    const logsave = await log.save();

    console.log(logsave)
    console.log('show update')

  }catch(erro){
    console.log(erro)
  }
}

async function delet(){
  try{
    const log = await logagricola.findByPk(2) ;
    log.destroy();

    console.log('show delete')

  }catch(erro){
    console.log(erro)
  }
}