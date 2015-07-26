'use strict';

describe('Controller: ExpensesEditCtrl', function () {

  // load the controller's module
  beforeEach(module('nurseryExpensesApp'));

  var ExpensesEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExpensesEditCtrl = $controller('ExpensesEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ExpensesEditCtrl.awesomeThings.length).toBe(3);
  });
});
