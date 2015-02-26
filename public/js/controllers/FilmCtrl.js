// public/js/controllers/FilmCtrl.js
angular.module('FilmCtrl', []).controller('FilmController', function($scope, $http) {

	$scope.tagline = 'Des films, rien que des films ...';			
	
	// Recherche
	$scope.recherche = null;
	$scope.razRecherche = function() {
		$scope.recherche = null;
	}

	// Saisie d'une nouvelle film
	$scope.newFilm = function () {
		$scope.datefilm='';
		$scope.formData = {};
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
		$scope.formData.date=$scope.dateFilm.toDateString();
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
			annee = $scope.formData.date.substring(0,4);
			jour = $scope.formData.date.substring(8,10);
			mois = $scope.formData.date.substring(5,7);
			$scope.dateFilm = new Date(annee,mois-1,jour,24);
			$scope.vueFilm = 'modifFilm';
		})
		.error(function(data) {
		// console.log('Error: ' + data);
		});
	};

	// Mise à jour d'une film
	$scope.updateFilm = function(id) {
		$scope.formData.date=$scope.dateFilm.toDateString();
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
