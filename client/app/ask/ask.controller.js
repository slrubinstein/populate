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
	vm.swipeLeft = '';
	vm.swipeRight = '';
	vm.timerIndex = 1;
	vm.timerOptions = ['10 minutes', '30 minutes', '1 hour', '12 hours', '24 hours', '2 days', '7 days']
	vm.user = Auth.getCurrentUser();

	vm.profilePic = 'https://graph.facebook.com/' +
                   vm.user.facebook.id + '/picture' || null;

	function getFriends() {
		if (vm.friends.length === 0) {
			// facebookFriends.getFriends()
			dataService.getUserFriends()
				.then(function(result) {
					vm.friends = result.data.friends;
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
}
