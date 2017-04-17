'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var app = express();
var port = 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Users = require('./user/Model');
var expressJWT = require('express-jwt');

//Connect to mongodb
mongoose.connect('mongodb://localhost/UserDB');

//connection and error checking
mongoose.connection.once('open',function () {
    console.log("Connection has been made");
}).on('error',function (error) {
    console.log("Connection Error:",error);
});


//body parser middleware
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


//passport init
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', require('./user'));

app.listen(port, function () {
    console.log('Running server on ' + port);
});

