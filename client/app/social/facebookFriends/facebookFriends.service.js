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

    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {

        FB.api(
          "/me/friends",
          function (response) {
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
