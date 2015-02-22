'use strict';

angular.module('populateApp')
  .controller('QuestionCtrl', QuestionCtrl)

QuestionCtrl.$inject = ['Auth', 'userQuestionService'];

function QuestionCtrl(Auth, userQuestionService) {

	var vm = this;

	vm.user;

	activate();

	function activate() {

		Auth.isLoggedInAsync(function(loggedIn) {
			if (loggedIn) {
				vm.user = Auth.getCurrentUser();
				console.log(vm.user)				
			}
		})
			
	}
}
