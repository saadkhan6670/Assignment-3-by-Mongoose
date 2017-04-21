var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var Promise = require('mpromise');
var boom = require('boom');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bearerStrategy = require('passport-http-bearer').Strategy;
var jwt = require('jsonwebtoken');

var myToken ;

mongoose.Promise = global.Promise;

exports.createUser = function(req, res,next) {

  var NewUser = new Users(req.body);

    NewUser.save (function (err,user) {
        if (user)
            res.json(user);

        else {
            var err = new Error(err);
            err.status = 403;
            next(err);
        }
    })};

exports.ShowUsers = function (req,res) {
    var decode = jwt.verify(myToken,'secret' ,function (err,decoded,next) {

        Users.find({},function (err,user) {
            if(user)
            res.send(user);

        })

    })};


exports.logInUser = function (req,res,next) {

   var email = req.body.email;
   var password = req.body.password;

    Users.findOne({
        email: email , password:password
    }, function(err, user) {

        if (user) {

                // if user is found and password is right
                // create a token
                myToken = jwt.sign({
                    id: user._id ,
                    email:email}, 'secret', {
                    expiresIn: 10 * 60000 // expires in 10 mins
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: myToken
                });
            }
        else {

            var err2 = new Error('Unauthorized');

            err2.status = 401;
            next(err2);
        }});


    // Users.findOne({email: email,password :password},function (err,user) {
    //     if(err ){
    //         console.log(err);
    //         res.sendStatus(500);}
    //     if(!user ){
    //          res.send("No such user");}
    //
    //          else {
    //          myToken = jwt.sign({
    //             id: user._id,
    //             email: email},'secret',{ expiresIn: '60000' });
    //
    //          res.send(user._id+" Welcome User having TOKEN :  " + myToken);}
    //
    // })

};

exports.userProfile = function (req, res){
    var decode = jwt.verify(myToken,'secret' ,function (err,decoded) {

        Users.findOne({email : decoded.email},function (err,user) {
            if(!user)
                res.send("No User Found");
            res.send(user);

        })

    })};


//remove users from the db
exports.Remove = function (req,res) {
    var id = req.query.access_token.toString();

    Users.remove({id:id},function (err,user) {
        if (err)
            console.log(err);
        res.send("Users  deleted");

    })
};