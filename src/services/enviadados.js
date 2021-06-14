import { excluirRealm } from '.';
import Helpers from "../databases";

async function insert(dados, table, schema){  
      
      const log = []; 
      const logFim = []; 
      const field = [];
      const values = [];
      const enviados =[];
      const falha = [];  
      
      log.splice(0);
      logFim.splice(0);

      if (dados.length==0) {
            
            log.push( `{"id": "${table.toUpperCase()}", "msg": "Nao há dados para enviar"}`)
            logFim.push(log[0])
            // for (let index = 0; index < log.length; index++) {
    
            //       console.log(log[index]);
            // }
            return logFim
            
      }
      try {      
          const inicio = `iniciando envio de dados (${dados.length} Amostras)`;
          log.push(`"id":"${table.toUpperCase()}", "inicioEnvio":"${inicio.toUpperCase()}"`)
          enviados.splice(0);
          falha.splice(0);
          for (const index in dados) { 
               
                  values.splice(0);
                  field.splice(0);

                   for (const prop in dados[index]){
                        if(prop!=='id' ){
                              
                              const result = dados[index]
                              field.push(prop)
                              values.push("'"+result[prop]+"'")
             
                        }
                  };
                  log.push(`"dados":"${field.length} Colunas e ${values.length} Registros"`)
                  // log.push(`"enviando":"Enviando amostra..."`)
                  log.push(`"enviando${parseInt(index) + 1}":"Enviando amostra ${parseInt(index) + 1} de ${dados.length} ..."`)
                  await Helpers.update(index, table , field ,values)
                     .then(
                           async(res) =>  {
                                 
                              if (res.length > 1){
                                    log.push(res[0], res[1]);
                              }else{
                                    log.push(res[0]);
                              }   
                              //   res.map((item) => log.push(item));//retire para diminuir linhas do log
                                
                                 const result = dados[index]
                                 if (res.length > 1){
                                       enviados.push(parseInt(result['id']))
                                 }else{
                                       falha.push(parseInt(result['id']))
                                 }
                           }                 
                       );
                     
                  }; 
} catch (error) { log.push(`"erroInsert":"ERRO DE INSERT = ${error}"`);};
      let fimEnvio = `"fimEnvioOk":"ENVIO FINALIZADO COM SUCESSO!"`
      if (falha.length>0){fimEnvio=`"fimEnvioFalha":"FALHA NO ENVIO!"`}
      if (falha.length>0 && enviados.length>0){fimEnvio=`"fimEnvioFalha":"ENVIO FINALIZADO COM FALHAS!"`}
      log.push(fimEnvio);
      if (enviados.length>0){
            log.push(`"enviados":"${enviados.length} amostras enviadas ${JSON.stringify(enviados.reverse())}"`);
      };
      if (falha.length>0){
            log.push(`"naoEnviados":"${falha.length} amostras não enviadas ${JSON.stringify(falha.reverse())}"`);
      };
            
      if (enviados.length>0){
            (async()=>{
                  const excluidos = [];
                  excluidos.splice(0);
                  log.push(`"limpeza":"INICIANDO LIMPEZA DE DADOS ENVIADOS"`)

                  const deleteEnviados = enviados.map(
                  (it,id)=>{
                        excluirRealm(it, schema, 'id')
                        excluidos.push(it)
                        //    log.push('Esquema '+schema+': Amostra('+it+') excuído!')
                  }
                  ) 
                  log.push(`"excluidos":"Amostras excluídas: ${JSON.stringify(excluidos)}"`);
                  await Promise.all(deleteEnviados)
                    .then(
                        log.push(`"fimLimpeza":"Limpeza concluída", "fim":"FIM"`)
                        );
                  })(); 
            }; 
            logFim.push(`{${log}}`)
      console.log('lfim = '+logFim)
      console.log('log = '+log)
      return logFim
};

export default insert;      


