const express = require('express');
const tasksController = require('./controllers/tasksControllers');

const router = express.Router();

router.get('/tasks', tasksController.getAll);


module.exports = router;