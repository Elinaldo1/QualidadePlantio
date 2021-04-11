import axios from "axios";

var posicao =[]
// export const posicaoRes = (params) =>{
  posicao=[]

  var config = {
    method: 'post',
    url: 'http://api.etrac.com.br/monitoramento/ultimas-posicoes',
    headers: { 
      'Authorization': 'Basic ZWxpbm5hbGRvc2NAZ21haWwuY29tOjU3NDE2MDk4NzAxMjQ='
    }
  };

 export const carsiga = async()=>{ 
   try{
     const res = await axios(config)
     return res.data
   }catch (error){
     return error
   }
  //  axios(config)
  // .then(function (response) {
  //     return response.data.retorno
  // })
  // .catch(function (error) {
  //    return (error);
  // });
}

// }


function listar(res) {

res.data.retorno.map((item,index)=>{

  if (inputElement.value!=="") {
    
    if (item.logradouro !== null && item.logradouro.indexOf(inputElement.value)  !== -1){
        posicao.push(`${index+1} ${item.data_transmissao} ${item.placa} - ${item.logradouro}`)
    }
  }else{
    posicao.push(`${index+1} ${item.data_transmissao} ${item.placa} - ${item.logradouro}`)
  }   

  })

}