'use strict';

describe('Controller: AskCtrl', function () {

  // load the controller's module
  beforeEach(module('populateApp'));

  var AskCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AskCtrl = $controller('AskCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
