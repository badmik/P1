const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const hbs = require("express-hbs" );
//
//
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/tasks', {useMongoClient: true});
//
// let db = mongoose.connection;
//
// db.once("open", function () {
//    console.log("DB CONNECTED")
// });
//
// db.on("error", function (err) {
//     console.log(err);
// });


const router = express.Router();


const app = express();

// let Task = require("./models/task");

// app.engine( 'hbs', hbs( {
//     extname: 'hbs',
//     defaultLayout: 'layout',
//     layoutsDir: __dirname + '/views',
//     partialsDir: __dirname + '/views/partials'
// } ) );




// app.set('view engine', 'hbs');



app.engine('hbs', hbs.express4());
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use(require("method-override")(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

app.use(require('./routes/taskRoutes.js'));

app.use(express.static(__dirname + '/public'));



const port = 3001;
app.listen(port, () => {  console.log(`Server running at Port ${port}`); });
