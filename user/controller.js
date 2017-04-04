
var cache = require('memory-cache');
var mongoose = require('mongoose');

var User = mongoose.model('Users');

exports.createUser = function(req, res) {
  var NewUser = new User(req.body);
    NewUser.save (function (err,user) {

        if (err)
            res.send("Cant Create User ! TRY AGAIN");
        res.send(user)

    })

};



exports.logInUser = function (req, res) {

    var LoginCredential = req.body;
    var validity = false;

    //For Each is used for getting data from an array
    arr.forEach(function (login) {

        var logInEmail = login.email;
    var logInPass = login.password;

        if(LoginCredential.email == logInEmail && LoginCredential.password  == logInPass)
        {
            validity = true;
        }
    });
 if(!validity){
     res.send("Error! No user found");
 }
 else {
     res.send("Welcome User");
 }
};



exports.userProfile = function (req, res){


        //here filter method is used for getting an object from an array
            var result  = arr.filter(function(val){
                return val.email == req.params.email;

            });
            return result? res.send(result) : null;
};