(function() {
  angular.module('cinetic.routes', [])
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      // setup main state for the app
      .state('search', {
        url: '/search',
        templateUrl: 'templates/search.html',
        controller: 'searchCtrl'

      })
        // details state that shows movies found via id $stateParam
        .state('details', {
          url: '/details/:id',
          templateUrl: 'templates/details.html',
          controller: 'detailsCtrl'
        })
        // about authours/app page
        .state('about', {
          url: '/about',
          templateUrl: 'templates/about.html'
        })

        .state('watchlist', {
          url: '/watchlist',
          templateUrl: 'templates/watchlist.html',
          controller: 'watchlistCtrl'
        })
        .state('home', {
          url: '/home',
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
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
        $urlRouterProvider.otherwise(function($injector, $location) {
          var $state = $injector.get("$state");
          $state.go("search");
        });

      });
}());
