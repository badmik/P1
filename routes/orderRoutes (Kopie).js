const express = require('express');
const router = express.Router();
const tasks = require('../controller/tasksController.js');

router.get("/", tasks.showIndex);
router.get("/add", tasks.createTask());
router.post("/add", tasks.createTask());
router.get("/edit/:id/", tasks.editTask);
router.delete("/edit/:id/", tasks.deleteTask);

module.exports = router;