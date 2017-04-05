var mongoose = require('mongoose');

var Users = require('./model');

exports.createUser = function(req, res) {
    mongoose.Promise = global.Promise;

  var NewUser = new Users(req.body);
    NewUser.save (function (err,user) {

        if (err)
            res.send(err);
        res.json(user);

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
};



exports.userProfile = function (req, res){


        //here filter method is used for getting an object from an array
            var result  = arr.filter(function(val){
                return val.email == req.params.email;

            });
            return result? res.send(result) : null;
};