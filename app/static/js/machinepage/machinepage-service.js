'use strict';

angular.module('fractalApp')
  .factory('machinepager', ['$resource', function ($resource) {
    return $resource('/fractal/noviga/machinepages/operation', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);


angular.module('fractalApp')
  .factory('machinepagerTemp', ['$resource', function ($resource) {
    return $resource('/fractal/noviga/machinepages/temperature', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);


angular.module('fractalApp')
  .factory('machinepagerCond', ['$resource', function ($resource) {
    return $resource('/fractal/noviga/machinepages/condition', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);


angular.module('fractalApp')
  .factory('machinepagerTimer', ['$resource', function ($resource) {
    return $resource('/fractal/noviga/machinepages/timer', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);