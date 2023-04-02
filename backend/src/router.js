//arquivo que configura os caminhos da api

//importa a biblioteca do express
const express = require('express');

const router = express.Router();

// importa a controller e os middleware
const tasksController = require('./controllers/tasksController');
const tasksMiddleware = require('./middlewares/tasksMiddleware');

//essas são as rotas configuradas 
router.get('/tasks', tasksController.getAll);
router.post('/tasks', tasksMiddleware.validateFieldTitle, tasksController.createTask);
router.delete('/tasks/:id', tasksController.deleteTask);
router.put('/tasks/:id', tasksMiddleware.validateFieldTitle, tasksMiddleware.validateFieldStatus, tasksController.updateTask, );

//exporta as rotas
module.exports = router;