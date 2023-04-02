//esse é o arquivo de configuraçào do server

const app = require('./app');
require('dotenv').config();


//porta onde a aplicação roda
const PORT = process.env.PORT || 3333;

//sobe a aplicação na porta configurada
app.listen(PORT, () => console.log(`Server running or port ${PORT}`));
