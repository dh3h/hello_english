const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

var request = require('request');

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

const Rearrangement = (req, res) => {
    res.render('./Rearrangement.ejs', { title: 'Rearrangement' });
}

const public_profile = (req, res) => {
    res.render('./public-profile.ejs', { title: 'Public Profile' });
}

const private_profile = (req, res) => {
    res.render('./page-profile.ejs', { title: 'My Profile' });
}

const peactice = (req, res) => {
    res.render('./practice.ejs', { title: 'Practices' });
}

const editProfile = (req, res) => {
    res.render('./edit-profile.ejs', { title: 'Edit Profile' });
}

const challange = (req, res) => {
    res.render('./challange.ejs', { title: 'Challange' });
}

const maintenance = (req, res) => {
    res.render('./maintenance.ejs', { title: 'maintenance' });
}

const apptips = (req, res) => {
    res.render('./app-tips.ejs', { title: 'tips' });
}

const news = (req, res) => {
    res.render('./news.ejs', { title: 'news' });
}

const Conversation = (req, res) => {
    res.render('./Conversation.ejs', { title: 'Conversation' });
}

const artical = (req, res) => {
    res.render('./artical.ejs', { title: 'artical' });
}

const artical_details = (req, res) => {
    res.render('./artical-details.ejs', { title: 'Artical details' });
}
const game = (req, res) => {
    res.render('./game.ejs', { title: 'Games' });
}

const Videos = (req, res) => {
    res.render('./videos.ejs', { title: 'Videos' });
}

const videos_details = (req, res) => {
    res.render('./videos-details.ejs', { title: 'Videos details' });
}

const books = (req, res) => {
    res.render('./books.ejs', { title: 'books' });
}

const books_details = (req, res) => {
    res.render('./books-details.ejs', { title: 'Books details' });
}
const book_open = (req, res) => {
    res.render('./book-open.ejs', { title: 'Books Open' });
}

const my_friends = (req, res) => {
    res.render('./my-friends.ejs', { title: 'My Friends' });
}

const ask_a_questions = (req, res) => {
    res.render('./ask-a-questions.ejs', { title: 'Ask a Questions' });
}

const type_questions = (req, res) => {
    res.render('./type-questions.ejs', { title: 'Type Questions' });
}

const all_anwers = (req, res) => {
    res.render('./all-anwers.ejs', { title: 'All Answers' });
}

const type_answers = (req, res) => {
    res.render('./type-answers.ejs', { title: 'Type Answers' });
}

const refer_friends = (req, res) => {
    res.render('./refer-friends.ejs', { title: '/Refer Friends' });
}
const page_about = (req, res) => {
    res.render('./page-about.ejs', { title: '/About App' });
}
const helpline = (req, res) => {
    res.render('./helpline.ejs', { title: '/Helpline' });
}
const page_chat = (req, res) => {
    res.render('./page-chat.ejs', { title: '/page chat' });
}

const fill_in_the_blank = (req, res) => {
    res.render('./fill-in-the-blank.ejs', { title: '/Fill In The Blank' });
}

const find_correct_sentence = (req, res) => {
    res.render('./find-correct-sentence.ejs', { title: '/find out the correct sentence' });
}
const answer_the_questions = (req, res) => {
    res.render('./answer-the-questions.ejs', { title: '/Answer the questions' });
}

const finding_the_gems = (req, res) => {
    res.render('./finding-the-gems.ejs', { title: '/Finding the gems' });
}

const listen_select_options = (req, res) => {
    res.render('./listen-select-options.ejs', { title: '/Listen & select the correct sentence' });
}

