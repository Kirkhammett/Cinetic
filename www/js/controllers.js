angular.module('cinetic.controllers', [])
.controller('searchCtrl', function($scope, $q, $http, $state, $ionicPopup, $ionicSideMenuDelegate, $ionicLoading, $timeout, omdbFactory) 
{
		$scope.SearchData = {};

		$scope.getMovies = function(SearchData)
		{
				$ionicLoading.show({
				template: "Loading data..."
			})
			console.log(SearchData.title);
			var promise = omdbFactory.search(SearchData.title);
			promise.then(function(results)
			{
				$ionicLoading.hide();
				if(results.Response == "True")
				{
					$scope.movies = results.Search;
					console.log($scope.movies);
				}
				else
				{
					var alertPopup = $ionicPopup.alert({
						title: 'Error!',
						template: 'It doesn\'t look like that search worked. Try again'
					});
				}
			});
		}

		$scope.clearSearch = function()
		{
			delete $scope.movies;    /// dump search result list
		}
	})

.controller('aboutCtrl', ['$scope','$state','$ionicPopup','$ionicSideMenuDelegate','$ionicLoading',
	function($scope, $state, $ionicPopup, $ionicSideMenuDelegate, $ionicLoading)
	{
		$scope.$on('$ionicView.beforeEnter', function (event, viewData) {
			viewData.enableBack = true;
		});

	}]);
