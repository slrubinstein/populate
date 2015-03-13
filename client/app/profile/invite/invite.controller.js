'use strict';

angular.module('populateApp')
  .controller('InviteCtrl', InviteCtrl);

InviteCtrl.$inject = ['facebookFriends', 'userQuestionService', 'dataService'];

function InviteCtrl (facebookFriends, userQuestionService, dataService) {
	var vm = this;

  vm.addFriend = addFriend;
  vm.currentFriends = [];
	vm.facebookFriends = [];
  vm.notFriends = notFriends;
  vm.test = 'test'

	activate();


	function activate() {
	  userQuestionService.getUser()
    .then(function(user) {
      vm.user = user;
      vm.pic = vm.user.facebook ? 'https://graph.facebook.com/' +
                vm.user.facebook.id + '/picture' : '';
      angular.copy(vm.user.friends, vm.currentFriends);
      console.log('current', vm.currentFriends);
      compareFriends();
    });

    facebookFriends.activate()
    .then(function() {
      
      facebookFriends.getFriends()
      .then(function(response) {
      	angular.copy(response, vm.facebookFriends);
        console.log('fbook', vm.facebookFriends)
        compareFriends();
      });
    }, function(err) {
      console.log('facebook friends not found. Err:', err);
    })
	}

  function addFriend(index) {
    dataService.addFriend(vm.user._id, vm.facebookFriends[index].id)
    .then(function(response) {
      angular.copy(response.data.friends, vm.currentFriends);
    });
  }

  function notFriends(index) {
    return vm.currentFriends.indexOf(vm.facebookFriends[index].id) < 0;
  }
}