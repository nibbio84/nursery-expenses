'use strict';

/**
 * @ngdoc overview
 * @name nurseryExpensesApp
 * @description
 * # nurseryExpensesApp
 *
 * Main module of the application.
 */

var resolver = function(access) {
 return {
   load: function($q, $location, databaseService) {
     var deferred = $q.defer();
     if (access) {
       deferred.resolve();
     } else {
       databaseService.sync().then(function() {
         deferred.resolve();
       }, function() {
         deferred.reject();
         $location.url('/auth/login');
       });
     }
     return deferred.promise;
   }
 };
};

angular
  .module('nurseryExpensesApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        resolve: resolver(true)
      })
      .when('/expenses/add', {
        templateUrl: 'views/expenses/add.html',
        controller: 'ExpensesAddCtrl',
        controllerAs: 'expenses/add',
        resolve: resolver(false)
      })
      .when('/expenses/list', {
        templateUrl: 'views/expenses/list.html',
        controller: 'ExpensesListCtrl',
        controllerAs: 'expenses/list',
        resolve: resolver(false)
      })
      .when('/expenses/edit/:id', {
        templateUrl: 'views/expenses/edit.html',
        controller: 'ExpensesEditCtrl',
        controllerAs: 'expenses/edit',
        resolve: resolver(false)
      })
      .when('/babies/list', {
        templateUrl: 'views/babies/list.html',
        controller: 'BabiesListCtrl',
        controllerAs: 'babies/list',
        resolve: resolver(false)
      })
      .when('/babies/add', {
        templateUrl: 'views/babies/add.html',
        controller: 'BabiesAddCtrl',
        controllerAs: 'babies/add',
        resolve: resolver(false)
      })
      .when('/babies/edit/:id', {
        templateUrl: 'views/babies/edit.html',
        controller: 'BabiesEditCtrl',
        controllerAs: 'babies/edit',
        resolve: resolver(false)
      })
      .when('/subscriptions', {
        templateUrl: 'views/subscriptions.html',
        controller: 'SubscriptionsCtrl',
        controllerAs: 'subscriptions',
        resolve: resolver(false)
      })
      .when('/expenses/subscriptions', {
        templateUrl: 'views/expenses/subscriptions.html',
        controller: 'ExpensesSubscriptionsCtrl',
        controllerAs: 'expenses/subscriptions',
        resolve: resolver(false)
      })
      .when('/expenses/unaTantum', {
        templateUrl: 'views/expenses/unatantum.html',
        controller: 'ExpensesUnatantumCtrl',
        controllerAs: 'expenses/unaTantum',
        resolve: resolver(false)
      })
      .when('/auth/login', {
        templateUrl: 'views/auth/login.html',
        controller: 'AuthLoginCtrl',
        controllerAs: 'auth/login',
        resolve: resolver(true)
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($rootScope, $location, databaseService) {

    // Global functions
    $rootScope.globalLogout = function() {
      databaseService.logout();
      $location.path("/");
    };

  });
