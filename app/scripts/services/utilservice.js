'use strict';

/**
 * @ngdoc service
 * @name nurseryExpensesApp.utilService
 * @description
 * # utilService
 * Service in the nurseryExpensesApp.
 */
angular.module('nurseryExpensesApp')
  .service('utilService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.monthsBetween = function(d1, d2) {
      var sign = 1;
      if(d2.getTime()<d1.getTime()) {
        var temp = d2;
        d2 = d1;
        d1 = temp;
        sign = -1;
      }

      var months;
      months = (d2.getFullYear() - d1.getFullYear()) * 12;
      months += (d2.getMonth() - d1.getMonth());
      return sign * months;
    };

    this.monthNames = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];

  });
