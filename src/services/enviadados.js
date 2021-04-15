import Helpers from "../databases";


async function insert(dados,fields){  
      
      const field = [];
      const values = [];    
  
      try {      
          for (const index in dados) { 
                           
                  console.log('ini envia dados') 
                  // console.log((index + 1)*100/dados.length+'% concluído')
                  // console.log('Linha '+(index + 1)+' de '+ dados.length)                  
                  values.splice(0);
                  field.splice(0);

                   for (const prop in dados[index]){
                        if(prop!=='id' ){
                              
                              const result = dados[index]
                              field.push(prop)
                              if (prop == 'data'){

                                    values.push("'"+result[prop]+"'")
                              }else{
                                    values.push("'"+result[prop]+"'")

                              }
                        }
                  }

                  console.log('cheguei no insert')
                  console.log('v '+values.length)
                  console.log('c '+field.length)
                  await Helpers.update(index,'baseqplantio', field ,values).then(
                        
                        console.log('passei no insert')).catch(alert('erro'))
                  // await Helpers.gravar().then( console.log('passei no insert'))
            } 
            console.log('colunas '+field)
            console.log('valores '+values)
} catch (error) { console.log('erro insert = '+error);}
    
}

export default insert;      