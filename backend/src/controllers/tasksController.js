//o request, response são geralmente substituidos por req, res

//inporta a model de tasks
const tasksModel = require('../models/tasksModel');


//função que recupera todos as tasks e retorna os dados para que a chamou
//é uma função assincrona, ou seja ela so enviada quando tudo for comcluido
const getAll = async (_request, response) => {
  const tasks = await tasksModel.getAll();
  return response.status(200).json(tasks);
};


//essa é função que gera uma nova task 
// ela recebe os dados para serem enviados para a model e então retorna o resultado
const createTask = async (request, response) => {
  const createdTask = await tasksModel.createTask(request.body);
  return response.status(201).json(createdTask);
};



//deleta a task
//recebe o id da task e envia para a model para poder remover a task do banco de dados 
const deleteTask = async (request, response) => {
  const { id } = request.params;

  await tasksModel.deleteTask(id);
  return response.status(204).json();
};


//atualiza a task
//recebe o id da task e envia para a model para poder atualizar a task no banco de dados 
const updateTask = async (request, response) => {
  const { id } = request.params;

  await tasksModel.updateTask(id, request.body);
  return response.status(204).json();
};


//exporta as funções
module.exports = {
  getAll,
  createTask,
  deleteTask,
  updateTask,
};
