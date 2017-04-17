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

exports.createUser = function(req, res) {

  var NewUser = new Users(req.body);

    NewUser.save (function (err,user) {
        if (err)
            res.send(boom.unauthorized(err));

        res.json(user);

    });
};

exports.ShowUser = function (req,res) {
    Users.find({},function (err , user) {
        if (err) {
            res.send(err)
        }

        else {
            jwt.verify(myToken,'secret' ,function (err,decoded) {
                res.send(decoded);
            });
           // res.send(user);

        }
    })
};



exports.logInUser = function (req,res) {

   var email = req.body.email;
   var password = req.body.password;

    Users.findOne({
        email: email
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (user.password != password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign({
                    id: user._id ,
                    email:email}, 'secret', {
                    expiresIn: 10 * 60000 // expires in 10 mins
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        }

    });

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

exports.give = function (req,res,next) {
    jwt.verify(myToken, 'secret', function(err, decoded) {
        if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            next();
        }
    });

};