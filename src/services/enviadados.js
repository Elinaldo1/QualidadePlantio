
import Helpers from '../databases';

async function insert(dados,fields){  
      
      const values=[];    

      try {      
          for (const index in dados) { 
                           
                  console.log('ini envia dados') 
                  // console.log((index + 1)*100/dados.length+'% concluído')
                  // console.log('Linha '+(index + 1)+' de '+ dados.length)
                 
                  
                  values.splice(0)

                   for (const prop in dados[index]){
                        if(prop!=='id'){
                              
                              const result = dados[index]
                              values.push("'"+result[prop]+"'")
                        }
                  }
                              const result = dados[index]
                              const valores = [
                              "'"+result['data']+"'",
                              result['matricula'],
                              "'"+result['responsavel']+"'",
                              "'"+result['fazenda']+"'",
                              result['up'],
                              result['plantadora'],
                              "'"+result['turno']+"'",
                              "'"+result['amostra']+"'",
                              "'"+result['esteira']+"'",
                              "'"+result['kg_amostra']+"'",
                              "'"+result['sulco']+"'",
                              "'"+result['cobricao']+"'",
                              "'"+result['espaco_linha']+"'",
                              "'"+result['toletes']+"'",
                              "'"+result['gemas_total']+"'",
                              "'"+result['gemas_viaveis']+"'",
                              "'"+result['gemas_inviaveis']+"'",
                              "'"+result['obs']+"'",
                              "'"+result['lat']+"'",
                              "'"+result['long']+"'"]
                              
                              //  'peso_m_tol',
                              //  'tolete_metro',
                              //  'gv_mt',
                              //  'muda_ha',

                  await Helpers.update('baseqplantio', fields ,valores)
            }
} catch (error) { console.log('erro insert = '+error);}
      
}

export default insert;      