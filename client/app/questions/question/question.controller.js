'use strict';

angular.module('populateApp')
  .controller('QuestionCtrl', QuestionCtrl)

QuestionCtrl.$inject = ['Auth', 'userQuestionService', 'dataService', 
												'$state', '$stateParams'];

function QuestionCtrl(Auth, userQuestionService, dataService, 
											$state, $stateParams) {

	var vm = this;

  vm.addNewComment = addNewComment;
	vm.choice;
	vm.currentQuestion = userQuestionService.currentQuestion;
	vm.comment = '';
	vm.commentsOpen = false;
	vm.nextQuestion = nextQuestion;
	vm.openCommentsPopup = openCommentsPopup;
	vm.pic = '';
	vm.select = select;
	vm.vote = vote;
	vm.user;

	activate();

	function activate() {
		userQuestionService.getUser()
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
    openCommentsPopup();
    vm.comment = '';
	}

	function nextQuestion() {
		if (!userQuestionService.nextQuestion()) {
			console.log('no more questions')
		}
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
