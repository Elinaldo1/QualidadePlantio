//api-estados.js
// var http = require('http'); substituído por app.listen
/*https://medium.com/gdg-pato-branco/criando-uma-simples-api-em-node-js-7082f745107f local do exemplo de api
o código comentado com 1 é deste endereço
*/
const express = require('express');//importar pacote express
//1 const bodyParser = require('body-parser');//parsear requisições via JSON(JSON.parse)
const app = express();


//1 app.use(bodyParser.json());//configurar forma de tratamento de req no express

app.use(require("cors")());//substituído pelo treco abaixo
// app.use(function(req, res, next) {
//   // https://cursos.alura.com.br/forum/topico-acesso-a-api-bloqueada-pelo-cors-87438
//   //este código evita bloqueio da api pelo cors
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

//  app.get('/', (req, res, next) => {
//    console.log('conectado')
//    res.jason({message:"Tudo ok por aqui"});
//  })//verificar se deu certo a cnx

//1 app.get('/estados', function(req, res)//roteando URL/estados via get
app.get('/estados', (req, res, next)=>//roteando URL/estados via get
 {  console.log('Retornou todos estados');
    const ufs = [ {id:0, uf:'selecione o estado'},
                  {id:1, uf:'RS'},
                  {id:2, uf:'RJ'},
                  {id:3, uf:'MA'},
                  {id:4, uf:'SP'},
                  {id:5, uf:'AM'},
                  {id:6, uf:'PA'},
                  {id:7, uf:'GO'},
                  {id:8, uf:'TO'},
                  {id:9, uf:'SE'},
                  {id:10, uf:'SP'},
                  {id:11, uf:'MG'},
                  {id:12, uf:'ES'},
                  {id:13, uf:'AL'},
                  {id:14, uf:'AC'},
                  {id:15, uf:'RN'},
                  {id:16, uf:'MT'},
                  {id:17, uf:'MS'}
                ]
  //nas linhas abaixo Quando o user navegar até a rota/estados nosso servidor vai retornar
  //um array de objts com os estados           
                res.json(ufs);
                //1 res.send(JSON.stringify(ufs));      
})

//config da porta onde o serv web ficará escutando as chamadas http
app.listen(3030, function(){
  console.log("Servidor escutando na porta 3030...")
});//1 o código abaixo funfa tbm, aqui está embutido as 3 linha abaixo

// var server = http.createServer(app);
// server.listen(3030);
// console.log("Servidor escutando na porta 3030...")
