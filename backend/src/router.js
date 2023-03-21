const express = require('express');
const tasksController = require('./controllers/tasksControllers');
const tasksMiddle = require('./middle/tasksMiddle');

const router = express.Router();

router.get('/tasks', tasksController.getAll);
router.post('/tasks', tasksMiddle.validateTitle, tasksController.createTask);
router.delete('/tasks/:id', tasksController.deleteTask);
router.put('/tasks/:id',tasksMiddle.validateTitle, tasksMiddle.validateStatus, tasksController.updateTask);

module.exports = router;