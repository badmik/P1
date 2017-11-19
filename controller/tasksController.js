const store = require("../services/taskStore.js");

module.exports.showIndex = function(req, res)
{
    res.render("index");
};

module.exports.createTask = function(req, res)
{
    res.render("add");
};

module.exports.createTask = function(req, res)
{
    let task = store.add(req.body.title, req.body.description, req.body.date, function(err, task) {
        res.render("index", task);
    });
};

module.exports.editTask = function(req, res)
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
