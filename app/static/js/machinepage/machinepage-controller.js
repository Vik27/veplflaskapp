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
		
		$scope.dtplotlines = $filter('filter')(reslved, {'id': 12})[0].value;
		$scope.dtplotlinedata = [];
		angular.forEach($scope.dtplotlines, function (value, key) {
			var wdth, txt;
			if (value[1]==='s'){
				wdth = 1;
				txt = null;
			} else {
				wdth = 0;
				txt = value[1]
			};
			$scope.dtplotlinedata.push({
			    value: value[0], // Value of where the line will appear
			    width: wdth, // Width of the line
			    color: 'white',
			    label: { 
				    text: txt, // Content of the label. 
				    align: 'left', // Positioning of the label. 
				  },
				zIndex: 10,  
			});
		});

		$scope.okngstatlog = $filter('filter')(reslved, {'id': 13})[0].value;
		
		$scope.rejectdata = [];
		$scope.drilldownseries = [];
		angular.forEach($scope.okngstatlog, function (value, key) {
			$scope.rejectdata.push({
				'name': value.partname,
				'y': value.ngcount,
				'drilldown': value.partname
			});
			var data = [];
			angular.forEach(value.failuremodes, function (val, ke) {
				data.push([val.failuremodeName+'', val.quantity])
			})
			$scope.drilldownseries.push({
				'name': value.partname,
				'id': value.partname,
				'data': data
			})
		});

		$scope.downtimebreakup = $filter('filter')(reslved, {'id': 8})[0].value;
		var downtime = 0;
		$scope.piedata = [];
		angular.forEach($scope.downtimebreakup, function (value, key) {
			$scope.piedata.push({name: value[1], y: value[2]});
			// downtime = downtime + (value[2]/60);
		});
		$scope.downtime = $filter('number')($filter('filter')(reslved, {id: 11})[0].value, 0);
		
		$scope.machineId = resolvedAjaxItems.machineId;
		$scope.date = resolvedAjaxItems.date;
		$scope.shift = resolvedAjaxItems.shift;

		// $scope.operator = $filter('filter')(reslved, {id: 16})[0].value;
		// if (!($scope.operator)) {
		//	$scope.operator = 'Unknown';
		// }
		// $scope.supervisor = $filter('filter')(reslved, {id: 16})[0].value;
		// if (!($scope.supervisor)) {
		//	$scope.supervisor = 'Unknown';
		// }

		$scope.fpas = [
			{'id': 1, 'name': 'Core Height'},
			{'id': 2, 'name': 'Core Runout'},
			{'id': 3, 'name': 'Core Faceout'},
		];
		$scope.fpalogs = $filter('filter')(reslved, {'id': 14})[0].value;

		$scope.pkyks = [
			{'id': 1, 'name': 'Load Cell'},
			{'id': 2, 'name': 'Safety Curtain'},
		];
		$scope.pklogs = $filter('filter')(reslved, {'id': 15})[0].value;

		$scope.dateShiftQuery = function () {
			while ($scope.chart1.series.length > 0 ) {
				$scope.chart1.series[0].remove(true);
			};
			while ($scope.chart2.series.length > 0 ) {
				$scope.chart2.series[0].remove(true);
			};
			while ($scope.chart3.series.length > 0 ) {
				$scope.chart3.series[0].remove(true);
			};
			
			$scope.pageLoading = true;
			$scope.chart1.chartBackground.attr({ fill : '#EEEEEE'});
			$scope.chart2.chartBackground.attr({ fill : '#EEEEEE'});
			$scope.chart3.chartBackground.attr({ fill : '#EEEEEE'});
			$scope.chart1.setTitle({ style: {'color': '#EEEEEE'} });
			$scope.chart2.setTitle({ style: {'color': '#EEEEEE'} });
			$scope.chart3.setTitle({ style: {'color': '#EEEEEE'} });
			$scope.chart1.showLoading();
			$scope.chart2.showLoading();
			$scope.chart3.showLoading();
			$scope.color = $scope.valueColor = $scope.backColor = '#EEEEEE';
			$scope.foreColor1 = $scope.foreColor2 = $scope.foreColor3 = $scope.foreColor4 = '#EEEEEE';
			$scope.append = '';
			$scope.label = 'Loading...';
			$scope.labelColor = '#9FA8DA';
			$scope.oee = 0;
			$scope.availability = 0;
			$scope.quality = 0;
			$scope.performance = 0;
			
			var _custom;
			if ($scope.filt.period === '3') {
				_custom = $scope.custom;
				// $scope.custom.date = new Date($scope.custom.date).getTime();
			} else if ($scope.filt.period === '4') {
				var zz = $filter('filter')($scope.periods, {id: 4})[0];
				_custom = zz.custom;
			} else {
				_custom = undefined;
			};

			var obj = {
				id: $scope.machineId,
				filt: $scope.filt,
				custom: angular.isDefined(_custom) ? _custom : {}
			};

			machinepager.get(obj, function (data) {
				console.log(data);
				if (('date' in obj.custom) && ('shift' in obj.custom)) {
					// console.log(obj.custom.date);
					// console.log(obj.custom.shift);
					var xx = $filter('date')(obj.custom.date, 'mediumDate');
					// console.log(xx);
					
					if (obj.custom.shift === '1') {
						var yy = 'A';
					} else if (obj.custom.shift === '2') {
						var yy = 'B';
					} else {
						var yy = 'C';
					};

					if ($scope.periods.length > 3) {
						var zz = $filter('filter')($scope.periods, {id: 4})[0];
						zz.name = yy + ', ' + xx;
						zz.custom = obj.custom;
						$scope.filt.period = '4';
					} else {
						$scope.periods.push({'id': 4, 'name': yy + ', ' + xx, 'custom': obj.custom })
						$scope.filt.period = '4';
					};
					$scope.customSelectionShow = false;
				};

				_custom = undefined;
				var newData = data.data;

				$scope.ondata = $filter('filter')(newData, {'id': 1})[0].value;
				$scope.offdata = $filter('filter')(newData, {'id': 2})[0].value;
				$scope.prodRateLine = $filter('filter')(newData, {'id': 3})[0].value;
				$scope.totalCount = $scope.prodRateLine[$scope.prodRateLine.length-1][1];
				$scope.oee = $filter('number')($filter('filter')(newData, {'id': 4})[0].value*100, 1);
				$scope.availability = $filter('number')($filter('filter')(newData, {'id': 5})[0].value*100, 1);
				$scope.performance = $filter('number')($filter('filter')(newData, {'id': 6})[0].value*100, 1);
				$scope.quality = $filter('number')($filter('filter')(newData, {'id': 7})[0].value*100, 1);
				$scope.okcount = $filter('number')($scope.totalCount*$scope.quality/100, 0);
				
				$scope.dtplotlines = $filter('filter')(newData, {'id': 12})[0].value;
				$scope.dtplotlinedata = [];
				angular.forEach($scope.dtplotlines, function (value, key) {
					var wdth, txt;
					if (value[1]==='s'){
						wdth = 1;
						txt = null;
					} else {
						wdth = 0;
						txt = value[1]
					};
					$scope.dtplotlinedata.push({
					    value: value[0], // Value of where the line will appear
					    width: wdth, // Width of the line
					    color: 'white',
					    label: { 
						    text: txt, // Content of the label. 
						    align: 'left', // Positioning of the label. 
						  },
						zIndex: 10,  
					});
				});

				$scope.okngstatlog = $filter('filter')(newData, {'id': 13})[0].value;

				$scope.rejectdata = [];
				$scope.drilldownseries = [];
				angular.forEach($scope.okngstatlog, function (value, key) {
					$scope.rejectdata.push({
						'name': value.partname,
						'y': value.ngcount,
						'drilldown': value.partname
					});
					var data = [];
					angular.forEach(value.failuremodes, function (val, ke) {
						data.push([val.failuremodeName+'', val.quantity])
					})
					$scope.drilldownseries.push({
						'name': value.partname,
						'id': value.partname,
						'data': data
					})
				});

				$scope.downtimebreakup = $filter('filter')(newData, {'id': 8})[0].value;
				var downtime = 0;
				$scope.piedata = [];
				angular.forEach($scope.downtimebreakup, function (value, key) {
					$scope.piedata.push({name: value[1], y: value[2]});
					// downtime = downtime + (value[2]/60);
				});
				$scope.downtime = $filter('number')($filter('filter')(newData, {id: 11})[0].value, 0);
				
				$scope.date = data.date;
				$scope.shift= data.shift;

				$scope.operatorrow = $filter('filter')(newData, {id: 16})[0];
				if (!($scope.operatorrow)) {
					$scope.operator = 'Unknown';
				} else { 
					$scope.operator = $scope.operatorrow.value;
				};

				$scope.supervisorrow = $filter('filter')(newData, {id: 16})[0];
				if (!($scope.supervisorrow)) {
					$scope.supervisor = 'Unknown';
				} else { 
					$scope.supervisor = $scope.supervisorrow.value;
				};

				$scope.chart1.addSeries({
	                type: 'area',
	                name: 'ON',
	                data: $scope.ondata,
	                fillColor: '#8BC34A',
	                color: '#8BC34A'
	            });

	            $scope.chart1.addSeries({
	                type: 'area',
	                name: 'OFF',
	                data: $scope.offdata,
	                fillColor: '#EF5350',
	                color: '#EF5350',
	            });

	            $scope.chart1.addSeries({
	                type: 'line',
	                name: 'Production Count',
	                data: $scope.prodRateLine,
	                color: 'blue',
	               	yAxis:1,
	            });

	            $scope.chart1.xAxis[0].update({plotLines: $scope.dtplotlinedata});
	            $scope.chart1.yAxis[1].update({max: $scope.totalCount + 100});
	            console.log($scope.chart1);

	            $scope.chart2.addSeries({
					name: 'Time',
					colorByPoint: true,
					data: $scope.piedata,
				});

				$scope.chart3.addSeries({
					name: 'Rejection',
					colorByPoint: true,
					data: $scope.rejectdata,
				});
				$scope.chart3.options.drilldown.series = $scope.drilldownseries;

	            $scope.append = '%';
	            $scope.label = 'Normal';
	            $scope.color = $scope.labelColor = $scope.valueColor = 'black';
	            $scope.foreColor1 = '#e74c3c';
	            $scope.foreColor2 = 'yellow';
	            $scope.foreColor3 = '#2ecc71';
	            $scope.foreColor4 = '#2980b9';
	            $scope.backColor = '#ecf0f1';
	            $scope.chart1.hideLoading();
	            $scope.chart2.hideLoading();
	            $scope.chart3.hideLoading();
	            $scope.chart1.setTitle({ style: {'color': 'black'} });
				$scope.chart2.setTitle({ style: {'color': 'black'} });
				$scope.chart3.setTitle({ style: {'color': 'black'} });
	            $scope.chart1.chartBackground.attr({ fill : 'white'});
				$scope.chart2.chartBackground.attr({ fill : 'white'});
				$scope.chart3.chartBackground.attr({ fill : 'white'});
	            $scope.pageLoading = false;
			});
		};

		$scope.toggleSidenav = function(menuId) {
			$scope.oldfilt = {'period': $scope.filt.period, 'duration': $scope.filt.duration};
			$scope.custom = {'date': new Date(), 'shift': 1+''};
			$mdSidenav(menuId).open();
		};

		$scope.closeflag = 0;
		$scope.closeSidenav = function(menuId) {
			$scope.closeflag = 1;
			$mdSidenav(menuId).close().then(function() {
				console.log('sidenav closed properly');
				// query the results from flask route
				$scope.dateShiftQuery();
				$scope.closeflag = 0;
			});
		};

		$timeout(function() {
			$mdSidenav('left', true).then(function(instance) {
				// On close callback to handle close, backdrop click, or escape key pressed.
				// Callback happens BEFORE the close action occurs.
				instance.onClose(function() {
					if ($scope.closeflag === 1) {
						console.log('closing properly');
					} else {
						console.log('sidenav dismissed');
						$scope.filt = {
	                		'period': $scope.oldfilt.period,
	                		'duration': $scope.oldfilt.duration
	                	};
	                	$scope.customSelectionShow = false;
					};
				});
			});
		}, 1500);

		$scope.periods = [
	        {'id': 1, 'name': 'Current'},
	        {'id': 2, 'name': 'Previous'},
	        {'id': 3, 'name': 'Custom'}
        ];

        $scope.durations = [
	        {'id': 1, 'name': 'Shift', 'disabled': false},
	        {'id': 2, 'name': 'Day', 'disabled': true},
	        {'id': 3, 'name': 'Week', 'disabled': true},
	        {'id': 4, 'name': 'Month', 'disabled': true},
	        {'id': 5, 'name': 'Quarter', 'disabled': true},
	        {'id': 6, 'name': 'Year', 'disabled': true}
        ];

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
			        },
			        title: {
			        	text: ''
			        },
			        gridLineWidth: 0,
			        minorGridLineWidth: 0
			    },
			    { // Secondary yAxis
			        opposite: true,
			        max: $scope.totalCount + 100,
			        labels: {
			            enabled: false,
			        },
			        title: {
			        	text: ''
			        },
			        gridLineWidth: 0,
			        minorGridLineWidth: 0
			    },
				
			],
            legend: {
				enabled: true,
				layout: 'horizontal',
				padding: 0,
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
	                name: 'Production Count',
	                data: $scope.prodRateLine,
	                color: 'blue',
	               	yAxis:1,


	            },
            ],
		};

		$scope.pieChartOptions = {
			chart: {
				renderTo: 'container2',
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
			credits: {
				enabled: false
			},
			title: {
				text: 'Downtime Pie Chart',
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
			credits: {
				enabled: false
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
			}],
			drilldown: {
				series: $scope.drilldownseries,
			}
		};

		$timeout(function() {
			$scope.chart1 = new Highcharts.Chart($scope.shiftChartOptions);
			console.log($scope.chart1);
		}, 500);
		$timeout(function() {
			$scope.chart2 = new Highcharts.Chart($scope.pieChartOptions);
		}, 500);
		$timeout(function() {
			$scope.chart3 = new Highcharts.Chart($scope.rejectChartOptions);
		}, 500);

        // $scope.$watch(
        //     function() { return $mdSidenav('left').isOpen(); },
        //     function(newValue, oldValue) {
        //         console.log(newValue);
        //         if ( newValue === false ) {
        //         	console.log('sidenav dismissed');
        //         	$scope.filt = {
        //         		'period': $scope.oldfilt.period,
        //         		'duration': $scope.oldfilt.duration
        //         	};
        //         	if ($scope.filt.period === '3') {
        //         		$scope.customSelectionShow = true;
        //         	} else {
        //         		$scope.customSelectionShow = false;
        //         	};
        //         }
        //     }
        // );

}]);




  //       $scope.prodrateChartOptions = {
		// 	chart: {
		// 		renderTo: 'container2',
		// 		type: 'line'
		// 	},
		// 	loading: {
		// 		labelStyle: {
		// 			color: '#9FA8DA',
		// 		},
		// 		style: {
		// 			backgroundColor: '#EEEEEE'
		// 		}
		// 	},
		// 	credits: {
		// 		enabled: false
		// 	},
		// 	title: {
		//         text: 'Production Rate - Part Count vs Time'
		//     },
		//     xAxis: {
		// 		type: 'datetime'
		// 	},
		//     yAxis: {
		//         title: {
		//             text: ''
		//         },
		// 		labels: {
		// 			enabled: false
		// 		},
		//     },
		//     legend: {
		//     	enabled: false,
		//         layout: 'horizontal',
		//         padding: 0,
		//     },
  //           plotOptions: {
		// 		line: {
		// 			dataLabels: {
		// 				enabled: true,
		// 				allowOverlap: true,
		// 				padding: 15,
		// 				align: 'right',
		// 				rotation: 300,
		// 				verticalAlign: 'top',
		// 				x: 10,
		// 				y: -30,
		// 				crop: false,
		// 				overflow: 'none'
		// 			},
		// 			marker: {
		// 				enabled: true
		// 			}
		// 			// enableMouseTracking: false
		// 		},
		// 		series: {
		// 			label: {
		// 				enabled: false,
		// 			}
		// 		},
  //           },
  //           series: [
	 //            // {
	 //            //     name: 'Nominal',
	 //            //     data: $scope.ondata,
	 //            //     color: '#8BC34A'
	 //            // },
	 //            {
	 //                name: 'Part Count',
	 //                data: $scope.prodRateLine,
	 //                color: '#EF5350'
	 //            },
  //           ]
		// };



