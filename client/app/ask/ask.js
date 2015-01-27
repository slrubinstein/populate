'use strict';

angular.module('populateApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ask', {
        url: '/ask',
        templateUrl: 'app/ask/ask.html',
        controller: 'AskCtrl',
        controllerAs: 'ask'
      });
  });