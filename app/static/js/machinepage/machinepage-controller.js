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
                fillColor: '#8BC34A',
                line: {color: '#8BC34A'}
            },
            {
                type: 'area',
                name: 'OFF',
                data: $scope.offdata,
                fillColor: '#EF5350',
                line: {color: '#EF5350'}
            },
            ]
        });


        Highcharts.chart('container2', {
			    chart: {
			        plotBackgroundColor: null,
			        plotBorderWidth: null,
			        plotShadow: false,
			        type: 'pie'
			    },
			    title: {
			        text: 'Availability Pie Chart'
			    },
			    tooltip: {
			        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			    },
			    plotOptions: {
			        pie: {
			            allowPointSelect: true,
			            cursor: 'pointer',
			            dataLabels: {
			                enabled: true,
			                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
			                style: {
			                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
			                }
			            }
			        }
			    },
			    series: [{
			        name: 'Brands',
			        colorByPoint: true,
			        data: [{
			            name: 'Availability',
			            y: 60,
			        }, {
			            name: 'Unplanned Downtime',
			            y: 30
			        }, {
			            name: 'Planned Downtime',
			            y: 10
			        }]
			    }]
			});

}]);