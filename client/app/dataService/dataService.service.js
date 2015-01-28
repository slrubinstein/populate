'use strict';

angular.module('populateApp')
  .factory('dataService', dataService);

dataService.$inject = ['$http'];

function dataService($http) {

  return {
    addFriend: addFriend,
    getFriendsFromDB: getFriendsFromDB,
    loadQuestions: loadQuestions,
    post: post
  }

  function addFriend(userId, friendId) {
    return $http.put('/api/users/' + userId + '/addfriend',
      {friendId: friendId});
  }

  function getFriendsFromDB() {
    return $http.get('/api/users/');
  }

  function loadQuestions(userId) {
    console.log('load q')
    return $http.get('/api/users/' + userId + '/loadquestions');
  }

  function post(questionOptions) {
    return $http.post('/api/questions', questionOptions)
      .then(function(result) {
        $http.put('/api/users/' + questionOptions.owner +
          '/addquestion', result.data)
      });
  }
}