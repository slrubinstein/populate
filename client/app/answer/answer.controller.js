'use strict';

angular.module('populateApp')
  .controller('AnswerCtrl', AnswerCtrl);

AnswerCtrl.$inject = ['$scope', 'dataService', 'Auth', '$state',
											'userQuestionService', '$stateParams']

function AnswerCtrl($scope, dataService, Auth, $state,
										userQuestionService, $stateParams) {

	var vm = this;

	vm.group = 'friendQuestionsActive';
	vm.loadQuestion = loadQuestion;
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
				vm.currentQuestions = vm.user.friendQuestionsActive;
			});
	}

	function loadQuestion(index) {
		userQuestionService.loadQuestion(index, vm.group)
		$state.go('answer.questions')
	}

	function typeSelection(group, event) {
		vm.group = group;
		userQuestionService.getUser()
			.then(function(user) {
				vm.currentQuestions = user[group];
			});
		$('.selected').removeClass('selected');
		event.target.className = 'selected';
	}

}
