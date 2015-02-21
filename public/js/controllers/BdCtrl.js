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
    $scope.formData.date=$scope.dateBd.toDateString();
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

  // Suppression d'une BD
  $scope.deleteBd = function(id) {
    $http.delete('/api/bd/' + id)
    .success(function(data) {
      $scope.bds = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  };

  // Récupération d'une BD
  $scope.getBd = function(id) {
    $http.get('/api/bd/' + id)
    .success(function(data) {
      $scope.formData = data;  
      //$scope.dateBd = new Date(2015,0,1);
      annee = $scope.formData.date.substring(0,4);
      jour = $scope.formData.date.substring(8,10);
      mois = $scope.formData.date.substring(5,7);
      $scope.dateBd = new Date(annee,mois-1,jour,24);
      $scope.vueBd = 'modifBd';
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  };

  $scope.updateBd = function(id) {
    $scope.formData.date=$scope.dateBd.toDateString();
    $http.put('/api/bd/' + id, $scope.formData)
    .success(function(data) {
      $scope.bds = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  };

  $scope.newBd = function () {
    $scope.dateBd='';
    $scope.formData = {};
    $scope.vueBd = 'newBd';
  };

});
