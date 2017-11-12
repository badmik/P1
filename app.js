const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const hbs = require("express-handlebars" );
const mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/tasks', {useMongoClient: true});

let db = mongoose.connection;

db.once("open", function () {
   console.log("DB CONNECTED")
});

db.on("error", function (err) {
    console.log(err);
});


const app = express();

let Task = require("./models/task");

app.engine( 'hbs', hbs( {
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/',
    partialsDir: __dirname + '/views/partials/'
} ) );

app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.get("/", function(req,res){
    Task.find({}, function (err, tasks) {
        if (err){
            console.log(err);
        } else {
            res.render("index", {
                tasks: tasks
            });
            }

    });
   });




app.get("/edit/:id", function(req,res){
    Task.findById(req.params.id, function (err, task) {
        res.render("edit", {
            task:task

        });

    });

});

app.get("/add", function(req,res){
    res.render("add");

});



app.post("/add", function (req, res) {

    let task = new Task();

    task.title = req.body.title;
    task.description = req.body.description;
    task.date = req.body.date;

    task.save(function (err) {
       if (err){
           console.log(err);
           return;
       } else {
           res.redirect("/");

       }
    });

});

app.post("/edit:id", function (req, res) {

    let task = {};

    task.title = req.body.title;
    task.description = req.body.description;
    task.date = req.body.date;

    let query = {_id:req.params.id};

    task.update(query, task,function (err) {
        if (err){
            console.log(err);
            return;
        } else {
            res.redirect("/");

        }
    });

});

const port = 3001;
app.listen(port, () => {  console.log(`Server running at Port ${port}`); });
