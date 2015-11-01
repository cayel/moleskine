// public/js/controllers/FilmCtrl.js
angular.module('FilmCtrl', ["DateService"]).controller('FilmController', function($scope, $http, DateService) {

	$scope.tagline = 'Des films, rien que des films ...';			
	
	$scope.months = DateService.getMonthList();	
	$scope.years = DateService.getYearList();
	
	// tri

	$scope.champTri = 'date';
	$scope.triDescendant = true;
	$scope.triFilms = function(champ) {
		if ($scope.champTri == champ) {
			$scope.triDescendant = !$scope.triDescendant;
		} else {
			$scope.champTri = champ;
			$scope.triDescendant = false;
		}	
	}

	$scope.cssChevronsTri = function(champ) {
		return {
			glyphicon: $scope.champTri == champ,
			'glyphicon-chevron-up' : $scope.champTri == champ && !$scope.triDescendant,
			'glyphicon-chevron-down' : $scope.champTri == champ && $scope.triDescendant 
		};
	}

	// Recherche
	$scope.recherche = null;
	$scope.razRecherche = function() {
		$scope.recherche = null;
	}

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
});
