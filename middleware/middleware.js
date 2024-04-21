const { Cookies } = require('../common/common-functions');
const isLoggedIn = (req, res, next) => {
    const cookie = new Cookies();
    let userId = cookie.get(req, 'user_data');
    if (!userId) {
        // res.render('login.ejs');
        // return;
    }
    next();
}

const isLoggedOut = (req, res, next) => {
    const cookie = new Cookies();
    let userId = cookie.get(req, 'user_data');
    if (userId) {
        // res.render('404.ejs');
        // return;
    }
    next();
}


module.exports = { isLoggedIn, isLoggedOut };