'use strict';

angular.module('populateApp')
  .controller('AnswerCtrl', AnswerCtrl);

AnswerCtrl.$inject = ['$scope', 'dataService', 'Auth']

function AnswerCtrl($scope, dataService, Auth) {

	var vm = this;

	vm.friends;
	vm.questions = [];
	vm.user;

	activate();

	function activate() {
		vm.user = Auth.getCurrentUser();
		dataService.loadQuestions(vm.user._id)
			.then(function(result) {
				console.log('result', result)
				vm.friends = result.data.friends;
				vm.friends.forEach(function(friend) {
					friend.questions.forEach(function(q) {
						vm.questions.push(q);
					})
				})
			});
	}
}
