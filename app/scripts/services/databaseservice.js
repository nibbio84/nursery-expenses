'use strict';

/**
 * @ngdoc service
 * @name nurseryExpensesApp.databaseService
 * @description
 * # databaseService
 * Service in the nurseryExpensesApp.
 */
angular.module('nurseryExpensesApp')
  .service('databaseService', function ($firebaseArray, $firebaseObject) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.baseRef = new Firebase("https://asilo.firebaseio.com");
    this.expensesRef = this.baseRef.child("expenses");
    this.babiesRef = this.baseRef.child("babies");
    this.imagesRef = this.baseRef.child("images");

    var self = this;

    /**
     * Expenses section
     */

    this.deleteExpense = function(expense) {
      return self.expenses().$remove(expense);
    };

    this.getExpense = function(id) {
      return self.expenses().$getRecord(id);
    };

    this.putExpense = function(expense) {
      return self.expenses().$save(expense);
    };

    this.addExpense = function(expense) {
      return self.expenses().$add(expense);
    };

    this.expenses = function() {
      if(!self.expensesArray) {
        self.expensesArray = $firebaseArray(self.expensesRef);
      }
      return self.expensesArray;
    };

    /**
     * Babies section
     */

    this.deleteBaby = function(baby) {
      return self.babies().$remove(baby);
    };

    this.getBaby = function(id) {
      return self.babies().$getRecord(id);
    };

    this.putBaby = function(baby) {
      return self.babies().$save(baby);
    };

    this.addBaby = function(baby) {
      return self.babies().$add(baby);
    };

    this.babies = function() {
      if(!self.babiesArray) {
        self.babiesArray = $firebaseArray(self.babiesRef);
      }
      return self.babiesArray;
    };

    /**
     * Images section
     */

    this.uploadImage = function(image) {
      return self.images().$add(image).then(function(ref) {
        var id = ref.key();
        return id;
      });
    };

    this.images = function() {
      if(!self.imagesArray) {
        self.imagesArray = $firebaseArray(self.imagesRef);
      }
      return self.imagesArray;
    };


  });
