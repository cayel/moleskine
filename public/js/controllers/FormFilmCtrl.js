angular.module('FormFilmCtrl', ["DateService"]).controller('FormFilmController', function($scope, $http, DateService,$location) {

	$scope.tagline = 'formulaire film';	
	$scope.months = DateService.getMonthList();	
	$scope.years = DateService.getYearList();	
	$scope.message = '';
	$scope.formData = {};
	theDate = DateService.getDateNow();
	$scope.formData.yearId = theDate.getFullYear();
	$scope.formData.monthId = theDate.getMonth()+1;
	$scope.formData.dayId = theDate.getDate();	
	
	// Création d'une film
	$scope.createFilm = function() {
		$scope.formData.date= new Date($scope.formData.yearId, $scope.formData.monthId-1, $scope.formData.dayId);
		$http.post('/api/films', $scope.formData)
		.success(function(data) {
			$scope.formData = {}; // clear the form so our user is ready to enter another
			$scope.films = data;
			$location.path("/films");
		})
		.error(function(data) {
		});
	};	
});