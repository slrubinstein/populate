'use strict';

angular.module('populateApp')
  .factory('facebookFriends', facebookFriends);

facebookFriends.$inject = ['$q']

function facebookFriends($q) {

  var facebookFriends = [];
  var facebookLogin = false;

  return {
    activate: activate,
    facebookFriends: facebookFriends,
    getFriends: getFriends,
    facebookLogin: facebookLogin
  }

  function activate() {
    // returns a promise so friends will not be requested
    // before facebook api has loaded
    var deferred = $q.defer();

     window.fbAsyncInit = function() {
      FB.init({
        // appId      : '777210872316391', // h
        appId      : '776373095733502', // l
        xfbml      : true,
        version    : 'v2.1',
        status     : true
      });
      deferred.resolve(true);
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));

    return deferred.promise;
  }

  function getFriends() {
    var deferred = $q.defer();
    if (!FB) {
      return;
    }

    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {

        FB.api(
          "/me/friends",
          function (response) {
            if (response && !response.error) {
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
