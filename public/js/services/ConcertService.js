// public/js/services/BdService.js
angular.module('BdService', []).factory('Bd', ['$http', function($http) {

  return {
    // call to get all bds
    get : function() {
      return $http.get('/api/bds');
    },


    // these will work when more API routes are defined on the Node side of things
    // call to POST and create a new bd
    create : function(bdData) {
      return $http.post('/api/bd', bdData);
    },

    // call to DELETE a bd
    delete : function(id) {
      return $http.delete('/api/bd/' + id);
    }
  }

}]);
