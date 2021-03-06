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
router.put('/:id/vote/:questionid', auth.isAuthenticated(), controller.vote);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/:id/loadquestionqueue', auth.isAuthenticated(), controller.loadQuestionQueue);
router.get('/:id/getallquestions', controller.getAllQuestions);
router.get('/:id/pastquestions', auth.isAuthenticated(), controller.pastQuestions);
// router.get('/:id/getfriends', auth.isAuthenticated(), controller.getFriends);
router.post('/', controller.create);
router.post('/:id/loadfriends', auth.isAuthenticated(), controller.loadFriends);

module.exports = router;
