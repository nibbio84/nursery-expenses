'use strict';
/*global Firebase */

/**
 * @ngdoc service
 * @name nurseryExpensesApp.databaseService
 * @description
 * # databaseService
 * Service in the nurseryExpensesApp.
 */
angular.module('nurseryExpensesApp')
  .service('databaseService', function ($rootScope, $firebaseArray, $firebaseObject, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.baseRef = new Firebase("https://asilo.firebaseio.com");
    this.expensesRef = this.baseRef.child("expenses");
    this.babiesRef = this.baseRef.child("babies");
    this.imagesRef = this.baseRef.child("images");

    var self = this;

    /**
     * General services
     */
     this.sync = function() {
       var deferred = $q.defer();

       if(!$rootScope.loggedUser) {
         self.expensesArray = $firebaseArray(self.expensesRef);
         self.babiesArray = $firebaseArray(self.babiesRef);
         self.imagesArray = $firebaseArray(self.imagesRef);
       }

       self.expensesArray.$loaded().then(function() {
         return self.babiesArray.$loaded();
       }).then(function() {
         return self.imagesArray.$loaded();
       }).then(function() {
         // Success
         var auth = self.baseRef.getAuth();
         if(auth && auth.password && auth.password.email) {
           $rootScope.loggedUser = auth.password.email;
         } else {
           $rootScope.loggedUser = "anonymous";
         }

         deferred.resolve();
       }, function() {
         // error
         $rootScope.loggedUser = null;
         self.expensesArray=null;
         self.babiesArray=null;
         self.imagesArray=null;
         deferred.reject();
       });

       return deferred.promise;
     };

     this.logout = function() {
       $rootScope.loggedUser = null;
       self.baseRef.unauth();
     };

     this.login = function(username, password) {
       var deferred = $q.defer();
       self.baseRef.authWithPassword({
         email    : username,
         password : password
       }, function(error) {
         if (error) {
           deferred.reject();
         } else {
           deferred.resolve();
         }
       });
       return deferred.promise;
     };

    /**
     * Expenses section
     */

    this.deleteExpense = function(expense) {
      return self.expenses().$remove(expense);
    };

    this.getExpense = function(id) {
      return self.expenses().$getRecord(id);
    };

    this.getExpensesByBaby = function(babyId) {
      var exps = self.expenses();
      var babyExps = [];
      for(var i=0; i<exps.length; i++) {
        var exp = exps[i];
        if(exp.babyId===babyId) {
          babyExps.push(exp);
        }
      }
      return babyExps;
    };

    this.putExpense = function(expense) {
      return self.expenses().$save(expense);
    };

    this.addExpense = function(expense) {
      return self.expenses().$add(expense);
    };

    this.expenses = function() {
      return self.expensesArray;
    };

    this.expenseCategories = {
        "food": "Alimentare",
        "tools": "Sussidi didattici",
        "franchising": "Franchising",
        "renovation": "Rinnovo locali",
        "other": "Altro"
    };

    this.defaultExpenseCategory = "food";


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
      return self.imagesArray;
    };


  });
