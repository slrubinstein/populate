'use strict';

angular.module('populateApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope', '$http', '$state', 'facebookFriends',
										'dataService', 'Auth'];

function MainCtrl($scope, $http, $state, facebookFriends,
									dataService, Auth) {

  var vm = this;

  vm.addFriend = addFriend;
  vm.friends = [];
  vm.databaseFriends = [];
  vm.user;

  activate();

  function activate() {
  	vm.user = Auth.getCurrentUser();

    facebookFriends.getFriends()
      .then(function(friends) {
        var friendIds = _.pluck(friends, 'id');
        console.log('friend ids', friendIds);
    
      	dataService.getFriendsFromDB(vm.user._id, friendIds)
      	  .then(function(result) {
            console.log('result', result)
      			vm.databaseFriends = result.data;
      	});
      });


  }

  function addFriend(index) {
    vm.friends.splice(index, 1);
  	dataService.addFriend(vm.user._id, vm.databaseFriends[index]._id);
  }

}
