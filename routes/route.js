const express = require("express");
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// Initialize Express app
const app = express();
const { isLoggedIn, isLoggedOut, isAdminLogin, isAdminLoggedOut } = require("../middleware/middleware");

// Middleware setup
app.use(session({
    secret: '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',
    resave: false,
    saveUninitialized: false,
}));
app.use(cookieParser());


// Import and configure Passport strategies (Google OAuth2 in this case)
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(new GoogleStrategy({
    clientID: 'your_google_client_id',
    clientSecret: 'your_google_client_secret',
    callbackURL: 'http://localhost:3000/auth/login'
},
    (accessToken, refreshToken, profile, done) => {
        // Save user data in session or database
        return done(null, profile);
    }
));


passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Import and use your routes
const Router = express.Router();
const {
    customLogin,

    postUserLogin,
    login, home, AuthLogin,
    logout, myProfile, signUp,
    verifyOTP, basicCourse, Rearrangement, public_profile, editProfile, private_profile, challange, maintenance, apptips, news, Conversation, listen_select_options,
    artical, artical_details, game, Videos, ask_a_questions, videos_details, books, books_details, book_open, addUser, AdminLogin, AdminAnsToQuestion, fill_code_videos,
    my_friends, UsersList, GetQuestions, adminHome, peactice, type_questions, all_anwers, type_answers,type_answers_SET, refer_friends, page_about, helpline, finding_the_gems,
    adminLoginPage, getUserList, AdminEditSingleUser, fill_in_the_blank, find_correct_sentence, answer_the_questions, contest,
    GetTips, GeteditTips, adminGetArtical, adminGetArticaledit, adminGetVideos, AdminEditVideos, AdminGetAudio, listen_and_type, human_hang_game ,Ask_teacher_SET,
    AdminEditAudio, AdminGetBlank, AdminEditBlank, AdminGetrearrangements, story, AdminGetBook, video_test, game_tea, start_game_tea, ConversationPlay,news_details,page_start,page_login_app,

    // -------------------------------- Admin Functions ------------------------------//
    adminListPhase, adminListLessons, AdminFindCorrectSentence, AdminAddFindCorrectSentence, AdminListenTypeList, AdminEditListenType, AdminConversationList, AdminAddconversation,
    AdminStoryList, AdminAddStory, AdminAnswer_the_questions_list, AdminAnswer_the_questions_add, Adminfinding_the_gems_list, Adminfinding_the_gems_add, Adminlisten_select_list, Adminlisten_select_add,
    AdminVideo_code_list, AdminVideo_code_add, AdminNews_list, AdminNews_add, Admin_Contest_list,story_view,
    Ask_teacher, word_of_the_word, tip_of_the_day, homework,Admin_tea_list,Admin_tea_add,Admin_tea_game_SET,chat_community,chat_community_set,
    // ======================== homework ===========================
    homeword_fill_in_the_blank, homework_Rearrangement, homework_find_correct_sentence, homework_listen_and_type, homework_Conversation, homework_story,homework_story_view, homework_answer_the_questions, homework_finding_the_gems, homework_listen_select_options, homework_fill_code_videos,


    // ADMIN APIS
    updateStatus, deleteEntity, AdminEditAudio_SET,Admin_spellings_list,Admin_spellings_add,Admin_spellings_SET,type_questions_set,
    AdminBlankSet, GeteditTipsSET, AdminNews_SET, adminGetArtical_SET, AdminEditVideos_SET, AdminGetBook_set, AdminGetchapter, AdminGetaddchapter, AdminGetaddchapter_set,

    adminListPhaseAPI, adminListPhaseAPI_Set, adminListLessonsAPI, adminListLessonAPI_Set, AdminGetrearrangementsAPI, AdminEditrearrangementsAPI_SET, AdminEditListenTypeSET
    , AdminAddStorySET, Adminfinding_the_gems_addSET, Adminlisten_select_addSET, AdminVideo_code_addSET, AdminAnswer_the_questions_addSET, AdminAddconversationSET, AdminAddFindCorrectSentenceSET
    // message 
    , AdminAQBS_chat, AdminAQBS_read,AdminAQBS_SET, AdminAQBS_add, Admin_WOTD_chat,Admin_WOTD_SET, Admin_TOTD_chat,Admin_TOTB_SET, Admin_TOTB_add
} = require("../controller/controller");
Router.route('/page-start').get(page_start);
Router.route('/page-login').get(page_login_app);
Router.route('/custom-login').get(customLogin);

