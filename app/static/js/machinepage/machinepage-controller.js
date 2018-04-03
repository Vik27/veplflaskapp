'use strict';

angular.module('fractalApp')
	.controller('machinepageController', ['$filter', '$scope', '$rootScope', '$modal', '$location', '$cookieStore', 'resolvedAjaxItems', 'machinepagerTemp', 'machinepagerCond', 'machinepagerTimer',
		function ($filter, $scope, $rootScope, $modal, $location, $cookieStore, resolvedAjaxItems, machinepagerTemp, machinepagerCond, machinepagerTimer) {


		console.log(resolvedAjaxItems);

		
		$scope.offdata=resolvedAjaxItems.offdata;
		$scope.ondata=resolvedAjaxItems.ondata;


		Highcharts.chart('container', {
            credits: {
                enabled: false
            },
            chart: {
                zoomType: 'x'
            },
            title: {
                text: ''
            },
            
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Production'
                },
                labels: {
                    enabled: false
                },  
                min:0,
                max:1
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                name: 'ON',
                data: $scope.ondata,
                fillColor: 'green'
            },
            {
                type: 'area',
                name: 'OFF',
                data: $scope.offdata,
                fillColor: 'red'
            },
            ]
        });

>>>>>>> 007fe2988daa83130e163897db3d1d8a594bd7ce
}]);