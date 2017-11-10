const store = require("../services/taskStore.js");
const model = require("./../../models/model.js");


module.exports.showIndex = function(req, res)
{
    res.render("index");
};

module.exports.showEdit = function(req, res)
{
    res.render("edit");
};

module.exports.createTask = function(req, res)
{
    let newTask  = new model.Task(
    {   name: req.body.name,
        description: req.body.description,
        date: req.body.date
    });

       newTask = store.add(newTask, function(err, task) {
        res.render("index", task);
    });
};

module.exports.showTask = function(req, res)
{
    store.get(req.params.id, function(err, task) {
         res.render("edit", task);
    });
};

module.exports.deleteTask =  function (req, res)
{
    store.delete(  req.params.id , function(err, task) {
        res.render("index", task);
    });
};
