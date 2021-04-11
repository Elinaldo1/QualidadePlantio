var http         = require('http');
const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');

//  app.use(require("cors")());
app.use((req, res, next)=> {
  // https://cursos.alura.com.br/forum/topico-acesso-a-api-bloqueada-pelo-cors-87438
  //este código evita bloqueio da api pelo cors
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res, next) =>{
  res.json({message: 'Tudo ok aqui', dados: cadastros});
});

const cadastros = [];
app.post('/cadastro', (req, res, next) =>{
   console.log('cadastro recebido');
  //  salva no banco
  cadastros.push({
    nome:  req.body.nome,
    idade: parseInt(req.body.idade),
    uf:    req.body.estado
  });
  res.json({message: 'Tudo ok aqui', dados: cadastros});
});
var server = http.createServer(app);
server.listen(3031);
console.log('serv esutando na porta 3031');
// app.listen(3031,()=>console.log('serv esutando na porta 3031'));