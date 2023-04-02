//clase model.
// onde recebe os dados e os manipula para serem enviados ao banco de dados 

const connection = require('./connection');


//pega todos os dados das tasks no BD
// e chamada pela Controller e retorna os dados para ela
const getAll = async () => {
  const [tasks] = await connection.execute('SELECT * FROM tasks');
  return tasks;
};


//recebe os dados da controller e cria uma nova task no BD
const createTask = async (task) => {
  const { title } = task;
  const dateUTC = new Date(Date.now()).toUTCString();

  const query = 'INSERT INTO tasks(title, status, created_at) VALUES (?, ?, ?)';

  const [createdTask] = await connection.execute(query, [title, 'pendente', dateUTC]);
  return {insertId: createdTask.insertId};
};

//chamada pela controller recebe o id e exclui do BD a task com esse id
const deleteTask = async (id) => {
  const [removedTask] = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
  return removedTask;
};

//chamada pela controller recebe os dados da task e o id e atualiza do BD a task com esse id
const updateTask = async (id, task) => {
  const { title, status } = task;
  
  const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';

  const [updatedTask] = await connection.execute(query, [title, status, id]);
  return updatedTask;
};


//exporta 
module.exports = {
  getAll,
  createTask,
  deleteTask,
  updateTask,
};
