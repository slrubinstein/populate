'use strict';

angular.module('populateApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ask', {
        url: '/ask',
        templateUrl: 'app/ask/templates/ask.html',
        controller: 'AskCtrl',
        controllerAs: 'ask'
      })
      .state('ask.newquestion', {
        url: '/newquestion',
        templateUrl: 'app/ask/templates/ask.newquestion.html',
        // controller: 'AskCtrl',
        // controllerAs: 'ask'
      })
      .state('ask.confirmation', {
        url: '/confirmation',
        templateUrl: 'app/ask/templates/ask.confirmation.html',
        // controller: 'AskCtrl',
        // controllerAs: 'ask',
        params: { newQuestion: {} }
      });
  });