// Declare app level module which depends on filters, and services
angular.module('fractalApp', 
  ['ngResource', 'ngRoute', 'ui.bootstrap', 'ngCookies',
  'ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'angularjs-gauge', 'treeGrid', 'ngMdIcons'])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
      .when('/', {
        templateUrl: '/static/views/plantwise/plantwise.html',
        controller: 'plantwiseController',
        resolve:{
          resolvedAjaxItems: ['$q', '$rootScope', 'AuthService',
          function ($q, $rootScope, AuthService) {
            var deferred = $q.defer();
            AuthService.getUser()
            .then(
              function(data) {
                console.log(data);
                if (data === 'null') {
                  // console.log(data);
                  $rootScope.loggedInUser = null;
                  deferred.reject({authenticated: 'notLoggedIn'});                  
                } else {
                  $rootScope.loggedInUser = {id:data.data.id, name: data.data.username, role: data.data.role, businessId: data.data.businessId};
                  
                  deferred.resolve(data);
                }
              }
            )
            .catch(
              function(data) {
                $rootScope.loggedInUser = null;
                deferred.reject({authenticated: 'notLoggedIn'});
              }
            )
            return deferred.promise;
          }]
        }
      }) 

    .otherwise({redirectTo: '/'});
}]);

angular.module('fractalApp')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: '/static/views/home/home.html',
        controller: 'homeController',
        resolve:{
          resolvedAjaxItems: ['$q', '$rootScope', '$route' ,'plantwisepage', 'AuthService',
          function ($q, $rootScope, $route, plantwisepage, AuthService) {
            var deferred = $q.defer();
            AuthService.getUser()
            .then(
              function(data) {
                // console.log(data);
                if (data === 'null') {
                  // console.log(data);
                  $rootScope.loggedInUser = null;
                  deferred.reject({authenticated: 'notLoggedIn'});                  
                } else {
                  $rootScope.loggedInUser = {id:data.id, name: data.username, role: data.role, businessId: data.businessId};
                  plantwisepage.get(function(data) {
                    deferred.resolve(data);
                  });
                }
              }
            )
            .catch(
              function(data) {
                $rootScope.loggedInUser = null;
                deferred.reject({authenticated: 'notLoggedIn'});
              }
            )
          return deferred.promise;}]
        }
      })
}]);

// angular.module('fractalApp')
//   .config(['$locationProvider', function ($locationProvider) {
//     $locationProvider.hashPrefix('');
//   }]);

angular.module('fractalApp')
  .directive('rdWidget', function () {
    var directive = {
      transclude: true,
      template: '<div class="widget" ng-transclude></div>',
      restrict: 'EA'
    };
    return directive;

    function link(scope, element, attrs) {
        /* */
    }
});


angular.module('fractalApp')
  .directive('rdWidgetHeader', function () {
    var directive = {
      requires: '^rdWidget',
      scope: {
          title: '@',
          icon: '@'
      },
      transclude: true,
      template: '<div class="widget-header"><div class="row"><div class="pull-left"><i class="fa" ng-class="icon"></i> {{title}} </div><div class="pull-right col-xs-6 col-sm-4" ng-transclude></div></div></div>',
      restrict: 'E'
    };
    return directive;
});


angular.module('fractalApp')
  .directive('rdWidgetFooter', function rdWidgetFooter() {
    var directive = {
      requires: '^rdWidget',
      transclude: true,
      template: '<div class="widget-footer" ng-transclude></div>',
      restrict: 'E'
    };
    return directive;
});


angular.module('fractalApp')
  .directive('rdWidgetBody', function rdWidgetBody() {
    var directive = {
      requires: '^rdWidget',
      scope: {
          loading: '@?',
          classes: '@?'
      },
      transclude: true,
      template: '<div class="widget-body" ng-class="classes"><rd-loading ng-show="loading"></rd-loading><div ng-hide="loading" class="widget-content" ng-transclude></div></div>',
      restrict: 'E'
    };
    return directive;
});


angular.module('fractalApp')
  .directive('rdLoading', function rdLoading() {
    var directive = {
      restrict: 'AE',
      template: '<div class="loading"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>'
    };
    return directive;
});


angular.module('fractalApp')
  .directive('focusMe', function($timeout) {
    return {
      scope: { trigger: '@focusMe' },
      link: function(scope, element) {
        scope.$watch('trigger', function(value) {
          if(value === "true") { 
            $timeout(function() {
              element[0].focus(); 
            });
          }
        });
      }
    };
});


angular.module('fractalApp')
  .run(["$rootScope", "$window", "AuthService", "$timeout", 
    function($rootScope, $window, AuthService, $timeout) {
      
      $rootScope.layout = {};
      $rootScope.layout.loading = false;
      
      $rootScope.$on("$routeChangeError", function(event, current, previous, eventObj) {
        console.log('$routeChangeError');
        console.log(eventObj);
        if (eventObj.authenticated === "notLoggedIn") {
          console.log("authenticated-notLoggedIn");
          $window.location.href = '/login';
        } else if (eventObj.authenticated === "unauthorized") {
          console.log("unauthorized");
          AuthService.logout()
          .then(function(){
            $window.location.href = "/login";
            console.log('unauthorized-LoggedOut');
          })
        }
      });

      $rootScope.$on("$routeChangeSuccess", function(event, current, previous) {
        $timeout(function(){
          $rootScope.layout.loading = false;
        }, 200);
      });

      $rootScope.$on('$routeChangeStart', function () {
        console.log('$routeChangeStart');
        //show loading gif
        $timeout(function(){
          $rootScope.layout.loading = true;          
        });
      });
}]);


angular.module('fractalApp')
    .controller('MasterCtrl', ['$scope', '$window',
      function ($scope, $window) {

      $scope.logout = function () {
        console.log('logging out now');
        $window.location.href = '/noviga/logout';
      };

}]);


angular.module('fractalApp').config(function($mdThemingProvider) {
  // var customBlueMap =     $mdThemingProvider.extendPalette('light-blue', {
  //   'contrastDefaultColor': 'light',
  //   'contrastDarkColors': ['50'],
  //   '50': 'ffffff'
  // });
  // $mdThemingProvider.definePalette('customBlue', customBlueMap);
  // $mdThemingProvider.theme('default')
  //   .primaryPalette('customBlue', {
  //     'default': '500',
  //     'hue-1': '50'
  //   })
  //   .accentPalette('pink');
  $mdThemingProvider.theme('input', 'default')
        .primaryPalette('green')
});


