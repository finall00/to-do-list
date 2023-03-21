const { execute, query } = require("./connection");
const connection = require("./connection");

const getAll = async () => {
  const tasks = await connection.execute("SELECT * FROM tasks");
  return tasks[0];
  //retorna o array com os dados, pega so o primeiro array
  /*
 tmb da pra fazer usando array destruction
 
 const [tasks] = await connection.execute('SELECT * FROM tasks');
 return tasks;
 */
};

const createTask = async (task) => {
  const { title } = task;

  const dateUTC = new Date(Date.now()).toUTCString();

  const query = "INSERT INTO tasks(title, status, create_at) VALUES (?, ?, ?)";

  const [createTask] = await connection.execute(query, [title, "pendente", dateUTC,]);

  return { insertId: createTask.insertId };
};

const deleteTask = async (id) => {
  const query = "DELETE FROM tasks WHERE id = ?";

  const removedTask = await connection.execute(query, [id]);
  return removedTask;
};

const updateTask = async (id, task) => {
  const { title, status } = task;

  const query = "UPDATE tasks SET title = ?, status = ? WHERE id = ?";

  const updatedTask = await connection.execute(query, [title, status, id]);
  return updatedTask;
};

module.exports = {
  getAll,
  createTask,
  deleteTask,
  updateTask,
};
