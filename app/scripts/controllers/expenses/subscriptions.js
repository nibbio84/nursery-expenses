'use strict';

/**
 * @ngdoc function
 * @name nurseryExpensesApp.controller:ExpensesSubscriptionsCtrl
 * @description
 * # ExpensesSubscriptionsCtrl
 * Controller of the nurseryExpensesApp
 */
angular.module('nurseryExpensesApp')
  .controller('ExpensesSubscriptionsCtrl', function ($rootScope, $scope, $routeParams, databaseService, utilService) {

      $scope.babyFullList = databaseService.babies();
      $scope.allExpenses = databaseService.expenses();

      var date = new Date();
      $scope.year = $routeParams.year ? parseInt($routeParams.year, 10) : date.getFullYear();
      $scope.month = $routeParams.month ? parseInt($routeParams.month, 10) : date.getMonth();

      $scope.$watch("year", updateScope, true);
      $scope.$watch("month", updateScope, true);
      $scope.$watch("babyFullList", updateScope, true);
      $scope.$watch("allExpenses", updateScope, true);


      $scope.monthNames = getMonthNames();

      $scope.moveMonth = function(dir) {
        var incr = moveMonth($scope.month, $scope.year, dir);
        $scope.month = incr["month"];
        $scope.year = incr["year"];
      }

      $scope.pay = function(baby) {
        if($scope.paid && $scope.paid[baby.$id]) {
          return; // No more than one per month
        }

        var operation = {
          type: "earn",
          category: "fee",
          user: $rootScope.loggedUser,
          currency: baby.fee/100,
          value: baby.fee,
          description: "Retta " + $scope.monthNames[$scope.month] + " " + $scope.year + " " + baby.name + " " + baby.surname,
          timestamp: new Date().getTime(),
          year: $scope.year,
          month: $scope.month,
          babyId: baby.$id
        };

        databaseService.addExpense(operation);
      };

      $scope.unpay = function(expense) {
        databaseService.deleteExpense(expense);
      };


      // ---------



      function updateScope() {
        $scope.paid = extractPaid($scope.allExpenses, $scope.month, $scope.year);
        $scope.babyList = filterBabies($scope.babyFullList, $scope.month, $scope.year);
      }

      function extractPaid(expenses, month, year) {
        var paid = {};
        for(var i=0; i<expenses.length; i++) {
          var expense = expenses[i];
          if(expense.category && expense.category=="fee" && expense.year==year && expense.month==month) {
            paid[expense.babyId] = expense;
          }
        }
        return paid;
      }

      function filterBabies(allBabies, month, year) {
        var begin = new Date(year, month, 1).getTime();
        var incr = moveMonth(month, year, 1);
        var end = new Date(incr["year"], incr["month"], 1).getTime();

        var babies = new Array();
        for(var i=0; i<allBabies.length; i++) {
          var baby = allBabies[i];

          if(baby.dateStart && baby.dateStart>=end) {
            continue;
          }
          if(baby.dateEnd && baby.dateEnd<begin) {
            continue;
          }

          babies.push(baby);
        }

        return babies;
      }

      function getMonthNames() {
        return utilService.monthNames;
      }

      function moveMonth(month, year, dir) {
        month = month+dir;
        if(month<0) {
          month = 11;
          year = year - 1;
        } else if(month>11) {
          month = 1;
          year = year + 1;
        }
        return {"month": month, "year": year};
      }

  });
