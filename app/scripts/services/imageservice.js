'use strict';

/**
 * @ngdoc service
 * @name nurseryExpensesApp.imageService
 * @description
 * # imageService
 * Service in the nurseryExpensesApp.
 */
angular.module('nurseryExpensesApp')
  .service('imageService', function ($q) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.loadFile = function(domName) {
      var deferred = $q.defer();
      var el = document.getElementById(domName);
      var files = el ? el.files : null;
      if(files && files.length>0) {
        var file = files[0];
        var r = new FileReader();
        r.onloadend = function(e){
          if(e && e.target && e.target.result) {
            var data = e.target.result;
            deferred.resolve(data);
          } else {
            deferred.reject();
          }
        };
        r.readAsBinaryString(file);
        return deferred.promise;
      } else {
        deferred.resolve();
        return deferred.promise;
      }
    };

  });
