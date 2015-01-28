'use strict';

angular.module('populateApp')
  .factory('dataService', dataService);

dataService.$inject = ['$http'];

function dataService($http) {

  return {
    post: post
  }

  function post(questionOptions) {
    console.log(questionOptions)
    return $http.post('/api/questions', questionOptions)
      .then(function(result) {
        console.log(result)
        console.log(questionOptions.owner)
        $http.put('/api/users/' + questionOptions.owner +
          '/addquestion', {questionId: result.data._id})
      });
  }
}