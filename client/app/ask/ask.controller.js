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
	vm.timerOptions = ['10 minutes', '30 minutes', '1 hour', '12 hours', '24 hours', '2 days', '7 days'];
	vm.user = Auth.getCurrentUser();

	// vm.profilePic = 'https://graph.facebook.com/' +
 //                   vm.user.facebook.id + '/picture' || null;

  var timerMillis = [10 * 60 * 1000, 30 * 60 * 1000, 60 * 60 * 1000, 
  									 12 * 60 * 60 * 1000, 24 * 60 * 60 * 1000,
  									 2 * 24 * 60 * 60 * 1000, 7 * 24 * 60 * 60 * 1000];


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
		// if (vm.answerers === undefined) {
		// 	return;
		// }
		// send question only to selected friends
		var selectedFriends = vm.answerers === 'all' ? 'all' :
														vm.friends.filter(function(f) {
															return f.selected;
														});

		var date = new Date;
		var newQuestion = {
			askerId: vm.user._id,
			askerName: vm.user.name,
			askerPic: 'https://graph.facebook.com/' + vm.user.facebook.id + '/picture',
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
			},
			timeCreated: date,
			closesAt: new Date (date.getTime() + timerMillis[vm.timerIndex])
		};

		dataService.post(newQuestion, selectedFriends);
		vm.question = '';
		vm.swipeLeft = '';
		vm.swipeRight = '';
		$state.go('profile.me');
	}
}
