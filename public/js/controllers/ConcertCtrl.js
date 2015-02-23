// public/js/controllers/ConcertCtrl.js
angular.module('ConcertCtrl', []).controller('ConcertController', function($scope, $http) {

	$scope.tagline = 'Des Concerts, rien que des Concerts ...';			
	
	// Recherche
	$scope.recherche = null;
	$scope.razRecherche = function() {
		$scope.recherche = null;
	}

	// Saisie d'un nouveau concert
	$scope.newConcert = function () {
		$scope.dateConcert='';
		$scope.formData = {};
		$scope.vueConcert = 'newConcert';
	};

	// Liste des Concerts
	$http.get('/api/concerts')
	.success(function(data) {
		$scope.concerts = data;
		console.log(data);
	})
	.error(function(data) {
		console.log('Error: ' + data);
	});

	// Création d'un Concert
	$scope.createConcert = function() {
		$scope.formData.date=$scope.dateConcert.toDateString();
		$http.post('/api/concerts', $scope.formData)
		.success(function(data) {
			$scope.formData = {}; // clear the form so our user is ready to enter another
			$scope.concerts = data;
		})
		.error(function(data) {
		});
	};

	// Suppression d'un Concert
	$scope.deleteConcert = function(id) {
		$http.delete('/api/concert/' + id)
		.success(function(data) {
			$scope.concerts = data;
		})
		.error(function(data) {
		});
	};

	// Récupération d'un Concert
	$scope.getConcert = function(id) {
		$http.get('/api/concert/' + id)
		.success(function(data) {
			$scope.formData = data;  
			annee = $scope.formData.date.substring(0,4);
			jour = $scope.formData.date.substring(8,10);
			mois = $scope.formData.date.substring(5,7);
			$scope.dateConcert = new Date(annee,mois-1,jour,24);
			$scope.vueConcert = 'modifConcert';
		})
		.error(function(data) {
		// console.log('Error: ' + data);
		});
	};

	// Mise à jour d'un Concert
	$scope.updateConcert = function(id) {
		$scope.formData.date=$scope.dateConcert.toDateString();
		$http.put('/api/concert/' + id, $scope.formData)
		.success(function(data) {
			$scope.concerts = data;
			// console.log(data);
		})
		.error(function(data) {
			// console.log('Error: ' + data);
		});
	};
});
