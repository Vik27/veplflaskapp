'use strict';

angular.module('fractalApp')
	.controller('machinepageController', ['$filter', '$scope', '$rootScope', '$modal', '$location', '$cookieStore', 'resolvedAjaxItems', 'machinepagerTemp', 'machinepagerCond', 'machinepagerTimer',
		function ($filter, $scope, $rootScope, $modal, $location, $cookieStore, resolvedAjaxItems, machinepagerTemp, machinepagerCond, machinepagerTimer) {

		console.log(resolvedAjaxItems);

		$scope.rawdata = resolvedAjaxItems.result;
		$scope.prodCount = resolvedAjaxItems.prodCount;
		$scope.alarmCount = resolvedAjaxItems.alarmCount;
		$scope.cycleTime = resolvedAjaxItems.cycleTime;

		$scope.machine = {'number': 28035, 'make': "Asian Plastic", 'controllerType': "CDC2000WIN"};
		
		$scope.status = $scope.rawdata[$scope.rawdata.length-1][1];
		if ($scope.status) {
			$scope.color = '#0f824e';
		} else {
			$scope.color = '#9b2f0d';
		};

		$scope.showOperations = true;

		$scope.operationShow = function () {
			$scope.showOperations = true;
			$scope.showConditions = false;
			$scope.showTemperatures = false;
			$scope.showTimers = false;
		};

		$scope.conditionShow = function () {
			$scope.showConditions = false;
			$scope.showOperations = false;
			$scope.showTemperatures = false;
			$scope.showTimers = false;
			$scope.showLoading = true;

			machinepagerCond.get(function (data) {
				console.log(data);
				$scope.screwPosition=data.mcdata.screwPosition;
			    $scope.oilPressure=data.mcdata.oilPressure;
			    // $scope.timeArray=resolvedAjaxItems.mcdata.timeArray;
			    $scope.startTime=data.mcdata.startTime;
			    $scope.injectionStart=data.mcdata.injectionStart;
			    $scope.holdStart=data.mcdata.holdStart;
			    $scope.plastStart=data.mcdata.plastStart;
			    $scope.coolStart=data.mcdata.coolStart;
			    $scope.endTime=data.mcdata.endTime;
			    // $scope.screwPosplotbands=resolvedAjaxItems.mcdata.screwPosplotbands;

				Highcharts.chart('containerScrew', {

						chart: {
						        // Edit chart spacing
						        spacingBottom: 15,
						        spacingTop: 10,
						        spacingLeft: 10,
						        spacingRight: 10,
						},

						title:{
						    text:'Screw Position'
						},

						xAxis: {

							title: {
				                text: 'Time (sec)'
				            },
				            labels: {
				                x : 0,
				                y : -5,
				                align: 'left'
				            },

				            plotLines: [{
						        color: '#FF0000', // Red
						        width: 2,
						        label: { 
								    text: 'Mold Close', // Content of the label. 
								    align: 'left', // Positioning of the label. 
								    rotation: 90
								  },
						        value: $scope.startTime // Position, you'll have to translate this to the values on your x axis
						    },

						    {
						        color: '#FF0000', // Red
						        width: 2,
						        label: { 
								    text: 'Injection Start', // Content of the label. 
								    align: 'left', // Positioning of the label. 
								    rotation: 90
								  },
						        value: $scope.injectionStart // Position, you'll have to translate this to the values on your x axis
						    },

						    {
						        color: '#FF0000', // Red
						        width: 2,
						        label: { 
								    text: 'Hold Start', // Content of the label. 
								    align: 'left', // Positioning of the label. 
								    rotation: 90
								  },
						        value: $scope.holdStart // Position, you'll have to translate this to the values on your x axis
						    },

						    {
						        color: '#FF0000', // Red
						        width: 2,
						        label: { 
								    text: 'Plastisizing Start', // Content of the label. 
								    align: 'left', // Positioning of the label. 
								    rotation: 90
								  },
						        value: $scope.plastStart // Position, you'll have to translate this to the values on your x axis
						    },
						    {
						        color: '#FF0000', // Red
						        width: 2,
						        label: { 
								    text: 'Cooling Start', // Content of the label. 
								    align: 'left', // Positioning of the label. 
								    rotation: 90
								  },
						        value: $scope.coolStart	 // Position, you'll have to translate this to the values on your x axis
						    },
						    {
						        color: '#FF0000', // Red
						        width: 2,
						        label: { 
								    text: 'Mold Open', // Content of the label. 
								    align: 'left', // Positioning of the label. 
								    rotation: 90
								  },
						        value: $scope.endTime	 // Position, you'll have to translate this to the values on your x axis
						    }],

						},


					    yAxis: {
					        title: {
					            text: 'Screw Position'
					        }
					    },

					    plotOptions: {
					        series: {
					        	showInLegend: false,               

					            label: {
					                connectorAllowed: false
					            },
					            pointStart: 2010
					        },

					        line: {
						        marker: {
						            enabled: false
						        }
						    }
					    },

					    series: [{
					        data: $scope.screwPosition
					    }],

					    responsive: {
					        rules: [{
					            condition: {
					                maxWidth: 500
					            },
					            
					        }]
					    }

					});


				Highcharts.chart('containerOil', {

						chart: {
						        // Edit chart spacing
						        spacingBottom: 15,
						        spacingTop: 10,
						        spacingLeft: 10,
						        spacingRight: 10,
						},

						title:{
						    text:'Oil Pressure'
						},

						xAxis: {

							title: {
				                text: 'Time (sec)'
				            },
				            labels: {
				                x : 0,
				                y : -5,
				                align: 'left'
				            },

				            plotLines: [{
						        color: '#FF0000', // Red
						        width: 2,
						        label: { 
								    text: 'Mold Close', // Content of the label. 
								    align: 'left', // Positioning of the label. 
								    rotation: 90
								  },
						        value: $scope.startTime // Position, you'll have to translate this to the values on your x axis
						    },

						    {
						        color: '#FF0000', // Red
						        width: 2,
						        label: { 
								    text: 'Injection Start', // Content of the label. 
								    align: 'left', // Positioning of the label. 
								    rotation: 90
								  },
						        value: $scope.injectionStart // Position, you'll have to translate this to the values on your x axis
						    },

						    {
						        color: '#FF0000', // Red
						        width: 2,
						        label: { 
								    text: 'Hold Start', // Content of the label. 
								    align: 'left', // Positioning of the label. 
								    rotation: 90
								  },
						        value: $scope.holdStart // Position, you'll have to translate this to the values on your x axis
						    },

						    {
						        color: '#FF0000', // Red
						        width: 2,
						        label: { 
								    text: 'Plastisizing Start', // Content of the label. 
								    align: 'left', // Positioning of the label. 
								    rotation: 90
								  },
						        value: $scope.plastStart // Position, you'll have to translate this to the values on your x axis
						    },
						    {
						        color: '#FF0000', // Red
						        width: 2,
						        label: { 
								    text: 'Cooling Start', // Content of the label. 
								    align: 'left', // Positioning of the label. 
								    rotation: 90
								  },
						        value: $scope.coolStart	 // Position, you'll have to translate this to the values on your x axis
						    },
						    {
						        color: '#FF0000', // Red
						        width: 2,
						        label: { 
								    text: 'Mold Open', // Content of the label. 
								    align: 'left', // Positioning of the label. 
								    rotation: 90
								  },
						        value: $scope.endTime	 // Position, you'll have to translate this to the values on your x axis
						    }],

						},


					    yAxis: {
					        title: {
					            text: 'Injection Oil Pressure'
					        }
					    },

					    plotOptions: {
					        series: {
					        	showInLegend: false,               

					            label: {
					                connectorAllowed: false
					            },
					            pointStart: 2010
					        },

					        line: {
						        marker: {
						            enabled: false
						        }
						    }
					    },

					    series: [{
					        data: $scope.oilPressure
					    }],

					    responsive: {
					        rules: [{
					            condition: {
					                maxWidth: 500
					            },
					            
					        }]
					    }

					});

				$scope.showLoading = false;
				$scope.showConditions = true;
			});
		};

		$scope.temperatureShow = function () {
			$scope.showTemperatures = false;
			$scope.showConditions = false;
			$scope.showOperations = false;
			$scope.showTimers = false;
			$scope.showLoading = true;
			
			machinepagerTemp.get(function (data) {
				
				console.log(data);
				
				$scope.T2 = data.T2;
				$scope.T3 = data.T3;
				$scope.T4 = data.T4;
				$scope.T5 = data.T5;
				$scope.T6 = data.T6;
				$scope.T7 = data.T7;

				Highcharts.chart('containerTemp', {
				    title: {
				        text: 'Temperature History'
				    },
				    xAxis: {
				        type: 'datetime',
				        // dateTimeLabelFormats: { // don't display the dummy year
				        //     hour : '%H:%M',
				        // },
				        title: {
				            text: 'Time'
				        }
				    },
				    yAxis: {
				        title: {
				            text: 'Temperature (Degree Celcius)'
				        },
				        min: 180,
				        max: 250,
				    },
				    plotOptions: {
				        line: {
				            marker: {
				                enabled: true
				            }
				        }
				    },

				    series: [
				    	{name: 'T2', data: $scope.T2},
				    	{name: 'T3', data: $scope.T3},
				    	{name: 'T4', data: $scope.T4},
				    	{name: 'T5', data: $scope.T5},
				    	{name: 'T6', data: $scope.T6},
				    	{name: 'T7', data: $scope.T7}
				    	],
				});

				$scope.showLoading = false;
				$scope.showTemperatures = true;
				$scope.showConditions = false;
				$scope.showOperations = false;
				$scope.showTimers = false;
			});
		};

		$scope.timerShow = function () {
			$scope.showTemperatures = false;
			$scope.showConditions = false;
			$scope.showOperations = false;
			$scope.showTimers = false;
			$scope.showLoading = true;
			
			machinepagerTimer.get(function (data) {
				
				console.log(data);
				
				$scope.fillTime = data.fillTime;
				$scope.clampOpenTime = data.clampOpenTime;
				$scope.clampCloseTime = data.clampCloseTime;
				$scope.cycleTime = data.cycleTime;

				Highcharts.chart('containerTimer', {
				    title: {
				        text: 'Time Monitor'
				    },
				    xAxis: {
				        type: 'datetime',
				        // dateTimeLabelFormats: { // don't display the dummy year
				        //     hour : '%H:%M',
				        // },
				        title: {
				            text: 'Time'
				        }
				    },
				    yAxis: {
				        title: {
				            text: 'Time (seconds)'
				        },
				        min: 0,
				        max: 100,
				    },
				    plotOptions: {
				        line: {
				            marker: {
				                enabled: true
				            }
				        }
				    },

				    series: [
				    	{name: 'Fill Time ', data: $scope.fillTime},
				    	{name: 'Clamp Open Time', data: $scope.clampOpenTime},
				    	{name: 'Clamp Close Time', data: $scope.clampCloseTime},
				    	{name: 'Cycle Time', data: $scope.cycleTime},
				    	],
				});

				$scope.showLoading = false;
				$scope.showTimers = true;
			});
		};

		// $scope.tempList = [
		// 	{'id': 1, 'name': 'T2'},
		// 	{'id': 2, 'name': 'T3'},
		// 	{'id': 3, 'name': 'T4'},
		// 	{'id': 4, 'name': 'T5'},
		// 	{'id': 5, 'name': 'T6'},
		// 	{'id': 6, 'name': 'T7'},
		// ];

		// $scope.selTemps = [$scope.tempList[0]];

		// $scope.dataToShow = [{name: 'T2', data: $scope.T2}];

		// $scope.tempSettings = {
		// 	displayProp: 'name',
		// 	checkBoxes: true,
		// 	buttonClasses: 'btn btn-default btn-sm',
		// };

		// $scope.tempEvents = {
		// 	onSelectionChanged: function () {
		// 		console.log('hello 222');
		// 		$scope.dataToShow = [];
		// 		angular.forEach($scope.selTemps, function (value, key) {
		// 			if (value.name === 'T2') {
		// 				$scope.dataToShow.push({name: 'T2', data: $scope.T2});
		// 			} else if (value.name === 'T3') {
		// 				$scope.dataToShow.push({name: 'T3', data: $scope.T3});
		// 			} else if (value.name === 'T4') {
		// 				$scope.dataToShow.push({name: 'T4', data: $scope.T4});
		// 			} else if (value.name === 'T5') {
		// 				$scope.dataToShow.push({name: 'T5', data: $scope.T5});
		// 			} else if (value.name === 'T6') {
		// 				$scope.dataToShow.push({name: 'T6', data: $scope.T6});
		// 			} else {
		// 				$scope.dataToShow.push({name: 'T7', data: $scope.T7});
		// 			};
		// 		});
		// 		$scope.tempChart.addSeries({name: 'T2', data: $scope.T2}, true);
		// 		$scope.tempChart.redraw();
		// 	},
		// };


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
	            } else {
	                $scope.toggle = true;
	            }
	        } else {
	            $scope.toggle = false;
	        }
	    });

	    $scope.toggleSidebar = function() {
	        $scope.toggle = !$scope.toggle;
	        $cookieStore.put('toggle', $scope.toggle);
	    };

	    window.onresize = function() {
	        $scope.$apply();
	    };

	    Highcharts.chart('container', {
		    title: {
		        text: 'Production History'
		    },
		    xAxis: {
		        type: 'datetime',
		        // dateTimeLabelFormats: { // don't display the dummy year
		        //     hour : '%H:%M',
		        // },
		        title: {
		            text: 'Time'
		        }
		    },
		    yAxis: {
		        title: {
		            text: 'Production'
		        },
		        min: 0,
		        max: 1,
		    },
		    plotOptions: {
		        line: {
		            marker: {
		                enabled: true
		            }
		        }
		    },

		    series: [{
		        name: 'Production Log',
		        // Define the data points. All series have a dummy year
		        // of 1970/71 in order to be compared on the same x axis. Note
		        // that in JavaScript, months start at 0 for January, 1 for February etc.
		        data: $scope.rawdata,
		    }]
		});

}]);