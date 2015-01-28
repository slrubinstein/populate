'use strict';

angular.module('populateApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('answer', {
        url: '/answer',
        templateUrl: 'app/answer/answer.html',
        controller: 'AnswerCtrl',
        controllerAs: 'answer'
      });
  });