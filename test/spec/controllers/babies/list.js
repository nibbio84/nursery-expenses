'use strict';

describe('Controller: BabiesListCtrl', function () {

  // load the controller's module
  beforeEach(module('nurseryExpensesApp'));

  var BabiesListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BabiesListCtrl = $controller('BabiesListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BabiesListCtrl.awesomeThings.length).toBe(3);
  });
});
