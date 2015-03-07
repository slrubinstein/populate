'use strict';

describe('Directive: addComment', function () {

  // load the directive's module and view
  beforeEach(module('populateApp'));
  beforeEach(module('app/answer/addComment/addComment.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<add-comment></add-comment>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the addComment directive');
  }));
});