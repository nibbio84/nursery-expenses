'use strict';

/**
 * @ngdoc function
 * @name nurseryExpensesApp.controller:BabiesEditCtrl
 * @description
 * # BabiesEditCtrl
 * Controller of the nurseryExpensesApp
 */
angular.module('nurseryExpensesApp')
  .controller('BabiesEditCtrl', function ($scope, $routeParams, $location, databaseService) {
    var id = $routeParams.id;

    $scope.baby = databaseService.getBaby(id);
    $scope.$watch("baby", function() {
      if(!$scope.dateOfBirth && $scope.baby && $scope.baby.dateOfBirth) {
        if($scope.baby.dateOfBirth) {
          $scope.dateOfBirth = new Date($scope.baby.dateOfBirth);
        }
        if($scope.baby.dateStart) {
          $scope.dateStart = new Date($scope.baby.dateStart);
        }
        if($scope.baby.dateEnd) {
          $scope.dateEnd = new Date($scope.baby.dateEnd);
        }
      }
    }, true);

    $scope.save = function() {
      var baby = $scope.baby;

      // convert to eurocent
      baby.fee = Math.abs(Math.round(baby.feeCurrency*100));

      databaseService.putBaby(baby)
        .then(function() {
          $location.path("/babies/list");
        });
    };

    $scope.delete = function() {
      databaseService.deleteBaby($scope.baby)
        .then(function() {
          $location.path("/babies/list");
        });
    };

  });
