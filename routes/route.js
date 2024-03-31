const express = require("express");
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// Initialize Express app
const app = express();
const { isLoggedIn, isLoggedOut } = require("../middleware/middleware");

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
const { login, home, AuthLogin, logout } = require("../controller/controller");

Router.route('/').get(isLoggedIn, home);
Router.route("/login").get(isLoggedOut, login);
Router.route("/logout").get(isLoggedIn, logout);
Router.route('/auth/google').get(isLoggedOut, passport.authenticate('google', { scope: ['profile', 'email'] }));
Router.route("/auth/login").get(passport.authenticate('google', { failureRedirect: '/' }), AuthLogin);

app.use(Router);

module.exports = app;
