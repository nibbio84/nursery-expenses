'use strict';

describe('Controller: ExpensesListCtrl', function () {

  // load the controller's module
  beforeEach(module('nurseryExpensesApp'));

  var ExpensesListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExpensesListCtrl = $controller('ExpensesListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ExpensesListCtrl.awesomeThings.length).toBe(3);
  });
});
