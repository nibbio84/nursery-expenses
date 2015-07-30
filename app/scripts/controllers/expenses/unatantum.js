'use strict';

/**
 * @ngdoc function
 * @name nurseryExpensesApp.controller:ExpensesUnatantumCtrl
 * @description
 * # ExpensesUnatantumCtrl
 * Controller of the nurseryExpensesApp
 */
angular.module('nurseryExpensesApp')
  .controller('ExpensesUnatantumCtrl', function ($rootScope, $scope, $routeParams, databaseService, utilService) {

      $scope.babyFullList = databaseService.babies();
      $scope.allExpenses = databaseService.expenses();

      var date = new Date();
      $scope.year = $routeParams.year ? parseInt($routeParams.year, 10) : date.getFullYear();
      $scope.month = $routeParams.month ? parseInt($routeParams.month, 10) : date.getMonth();

      $scope.currency = 320;

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

        var value = Math.abs(parseInt($scope.currency*100, 10));

        var operation = {
          type: "earn",
          category: "unatantum",
          user: $rootScope.loggedUser,
          currency: $scope.currency,
          value: value,
          description: "Iscrizione da " + $scope.monthNames[$scope.month] + " " + $scope.year + " " + baby.name + " " + baby.surname,
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



      // -------------

      function updateScope() {
        var payments = extractPaid($scope.allExpenses, $scope.month, $scope.year, utilService);
        $scope.paid = payments["done"];
        $scope.lastPaid = payments["last"];
        $scope.babyList = filterBabies($scope.babyFullList, $scope.month, $scope.year);

        if(!$scope.currencySet) {
          var last = lastValue($scope.allExpenses);
          if(last) {
            $scope.currencySet = true;
            $scope.currency = last / 100;
          }
        }
      }

      function extractPaid(expenses, month, year, utilService) {
        var paid = {
          done: {},
          last: {}
        };

        var fakeNow = new Date(year, month, 1);

        for(var i=0; i<expenses.length; i++) {
          var expense = expenses[i];
          if(expense.category && expense.category=="unatantum") {
            if(expense.year==year && expense.month==month) {
              paid["done"][expense.babyId] = expense;
            }

            var unaDate = new Date(expense.year, expense.month, 1);
            if(unaDate.getTime() <= fakeNow.getTime()) {
              var monthsBetween = utilService.monthsBetween(unaDate, fakeNow);
              var lastPaid = paid["last"][expense.babyId];
              paid["last"][expense.babyId] = lastPaid || lastPaid===0 ? Math.min(lastPaid, monthsBetween) : monthsBetween;
            }
          }
        }
        return paid;
      }

      function lastValue(expenses) {
        var maxDate = -1;
        var value;
        for(var i=0; i<expenses.length; i++) {
          var expense = expenses[i];
          if(expense.category && expense.category=="unatantum") {
            var unaDate = new Date(expense.year, expense.month, 1);
            if(unaDate.getTime()>maxDate) {
              maxDate = unaDate.getTime();
              value = expense.value;
            }
          }
        }
        return value;
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
