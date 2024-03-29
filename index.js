const PORT = 3000;
const base = require('path');

const express = require('express');
const bodyParser = require("body-parser");
const multer = require('multer');

const routes = require("./routes/route");
const path = base.join('/Users/dilshadahmed/dilshad/my projects/learn/');

const app = express();
const upload = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path));
app.use(express.json());

app.use('/', routes);
app.use(upload.array());


app.set('view engine', 'ejs');


app.get('*', (req, res) => {
    res.render("./404.ejs");
    // res.send('404 Not Found');
});

app.listen(PORT, console.log('Server'));