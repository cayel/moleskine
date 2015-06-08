// public/js/controllers/ConcertCtrl.js
angular.module('ConcertCtrl', ["DateService"]).controller('ConcertController', function($scope, $http, DateService) {

	$scope.tagline = 'Des Concerts, rien que des Concerts ...';	

	$scope.months = DateService.getMonthList();	
	$scope.years = DateService.getYearList();
		
	
	// Recherche
	$scope.recherche = null;
	$scope.razRecherche = function() {
		$scope.recherche = null;
	}

	// Saisie d'un nouveau concert
	$scope.newConcert = function () {
		$scope.dateConcert='';
		$scope.formData = {};
		theDate = DateService.getDateNow();
		$scope.formData.yearId = theDate.getFullYear();
		$scope.formData.monthId = theDate.getMonth()+1;
		$scope.formData.dayId = theDate.getDate();		
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
		$scope.formData.date= new Date($scope.formData.yearId, $scope.formData.monthId-1, $scope.formData.dayId);
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
			theDate = new Date($scope.formData.date);
			$scope.formData.yearId = theDate.getFullYear();
			$scope.formData.monthId = theDate.getMonth()+1;
			$scope.formData.dayId = theDate.getDate();
			$scope.vueConcert = 'modifConcert';
		})
		.error(function(data) {
		// console.log('Error: ' + data);
		});
	};

	// Mise à jour d'un Concert
	$scope.updateConcert = function(id) {
		$scope.formData.date= new Date($scope.formData.yearId, $scope.formData.monthId-1, $scope.formData.dayId);
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
