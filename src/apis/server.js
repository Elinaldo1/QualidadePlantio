
const express = require('express');
const app = express();
const data = require('../../data.json')

/*
Verbos HTTP
resource: endpoint
GET:Receber dados de um resource.
POST: Enviar dados ou instruções p/ serem processados por um resource.
PUT: Atualizar os dados do resource.
DELETE: Apagar dados de um resource.
pode ser no plural ou singunlar, porém padrão
não deixe barra no fim do endpoint
nunca deixe o cliente sem resposta
*/ 
app.use(express.json());

app.get('/client',(req, res)=>res.json(data))

app.get('/clients/:id', (req , res)=>{
  const {id} = req.params
  const client = data.find(cli => cli.id==id)
  
  if (!client) {
    return res.status(204).json();
  }
  res.json(client)
})
app.post('/clients')
app.put('/clients/id')
app.put('/clients')
app.delete('/clients/id')

app.listen(3000,()=> console.log('server rodando na porta 3000') );

/*
Status das respostas
1xx: informação
2xx: sucesso
200: ok
201: created
204: Não tem conteúdo procurado PUT POST DELETE
3xx: Redirection
4xx: Client error
400: Bad Request(faltou dados na req)
404: Not Found (rota não encontrada, quando a rota não existe)
5xx: Server Error
500: Internal Server Error
*/