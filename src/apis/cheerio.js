
//  const axios = require('axios');
// const cheerio = require('cheerio');
//  const teste=[]

//  axios.get("http://nfe.sefaz.go.gov.br/nfeweb/sites/nfe/consulta-completa-interna?chaveAcesso=52201275315333023150655140000475981048579170")
//   .then((response)=>{
//     // console.log(response.data);
//     const html = response.data;
//     const $ = cheerio.load(html);
   
//    //   $('h1').each((id,item)=>{
//    //      if (id===0){
//          //   teste.push($(item).text());
//          console.log('ok')
//             //  $('validade').each((index,item)=>console.loge($(item).text()))
//       //  }  
//       //  })
//   })
//   .catch((error)=>{
//      console.warn(error);
//      console.log('sem dados')
//   });
//index.js
const rp = require('request-promise')
const cheerio = require('cheerio')
 
const options = {
  uri: 'http://nfe.sefaz.go.gov.br/nfeweb/sites/nfe/consulta-completa-interna?chaveAcesso=52201275315333023150655140000475981048579170',
  transform: function (body) {
    return cheerio.load(body)
  }
}
 
// function processarDados(dados){
//   //salva no banco de dados
//   console.log(JSON.stringify(dados))
// }
 
rp(options)
.then(($) => {
  
   console.log($("#botoes_nft").length)

})
.catch((err) => {
//   console.log(err);
  console.log('erro');
})