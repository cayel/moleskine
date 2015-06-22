// public/js/controllers/StatCtrl.js
angular.module('StatCtrl', ['chart.js']).controller('StatController', function($scope, $http) {

  $scope.tagline = 'Des stats, des stats ...';

	// Liste des BDs
	$http.get('/api/bds')
	.success(function(data) {
		$scope.bds = data;
		// console.log(data);
	})
	.error(function(data) {
		// console.log('Error: ' + data);
	});

	// Liste des Concerts
	$http.get('/api/concerts')
	.success(function(data) {
		$scope.concerts = data;
		// console.log(data);
	})
	.error(function(data) {
		// console.log('Error: ' + data);
	});

	// Liste des films
	$http.get('/api/films')
	.success(function(data) {
		$scope.films = data;
		// console.log(data);
	})
	.error(function(data) {
		// console.log('Error: ' + data);
	});

	// Liste des books
	$http.get('/api/books')
	.success(function(data) {
		$scope.books = data;
		// console.log(data);
    $scope.series = ["Livres"];
    $scope.labels = ['2009', '2010', '2011', '2012', '2013', '2014', '2015'];
    c2009 = 0;
    c2010 = 0;
    c2011 = 0;
    c2012 = 0;
    c2013 = 0;
    c2014 = 0;
    c2015 = 0;
    for(var i=0; i<$scope.books.length; i++) {
      theBook = $scope.books[i];
      theDate = new Date(theBook.date);
      if (theDate.getFullYear()=='2009') c2009++;
      if (theDate.getFullYear()=='2010') c2010++;
      if (theDate.getFullYear()=='2011') c2011++;
      if (theDate.getFullYear()=='2012') c2012++;
      if (theDate.getFullYear()=='2013') c2013++;
      if (theDate.getFullYear()=='2014') c2014++;
      if (theDate.getFullYear()=='2015') c2015++;
	  }
    $scope.data = [
      [c2009, c2010, c2011, c2012, c2013, c2014, c2015]
    ];
	})
	.error(function(data) {
		// console.log('Error: ' + data);
	});



});
