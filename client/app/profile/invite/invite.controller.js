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
    });

    facebookFriends.activate()
    .then(function() {
      facebookFriends.getFriends()
      .then(function(response) {
      	angular.copy(response, vm.facebookFriends);
        console.log('fbook', vm.facebookFriends)
      });
    }, function(err) {
      console.log('facebook friends not found. Err:', err);
    })
	}

  function addFriend(index) {
    userQuestionService.addFriend(vm.user._id, vm.facebookFriends[index]);
    vm.currentFriends.push(vm.facebookFriends[index]);
  }

  function notFriends(index) {
    var ids = vm.currentFriends.map(function(f) {
      return f._id || f.id;
    });
    return ids.indexOf(vm.facebookFriends[index].id) < 0;
  }
}