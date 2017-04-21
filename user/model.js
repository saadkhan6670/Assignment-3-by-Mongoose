'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator');

var emailValidate =[
    validate({
        validator : 'matches',
        arguments:/^[\w.]+[@]+[a-zA-Z]+.com$/,
        message:'Invalid Email'
    })
];

var phoneValidate =[
    validate({
        validator : 'matches',
        arguments:/^923[1-9]{9}$/,
        message:'Invalid Phone'
    })
];

var UserSchema = new Schema ({
    firstname : String,
    lastname : String,
    email : { type:String, validate:emailValidate, unique: true, lowercase:true, message:'Invalid email' },
    phone : {type:Number, validate:phoneValidate, message:'Invalid Phone'},
    password : String

});

module.exports = mongoose.model('Users', UserSchema);