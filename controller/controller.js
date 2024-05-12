const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const sql = require("../connection/sql_combine");

const { Cookies, generateUid } = require('../common/common-functions');
const userCookies = new Cookies();


const home = (req, res) => {
    res.render('./index.ejs');
}

const myProfile = (req, res) => {
    res.render('./my-profile.ejs', { title: 'My Profile' });
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
    res.render('./sign-up.ejs', { title: 'Sign up new account' });
}

const verifyOTP = (req, res) => {
    res.render('./verify-login-otp.ejs', { title: 'Sign up new account' });
}

const basicCourse = (req, res) => {
    res.render('./basic-course.ejs');
}

const editProfile = (req, res) => {
    res.render('./edit-profile.ejs', { title: 'Edit Profile' });
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



const addUser = async (req, res) => {
    const { user_uid, name, email, mobile, pic, password, lang, coin } = req.body;
    let response = { res: "Something went wrong!!" };
    let set_data = {};
    if (!name) {
        response = { status: 0, res: "User Name is required" };
    } else {
        set_data.name = name;
    }

    if (!email) {
        response = { status: 0, res: "Email is required" };
    } else {
        set_data.email = email;
    }

    if (!mobile) {
        response = { status: 0, res: "Mobile is required" };
    } else {
        set_data.mobile = mobile;
    }

    if (user_uid) {
        set_data.user_uid = user_uid;
    }

    if (typeof coin != 'undefined') {
        set_data.coin = coin;
    }
    if (typeof lang != 'undefined') {
        set_data.lang = lang;
    }
    if (typeof pic != 'undefined') {
        set_data.pic = pic;
    }
    if (typeof password != 'undefined') {
        set_data.password = password;
    }

    try {
        if (email) {
            const user_exists = await sql.select_assoc('repo_user', 'email', email);
            let user_db_data = user_exists[0] ?? false;
            if (!user_db_data) {
                set_data.user_uid = await generateUid('user');
                result = await sql.insert('repo_user', set_data);
                if(result){
                    response = { status: 1, res: "User Added" };
                }
            } else {
                result = await sql.update('repo_user', 'user_uid', user_uid, { ...set_data });
                if(result){
                    response = { status: 1, res: "User Updated" };
                }
            }
        }
    } catch (error) {
        if (error.message === 'No Data Found') {
            response = {status: 0, res:'Something Went Wrong!!'};
        } else {
            response = {status: 0, res:'Something Went Wrong!!'};
        }
    }

    res.send(JSON.stringify(response));
}


const AdminLogin = async (req, res) => {
    const { email, password } = req.body;
    response = {};

    let where = {};
    if (!password) {
        response = { status: 0, res: "Password is required" };
    } else {
        where.password = password;
    }

    if (!email) {
        response = { status: 0, res: "Email is required" };
    } else {
        where.email = email;
    }
    where.status = 1;


    if(typeof response.status != 'undefined'){
        try {
            const admin_data = await sql.select_assoc('repo_admin', 'email,id,name', where);
            console.log(admin_data);
            if(typeof admin_data[0].email != 'undefined'){
                userCookies.set(res, 'admin_data', admin_data)
                response = { status: 0, res: "Login Successfull" };
            }
        } catch (error) {
        }
    }else{
        response = { status: 0, res: "Login Failed!!" };
    }
    res.send(JSON.stringify(response));
}


const AdminAnsToQuestion = async (req, res) => {
    const { id, answer, status } = req.body;
    response = { status: 0, res: "Something went wrong !!" };

    let columns = {};
    if (!status) {
        response = { status: 0, res: "status is required" };
    } else {
        columns.status = status;
    }

    if (!answer) {
        columns.answer = '';
    } else {
        columns.answer = answer;
    }


    try {
        result = await sql.update('repo_question', 'id', id, columns);
        response = { status: 0, res: "Answer Updated" };
    } catch (error) {
    }
    res.send(JSON.stringify(response));
}


const UsersList = async (req, res) => {
    let { id, email, name, mobile, user_uid, column } = req.body;
    let response = { status: 0, res: "Something gone wrong !!" };

    let where = {};
    if (typeof id != 'undefined') {
        where.id = id;
    } if (typeof email != 'undefined') {
        where.email = email;
    } if (typeof name != 'undefined') {
        where.name = name;
    } if (typeof mobile != 'undefined') {
        where.mobile = mobile;
    } if (typeof user_uid != 'undefined') {
        where.user_uid = user_uid;
    }

    if(typeof column == 'undefined'){
        column = 'email, id, name, user_uid, pic, status';
    }
    
    try {
        let user_list = await sql.select_assoc('repo_user', column, where);

        response = { status: 1, res: user_list };
    } catch (error) {
        console.log(error);
    }
    res.send(JSON.stringify(response));
}

const GetQuestions = async (req, res) => {
    let { id, user_guid, column} = req.body;
    let response = { status: 0, res: "Something gone wrong !!" };

    let where = {};
    if (typeof id != 'undefined') {
        where.id = id;
    } if (typeof user_guid != 'undefined') {
        where.user_guid = user_guid;
    }

    if(typeof column == 'undefined'){
        column = '*';
    }

    try {
        let question_list = await sql.select_assoc('repo_question', column, where);
        response = { status: 1, res: question_list };
    } catch (error) {
        console.log(error);
    }
    res.send(JSON.stringify(response));
}

module.exports = {
    login, logout, AuthLogin, signUp, verifyOTP,
    home, myProfile, basicCourse, editProfile,
    addUser, AdminLogin, AdminAnsToQuestion,
    UsersList, GetQuestions
};