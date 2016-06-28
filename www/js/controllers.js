(function()
{
	angular.module('cinetic.controllers', [])
	/*
	.filter('rating', function($sce) {
		return function(input) {
			var rating = parseFloat(input) / 2.0;
			var ratingInt = Math.floor(rating);
			var html = '';
			for (var i = 0; i < ratingInt; ++i)
				html += '<i class="icon ion-android-star"></i>';
			if (ratingInt != rating)
				html += '<i class="icon ion-android-star-half"></i>';
			for (var i = ratingInt + 1; i < 5; ++i)
				html += '<i class="icon ion-android-star-outline"></i>';
			return $sce.trustAsHtml(html);
		}
	})
*/

	// search controller, handles everything related to searching the movies the user asks for through the input
	.controller('searchCtrl', function($scope, $q, $http, $state, $ionicPopup, $ionicScrollDelegate, $ionicSideMenuDelegate, $ionicLoading, $timeout, omdbFactory) 
	{
		// two-way binding for the search strings provided in the search input
		$scope.SearchData = {};
		// Spinner & Color arrays, used to randomly generate a colorful spinner which is used with $ionicLoading
		$scope.Spinners = Array('android','ios','ios-small','bubbles','circles','crescent','dots','lines','ripple','spiral');
		$scope.Colors = Array('assertive','positive','calm','royal','energized','balanced','dark');

		// function to scroll to the top of the viewport
		$scope.scrollTop = function() {
			$ionicScrollDelegate.scrollTop(true);
		};
		// returns a random object or array element from a given object/array/list
		$scope.getRandomObj = function(obj)
		{
			return obj[Math.floor(Math.random()*obj.length)];
		}
		// dump search result list
		$scope.clearSearch = function()
		{
			delete $scope.movies;
		}
		// dump search result query
		$scope.clearQuery = function()
		{
			//console.log("Attempting to clear search query.");
			delete $scope.SearchData.title;
		}

		// handle the respective error pop-ups to avoid cluttering
		$scope.throwError = function(index)
		{
			switch(index)
			{
				case 1:
				$ionicPopup.alert({
					title: 'Hey now!',
					template: 'Looks like your provided an empty search query, please enter a valid title!',
					buttons: [{ text: 'Okay', type: 'button-positive' }]
				});
				break;

				case 2:
				$ionicPopup.alert({
					title: 'Uh-oh!',
					template: 'It doesn\'t look like that search worked. Try again and check if you have any misspelled words.',
					buttons: [{ text: 'On it!', type: 'button-positive' }]
				});
				break;
			}
		}
		// main function to return a list of films using the omdbservice factory
		$scope.getMovies = function(SearchData)
		{
			// remove focus from the input field
			document.getElementById('movie-title').blur();
			// add random color & spinner to $scope
			$scope.spin  = $scope.getRandomObj($scope.Spinners);
			$scope.color = $scope.getRandomObj($scope.Colors);
			//$scope.combine = $scope.spin.concat($scope.color); 
			// show a loading screen while the async call to the api is happening
			$ionicLoading.show({
				template: 'Loading data...</br></br> <ion-spinner class="spinner-'+ $scope.color + '" icon=' + $scope.spin + '></ion-spinner>',
				// if you want to debug the loading screen
				//duration: 5000
			})
			// debug search query
			//console.log(SearchData.title);
			if(SearchData.title == undefined)
			{
				$ionicLoading.hide();
				$scope.throwError(1);
				return;
			}
			// put the factory search function in a variable it will return a $q promise, then wait for a response
			var promise = omdbFactory.search(SearchData);
			promise.then(function(results)
			{
				// hide the loading screen if promise is kept
				$ionicLoading.hide();
				// debug payload from ajax call
				console.log(results);

			// payload response returns 3 properties, Results, Search and totalResults. Results is a boolean.
			if(results.Response === "True")
			{
				// if we get a positive response, clear the search query as it is no longer needed
				$scope.clearQuery();
				// dump the results payload to a $scope variable so the view can use the data
				$scope.movies = results.Search;
				// debug the scope
				//console.log($scope.movies);
				return;
			}
			// if results.Response returned false, alert the user that the search query failed
			$scope.throwError(2);
		});
		}
	})

// about controller, can be used to handle anything in the about page
.controller('aboutCtrl', ['$scope','$state','$ionicPopup','$ionicSideMenuDelegate','$ionicLoading',
	function($scope, $state, $ionicPopup, $ionicSideMenuDelegate, $ionicLoading)
	{

	}])

// watchlist controller, handles movies or shows saved by the user
.controller('watchlistCtrl', ['$scope','$state', '$ionicHistory','$ionicPopup','$ionicSideMenuDelegate','$ionicLoading','omdbFactory',
	function($scope, $state, $ionicHistory, $ionicPopup, $ionicSideMenuDelegate, $ionicLoading, omdbFactory)
	{
		$scope.delegateToSearch = function()
		{
			$ionicHistory.nextViewOptions({
				disableBack: true,
				historyRoot: true
			});
			$state.go('search',{},{location:'replace'});
		}

		$scope.searchAPI = function()
		{
			$ionicLoading.show({
				template: "Loading data...</br> <ion-spinner icon='ripple'></ion-spinner>"
				//debug loader
				//duration:5000
			})

			var promise = omdbFactory.searchAPI();

			promise.then(function(payload)
			{
				$ionicLoading.hide();
				// debug ajax payload
				console.log(payload);
				$scope.Watchlist = payload[0].Search;
			})
		}
		$scope.searchAPI();

	}])

// details controller, handles what happens when we click on a list item generated from the search controller view, takes up an ID state parameter
.controller('detailsCtrl', function($scope, $state, $stateParams, $ionicPopup, $ionicSideMenuDelegate, $ionicLoading, omdbFactory) 
{	
	// prompt a loading screen to the user until the http call fetches the data via id
	$ionicLoading.show({
		template: "Loading data...</br> <ion-spinner icon='ripple'></ion-spinner>"
		//debug loader
		//duration:5000
	})
	
	// has the same functionality as the search controller's search method, except this one takes works on the details page and 
	// sends a $stateParam with the movie ID fetched from the search list
	var promise = omdbFactory.search($stateParams);
	promise.then(function(payload)
	{
		if(payload.Response === "True")
		{
			$ionicLoading.hide();
			//Runtime is returned as full minutes, we need to convert it to hours and the remainder as minutes
			payload.Hours =  Math.floor(parseInt(payload.Runtime)/60);
			payload.Minutes = (parseInt(payload.Runtime) % 60);
			// debug ajax payload
			//console.log(payload);
			$scope.mDtl = payload;
			return;
		}
		$ionicLoading.hide();
		var alertPopup = $ionicPopup.alert({
			title: 'Dang it!',
			template: 'Looks like we couldn\'t get that item for you, try again!',
			buttons: [{ text: 'Okie dokie!', type: 'button-calm' }]
		});
		// if the payload returned False, go back to the search state as the Details view will be empty 
		$state.go("search")
	});
});

}());
