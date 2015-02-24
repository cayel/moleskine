// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {

  $scope.tagline = 'Ce que je lis et je regarde ...';
	
	// Liste des BDs
	$http.get('/api/bds')
	.success(function(data) {
		$scope.bds = data;
		// console.log(data);
	})
	.error(function(data) {
		// console.log('Error: ' + data);
	});

	// Liste des Concerts
	$http.get('/api/concerts')
	.success(function(data) {
		$scope.concerts = data;
		// console.log(data);
	})
	.error(function(data) {
		// console.log('Error: ' + data);
	});
});
