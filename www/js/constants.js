(function() {
  angular.module('cinetic.constants', [])
    //
    .factory('constantsFactory', function($ionicPopup) {
      return {

        // popup template for the custom popup in Watchlist that simulates a ForceTouch
        popTemplate: function(movie) {
          //console.log('Called the pop template!!');
          var template = '<img ng-src="' + movie.Poster +
            '" ng-cache class="watchlisted"/><div class="col col-100">' + movie.Plot +
            '</div> <p><i class="icon ion-clock"></i> Runtime: <span ng-if="' + movie.Hours + '">' + movie.Hours +
            'h:</span><span>' + movie.Minutes +
            'min </span></p><p class="white-wrap"><i class="icon ion-film-marker"></i> <span>Creators: ' +
            movie.Director + '</span></p><p class="white-wrap"><i class="icon ion-android-contacts"></i> ' +
            '<span>Actors: ' + movie.Actors + '</span></p><p class="white-wrap"><i class="icon ion-trophy"></i> <span>Awards: ' +
            movie.Awards + '</span>' + '</p><p class="white-wrap"> <i class="icon ion-social-youtube"></i><a href="https://www.youtube.com/results?search_query=' + movie.Title + ' trailer" target="_blank"> View Trailer</a></p></div><div class="row"><p>IMDB Rating: <b>'
             + movie.imdbRating +
            '</b></p></div><div class="row"><p class="subdued" style="font-size: 1.24em"><span ng-bind-html="' + movie.imdbRating +
            ' | rating"></span></p></div><div class="row"><span>(' + movie.imdbVotes + ') total votes' + '</span></div>';
          return template;
        },
        // Spinner & Color arrays, used to randomly generate a colorful spinner which is used with $ionicLoading
        spinnerItems: function() {
          //console.log("calling Spinners!");
          return Array('android', 'ios', 'ios-small', 'bubbles', 'circles', 'crescent', 'dots', 'lines', 'ripple', 'spiral');
        },

        spinnerColors: function() {
          //console.log("calling Colors!");
          return Array('assertive', 'positive', 'calm', 'royal', 'energized', 'balanced', 'dark');
        },

        // handle the respective errors and warnings here to avoid cluttering in the controllers
        throwWarning: function(type) {
          switch (type) {
            case "empty":
              $ionicPopup.alert({
                title: 'Hey now!',
                template: 'Looks like your provided an empty search query, please enter a valid title!',
                buttons: [{
                  text: 'Okay',
                  type: 'button-positive'
                }]
              });
              break;

            case "failed":
              $ionicPopup.alert({
                title: 'Uh-oh!',
                template: 'It doesn\'t look like that search worked. Try again and check if you have any misspelled words.',
                buttons: [{
                  text: 'On it!',
                  type: 'button-positive'
                }]
              });
              break;

            case "failedDetails":
              $ionicPopup.alert({
                title: 'Dang it!',
                template: 'Looks like we couldn\'t get that item for you, try again!',
                buttons: [{
                  text: 'Okie dokie!',
                  type: 'button-calm'
                }]
              });
              break;

            case "movieAdded":
              $ionicPopup.alert({
                title: 'Done!',
                template: 'We\'ve added that to your watchlist!',
                buttons: [{
                  text: 'Great!',
                  type: 'button-positive'
                }]
              });
              break;

            case "movieFailedAdd":
              $ionicPopup.alert({
                title: 'Sorry!',
                template: 'Looks like we couldn\'t add that to your Watchlist!',
                buttons: [{
                  text: 'Okay',
                  type: 'button-calm'
                }]
              });
              break;
          }
        }
      }
    })
})();
