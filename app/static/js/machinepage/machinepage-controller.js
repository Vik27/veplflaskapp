'use strict';

angular.module('fractalApp')
	.controller('machinepageController', ['$filter', '$window', '$scope', '$rootScope', '$modal', '$location', '$cookieStore', 'resolvedAjaxItems', 'machinepagerTemp', 'machinepagerCond', 'machinepagerTimer',
		function ($filter, $window, $scope, $rootScope, $modal, $location, $cookieStore, resolvedAjaxItems, machinepagerTemp, machinepagerCond, machinepagerTimer) {


		console.log(resolvedAjaxItems);

		
		$scope.offdata=resolvedAjaxItems.offdata;
		$scope.ondata=resolvedAjaxItems.ondata;
        $scope.okcount=resolvedAjaxItems.okcount;
        $scope.totalCount=resolvedAjaxItems.totalCount;
        $scope.oee=$filter('number')(resolvedAjaxItems.oee,1);
        $scope.availability=$filter('number')(resolvedAjaxItems.availability,1);
        $scope.performance=$filter('number')(resolvedAjaxItems.performance,1);
        $scope.quality=$filter('number')(resolvedAjaxItems.quality,1);
        $scope.totalOKTime=resolvedAjaxItems.totalOKTime;
        $scope.totalproductionTime=resolvedAjaxItems.totalproductionTime;
        $scope.stdProductionRate=resolvedAjaxItems.stdProductionRate;
        $scope.actualProductionRate=resolvedAjaxItems.actualProductionRate;
        $scope.downtime=$filter('number')(resolvedAjaxItems.downtime,0);
        $scope.unplannedDowntime=resolvedAjaxItems.unplannedDowntime;
        $scope.plannedDowntime=resolvedAjaxItems.plannedDowntime;

        $scope.hght = (window.innerWidth-120) + 'px';
        $scope.hght1 = window.outerWidth + 'px';
        $scope.hght2 = window.screen.availWidth + 'px';
        // $scope.wdth = window.innerWidth + 'px';
        // console.log($scope.wdth);
        // console.log($scope.hght);

        $scope.durations = [
        {'id': 1, 'name': 'Shift'},
        {'id': 2, 'name': 'Day'},
        {'id': 3, 'name': 'Week'},
        {'id': 4, 'name': 'Month'},
        {'id': 5, 'name': 'Quarter'},
        {'id': 6, 'name': 'Year'}];

        $scope.filt = {'duration': 1};

        $scope.selclicked = function(){
        	console.log('klkolkiolkoolko');
    var containerTop = $(".my-md-select").offset().top + "px";
    setTimeout(function(){
        $(".my-container").css({'top':containerTop});
    }, 50);

};


		Highcharts.chart('container', {
            credits: {
                enabled: false
            },
            chart: {
                zoomType: 'x',
		panning: true,
		panKey: 'shift'
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
                color: '#8BC34A'
            },
            {
                type: 'area',
                name: 'OFF',
                data: $scope.offdata,
                fillColor: '#EF5350',
                color: '#EF5350'
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
			            name: 'Machine On Time',
			            y: $scope.totalOKTime,
			        }, {
			            name: 'Unplanned',
			            y: $scope.unplannedDowntime,
			        }, {
			            name: 'Planned',
			            y: $scope.plannedDowntime,
			        }]
			    }]
			});

}]);
