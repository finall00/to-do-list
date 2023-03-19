const connection = require('./connection');

const getAll = async() => {
 const tasks = await connection.execute('SELECT * FROM tasks');
 return tasks[0];
 //retorna o array com os dados, pega so o primeiro array 
/*
 tmb da pra fazer usando array destruction
 
 const [tasks] = await connection.execute('SELECT * FROM tasks');
 return tasks;
 */

};


module.exports = {
    getAll
};