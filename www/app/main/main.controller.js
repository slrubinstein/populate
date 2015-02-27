'use strict';

angular.module('populateApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope', '$http', '$state', 'facebookFriends',
										'dataService', 'Auth', '$window', 'userQuestionService',
                    '$location'];

function MainCtrl($scope, $http, $state, facebookFriends,
									dataService, Auth, $window, userQuestionService,
                  $location) {

  var vm = this;

  vm.loggedIn = false;
  vm.loginOauth = loginOauth;
  vm.user;

  activate();

  function activate() {
    facebookFriends.activate();
    vm.user = Auth.getCurrentUser();

    Auth.isLoggedInAsync(function(loggedIn) {
      if (loggedIn) {
        vm.user = Auth.getCurrentUser();
        // $state.go('answer.home');
      }
    });
  }

  function loginOauth(provider) {
    $window.location.href = 'http://localhost:9000/auth/' + provider;
  };
  $scope.user = {};
  $scope.errors = {};

  $scope.login = function(form) {
    $scope.submitted = true;

    if(form.$valid) {
      Auth.login({
        email: $scope.user.email,
        password: $scope.user.password
      })
      .then( function() {
        // Logged in, redirect to home
        // $location.path('/answer.home');
        $state.go('answer.home')
      })
      .catch( function(err) {
        $scope.errors.other = err.message;
      });
    }
  };
}
