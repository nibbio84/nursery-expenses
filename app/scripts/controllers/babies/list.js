'use strict';

/**
 * @ngdoc function
 * @name nurseryExpensesApp.controller:BabiesListCtrl
 * @description
 * # BabiesListCtrl
 * Controller of the nurseryExpensesApp
 */
angular.module('nurseryExpensesApp')
  .controller('BabiesListCtrl', function ($scope, databaseService) {

    $scope.babyList = databaseService.babies();

    $scope.$watch("babyList", function() {

      var currentBabyList = new Array();
      var oldBabyList = new Array();

      var now = new Date().getTime();
      for(var i=0; i<$scope.babyList.length; i++) {
        var baby = $scope.babyList[i];
        if(baby && baby.dateOfBirth) {
          var months = Math.floor((now-baby.dateOfBirth)/1000.0/60/60/24/(365/12));
          baby.age = months;
          baby.ageYears = parseInt(months / 12, 10);
        }

        if(baby && baby.dateEnd && (baby.dateEnd + 1000*60*60*24 -1) < now) {
          oldBabyList.push(baby);
        } else {
          currentBabyList.push(baby);
        }
      }

      $scope.currentBabyList = currentBabyList;
      $scope.oldBabyList = oldBabyList;

    }, true);


  });
