
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema ({
    firstname : String,
    lastname : String,
    email : {type:String, unique:true},
    phone : Number,
    password : String

});

module.exports = mongoose.model('Users', UserSchema);