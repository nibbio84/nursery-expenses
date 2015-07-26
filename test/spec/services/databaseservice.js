'use strict';

describe('Service: databaseService', function () {

  // load the service's module
  beforeEach(module('nurseryExpensesApp'));

  // instantiate service
  var databaseService;
  beforeEach(inject(function (_databaseService_) {
    databaseService = _databaseService_;
  }));

  it('should do something', function () {
    expect(!!databaseService).toBe(true);
  });

});
