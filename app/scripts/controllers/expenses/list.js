'use strict';

/**
 * @ngdoc function
 * @name nurseryExpensesApp.controller:ExpensesListCtrl
 * @description
 * # ExpensesListCtrl
 * Controller of the nurseryExpensesApp
 */
angular.module('nurseryExpensesApp')
  .controller('ExpensesListCtrl', function ($scope, databaseService, utilService) {

    $scope.allExpenses = databaseService.expenses();

    $scope.$watch("allExpenses", function() {

      var expensesPerMonth = {};

      for(var i=0; i<$scope.allExpenses.length; i++) {
        var exp = $scope.allExpenses[i];
        var date = new Date(exp.timestamp);
        var y = date.getFullYear();
        var m = date.getMonth();
        m = m<10 ? "0" + m : "" + m;
        var yearMonth = y + m;

        if(!expensesPerMonth[yearMonth]) {
          expensesPerMonth[yearMonth] = new Array();
        }
        expensesPerMonth[yearMonth].push(exp);
      }

      // Compute totals
      var totalsPerMonth = {};
      for(var yearMonth in expensesPerMonth) {
        var expenses = expensesPerMonth[yearMonth];
        var total = 0;
        for(var i=0; i<expenses.length; i++) {
          total += exp.value;
        }
        totalsPerMonth[yearMonth] = total;
      }

      // define months
      var namesPerMonth = {};
      for(var yearMonth in expensesPerMonth) {
        var y = yearMonth.substring(0, 4);
        var m = parseInt(yearMonth.substring(4), 10);
        namesPerMonth[yearMonth] = utilService.monthNames[m] + " " + y;
      }

      var months = new Array();
      for(var yearMonth in expensesPerMonth) {
        months.push(yearMonth);
      }
      var now = new Date(); // add current month if not present
      var yNow = now.getFullYear();
      var mNow = now.getMonth();
      mNow = mNow<10 ? "0" + mNow : "" + mNow;
      var yearMonthNow = yNow + mNow;
      if(!expensesPerMonth[yearMonthNow]) {
        months.push(yearMonthNow);
      }

      $scope.expensesPerMonth = expensesPerMonth;
      $scope.totalsPerMonth = totalsPerMonth;
      $scope.namesPerMonth = namesPerMonth;
      $scope.months = months;

    }, true);


  });
