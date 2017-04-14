var express = require('express');
var router = express.Router();
var user = require('./controller');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


router.post('/create-user' , user.createUser);

router.post('/login-user',user.logInUser);

router.get('/remove-user',passport.authenticate('bearer', { session: false }), user.Remove);
router.get('/show-user' ,passport.authenticate('bearer', { session: false }), user.ShowUser);

router.get('/user-profile/:email',passport.authenticate('bearer', { session: false }), user.userProfile);


module.exports = router;