Router.route('/').get(isLoggedIn, home);
Router.route('/my-profile').get(isLoggedIn, myProfile);
Router.route('/basic-course').get(isLoggedIn, basicCourse);
Router.route('/re-arrangement/:pahse_id/:lesson_id').get(isLoggedIn, Rearrangement);
Router.route('/edit-profile').get(isLoggedIn, editProfile);
Router.route('/public-profile').get(isLoggedIn, public_profile);
Router.route('/practice').get(isLoggedIn, peactice);
Router.route('/private-profile').get(isLoggedIn, private_profile);
Router.route('/challange').get(isLoggedIn, challange);
Router.route('/maintenance').get(isLoggedIn, maintenance);
Router.route('/app-tips').get(isLoggedIn, apptips);
Router.route('/news').get(isLoggedIn, news);
Router.route('/new-details/:id').get(isLoggedIn, news_details);
Router.route('/conversation/:pahse_id/:lesson_id').get(isLoggedIn, Conversation);
Router.route('/conversation-play/:lesson_id/:parent_id').get(isLoggedIn, ConversationPlay);
// Router.route('/conversation/:pahse_id/:lesson_id').get(isLoggedIn, Conversation);
Router.route('/artical').get(isLoggedIn, artical);
Router.route('/artical-details/:id').get(isLoggedIn, artical_details);
Router.route('/game').get(isLoggedIn, game);
Router.route('/videos').get(isLoggedIn, Videos);
Router.route('/videos-details/:id').get(isLoggedIn, videos_details);
Router.route('/books').get(isLoggedIn, books);
Router.route('/books-details/:id').get(isLoggedIn, books_details);
Router.route('/book-open/:book_id/:id').get(isLoggedIn, book_open);
Router.route('/my-friends').get(isLoggedIn, my_friends);

//  ================ Ask student Questions =================== //
Router.route('/ask-a-questions').get(isLoggedIn, ask_a_questions);
Router.route('/type-questions').get(isLoggedIn, type_questions);
Router.route('/type-questions-set').post(isLoggedIn, type_questions_set);

Router.route('/all-anwers/:id').get(isLoggedIn, all_anwers);
Router.route('/type-answers/:id').get(isLoggedIn, type_answers);
Router.route('/type-answers-set').post(isLoggedIn, type_answers_SET);

Router.route('/contest').get(isLoggedIn, contest);


Router.route('/refer-friends').get(isLoggedIn, refer_friends);
Router.route('/app-about').get(isLoggedIn, page_about);
Router.route('/helpline').get(isLoggedIn, helpline);
// Router.route('/page-chat').get(isLoggedIn, page_chat);
Router.route('/find-correct-sentence/:pahse_id/:lesson_id').get(isLoggedIn, find_correct_sentence);
Router.route('/answer-the-questions/:pahse_id/:lesson_id').get(isLoggedIn, answer_the_questions);
Router.route('/finding-the-gems/:pahse_id/:lesson_id').get(isLoggedIn, finding_the_gems);
Router.route('/listen-select-options/:pahse_id/:lesson_id').get(isLoggedIn, listen_select_options);
Router.route('/fill-code-videos/:pahse_id/:lesson_id').get(isLoggedIn, fill_code_videos);
Router.route('/story/:pahse_id/:lesson_id').get(isLoggedIn, story);
Router.route('/story-view/:id').get(isLoggedIn, story_view);
Router.route('/listen-and-type/:pahse_id/:lesson_id').get(isLoggedIn, listen_and_type);
Router.route('/fill-in-the-blank/:pahse_id/:lesson_id').get(isLoggedIn, fill_in_the_blank);
Router.route('/videos-test/:id').get(isLoggedIn, video_test);
Router.route('/game-tea').get(isLoggedIn, game_tea);
Router.route('/start-tea-game').get(isLoggedIn, start_game_tea);
Router.route('/Human-hang-game').get(isLoggedIn, human_hang_game);

