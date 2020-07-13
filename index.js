// require express
const express = require('express');
const app = express();

// defining port number
const port = 8000;

// require mongoose file from config for DB connection
const db = require('./config/mongoose');

// require passport for auth
const passport = require('passport');

// require passportJWT for JWT auth usng tokens
const passportJWT = require('./config/passport-jwt-strategy');

// require dotenv for storing API id's 
require('dotenv').config();

// using url encoded for post requests
app.use(express.urlencoded());


// initializing passport
app.use(passport.initialize());
app.use(passport.session());


// use express router
app.use('/', require('./routes'));

// listen request on port 
app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
