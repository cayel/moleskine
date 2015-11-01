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

   // Film Form
  .when('/formfilm', {
    templateUrl: 'views/formfilm.html',
    controller: 'FormFilmController'
  })
  
   // Livres
  .when('/books', {
    templateUrl: 'views/books.html',
    controller: 'BookController'
  })

    // Statistiques
   //.when('/stats', {
//     templateUrl: 'views/stats.html',
  //   controller: 'StatController'
   //})


  // Administration
  .when('/admin', {
    templateUrl: 'views/admin.html',
    controller: 'AdminController'
  });

  $locationProvider.html5Mode(true);

}]);
