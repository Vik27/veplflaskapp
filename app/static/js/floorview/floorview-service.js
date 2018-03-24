'use strict';

angular.module('fractalApp')
  .factory('floorviewer', ['$resource', function ($resource) {
    return $resource('/fractal/noviga/floorviews', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);