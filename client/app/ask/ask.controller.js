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
		dataService.post({
			owner: vm.user._id,
			query: vm.question,
			swipeLeft: {
				option: vm.swipeLeft,
				votes: 0,
				image: ''
			},
			swipeRight: {
				option: vm.swipeRight,
				votes: 0,
				image: ''
			}
		});
	}
}
