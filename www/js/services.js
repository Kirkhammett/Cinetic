(function()
{
	angular.module('cinetic.services', [])
//Ajax factory making calls to the omdb API to get movie data in JSON format, using $q with a promise to handle the async call
.factory('omdbFactory', ['$http','$q','$state','$log', function($http,$q,$state,$log){
	return {
		search: function(params) {
			var deferred = $q.defer();
			//debug what is sent through the $stateParams
			console.log("Current params are: %O ", params)
			//check if params.id was sent through the $stateParams, if so, the search query
			//should search via imdb ID, else do a normal title search
			var searchMethod = params.id ? "i" : "s";
			//also check which search parameter should be sent to the url, id or title
			var searchString = params.id ? params.id : params.title;
			//debug search query
			console.dir("http://www.omdbapi.com/?" + searchMethod + "=" + searchString)
			// search omdb data for given title from search bar
			$http.get("http://www.omdbapi.com/?" + searchMethod + "=" + searchString)
			.success(function(data)
			{
				deferred.resolve(data); // resolve promise with data
			})
			.error(function(msg, code)
			{
				deferred.reject(msg); // reject the promise with message
				$log.error(msg,code); // log error with messange and error code
			});

			return deferred.promise; // return promise to requesting controller to wait for the async response from this service
		}
	}
}])
}());