'use strict';

angular.module('populateApp')
  .controller('AnswerCtrl', AnswerCtrl);

AnswerCtrl.$inject = ['$scope', 'dataService', 'Auth', '$state']

function AnswerCtrl($scope, dataService, Auth, $state) {

	var vm = this;

	var index = 0;

	vm.currentQuestion = {};
	vm.end = false;
	vm.friends;
	vm.questions = [];
	vm.user;
	vm.vote = vote;

	activate();

	function activate() {
		vm.user = Auth.getCurrentUser();
		dataService.loadQuestions(vm.user._id)
			.then(function(result) {
				vm.questions = result.data.questionQueue;
				vm.currentQuestion = vm.questions[index];
			});

	}

	function vote(swipeDir) {
		vm.currentQuestion[swipeDir].votes++;
		dataService.vote(vm.currentQuestion);
		index++;
		if (vm.questions[index]) {
			vm.currentQuestion = vm.questions[index];
		} else {
			vm.end = true;
		}

	}


}
