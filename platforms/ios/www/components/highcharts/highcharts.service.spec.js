'use strict';

describe('Service: highcharts', function () {

  // load the service's module
  beforeEach(module('populateApp'));

  // instantiate service
  var highcharts;
  beforeEach(inject(function (_highcharts_) {
    highcharts = _highcharts_;
  }));

  it('should do something', function () {
    expect(!!highcharts).toBe(true);
  });

});
