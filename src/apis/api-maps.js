//Exemplo de criação de uma api simples
//https://medium.com/gdg-pato-branco/criando-uma-simples-api-em-node-js-7082f745107f
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/maps', (req, res) =>{
  var dados = [
    {
      lat: -25.470991, 
      lon: -49.271036
    },
    {
      lat: -0.935586,
      lon: -49.635540
    },
    {
      lat: -2.485874, 
      lon: -43.128493
    }
  ];

  res.send(JSON.stringify(dados));
});

// app.listen(8000, function() {
  //função normal
//   console.log('Servidor rodando na porta 8000.');
// });
app.listen(8000,() =>
  //arrow function
  console.log('Servidor rodando na porta 8000.')
);