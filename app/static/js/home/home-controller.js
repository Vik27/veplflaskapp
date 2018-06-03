angular.module('fractalApp')
  .controller('homeController', ['$scope', 'resolvedAjaxItems', 'AuthService', '$window', '$q', '$location',
    function ($scope, resolvedAjaxItems, AuthService, $window, $q, $location) {
    	console.log('Y');
    	$scope.message = resolvedAjaxItems;

        $scope.machines = [
        {'id': 1, 'site': 'Electrical', 'plant': 'VEPL-III', 'machineName': '2WSM-Auto', 'controller': 'CDC3000', 'currentOEE': 50, 'previousOEE': 68, 'status': 'on', 'lastAlive': 0},
        {'id': 2, 'site': 'Moulding', 'plant': 'VEPL-VI', 'machineName': 'SM-250 (A)', 'controller': 'CDC2000WIN', 'currentOEE': 32, 'previousOEE': 33.0, 'status': 'on', 'lastAlive': 0},
        ]

        $scope.goToMachine = function (machineId) {
            console.log(machineId);
        	$location.path('/machine/'+machineId);
        };

    	
    }]);



