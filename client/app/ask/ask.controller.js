'use strict';

angular.module('populateApp')
  .controller('AskCtrl', AskCtrl);

AskCtrl.$inject = ['$scope', '$state', 'Auth', 'userQuestionService']

function AskCtrl($scope, $state, Auth, userQuestionService) {

	var vm = this;

	var timerMillis = [10 * 60 * 1000, 30 * 60 * 1000, 60 * 60 * 1000, 
  									 12 * 60 * 60 * 1000, 24 * 60 * 60 * 1000,
  									 2 * 24 * 60 * 60 * 1000, 7 * 24 * 60 * 60 * 1000];

	vm.askQuestion = askQuestion;
	vm.commentsAllowed = false;
	vm.enableComments = enableComments;
	vm.friends = [];
	vm.openVotersPopup = openVotersPopup;
	vm.processVoters = processVoters;
	vm.question = {
		query: '',
		answer1: {
			option: ''
		},
		answer2: {
			option: ''
		}
	};
	vm.timerIndex = 2;
	vm.timerOptions = ['10 minutes', '30 minutes', '1 hour', '12 hours', '24 hours', '2 days', '7 days'];
	vm.user = {};
	vm.voters = [];
	vm.votersOpen = false;

	activate();

	function activate() {
		userQuestionService.getUser()
		.then(function(response) {
			vm.user = response;
		});
	}

	function askQuestion() {
		// make sure question and answer fields are filled
		if (!vm.question.query.length ||
				(!vm.question.answer1.option.length && !vm.question.answer1.image.length) ||
				(!vm.question.answer2.option.length && !vm.question.answer2.image.length))
		{
			return;
		}
		var date = new Date;
		vm.question.askerId = vm.user._id;
		vm.question.askerName = vm.user.name;
		vm.question.askerPic = 'https://graph.facebook.com/' + vm.user.facebook.id + '/picture';
		vm.question.commentsAllowed = vm.commentsAllowed;
		vm.question.timeCreated = date;
		vm.question.closesAt = new Date (date.getTime() + timerMillis[vm.timerIndex]);
		vm.question.voters = vm.voters.map(function(v) {
			return {
				_id: v._id,
				voterName: v.name
			}
		});

		userQuestionService.postQuestion(vm.question)
		// changing state will empty the ng-model values
		$state.go('answer.home');
	}

	function enableComments() {
		vm.commentsAllowed = !vm.commentsAllowed;
	}


	function openVotersPopup() {
		vm.votersOpen = !vm.votersOpen;
	}

	function processVoters() {
		vm.voters = _.filter(vm.user.friends, function(f, i) {
			return vm.friends[i];
		});
		openVotersPopup();
	}

}
