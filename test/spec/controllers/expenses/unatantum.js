'use strict';

describe('Controller: ExpensesUnatantumCtrl', function () {

  // load the controller's module
  beforeEach(module('nurseryExpensesApp'));

  var ExpensesUnatantumCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExpensesUnatantumCtrl = $controller('ExpensesUnatantumCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ExpensesUnatantumCtrl.awesomeThings.length).toBe(3);
  });
});
