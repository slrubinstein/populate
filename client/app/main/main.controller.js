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
      console.log('logged in?', loggedIn)
      if (loggedIn) {
        vm.loggedIn = true;
      }
    });

    facebookFriends.activate()
      .then(function() {
        if (vm.loggedIn) {
          console.log('logged in and fbook active?', vm.loggedIn)
          getFriends();
        }
      })

  }

  function addFriend(index) {
    vm.friends.splice(index, 1);
  	dataService.addFriend(vm.user._id, vm.databaseFriends[index]._id);
  }

  function getFriends() {
    facebookFriends.getFriends()
      .then(function(friends) {
        console.log('friends', friends)
        var friendIds = _.pluck(friends, 'id');
    
        dataService.getFriendsFromDB(vm.user._id, friendIds)
          .then(function(result) {
            vm.databaseFriends = result.data;
            console.log('friends', vm.databaseFriends)
        });
    });
  }

  function loginOauth(provider) {
    $window.location.href = '/auth/' + provider;
  };
}
