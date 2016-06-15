angular.module('cinetic.controllers', [])
.controller('searchCtrl', function($scope, $q, $http, $state, $ionicPopup, $ionicScrollDelegate, $ionicSideMenuDelegate, $ionicLoading, $timeout, omdbFactory) 
{
	$scope.SearchData = {};
	$scope.Spinners = Array('android','ios','ios-small','bubbles','circles','crescent','dots','lines','ripple','spiral');
	$scope.Colors = Array('assertive','positive','calm','royal','energized','balanced','dark');
	

	$scope.scrollTop = function() {
		$ionicScrollDelegate.scrollTop(true);
	};

	$scope.getRandomObj = function(obj)
	{
		return obj[Math.floor(Math.random()*obj.length)];
	}

	$scope.clearSearch = function()
	{
		delete $scope.movies;    // dump search result list
	}

	$scope.clearQuery = function()
	{
		console.log("Attempting to clear search query.");
		delete $scope.SearchData.title;    // dump search result query
	}

	$scope.getMovies = function(SearchData)
	{
		$scope.spin  = $scope.getRandomObj($scope.Spinners);
		$scope.color = $scope.getRandomObj($scope.Colors);
		//$scope.combine = $scope.spin.concat($scope.color); 
		$ionicLoading.show({
			template: 'Loading data...</br></br> <ion-spinner class="spinner-'+ $scope.color + '" icon=' + $scope.spin + '></ion-spinner>',
			duration: 5000
		})
		console.log(SearchData.title);
		var promise = omdbFactory.search(SearchData);
		promise.then(function(results)
		{
			//$ionicLoading.hide();
			console.log(results);
			if(results.Response == "True")
			{
				$scope.clearQuery();
				$scope.movies = results.Search;
				console.log($scope.movies);
				return;
			}

			var alertPopup = $ionicPopup.alert({
				title: 'Uh-oh!',
				template: 'It doesn\'t look like that search worked. Try again and check if you have any misspelled words.',
				buttons: [{ text: 'On it!', type: 'button-positive' }]
			});
		});
	}
})

.controller('aboutCtrl', ['$scope','$state','$ionicPopup','$ionicSideMenuDelegate','$ionicLoading',
	function($scope, $state, $ionicPopup, $ionicSideMenuDelegate, $ionicLoading)
	{
		$scope.$on('$ionicView.beforeEnter', function (event, viewData) {
			viewData.enableBack = true;
		});

	}])

.controller('detailsCtrl', function($scope, $state, $stateParams, $ionicPopup, $ionicSideMenuDelegate, $ionicLoading, omdbFactory) 
{
	$ionicLoading.show({
		template: "Loading data...</br> <ion-spinner icon='ripple'></ion-spinner>"
		//duration:5000
	})
	
	var promise = omdbFactory.search($stateParams);

	promise.then(function(payload)
	{
		if(payload.Response == "True")
		{
			$ionicLoading.hide();
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
		$state.go("search")
	});
});
