const PORT = 3000;
const base = require('path');

const express = require('express');
const bodyParser = require("body-parser");
const multer = require('multer');
const cookieParser = require('cookie-parser');

const routes = require("./routes/route");
const path = base.join('/Users/dilshadahmed/dilshad/my projects/learn/');

const app = express();
const upload = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path));
app.use(express.json());

app.use(upload.array());
app.use(cookieParser());
app.use('/', routes);


app.set('view engine', 'ejs');



app.get('*', (req, res) => {
    res.render("./404.ejs");
});

app.listen(PORT, console.log('Serve Started'));