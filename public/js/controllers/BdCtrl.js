// public/js/controllers/BdCtrl.js
angular.module('BdCtrl', ["DateService"]).controller('BdController', function($scope, $http, DateService) {

	$scope.tagline = 'Des BDs, rien que des BDs ...';
	$scope.months = DateService.getMonthList();	
	$scope.years = DateService.getYearList();
			
	// tri

	$scope.champTri = 'date';
	$scope.triDescendant = true;
	$scope.triBds = function(champ) {
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

	// Saisie d'une nouvelle BD
	$scope.newBd = function () {
		$scope.dateBd='';
		$scope.formData = {};
		theDate = DateService.getDateNow();
		$scope.formData.yearId = theDate.getFullYear();
		$scope.formData.monthId = theDate.getMonth()+1;
		$scope.formData.dayId = theDate.getDate();		
		$scope.vueBd = 'newBd';
	};

	// Liste des BDs
	$http.get('/api/bds')
	.success(function(data) {
		$scope.bds = data;
		console.log(data);
	})
	.error(function(data) {
		console.log('Error: ' + data);
	});

	// Création d'une BD
	$scope.createBd = function() {
		$scope.formData.date= new Date($scope.formData.yearId, $scope.formData.monthId-1, $scope.formData.dayId);
		$http.post('/api/bds', $scope.formData)
		.success(function(data) {
			$scope.formData = {}; // clear the form so our user is ready to enter another
			$scope.bds = data;
		})
		.error(function(data) {
		});
	};

	// Suppression d'une BD
	$scope.deleteBd = function(id) {
		$http.delete('/api/bd/' + id)
		.success(function(data) {
			$scope.bds = data;
		})
		.error(function(data) {
		});
	};

	// Récupération d'une BD
	$scope.getBd = function(id) {
		$http.get('/api/bd/' + id)
		.success(function(data) {
			$scope.formData = data;  
			theDate = new Date($scope.formData.date);
			$scope.formData.yearId = theDate.getFullYear();
			$scope.formData.monthId = theDate.getMonth()+1;
			$scope.formData.dayId = theDate.getDate();
			$scope.vueBd = 'modifBd';
		})
		.error(function(data) {
		// console.log('Error: ' + data);
		});
	};

	// Mise à jour d'une BD
	$scope.updateBd = function(id) {
		$scope.formData.date= new Date($scope.formData.yearId, $scope.formData.monthId-1, $scope.formData.dayId);
		$http.put('/api/bd/' + id, $scope.formData)
		.success(function(data) {
			$scope.bds = data;
			// console.log(data);
		})
		.error(function(data) {
			// console.log('Error: ' + data);
		});
	};
});
