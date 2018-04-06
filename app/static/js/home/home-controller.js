angular.module('fractalApp')
  .controller('homeController', ['$scope', 'resolvedAjaxItems', 'AuthService', '$window', '$q', '$location',
    function ($scope, resolvedAjaxItems, AuthService, $window, $q, $location) {
    	console.log('Y');
    	$scope.message = resolvedAjaxItems;

        $scope.machines = [
        {'id': 1, 'machineNo': '1', 'make': 'VEPL-III > Electrical', 'machineName': '2WSM-Auto', 'controller': 'CDC3000', 'currentOEE': 65, 'previousOEE': 0, 'status': 'on', 'lastAlive': 0},
        {'id': 2, 'machineNo': '2', 'make': 'VEPL-VI > Polymers', 'machineName': 'SM-250', 'controller': 'CDC2000WIN', 'currentOEE': 42, 'previousOEE': 14, 'status': 'disconnected', 'lastAlive': 0},
        ]

        $scope.goToMachine = function (machineId) {
            console.log(machineId);
	    if (machineId === 1) {
            	$location.path('/machine');
	    };
        };

    	
    }]);



