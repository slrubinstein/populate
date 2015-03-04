'use strict';

angular.module('populateApp')
  .controller('QuestionCtrl', QuestionCtrl)

QuestionCtrl.$inject = ['Auth', 'userQuestionService', 'dataService', 
												'$state', '$stateParams'];

function QuestionCtrl(Auth, userQuestionService, dataService, 
											$state, $stateParams) {

	var vm = this;

	var timerMillis = [10 * 60 * 1000, 30 * 60 * 1000, 60 * 60 * 1000, 
  									 12 * 60 * 60 * 1000, 24 * 60 * 60 * 1000,
  									 2 * 24 * 60 * 60 * 1000, 7 * 24 * 60 * 60 * 1000];

  vm.addComment = addComment;
	vm.askQuestion = askQuestion;
	vm.choice;
	vm.currentQuestion = userQuestionService.currentQuestion;
	vm.nextQuestion = nextQuestion;
	vm.openVotersPopup = openVotersPopup;
	vm.question = {
		query: '',
		answer1: {
			option: ''
		},
		answer2: {
			option: ''
		}
	};
	vm.select = select;
	vm.timerIndex = 2;
	vm.timerOptions = ['10 minutes', '30 minutes', '1 hour', '12 hours', '24 hours', '2 days', '7 days'];
	vm.vote = vote;
	vm.votersOpen = false;
	vm.user;

	activate();

	function activate() {
		Auth.isLoggedInAsync(function(loggedIn) {
			if (loggedIn) {
				vm.user = Auth.getCurrentUser();
				console.log(vm.user)
				console.log('question', vm.currentQuestion)		
			}
		});
	}

	function addComment() {
		console.log('add comment')
	}

	function askQuestion() {
		if (!vm.question.query.length || !vm.question.answer1.option.length || !vm.question.answer2.option.length) {
			return;
		}
		var date = new Date;
		vm.question.askerId = vm.user._id;
		vm.question.askerName = vm.user.name;
		vm.question.askerPic = 'https://graph.facebook.com/' + vm.user.facebook.id + '/picture';
		vm.question.timeCreated = date;
		vm.question.closesAt = new Date (date.getTime() + timerMillis[vm.timerIndex]);

		dataService.post(vm.question)
		// changing state will empty the ng-model values
		$state.go('answer.home');
	}

	function nextQuestion() {
		if (!userQuestionService.nextQuestion()) {
			console.log('no more questions')
		}
	}

	function openVotersPopup() {
		vm.votersOpen = !vm.votersOpen;
	}

	function select(choice) {
		vm.choice = choice;
	}

	function vote() {
		console.log(vm.currentQuestion, vm.choice, vm.user)
		userQuestionService.vote(vm.currentQuestion, vm.choice, vm.user);
		vm.choice = null;
	}

}
