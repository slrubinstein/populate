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

  vm.addNewComment = addNewComment;
	vm.askQuestion = askQuestion;
	vm.choice;
	vm.currentQuestion = userQuestionService.currentQuestion;
	vm.comment = '';
	vm.commentsAllowed = false;
	vm.commentsOpen = false;
	vm.enableComments = enableComments;
	vm.file1 = '';
	vm.friends = [];
	vm.nextQuestion = nextQuestion;
	vm.openCommentsPopup = openCommentsPopup;
	vm.openVotersPopup = openVotersPopup;
	vm.pic = '';
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
	vm.select = select;
	vm.timerIndex = 2;
	vm.timerOptions = ['10 minutes', '30 minutes', '1 hour', '12 hours', '24 hours', '2 days', '7 days'];
	vm.vote = vote;
	vm.voters = [];
	vm.votersOpen = false;
	vm.user;

	activate();

	function activate() {
		userQuestionService.resetUser()
		.then(function(response) {
			vm.user = response;
      vm.pic = vm.user.facebook ? 'https://graph.facebook.com/' +
        vm.user.facebook.id + '/picture' : '';
			console.log(vm.user)
			console.log('question', vm.currentQuestion)		
		});
	}

	function addNewComment() {
		dataService.addComment(vm.currentQuestion._id, {_id: vm.user._id,
																							      name: vm.user.name,
																							      comment: vm.comment
    })
    	.then(function(response) {
    		vm.currentQuestion = response.data;
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

	function processVoters() {
		vm.voters = _.filter(vm.user.friends, function(f, i) {
			return vm.friends[i];
		});
		openVotersPopup();
	}

	function enableComments() {
		vm.commentsAllowed = !vm.commentsAllowed;
	}

	function nextQuestion() {
		if (!userQuestionService.nextQuestion()) {
			console.log('no more questions')
		}
	}

	function openVotersPopup() {
		vm.votersOpen = !vm.votersOpen;
	}

	function openCommentsPopup() {
		vm.commentsOpen = !vm.commentsOpen;
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
