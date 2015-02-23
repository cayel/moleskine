// public/js/services/ConcertService.js
angular.module('ConcertService', []).factory('Concert', ['$http', function($http) {

  return {
    // call to get all concerts
    get : function() {
      return $http.get('/api/concerts');
    },


    // these will work when more API routes are defined on the Node side of things
    // call to POST and create a new concert
    create : function(concertData) {
      return $http.post('/api/concert', concertData);
    },

    // call to DELETE a concert
    delete : function(id) {
      return $http.delete('/api/concert/' + id);
    }
  }

}]);
