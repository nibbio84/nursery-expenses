'use strict';

describe('Controller: AuthLoginCtrl', function () {

  // load the controller's module
  beforeEach(module('nurseryExpensesApp'));

  var AuthLoginCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AuthLoginCtrl = $controller('AuthLoginCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AuthLoginCtrl.awesomeThings.length).toBe(3);
  });
});
