const PORT = 3000;
const base = require('path');

const express = require('express');
const bodyParser = require("body-parser");
const multer = require('multer');
const cookieParser = require('cookie-parser');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const routes = require("./routes/route");
const path = base.join('C:/xampp/htdocs/english/hello_english/');

const app = express();
const upload = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path));
app.use(express.json());

app.use(upload.array());
app.use(cookieParser());
app.use('/', routes);

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport with Google OAuth2.0
passport.use(new GoogleStrategy({
    clientID: '378702974248-lha07rb920aiq1ah7but0ebgqflqs41o.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/auth/login'
},
    (accessToken, refreshToken, profile, done) => {
        // Save user data in session or database
        return done(null, profile);
    }
));

app.set('view engine', 'ejs');

app.get('*', (req, res) => {
    res.render("./404.ejs");
});

app.listen(PORT, console.log('Serve Started'));