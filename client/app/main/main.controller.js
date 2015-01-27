'use strict';

angular.module('populateApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope', '$http', '$state'];

function MainCtrl($scope, $http, $state) {

  var vm = this;

  vm.answer = answer;
  vm.ask = ask;
  vm.discover = discover;

  function answer() {

  }

  function ask() {
    $state.go('main.ask', {});
  }

  function discover() {

  }


}
