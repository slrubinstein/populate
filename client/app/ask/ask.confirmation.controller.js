'use strict';

angular.module('populateApp')
  .controller('AskConfCtrl', AskConfCtrl);

AskConfCtrl.$inject = ['$scope', '$state', 'Auth', 'dataService',
									 'facebookFriends', '$stateParams']

function AskConfCtrl($scope, $state, Auth, dataService,
								 facebookFriends, $stateParams) {

	var vm = this;

	vm.newQuestion = $stateParams.newQuestion;
	console.log($stateParams)
}