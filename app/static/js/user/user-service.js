'use strict';

angular.module('noviga')
  .factory('User', ['$resource', function ($resource) {
    return $resource('noviga/users/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);

angular.module('noviga')
  .factory('binessUser', ['$resource', function ($resource) {
    return $resource('noviga/businesses/:businessId/users/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
}]);

angular.module('noviga')
  .factory('Userdata', ['$resource', function ($resource) {
    return $resource('noviga/businesses/all/userdata', {}, {
      'get': { method: 'GET'},
    });
}]);

angular.module('noviga')
  .factory('binessUserdata', ['$resource', function ($resource) {
    return $resource('noviga/businesses/:businessId/userdata', {}, {
      'get': { method: 'GET'},
    });
}]);
