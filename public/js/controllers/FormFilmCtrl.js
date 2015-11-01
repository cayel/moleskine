angular.module('FormFilmCtrl', ["DateService"]).controller('FormFilmController', function($scope, $http, DateService,$location) {

	$scope.tagline = 'formulaire film';	
	$scope.months = DateService.getMonthList();	
	$scope.years = DateService.getYearList();	
	$scope.message = '';
	
	var searchObject = $location.search();
	
	if (searchObject.id==undefined) 
	{
		$scope.formData = {};
		theDate = DateService.getDateNow();
		$scope.formData.yearId = theDate.getFullYear();
		$scope.formData.monthId = theDate.getMonth()+1;
		$scope.formData.dayId = theDate.getDate();
		$scope.newFilm = true;	
	}
	else
	{
		$http.get('/api/film/' + searchObject.id)
			.success(function(data) {
				$scope.formData = data;  
				theDate = new Date($scope.formData.date);
				$scope.formData.yearId = theDate.getFullYear();
				$scope.formData.monthId = theDate.getMonth()+1;
				$scope.formData.dayId = theDate.getDate();
				$scope.newFilm = false;
			})
			.error(function(data) {
			// console.log('Error: ' + data);
			});
	}

	
	// Création d'un film
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
	
	// Mise à jour d'une film
	$scope.updateFilm = function(id) {
		$scope.formData.date= new Date($scope.formData.yearId, $scope.formData.monthId-1, $scope.formData.dayId);
		$http.put('/api/film/' + id, $scope.formData)
		.success(function(data) {
			$scope.films = data;
			$location.path("/films");
		})
		.error(function(data) {
			// console.log('Error: ' + data);
		});
	};
	
	$scope.goFilmList = function() {
		$location.path("/films");
	};
});