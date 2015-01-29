'use strict';

angular.module('populateApp')
  .controller('AnswerCtrl', AnswerCtrl);

AnswerCtrl.$inject = ['$scope', 'dataService', 'Auth']

function AnswerCtrl($scope, dataService, Auth) {

	var vm = this;

	var index = 0;

	vm.currentQuestion = {};
	vm.friends;
	vm.questions = [];
	vm.user;
	vm.vote = vote;

	activate();

	function activate() {
		vm.user = Auth.getCurrentUser();
		dataService.loadQuestions(vm.user.friends)
			.then(function(result) {
				console.log(result)
				vm.questions = result.data.questionQueue;
				
				vm.currentQuestion = vm.questions[index];
				console.log(vm.questions)
			});

	}

	function vote(swipeDir) {
		vm.currentQuestion[swipeDir].votes++;
		dataService.vote(vm.currentQuestion);
		index++;
		vm.currentQuestion = vm.questions[index];

	}


}