//   ======================== App message  ================================= //
Router.route('/Ask-teacher').get(isLoggedIn, Ask_teacher);
Router.route('/Ask-teacher_SET').post(isLoggedIn, Ask_teacher_SET);

Router.route('/word-of-the-day').get(isLoggedIn, word_of_the_word);

Router.route('/tip-of-the-day').get(isLoggedIn, tip_of_the_day);

Router.route('/Chat-community').get(isLoggedIn, chat_community);
Router.route('/Chat-community-SET').post(isLoggedIn, chat_community_set);


//  ========================= homework =========================================== //
Router.route('/HomeWork').get(isLoggedIn, homework);

//    ---------------  Home Work Details Page --------------- //
Router.route('/homework-fill-in-the-blank').get(isLoggedIn, homeword_fill_in_the_blank);
Router.route('/homework-re-arrangement').get(isLoggedIn, homework_Rearrangement);
Router.route('/homework-find-correct-sentence').get(isLoggedIn, homework_find_correct_sentence);
Router.route('/homework-listen-and-type').get(isLoggedIn, homework_listen_and_type);
Router.route('/homework-conversation').get(isLoggedIn, homework_Conversation);
Router.route('/homework-story').get(isLoggedIn, homework_story);
Router.route('/homework-story-view').get(isLoggedIn, homework_story_view);
Router.route('/homework-answer-the-questions').get(isLoggedIn, homework_answer_the_questions);
Router.route('/homework-finding-the-gems').get(isLoggedIn, homework_finding_the_gems);
Router.route('/homework-listen-select-options').get(isLoggedIn, homework_listen_select_options);
Router.route('/homework-fill-code-videos').get(isLoggedIn, homework_fill_code_videos);






// User
Router.route("/login").get(isLoggedOut, page_login_app).post(postUserLogin);
Router.route("/sign-up").get(isLoggedOut, signUp).post(isLoggedOut, );
Router.route("/verify-login-otp").get(isLoggedOut, verifyOTP);
Router.route("/logout").get(isLoggedIn, logout);
Router.route('/auth/google').get(isLoggedOut, passport.authenticate('google', { scope: ['profile', 'email'] }));
Router.route("/auth/login").get(passport.authenticate('google', { failureRedirect: '/' }), AuthLogin);


// Admin
Router.route('/admin/change-query-status').post(updateStatus);
Router.route('/admin/delete-entity').post(deleteEntity);


Router.route("/admin/add-user").post(addUser);
Router.route("/admin/login").get(isAdminLoggedOut, adminLoginPage).post(isAdminLoggedOut, AdminLogin);
Router.route("/admin/answer-to-question").post(AdminAnsToQuestion);
Router.route("/admin/get-user").get(getUserList).post(UsersList);

Router.route("/admin/get-user/:uid").get(AdminEditSingleUser);

Router.route("/admin/get-question").post(GetQuestions);

Router.route("/admin/").get(isAdminLogin, adminHome);


Router.route("/admin/artical-list").get(adminGetArtical);
Router.route("/admin/get-edit-artical").get(adminGetArticaledit);
Router.route("/admin/get-edit-artical/:id").get(adminGetArticaledit);
Router.route("/admin/set-edit-artical").post(adminGetArtical_SET);

Router.route("/admin/video-list").get(adminGetVideos);
Router.route("/admin/get-edit-video").get(AdminEditVideos);
Router.route("/admin/get-edit-video/:id").get(AdminEditVideos);
Router.route("/admin/set-edit-video").post(AdminEditVideos_SET);
//  ------------------------- Audio ---------------------- ////
Router.route("/admin/get-audio-list").get(AdminGetAudio);
Router.route("/admin/get-edit-audio").get(AdminEditAudio);
Router.route("/admin/get-edit-audio/:id").get(AdminEditAudio);
Router.route("/admin/set-edit-audio_set").post(AdminEditAudio_SET);

