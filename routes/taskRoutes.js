const express = require('express');
const router = express.Router();

const taskController = require('../public/javascripts/model.js');

router.get('/tasks/:id/', (req, res) => {
    let id = req.params.id;
    taskController.getTask(id, (err, task) => {
        if (task) {
            res.json(task);
        }
        else {
            res.sendStatus(404);
        }
    });
});

router.get('/tasks', (req, res) => {
    taskController.getTasks((err, tasks) => {
        res.json(tasks);
    });
});

router.post('/tasks/edit', (req, res) => {
    taskController.addTask((err, newTask) => {
        res.json(newTask);
    });
});

router.put('/tasks/:id/', (req, res) => {
    let id = req.params.id;
    taskController.updateTask(id, req.body, (err, updatedTask) => {
        res.json(updatedTask);
    });
});

router.delete('/tasks/:id/', (req, res) => {
    let id = req.params.id;
    taskController.deleteTask(id, (err, task) => {
        res.json(task);
    });
});

module.exports = router;