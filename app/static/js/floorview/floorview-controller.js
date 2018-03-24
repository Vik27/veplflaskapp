'use strict';

angular.module('fractalApp')
	.controller('floorviewController', ['$filter', '$scope', '$rootScope', '$modal', '$location', '$cookieStore', '$interval', '$http', 'resolvedAjaxItems',
		function ($filter, $scope, $rootScope, $modal, $location, $cookieStore, $interval, $http, resolvedAjaxItems) {

		console.log(resolvedAjaxItems);

		$scope.machines = resolvedAjaxItems.machines;
		angular.forEach($scope.machines, function (value, key) {
			value.lastAlive = new Date(value.lastAlive);
		});

		$scope.make = resolvedAjaxItems.filteropts.make;
		$scope.mcstatus = resolvedAjaxItems.filteropts.mcstatus;
		$scope.downtime = resolvedAjaxItems.filteropts.downtime;
		$scope.alarm = resolvedAjaxItems.filteropts.alarm;
		$scope.achievement = resolvedAjaxItems.filteropts.achievement;

		$scope.makeModel = [];
		$scope.mcstatusModel = [];
		$scope.downtimeModel = [];
		$scope.alarmModel = [];
		$scope.achievementModel = [];
		
		$scope.makeSettings = {
			displayProp: 'name',
			checkBoxes: true,
			buttonClasses: 'btn btn-default btn-sm',
			smartButtonMaxItems: 2,
			smartButtonTextConverter: function(itemText, originalItem) { return itemText; },
		};		
		$scope.mcstatusSettings = {
			displayProp: 'name',
			checkBoxes: true,
			buttonClasses: 'btn btn-default btn-sm',
			smartButtonMaxItems: 3,
			smartButtonTextConverter: function(itemText, originalItem) { return itemText; },
		};		
		$scope.downtimeSettings = {
			displayProp: 'name',
			checkBoxes: true,
			selectionLimit: 1,
			scrollable: true,
			scrollableHeight: '250px',
			buttonClasses: 'btn btn-default btn-sm',
			smartButtonMaxItems: 3,
			smartButtonTextConverter: function(itemText, originalItem) { return itemText; },
		};		
		$scope.alarmSettings = {
			displayProp: 'name',
			checkBoxes: true,
			selectionLimit: 1,
			scrollable: true,
			scrollableHeight: '250px',
			buttonClasses: 'btn btn-default btn-sm',
			smartButtonMaxItems: 3,
			smartButtonTextConverter: function(itemText, originalItem) { return itemText; },
		};		
		$scope.achievementSettings = {
			displayProp: 'name',
			checkBoxes: true,
			selectionLimit: 1,
			scrollable: true,
			scrollableHeight: '250px',
			buttonClasses: 'btn btn-default btn-sm',
			smartButtonMaxItems: 3,
			smartButtonTextConverter: function(itemText, originalItem) { return itemText; },
		};

		// $scope.contestData = [1,2,3,4,5,6,7,8,9,10,11,12];
  
		// $scope.getRows = function(array, columns) {
		// 	var rows = [];
		// 	var i,j,temparray, chunk = columns;
		// 	for (i=0,j=array.length; i<j; i+=chunk) {
		// 		temparray = array.slice(i, i+chunk);
		// 		rows.push(temparray);
		// 	};
		// 	return rows;
		// };

		$scope.goToMachine = function (machineId) {
			console.log(machineId);
			$location.path('/machine');
		};

		var stop;
		$scope.startPoll = function () {
			if ( angular.isDefined ( stop ) ) return;

			stop = $interval(function () {
				$http.get('/fractal/noviga/machinerefresh')
				.then(function(response) {
					console.log(response.data);
					$scope.machines = response.data.machines;
					angular.forEach($scope.machines, function (value, key) {
						value.lastAlive = new Date(value.lastAlive);
					});
				});
			}, 30000);
		};

		$scope.stopPoll = function () {
			if (angular.isDefined(stop)) {
				$interval.cancel(stop);
				stop = undefined;
			};
		};

		$scope.$on('$destroy', function() {
			$scope.stopPoll();
		});

		 /**
	     * Sidebar Toggle & Cookie Control
	     */
	    var mobileView = 992;

	    $scope.getWidth = function() {
	        return window.innerWidth;
	    };

	    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
	        if (newValue >= mobileView) {
	            if (angular.isDefined($cookieStore.get('toggle'))) {
	                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
	                if ($scope.toggle) {
			        	$scope.rows = $scope.getRows($scope.contestData, 3);
			        } else {
			        	$scope.rows = $scope.getRows($scope.contestData, 4);
			        };
	            } else {
	                $scope.toggle = true;
	                $scope.rows = $scope.getRows($scope.contestData, 3);
	            }
	        } else {
	            $scope.toggle = null;
	            $scope.rows = $scope.getRows($scope.contestData, 1);
	        }
	        console.log($scope.toggle);

	    });

	    $scope.toggleSidebar = function() {
	        $scope.toggle = !$scope.toggle;
	        $cookieStore.put('toggle', $scope.toggle);
	        if (window.innerWidth >= mobileView) {
		        if ($scope.toggle) {
		        	$scope.rows = $scope.getRows($scope.contestData, 3);
		        } else {
		        	$scope.rows = $scope.getRows($scope.contestData, 4);
		        }
		    } else {
		    	$scope.rows = $scope.getRows($scope.contestData, 1);
		    }
	    };

	    window.onresize = function() {
	        $scope.$apply();
	    };

	    $scope.startPoll();

}]);
