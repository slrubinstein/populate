'use strict';

angular.module('populateApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope', '$http', '$state', 'facebookFriends'];

function MainCtrl($scope, $http, $state, facebookFriends) {

  var vm = this;

  vm.answer = answer;
  vm.discover = discover;
  vm.friends = facebookFriends.getFriends();

  function answer() {

  }

  function discover() {

  }
  
}
