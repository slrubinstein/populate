'use strict';

angular.module('populateApp')
  .controller('AskCtrl', AskCtrl);

AskCtrl.$inject = ['$scope', '$state', 'Auth', 'dataService',
									 'facebookFriends']

function AskCtrl($scope, $state, Auth, dataService,
								 facebookFriends) {

	var vm = this;

	vm.answerers;
	vm.getFriends = getFriends;
	vm.friends = [];
	vm.postQuestion = postQuestion;
	vm.question = '';
	vm.swipeLeft = '';
	vm.swipeRight = '';
	vm.user = Auth.getCurrentUser();


	function getFriends() {
		if (vm.friends.length === 0) {
			vm.friends = facebookFriends.getFriends()
				.then(function(friends) {
					vm.friends = friends;
				});
		}

	}

	function postQuestion() {
		// send question only to selected friends
		var selectedFriends = vm.answerers === 'all' ? 'all' :
														vm.friends.filter(function(f) {
															return f.selected;
														});

		// decide how to pass along if everyone is answering or just selected friends
		console.log(selectedFriends)

		dataService.post({
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
		}, selectedFriends);

		vm.question = '';
		vm.swipeRight = '';
		vm.swipeLeft = '';
	}
}
