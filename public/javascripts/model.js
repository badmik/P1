const Datastore = require('nedb');
const db = new Datastore({ filename: './data/task.db', autoload: true });

let TaskManager = {

    getTasks: function(callback) {
        db.find({}, callback);
    },

    getTask: function(id, callback) {
        db.findOne({ _id: id }, callback);
    },

    addTask: function(callback) {
        let task = new Task();
        db.insert(task, callback);
    },

    updateTask: function(id, updatedTask, callback) {
        db.update({ _id: id },
            {
                title: req.params.title,
                description:  req.params.description,
                date:  req.params.date
            }, callback);
    },

    deleteTask: function(id, callback) {
        db.remove({ _id: id }, {multi: false}, callback);
    }
};

module.exports = TaskManager;
