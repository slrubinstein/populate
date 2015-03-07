'use strict';

angular.module('populateApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope', '$http', '$state', 'facebookFriends',
										'dataService', 'Auth', '$window', 'userQuestionService'];

function MainCtrl($scope, $http, $state, facebookFriends,
									dataService, Auth, $window, userQuestionService) {

  var vm = this;

  vm.errors = {};
  vm.loggedIn = false;
  vm.loginLocal = loginLocal;
  vm.loginOauth = loginOauth;
  vm.submitted
  vm.user = {};

  activate();

  function activate() {
    facebookFriends.activate();
    vm.user = Auth.getCurrentUser();

    Auth.isLoggedInAsync(function(loggedIn) {
      if (loggedIn) {
        vm.user = Auth.getCurrentUser();
        $state.go('answer.home');
      }
    });
  }

  function loginOauth(provider) {
    // $window.location.href = '/auth/' + provider;
    $window.location.href = 'http://192.168.1.4:9000/auth/' + provider;
  };
  
  function loginLocal(form) {
    vm.submitted = true;

    if(form.$valid) {
      Auth.login({
        email: vm.user.email,
        password: vm.user.password
      })
      .then( function() {
        $state.go('answer.home')
      })
      .catch( function(err) {
        vm.errors.other = err.message;
      });
    }
  };
}
