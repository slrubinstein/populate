'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router
  .get('/', passport.authenticate('facebook', {
    scope: ['email', 'public_profile', 'user_friends'],
    failureRedirect: '/signup',
    session: false
  }))

  .get('/callback', passport.authenticate('facebook', {
    // successRedirect for remote client
    // successRedirect: 'http://192.168.1.4:9100/#/answer/home',
    failureRedirect: '/signup',
    session: false
  }), auth.setTokenCookie);

module.exports = router;