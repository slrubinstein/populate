'use strict';

angular.module('populateApp')
  .factory('facebookFriends', facebookFriends);

facebookFriends.$inject = ['$q']

function facebookFriends($q) {

  var facebookFriends = [];

  return {
    facebookFriends: facebookFriends,
    getFriends: getFriends
  }

  function getFriends() {
    var deferred = $q.defer();

    if (!FB) {
      return;
    }

    FB.getLoginStatus(function(response) {
      console.log('get login status', response)
      if (response.status === 'connected') {

        FB.api(
          "/me/friends",
          function (response) {
            console.log('FB.api')
            console.log(response)
            if (response && !response.error) {
              console.log('facebook friends returned', response)
              facebookFriends = response.data;
              deferred.resolve(facebookFriends);
            }
          }
        );
      }
    });
    return deferred.promise;
  }
}
