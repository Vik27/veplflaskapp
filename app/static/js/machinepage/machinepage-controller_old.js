'use strict';

angular.module('fractalApp')
	.controller('machinepageController', ['$filter', '$window', '$scope', '$location', '$timeout',
	'$mdDialog', 'resolvedAjaxItems', 'machinepager',
		function ($filter, $window, $scope, $location, $timeout,
			$mdDialog, resolvedAjaxItems, machinepager) {

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
        $scope.leakReject = resolvedAjaxItems.leakReject;
        $scope.perfReject = resolvedAjaxItems.perfReject;
        $scope.boltReject = resolvedAjaxItems.boltReject;
        $scope.totalReject = resolvedAjaxItems.totalReject;
        $scope.machineId = resolvedAjaxItems.machineId;

        $scope.durations = [
        {'id': 1, 'name': 'Shift', 'disabled': false},
        {'id': 2, 'name': 'Day', 'disabled': true},
        {'id': 3, 'name': 'Week', 'disabled': true},
        {'id': 4, 'name': 'Month', 'disabled': true},
        {'id': 5, 'name': 'Quarter', 'disabled': true},
        {'id': 6, 'name': 'Year', 'disabled': true}];

        $scope.periods = [
        {'id': 1, 'name': 'Current'},
        {'id': 2, 'name': 'Previous'},
        {'id': 3, 'name': 'Custom'}];

        $scope.filt = {'duration': 1+'', 'period': 1+''};

        $scope.selclicked = function(type){
			console.log('select division clicked');
			console.log(type);
			if (type === 'duration') {
				var containerTop = $(".my-md-select-duration").offset().top + "px";
				setTimeout(function(){
					$(".my-container-duration").css({'top':containerTop});
				}, 50);
			} else {
				var containerTop = $(".my-md-select-period").offset().top + "px";
				setTimeout(function(){
					$(".my-container-period").css({'top':containerTop});
				}, 50);
			};
		};

		$scope.showDateShift = function(oldval) {
			$mdDialog.show({
				controller: 'DialogController',
				templateUrl: 'dayShift.dialog.html',
				parent: angular.element(document.body),
				clickOutsideToClose:false,
				locals: {shiftSelect: parseInt($scope.filt.duration)-1},
				fullscreen: false // Only for -xs, -sm breakpoints.
			})
			.then(function(data) {
				console.log(data);
				$scope.custom = data;
				$scope.custom.date = new Date(data.date).getTime();
				$scope.dateShiftQuery();
			}, function() {
				console.log('error in modal close');
				$scope.custom = undefined;
				$scope.filt.period = oldval;
				// $scope.status = 'You cancelled the dialog';
			});
		};

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
			var obj = {
				id: $scope.machineId,
				filt: $scope.filt,
				custom: angular.isDefined($scope.custom) ? $scope.custom : {}
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
				};

				$scope.custom = undefined;

				$scope.ondata = data.ondata;
				$scope.offdata = data.offdata;
				$scope.okcount = data.okcount;
				$scope.totalCount = data.totalCount;
				$scope.oee = $filter('number')(data.oee,1);
				$scope.availability = $filter('number')(data.availability,1);
				$scope.quality = $filter('number')(data.quality,1);
				$scope.performance = $filter('number')(data.performance,1);
				$scope.downtime = $filter('number')(data.downtime,0);
				$scope.unplannedDowntime = data.unplannedDowntime;
				$scope.plannedDowntime = data.plannedDowntime;
				$scope.totalOKTime = data.totalOKTime;
				$scope.boltReject = data.boltReject;
				$scope.perfReject = data.perfReject;
				$scope.leakReject = data.leakReject;
				$scope.totalReject = data.totalReject;

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
	                color: '#EF5350'
	            });
	            $scope.chart2.addSeries({
	            	name: 'Time',
					colorByPoint: true,
					data: [
						{
							name: 'Machine On',
							y: $scope.totalOKTime,
						},
						{
							name: 'Unplanned',
							y: $scope.unplannedDowntime,
						},
						{
							name: 'Planned',
							y: $scope.plannedDowntime,
						}
					]
	            });

	            $scope.chart3.addSeries({
	            	name: 'Rejection',
					colorByPoint: true,
					data: [
						{
							name: 'Bolting',
							y: $scope.boltReject,
						},
						{
							name: 'Performance',
							y: $scope.perfReject,
						},
						{
							name: 'Leak',
							y: $scope.leakReject,
						}
					]
	            });

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

		$scope.periodChanged = function (oldval) {
			
			if ($scope.filt.duration === '1') {
				
				if ($scope.filt.period === '3') {
					$scope.showDateShift(oldval);
				} else if ($scope.filt.period === '4') {
					var zz = $filter('filter')($scope.periods, {id: 4})[0];
					$scope.custom = zz.custom;
					$scope.dateShiftQuery();
				} else {
					$scope.dateShiftQuery();
				};
				
			} else if ($scope.filt.duration === 2) {
				// something for the day duration here
			};
		};

		$scope.shiftChartOptions = {
			chart: {
				renderTo: 'container',
				zoomType: 'x',
				panning: true,
				panKey: 'shift'
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
				type: 'datetime'
			},
			yAxis: {
				title: {
					text: ''
				},
				labels: {
					enabled: false
				},
				min: 0,
				max: 1,
				gridLineWidth: 0,
				minorGridLineWidth: 0
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
            series: [
	            {
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
				data: [
					{
						name: 'Machine On Time',
						y: $scope.totalOKTime,
					},
					{
						name: 'Unplanned',
						y: $scope.unplannedDowntime,
					},
					{
						name: 'Planned',
						y: $scope.plannedDowntime,
					}
				]
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
				data: [
					{
						name: 'Bolting',
						y: $scope.boltReject,
					},
					{
						name: 'Performance',
						y: $scope.perfReject,
					},
					{
						name: 'Leak',
						y: $scope.leakReject,
					}
				]
			}]
		};

		$scope.drawChart1 = function () {
			$scope.chart1 = new Highcharts.Chart($scope.shiftChartOptions);
		};

		$scope.drawChart1();
		$timeout(function() {
			$scope.chart2 = new Highcharts.Chart($scope.pieChartOptions);
		}, 500);
		$timeout(function() {
			$scope.chart3 = new Highcharts.Chart($scope.rejectChartOptions);
		}, 500);

}]);


angular.module('fractalApp')
	.controller('DialogController', ['$scope', '$mdDialog', 'shiftSelect',
		function ($scope, $mdDialog, shiftSelect) {

		$scope.shiftSelect = shiftSelect===0 ? true : false;
		$scope.custom = shiftSelect===0 ? {'date': new Date(), 'shift': 1+''} : {'date': new Date()};
		
		$scope.cancel = function () {
			$mdDialog.cancel();
		};

		$scope.ok = function () {
			$mdDialog.hide($scope.custom);
		}

}]);
