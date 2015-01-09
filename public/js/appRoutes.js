// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider

  // home page
  .when('/', {
    templateUrl: 'views/home.html',
    controller: 'MainController'
  })

  // nerds page that will use the NerdController
  .when('/bds', {
    templateUrl: 'views/bds.html',
    controller: 'BdController'
  })

  // todos
  .when('/todos', {
    templateUrl: 'views/todos.html',
    controller: 'ToDoController'
  });

  $locationProvider.html5Mode(true);

}]);
