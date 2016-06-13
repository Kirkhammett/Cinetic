angular.module('cinetic.controllers', [])
.controller('searchCtrl', ['$scope','$q','$http','$state','$ionicPopup', '$ionicSideMenuDelegate', '$ionicLoading', '$timeout', 
	function($scope, $q, $http, $state, $ionicPopup, $ionicSideMenuDelegate, $ionicLoading, $timeout)
	{

		$scope.listflag = false;
		$scope.search = function()
		{
			$scope.listflag = true;
		}

		$scope.clearSearch = function()
		{
			$scope.listflag = false;
		delete $scope.movies;    /// dump search result list
	}

	$scope.movies = [
	{title:"Godfather", year: '1970'},
	{title:"Star Wars", year: '1980'},
	{title:"Jurassic Park", year: '1990'},
	{title:"Lord of the Rings", year: '2000'}
	];
}]);