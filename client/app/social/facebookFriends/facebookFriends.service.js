'use strict';

angular.module('populateApp')
  .factory('facebookFriends', facebookFriends);

facebookFriends.$inject = ['$q']

function facebookFriends($q) {

  var facebookFriends = [];
  var facebookLoaded = false;

  return {
    activate: activate,
    facebookFriends: facebookFriends,
    getFriends: getFriends,
    facebookLoaded: facebookLoaded
  }

  function activate() {
    // returns a promise so friends will not be requested
    // before facebook api has loaded
    var deferred = $q.defer(),
        svc = this;

    if (svc.facebookLoaded) {
      console.log('facebook already loaded. returning...')
      deferred.resolve(true);
      return deferred.promise;
    }

    console.log('facebook not found. initializing facebook...')

    window.fbAsyncInit = function() {
      FB.init({
        // appId      : '777210872316391', // h
        appId      : '776373095733502', // l
        xfbml      : true,
        version    : 'v2.1',
        status     : true
      });
      svc.facebookLoaded = true;
      console.log('facebook loaded');
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
      console.log('facebook initializing failed')
      return;
    }
    console.log('requesting facebook friends')
    FB.getLoginStatus(function(response) {
      console.log('facebook responded', response)
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
