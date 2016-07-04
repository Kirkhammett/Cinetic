(function() {
  var cinetic = angular.module('cinetic', ['ionic','ionic.service.core', 'cinetic.controllers', 'cinetic.routes', 'cinetic.services', 'cinetic.constants']);

  cinetic.config(function($ionicConfigProvider, $compileProvider) {
    // change default navbar title to always be centered, even on Android
    $ionicConfigProvider.navBar.alignTitle('center');

    //$compileProvider.imgSrcSanitizationWhitelist(/^\s(https?|file|blob|image|cdvfile):|data:image\//);
  });

  cinetic.run(function($ionicPlatform,$rootScope,$state) {

    $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
      var user = Ionic.User.current();
      if (!user.isAuthenticated()) {
        if (next.name !== 'home') {
          event.preventDefault();
          $rootScope.showSideMenu = false;
          $state.go('home');
        }
      }
    });
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
})
}());
