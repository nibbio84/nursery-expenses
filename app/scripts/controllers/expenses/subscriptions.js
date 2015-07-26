'use strict';

/**
 * @ngdoc function
 * @name nurseryExpensesApp.controller:ExpensesSubscriptionsCtrl
 * @description
 * # ExpensesSubscriptionsCtrl
 * Controller of the nurseryExpensesApp
 */
angular.module('nurseryExpensesApp')
  .controller('ExpensesSubscriptionsCtrl', function ($scope, databaseService) {

    $scope.babyList = databaseService.babies();

    var date = new Date();
    $scope.year = date.getFullYear();
    $scope.month = date.getMonth() + 1;


    $scope.monthNames = {1: "Gennaio", 2: "Febbraio", 3: "Marzo", 4: "Aprile", 5: "Maggio", 6: "Giugno", 7: "Luglio", 8: "Agosto", 9: "Settembre", 10: "Ottobre", 11: "Novembre", 12: "Dicembre"};

    $scope.moveMonth = function(dir) {
      $scope.month = $scope.month+dir;
      if($scope.month<1) {
        $scope.month = 12;
        $scope.year = $scope.year - 1;
      } else if($scope.month>12) {
        $scope.month = 1;
        $scope.year = $scope.year + 1;
      }
    };


  });
