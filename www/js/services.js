angular.module('cinetic.services', [])
//Ajax factory making calls to the omdb API to get movie data in JSON format, using $q with a promise to handle the async call
.factory('omdbFactory', ['$http','$q','$state','$log', function($http,$q,$state,$log){
	return {
		search: function(params) {
			var deferred = $q.defer();
			console.log("Current params are: %O ", params)
			var searchMethod = params.id ? "i" : "s";
			var searchString = params.id ? params.id : params.title;
			console.dir("http://www.omdbapi.com/?" + searchMethod + "=" + searchString)
			$http.get("http://www.omdbapi.com/?" + searchMethod + "=" + searchString) // search omdb data for given title from search bar
			.success(function(data)
			{
				deferred.resolve(data); // resolve promise with data
			})
			.error(function(msg, code)
			{
				deferred.reject(msg); // reject the promise with message
				$log.error(msg,code); // log error with messange and error code
			});

			return deferred.promise; // return promise to requesting controller to wait for async response from this service
		}
	}

}])

