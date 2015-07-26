'use strict';

describe('Controller: ExpensesSubscriptionsCtrl', function () {

  // load the controller's module
  beforeEach(module('nurseryExpensesApp'));

  var ExpensesSubscriptionsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExpensesSubscriptionsCtrl = $controller('ExpensesSubscriptionsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ExpensesSubscriptionsCtrl.awesomeThings.length).toBe(3);
  });
});
