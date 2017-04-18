var express = require('express');
var app = express();
var router = express.Router();
var user = require('./controller');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressJWT =require('express-jwt');

router.use(expressJWT({secret:'secret'}).unless({path: [
    '/user/login-user',
    '/user/create-user' ]}));


router.post('/create-user' , user.createUser);
router.post('/login-user',user.logInUser);

router.get('/remove-user', user.Remove);
router.get('/show-users' , user.ShowUsers);


router.get('/user-profile', user.userProfile);


module.exports = router;

