'use strict';

angular.module('populateApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ask', {
        url: '/ask',
        templateUrl: 'app/ask/ask.html',
        controller: 'AskCtrl',
        controllerAs: 'ask'
      })
      .state('ask.newquestion', {
        url: '/newquestion',
        templateUrl: 'app/ask/ask.newquestion.html',
        controller: 'AskCtrl',
        controllerAs: 'ask'
      })
      .state('ask.confirmation', {
        url: '/confirmation',
        templateUrl: 'app/ask/ask.confirmation.html',
        controller: 'AskCtrl',
        controllerAs: 'ask',
        params: { newQuestion: {} }
      })
      .state('ask.pastquestions', {
      	url: 'pastquestions',
      	templateUrl: 'app/ask/ask.pastquestions.html',
      	controller: 'AskCtrl',
      	controllerAs: 'ask',
      	params: { pastQuestions: {} }
      });
  });