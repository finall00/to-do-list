//clase de conexão.
// usada para conectar o projeto ao baco de dados  nesse caso o mysql


const mysql = require('mysql2/promise');
require('dotenv').config();

// pega os dados do arquivo .env e passa para a conexão
const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});

//exporta
module.exports = connection;
