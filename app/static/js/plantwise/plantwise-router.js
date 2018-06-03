'use strict';

angular.module('fractalApp')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/plantwise', {
        templateUrl: '/static/views/plantwise/plantwise.html',
        controller: 'plantwiseController',
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