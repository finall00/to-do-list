//Parte principal de um projeto node o app.js e onde tudo é controlado 

const express = require('express');
//importa o cors responsavel por monitorar  as connexões da APi
const cors = require('cors');
//importa as rotas da API
const router = require('./router');

const app = express();

//define oque o app usa
app.use(express.json());
app.use(cors());
app.use(router);

//exporta 
module.exports = app;
