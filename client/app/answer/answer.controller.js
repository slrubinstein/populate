'use strict';

angular.module('populateApp')
  .controller('AnswerCtrl', AnswerCtrl);

AnswerCtrl.$inject = ['$scope', 'dataService', 'Auth', '$state',
											'userQuestionService']

function AnswerCtrl($scope, dataService, Auth, $state,
										userQuestionService) {

	var vm = this;

	var index = 0;

	vm.currentQuestion = {};
	vm.end = false;
	vm.friends;
	vm.questions = userQuestionService.;
	vm.user = Auth.getCurrentUser();
	vm.vote = vote;

	console.log(vm.user)
	activate();
	function activate() {
		dataService.loadQuestionQueue(vm.user._id)
			.then(function(result) {
				vm.questions = result.data.questionQueue;
				setNextQuestion(index);
			});
	}

	function vote(swipeDir) {
		vm.currentQuestion[swipeDir].votes++;
		dataService.vote(vm.currentQuestion);
		index++;
		setNextQuestion(index);

	}

	function setNextQuestion(index) {
		if (vm.questions[index]) {
			vm.currentQuestion = vm.questions[index];
		} else {
			vm.end = true;
		}
	}

}
