'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema ({
    FirstName : String,
    LastName : String,
    email : { type:String, unique: true },
    phone : Number,
    password : String

});

module.exports = mongoose.model('Users', UserSchema);