const Datastore = require('nedb');
const db = new Datastore({ filename: './data/order.db', autoload: true });

function Task(taskName, taskDescription, taskDate)
{
    this.name = taskName;
    this.description = taskDescription;
    this.date = taskDate;
}


function publicAddTask(taskName, taskDescription, taskDate, callback)
{
    let task = new Task(taskName, taskDescription, taskDate);

    db.insert(task, function(err, newDoc){
        if(callback){
            callback(err, newDoc);
        }
    });
}

function publicRemove(id, callback) {
    db.update({_id: id}, {$set: {"state": "DELETED"}}, {returnUpdatedDocs:true}, function (err, numDocs, doc) {
        callback(err, doc);
    });
}

function publicGet(id, callback)
{   db.findOne({ _id: id }, function (err, doc) {
        callback( err, doc);
    });
}

function publicAll()
{
    db.find({}, function (err, docs) {
        callback( err, docs);
    });
}

module.exports = {add : publicAddTask, delete : publicRemove, get : publicGet, all : publicAll};