'use strict';

/**
 * @ngdoc function
 * @name nurseryExpensesApp.controller:ExpensesListCtrl
 * @description
 * # ExpensesListCtrl
 * Controller of the nurseryExpensesApp
 */
angular.module('nurseryExpensesApp')
  .controller('ExpensesListCtrl', function ($scope, databaseService) {

    $scope.expenseList = databaseService.expenses();

    $scope.$watch("expenseList", function() {
      var total = 0;
      for(var i=0; i<$scope.expenseList.length; i++) {
        total += $scope.expenseList[i].value;
      }
      $scope.total = total;
    }, true);


    $scope.delete = function(expense) {
      databaseService.deleteExpense(expense);
    };


  });
