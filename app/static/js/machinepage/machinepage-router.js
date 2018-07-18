'use strict';

angular.module('fractalApp')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/machine/:id', {
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
                  $rootScope.loggedInUser = {id:data.id, name: data.username, role: data.role, businessId: data.businessId};
                  var filt = {'duration': '1', 'period': '1'};
                  var cust = {};
                  machinepager.get({filt: filt, custom: cust, id: $route.current.params.id}, function(data) {
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
