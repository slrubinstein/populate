'use strict';

angular.module('populateApp')
  .factory('dataService', dataService);

dataService.$inject = ['$http'];

function dataService($http) {

  return {
    addComment: addComment,
    addFriend: addFriend,
    // getFriends: getFriends,
    post: post,
    vote: vote
  }

  function addComment(questionId, comment) {
    return $http.put('/api/questions/' + questionId + '/comment', comment);
  }

  function addFriend(userId, friendId) {
    return $http.put('/api/users/' + userId + '/addfriend',
      {
        friendId: friendId
      }
    );
  }

  // function getFriends(userId) {
  //   return $http.get('/api/users/' + userId + '/getfriends');
  // }

  function post(newQuestion, selectedFriends) {
    return $http.post('/api/questions', newQuestion)
  }

  function vote(question, answer, voter) {
    return $http.put('/api/questions/' + question._id,
      {
        questionId: question._id,
        answer: answer,
        voter: voter
      }
    );
  }
}