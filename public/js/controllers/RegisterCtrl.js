// public/js/controllers/RegisterCtrl.js
angular.module('RegisterCtrl', []).controller('RegisterController', function($scope, $http, $location, $window,auth) {
  $scope.user = {};
    
  $scope.register = function(){
    auth.register($scope.user).error(function(error){
     $scope.error = error;
    }).then(function(){
      $location.path("/index");
    });
  };
  
  $scope.logIn = function(){
    auth.logIn($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
     $location.path("/index");
    });
  };
  				
});
