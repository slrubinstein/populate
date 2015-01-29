'use strict';

angular.module('populateApp')
  .factory('dataService', dataService);

dataService.$inject = ['$http'];

function dataService($http) {

  return {
    addFriend: addFriend,
    getFriendsFromDB: getFriendsFromDB,
    loadQuestions: loadQuestions,
    post: post,
    vote: vote
  }

  function addFriend(userId, friendId) {
    return $http.put('/api/users/' + userId + '/addfriend',
      {friendId: friendId});
  }

  function getFriendsFromDB() {
    return $http.get('/api/users/');
  }

  function loadQuestions(userId) {
    return $http.get('/api/users/' + userId + '/loadquestions');
  }

  function post(questionOptions) {
    return $http.post('/api/questions', questionOptions)
      .then(function(result) {
        $http.put('/api/users/' + questionOptions.owner +
          '/addquestion', {questionId: result.data._id})
      });
  }

  function vote(question) {
    return $http.put('/api/questions/' + question._id, question);
  }
}