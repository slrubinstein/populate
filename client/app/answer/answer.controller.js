'use strict';

angular.module('populateApp')
  .controller('AnswerCtrl', AnswerCtrl);

AnswerCtrl.$inject = ['$scope', 'dataService', 'Auth', '$state',
											'userQuestionService', '$stateParams']

function AnswerCtrl($scope, dataService, Auth, $state,
										userQuestionService, $stateParams) {

	var vm = this;

	// vm.currentQuestion = $stateParams.question;
	vm.currentQuestions = [];
	vm.group;
	vm.index = 0;
	vm.loadQuestion = loadQuestion;
	vm.nextQ = nextQ;
	vm.open = true;
	vm.openOrClosed = 'active';
	vm.questionsByGroup = {};
	vm.typeSelection = typeSelection;
	vm.user;

	activate();

	function activate() {
		vm.user = userQuestionService.getUser()
			.then(function(user) {
				vm.user = user;
				vm.questionsByGroup.active = _.sortBy(vm.user.friendQuestionsActive, function(q) {
					return q.closesAt;
				});
				vm.questionsByGroup.old = _.sortBy(vm.user.friendQuestionsOld, function(q) {
					return q.closesAt;
				});
				vm.currentQuestions = userQuestionService.getUser().friendQuestionsActive;
			});
	}

	function loadQuestion(index) {
		vm.index = index;
		vm.currentQuestion = vm.currentQuestions[vm.index];
		$state.go('answer.questions', {question: vm.currentQuestion})
		console.log(vm.currentQuestion)
	}

	function nextQ() {
		console.log('next!')
		vm.index++;
		if (vm.questionsByGroup[vm.group][vm.index]) {
			vm.currentQuestion = vm.questionsByGroup[vm.group][vm.index];
		}
	}

	function typeSelection(group) {
		userQuestionService.getUser()
			.then(function(user) {
				vm.currentQuestions = user[group];
			});
	}

}
