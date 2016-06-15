angular.module('cinetic.controllers', [])
.controller('searchCtrl', function($scope, $q, $http, $state, $ionicPopup, $ionicScrollDelegate, $ionicSideMenuDelegate, $ionicLoading, $timeout, omdbFactory) 
{
	$scope.SearchData = {};

	$scope.scrollTop = function() {
		$ionicScrollDelegate.scrollTop(true);
	};

	$scope.getMovies = function(SearchData)
	{
		$ionicLoading.show({
			template: "Loading data..."
		})
		console.log(SearchData.title);
		var promise = omdbFactory.search(SearchData);
		promise.then(function(results)
		{
			$ionicLoading.hide();
			console.log(results);
			if(results.Response == "True")
			{
				delete $scope.SearchData.title;
				$scope.movies = results.Search;
				console.log($scope.movies);
			}
			else
			{
				var alertPopup = $ionicPopup.alert({
					title: 'Error!',
					template: 'It doesn\'t look like that search worked. Try again or check if you have any misspelled words.'
				});
			}
		});
	}

	$scope.clearSearch = function()
	{
			delete $scope.movies;    // dump search result list
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
			template: "Loading data..."
		})
	
	var promise = omdbFactory.search($stateParams);

	promise.then(function(payload)
	{
		$ionicLoading.hide();
		//console.log(payload);
		$scope.mDtl = payload;
	});

});