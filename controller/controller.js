const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const sql = require("../connection/sql_combine");

const { Cookies, generateUid } = require('../common/common-functions');
const userCookies = new Cookies();


const home = (req, res) => {
    res.render('./404.ejs');
}

// Serialize and deserialize user
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});


const login = (req, res) => {
    res.render('./login.ejs');
};

const logout = (req, res) => {
    userCookies.set(res, 'user_data', '');
    res.redirect('/login');
}

const AuthLogin = async (req, res) => {
    const user_data = req.user._json;
    let email = user_data.email;

    try {
        const user_exists = await sql.select_assoc('repo_user', 'email', email);
        let user_db_data = user_exists[0] ?? false;
        if (!user_db_data) {
            const new_guid = await generateUid('user');
            let set_data = { user_uid: new_guid, email, name: user_data.name };
            sql.insert('repo_user', set_data);
            user_db_data = {
                ...set_data, pic: 0, mobile: '', lang: 'ENG', coin: 0
            }
        }

        userCookies.set(res, 'user_data', user_db_data)
    } catch (error) {
        if (error.message === 'No Data Found') {
            res.status(404).send('User Not Found');
        } else {
            res.status(500).send('Internal Server Error');
        }
    }

    res.redirect('/');
}



module.exports = {
    login, home, AuthLogin, logout
}