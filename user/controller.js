var mongoose = require('mongoose');
var Users = require('./model');
var Promise = require('mpromise');

exports.createUser = function(req, res) {
    mongoose.Promise = global.Promise;

  var NewUser = new Users(req.body);
    NewUser.save (function (err,user) {
        if (err){
            res.send("Cant use same email");}
        else {
        res.json(user);}

    });
};

exports.ShowUser = function (req,res) {
    Users.find({}, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};


exports.logInUser = function (req, res) {
   var email = req.body.email;
   var password = req.body.password;

    Users.findOne({email: email,password :password},function (err,user) {
        if(err ){
            console.log(err);
            res.sendStatus(500);}
        if(!user ){
            return res.status(500).send("No such user");}

            return res.status(200).send("Welcome USer");

    })

};

exports.userProfile = function (req, res){
};