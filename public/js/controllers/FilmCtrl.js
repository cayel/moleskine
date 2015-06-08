// public/js/controllers/FilmCtrl.js
angular.module('FilmCtrl', ["DateService"]).controller('FilmController', function($scope, $http, DateService) {

	$scope.tagline = 'Des films, rien que des films ...';			
	
	$scope.months = DateService.getMonthList();	
	$scope.years = DateService.getYearList();

	// Recherche
	$scope.recherche = null;
	$scope.razRecherche = function() {
		$scope.recherche = null;
	}

	// Saisie d'une nouvelle film
	$scope.newFilm = function () {
		$scope.datefilm='';
		$scope.formData = {};
		theDate = DateService.getDateNow();
		$scope.formData.yearId = theDate.getFullYear();
		$scope.formData.monthId = theDate.getMonth()+1;
		$scope.formData.dayId = theDate.getDate();		
		$scope.vueFilm = 'newFilm';
	};

	// Liste des films
	$http.get('/api/films')
	.success(function(data) {
		$scope.films = data;
		console.log(data);
	})
	.error(function(data) {
		console.log('Error: ' + data);
	});

	// Création d'une film
	$scope.createFilm = function() {
		$scope.formData.date= new Date($scope.formData.yearId, $scope.formData.monthId-1, $scope.formData.dayId);
		$http.post('/api/films', $scope.formData)
		.success(function(data) {
			$scope.formData = {}; // clear the form so our user is ready to enter another
			$scope.films = data;
		})
		.error(function(data) {
		});
	};

	// Suppression d'un film
	$scope.deleteFilm = function(id) {
		$http.delete('/api/film/' + id)
		.success(function(data) {
			$scope.films = data;
		})
		.error(function(data) {
		});
	};

	// Récupération d'une film
	$scope.getFilm = function(id) {
		$http.get('/api/film/' + id)
		.success(function(data) {
			$scope.formData = data;  
			theDate = new Date($scope.formData.date);
			$scope.formData.yearId = theDate.getFullYear();
			$scope.formData.monthId = theDate.getMonth()+1;
			$scope.formData.dayId = theDate.getDate();
			$scope.vueFilm = 'modifFilm';
		})
		.error(function(data) {
		// console.log('Error: ' + data);
		});
	};

	// Mise à jour d'une film
	$scope.updateFilm = function(id) {
		$scope.formData.date= new Date($scope.formData.yearId, $scope.formData.monthId-1, $scope.formData.dayId);
		$http.put('/api/film/' + id, $scope.formData)
		.success(function(data) {
			$scope.films = data;
			// console.log(data);
		})
		.error(function(data) {
			// console.log('Error: ' + data);
		});
	};
});
