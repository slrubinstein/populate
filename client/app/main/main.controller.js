'use strict';

angular.module('populateApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope', '$http', '$state', 'facebookFriends',
										'dataService', 'Auth', '$window'];

function MainCtrl($scope, $http, $state, facebookFriends,
									dataService, Auth, $window) {

  var vm = this;

  vm.addFriend = addFriend;
  vm.friends = [];
  vm.databaseFriends = [];
  vm.loggedIn = false;
  vm.loginOauth = loginOauth;
  vm.user;

  activate();

  function activate() {
  	vm.user = Auth.getCurrentUser();

    Auth.isLoggedInAsync(function(loggedIn) {
      if (loggedIn) {
        getFriends();
        vm.loggedIn = true;
        console.log('user', vm.user)
      }
    });

  }

  function addFriend(index) {
    vm.friends.splice(index, 1);
  	dataService.addFriend(vm.user._id, vm.databaseFriends[index]._id);
  }

  function getFriends() {
    facebookFriends.getFriends()
      .then(function(friends) {
        var friendIds = _.pluck(friends, 'id');
    
        dataService.getFriendsFromDB(vm.user._id, friendIds)
          .then(function(result) {
            vm.databaseFriends = result.data;
        });
    });
  }

  function loginOauth(provider) {
    $window.location.href = '/auth/' + provider;
  };
}
