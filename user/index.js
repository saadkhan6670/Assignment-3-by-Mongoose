var express = require('express');
var router = express.Router();
var user = require('./controller');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


router.post('/create-user' , user.createUser);


router.post('/login-user',user.logInUser, passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login-user',
    failureFlash: true
    }),
    function(req, res) {
    res.redirect('/');

    });

router.get('/remove-user', user.Remove);
router.get('/show-user' , user.ShowUser);

router.get('/user-profile/:email', user.userProfile);


module.exports = router;

