// public/js/controllers/ToDoCtrl.js
angular.module('ToDoCtrl', []).controller('ToDoController', function($scope, $http) {

  $scope.tagline = 'La ToDo List ...';
/*  $scope.todos = [{ _id: 1, text: 'todo1'},
    { _id: 2, text: 'todo2'},
    { _id: 3, text: 'todo3'}
    ];
*/

  // Liste des todos
  $http.get('/api/todos')
  .success(function(data) {
    $scope.todos = data;
    console.log(data);
  })
  .error(function(data) {
    console.log('Error: ' + data);
  });

  // Création d'une tâche
$scope.createTodo = function() {
    $http.post('/api/todos', $scope.formData)
    .success(function(data) {
      $scope.formData = {}; // clear the form so our user is ready to enter another
      $scope.todos = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  };

  // delete a todo after checking it
  $scope.deleteTodo = function(id) {
    $http.delete('/api/todos/' + id)
    .success(function(data) {
      $scope.todos = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  };
});

//https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular
