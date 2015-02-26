// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider

  // home page
  .when('/', {
    templateUrl: 'views/home.html',
    controller: 'MainController'
  })

  // BD
  .when('/bds', {
    templateUrl: 'views/bds.html',
    controller: 'BdController'
  })

   // Concerts
  .when('/concerts', {
    templateUrl: 'views/concerts.html',
    controller: 'ConcertController'
  })

   // Films
  .when('/films', {
    templateUrl: 'views/films.html',
    controller: 'FilmController'
  })

     // Livres
  .when('/books', {
    templateUrl: 'views/books.html',
    controller: 'BookController'
  })

  // todos
  .when('/todos', {
    templateUrl: 'views/todos.html',
    controller: 'ToDoController'
  });

  $locationProvider.html5Mode(true);

}]);
