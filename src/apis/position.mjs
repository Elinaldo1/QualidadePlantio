// async ()=>{
//   try{  const response = await fetch("http://api.etrac.com.br/monitoramento/ultima-posicao")}
//   catch(erro){console.log(erro)}
// }
// ===================================================
// ====axios===ultimas posicoes=testado============================
/*var axios = require('axios');

var config = {
  method: 'post',
  url: 'http://api.etrac.com.br/monitoramento/ultimas-posicoes',
  headers: { 
    'Authorization': 'Basic ZWxpbm5hbGRvc2NAZ21haWwuY29tOjU3NDE2MDk4NzAxMjQ='
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});*/
// ====axios===ultimas posicoes====testado=========================

// // a testar======
const username='5741609870124'
const password='elinnaldosc@gmail.com'
const token = Buffer.from(`${username}:${password}`,'utf-8').toString('base64')
var config = {
  method: 'post',
  url: 'http://api.etrac.com.br/monitoramento/ultimas-posicoes',
  headers: { 
    'Authorization': `Basic${token}`
  }
};
axios.post(config)
.then((res)=>console.log('res'))
.catch((erro)=>console.error('erro'))
// // a testar======

// =======================================================
// (async function exemplo(){
//   const options = {
//     method: 'POST',
//     mode: 'cors',
//     header: {
//       "Authorization": "Basic Og==",
//       "Username": "elinnaldosc@gmail.com",
//       "Password": "5741609870124"
//     }
  
//   }
//   try{  
//     const response = await fetch('http://api.etrac.com.br/monitoramento/ultimas-posicoes',options)
//   }
//   catch(erro){console.log('erro')}
// })();
// fetch api======ultimas posicoes====testado===================================================
/*var myHeaders = new Headers();
myHeaders.append("Authorization", "Basic ZWxpbm5hbGRvc2NAZ21haWwuY29tOjU3NDE2MDk4NzAxMjQ=");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("http://api.etrac.com.br/monitoramento/ultimas-posicoes", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));*/
  // fetch api=====testado========================================================