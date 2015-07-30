'use strict';

/**
 * @ngdoc function
 * @name nurseryExpensesApp.controller:AuthLoginCtrl
 * @description
 * # AuthLoginCtrl
 * Controller of the nurseryExpensesApp
 */
angular.module('nurseryExpensesApp')
  .controller('AuthLoginCtrl', function ($scope, $routeParams, $location, databaseService) {

    $scope.login = function() {

      databaseService.login($scope.username, $scope.password)
      .then(function() {
        // Success
        return databaseService.sync();
      }).then(function() {
        $location.path("/expenses/list");
      }, function() {
        // Fail
        $scope.loginError = true;
      });

    };

  });
