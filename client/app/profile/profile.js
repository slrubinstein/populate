'use strict';

angular.module('populateApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile', {
        url: '/profile',
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
      .state('profile.me', {
      	url: '/me',
      	templateUrl: 'app/profile/profile.me.html',
      })
      .state('profile.myquestions', {
      	url: '/myquestions',
      	templateUrl: 'app/profile/profile.myquestions/profile.myquestions.html',
      })
      .state('profile.edit', {
        url: 'edit',
        templateUrl: 'app/profile/profile.edit.html'
      })
      .state('profile.invite', {
        url: 'invite',
        templateUrl: 'app/profile/invite/profile.invite.html',
        controller: 'InviteCtrl',
        controllerAs: 'invite'
      })
      .state('profile.questionsanswered', {
      	url: '/questionsanswered',
      	templateUrl: 'app/profile/profile.questionsanswered.html',
        params: { question: {} },
      });
  });