const fill_code_videos = (req, res) => {
    res.render('./fill-code-videos.ejs', { title: '/Fill the code from video tips' });
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
        if (email || user_uid) {
            const user_exists = await sql.select_assoc('repo_user', 'email', { email });
            let user_db_data = user_exists[0] ?? false;
            if (!user_db_data) {
                set_data.user_uid = await generateUid('user');
                result = await sql.insert('repo_user', set_data);
                if (result) {
                    response = { status: 1, res: "User Added" };
                }
            } else {
                result = await sql.update('repo_user', 'user_uid', user_uid, { ...set_data });
                if (result) {
                    response = { status: 1, res: "User Updated" };
                }
            }
        }
    } catch (error) {
        if (error.message === 'No Data Found') {
            response = { status: 0, res: 'Something Went Wrong!!' };
        } else {
            response = { status: 0, res: 'Something Went Wrong!!' };
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


    if (typeof response.status == 'undefined') {
        try {
            const admin_data = await sql.select_assoc('repo_admin', 'email,id,name', where);
            response = { status: 0, res: "Login Failed" };
            admin_data[0].email;
            if (typeof admin_data[0].email != 'undefined') {
                userCookies.set(res, 'admin_data', admin_data)
                response = { status: 1, res: "Login Successfull" };
            }
        } catch (error) {
        }
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
    let { id, email, name, mobile, user_uid, column, order_by } = req.body;
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

    if (typeof column == 'undefined') {
        column = 'email, id, name, user_uid, pic, status';
    }

    if (typeof order_by == 'undefined') {
        order_by = 'id';
    }

    try {
        let user_list = await sql.select_assoc('repo_user', column, where, order_by);

        response = { status: 1, res: user_list };
    } catch (error) {
        console.log(error);
    }
    res.send(JSON.stringify(response));
}

const GetQuestions = async (req, res) => {
    let { id, user_guid, column } = req.body;
    let response = { status: 0, res: "Something gone wrong !!" };

    let where = {};
    if (typeof id != 'undefined') {
        where.id = id;
    } if (typeof user_guid != 'undefined') {
        where.user_guid = user_guid;
    }

    if (typeof column == 'undefined') {
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


const adminHome = (req, res) => {
    res.render('./admin/index.ejs', { title: 'Dashboard' });
}

const adminLoginPage = (req, res) => {
    res.render('./admin/login.ejs');
}

const getUserList = (req, res) => {
    request.post(
        'http://localhost:3000/admin/get-user',
        { json: { order_by: 'id DESC', column: 'email,lang,coin,name,status,user_uid' } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.render('./admin/user-list.ejs', { title: 'All Users', users: body['res'] });
            } else {
                res.send('GET USER LIST POST NOT WORKING');
            }
        }
    );
}

const AdminEditSingleUser = (req, res) => {
    const user_uid = req.params.uid;

    request.post(
        'http://localhost:3000/admin/get-user',
        { json: { user_uid, column: '*' } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.render('./admin/user-edit.ejs', { title: 'Edit Users', users: body['res'][0] });
            } else {
                res.send('User Not Found');
            }
        }
    );

}

const GetTips = (req, res) => {
    res.render('./admin/tips-list.ejs', { title: 'Tips List' });
}

const GeteditTips = (req, res) => {
    res.render('./admin/edit-tips.ejs', { title: 'Edit Tips List' });
}

const adminGetArtical = (req, res) => {
    res.render('./admin/artical-list.ejs', { title: 'Artical List' });
}
const adminGetArticaledit = (req, res) => {
    res.render('./admin/get-edit-artical.ejs', { title: 'Edit Artical List' });
}

const adminGetVideos = (req, res) => {
    res.render('./admin/get-video-list.ejs', { title: 'Videos List' });
}
const AdminEditVideos = (req, res) => {
    res.render('./admin/get-edit-video.ejs', { title: 'Edit Videos' });
}
//  ------------------------ Audio --------------------//
const AdminGetAudio = (req, res) => {
    res.render('./admin/get-audio-list.ejs', { title: 'Audios List' });
}
const AdminEditAudio = (req, res) => {
    res.render('./admin/get-edit-audio.ejs', { title: 'Edit Audios' });
}
//  ------------------------ Books --------------------//
const AdminGetBook = (req, res) => {
    res.render('./admin/get-book-list.ejs', { title: 'Books List' });
}
const AdminEditBook = (req, res) => {
    res.render('./admin/get-edit-book.ejs', { title: 'Edit Books' });
}

//  ------------------------ Fill in the Blank --------------------//
const AdminGetBlank = (req, res) => {
    res.render('./admin/get-blank-list.ejs', { title: 'Fill In the Blank' });
}
const AdminEditBlank = (req, res) => {
    res.render('./admin/get-edit-blank.ejs', { title: 'Edit Fill In the Blank' });
}

//  ------------------------ rearrangements --------------------//
const AdminGetrearrangements = (req, res) => {
    res.render('./admin/get-rearrangements-list.ejs', { title: 'Fill In the Blank' });
}
const AdminEditrearrangements = (req, res) => {
    res.render('./admin/get-edit-rearrangements.ejs', { title: 'Edit Fill In the Blank' });
}
// ============================= Phase =============================== //
const adminListPhase = (req, res) => {

    request.post(
        'http://localhost:3000/admin/get-phace-list',
        { json: { order_by: 'id DESC' } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.render('./admin/get-phace-list.ejs', { title: 'List Phase', phase_list: body['res'] });
            } else {
                res.send('User Not Found');
            }
        }
    );
}
// ============================= Add lessons =============================== //
const adminListLessons = async (req, res) => {
    request.post(
        'http://localhost:3000/admin/get-phace-list',
        { json: { order_by: 'id DESC' } },
        async function (error, response, body) {
            if (!error && response.statusCode == 200) {
                const rep = await sql.run("SELECT repo_lesson.id, repo_lesson.lesson_name,repo_lesson.lessons_discription,repo_lesson.date_and_time,repo_lesson.status,repo_phase.phase_name FROM `repo_lesson` INNER JOIN repo_phase ON repo_lesson.phase_id = repo_phase.id;");
                console.log(rep);
                res.render('./admin/get-lessons-list.ejs', { title: 'List Phase', phase_id: body['res'], lesson_list: rep,  });
            
            } else {
                res.send('User Not Found');
            }
        }
    );

}

const adminListLessonsAPI = async (req, res) => {
    let { id, phase_id, lesson_name, lessons_discription, date_and_time, status, order_by } = req.body;
    let response = { status: 0, res: "Something gone wrong !!" };

    let where = {};
    if (typeof id != 'undefined') {
        where.id = id;
    }
    if (typeof phase_id != 'undefined') {
        where.phase_id = phase_id;
    } if (typeof lesson_name != 'undefined') {
        where.lesson_name = lesson_name;
    }
    if (typeof lessons_discription != 'undefined') {
        where.lessons_discription = lessons_discription;
    }
    if (typeof date_and_time != 'undefined') {
        where.date_and_time = date_and_time;
    } if (typeof status != 'undefined') {
        where.status = status;
    }

    let column = '*';
    if (typeof req.body.columns != 'undefined') {
        column = req.body.columns
    }
    if (typeof order_by == 'undefined') {
        order_by = 'id';
    }

    try {
        let lesson_list = await sql.select_assoc('repo_lesson', column, where, order_by);
        response = { status: 1, res: lesson_list };
    } catch (error) {
        console.log(error);
    }
    res.send(JSON.stringify(response));
}

const adminListLessonAPI_Set = async (req, res) => {
    const { id, phase_id, lesson_name,lessons_discription, status, type } = req.body;
    response = { status: 0, res: "Something went wrong !!" };

    let columns = {};
    if (status) {
        columns.status = status;
    }
    if (!lessons_discription) {
        response = { status: 2, res: "Lesson Discription is required !!" };
    } else {
        columns.lessons_discription = lessons_discription;
    }
    if (!lesson_name) {
        response = { status: 2, res: "Lesson Name is required !!" };
    } else {
        columns.lesson_name = lesson_name;
    }
    if (!phase_id) {
        response = { status: 2, res: "Select Phases required !!" };
    } else {
        columns.phase_id = phase_id;
    }

    if (response.status != 2) {
        try {
            if (typeof id != 'undefined') {
                result = await sql.update('repo_lesson', 'id', id, columns);
                response = { status: 1, res: "Lesson Updated" };
            } else {
                result = await sql.insert('repo_lesson', columns);
                response = { status: 1, res: "Inserted Succrssfully" };
            }
        } catch (error) {
        }
    }

    res.send(JSON.stringify(response));
}

// ============================= find out the correct sentence =============================== //
const AdminFindCorrectSentence = (req, res) => {
    res.render('./admin/get-find-correct-sentence.ejs', { title: 'List find out the correct sentence' });
}
const AdminAddFindCorrectSentence = (req, res) => {
    res.render('./admin/get-add-find-correct-sentence.ejs', { title: 'ADD find out the correct sentence' });
}
// ============================= Listen & Type (sentences / words) =============================== //
const AdminListenTypeList = (req, res) => {
    res.render('./admin/get-find-listen-&-type-list.ejs', { title: 'List Listen & Type (sentences / words)' });
}
const AdminEditListenType = (req, res) => {
    res.render('./admin/get-add-listen-&-type.ejs', { title: 'ADD Listen & Type' });
}

// ============================= conversation =============================== //
const AdminConversationList = (req, res) => {
    res.render('./admin/get-conversation-list.ejs', { title: 'List Conversation' });
}
const AdminAddconversation = (req, res) => {
    res.render('./admin/get-add-conversation.ejs', { title: 'ADD Conversation' });
}

// ============================= Story =============================== //
const AdminStoryList = (req, res) => {
    res.render('./admin/get-story-list.ejs', { title: 'List Story' });
}
const AdminAddStory = (req, res) => {
    res.render('./admin/get-add-story.ejs', { title: 'ADD Story' });
}

// ============================= Story =============================== //
const AdminAnswer_the_questions_list = (req, res) => {
    res.render('./admin/get-answer-the-questions-list.ejs', { title: 'List Answer the Questions' });
}
const AdminAnswer_the_questions_add = (req, res) => {
    res.render('./admin/get-answer-the-questions-add.ejs', { title: 'ADD Answer the Questions' });
}

// ============================= finding-the-gems =============================== //
const Adminfinding_the_gems_list = (req, res) => {
    res.render('./admin/get-finding-the-gems-list.ejs', { title: 'List Finding the Gems' });
}
const Adminfinding_the_gems_add = (req, res) => {
    res.render('./admin/get-finding-the-gems-add.ejs', { title: 'ADD Finding the Gems' });
}

// ============================= listen select-list =============================== //
const Adminlisten_select_list = (req, res) => {
    res.render('./admin/get-listen-select-list.ejs', { title: 'List Listen & select the correct sentence' });
}
const Adminlisten_select_add = (req, res) => {
    res.render('./admin/get-listen-select-add.ejs', { title: 'ADD Listen & select the correct sentence' });
}

// ============================= Fill the code from video tips =============================== //
const AdminVideo_code_list = (req, res) => {
    res.render('./admin/get-video-code-list.ejs', { title: 'Fill the code from video tipse' });
}
const AdminVideo_code_add = (req, res) => {
    res.render('./admin/get-video-code-add.ejs', { title: 'ADD Fill the code from video tips' });
}

// ============================= news =============================== //
const AdminNews_list = (req, res) => {
    res.render('./admin/get-news-list.ejs', { title: 'List News' });
}
const AdminNews_add = (req, res) => {
    res.render('./admin/get-news-add.ejs', { title: 'ADD News' });
}

const adminListPhaseAPI = async (req, res) => {
    let { id, phase_name, date_and_time, status, order_by } = req.body;
    let response = { status: 0, res: "Something gone wrong !!" };

    let where = {};
    if (typeof id != 'undefined') {
        where.id = id;
    } if (typeof phase_name != 'undefined') {
        where.phase_name = phase_name;
    } if (typeof date_and_time != 'undefined') {
        where.date_and_time = date_and_time;
    } if (typeof status != 'undefined') {
        where.status = status;
    }

    let column = '*';
    if (typeof req.body.columns != 'undefined') {
        column = req.body.columns
    }
    if (typeof order_by == 'undefined') {
        order_by = 'id';
    }

    try {
        let phase_list = await sql.select_assoc('repo_phase', column, where, order_by);
        response = { status: 1, res: phase_list };
    } catch (error) {
        console.log(error);
    }
    res.send(JSON.stringify(response));
}


const adminListPhaseAPI_Set = async (req, res) => {
    const { id, phase_name, date_and_time, status, type } = req.body;
    response = { status: 0, res: "Something went wrong !!" };

    let columns = {};
    if (status) {
        columns.status = status;
    }

    if (!phase_name) {
        response = { status: 0, res: "Phase Name is required" };
    } else {
        columns.phase_name = phase_name;
    }
    if (phase_name || status) {
        try {
            if (typeof id != 'undefined') {
                result = await sql.update('repo_phase', 'id', id, columns);
                response = { status: 1, res: "Phase Updated" };
            } else {
                result = await sql.insert('repo_phase', columns);
                response = { status: 1, res: "Phase Inserted" };
            }
        } catch (error) {
        }
    }

    res.send(JSON.stringify(response));
}

const updateStatus = async (req, res) => {
    let { condition, tbl, entity_status } = req.body;
    response = { status: 0, res: "Something went wrong !!" };

    tbl = "repo_" + tbl;
    let columns = {};
    columns.status = 0;
    if ( entity_status ) {
        columns.status = Number(entity_status);
    }

    let id = 'id';
    let col = 'id';
    if (typeof condition != 'undefined' ) {
        condition = JSON.parse(condition);
        id = condition.id;
        col = condition.col;
    }

    if(id && col){
        try {
            result = await sql.update(tbl, id, col, columns);
            response = { status: 1, res: "Status Updated" };
        } catch (error) {
            console.log(error);
        }
    }

    res.send(JSON.stringify(response));
}


const deleteEntity = async (req, res) => {
    let { tbl, id } = req.body;
    response = { status: 0, res: "Something went wrong !!" };

    tbl = "repo_" + tbl;
 
    if(id){
        try {
            result = await sql.delete(tbl, 'id', id);
            response = { status: 1, res: "Deleted Successfully" };
        } catch (error) {
            console.log(error);
        }
    }

    res.send(JSON.stringify(response));
}


module.exports = {
    login, logout, AuthLogin, signUp, verifyOTP,
    home, myProfile, basicCourse, Rearrangement, public_profile, editProfile, private_profile, challange, maintenance, apptips, news, Conversation, fill_code_videos,
    artical, addUser, artical_details, game, Videos, videos_details, type_questions, ask_a_questions, books, books_details, book_open, AdminLogin, AdminAnsToQuestion, my_friends,
    UsersList, GetQuestions, adminHome, peactice, all_anwers, type_answers, refer_friends, page_about, helpline, answer_the_questions, finding_the_gems,
    adminLoginPage, getUserList, AdminEditSingleUser, page_chat, fill_in_the_blank, find_correct_sentence, listen_select_options,
    GetTips, GeteditTips, adminGetArtical, adminGetArticaledit, adminGetVideos, AdminEditVideos,
    AdminGetAudio, AdminEditAudio, AdminGetBook, AdminEditBook, AdminGetBlank, AdminEditBlank, AdminGetrearrangements,
    AdminEditrearrangements,
    // ------------------------------- Admin functions ------------------ ///
    adminListPhase, adminListLessons, AdminFindCorrectSentence, AdminAddFindCorrectSentence, AdminListenTypeList, AdminEditListenType, AdminConversationList, AdminAddconversation,
    AdminStoryList, AdminAddStory, AdminAnswer_the_questions_list, AdminAnswer_the_questions_add, Adminfinding_the_gems_list, Adminfinding_the_gems_add,
    Adminlisten_select_list, Adminlisten_select_add, AdminVideo_code_list, AdminVideo_code_add, AdminNews_list, AdminNews_add,

    // ADMIN API
    updateStatus, deleteEntity,

    adminListPhaseAPI, adminListPhaseAPI_Set, adminListLessonsAPI, adminListLessonAPI_Set
};