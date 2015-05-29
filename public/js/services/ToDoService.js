// public/js/services/ToDoService.js
angular.module('ToDoService', []).factory('ToDo', ['$http', function($http) {

  return {
    // call to get all todos
    get : function() {
      return $http.get('/api/todos');
    },
    // these will work when more API routes are defined on the Node side of things
    // call to POST and create a new todo
    create : function(toDoData) {
      return $http.post('/api/todos', toDoData);
    },

    // call to DELETE a todo
    delete : function(id) {
      return $http.delete('/api/todos/' + id);
    },
    getDate : function () {
      return (new Date());
    }
  }

}]);
