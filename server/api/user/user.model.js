'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var authTypes = ['github', 'twitter', 'facebook', 'google'];
var _ = require('lodash');

var Question = require('../question/question.model');

var UserSchema = new Schema({
  _id: Number,
  name: String,
  email: { type: String, lowercase: true },
  role: {
    type: String,
    default: 'user'
  },
  hashedPassword: String,
  provider: String,
  salt: String,
  facebook: {},
  myQuestionsActive: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  myQuestionsOld: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  friendQuestionsActive: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  friendQuestionsOld: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  friends: Array
});




/**
 * Virtuals
 */
UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// Public profile information
UserSchema
  .virtual('profile')
  .get(function() {
    return {
      'name': this.name,
      'role': this.role
    };
  });

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id,
      'role': this.role
    };
  });

/**
 * Validations
 */

// Validate empty email
UserSchema
  .path('email')
  .validate(function(email) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return email.length;
  }, 'Email cannot be blank');

// Validate empty password
UserSchema
  .path('hashedPassword')
  .validate(function(hashedPassword) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return hashedPassword.length;
  }, 'Password cannot be blank');

// Validate email is not taken
UserSchema
  .path('email')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({email: value}, function(err, user) {
      if(err) throw err;
      if(user) {
        if(self.id === user.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
}, 'The specified email address is already in use.');

var validatePresenceOf = function(value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function(next) {
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1)
      next(new Error('Invalid password'));
    else
      next();
  });

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }

  // assignQuestionToFriends: function (selectedFriends, questionId) {
  //   var thisUser = this;

  //   if (selectedFriends === 'all') {
  //     thisUser.addQsToFriends(this.friends, questionId);
  //   } else {
  //     // if only select friends, we need to match them up by facebookId
  //     var facebookIds = _.pluck(selectedFriends,  'id');

  //     this.model('User').find({ 'facebook.id' : { $in: facebookIds }
  //       }, function(err, friends) {
  //         if (err) throw err;
  //         thisUser.addQsToFriends(friends, questionId);
  //       });
  //   }
  // },

  // addQsToFriends: function(friends, questionId) {
  //   for (var i = 0, len = friends.length; i < len; i++) {
  //     this.model('User').findOne({_id: friends[i]}, function(err, friend) {
  //       if (err) throw err;
  //       friend.questionQueue.push(questionId);
  //       friend.save();
  //     });
  //   }
  // },

  // filterInactiveQuestions: function() {
  //   var date = new Date,
  //       user = this;

  //   for (var i = 0, len = user.myQuestions.length; i < len; i++) {
  //     if (user.myQuestions[i].closesAt < date) {
  //       Question.findById(user.myQuestions[i]._id, function(err, q) {
  //         if (err) throw err;
  //         q.isActive = false;
  //         q.save();
  //       });
  //     }
  //   }
  // }
};

module.exports = mongoose.model('User', UserSchema);
