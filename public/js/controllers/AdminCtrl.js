// public/js/controllers/AdminCtrl.js
angular.module('AdminCtrl', []).controller('AdminController', function($scope, $http, $window) {

	$scope.tagline = '';
	
	$http.get('/api/users')
	.success(function(data) {
		$scope.users = data;
	})
	.error(function(data) {
		console.log('Error: ' + data);
	});
	
	// Delete User
	$scope.delete = function(id) {
		$http.delete('/api/users/' + id)
		.success(function(data) {
			$scope.users = data;
		})
		.error(function(data) {
		});
	};	
});
