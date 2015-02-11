'use strict';

angular.module('populateApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('answer', {
        url: '/answer',
        templateUrl: 'app/answer/templates/answer.html',
        controller: 'AnswerCtrl',
        controllerAs: 'answer'
      })
      .state('answer.questions', {
      	url: '/questions',
      	templateUrl: 'app/answer/templates/answer.questions.html',
      	controller: 'AnswerCtrl',
      	controllerAs: 'answer'
      })
      .state('answer.end', {
        url: '/end',
        templateUrl: 'app/answer/templates/answer.end.html',
        controller: 'AnswerCtrl',
        controllerAs: 'answer'
      });
  });