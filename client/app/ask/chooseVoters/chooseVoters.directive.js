'use strict';

angular.module('populateApp')
  .directive('chooseVoters', function () {
    return {
      templateUrl: 'app/ask/chooseVoters/chooseVoters.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });