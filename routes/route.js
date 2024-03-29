const express = require("express");
const { loginFilter } = require("../middleware/middleware");
let app = express();
const cookieParser = require('cookie-parser');

app.use(loginFilter);
app.use(cookieParser());

const Router = express.Router();

const { 
    login, home
} = require("../controller/controller");


// Index Routing
Router.route('/').get(home);
Router.route("/login").get(login);

module.exports = Router;