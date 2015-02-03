'use strict';

describe('Service: userQuestionService', function () {

  // load the service's module
  beforeEach(module('populateApp'));

  // instantiate service
  var userQuestionService;
  beforeEach(inject(function (_userQuestionService_) {
    userQuestionService = _userQuestionService_;
  }));

  it('should do something', function () {
    expect(!!userQuestionService).toBe(true);
  });

});
