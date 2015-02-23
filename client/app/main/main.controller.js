'use strict';

angular.module('populateApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope', '$http', '$state', 'facebookFriends',
										'dataService', 'Auth', '$window', 'userQuestionService'];

function MainCtrl($scope, $http, $state, facebookFriends,
									dataService, Auth, $window, userQuestionService) {

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
        // userQuestionService.getAllQuestions(vm.user._id);
        $state.go('answer');
      }
    });
  }

  function loginOauth(provider) {
    $window.location.href = '/auth/' + provider;
  };
}
