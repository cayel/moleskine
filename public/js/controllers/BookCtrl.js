// public/js/controllers/bookCtrl.js
angular.module('BookCtrl', ["DateService"]).controller('BookController', function($scope, $http, DateService) {

	$scope.tagline = 'Des livres, rien que des livres ...';			

	$scope.months = DateService.getMonthList();	
	$scope.years = DateService.getYearList();
	
	// tri

	$scope.champTri = 'date';
	$scope.triDescendant = true;
	$scope.triBooks = function(champ) {
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

	// Saisie d'un nouveau livre
	$scope.newBook = function () {
		$scope.dateBook='';
		$scope.formData = {};		
		theDate = DateService.getDateNow();
		$scope.formData.yearId = theDate.getFullYear();
		$scope.formData.monthId = theDate.getMonth()+1;
		$scope.formData.dayId = theDate.getDate();
		$scope.vueBook = 'newBook';
	};

	// Liste des livres
	$http.get('/api/books')
	.success(function(data) {
		$scope.books = data;
		console.log(data);
	})
	.error(function(data) {
		console.log('Error: ' + data);
	});

	// Création d'un livre
	$scope.createBook = function() {
		$scope.formData.date= new Date($scope.formData.yearId, $scope.formData.monthId-1, $scope.formData.dayId);
		$http.post('/api/books', $scope.formData)
		.success(function(data) {
			$scope.formData = {}; // clear the form so our user is ready to enter another
			$scope.books = data;
		})
		.error(function(data) {
		});
	};

	// Suppression d'un livre
	$scope.deleteBook = function(id) {
		$http.delete('/api/book/' + id)
		.success(function(data) {
			$scope.books = data;
		})
		.error(function(data) {
		});
	};

	// Récupération d'un livre 
	$scope.getBook = function(id) {
		$http.get('/api/book/' + id)
		.success(function(data) {
			$scope.formData = data;
			theDate = new Date($scope.formData.date);
			$scope.formData.yearId = theDate.getFullYear();
			$scope.formData.monthId = theDate.getMonth()+1;
			$scope.formData.dayId = theDate.getDate();
			$scope.vueBook = 'modifBook';
		})
		.error(function(data) {
		// console.log('Error: ' + data);
		});
	};

	// Mise à jour d'un livre
	$scope.updateBook = function(id) {
		$scope.formData.date= new Date($scope.formData.yearId, $scope.formData.monthId-1, $scope.formData.dayId);
		$http.put('/api/book/' + id, $scope.formData)
		.success(function(data) {
			$scope.books = data;
			// console.log(data);
		})
		.error(function(data) {
			// console.log('Error: ' + data);
		});
	};
});
