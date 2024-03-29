const sql = require("../connection/sql_combine");

const { randomStr, Cookies, generateUid } = require('../common/common-functions');
const userCookies = new Cookies();


const home = (req, res) => {
    res.send(userCookies.get(req, 'user_uid') || 'User No Login');
}

const login = async (req, res) => {
    try {
        const resp = await generateUid('user');
        res.send(resp);
    } catch (error) {
        if (error.message === 'No Data Found') {
            res.status(404).send('User Not Found');
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
};





module.exports = {
    login, home
}