//  ------------------------- Books ---------------------- ////
Router.route("/admin/get-book-list").get(AdminGetBook);
Router.route("/admin/set-book-list").post(AdminGetBook_set);

// ----------------------- chapter --------------------- //
Router.route("/admin/get-chapter-list").get(AdminGetchapter);
Router.route("/admin/get-chapter-add").get(AdminGetaddchapter);
Router.route("/admin/set-chapter-add").post(AdminGetaddchapter_set);


// Router.route("/admin/get-edit-book").get(AdminEditBook);

//  ------------------------- Tips ---------------------- ////
Router.route("/admin/get-tip").get(GetTips);
Router.route("/admin/get-edit-tip").get(GeteditTips);
Router.route("/admin/get-edit-tip/:id").get(GeteditTips);
Router.route("/admin/set-edit-tip").post(GeteditTipsSET);

//  ------------------------- Add Phase ------------------------- //
Router.route("/admin/get-phace-list").get(adminListPhase).post(adminListPhaseAPI);
Router.route("/admin/set-phace-list").post(adminListPhaseAPI_Set);
//  ------------------------- Add lessons ------------------------- //
Router.route("/admin/get-lessons-list").get(adminListLessons).post(adminListLessonsAPI);
Router.route("/admin/set-lesson-list").post(adminListLessonAPI_Set);

//  ------------------------- Fill in the Blanks ---------------------- ////
Router.route("/admin/get-blank-list").get(AdminGetBlank);
Router.route("/admin/get-edit-blank").get(AdminEditBlank);
Router.route("/admin/get-edit-blank/:id").get(AdminEditBlank);
Router.route("/admin/set-edit-blank").post(AdminBlankSet);

//  ------------------------- rearrangements ---------------------- ////
Router.route("/admin/get-rearrangements-list").get(AdminGetrearrangements).post(AdminGetrearrangementsAPI);
Router.route("/admin/set-rearrangements-list").post(AdminEditrearrangementsAPI_SET);

//  ------------------------- find out the correct sentence ------------------------- //
Router.route("/admin/get-find-correct-sentence").get(AdminFindCorrectSentence);
Router.route("/admin/get-add-find-correct-sentence").get(AdminAddFindCorrectSentence);
Router.route("/admin/get-add-find-correct-sentence/:id").get(AdminAddFindCorrectSentence);
Router.route("/admin/set-find-correct-sentence-data").post(AdminAddFindCorrectSentenceSET);
//  ------------------------- Listen & Type (sentences / words) ------------------------- //
Router.route("/admin/get-Listen-&-Type-list").get(AdminListenTypeList);
Router.route("/admin/get-Edit-Listen-&-Type").get(AdminEditListenType);
Router.route("/admin/get-Edit-Listen-&-Type/:id").get(AdminEditListenType);
Router.route("/admin/set-Edit-Listen-&-Type").post(AdminEditListenTypeSET);

//  ------------------------- conversation ------------------------- //
Router.route("/admin/get-conversation-list").get(AdminConversationList);
Router.route("/admin/get-conversation-add").get(AdminAddconversation);
Router.route("/admin/get-conversation-add/:id").get(AdminAddconversation);
Router.route("/admin/set-conversation-data").post(AdminAddconversationSET);

//  ------------------------- Story ------------------------- //
Router.route("/admin/get-Story-list").get(AdminStoryList);
Router.route("/admin/get-Story-add").get(AdminAddStory);
Router.route("/admin/get-Story-add/:id").get(AdminAddStory);
Router.route("/admin/set-Story-add").post(AdminAddStorySET);


