// public/js/controllers/BdCtrl.js
angular.module('BdCtrl', []).controller('BdController', function($scope, $http) {

  $scope.tagline = 'Des BDs, rien que des BDs ...';

  // Liste des todos
  $http.get('/api/bds')
  .success(function(data) {
    $scope.bds = data;
    console.log(data);
  })
  .error(function(data) {
    console.log('Error: ' + data);
  });

  // Création d'une BD
  $scope.createBd = function() {
    $http.post('/api/bds', $scope.formData)
    .success(function(data) {
      $scope.formData = {}; // clear the form so our user is ready to enter another
      $scope.bds = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  };

});
