// Declare app level module which depends on filters, and services
angular.module('fractalApp', ['ngResource', 'ngRoute', 'ui.bootstrap', 'ui.date', 'ngCookies'])
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: '/static/views/home/home.html',
        // controller: 'createPcrnController',
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
                  $rootScope.loggedInUser = {id:data.id, name: data.username, role: data.role, businessId: data.businessId};
                  deferred.resolve(data);
                }
              }
            )
            .catch(
              function(data) {
                $rootScope.loggedInUser = null;
                return deferred.reject({authenticated: 'notLoggedIn'});
              }
            )
          return deferred.promise;}]
        }
      }) 
  .otherwise({redirectTo: '/'});
}]);


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
  .run(["$rootScope", "$window", "AuthService", function($rootScope, $window, AuthService) {
    $rootScope.$on("$routeChangeError", function(event, current, previous, eventObj) {
      if (eventObj.authenticated === "notLoggedIn") {
        console.log("authenticated-notLoggedIn");
        $window.location.href = '/login';
      } else if (eventObj.authenticated === "unauthorized") {
        console.log("unauthorized");
        AuthService.logout()
        .then(function(){
          // $location.path("/login");
          console.log('unauthorized-LoggedOut');
        })
      }
    })
}]);


angular.module('fractalApp')
    .controller('MasterCtrl', ['$scope', '$rootScope', '$cookieStore', '$window',
      function ($scope, $rootScope, $cookieStore, $window) {
    
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };

    $scope.logout = function () {
      console.log('logging out now');
      $window.location.href = '/noviga/logout';
    };


}]);


