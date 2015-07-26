'use strict';

/**
 * @ngdoc function
 * @name nurseryExpensesApp.controller:BabiesAddCtrl
 * @description
 * # BabiesAddCtrl
 * Controller of the nurseryExpensesApp
 */
angular.module('nurseryExpensesApp')
  .controller('BabiesAddCtrl', function ($scope, $location, $document, databaseService) {

    $scope.save = function() {
      var baby = angular.copy($scope.baby);
      baby.timestamp = new Date().getTime();

      // convert to eurocent
      baby.fee = Math.abs(Math.round(baby.feeCurrency*100));

      databaseService.addBaby(baby)
        .then(function() {
          $location.path("/babies/list");
        });

    };

  });
