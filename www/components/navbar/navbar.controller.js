'use strict';

angular.module('populateApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    var vm = this;

    vm.user = {};
    vm.profilePic = '';

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    Auth.isLoggedInAsync(function(loggedIn) {
      
      if (loggedIn) {
        vm.user = Auth.getCurrentUser();
      }
    });

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });