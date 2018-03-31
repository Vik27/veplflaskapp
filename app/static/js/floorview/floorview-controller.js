'use strict';

angular.module('fractalApp')
	.controller('floorviewController', ['$filter', '$scope', '$rootScope', '$modal', '$location', '$cookieStore', '$interval', '$http', 'resolvedAjaxItems',
		function ($filter, $scope, $rootScope, $modal, $location, $cookieStore, $interval, $http, resolvedAjaxItems) {

		console.log(resolvedAjaxItems);

		$scope.data = resolvedAjaxItems.cycRows;
		

}]);
