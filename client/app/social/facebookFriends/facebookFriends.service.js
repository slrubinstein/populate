'use strict';

angular.module('populateApp')
  .factory('facebookFriends', facebookFriends);

function facebookFriends() {

  var facebookFriends = [];

  return {
    facebookFriends: facebookFriends,
    getFriends: getFriends
  }

  function getFriends() {
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {

        FB.api(
          "/me/friends",
          function (response) {
            if (response && !response.error) {
              facebookFriends = response.data;
              return facebookFriends;
            }
          }
        );
      }
    });
  }
}
