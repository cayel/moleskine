// public/js/controllers/bookCtrl.js
angular.module('BookCtrl', []).controller('BookController', function($scope, $http) {

	$scope.tagline = 'Des livres, rien que des livres ...';			
	
	// Recherche
	$scope.recherche = null;
	$scope.razRecherche = function() {
		$scope.recherche = null;
	}

	// Saisie d'un nouveau livre
	$scope.newBook = function () {
		$scope.dateBook='';
		$scope.formData = {};
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
		$scope.formData.date=$scope.dateBook.toDateString();
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
			annee = $scope.formData.date.substring(0,4);
			jour = $scope.formData.date.substring(8,10);
			mois = $scope.formData.date.substring(5,7);
			$scope.dateBook = new Date(annee,mois-1,jour,24);
			$scope.vueBook = 'modifBook';
		})
		.error(function(data) {
		// console.log('Error: ' + data);
		});
	};

	// Mise à jour d'un livre
	$scope.updateBook = function(id) {
		$scope.formData.date=$scope.dateBook.toDateString();
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
