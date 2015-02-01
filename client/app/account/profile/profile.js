'use strict';

angular.module('populateApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile', {
        url: '/profile',
        templateUrl: 'app/account/profile/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
      .state('profile.me', {
      	url: '/me',
      	templateUrl: 'app/account/profile/profile.me.html',
      	controller: 'ProfileCtrl',
      	controllerAs: 'profile'
      })
      .state('profile.myquestions', {
      	url: '/myquestions',
      	templateUrl: 'app/account/profile/profile.myquestions.html',
      	controller: 'ProfileCtrl',
      	controllerAs: 'profile',
      	params: { myQuestions: {} }
      })
      .state('profile.questionsanswered', {
      	url: '/questionsanswered',
      	templateUrl: 'app/account/profile/profile.questionsanswered.html',
      	controller: 'ProfileCtrl',
      	controllerAs: 'profile',
      	params: { questionsAnswered: {} }
      });
  });