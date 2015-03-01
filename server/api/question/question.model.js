'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  // maybe refactor asker into an object
  askerId: {type: Schema.Types.ObjectId, ref: 'User'},
  askerName: String,
  askerPic: String,
  query: String,
  answer1: {
  	option: String,
  	votes: { type: Number, default: 0 },
  	image: String,
    voters: [ { _id: { type: Schema.Types.ObjectId, ref: 'User'}, name: String } ]
  },
  answer2: {
  	option: String,
  	votes: { type: Number, default: 0 },
  	image: String,
    voters: [ { _id: { type: Schema.Types.ObjectId, ref: 'User'}, name: String } ]
  },
  isActive: { type: Boolean, default: true },
  timeCreated: { type: Date, default: new Date , index: {unique: true } },
  closesAt: { type: Date, index: { unique: false } },
  comments: [ { _id: { type: Schema.Types.ObjectId, ref: 'User'}, name: String, comment: String } ]
});

QuestionSchema.methods = {

  addToUserActiveQuestions: function() {
    var User = require('../user/user.model'),
        question = this;

    User.findById(question.askerId, function(err, user) {
      if (err) throw err;
      user.myQuestionsActive.push(question._id);
      user.save();
      console.log('pushing', question._id)
      console.log('user', user)
      return;
    });
  },

  assignQuestionToFriends: function() {
    var User = require('../user/user.model'),
        question = this;

    question.voters.forEach(function(voter) {
      User.findById(voter, function(err, user) {
        if (err) throw err;
        user.friendQuestionsActive.push(question._id);
        user.save();
        return;
      });
    });
  },

  moveQuestionFromActiveToOld: function(voterId) {
    var User = require('../user/user.model'),
        question = this;

    User.findById(voterId, function(err, user) {
      if (err) throw err;
      var index = user.friendQuestionsActive.indexOf(question._id);
      user.friendQuestionsActive.splice(index, 1);
      user.friendQuestionsOld.push(question._id);
      user.save();
      return;
    });
  }

}

module.exports = mongoose.model('Question', QuestionSchema);