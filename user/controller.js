var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var Promise = require('mpromise');
var boom = require('boom');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bearerStrategy = require('passport-http-bearer').Strategy;
var jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt');


passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(username, password, done) {
        Users.findOne({email:username,password:password}, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false);}

            return done(null,user);
        });
    }
));

passport.use(new bearerStrategy({},
    function (token, done) {
        Users.findOne({}, function (err,user) {
            if(!user)
                return done(null,false);
            return done (null,user);

        })
    }

));


mongoose.Promise = global.Promise;

exports.createUser = function(req, res) {

  var NewUser = new Users(req.body);

    NewUser.save (function (err,user) {
        if (err)
            res.send(boom.unauthorized(err));

        res.json(user);

    });
};

exports.ShowUser = function (req,res) {
    Users.findOne({}, function(err, user) {
        if (!user)
            res.send(boom.badRequest('invalid query'));

        res.json(user);
    });
};

exports.logInUser = function (req,res,next) {
    passport.authenticate('local', function (err, user) {
        if (err) {
            return next(err); }

        if (!user) {
            return res.send('Invalid Credentials'); }
            else {
            var myToken = jwt.sign({},'secret');

            res.send('Welcome '+ user.firstname +' Your token for accessing your profile is \n TOKEN:' + myToken);

        }})(req, res, next);

};

//    var email = req.body.email;
//    var password = req.body.password;
//
//     Users.findOne({email: email,password :password},function (err,user) {
//         if(err ){
//             console.log(err);
//             res.sendStatus(500);}
//         if(!user ){
//              res.send("No such user");}
//
//              res.send("Welcome User");
//
//     })
//
// };

exports.userProfile = function (req, res){
    var email = req.params.email;

    Users.findOne ({email:email},function (err,user) {
        if(err ){
            console.log(err);
            res.sendStatus(500);}
        if(!user ){
             res.send("No such user");}

             res.send("Welcome User \n\n "+ user);

    })
};

//remove users from the db
exports.Remove = function (req,res) {
    var id = req.query.access_token.toString();

    Users.remove({id:id},function (err,user) {
        if (err)
            console.log(err);
        res.send("Users  deleted");

    })
};

exports.give = function (req,res) {
    res.send(myToken);

};