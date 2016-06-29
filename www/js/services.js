(function() {
  angular.module('cinetic.services', [])
    //Ajax factory making calls to the omdb API to get movie data in JSON format, using $q with a promise to handle the async call
    .factory('omdbFactory', ['$http', '$q', '$state', '$log', function($http, $q, $state, $log) {
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
          //debug search query, add + "&plot=full" at the end for full movie plot.
          console.dir("http://www.omdbapi.com/?" + searchMethod + "=" + searchString)
            // search omdb data for given title from search bar
          $http.get("http://www.omdbapi.com/?" + searchMethod + "=" + searchString)
            .success(function(data) {
              deferred.resolve(data); // resolve promise with data
            })
            .error(function(msg, code) {
              deferred.reject(msg); // reject the promise with message
              $log.error(msg, code); // log error with messange and error code
            });

          return deferred.promise; // return promise to requesting controller to wait for the async response from this service
        },
        searchAPI: function() {
          var deferred = $q.defer();

          var data = {
            userId: "Heylo"
          };

          var config = {
            params: data,
            headers: {
              'Accept': 'application/json'
            }
          };

          // search movie API data for list of user movies in the DB
          $http.get("http://localhost:3000/api/movie?param=Haylo")
            .success(function(data) {
              console.log(data);
              deferred.resolve(data); // resolve promise with data
            })
            .error(function(msg, code) {
              deferred.resolve(code); // eturn the promise with and error code
              $log.error(msg, code); // log error with messange and error code
            });

          return deferred.promise; // return promise to requesting controller to wait for the async response from this service
        },
        postAPI: function(params) {
          var deferred = $q.defer();
          console.log("Sending POST: %O ", params);
          $http({
              method: 'POST',
              url: 'http://localhost:3000/api/movie',
              data: params,
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .success(function(data) {
              console.log(data);
              deferred.resolve(data);
            })
            .error(function(msg, code) {
              deferred.resolve(code); // return the promise with and error code
              $log.error(msg, code); // log error with messange and error code
            });
          return deferred.promise;
        }
      }
    }])
}());
