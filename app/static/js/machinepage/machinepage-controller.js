'use strict';

angular.module('fractalApp')
	.controller('machinepageController', ['$filter', '$window', '$scope', '$rootScope', '$modal', '$location', '$cookieStore', 'resolvedAjaxItems', 'machinepagerTemp', 'machinepagerCond', 'machinepagerTimer',
		function ($filter, $window, $scope, $rootScope, $modal, $location, $cookieStore, resolvedAjaxItems, machinepagerTemp, machinepagerCond, machinepagerTimer) {


		console.log(resolvedAjaxItems);
		
		$scope.ondata=resolvedAjaxItems.ondata;
		

}]);
