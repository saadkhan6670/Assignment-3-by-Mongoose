'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var app = express();
var port = 3000;
var mongoose = require('mongoose');
var Users = require('./user/Model');


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

app.use('/user', require('./user'));

app.listen(port, function () {
    console.log('Running server on ' + port);
});

app.use(function (err, req, res, next) {
   // // console.error(err.stack);
    res.status(400).send('Something broke!')
});

