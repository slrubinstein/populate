'use strict';

angular.module('populateApp')
  .controller('InviteCtrl', InviteCtrl);

InviteCtrl.$inject = ['facebookFriends', 'userQuestionService'];

function InviteCtrl (facebookFriends, userQuestionService) {
	var vm = this;

	vm.friends = [];
  vm.test = 'test'

	activate();


	function activate() {
	  userQuestionService.getUser()
    .then(function(user) {
      vm.user = user;
      vm.pic = vm.user.facebook ? 'https://graph.facebook.com/' +
                vm.user.facebook.id + '/picture' : '';
      vm.currentQuestions = vm.user.myQuestionsActive;
    });
    facebookFriends.activate()
    .then(function() {
      
      facebookFriends.getFriends()
      .then(function(response) {
      	angular.copy(response, vm.friends);
        console.log(vm.friends)
      });
    })
	}
}