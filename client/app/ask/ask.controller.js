'use strict';

angular.module('populateApp')
  .controller('AskCtrl', AskCtrl);

AskCtrl.$inject = ['$scope', '$state', 'Auth', 'dataService',
									 'facebookFriends', '$stateParams']

function AskCtrl($scope, $state, Auth, dataService,
								 facebookFriends, $stateParams) {

	var vm = this;

	vm.answerers;
	vm.getFriends = getFriends;
	vm.friends = [];
	vm.newQuestion = $stateParams.newQuestion;
	vm.pastQuestions = $stateParams.pastQuestions;
	vm.postQuestion = postQuestion;
	vm.question = '';
	vm.seePastQuestions = seePastQuestions;
	vm.swipeLeft = '';
	vm.swipeRight = '';
	vm.user = Auth.getCurrentUser();

	function getFriends() {
		if (vm.friends.length === 0) {
			facebookFriends.getFriends()
				.then(function(friends) {
					vm.friends = friends;
				});
		}

	}

	function postQuestion() {
		if (vm.answerers === undefined) {
			return;
		}
		// send question only to selected friends
		var selectedFriends = vm.answerers === 'all' ? 'all' :
														vm.friends.filter(function(f) {
															return f.selected;
														});

		var newQuestion = {
			owner: vm.user._id,
			query: vm.question,
			swipeLeft: {
				option: vm.swipeLeft,
				votes: 0,
				image: ''
			},
			swipeRight: {
				option: vm.swipeRight,
				votes: 0,
				image: ''
			}
		};

		dataService.post(newQuestion, selectedFriends);

		$state.go('ask.confirmation', {newQuestion: newQuestion});
	}

	function seePastQuestions() {
		dataService.seePastQuestions(vm.user._id)
			.then(function(result) {
				$state.go('ask.pastquestions', {pastQuestions: result.data});
			});
	}
}
