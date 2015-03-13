'use strict';

var _ = require('lodash');
var Question = require('./question.model');

// Get list of questions
exports.index = function(req, res) {
  Question.find(function (err, questions) {
    if(err) { return handleError(res, err); }
    return res.json(200, questions);
  });
};

// Get a single question
exports.show = function(req, res) {
  Question.findById(req.params.id, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.send(404); }
    return res.json(question);
  });
};

// Creates a new question in the DB.
exports.create = function(req, res) {
  Question.create(req.body, function(err, question) {
    if(err) { return handleError(res, err); }
    question.addToUserActiveQuestions();
    question.assignQuestionToFriends();
    return res.json(201, question);
  });
};

// Vote on a Question
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  var answer = req.body.answer,
      voterId = req.body.voter._id,
      name = req.body.voter.name,
      questionId = req.body.questionId;

  Question.findById(questionId, function (err, question) {
    if (err) { return handleError(res, err); }
    if(!question) { return res.send(404); }
    // give vote a plus 1
    question[answer].option.votes++;
    // add voter to array of voters for this option
    question[answer].voters.push({
      _id: voterId,
      voterName: name
    });
    // move question from Active to Old for voter
    question.moveQuestionFromActiveToOld(voterId);
    // update question active status
    question.isActive = false;
    question.save(function(err) {
      if (err) { return handleError(res, err); }
      return res.json(200, question);
    });
  });
};

// Comment on a Question
exports.addComment = function(req, res) {
  Question.findById(req.params.id, function (err, question) {
    if (err) { return handleError(res, err); }
    if(!question) { return res.send(404); }

    question.comments.push(req.body);

    question.save(function(err) {
      if (err) { return handleError(res, err); }
      return res.json(200, question);
    });
  });
};


// Deletes a question from the DB.
exports.destroy = function(req, res) {
  Question.findById(req.params.id, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.send(404); }
    question.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  console.log(err)
  return res.send(500, err);
}