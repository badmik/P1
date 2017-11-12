const mongoose = require("mongoose");


let taskSchema = mongoose.Schema({
    title:{
      type: String
    },
    description:{
        type: String
    },
    date:{
        type: String
    }
    });

const Task = module.exports = mongoose.model("Task", taskSchema);