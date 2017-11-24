const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const hbs = require("express-hbs" );
const app = express();

const router = express.Router();


app.engine('hbs', hbs.express4());
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(require('./routes/taskRoutes.js'));

app.use(express.static(__dirname + '/public'));



const port = 3003;
app.listen(port, () => {  console.log(`Server running at Port ${port}`); });
