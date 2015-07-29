'use strict';

/**
 * @ngdoc function
 * @name nurseryExpensesApp.controller:ExpensesEditCtrl
 * @description
 * # ExpensesEditCtrl
 * Controller of the nurseryExpensesApp
 */
angular.module('nurseryExpensesApp')
  .controller('ExpensesEditCtrl', function ($scope, $routeParams, $location, databaseService) {
    var id = $routeParams.id;

    $scope.expense = databaseService.getExpense(id);

    $scope.expenseCategories = databaseService.expenseCategories;

    $scope.save = function() {
      var expense = $scope.expense;

      var sign = expense.type=='earn' ? +1 : -1;
      // fix sign and convert to eurocent
      expense.value = sign * Math.abs(Math.round(expense.currency*100));

      databaseService.putExpense($scope.expense)
        .then(function() {
          $location.path("/expenses/list");
        });
    };

    $scope.delete = function() {
      databaseService.deleteExpense($scope.expense)
        .then(function() {
          $location.path("/expenses/list");
        });
    };

  });
