'use strict';

angular.module('populateApp')
  .controller('AskCtrl', AskCtrl);

AskCtrl.$inject = ['$scope', '$state', 'Auth', 'dataService']

function AskCtrl($scope, $state, Auth, dataService) {

	var vm = this;

	vm.postQuestion = postQuestion;
	vm.question = '';
	vm.swipeLeft = '';
	vm.swipeRight = '';
	vm.user = Auth.getCurrentUser();

	function postQuestion() {
		dataService.post(vm.user, {
			question: vm.question,
			swipeLeft: vm.swipeLeft,
			swipeRight: vm.swipeRight
		})
	}
}
