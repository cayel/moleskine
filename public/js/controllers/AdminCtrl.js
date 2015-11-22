// public/js/controllers/AdminCtrl.js
angular.module('AdminCtrl', []).controller('AdminController', function($scope, $http, $window) {

	$scope.tagline = '';
	
	$scope.token = $window.localStorage['moleskine-token'];

});
