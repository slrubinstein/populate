'use strict';

angular.module('populateApp')
  .factory('dataService', dataService);

dataService.$inject = ['$http'];

function dataService($http) {

  return {
    addComment: addComment,
    post: post,
    vote: vote
  }

  function addComment(questionId, comment) {
    return $http.put('/api/questions/' + questionId + '/comment', comment);
  }

  function post(newQuestion, selectedFriends) {
    return $http.post('/api/questions', newQuestion)
  }

  function vote(question, answer, voter) {
    return $http.put('/api/questions/' + question._id,
      {questionId: question._id,
        answer: answer,
        voter: voter
      });
  }
}