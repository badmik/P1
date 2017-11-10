const express = require('express');
const router = express.Router();
const tasks = require('../controller/tasksController.js');

router.get("/", tasks.showIndex);
router.get("/edit", tasks.showEdit);
router.post("/edit", tasks.createTask);
router.get("/edit/:id/", tasks.showTask);
router.delete("/edit/:id/", tasks.deleteTask);

module.exports = router;
