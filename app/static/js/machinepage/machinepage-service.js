'use strict';


angular.module('fractalApp')
  .factory('machinesummary', ['$resource', function ($resource) {
    return $resource('/noviga/machinepages/summary', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);

angular.module('fractalApp')
  .factory('machinepager', ['$resource', function ($resource) {
    return $resource('/noviga/machinepages/:id/timefilter', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);


// angular.module('fractalApp')
//   .factory('machinepagerTemp', ['$resource', function ($resource) {
//     return $resource('/noviga/machinepages/temperature', {}, {
//       'query': { method: 'GET', isArray: true},
//       'get': { method: 'GET'},
//       'update': { method: 'PUT'}
//     });
//   }]);


// angular.module('fractalApp')
//   .factory('machinepagerCond', ['$resource', function ($resource) {
//     return $resource('/noviga/machinepages/condition', {}, {
//       'query': { method: 'GET', isArray: true},
//       'get': { method: 'GET'},
//       'update': { method: 'PUT'}
//     });
//   }]);


// angular.module('fractalApp')
//   .factory('machinepagerTimer', ['$resource', function ($resource) {
//     return $resource('/noviga/machinepages/timer', {}, {
//       'query': { method: 'GET', isArray: true},
//       'get': { method: 'GET'},
//       'update': { method: 'PUT'}
//     });
//   }]);