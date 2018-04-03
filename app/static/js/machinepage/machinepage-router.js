'use strict';

angular.module('fractalApp')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/machine', {
        templateUrl: '/static/views/machinepage/machinepage.html',
        controller: 'machinepageController',
        resolve:{
          resolvedAjaxItems: ['$q', '$rootScope', '$route' ,'machinepager', 'AuthService',
          function ($q, $rootScope, $route, machinepager, AuthService) {
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
                  $rootScope.loggedInUser = {id:data.data.id, name: data.data.username, role: data.data.role, businessId: data.data.businessId};
                  // machinepager.get(function(data) {
                    deferred.resolve(data);
                  // });
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