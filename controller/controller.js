const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const sql = require("../connection/sql_combine");

const { Cookies, generateUid } = require('../common/common-functions');
const userCookies = new Cookies();


const home = (req, res) => {
    res.render('./index.ejs');
}

const myProfile = (req, res) => {
    res.render('./my-profile.ejs', {title: 'My Profile'});
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

const signUp = (req, res) => {
    res.render('./sign-up.ejs', {title: 'Sign up new account'});
}

const verifyOTP = (req, res) => {
    res.render('./verify-login-otp.ejs', {title: 'Sign up new account'});
}

const basicCourse = (req, res) => {
    res.render('./basic-course.ejs');
}

const editProfile = (req, res) => {
    res.render('./edit-profile.ejs', {title: 'Edit Profile'});
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
    login,logout, AuthLogin, signUp, verifyOTP,
    home, myProfile, basicCourse, editProfile
}