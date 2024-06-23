const { Cookies } = require('../common/common-functions');
const isLoggedIn = (req, res, next) => {
    const cookie = new Cookies();
    let userId = cookie.get(req, 'user_data');
    if (!userId) {
        res.render('start-page.ejs');
        return;
    }
    next();
}

const isLoggedOut = (req, res, next) => {
    const cookie = new Cookies();
    let userId = cookie.get(req, 'user_data');
    if (userId) {
        res.render('index.ejs');
        return;
    }
    next();
}

const isAdminLogin = (req, res, next) => {
    const cookie = new Cookies();
    let userId = cookie.get(req, 'admin_data');
    if (!userId) {
        res.render('admin/login.ejs');
        return;
    }
    next();
}

const isAdminLoggedOut = (req, res, next) => {
    const cookie = new Cookies();
    let userId = cookie.get(req, 'admin_data');
    // if (userId) {
    //     res.render('admin/index.ejs');
    //     return;
    // }
    next();
}

module.exports = { isLoggedIn, isLoggedOut, isAdminLogin, isAdminLoggedOut };