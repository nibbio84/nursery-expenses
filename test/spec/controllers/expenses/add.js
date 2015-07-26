'use strict';

describe('Controller: ExpensesAddCtrl', function () {

  // load the controller's module
  beforeEach(module('nurseryExpensesApp'));

  var ExpensesAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExpensesAddCtrl = $controller('ExpensesAddCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ExpensesAddCtrl.awesomeThings.length).toBe(3);
  });
});
