'use strict';

angular.module('populateApp')
  .controller('QuestionCtrl', QuestionCtrl)

QuestionCtrl.$inject = ['Auth', 'userQuestionService', 'dataService'];

function QuestionCtrl(Auth, userQuestionService, dataService) {

	var vm = this;

	var timerMillis = [10 * 60 * 1000, 30 * 60 * 1000, 60 * 60 * 1000, 
  									 12 * 60 * 60 * 1000, 24 * 60 * 60 * 1000,
  									 2 * 24 * 60 * 60 * 1000, 7 * 24 * 60 * 60 * 1000];

	vm.askQuestion = askQuestion;
	vm.question = {};
	vm.timerIndex = 2;
	vm.timerOptions = ['10 minutes', '30 minutes', '1 hour', '12 hours', '24 hours', '2 days', '7 days'];
	vm.user;

	activate();

	function activate() {
		Auth.isLoggedInAsync(function(loggedIn) {
			if (loggedIn) {
				vm.user = Auth.getCurrentUser();
				console.log(vm.user)				
			}
		});
	}

	function askQuestion() {
		var date = new Date;
		vm.question.askerId = vm.user._id;
		vm.question.askerName = vm.user.name;
		vm.question.askerPic = 'https://graph.facebook.com/' + vm.user.facebook.id + '/picture';
		vm.question.timeCreated = date;
		vm.question.closesAt = new Date (date.getTime() + timerMillis[vm.timerIndex]);

		dataService.post(vm.question)
	}


}