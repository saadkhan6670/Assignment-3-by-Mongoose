var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var Promise = require('mpromise');

mongoose.Promise = global.Promise;

exports.createUser = function(req, res) {

  var NewUser = new Users(req.body);
    NewUser.save (function (err,user) {
        if (err)
            res.send("Error:" + err);

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
   var email = req.body.email;
   var password = req.body.password;

    Users.findOne({email: email,password :password},function (err,user) {
        if(err ){
            console.log(err);
            res.sendStatus(500);}
        if(!user ){
             res.send("No such user");}

             res.send("Welcome User");

    })

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
    Users.remove({},function (err,user) {
        if (err)
            console.log(err);
        res.send("Users deleted");

    })
};