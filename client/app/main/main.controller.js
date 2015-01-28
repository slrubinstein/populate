'use strict';

angular.module('populateApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope', '$http', '$state', 'facebookFriends',
										'dataService', 'Auth'];

function MainCtrl($scope, $http, $state, facebookFriends,
									dataService, Auth) {

  var vm = this;

  vm.addFriend = addFriend;
  vm.friends = facebookFriends.getFriends();
  vm.databaseFriends = [];
  vm.user;

  activate();

  function activate() {
  	vm.user = Auth.getCurrentUser();
  	dataService.getFriendsFromDB()
  	  .then(function(result) {
  			vm.databaseFriends = result.data
  	});
  }

  function addFriend(index) {
  	dataService.addFriend(vm.user._id, vm.databaseFriends[index]._id);
  }

}
