'use strict';

angular.module('populateApp')
  .controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject = ['Auth'];

function ProfileCtrl(Auth) {

  var vm = this;

  vm.loggedIn = false;
  vm.user;
  vm.profilePage = true;

  activate();

  function activate() {
  	vm.user = Auth.getCurrentUser();

    Auth.isLoggedInAsync(function(loggedIn) {
      if (loggedIn) {
        vm.loggedIn = true;
        vm.profilePic = 'https://graph.facebook.com/' +
                         vm.user.facebook.id + '/picture';
      }
    });

  }
}
