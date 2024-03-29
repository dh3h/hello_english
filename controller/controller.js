const sql = require("../connection/sql_combine");
const {loginFilter} = require("../middleware/middleware");

const {randomStr, obj_not_empty} = require('../common/common-functions');


const login = (req, res) => {
    res.send('Login');
}





module.exports = {
    login
}