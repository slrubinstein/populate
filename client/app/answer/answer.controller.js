'use strict';

angular.module('populateApp')
  .controller('AnswerCtrl', AnswerCtrl);

AnswerCtrl.$inject = ['$scope', 'dataService', 'Auth', '$state',
											'userQuestionService']

function AnswerCtrl($scope, dataService, Auth, $state,
										userQuestionService) {

	var vm = this;

	var index = 0;

	vm.createDateString = createDateString;
	vm.currentQuestion = {};
	vm.end = false;
	vm.friends;
	vm.questions = [];
	vm.user = Auth.getCurrentUser();
	vm.userFromDB;
	vm.vote = vote;

	activate();
console.log(vm.user)
	function activate() {


		Auth.isLoggedInAsync(function(loggedIn) {
			if (loggedIn) {

		userQuestionService.getAllQuestions(vm.user._id)
			.then(function() {
				vm.friendQuestionsCurrent = userQuestionService.friendQuestionsCurrent;
				console.log(vm.friendQuestionsCurrent)
				setNextQuestion(index);

				console.log(vm.currentQuestion)
			})
				
			}
		})
			
	}

	function createDateString(date) {
		var d = new Date(date);
		return d.toDateString() + ', ' + d.toLocaleTimeString();
	}

	function setNextQuestion(index) {
		console.log('next q')
		if (vm.friendQuestionsCurrent[index]) {
			vm.currentQuestion = vm.friendQuestionsCurrent[index];
		} else {
			$state.go('answer.end');
		}
	}

	function vote(swipeDir) {
		console.log('vote')
		vm.currentQuestion[swipeDir].votes++;
		dataService.vote(vm.currentQuestion, vm.user._id);
		index++;
		setNextQuestion(index);
	}
}
