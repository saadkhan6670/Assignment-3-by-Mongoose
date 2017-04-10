'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator');

var emailValidate =[
    validate({
        validator : 'matches',
        arguments:/^[\w.]+[@]+[a-zA-Z]+.com$/,
        message:'Must be a valid email'
    })
];

var phoneValidate =[
    validate({
        validator : 'matches',
        arguments:/^923[1-9]{9}$/,
        message: ' must be a valid phone '
    })
];

var UserSchema = new Schema ({
    firstname : String,
    lastname : String,
    email : { type:String, unique: true, lowercase:true, validate:emailValidate },
    phone : {type:Number, validate:phoneValidate},
    password : String

});

module.exports = mongoose.model('Users', UserSchema);