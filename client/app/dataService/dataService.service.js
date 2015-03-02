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

  function addComment(question, voter, comment) {
    return $http.put('/api/question/' + question._id + '/comment',
      {_id: voter._id,
        name: voter.name,
        comment: comment
      });
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