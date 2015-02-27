'use strict';

angular.module('populateApp')
  .controller('AnswerCtrl', AnswerCtrl);

AnswerCtrl.$inject = ['$scope', 'dataService', 'Auth', '$state',
											'userQuestionService', '$stateParams']

function AnswerCtrl($scope, dataService, Auth, $state,
										userQuestionService, $stateParams) {

	var vm = this;

	vm.currentQuestion = $stateParams.question;
	vm.currentQuestions = [];
	vm.loadQuestion = loadQuestion;
	vm.open = true;
	vm.openOrClosed = 'active';
	vm.questionsByGroup = {};
	vm.typeSelection = typeSelection;
	vm.user = Auth.getCurrentUser();

	activate();

	function activate() {
		vm.questionsByGroup.active = _.sortBy(vm.user.friendQuestionsActive, function(q) {
			return q.closesAt;
		});
		vm.questionsByGroup.old = _.sortBy(vm.user.friendQuestionsOld, function(q) {
			return q.closesAt;
		});
		vm.currentQuestions = vm.questionsByGroup['active'];
		console.log(vm.questionsByGroup)
	}

	function loadQuestion(index) {
		vm.currentQuestion = vm.currentQuestions[index];
		$state.go('answer.questions', {question: vm.currentQuestion})
		console.log(vm.currentQuestion)
	}

	function typeSelection(group) {
		vm.currentQuestions = vm.questionsByGroup[group];
	}

}
