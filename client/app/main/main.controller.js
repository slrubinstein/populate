'use strict';

angular.module('populateApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope', '$http', '$state'];

function MainCtrl($scope, $http, $state) {

  var vm = this;

  vm.answer = answer;
  vm.discover = discover;

  function answer() {

  }

  function discover() {

  }


}
