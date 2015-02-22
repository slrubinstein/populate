'use strict';

angular.module('populateApp')
  .factory('dataService', dataService);

dataService.$inject = ['$http'];

function dataService($http) {

  return {
    addFriend: addFriend,
    getAllQuestions: getAllQuestions,
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

  function getAllQuestions(userId) {
    return $http.get('/api/users/' + userId + '/getallquestions');
  }

  function post(newQuestion, selectedFriends) {
    return $http.post('/api/questions', newQuestion)
      // .then(function(result) {
      //   $http.put('/api/users/' + newQuestion.askerId +
      //     '/addquestion', {questionId: result.data._id,
      //                      selectedFriends: selectedFriends})
      // });
  }

  function seePastQuestions(userId) {
    return $http.get('/api/users/' + userId + '/pastquestions');
  }

  function vote(question, userId) {
    $http.put('/api/questions/' + question._id, question);
    $http.put('/api/users/' + userId + '/vote/' + question._id);
  }
}