'use strict';

angular.module('populateApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope', '$http', '$state', 'facebookFriends',
										'dataService', 'Auth', '$window'];

function MainCtrl($scope, $http, $state, facebookFriends,
									dataService, Auth, $window) {

  var vm = this;

  // vm.addFriend = addFriend;
  // vm.databaseFriends = [];
  vm.loggedIn = false;
  vm.loginOauth = loginOauth;
  vm.user;

  activate();

  function activate() {
    facebookFriends.activate();
    vm.user = Auth.getCurrentUser();

    Auth.isLoggedInAsync(function(loggedIn) {
      if (loggedIn) {
        $state.go('answer');
      }
    });

    //   .then(function() {
    //     if (vm.loggedIn) {
    //       getFriends();
    //     }
    //   });

  }

  // function addFriend(index) {
  //   dataService.addFriend(vm.user._id, vm.databaseFriends[index]._id);
  //   vm.databaseFriends.splice(index, 1);
  // }

  // function getFriends() {
  //   facebookFriends.getFriends()
  //     .then(function(friends) {
  //       console.log('facebook friends', friends)
  //       var friendIds = _.pluck(friends, 'id');
    
  //       dataService.getFriendsFromDB(vm.user._id, friendIds)
  //         .then(function(result) {
  //           vm.databaseFriends = result.data;
  //           console.log('friends from DB', vm.databaseFriends)
  //       });
  //   });
  // }

  function loginOauth(provider) {
    $window.location.href = '/auth/' + provider;
  };
}
