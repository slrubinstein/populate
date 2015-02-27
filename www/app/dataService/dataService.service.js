'use strict';

angular.module('populateApp')
  .factory('dataService', dataService);

dataService.$inject = ['$http'];

function dataService($http) {

  return {
    post: post,
    vote: vote
  }

  function post(newQuestion, selectedFriends) {
    return $http.post('http://localhost:9000/api/questions', newQuestion)
  }

  function vote(question, userId) {
    $http.put('http://localhost:9000/api/questions/' + question._id, question);
    $http.put('http://localhost:9000/api/users/' + userId + '/vote/' + question._id);
  }
}