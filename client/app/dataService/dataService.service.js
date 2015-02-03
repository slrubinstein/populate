'use strict';

angular.module('populateApp')
  .factory('dataService', dataService);

dataService.$inject = ['$http'];

function dataService($http) {
console.log('dataService')
  return {
    addFriend: addFriend,
    getFriendsFromDB: getFriendsFromDB,
    getUserFriends: getUserFriends,
    loadQuestionQueue: loadQuestionQueue,
    post: post,
    seePastQuestions: seePastQuestions,
    vote: vote
  }

  function addFriend(userId, friendId) {
    return $http.put('/api/users/' + userId + '/addfriend',
      {friendId: friendId});
  }

  function getFriendsFromDB(userId, friendIds) {
    return $http.post('/api/users/' + userId + '/loadfriends', {friendIds: friendIds});
  }

  function getUserFriends(userId) {
    return $http.get('api/users/' + userId + '/getuserfriends');
  }

  function loadQuestionQueue(userId) {
    return $http.get('/api/users/' + userId + '/loadquestionqueue');
  }

  function post(questionOptions, selectedFriends) {
    return $http.post('/api/questions', questionOptions)
      .then(function(result) {
        $http.put('/api/users/' + questionOptions.owner +
          '/addquestion', {questionId: result.data._id,
                           selectedFriends: selectedFriends})
      });
  }

  function seePastQuestions(userId) {
    return $http.get('/api/users/' + userId + '/pastquestions');
  }

  function vote(question) {
    return $http.put('/api/questions/' + question._id, question);
  }
}