'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Add a question to a User's questions
 */
exports.addQuestion = function(req, res, next) {
  var userId = req.user._id;
  var questionId = req.body.questionId;
  User.findById(userId, function (err, user) {
    user.myQuestions.push(questionId);
    user.save(function(err) {
      if (err) return next(err);
      res.send(200);
    });
  });
}

/**
 * Add a question to a User's questions
 */
exports.addQuestion = function(req, res, next) {
  var userId = req.user._id;
  var questionId = req.body.questionId;
  var selectedFriends = req.body.selectedFriends;

  User.findById(userId, function (err, user) {
    user.myQuestions.push(questionId);
    user.assignQuestionToFriends(selectedFriends, questionId);
    user.save(function(err) {
      if (err) return next(err);
      res.send(200);
    });
  });
}

/**
 * Add a friend to a User's friends
 */
exports.addFriend = function(req, res, next) {
  var userId = req.user._id;
  var friendId = req.body.friendId;

  User.findById(userId, function (err, user) {
    if (user.friends.indexOf(friendId) === -1) {
      user.friends.push(friendId);
    }
    user.save(function(err) {
      if (err) return next(err);
      res.send(200);
    });
  });
}

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Load questions
 */
exports.loadQuestionQueue = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }).populate('questionQueue')
    .exec(function(err, user) {
      if (err) return next(err);
      res.json(user);
  });
};

/**
 * Load questions
 */
exports.pastQuestions = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, function(err, user) {
    if (err) return next(err);
    user.filterInactiveQuestions()
  })
    .populate('myQuestions questionsAnswered')
    .exec(function(err, user) {
      if (err) return next(err);
      res.json(user);
  });
};

/**
 * Load friends
 */
exports.loadFriends = function(req, res, next) {
  var userId = req.user._id;
  var friendIds = req.body.friendIds;
  // find current logged in user
  User.findById(userId, function(err, user) {
    if (err) return next(err);
    // find other users whose facebook ID was returned as a friend
    // by facebook BUT whose _id is not already in the friends array
    User.find({ 'facebook.id': { $in: friendIds },
                _id: { $nin: user.friends }
              }, function(err, newFriends) {
      if (err) return next(err);
      res.json(newFriends);
    });

  });
};


/**
 * Get user friends
 */
exports.getUserFriends = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }).populate('friends')
    .exec(function(err, user) {
      if (err) return next(err);
      res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
