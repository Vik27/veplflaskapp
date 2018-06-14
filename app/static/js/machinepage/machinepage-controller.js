'use strict';

angular.module('fractalApp')
	.controller('machinepageController', ['$filter', '$window', '$scope', '$location', '$timeout',
	'$mdDialog', 'resolvedAjaxItems', 'machinepager', '$mdSidenav',
		function ($filter, $window, $scope, $location, $timeout,
			$mdDialog, resolvedAjaxItems, machinepager, $mdSidenav) {

		if (window.outerWidth < 600) {
			$scope.screensize = 'mobile';
        	$scope.hght = (window.outerHeight-120) + 'px';
        	$scope.wdth = '300px';
        } else {
        	$scope.screensize = 'notMobile';
        	$scope.hght = (window.innerHeight-120) + 'px';
        	$scope.wdth = '500px';
        };

        $scope.pageLoading = false;
        $scope.append = '%';
        $scope.label = 'Normal';
        $scope.color = $scope.labelColor = $scope.valueColor = 'black';
        $scope.foreColor1 = '#e74c3c';
        $scope.foreColor2 = 'yellow';
        $scope.foreColor3 = '#2ecc71';
        $scope.foreColor4 = '#2980b9';
        $scope.backColor = '#ecf0f1';

		console.log(resolvedAjaxItems);
		var reslved = resolvedAjaxItems.data;
		// var resolvedAjaxItems = [{"id": 1, "value": [[1528299261000, 0], [1528299261000, 1], [1528304353000, 0], [1528304353000, 1], [1528306515000, 0], [1528306515000, 1], [1528308037000, 0], [1528308037000, 1], [1528309215000, 0], [1528309215000, 1], [1528316941000, 0], [1528316941000, 1], [1528319086000, 0], [1528319086000, 1], [1528321832000, 0], [1528321832000, 1], [1528322931000, 0], [1528322931000, 1], [1528324597000, 0], [1528324597000, 1]], "name": "ondata"}, {"id": 2, "value": [[1528299000000, 0], [1528299000000, 1], [1528299261000, 0], [1528299261000, 1], [1528304353000, 0], [1528304353000, 1], [1528306515000, 0], [1528306515000, 1], [1528308037000, 0], [1528308037000, 1], [1528309215000, 0], [1528309215000, 1], [1528316941000, 0], [1528316941000, 1], [1528319086000, 0], [1528319086000, 1], [1528321832000, 0], [1528321832000, 1], [1528322931000, 0], [1528322931000, 1]], "name": "offdata"}, {"id": 3, "value": [[1528299000000, 0], [1528299261000, 0], [1528304353000, 228], [1528306515000, 228], [1528308037000, 309], [1528309215000, 309], [1528316941000, 774], [1528319086000, 774], [1528321832000, 1014], [1528322931000, 1014], [1528322931000, 1014]], "name": "prodRateLine"}, {"id": 4, "value": 0.6211225589515885, "name": "oee"}, {"id": 5, "value": 0.8083880243134887, "name": "availability"}, {"id": 6, "value": 0.8407372168042143, "name": "performance"}, {"id": 7, "value": 0.92581854043392504, "name": "quality"}, {"id": 8, "value": [[9, "Shift Change", 260.823], [0, "Unknown", 4682.823]], "name": "downtimebreakup"}, {"id": 9, "value": [[9, "Pressing Load Fail", 26], [0, "Unknown", 8]], "name": "rejectionbreakup"}]
		$scope.ondata = $filter('filter')(reslved, {'id': 1})[0].value;
		$scope.offdata = $filter('filter')(reslved, {'id': 2})[0].value;
		$scope.prodRateLine = $filter('filter')(reslved, {'id': 3})[0].value;
		$scope.totalCount = $scope.prodRateLine[$scope.prodRateLine.length-1][1];
		$scope.oee = $filter('number')($filter('filter')(reslved, {'id': 4})[0].value*100, 1);
		$scope.availability = $filter('number')($filter('filter')(reslved, {'id': 5})[0].value*100, 1);
		$scope.performance = $filter('number')($filter('filter')(reslved, {'id': 6})[0].value*100, 1);
		$scope.quality = $filter('number')($filter('filter')(reslved, {'id': 7})[0].value*100, 1);
		$scope.okcount = $filter('number')($scope.totalCount*$scope.quality/100, 0);
		$scope.downtimebreakup = $filter('filter')(reslved, {'id': 8})[0].value;
		$scope.dtplotlines = $filter('filter')(reslved, {'id': 12})[0].value;
		$scope.dtplotlinedata = [];
		angular.forEach($scope.dtplotlines, function (value, key) {
			$scope.dtplotlinedata.push(
					{
					    value: value[0], // Value of where the line will appear
					    width: 0, // Width of the line
					    label: { 
						    text: value[1], // Content of the label. 
						    align: 'left', // Positioning of the label. 
						  },
						zIndex: 10,  
					}

				);
		});
		console.log($scope.dtplotlinedata)
		var downtime = 0;
		$scope.piedata = [];
		angular.forEach($scope.downtimebreakup, function (value, key) {
			$scope.piedata.push({name: value[1], y: value[2]});
			downtime = downtime + (value[2]/60);
		});
		$scope.downtime = $filter('number')(downtime, 0)
		$scope.rejectionbreakup = $filter('filter')(reslved, {'id': 9})[0].value;
		$scope.rejectdata = [];
		angular.forEach($scope.rejectionbreakup, function (value, key) {
			$scope.rejectdata.push({name: value[1], y: value[2]});
		});

		$scope.machineId = resolvedAjaxItems.machineId;
		$scope.date = new Date();
		if (resolvedAjaxItems.shift === 1) {
			$scope.shift= 'A';
		} else if (resolvedAjaxItems.shift === 2) {
			$scope.shift = 'B';
		} else {
			$scope.shift = 'C';
		};

		$scope.toggleSidenav = function(menuId) {
			$mdSidenav(menuId).toggle();
		};

		$scope.closeSidenav = function(menuId) {
			$mdSidenav(menuId).close();
		};

		$scope.periods = [
        {'id': 1, 'name': 'Current'},
        {'id': 2, 'name': 'Previous'},
        {'id': 3, 'name': 'Custom'}];

        $scope.durations = [
        {'id': 1, 'name': 'Shift', 'disabled': false},
        {'id': 2, 'name': 'Day', 'disabled': true},
        {'id': 3, 'name': 'Week', 'disabled': true},
        {'id': 4, 'name': 'Month', 'disabled': true},
        {'id': 5, 'name': 'Quarter', 'disabled': true},
        {'id': 6, 'name': 'Year', 'disabled': true}];

        $scope.filt = {'period': 1+'', 'duration': 1+''};

        $scope.periodChangeHandler = function () {
        	if ($scope.filt.period === '3') {
        		$scope.customSelectionShow = true;
        	} else {
        		$scope.customSelectionShow = false;
        	};
        };

        $scope.shiftChartOptions = {
			chart: {
				renderTo: 'container1',
				zoomType: 'x',
				panning: true,
				panKey: 'shift',
				alignTicks: false
			},
			loading: {
				labelStyle: {
					color: '#9FA8DA',
				},
				style: {
					backgroundColor: '#EEEEEE'
				}
			},
			credits: {
				enabled: false
			},
			title: {
				text: 'Production History',
				style: {'font-family': 'Roboto'}
			},
			xAxis: {
				type: 'datetime',
				plotLines: $scope.dtplotlinedata
			},
			yAxis: 
			[
				{ // Primary yAxis
					min:0,
					max:1,
					labels: {
			            enabled: false,
			            format:''
			        }
			        

			    },

			    { // Secondary yAxis
			        opposite: true,
			        max:1400,
			        labels: {
			            enabled: false,
			            format:''
			        }
			    },
				
			],
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
                },
                line: {
					dataLabels: {
						enabled: true,
						allowOverlap: true,
						padding: 15,
						align: 'right',
						rotation: 300,
						verticalAlign: 'top',
						x: 10,
						y: -30,
						crop: false,
						overflow: 'none'
					},
					marker: {
						enabled: true
					}
					// enableMouseTracking: false
				},
				series: {
					label: {
						enabled: false,
					}
				},
            },

            series: [
	            {
	                type: 'area',
	                name: 'ON',
	                data: $scope.ondata,
	                fillColor: '#8BC34A',
	                color: '#8BC34A',
	                
	            },
	            {
	                type: 'area',
	                name: 'OFF',
	                data: $scope.offdata,
	                fillColor: '#EF5350',
	                color: '#EF5350',
	                
	            },
	            {
	                type: 'line',
	                data: $scope.prodRateLine,
	                color: 'blue',
	               	yAxis:1,


	            },
            ],
            
		};

		$scope.prodrateChartOptions = {
			chart: {
				renderTo: 'container2',
				type: 'line'
			},
			loading: {
				labelStyle: {
					color: '#9FA8DA',
				},
				style: {
					backgroundColor: '#EEEEEE'
				}
			},
			credits: {
				enabled: false
			},
			title: {
		        text: 'Production Rate - Part Count vs Time'
		    },
		    xAxis: {
				type: 'datetime'
			},
		    yAxis: {
		        title: {
		            text: ''
		        },
				labels: {
					enabled: false
				},
		    },
		    legend: {
		    	enabled: false,
		        layout: 'horizontal',
		        padding: 0,
		    },
            plotOptions: {
				line: {
					dataLabels: {
						enabled: true,
						allowOverlap: true,
						padding: 15,
						align: 'right',
						rotation: 300,
						verticalAlign: 'top',
						x: 10,
						y: -30,
						crop: false,
						overflow: 'none'
					},
					marker: {
						enabled: true
					}
					// enableMouseTracking: false
				},
				series: {
					label: {
						enabled: false,
					}
				},
            },
            series: [
	            // {
	            //     name: 'Nominal',
	            //     data: $scope.ondata,
	            //     color: '#8BC34A'
	            // },
	            {
	                name: 'Part Count',
	                data: $scope.prodRateLine,
	                color: '#EF5350'
	            },
            ]
		};

		$scope.pieChartOptions = {
			chart: {
				renderTo: 'container3',
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'
			},
			loading: {
				labelStyle: {
					color: '#9FA8DA',
				},
				style: {
					backgroundColor: '#EEEEEE'
				}
			},
			title: {
				text: 'Availability Pie Chart',
				style: {'font-family': 'Roboto'}
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
				name: 'Time',
				colorByPoint: true,
				data: $scope.piedata,
			}]
		};

		$scope.rejectChartOptions = {
			chart: {
				renderTo: 'container4',
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'
			},
			loading: {
				labelStyle: {
					color: '#9FA8DA',
				},
				style: {
					backgroundColor: '#EEEEEE'
				}
			},
			title: {
				text: 'Rejection Pie Chart',
				style: {'font-family': 'Roboto'}
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
				name: 'Rejection',
				colorByPoint: true,
				data: $scope.rejectdata,
			}]
		};

		$timeout(function() {
			$scope.chart1 = new Highcharts.Chart($scope.shiftChartOptions);
		}, 500);
		$timeout(function() {
			$scope.chart2 = new Highcharts.Chart($scope.prodrateChartOptions);
		}, 500);
		$timeout(function() {
			$scope.chart3 = new Highcharts.Chart($scope.pieChartOptions);
		}, 500);
		$timeout(function() {
			$scope.chart4 = new Highcharts.Chart($scope.rejectChartOptions);
		}, 500);

        // $scope.$watch(
        //     function() { return $mdSidenav('yourSide').isOpen(); },
        //     function(newValue, oldValue) {
        //         console.log(newValue);
        //     }
        // );

}]);