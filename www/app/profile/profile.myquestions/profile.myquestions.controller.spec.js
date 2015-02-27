'use strict';

describe('Controller: ProfileMyquestionsCtrl', function () {

  // load the controller's module
  beforeEach(module('populateApp'));

  var ProfileMyquestionsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfileMyquestionsCtrl = $controller('ProfileMyquestionsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
