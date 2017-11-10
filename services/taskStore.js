const Datastore = require('nedb');
const db = new Datastore({ filename: './data/task.db', autoload: true });
import {default as model} from "../models/model.js";


const task = new model.Taskmanager();


function publicAddTask(task)
{
    let task = new model.TaskManager;

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