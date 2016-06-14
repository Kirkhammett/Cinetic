angular.module('cinetic.routes', [])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  // setup an abstract state for the tabs directive
    .state('search', {
    url: '/search',
    templateUrl: 'templates/search.html',
    controller: 'searchCtrl'
  })

  .state('about', {
    url: '/about',
    templateUrl: 'templates/about.html'
  })



  // Each tab has its own nav history stack:
/*
  .state('search.movie', {
    url: '/movie',
    views: {
      'search-movie': {
        templateUrl: 'templates/search-movie.html',
        controller: 'MovieCtrl'
      }
    }
  })
*/
	// if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/search');

});