'use strict';


angular.module('fractalApp')
  .factory('plantwisepage', ['$resource', function ($resource) {
    return $resource('/noviga/plantwisepage/summary', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);