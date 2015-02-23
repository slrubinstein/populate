'use strict';

describe('Directive: chooseVoters', function () {

  // load the directive's module and view
  beforeEach(module('populateApp'));
  beforeEach(module('app/ask/chooseVoters/chooseVoters.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<choose-voters></choose-voters>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the chooseVoters directive');
  }));
});