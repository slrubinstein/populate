'use strict';

angular.module('populateApp')
  .factory('User', function ($resource) {
    return $resource('http://192.168.1.4:9000/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
