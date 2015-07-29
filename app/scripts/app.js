'use strict';

/**
 * @ngdoc overview
 * @name nurseryExpensesApp
 * @description
 * # nurseryExpensesApp
 *
 * Main module of the application.
 */
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
        controllerAs: 'main'
      })
      .when('/expenses/add', {
        templateUrl: 'views/expenses/add.html',
        controller: 'ExpensesAddCtrl',
        controllerAs: 'expenses/add'
      })
      .when('/expenses/list', {
        templateUrl: 'views/expenses/list.html',
        controller: 'ExpensesListCtrl',
        controllerAs: 'expenses/list'
      })
      .when('/expenses/edit/:id', {
        templateUrl: 'views/expenses/edit.html',
        controller: 'ExpensesEditCtrl',
        controllerAs: 'expenses/edit'
      })
      .when('/babies/list', {
        templateUrl: 'views/babies/list.html',
        controller: 'BabiesListCtrl',
        controllerAs: 'babies/list'
      })
      .when('/babies/add', {
        templateUrl: 'views/babies/add.html',
        controller: 'BabiesAddCtrl',
        controllerAs: 'babies/add'
      })
      .when('/babies/edit/:id', {
        templateUrl: 'views/babies/edit.html',
        controller: 'BabiesEditCtrl',
        controllerAs: 'babies/edit'
      })
      .when('/subscriptions', {
        templateUrl: 'views/subscriptions.html',
        controller: 'SubscriptionsCtrl',
        controllerAs: 'subscriptions'
      })
      .when('/expenses/subscriptions', {
        templateUrl: 'views/expenses/subscriptions.html',
        controller: 'ExpensesSubscriptionsCtrl',
        controllerAs: 'expenses/subscriptions'
      })
      .when('/expenses/unaTantum', {
        templateUrl: 'views/expenses/unatantum.html',
        controller: 'ExpensesUnatantumCtrl',
        controllerAs: 'expenses/unaTantum'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
