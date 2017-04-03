/**
 * Created by saadk on 4/3/2017.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema ({
    firstname : String,
    lastname : String,
    email : String,
    phone : Number,
    password : String

});

var Users = mongoose.model('Users', UserSchema);