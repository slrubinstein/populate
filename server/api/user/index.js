'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/addfriend', auth.isAuthenticated(), controller.addFriend);
router.put('/:id/addquestion', auth.isAuthenticated(), controller.addQuestion);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/:id/loadquestions', auth.isAuthenticated(), controller.loadQuestions);
router.post('/', controller.create);
router.post('/:id/load', auth.isAuthenticated(), controller.loadFriends);

module.exports = router;
