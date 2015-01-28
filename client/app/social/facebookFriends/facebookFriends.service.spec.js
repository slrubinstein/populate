'use strict';

describe('Service: facebookFriends', function () {

  // load the service's module
  beforeEach(module('populateApp'));

  // instantiate service
  var facebookFriends;
  beforeEach(inject(function (_facebookFriends_) {
    facebookFriends = _facebookFriends_;
  }));

  it('should do something', function () {
    expect(!!facebookFriends).toBe(true);
  });

});
