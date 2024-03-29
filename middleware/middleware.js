const loginFilter = (req, res, next) => {
    sess = req.session;
    if (typeof sess != 'undefined') {
        if (typeof sess.id == 'undefined' || typeof sess.password == 'undefined') {
            res.redirect('/login');
        }
        else {
            next();
        }
    }
    else {
        res.redirect('/login');
    }
}



module.exports = { loginFilter };