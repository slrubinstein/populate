'use strict';

angular.module('populateApp')
  .factory('dataService', dataService);

dataService.$inject = ['$http'];

function dataService($http) {

  return {
    post: post
  }

  function post(user, questionOptions) {
    // $http.post
  }
}