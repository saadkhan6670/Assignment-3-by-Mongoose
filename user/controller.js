var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var Promise = require('mpromise');
var boom = require('boom');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;



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
    Users.find({}, function(err, user) {
        if (!user)
            res.send(boom.badRequest('invalid query'));

        res.json(user);
    });
};


exports.logInUser = function (req, res) {

    passport.use(new LocalStrategy({
        usernameField : req.body.email,
        passwordField : req.body.password
        },
        function(username, password, done) {
            Users.findOne({ username: username }, function(err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!user.passwordField(password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        Users.findById(id, function(err, user) {
            done(err, user);
        });
    });
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
    Users.remove({},function (err,user) {
        if (err)
            console.log(err);
        res.send("Users deleted");

    })
};