'use strict';

/**
 * @ngdoc function
 * @name nurseryExpensesApp.controller:ExpensesAddCtrl
 * @description
 * # ExpensesAddCtrl
 * Controller of the nurseryExpensesApp
 */
angular.module('nurseryExpensesApp')
  .controller('ExpensesAddCtrl', function ($scope, $location, databaseService) {

    $scope.expense = {
      type: "expense",
      category: databaseService.defaultExpenseCategory
    };

    $scope.expenseCategories = databaseService.expenseCategories;

    $scope.save = function() {
      var expense = angular.copy($scope.expense);

      var sign = expense.type=='earn' ? +1 : -1;
      // fix sign and convert to eurocent
      expense.value = sign * Math.abs(Math.round(expense.currency*100));

      expense.timestamp = new Date().getTime();
      databaseService.addExpense(expense)
        .then(function() {
          $location.path("/expenses/list");
        });
    };

  });