//  ------------------------- Answer-the-questions ------------------------- //
Router.route("/admin/get-answer-the-questions-list").get(AdminAnswer_the_questions_list);
Router.route("/admin/get-answer-the-questions-add").get(AdminAnswer_the_questions_add);
Router.route("/admin/get-answer-the-questions-add/:id").get(AdminAnswer_the_questions_add);
Router.route("/admin/set-answer-the-questions-data").post(AdminAnswer_the_questions_addSET);

//  ------------------------- finding-the-gems ------------------------- //
Router.route("/admin/get-finding-the-gems-list").get(Adminfinding_the_gems_list);
Router.route("/admin/get-finding-the-gems-add").get(Adminfinding_the_gems_add);
Router.route("/admin/get-finding-the-gems-add/:id").get(Adminfinding_the_gems_add);
Router.route("/admin/set-finding-the-gems-add").post(Adminfinding_the_gems_addSET);

//  ------------------------- Listen and select ------------------------- //
Router.route("/admin/get-listen-select-list").get(Adminlisten_select_list);
Router.route("/admin/get-listen-select-add").get(Adminlisten_select_add);
Router.route("/admin/get-listen-select-add/:id").get(Adminlisten_select_add);
Router.route("/admin/set-listen-select-add").post(Adminlisten_select_addSET);

//  ------------------------- Fill the code from video tips ------------------------- //
Router.route("/admin/get-video-code-list").get(AdminVideo_code_list);
Router.route("/admin/get-video-code-add").get(AdminVideo_code_add);
Router.route("/admin/get-video-code-add/:id").get(AdminVideo_code_add);
Router.route("/admin/set-video-code-add").post(AdminVideo_code_addSET);

//  ------------------------- News ------------------------- //
Router.route("/admin/get-news-list").get(AdminNews_list);
Router.route("/admin/get-news-add").get(AdminNews_add);
Router.route("/admin/get-news-add/:id").get(AdminNews_add);
Router.route("/admin/set-news").post(AdminNews_SET);

//  ============================== message sections ============================= //
//-----------------  Ask Questions By Students  --------------------//
Router.route("/admin/Ask-questions-by-students-chat").get(AdminAQBS_chat);
Router.route("/admin/Ask-questions-by-students-read/:get_user_id").get(AdminAQBS_read);
Router.route("/admin/Ask-questions-by-students-SET").post(AdminAQBS_SET);
Router.route("/admin/Ask-questions-by-students-add").get(AdminAQBS_add);


// --------------------- Word of the day ------------------------- //
Router.route("/admin/Word-of-the-day-chat").get(Admin_WOTD_chat);
Router.route("/admin/Word-of-the-day-set").post(Admin_WOTD_SET);

// --------------------- Tip Of the Day ------------------------- //
Router.route("/admin/Tip-of-the-day-chat").get(Admin_TOTD_chat);
Router.route("/admin/Tip-of-the-day-set").post(Admin_TOTB_SET);
Router.route("/admin/Tip-of-the-day-add").get(Admin_TOTB_add);

//  =========================== gaming Sections ======================= //

// ----------------- tea game -------------- //
Router.route("/admin/get-tea-list").get(Admin_tea_list);
Router.route("/admin/get-tea-add").get(Admin_tea_add);
Router.route("/admin/get-tea-add/:id").get(Admin_tea_add);
Router.route("/admin/set-tea-game").post(Admin_tea_game_SET);

// ---------------- Spellings Games ------------ // 
Router.route("/admin/get-spellings-list").get(Admin_spellings_list);
Router.route("/admin/get-spellings-add").get(Admin_spellings_add);
Router.route("/admin/get-spellings-add/:id").get(Admin_spellings_add);
Router.route("/admin/get-spellings-SET").post(Admin_spellings_SET);


Router.route("/admin/hungman-game").post(Admin_spellings_SET);


//  ------------------------- Contest ------------------------- //
Router.route("/admin/get-Contest-list").get(Admin_Contest_list);
// Router.route("/admin/get-news-add").get(AdminNews_add);
// Router.route("/sign-up").get(isLoggedOut, signUp);
// Router.route("/verify-login-otp").get(isLoggedOut, verifyOTP);
app.use(Router);

module.exports = app;
