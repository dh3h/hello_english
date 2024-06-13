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

const basicCourse = async (req, res) => {
    const pahses = await sql.select_assoc('repo_phase', 'id, phase_name', { status: 1 });

    let pahse_var = [];

    const phase_ids = pahses.map(pahse => pahse.id);
    let select = "* IN ('" + phase_ids.join("','") + "')";
    const select_lesson = { 'phase_id': select, status: 1 };

    const lessons = await sql.select_assoc('repo_lesson', 'id,phase_id,lesson_name', select_lesson);

    pahses.forEach(phase_element => {
        if (typeof pahse_var[phase_element['id']] == 'undefined') {
            pahse_var[phase_element['id']] = [phase_element['phase_name']];
        }
        lessons.forEach(lesson_element => {
            if (lesson_element['phase_id'] == phase_element['id']) {
                pahse_var[phase_element['id']].push(lesson_element);
            }
        });
    });

    pahse_var.shift();

    res.render('./basic-course.ejs', { pahse_var });
}

const Rearrangement = async (req, res) => {
    const { lesson_id } = req.params;
    const rearrangements_list = await sql.select_assoc('repo_rearrangements', '*', { lesson_id, status: 1 });
    res.render('./Rearrangement.ejs', { title: 'Re-arrangement', rearrangements_list });
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

const news = async (req, res) => {
    const News_list_app = await sql.run("SELECT * FROM `rapo_news`");
    res.render('./news.ejs', { title: 'News', News_list_app });
}

const Conversation = async (req, res) => {
    const rearrangements_list = await sql.select_assoc('repo_rearrangements', '*', { lesson_id, status: 1 });
    res.render('./Conversation.ejs', { title: 'Conversation', });
}

const artical = async (req, res) => {
    const artical_list = await sql.run("SELECT * FROM `repo_articals`");
    res.render('./artical.ejs', { title: 'artical', artical_list });
}

const artical_details = async (req, res) => {
    res.render('./artical-details.ejs', { title: 'Artical details' });
}
const game = (req, res) => {
    res.render('./game.ejs', { title: 'Games' });
}

const contest = (req, res) => {
    res.render('./contest.ejs', { title: 'Games' });
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

const fill_in_the_blank = async (req, res) => {
    const { lesson_id } = req.params;

    const fill_blank = await sql.select_assoc('repo_fill_blank', '*', { lesson_id });

    res.render('./fill-in-the-blank.ejs', { title: '/Fill In The Blank', fill_blank });
}

const find_correct_sentence = async (req, res) => {
    const { lesson_id } = req.params;

    const find_correct_sentence_list = await sql.select_assoc('repo_correct_sentence', '*', { lesson_id });
    res.render('./find-correct-sentence.ejs', { title: '/find out the correct sentence', find_correct_sentence_list });
}
const answer_the_questions = async (req, res) => {
    const { lesson_id } = req.params;

    const answer_the_questions_list = await sql.select_assoc('rapo_answere_question', '*', { lesson_id });
    res.render('./answer-the-questions.ejs', { title: '/Answer the questions', answer_the_questions_list });
}

const finding_the_gems = async (req, res) => {

    const { lesson_id } = req.params;

    const finding_the_gems_list = await sql.select_assoc('rapo_finding_the_gem', '*', { lesson_id });

    res.render('./finding-the-gems.ejs', { title: '/Finding the gems', finding_the_gems_list });
}

const listen_select_options = async (req, res) => {

    const { lesson_id } = req.params;

    const listen_select_options_list = await sql.select_assoc('rapo_listen_select', '*', { lesson_id });

    res.render('./listen-select-options.ejs', { title: '/Listen & select the correct sentence', listen_select_options_list });
}

const fill_code_videos = async (req, res) => {
    const { lesson_id } = req.params;

    const fill_code_videos_list = await sql.select_assoc('rapo_video_code', '*', { lesson_id });
    res.render('./fill-code-videos.ejs', { title: '/Fill the code from video tips', fill_code_videos_list });
}

const story = async (req, res) => {

    const { lesson_id } = req.params;

    const story_list = await sql.select_assoc('repo_fill_blank', '*', { lesson_id });

    res.render('./story.ejs', { title: '/Story', story_list });

    // console.log(story);
}

const listen_and_type = async (req, res) => {

    const { lesson_id } = req.params;

    const listen_and_type_list = await sql.select_assoc('repo_fill_blank', '*', { lesson_id });

    res.render('./listen-and-type.ejs', { title: '/listen & Type', listen_and_type_list });

    // console.log(story);
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



const adminGetArtical = async (req, res) => {
    const artical_list = await sql.run("SELECT * FROM `repo_articals` ORDER BY id DESC;");
    res.render('./admin/artical-list.ejs', { title: 'Artical List', artical_list });
}
const adminGetArticaledit = (req, res) => {
    res.render('./admin/get-edit-artical.ejs', { title: 'Edit Artical List' });
}

const adminGetVideos = async (req, res) => {
    const videos_list = await sql.run(" SELECT * FROM `repo_video_practice` ORDER BY id DESC;");

    res.render('./admin/get-video-list.ejs', { title: 'Videos List', videos_list });
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

//  ------------------------ Tips --------------------//

const GetTips = async (req, res) => {
    const tip_list = await sql.run("SELECT * FROM `repo_tips` ORDER BY id DESC;");
    // console.log(tip_list);
    res.render('./admin/tips-list.ejs', { title: 'Tips List', tip_list });

}

const GeteditTips = (req, res) => {
    res.render('./admin/edit-tips.ejs', { title: 'Edit Tips List', });
}


//  ------------------------ Books --------------------//

const AdminGetBook = async (req, res) => {

    const book_list = await sql.run("SELECT * FROM `repo_books` ORDER BY id DESC;");

    res.render('./admin/admin-book-list.ejs', { title: 'Books List', book_list });
}


// ================================== chapters ============================= //
// AdminGetchapter,AdminGetaddchapter,AdminGetaddchapter_set,

const AdminGetchapter = async (req, res) => {

    const chapters_list = await sql.run("SELECT repo_book_lessions.id, repo_book_lessions.book_id,repo_book_lessions.lession_title,repo_book_lessions.lession_details ,repo_book_lessions.date ,repo_book_lessions.status, repo_books.book_name FROM repo_book_lessions INNER JOIN repo_books ON repo_book_lessions.book_id = repo_books.id;");
    // console.log(chapters_list);
    res.render('./admin/admin-chapter-list.ejs', { title: 'Chapter List',chapters_list });
}

const AdminGetaddchapter = async (req, res) => {
    const book_list = await sql.run("SELECT * FROM `repo_books` ORDER BY id DESC;");
    res.render('./admin/admin-edit-chapter.ejs', { title: 'Edit chapter', book_list });
}

//  ------------------------ Fill in the Blank --------------------//
const AdminGetBlank = async (req, res) => {

    const f_i_b_list = await sql.run("SELECT repo_fill_blank.id, repo_fill_blank.phase_id, repo_fill_blank.lesson_id, repo_fill_blank.question,repo_fill_blank.date,repo_fill_blank.status,repo_phase.phase_name, repo_lesson.lesson_name FROM ((`repo_fill_blank` INNER JOIN repo_phase ON repo_fill_blank.phase_id = repo_phase.id)INNER JOIN repo_lesson ON repo_fill_blank.lesson_id = repo_lesson.id);");
    res.render('./admin/get-blank-list.ejs', { title: 'Fill In the Blank', f_i_b_list });
}
const AdminEditBlank = async (req, res) => {
    const phase = await sql.run("SELECT * FROM repo_phase WHERE status = 1");
    const lesson = await sql.run("SELECT * FROM repo_lesson WHERE status = 1");


    const id = req.params.id;
    let f_i_b = [];
    if (id) {
        f_i_b = await sql.run(`SELECT * FROM repo_fill_blank WHERE id = '${id}'`);
    }


    res.render('./admin/get-edit-blank.ejs', { title: 'Edit Fill In the Blank', phase, lesson, f_i_b, });
}

//  ------------------------ rearrangements --------------------//
const AdminGetrearrangements = async (req, res) => {

    const phase_id = await sql.run("SELECT * FROM repo_phase WHERE status = 1");
    // console.log(phase_id);
    const lesson_id = await sql.run("SELECT * FROM repo_lesson WHERE status = 1");
    // console.log(lesson_id);
    const rearrangements_list = await sql.run("SELECT repo_rearrangements.id, repo_rearrangements.phase_id, repo_rearrangements.lesson_id,repo_rearrangements.question,repo_rearrangements.date_and_time,repo_rearrangements.status,repo_phase.phase_name,repo_lesson.lesson_name FROM ((`repo_rearrangements` INNER JOIN repo_phase ON repo_rearrangements.phase_id = repo_phase.id)INNER JOIN repo_lesson ON repo_rearrangements.lesson_id = repo_lesson.id);");

    res.render('./admin/get-rearrangements-list.ejs', { title: 'List Rearrangements', phase_id: phase_id, lesson_id: lesson_id, rearrangements_list: rearrangements_list, });
}
const AdminGetrearrangementsAPI = async (req, res) => {
    let { id, phase_id, lesson_id, question, date_and_time, status, order_by } = req.body;
    let response = { status: 0, res: "Something gone wrong !!" };

    let where = {};
    if (typeof id != 'undefined') {
        where.id = id;
    }
    if (typeof phase_id != 'undefined') {
        where.phase_id = phase_id;
    }
    if (typeof lesson_id != 'undefined') {
        where.lesson_id = lesson_id;
    }
    if (typeof question != 'undefined') {
        where.question = question;
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
        let rearrangements_list = await sql.select_assoc('repo_rearrangements', column, where, order_by);
        response = { status: 1, res: rearrangements_list };
    } catch (error) {
        console.log(error);
    }
    res.send(JSON.stringify(response));
}

const AdminEditrearrangementsAPI_SET = async (req, res) => {
    const { id, phase_id, lesson_id, question, status, type } = req.body;
    response = { status: 0, res: "Something went wrong !!" };

    let columns = {};
    if (status) {
        columns.status = status;
    }
    if (!question) {
        response = { status: 2, res: "Questions is required !!" };
    } else {
        columns.question = question;
    }
    if (!lesson_id) {
        response = { status: 2, res: "Select Lesson required !!" };
    } else {
        columns.lesson_id = lesson_id;
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
                result = await sql.insert('repo_rearrangements', columns);
                response = { status: 1, res: "Inserted Succrssfully" };
            }
        } catch (error) {
        }
    }

    res.send(JSON.stringify(response));
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
                res.render('./admin/get-lessons-list.ejs', { title: 'List Phase', phase_id: body['res'], lesson_list: rep, });

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
    const { id, phase_id, lesson_name, lessons_discription, status, type } = req.body;
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
const AdminFindCorrectSentence = async (req, res) => {
    const correct_list_data = await sql.run("SELECT repo_correct_sentence.id, repo_correct_sentence.phase_id,repo_correct_sentence.lesson_id, repo_correct_sentence.question, repo_correct_sentence.config, repo_correct_sentence.status, repo_correct_sentence.date, repo_phase.phase_name, repo_lesson.lesson_name FROM ((`repo_correct_sentence` INNER JOIN repo_phase ON repo_correct_sentence.phase_id = repo_phase.id)INNER JOIN repo_lesson ON repo_correct_sentence.lesson_id = repo_lesson.id) ORDER BY id DESC;");
    // console.log(correct_list_data);
    res.render('./admin/get-find-correct-sentence.ejs', { title: 'List find out the correct sentence', correct_list_data });
}
const AdminAddFindCorrectSentence = async (req, res) => {

    const phase = await sql.run("SELECT * FROM repo_phase WHERE status = 1");
    const lesson = await sql.run("SELECT * FROM repo_lesson WHERE status = 1");

    const id = req.params.id;
    let correct_options = [];
    if (id) {
        correct_options = await sql.run(`SELECT * FROM repo_fill_blank WHERE id = '${id}'`);
    }

    res.render('./admin/get-add-find-correct-sentence.ejs', { title: 'ADD find out the correct sentence', phase, lesson, correct_options });
}
// ============================= Listen & Type (sentences / words) =============================== //
const AdminListenTypeList = async (req, res) => {
    const Listen_type_data = await sql.run("SELECT rapo_listen_type.id, rapo_listen_type.phase_id,rapo_listen_type.lesson_id,rapo_listen_type.word,rapo_listen_type.date,rapo_listen_type.status,repo_phase.phase_name,repo_lesson.lesson_name FROM ((`rapo_listen_type` INNER JOIN repo_phase ON rapo_listen_type.phase_id = repo_phase.id)INNER JOIN repo_lesson ON rapo_listen_type.lesson_id = repo_lesson.id);");
    // console.log(Listen_type_data);
    res.render('./admin/get-find-listen-type-list.ejs', { title: 'List Listen & Type (sentences / words)', Listen_type_data });
}
const AdminEditListenType = async (req, res) => {
    const phase = await sql.run("SELECT * FROM repo_phase WHERE status = 1");
    const lesson = await sql.run("SELECT * FROM repo_lesson WHERE status = 1");

    const id = req.params.id;
    let listen_type = [];
    if (id) {
        listen_type = await sql.run(`SELECT * FROM repo_fill_blank WHERE id = '${id}'`);
    }

    res.render('./admin/get-add-listen-&-type.ejs', { title: 'ADD Listen & Type', phase, lesson, listen_type });
}


// ============================= conversation =============================== //
const AdminConversationList = (req, res) => {
    res.render('./admin/get-conversation-list.ejs', { title: 'List Conversation' });
}
const AdminAddconversation = async (req, res) => {

    const phase = await sql.run("SELECT * FROM repo_phase WHERE status = 1");
    const lesson = await sql.run("SELECT * FROM repo_lesson WHERE status = 1");

    const id = req.params.id;
    let conversation_list = [];
    if (id) {
        conversation_list = await sql.run(`SELECT * FROM repo_fill_blank WHERE id = '${id}'`);
    }


    res.render('./admin/get-add-conversation.ejs', { title: 'ADD Conversation', phase, lesson, conversation_list });
}

// ============================= Story =============================== //
const AdminStoryList = async (req, res) => {

    const story_list = await sql.run("SELECT rapo_story.id, rapo_story.phase_id, rapo_story.lesson_id, rapo_story.story,rapo_story.date,rapo_story.status,repo_phase.phase_name,repo_lesson.lesson_name FROM ((`rapo_story` INNER JOIN repo_phase ON rapo_story.phase_id = repo_phase.id)INNER JOIN repo_lesson ON rapo_story.lesson_id = repo_lesson.id)ORDER BY id DESC;");

    res.render('./admin/get-story-list.ejs', { title: 'List Story', story_list });
}
const AdminAddStory = async (req, res) => {

    const phase = await sql.run("SELECT * FROM repo_phase WHERE status = 1");
    const lesson = await sql.run("SELECT * FROM repo_lesson WHERE status = 1");

    const id = req.params.id;
    let listen_type = [];
    if (id) {
        listen_type = await sql.run(`SELECT * FROM repo_fill_blank WHERE id = '${id}'`);
    }
    res.render('./admin/get-add-story.ejs', { title: 'ADD Story', phase, lesson, listen_type });
}

// ============================= anserr questions =============================== //
const AdminAnswer_the_questions_list = async (req, res) => {
    const AdminAnswer_the_questions_list = await sql.run("SELECT rapo_answere_question.id, rapo_answere_question.phase_id, rapo_answere_question.lesson_id,rapo_answere_question.question,rapo_answere_question.config, rapo_answere_question.date, rapo_answere_question.status,repo_phase.phase_name, repo_lesson.lesson_name FROM ((`rapo_answere_question` INNER JOIN repo_phase ON rapo_answere_question.phase_id = repo_phase.id)INNER JOIN repo_lesson ON rapo_answere_question.lesson_id = repo_lesson.id)ORDER BY id DESC;");

    res.render('./admin/get-answer-the-questions-list.ejs', { title: 'List Answer the Questions', AdminAnswer_the_questions_list });
}
const AdminAnswer_the_questions_add = async (req, res) => {

    const phase = await sql.run("SELECT * FROM repo_phase WHERE status = 1");
    const lesson = await sql.run("SELECT * FROM repo_lesson WHERE status = 1");

    const id = req.params.id;
    let ans_qus_list = [];
    if (id) {
        ans_qus_list = await sql.run(`SELECT * FROM repo_fill_blank WHERE id = '${id}'`);
    }


    res.render('./admin/get-answer-the-questions-add.ejs', { title: 'ADD Answer the Questions', phase, lesson, ans_qus_list });
}

// ============================= finding-the-gems =============================== //
const Adminfinding_the_gems_list = async (req, res) => {
    const Adminfinding_the_gems_list = await sql.run("SELECT rapo_finding_the_gem.id,rapo_finding_the_gem.phase_id,rapo_finding_the_gem.lesson_id,rapo_finding_the_gem.question,rapo_finding_the_gem.config, rapo_finding_the_gem.date,rapo_finding_the_gem.status, repo_phase.phase_name,repo_lesson.lesson_name FROM ((`rapo_finding_the_gem` INNER JOIN repo_phase ON rapo_finding_the_gem.phase_id = repo_phase.id)INNER JOIN repo_lesson ON rapo_finding_the_gem.lesson_id = repo_lesson.id)ORDER BY id DESC;");

    res.render('./admin/get-finding-the-gems-list.ejs', { title: 'List Finding the Gems', Adminfinding_the_gems_list });
}
const Adminfinding_the_gems_add = async (req, res) => {

    const phase = await sql.run("SELECT * FROM repo_phase WHERE status = 1");
    const lesson = await sql.run("SELECT * FROM repo_lesson WHERE status = 1");

    const id = req.params.id;
    let gems_list = [];
    if (id) {
        gems_list = await sql.run(`SELECT * FROM repo_fill_blank WHERE id = '${id}'`);
    }


    res.render('./admin/get-finding-the-gems-add.ejs', { title: 'ADD Finding the Gems', phase, lesson, gems_list });
}

// ============================= listen select-list =============================== //
const Adminlisten_select_list = async (req, res) => {
    const listen_select_list = await sql.run("SELECT rapo_listen_select.id, rapo_listen_select.phase_id,rapo_listen_select.lesson_id,rapo_listen_select.question, rapo_listen_select.config, rapo_listen_select.date, rapo_listen_select.status,repo_phase.phase_name,repo_lesson.lesson_name FROM ((`rapo_listen_select` INNER JOIN repo_phase ON rapo_listen_select.phase_id = repo_phase.id)INNER JOIN repo_lesson ON rapo_listen_select.lesson_id = repo_lesson.id)ORDER BY id DESC;");

    res.render('./admin/get-listen-select-list.ejs', { title: 'List Listen & select the correct sentence', listen_select_list });
}
const Adminlisten_select_add = async (req, res) => {

    const phase = await sql.run("SELECT * FROM repo_phase WHERE status = 1");
    const lesson = await sql.run("SELECT * FROM repo_lesson WHERE status = 1");

    const id = req.params.id;
    let listen_select_list = [];
    if (id) {
        listen_select_list = await sql.run(`SELECT * FROM repo_fill_blank WHERE id = '${id}'`);
    }

    res.render('./admin/get-listen-select-add.ejs', { title: 'ADD Listen & select the correct sentence', phase, lesson, listen_select_list });
}

// ============================= Fill the code from video tips =============================== //
const AdminVideo_code_list = async (req, res) => {
    const Video_code_list = await sql.run("SELECT rapo_video_code.id,rapo_video_code.phase_id,rapo_video_code.lesson_id,rapo_video_code.question,rapo_video_code.config,rapo_video_code.date,rapo_video_code.status, repo_phase.phase_name, repo_lesson.lesson_name FROM ((`rapo_video_code` INNER JOIN repo_phase ON rapo_video_code.phase_id = repo_phase.id)INNER JOIN repo_lesson ON rapo_video_code.lesson_id = repo_lesson.id)ORDER BY id DESC;");

    res.render('./admin/get-video-code-list.ejs', { title: 'Fill the code from video tipse', Video_code_list });
}
const AdminVideo_code_add = async (req, res) => {

    const phase = await sql.run("SELECT * FROM repo_phase WHERE status = 1");
    const lesson = await sql.run("SELECT * FROM repo_lesson WHERE status = 1");

    const id = req.params.id;
    let video_code_list = [];
    if (id) {
        video_code_list = await sql.run(`SELECT * FROM repo_fill_blank WHERE id = '${id}'`);
    }

    res.render('./admin/get-video-code-add.ejs', { title: 'ADD Fill the code from video tips', phase, lesson, video_code_list });
}

// ============================= news =============================== //
const AdminNews_list = async (req, res) => {
    const News_list = await sql.run("SELECT * FROM `rapo_news`");

    res.render('./admin/get-news-list.ejs', { title: 'List News', News_list });
}
const AdminNews_add = async (req, res) => {

    const id = req.params.id;
    let News_list = [];
    if (id) {
        News_list = await sql.run(`SELECT * FROM repo_fill_blank WHERE id = '${id}'`);
    }

    res.render('./admin/get-news-add.ejs', { title: 'ADD News' });
}

// ============================= Contest =============================== //
const Admin_Contest_list = (req, res) => {
    res.render('./admin/get-Contest-list.ejs', { title: 'List Contest' });
}
// const AdminNews_add = (req, res) => {
//     res.render('./admin/get-news-add.ejs', { title: 'ADD News' });
// }

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
    if (entity_status) {
        columns.status = Number(entity_status);
    }

    let id = 'id';
    let col = 'id';
    if (typeof condition != 'undefined') {
        condition = JSON.parse(condition);
        id = condition.id;
        col = condition.col;
    }

    if (id && col) {
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

    if (id) {
        try {
            result = await sql.delete(tbl, 'id', id);
            response = { status: 1, res: "Deleted Successfully" };
        } catch (error) {
            console.log(error);
        }
    }

    res.send(JSON.stringify(response));
}
// ====================================== All Set API here =========================================== //

const AdminBlankSet = async (req, res) => {
    const { id, phase_id, lesson_id, questions, config, status } = req.body;
    response = { status: 0, res: "Something went wrong !!" };

    let columns = {};
    if (status) {
        columns.status = status;
    }

    if (!phase_id) {
        response = { status: 2, res: "Phase is required" };
    } else {
        columns.phase_id = phase_id;
    } if (!lesson_id) {
        response = { status: 2, res: "Lesson is required" };
    } else {
        columns.lesson_id = lesson_id;
    } if (!questions) {
        response = { status: 2, res: "Quesrtion is required" };
    } else {
        columns.question = questions;
    } if (!config) {
        response = { status: 2, res: "Options are required" };
    } else {
        columns.config = config;
    }


    if (response.status != 2) {
        try {
            if (typeof id != 'undefined') {
                result = await sql.update('repo_fill_blank', 'id', id, columns);
                response = { status: 1, res: "F.I.B Updated" };
            } else {
                result = await sql.insert('repo_fill_blank', columns);
                response = { status: 1, res: "F.I.B Inserted" };
            }
        } catch (error) {
        }
    }

    res.send(JSON.stringify(response));
}
const AdminEditListenTypeSET = async (req, res) => {
    const { id, phase_id, lesson_id, listen_words, status } = req.body;
    response = { status: 0, res: "Something went wrong !!" };

    let columns = {};
    if (status) {
        columns.status = status;
    }

    if (!listen_words) {
        response = { status: 2, res: "Quesrtion is required" };
    } else {
        columns.word = listen_words;
    } if (!lesson_id) {
        response = { status: 2, res: "Lesson is required" };
    } else {
        columns.lesson_id = lesson_id;
    }
    if (!phase_id) {
        response = { status: 2, res: "Phase is required" };
    } else {
        columns.phase_id = phase_id;
    }

    if (response.status != 2) {
        try {
            if (typeof id != 'undefined') {
                result = await sql.update('rapo_listen_type', 'id', id, columns);
                response = { status: 1, res: " Updated Successfully !!" };
            } else {
                result = await sql.insert('rapo_listen_type', columns);
                response = { status: 1, res: "Inserted Successfully !!" };
            }
        } catch (error) {
        }
    }

    res.send(JSON.stringify(response));
}

const AdminAddStorySET = async (req, res) => {
    const { id, phase_id, lesson_id, story_discription, status } = req.body;
    response = { status: 0, res: "Something went wrong !!" };

    let columns = {};
    if (status) {
        columns.status = status;
    }

    if (!story_discription) {
        response = { status: 2, res: "Story is required" };
    } else {
        columns.story = story_discription;
    } if (!lesson_id) {
        response = { status: 2, res: "Lesson is required" };
    } else {
        columns.lesson_id = lesson_id;
    }
    if (!phase_id) {
        response = { status: 2, res: "Phase is required" };
    } else {
        columns.phase_id = phase_id;
    }

    if (response.status != 2) {
        try {
            if (typeof id != 'undefined') {
                result = await sql.update('rapo_story', 'id', id, columns);
                response = { status: 1, res: " Updated Successfully !!" };
            } else {
                result = await sql.insert('rapo_story', columns);
                response = { status: 1, res: "Inserted Successfully !!" };
            }
        } catch (error) {
        }
    }

    res.send(JSON.stringify(response));
}

const Adminfinding_the_gems_addSET = async (req, res) => {
    const { id, phase_id, lesson_id, questions, config, status } = req.body;
    response = { status: 0, res: "Something went wrong !!" };

    let columns = {};
    if (status) {
        columns.status = status;
    }

    if (!phase_id) {
        response = { status: 2, res: "Phase is required" };
    } else {
        columns.phase_id = phase_id;
    } if (!lesson_id) {
        response = { status: 2, res: "Lesson is required" };
    } else {
        columns.lesson_id = lesson_id;
    } if (!questions) {
        response = { status: 2, res: "Quesrtion is required" };
    } else {
        columns.question = questions;
    } if (!config) {
        response = { status: 2, res: "Options are required" };
    } else {
        columns.config = config;
    }


    if (response.status != 2) {
        try {
            if (typeof id != 'undefined') {
                result = await sql.update('rapo_finding_the_gem', 'id', id, columns);
                response = { status: 1, res: "Updated Successfully" };
            } else {
                result = await sql.insert('rapo_finding_the_gem', columns);
                response = { status: 1, res: "Inserted Successfully" };
            }
        } catch (error) {
        }
    }

    res.send(JSON.stringify(response));
}

const Adminlisten_select_addSET = async (req, res) => {
    const { id, phase_id, lesson_id, questions, config, status } = req.body;
    response = { status: 0, res: "Something went wrong !!" };

    let columns = {};
    if (status) {
        columns.status = status;
    }

    if (!phase_id) {
        response = { status: 2, res: "Phase is required" };
    } else {
        columns.phase_id = phase_id;
    } if (!lesson_id) {
        response = { status: 2, res: "Lesson is required" };
    } else {
        columns.lesson_id = lesson_id;
    } if (!questions) {
        response = { status: 2, res: "Quesrtion is required" };
    } else {
        columns.question = questions;
    } if (!config) {
        response = { status: 2, res: "Options are required" };
    } else {
        columns.config = config;
    }


    if (response.status != 2) {
        try {
            if (typeof id != 'undefined') {
                result = await sql.update('rapo_listen_select', 'id', id, columns);
                response = { status: 1, res: "Updated Successfully" };
            } else {
                result = await sql.insert('rapo_listen_select', columns);
                response = { status: 1, res: "Inserted Successfully" };
            }
        } catch (error) {
        }
    }

    res.send(JSON.stringify(response));
}

const AdminVideo_code_addSET = async (req, res) => {
    const { id, phase_id, lesson_id, questions, config, status } = req.body;
    response = { status: 0, res: "Something went wrong !!" };

    let columns = {};
    if (status) {
        columns.status = status;
    }

    if (!phase_id) {
        response = { status: 2, res: "Phase is required" };
    } else {
        columns.phase_id = phase_id;
    } if (!lesson_id) {
        response = { status: 2, res: "Lesson is required" };
    } else {
        columns.lesson_id = lesson_id;
    } if (!questions) {
        response = { status: 2, res: "Quesrtion is required" };
    } else {
        columns.question = questions;
    } if (!config) {
        response = { status: 2, res: "Options are required" };
    } else {
        columns.config = config;
    }


    if (response.status != 2) {
        try {
            if (typeof id != 'undefined') {
                result = await sql.update('rapo_video_code', 'id', id, columns);
                response = { status: 1, res: "Updated Successfully" };
            } else {
                result = await sql.insert('rapo_video_code', columns);
                response = { status: 1, res: "Inserted Successfully" };
            }
        } catch (error) {
        }
    }

    res.send(JSON.stringify(response));
}

const AdminAnswer_the_questions_addSET = async (req, res) => {
    const { id, phase_id, lesson_id, questions, config, status } = req.body;
    response = { status: 0, res: "Something went wrong !!" };

    let columns = {};
    if (status) {
        columns.status = status;
    }

    if (!phase_id) {
        response = { status: 2, res: "Phase is required" };
    } else {
        columns.phase_id = phase_id;
    } if (!lesson_id) {
        response = { status: 2, res: "Lesson is required" };
    } else {
        columns.lesson_id = lesson_id;
    } if (!questions) {
        response = { status: 2, res: "Quesrtion is required" };
    } else {
        columns.question = questions;
    } if (!config) {
        response = { status: 2, res: "Options are required" };
    } else {
        columns.config = config;
    }


    if (response.status != 2) {
        try {
            if (typeof id != 'undefined') {
                result = await sql.update('rapo_answere_question', 'id', id, columns);
                response = { status: 1, res: "Updated Successfully" };
            } else {
                result = await sql.insert('rapo_answere_question', columns);
                response = { status: 1, res: "Inserted Successfully" };
            }
        } catch (error) {
        }
    }

    res.send(JSON.stringify(response));
}

const AdminAddconversationSET = async (req, res) => {
    const { id, phase_id, lesson_id, conversation1, status } = req.body;
    response = { status: 0, res: "Something went wrong !!" };

    let columns = {};
    if (status) {
        columns.status = status;
    }

    if (!conversation1) {
        response = { status: 2, res: "conversation is required" };
    } else {
        columns.conversation1 = conversation1;
    }
    if (!lesson_id) {
        response = { status: 2, res: "Lesson is required" };
    } else {
        columns.lesson_id = lesson_id;
    } if (!phase_id) {
        response = { status: 2, res: "Phase is required" };
    } else {
        columns.phase_id = phase_id;
    }


    if (response.status != 2) {
        try {
            if (typeof id != 'undefined') {
                result = await sql.update('repo_conversation', 'id', id, columns);
                response = { status: 1, res: "Updated Successfully" };
            } else {
                result = await sql.insert('repo_conversation', columns);
                response = { status: 1, res: "Inserted Successfully" };
            }
        } catch (error) {
        }
    }

    res.send(JSON.stringify(response));
}

const AdminAddFindCorrectSentenceSET = async (req, res) => {
    const { id, phase_id, lesson_id, questions, config, status } = req.body;
    response = { status: 0, res: "Something went wrong !!" };

    let columns = {};
    if (status) {
        columns.status = status;
    }

    if (!phase_id) {
        response = { status: 2, res: "Phase is required" };
    } else {
        columns.phase_id = phase_id;
    } if (!lesson_id) {
        response = { status: 2, res: "Lesson is required" };
    } else {
        columns.lesson_id = lesson_id;
    } if (!questions) {
        response = { status: 2, res: "Quesrtion is required" };
    } else {
        columns.question = questions;
    } if (!config) {
        response = { status: 2, res: "Options are required" };
    } else {
        columns.config = config;
    }


    if (response.status != 2) {
        try {
            if (typeof id != 'undefined') {
                result = await sql.update('repo_correct_sentence', 'id', id, columns);
                response = { status: 1, res: "Updated Successfully" };
            } else {
                result = await sql.insert('repo_correct_sentence', columns);
                response = { status: 1, res: "Inserted Successfully" };
            }
        } catch (error) {
        }
    }

    res.send(JSON.stringify(response));
}

const GeteditTipsSET = async (req, res) => {
    const { id, title_name, youtube_link, status } = req.body;
    response = { status: 0, res: "Something went wrong !!" };

    let columns = {};
    if (status) {
        columns.status = status;
    }

    if (!title_name) {
        response = { status: 2, res: "Title is required !!" };
    } else {
        columns.title_name = title_name;
    } if (!youtube_link) {
        response = { status: 2, res: "Youtube is required" };
    } else {
        columns.youtube_link = youtube_link;
    }
    if (response.status != 2) {
        try {
            if (typeof id != 'undefined') {
                result = await sql.update('repo_tips', 'id', id, columns);
                response = { status: 1, res: "Updated Successfully" };
            } else {
                result = await sql.insert('repo_tips', columns);
                response = { status: 1, res: "Inserted Successfully" };
            }
        } catch (error) {
        }
    }

    res.send(JSON.stringify(response));
}

const AdminNews_SET = async (req, res) => {
    const { id, news_title, news_details, status } = req.body;
    response = { status: 0, res: "Something went wrong !!" };

    let columns = {};
    if (status) {
        columns.status = status;
    }

    if (!news_details) {
        response = { status: 2, res: "News Details is required !!" };
    } else {
        columns.news_details = news_details;
    } if (!news_title) {
        response = { status: 2, res: "News Title is required !!" };
    } else {
        columns.news_title = news_title;
    }

    if (response.status != 2) {
        try {
            if (typeof id != 'undefined') {
                result = await sql.update('rapo_news', 'id', id, columns);
                response = { status: 1, res: "Updated Successfully" };
            } else {
                result = await sql.insert('rapo_news', columns);
                response = { status: 1, res: "Inserted Successfully" };
            }
        } catch (error) {
        }
    }

    res.send(JSON.stringify(response));
}

const adminGetArtical_SET = async (req, res) => {
    const { id, title_name, artical_disc, status } = req.body;
    response = { status: 0, res: "Something went wrong !!" };

    let columns = {};
    if (status) {
        columns.status = status;
    }

    if (!artical_disc) {
        response = { status: 2, res: "Artical Details is required !!" };
    } else {
        columns.artical_disc = artical_disc;
    } if (!title_name) {
        response = { status: 2, res: "Artical Title is required !!" };
    } else {
        columns.title_name = title_name;
    }

    if (response.status != 2) {
        try {
            if (typeof id != 'undefined') {
                result = await sql.update('repo_articals', 'id', id, columns);
                response = { status: 1, res: "Updated Successfully" };
            } else {
                result = await sql.insert('repo_articals', columns);
                response = { status: 1, res: "Inserted Successfully" };
            }
        } catch (error) {
        }
    }

    res.send(JSON.stringify(response));
}

const AdminEditVideos_SET = async (req, res) => {
    const { id, video_title, video_link, question, config, status } = req.body;
    response = { status: 0, res: "Something went wrong !!" };

    let columns = {};
    if (status) {
        columns.status = status;
    }

    if (!config) {
        response = { status: 2, res: "Options is required !!" };
    } else {
        columns.config = config;
    } if (!question) {
        response = { status: 2, res: "Questions is required !!" };
    } else {
        columns.question = question;
    }
    if (!video_link) {
        response = { status: 2, res: "Video Links is required !!" };
    } else {
        columns.video_link = video_link;
    } if (!video_title) {
        response = { status: 2, res: "Video Title is required !!" };
    } else {
        columns.video_title = video_title;
    }

    if (response.status != 2) {
        try {
            if (typeof id != 'undefined') {
                result = await sql.update('repo_video_practice', 'id', id, columns);
                response = { status: 1, res: "Updated Successfully" };
            } else {
                result = await sql.insert('repo_video_practice', columns);
                response = { status: 1, res: "Inserted Successfully" };
            }
        } catch (error) {
        }
    }

    res.send(JSON.stringify(response));
}

const AdminEditAudio_SET = async (req, res) => {
    const { id, audio_title, audio_file, question, config, status } = req.body;
    response = { status: 0, res: "Something went wrong !!" };

    let columns = {};
    if (status) {
        columns.status = status;
    }

    if (!config) {
        response = { status: 2, res: "Options is required !!" };
    } else {
        columns.config = config;
    } if (!question) {
        response = { status: 2, res: "Questions is required !!" };
    } else {
        columns.question = question;
    }
    if (!audio_file) {
        response = { status: 2, res: "Upload Video Links is required !!" };
    } else {
        columns.audio_file = audio_file;
    } if (!audio_title) {
        response = { status: 2, res: "Audio Title is required !!" };
    } else {
        columns.audio_title = audio_title;
    }

    if (response.status != 2) {
        try {
            if (typeof id != 'undefined') {
                result = await sql.update('repo_video_practice', 'id', id, columns);
                response = { status: 1, res: "Updated Successfully" };
            } else {
                result = await sql.insert('repo_video_practice', columns);
                response = { status: 1, res: "Inserted Successfully" };
            }
        } catch (error) {
        }
    }

    res.send(JSON.stringify(response));
}

const AdminGetBook_set = async (req, res) => {
    const { id, book_name, status } = req.body;
    response = { status: 0, res: "Something went wrong !!" };

    let columns = {};
    if (status) {
        columns.status = status;
    }

    if (!book_name) {
        response = { status: 2, res: "Options is required !!" };
    } else {
        columns.book_name = book_name;
    }


    if (response.status != 2) {
        try {
            if (typeof id != 'undefined') {
                result = await sql.update('repo_books', 'id', id, columns);
                response = { status: 1, res: "Updated Successfully" };
            } else {
                result = await sql.insert('repo_books', columns);
                response = { status: 1, res: "Inserted Successfully" };
            }
        } catch (error) {
        }
    }

    res.send(JSON.stringify(response));
}

const AdminGetaddchapter_set = async (req, res) => {
    const { id, book_id, lession_title, lession_details, status } = req.body;
    response = { status: 0, res: "Something went wrong !!" };

    let columns = {};
    if (status) {
        columns.status = status;
    }

    if (!lession_details) {
        response = { status: 2, res: "Lessons Details required !!" };
    } else {
        columns.lession_details = lession_details;
    }
    if (!lession_title) {
        response = { status: 2, res: "Lessons Title required !!" };
    } else {
        columns.lession_title = lession_title;
    }

    if (!book_id) {
        response = { status: 2, res: "Select Book Name required !!" };
    } else {
        columns.book_id = book_id;
    }


    if (response.status != 2) {
        try {
            if (typeof id != 'undefined') {
                result = await sql.update('repo_book_lessions', 'id', id, columns);
                response = { status: 1, res: "Updated Successfully" };
            } else {
                result = await sql.insert('repo_book_lessions', columns);
                response = { status: 1, res: "Inserted Successfully" };
            }
        } catch (error) {
        }
    }

    res.send(JSON.stringify(response));
}


module.exports = {
    login, logout, AuthLogin, signUp, verifyOTP,
    home, myProfile, basicCourse, Rearrangement, public_profile, editProfile, private_profile, challange, maintenance, apptips, news, Conversation, fill_code_videos,
    artical, addUser, artical_details, game, Videos, videos_details, type_questions, ask_a_questions, books, books_details, book_open, AdminLogin, AdminAnsToQuestion, my_friends,
    UsersList, GetQuestions, adminHome, peactice, all_anwers, type_answers, refer_friends, page_about, helpline, answer_the_questions, finding_the_gems,
    adminLoginPage, getUserList, AdminEditSingleUser, page_chat, fill_in_the_blank, find_correct_sentence, listen_select_options, contest,
    GetTips, GeteditTips, adminGetArtical, adminGetArticaledit, adminGetVideos, AdminEditVideos, story, listen_and_type,
    AdminGetAudio, AdminEditAudio, AdminGetBook, AdminGetBlank, AdminEditBlank, AdminGetrearrangements,

    // ------------------------------- Admin functions ------------------ ///
    adminListPhase, adminListLessons, AdminFindCorrectSentence, AdminAddFindCorrectSentence, AdminListenTypeList, AdminEditListenType, AdminConversationList, AdminAddconversation,
    AdminStoryList, AdminAddStory, AdminAnswer_the_questions_list, AdminAnswer_the_questions_add, Adminfinding_the_gems_list, Adminfinding_the_gems_add,
    Adminlisten_select_list, Adminlisten_select_add, AdminVideo_code_list, AdminVideo_code_add, AdminNews_list, AdminNews_add, Admin_Contest_list,

    // ADMIN API
    updateStatus, deleteEntity, AdminEditAudio_SET,
    AdminBlankSet, GeteditTipsSET, AdminNews_SET, adminGetArtical_SET, AdminGetBook_set, AdminGetchapter, AdminGetaddchapter, AdminGetaddchapter_set,

    adminListPhaseAPI, adminListPhaseAPI_Set, adminListLessonsAPI, adminListLessonAPI_Set, AdminGetrearrangementsAPI, AdminEditrearrangementsAPI_SET, AdminEditListenTypeSET,
    AdminAddStorySET, Adminfinding_the_gems_addSET, Adminlisten_select_addSET, AdminVideo_code_addSET, AdminAnswer_the_questions_addSET, AdminAddconversationSET
    , AdminAddFindCorrectSentenceSET, AdminEditVideos_SET
};