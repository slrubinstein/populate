'use strict';

angular.module('populateApp')
  .controller('AnswerCtrl', AnswerCtrl);

AnswerCtrl.$inject = ['$scope', 'dataService', 'Auth', '$state',
											'userQuestionService', '$stateParams']

function AnswerCtrl($scope, dataService, Auth, $state,
										userQuestionService, $stateParams) {

	var vm = this;

	vm.errors = {};
	vm.group = 'friendQuestionsActive';
	vm.loadQuestion = loadQuestion;
	vm.pic = '';
	vm.questionsByGroup = {};
	vm.typeSelection = typeSelection;
	vm.user = {};

	activate();

	function activate() {
		userQuestionService.getUser()
			.then(function(user) {
				vm.user = user;
				vm.currentQuestions = vm.user.friendQuestionsActive;
				vm.pic = vm.user.facebook ? 'https://graph.facebook.com/' +
          vm.user.facebook.id + '/picture' : '';
			});
	}

	function loadQuestion(index) {
		userQuestionService.loadQuestion(index, vm.group);
		$state.go('answer.questions');
	}

	function typeSelection(group) {
		vm.group = group;
		userQuestionService.getUser()
			.then(function(user) {
				vm.currentQuestions = user[group];
			});
	}

}
