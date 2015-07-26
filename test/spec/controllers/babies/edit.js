'use strict';

describe('Controller: BabiesEditCtrl', function () {

  // load the controller's module
  beforeEach(module('nurseryExpensesApp'));

  var BabiesEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BabiesEditCtrl = $controller('BabiesEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BabiesEditCtrl.awesomeThings.length).toBe(3);
  });
});
