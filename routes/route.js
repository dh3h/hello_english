const express = require("express");
const { loginFilter } = require("../middleware/middleware");
let app = express();
app.use(loginFilter);
const Router = express.Router();

const { login
} = require("../controller/controller");


// Index Routing
Router.route('/').get(login);
Router.route("/login").get(login);

module.exports = Router;