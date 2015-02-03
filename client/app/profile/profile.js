'use strict';

angular.module('populateApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile', {
        url: '/profile',
        templateUrl: 'app/profile/profile.html'
        // controller: 'ProfileCtrl',
        // controllerAs: 'profile'
      })
      .state('profile.me', {
      	url: '/me',
      	templateUrl: 'app/profile/profile.me.html',
      	controller: 'ProfileCtrl',
      	controllerAs: 'profile'
      })
      .state('profile.myquestions', {
      	url: '/myquestions',
      	templateUrl: 'app/profile/profile.myquestions/profile.myquestions.html',
      	controller: 'ProfileMyquestionsCtrl',
      	controllerAs: 'myquestions',
        params: { question: {} }
      })
      .state('profile.questionsanswered', {
      	url: '/questionsanswered',
      	templateUrl: 'app/profile/profile.questionsanswered.html'
      	// controller: 'ProfileCtrl',
      	// controllerAs: 'profile'
      });
  });