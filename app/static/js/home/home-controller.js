angular.module('fractalApp')
  .controller('homeController', ['$scope', 'resolvedAjaxItems', 'AuthService', '$window', '$q', '$location', '$timeout', '$filter',
    function ($scope, resolvedAjaxItems, AuthService, $window, $q, $location, $timeout, $filter) {
    	console.log('Y');
    	$scope.message = resolvedAjaxItems;

        if (window.outerWidth < 600) {
            $scope.screensize = 'mobile';
            $scope.hght = (window.outerHeight-70) + 'px';
            $scope.wdth = '300px';
        } else {
            $scope.screensize = 'notMobile';
            $scope.hght = (window.innerHeight-50) + 'px';
            $scope.wdth = '500px';
        };

        $scope.timeframeItems = [
            { 'id': 1, 'name': 'Live', 'icon': 'share' , 'checked': true},
            { 'id': 2, 'name': 'Previous Shift', 'icon': 'upload' , 'checked': false},
            { 'id': 3, 'name': 'Yesterday', 'icon': 'copy' , 'checked': false},
            { 'id': 4, 'name': 'Last Week', 'icon': 'print' , 'checked': false},
        ];
        $scope.availItems = [
            { 'id': 1, 'name': 'Downtime & Runtime'},
            { 'id': 2, 'name': 'Stoppages'},
        ];
        $scope.prodItems = [
            { 'id': 1, 'name': 'Plan & Actual'},
            { 'id': 2, 'name': 'Total & NG'},
        ];
        $scope.ftrItems = [
            { 'id': 1, 'name': 'In Percentage'},
            { 'id': 2, 'name': 'In PPM'},
        ];
        $scope.dtItems = [
            { 'id': 1, 'name': 'Time Elapsed'},
            { 'id': 2, 'name': 'Occurence Frequency'},
        ];

        $scope.dtreasons = [
            {'id': 0, 'name': 'Unknown'},
            {'id': 1, 'name': 'Tea Break'},
            {'id': 2, 'name': 'Lunch Break'},
            {'id': 3, 'name': 'Dinner Break'},
            {'id': 4, 'name': 'No Material'},
            {'id': 5, 'name': 'No Electricity'},
            {'id': 6, 'name': 'No Plan'},
            {'id': 7, 'name': 'Machine Breakdown'},
            {'id': 8, 'name': 'Poor Quality'},
            {'id': 9, 'name': 'Shift Change'},
            {'id': 10, 'name': 'No Air'},
            {'id': 11, 'name': 'No Manpower'},
            {'id': 12, 'name': 'Part Change'},
            {'id': 13, 'name': 'New Product Trial'},
        ];

        $scope.block1 = [
            {
                'timeframe': 1,
                'availability': 1,
                'chartOptions': {
                    chart: {
                        renderTo: 'container1',
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        plotShadow: false,
                        type: 'bar'
                    },
                    title: {
                        text: 'Least Available Machines'
                    },
                    credits: {
                        enabled: false,
                    },
                    xAxis: {
                        categories: ['2WSM-Auto', 'Core Pressing', 'SMD Pick-n-Place']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Downtime in minutes'
                        }
                    },
                    legend: {
                        reversed: false,
                        padding: 0
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        },
                        series: {
                            stacking: null,
                        }
                    },
                    series: [{
                        name: 'Downtime',
                        data: [43, 28, 32],
                        color: '#EF5350'
                    }, {
                        name: 'Runtime',
                        data: [243, 272, 268],
                        color: '#8BC34A'
                    }]
                }
            },
            {
                'timeframe': 2,
                'availability': 1,
                'chartOptions': {
                    chart: {
                        renderTo: 'container1',
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        plotShadow: false,
                        type: 'bar'
                    },
                    title: {
                        text: 'Least Available Machines'
                    },
                    credits: {
                        enabled: false,
                    },
                    xAxis: {
                        categories: ['2WSM-Auto', 'Core Pressing', 'SMD Pick-n-Place']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Downtime in minutes'
                        }
                    },
                    legend: {
                        reversed: false,
                        padding: 0
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        },
                        series: {
                            stacking: null,
                        }
                    },
                    series: [{
                        name: 'Downtime',
                        data: [143, 208, 302],
                        color: '#EF5350'
                    }, {
                        name: 'Runtime',
                        data: [367, 302, 208],
                        color: '#8BC34A'
                    }]
                }
            },
            {
                'timeframe': 3,
                'availability': 1,
                'chartOptions': {
                    chart: {
                        renderTo: 'container1',
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        plotShadow: false,
                        type: 'bar'
                    },
                    title: {
                        text: 'Least Available Machines'
                    },
                    credits: {
                        enabled: false,
                    },
                    xAxis: {
                        categories: ['2WSM-Auto', 'Core Pressing', 'SMD Pick-n-Place']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Downtime in hours'
                        }
                    },
                    legend: {
                        reversed: false,
                        padding: 0
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        }
                        ,
                        series: {
                            stacking: null,
                        }
                    },
                    series: [{
                        name: 'Downtime',
                        data: [4.3, 5.8, 9.3],
                        color: '#EF5350'
                    }, {
                        name: 'Runtime',
                        data: [19.7, 18.2, 14.7],
                        color: '#8BC34A'
                    }]
                }
            },
            {
                'timeframe': 4,
                'availability': 1,
                'chartOptions': {
                    chart: {
                        renderTo: 'container1',
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        plotShadow: false,
                        type: 'bar'
                    },
                    title: {
                        text: 'Least Available Machines'
                    },
                    credits: {
                        enabled: false,
                    },
                    xAxis: {
                        categories: ['2WSM-Auto', 'Core Pressing', 'SMD Pick-n-Place']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Downtime in hours'
                        }
                    },
                    legend: {
                        reversed: false,
                        padding: 0
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        },
                        series: {
                            stacking: null,
                        }
                    },
                    series: [{
                        name: 'Downtime',
                        data: [23, 18, 32],
                        color: '#EF5350'
                    }, {
                        name: 'Runtime',
                        data: [145, 150, 136],
                        color: '#8BC34A'
                    }]
                }
            },
            {
                'timeframe': 1,
                'availability': 2,
                'chartOptions': {
                    chart: {
                        renderTo: 'container1',
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        plotShadow: false,
                        type: 'bar'
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: 'Frequently Stopped Machines'
                    },
                    xAxis: {
                        categories: ['2WSM-Auto', 'Core Pressing', 'SMD Pick-n-Place']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Number of stoppages'
                        }
                    },
                    legend: {
                        reversed: false,
                        padding: 0,
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        },
                        series: {
                            stacking: 'normal',
                        }
                    },
                    series: [{
                        name: '< 10 minutes',
                        data: [13, 8, 12],
                        color: '#cccc00'
                    }, {
                        name: '< 20 minutes',
                        data: [9, 6, 17],
                        color: '#cc9900'
                    }, {
                        name: '< 30 minutes',
                        data: [4, 7, 1],
                        color: '#996600'
                    }, {
                        name: '> 30 minutes',
                        data: [1, 4, 2],
                        color: '#cc3300'
                    }]
                }
            },
            {
                'timeframe': 2,
                'availability': 2,
                'chartOptions': {
                    chart: {
                        renderTo: 'container1',
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        plotShadow: false,
                        type: 'bar'
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: 'Frequently Stopped Machines'
                    },
                    xAxis: {
                        categories: ['2WSM-Auto', 'Core Pressing', 'SMD Pick-n-Place']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Number of stoppages'
                        }
                    },
                    legend: {
                        reversed: false,
                        padding: 0,
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        },
                        series: {
                            stacking: 'normal',
                        }
                    },
                    series: [{
                        name: '< 10 minutes',
                        data: [23, 8, 36],
                        color: '#cccc00'
                    }, {
                        name: '< 20 minutes',
                        data: [13, 6, 21],
                        color: '#cc9900'
                    }, {
                        name: '< 30 minutes',
                        data: [5, 8, 1],
                        color: '#996600'
                    }, {
                        name: '> 30 minutes',
                        data: [3, 5, 1],
                        color: '#cc3300'
                    }]
                }
            },
            {
                'timeframe': 3,
                'availability': 2,
                'chartOptions': {
                    chart: {
                        renderTo: 'container1',
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        plotShadow: false,
                        type: 'bar'
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: 'Frequently Stopped Machines'
                    },
                    xAxis: {
                        categories: ['2WSM-Auto', 'Core Pressing', 'SMD Pick-n-Place']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Number of stoppages'
                        }
                    },
                    legend: {
                        reversed: false,
                        padding: 0,
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        },
                        series: {
                            stacking: 'normal',
                        }
                    },
                    series: [{
                        name: '< 10 minutes',
                        data: [43, 18, 62],
                        color: '#cccc00'
                    }, {
                        name: '< 20 minutes',
                        data: [21, 16, 37],
                        color: '#cc9900'
                    }, {
                        name: '< 30 minutes',
                        data: [8, 13, 3],
                        color: '#996600'
                    }, {
                        name: '> 30 minutes',
                        data: [6, 8, 4],
                        color: '#cc3300'
                    }]
                }
            },
            {
                'timeframe': 4,
                'availability': 2,
                'chartOptions': {
                    chart: {
                        renderTo: 'container1',
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        plotShadow: false,
                        type: 'bar'
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: 'Frequently Stopped Machines'
                    },
                    xAxis: {
                        categories: ['2WSM-Auto', 'Core Pressing', 'SMD Pick-n-Place']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Number of stoppages'
                        }
                    },
                    legend: {
                        reversed: false,
                        padding: 0,
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        },
                        series: {
                            stacking: 'normal',
                        }
                    },
                    series: [{
                        name: '< 10 minutes',
                        data: [23, 8, 32],
                        color: '#cccc00'
                    }, {
                        name: '< 20 minutes',
                        data: [11, 6, 17],
                        color: '#cc9900'
                    }, {
                        name: '< 30 minutes',
                        data: [4, 7, 1],
                        color: '#996600'
                    }, {
                        name: '> 30 minutes',
                        data: [1, 4, 2],
                        color: '#cc3300'
                    }]
                }
            }
        ];

        $scope.block2 = [
            {
                'timeframe': 1,
                'production': 1,
                'chartOptions': {
                    chart: {
                        renderTo: 'container2',
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        plotShadow: false,
                        type: 'bar'
                    },
                    title: {
                        text: 'Plan vs Actual'
                    },
                    credits: {
                        enabled: false,
                    },
                    xAxis: {
                        categories: ['2WSM-Auto', 'Core Pressing', 'SMD Pick-n-Place']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'No. of components'
                        }
                    },
                    legend: {
                        reversed: false,
                        padding: 0
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        },
                        series: {
                            stacking: null,
                        }
                    },
                    series: [{
                        name: 'Actual',
                        data: [43, 28, 32],
                        color: '#EF5350'
                    }, {
                        name: 'Plan',
                        data: [243, 272, 268],
                        color: '#8BC34A'
                    }]
                }
            },
            {
                'timeframe': 2,
                'production': 1,
                'chartOptions': {
                    chart: {
                        renderTo: 'container2',
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        plotShadow: false,
                        type: 'bar'
                    },
                    title: {
                        text: 'Plan vs Actual'
                    },
                    credits: {
                        enabled: false,
                    },
                    xAxis: {
                        categories: ['2WSM-Auto', 'Core Pressing', 'SMD Pick-n-Place']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'No. of components'
                        }
                    },
                    legend: {
                        reversed: false,
                        padding: 0
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        },
                        series: {
                            stacking: null,
                        }
                    },
                    series: [{
                        name: 'Actual',
                        data: [143, 208, 302],
                        color: '#EF5350'
                    }, {
                        name: 'Plan',
                        data: [367, 302, 208],
                        color: '#8BC34A'
                    }]
                }
            },
            {
                'timeframe': 3,
                'production': 1,
                'chartOptions': {
                    chart: {
                        renderTo: 'container2',
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        plotShadow: false,
                        type: 'bar'
                    },
                    title: {
                        text: 'Plan vs Actual'
                    },
                    credits: {
                        enabled: false,
                    },
                    xAxis: {
                        categories: ['2WSM-Auto', 'Core Pressing', 'SMD Pick-n-Place']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'No. of components'
                        }
                    },
                    legend: {
                        reversed: false,
                        padding: 0
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        }
                        ,
                        series: {
                            stacking: null,
                        }
                    },
                    series: [{
                        name: 'Actual',
                        data: [4.3, 5.8, 9.3],
                        color: '#EF5350'
                    }, {
                        name: 'Plan',
                        data: [19.7, 18.2, 14.7],
                        color: '#8BC34A'
                    }]
                }
            },
            {
                'timeframe': 4,
                'production': 1,
                'chartOptions': {
                    chart: {
                        renderTo: 'container2',
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        plotShadow: false,
                        type: 'bar'
                    },
                    title: {
                        text: 'Plan vs Actual'
                    },
                    credits: {
                        enabled: false,
                    },
                    xAxis: {
                        categories: ['2WSM-Auto', 'Core Pressing', 'SMD Pick-n-Place']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'No. of components'
                        }
                    },
                    legend: {
                        reversed: false,
                        padding: 0
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        },
                        series: {
                            stacking: null,
                        }
                    },
                    series: [{
                        name: 'Actual',
                        data: [23, 18, 32],
                        color: '#EF5350'
                    }, {
                        name: 'Plan',
                        data: [145, 150, 136],
                        color: '#8BC34A'
                    }]
                }
            },
            {
                'timeframe': 1,
                'production': 2,
                'chartOptions': {
                    chart: {
                        renderTo: 'container2',
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        plotShadow: false,
                        type: 'bar'
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: 'Total vs Not OK'
                    },
                    xAxis: {
                        categories: ['2WSM-Auto', 'Core Pressing', 'SMD Pick-n-Place']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'No. of components'
                        }
                    },
                    legend: {
                        reversed: false,
                        padding: 0,
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        },
                        series: {
                            stacking: null,
                        }
                    },
                    series: [{
                        name: 'Total',
                        data: [13, 8, 12],
                        color: '#8BC34A'
                    }, {
                        name: 'NG',
                        data: [9, 6, 17],
                        color: '#EF5350'
                    }]
                }
            },
            {
                'timeframe': 2,
                'production': 2,
                'chartOptions': {
                    chart: {
                        renderTo: 'container2',
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        plotShadow: false,
                        type: 'bar'
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: 'Total vs Not OK'
                    },
                    xAxis: {
                        categories: ['2WSM-Auto', 'Core Pressing', 'SMD Pick-n-Place']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'No. of components'
                        }
                    },
                    legend: {
                        reversed: false,
                        padding: 0,
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        },
                        series: {
                            stacking: null,
                        }
                    },
                    series: [{
                        name: 'Total',
                        data: [23, 8, 36],
                        color: '#8BC34A'
                    }, {
                        name: 'NG',
                        data: [13, 6, 21],
                        color: '#EF5350'
                    }]
                }
            },
            {
                'timeframe': 3,
                'production': 2,
                'chartOptions': {
                    chart: {
                        renderTo: 'container2',
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        plotShadow: false,
                        type: 'bar'
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: 'Total vs Not OK'
                    },
                    xAxis: {
                        categories: ['2WSM-Auto', 'Core Pressing', 'SMD Pick-n-Place']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'No. of components'
                        }
                    },
                    legend: {
                        reversed: false,
                        padding: 0,
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        },
                        series: {
                            stacking: null,
                        }
                    },
                    series: [{
                        name: 'Total',
                        data: [43, 18, 62],
                        color: '#8BC34A'
                    }, {
                        name: 'NG',
                        data: [21, 16, 37],
                        color: '#EF5350'
                    }]
                }
            },
            {
                'timeframe': 4,
                'production': 2,
                'chartOptions': {
                    chart: {
                        renderTo: 'container2',
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        plotShadow: false,
                        type: 'bar'
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: 'Total vs Not OK'
                    },
                    xAxis: {
                        categories: ['2WSM-Auto', 'Core Pressing', 'SMD Pick-n-Place']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'No. of components'
                        }
                    },
                    legend: {
                        reversed: false,
                        padding: 0,
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        },
                        series: {
                            stacking: null,
                        }
                    },
                    series: [{
                        name: 'Total',
                        data: [23, 8, 32],
                        color: '#8BC34A'
                    }, {
                        name: 'NG',
                        data: [11, 6, 17],
                        color: '#EF5350'
                    }]
                }
            }
        ];

        $scope.block3 = [
            {
                'timeframe': 1,
                'ftr': 1,
                'chartOptions': {
                    chart: {
                        renderTo: 'container3',
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        plotShadow: false,
                        type: 'bar'
                    },
                    title: {
                        text: 'Lowest FTR Machines'
                    },
                    credits: {
                        enabled: false,
                    },
                    xAxis: {
                        categories: ['2WSM-Auto', 'Core Pressing', 'SMD Pick-n-Place']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'FTR In Percentage'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        },
                        series: {
                            stacking: null,
                        }
                    },
                    series: [{
                        name: 'FTR in %',
                        data: [43, 28, 32],
                        color: '#EF5350'
                    }]
                }
            },
            {
                'timeframe': 2,
                'ftr': 1,
                'chartOptions': {
                    chart: {
                        renderTo: 'container3',
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        plotShadow: false,
                        type: 'bar'
                    },
                    title: {
                        text: 'Lowest FTR Machines'
                    },
                    credits: {
                        enabled: false,
                    },
                    xAxis: {
                        categories: ['2WSM-Auto', 'Core Pressing', 'SMD Pick-n-Place']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'FTR In Percentage'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        },
                        series: {
                            stacking: null,
                        }
                    },
                    series: [{
                        name: 'FTR in %',
                        data: [143, 208, 302],
                        color: '#EF5350'
                    }]
                }
            },
            {
                'timeframe': 3,
                'ftr': 1,
                'chartOptions': {
                    chart: {
                        renderTo: 'container3',
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        plotShadow: false,
                        type: 'bar'
                    },
                    title: {
                        text: 'Lowest FTR Machines'
                    },
                    credits: {
                        enabled: false,
                    },
                    xAxis: {
                        categories: ['2WSM-Auto', 'Core Pressing', 'SMD Pick-n-Place']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'FTR In Percentage'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        }
                        ,
                        series: {
                            stacking: null,
                        }
                    },
                    series: [{
                        name: 'FTR in %',
                        data: [4.3, 5.8, 9.3],
                        color: '#EF5350'
                    }]
                }
            },
            {
                'timeframe': 4,
                'ftr': 1,
                'chartOptions': {
                    chart: {
                        renderTo: 'container3',
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        plotShadow: false,
                        type: 'bar'
                    },
                    title: {
                        text: 'Lowest FTR Machines'
                    },
                    credits: {
                        enabled: false,
                    },
                    xAxis: {
                        categories: ['2WSM-Auto', 'Core Pressing', 'SMD Pick-n-Place']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'FTR In Percentage'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        },
                        series: {
                            stacking: null,
                        }
                    },
                    series: [{
                        name: 'FTR in %',
                        data: [23, 18, 32],
                        color: '#EF5350'
                    }]
                }
            },
            {
                'timeframe': 1,
                'ftr': 2,
                'chartOptions': {
                    chart: {
                        renderTo: 'container3',
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        plotShadow: false,
                        type: 'bar'
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: 'Lowest FTR Machines'
                    },
                    xAxis: {
                        categories: ['2WSM-Auto', 'Core Pressing', 'SMD Pick-n-Place']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'FTR In PPM'
                        }
                    },
                    legend: {
                        enabled: false,
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        },
                        series: {
                            stacking: null,
                        }
                    },
                    series: [{
                        name: 'FTR in PPM',
                        data: [13, 8, 12],
                        color: '#EF5350'
                    }]
                }
            },
            {
                'timeframe': 2,
                'ftr': 2,
                'chartOptions': {
                    chart: {
                        renderTo: 'container3',
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        plotShadow: false,
                        type: 'bar'
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: 'Lowest FTR Machines'
                    },
                    xAxis: {
                        categories: ['2WSM-Auto', 'Core Pressing', 'SMD Pick-n-Place']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'FTR In PPM'
                        }
                    },
                    legend: {
                        enabled: false,
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        },
                        series: {
                            stacking: null,
                        }
                    },
                    series: [{
                        name: 'FTR in PPM',
                        data: [23, 8, 36],
                        color: '#EF5350'
                    }]
                }
            },
            {
                'timeframe': 3,
                'ftr': 2,
                'chartOptions': {
                    chart: {
                        renderTo: 'container3',
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        plotShadow: false,
                        type: 'bar'
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: 'Lowest FTR Machines'
                    },
                    xAxis: {
                        categories: ['2WSM-Auto', 'Core Pressing', 'SMD Pick-n-Place']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'FTR In PPM'
                        }
                    },
                    legend: {
                        enabled: false,
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        },
                        series: {
                            stacking: null,
                        }
                    },
                    series: [{
                        name: 'FTR in PPM',
                        data: [43, 18, 62],
                        color: '#EF5350'
                    }]
                }
            },
            {
                'timeframe': 4,
                'ftr': 2,
                'chartOptions': {
                    chart: {
                        renderTo: 'container3',
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        plotShadow: false,
                        type: 'bar'
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: 'Lowest FTR Machines'
                    },
                    xAxis: {
                        categories: ['2WSM-Auto', 'Core Pressing', 'SMD Pick-n-Place']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'FTR In PPM'
                        }
                    },
                    legend: {
                        enabled: false,
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        },
                        series: {
                            stacking: null,
                        }
                    },
                    series: [{
                        name: 'FTR in PPM',
                        data: [23, 8, 32],
                        color: '#EF5350'
                    }]
                }
            }
        ];

        $scope.block4 = [
            {
                'timeframe': 1,
                'downtime': 1,
                'chartOptions': {
                    chart: {
                        renderTo: 'container4',
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        plotShadow: false,
                        type: 'bar'
                    },
                    title: {
                        text: 'Highest Loss Downtimes'
                    },
                    credits: {
                        enabled: false,
                    },
                    xAxis: {
                        categories: ['No Material', 'No Plan', 'Meal Breaks']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Downtime in minutes'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        },
                        series: {
                            stacking: null,
                        }
                    },
                    series: [{
                        name: 'FTR in %',
                        data: [43, 28, 32],
                        color: '#EF5350'
                    }]
                }
            },
            {
                'timeframe': 2,
                'downtime': 1,
                'chartOptions': {
                    chart: {
                        renderTo: 'container4',
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        plotShadow: false,
                        type: 'bar'
                    },
                    title: {
                        text: 'Highest Loss Downtimes'
                    },
                    credits: {
                        enabled: false,
                    },
                    xAxis: {
                        categories: ['No Material', 'No Plan', 'Meal Breaks']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Downtime in minutes'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        },
                        series: {
                            stacking: null,
                        }
                    },
                    series: [{
                        name: 'FTR in %',
                        data: [143, 208, 302],
                        color: '#EF5350'
                    }]
                }
            },
            {
                'timeframe': 3,
                'downtime': 1,
                'chartOptions': {
                    chart: {
                        renderTo: 'container4',
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        plotShadow: false,
                        type: 'bar'
                    },
                    title: {
                        text: 'Highest Loss Downtimes'
                    },
                    credits: {
                        enabled: false,
                    },
                    xAxis: {
                        categories: ['No Material', 'No Plan', 'Meal Breaks']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Downtime in hours'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        }
                        ,
                        series: {
                            stacking: null,
                        }
                    },
                    series: [{
                        name: 'FTR in %',
                        data: [4.3, 5.8, 9.3],
                        color: '#EF5350'
                    }]
                }
            },
            {
                'timeframe': 4,
                'downtime': 1,
                'chartOptions': {
                    chart: {
                        renderTo: 'container4',
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        plotShadow: false,
                        type: 'bar'
                    },
                    title: {
                        text: 'Highest Loss Downtimes'
                    },
                    credits: {
                        enabled: false,
                    },
                    xAxis: {
                        categories: ['No Material', 'No Plan', 'Meal Breaks']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Downtime in hours'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        },
                        series: {
                            stacking: null,
                        }
                    },
                    series: [{
                        name: 'FTR in %',
                        data: [23, 18, 32],
                        color: '#EF5350'
                    }]
                }
            },
            {
                'timeframe': 1,
                'downtime': 2,
                'chartOptions': {
                    chart: {
                        renderTo: 'container4',
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        plotShadow: false,
                        type: 'bar'
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: 'Most Occuring Downtimes'
                    },
                    xAxis: {
                        categories: ['Unknown', 'No Plan', 'No Material']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Number of occurences'
                        }
                    },
                    legend: {
                        padding: 0,
                        enabled: true
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        },
                        series: {
                            stacking: 'normal',
                        }
                    },
                    series: [{
                        name: '< 10 minutes',
                        data: [23, 8, 36],
                        color: '#cccc00'
                    }, {
                        name: '< 20 minutes',
                        data: [13, 6, 21],
                        color: '#cc9900'
                    }, {
                        name: '< 30 minutes',
                        data: [5, 8, 1],
                        color: '#996600'
                    }, {
                        name: '> 30 minutes',
                        data: [3, 5, 1],
                        color: '#cc3300'
                    }]
                }
            },
            {
                'timeframe': 2,
                'downtime': 2,
                'chartOptions': {
                    chart: {
                        renderTo: 'container4',
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        plotShadow: false,
                        type: 'bar'
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: 'Most Occuring Downtimes'
                    },
                    xAxis: {
                        categories: ['Unknown', 'No Plan', 'No Material']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Number of occurences'
                        }
                    },
                    legend: {
                        padding: 0,
                        enabled: true
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        },
                        series: {
                            stacking: 'normal',
                        }
                    },
                    series: [{
                        name: '< 10 minutes',
                        data: [23, 8, 36],
                        color: '#cccc00'
                    }, {
                        name: '< 20 minutes',
                        data: [13, 6, 21],
                        color: '#cc9900'
                    }, {
                        name: '< 30 minutes',
                        data: [5, 8, 1],
                        color: '#996600'
                    }, {
                        name: '> 30 minutes',
                        data: [3, 5, 1],
                        color: '#cc3300'
                    }]
                }
            },
            {
                'timeframe': 3,
                'downtime': 2,
                'chartOptions': {
                    chart: {
                        renderTo: 'container4',
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        plotShadow: false,
                        type: 'bar'
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: 'Most Occuring Downtimes'
                    },
                    xAxis: {
                        categories: ['Unknown', 'No Plan', 'No Material']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Number of occurences'
                        }
                    },
                    legend: {
                        padding: 0,
                        enabled: true
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        },
                        series: {
                            stacking: 'normal',
                        }
                    },
                    series: [{
                        name: '< 10 minutes',
                        data: [23, 8, 36],
                        color: '#cccc00'
                    }, {
                        name: '< 20 minutes',
                        data: [13, 6, 21],
                        color: '#cc9900'
                    }, {
                        name: '< 30 minutes',
                        data: [5, 8, 1],
                        color: '#996600'
                    }, {
                        name: '> 30 minutes',
                        data: [3, 5, 1],
                        color: '#cc3300'
                    }]
                }
            },
            {
                'timeframe': 4,
                'downtime': 2,
                'chartOptions': {
                    chart: {
                        renderTo: 'container4',
                        plotBackgroundColor: null,
                        plotBorderWidth: 1,
                        plotShadow: false,
                        type: 'bar'
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: 'Most Occuring Downtimes'
                    },
                    xAxis: {
                        categories: ['Unknown', 'No Plan', 'No Material']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Number of occurences'
                        }
                    },
                    legend: {
                        padding: 0,
                        enabled: true
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        },
                        series: {
                            stacking: 'normal',
                        }
                    },
                    series: [{
                        name: '< 10 minutes',
                        data: [23, 8, 36],
                        color: '#cccc00'
                    }, {
                        name: '< 20 minutes',
                        data: [13, 6, 21],
                        color: '#cc9900'
                    }, {
                        name: '< 30 minutes',
                        data: [5, 8, 1],
                        color: '#996600'
                    }, {
                        name: '> 30 minutes',
                        data: [3, 5, 1],
                        color: '#cc3300'
                    }]
                }
            }
        ];

        $scope.timeframeChangeHandler = function () {
            // destroy chart 1, chart 2, chart 3, chart 4
            $scope.destroyChart1();
            $scope.destroyChart2();
            $scope.destroyChart3();
            $scope.destroyChart4();
            // create chart 1, chart 2, chart 3, chart 4
            $scope.redrawChart1();
            $scope.redrawChart2();
            $scope.redrawChart3();
            $scope.redrawChart4();
        };

        $scope.availabilityChangeHandler = function () {
            // destroy chart 1,
            $scope.destroyChart1();
            // create chart 1
            $scope.redrawChart1();
        };

        $scope.productionChangeHandler = function () {
            // destroy chart 1,
            $scope.destroyChart2();
            // create chart 1
            $scope.redrawChart2();
        };

        $scope.ftrChangeHandler = function () {
            // destroy chart 1,
            $scope.destroyChart3();
            // create chart 1
            $scope.redrawChart3();
        };

        $scope.downtimeChangeHandler = function () {
            // destroy chart 1,
            $scope.destroyChart4();
            // create chart 1
            $scope.redrawChart4();
        };

        $scope.machines = [
            {
                'id': 1,
                'name': '2WSM-Auto',
                'checked': true,
                'disabled': false,
            },
            {
                'id': 2,
                'name': 'Core Pressing',
                'checked': true,
                'disabled': false,
            },
            {
                'id': 3,
                'name': 'SMD Pick-n-Place',
                'checked': false,
                'disabled': true,
            },{
                'id': 4,
                'name': 'SM-250A',
                'checked': false,
                'disabled': true,
            },
        ];

        $scope.plants = [
            {
                'id': 2,
                'name': 'VEL-III',
                'machines': [1,2,3]
            },
            {
                'id': 3,
                'name': 'VEL-VI',
                'machines': [4],
            },
        ];

        $scope.stat_settings = {
            timeframe: $scope.timeframeItems[0].id,
            availability: $scope.availItems[0].id,
            production: $scope.prodItems[0].id,
            ftr: $scope.ftrItems[0].id,
            downtime: $scope.dtItems[0].id,
        };

        $scope.destroyChart1 = function () {
            while ($scope.chart1.series.length > 0 ) {
                $scope.chart1.series[0].remove(true);
            };
            $scope.chart1.chartBackground.attr({ fill : '#EEEEEE'});
            $scope.chart1.setTitle({ style: {'color': '#EEEEEE'} });
            $scope.chart1.yAxis[0].axisTitle.attr({ text: ''})
            $scope.chart1.showLoading();
        };

        $scope.destroyChart2 = function () {
            while ($scope.chart2.series.length > 0 ) {
                $scope.chart2.series[0].remove(true);
            };
            $scope.chart2.chartBackground.attr({ fill : '#EEEEEE'});
            $scope.chart2.setTitle({ style: {'color': '#EEEEEE'} });
            $scope.chart2.yAxis[0].axisTitle.attr({ text: ''})
            $scope.chart2.showLoading();
        };

        $scope.destroyChart3 = function () {
            while ($scope.chart3.series.length > 0 ) {
                $scope.chart3.series[0].remove(true);
            };
            $scope.chart3.chartBackground.attr({ fill : '#EEEEEE'});
            $scope.chart3.setTitle({ style: {'color': '#EEEEEE'} });
            $scope.chart3.yAxis[0].axisTitle.attr({ text: ''})
            $scope.chart3.showLoading();
        };

        $scope.destroyChart4 = function () {
            while ($scope.chart4.series.length > 0 ) {
                $scope.chart4.series[0].remove(true);
            };
            $scope.chart4.chartBackground.attr({ fill : '#EEEEEE'});
            $scope.chart4.setTitle({ style: {'color': '#EEEEEE'} });
            $scope.chart4.yAxis[0].axisTitle.attr({ text: ''})
            $scope.chart4.showLoading();
        };

        $scope.redrawChart1 = function () {
            return $timeout(function () {
                var aa = $filter('filter')($scope.block1, {timeframe: $scope.stat_settings.timeframe});
                var bb = $filter('filter')(aa, {availability: $scope.stat_settings.availability})[0];
                angular.forEach(bb.chartOptions.series, function (value, key) {
                    console.log(value);
                    $scope.chart1.addSeries(value);
                });
                $scope.chart1.setTitle({ text: bb.chartOptions.title.text});
                $scope.chart1.yAxis[0].axisTitle.attr({ text: bb.chartOptions.yAxis.title.text})
                console.log($scope.chart1);
                $scope.chart1.update({plotOptions: bb.chartOptions.plotOptions});
                $scope.chart1.hideLoading();
                $scope.chart1.setTitle({ style: {'color': 'black'} });
                $scope.chart1.chartBackground.attr({ fill : 'white'});
            }, 2000);
        };

        $scope.redrawChart2 = function () {
            return $timeout(function () {
                var aa = $filter('filter')($scope.block2, {timeframe: $scope.stat_settings.timeframe});
                var bb = $filter('filter')(aa, {production: $scope.stat_settings.production})[0];
                angular.forEach(bb.chartOptions.series, function (value, key) {
                    console.log(value);
                    $scope.chart2.addSeries(value);
                });
                $scope.chart2.setTitle({ text: bb.chartOptions.title.text});
                $scope.chart2.yAxis[0].axisTitle.attr({ text: bb.chartOptions.yAxis.title.text})
                console.log($scope.chart2);
                $scope.chart2.update({plotOptions: bb.chartOptions.plotOptions});
                $scope.chart2.hideLoading();
                $scope.chart2.setTitle({ style: {'color': 'black'} });
                $scope.chart2.chartBackground.attr({ fill : 'white'});
            }, 2000);
        };

        $scope.redrawChart3 = function () {
            return $timeout(function () {
                var aa = $filter('filter')($scope.block3, {timeframe: $scope.stat_settings.timeframe});
                var bb = $filter('filter')(aa, {ftr: $scope.stat_settings.ftr})[0];
                angular.forEach(bb.chartOptions.series, function (value, key) {
                    console.log(value);
                    $scope.chart3.addSeries(value);
                });
                $scope.chart3.setTitle({ text: bb.chartOptions.title.text});
                $scope.chart3.yAxis[0].axisTitle.attr({ text: bb.chartOptions.yAxis.title.text})
                console.log($scope.chart3);
                $scope.chart3.update({plotOptions: bb.chartOptions.plotOptions});
                $scope.chart3.hideLoading();
                $scope.chart3.setTitle({ style: {'color': 'black'} });
                $scope.chart3.chartBackground.attr({ fill : 'white'});
            }, 2000);
        };

        $scope.redrawChart4 = function () {
            return $timeout(function () {
                var aa = $filter('filter')($scope.block4, {timeframe: $scope.stat_settings.timeframe});
                var bb = $filter('filter')(aa, {downtime: $scope.stat_settings.downtime})[0];
                angular.forEach(bb.chartOptions.series, function (value, key) {
                    console.log(value);
                    $scope.chart4.addSeries(value);
                });
                $scope.chart4.setTitle({ text: bb.chartOptions.title.text});
                $scope.chart4.xAxis[0].update({categories: bb.chartOptions.xAxis.categories}, true);
                $scope.chart4.yAxis[0].axisTitle.attr({ text: bb.chartOptions.yAxis.title.text});
                console.log($scope.chart4);
                $scope.chart4.update({
                    plotOptions: bb.chartOptions.plotOptions,
                    legend: bb.chartOptions.legend
                });
                $scope.chart4.hideLoading();
                $scope.chart4.setTitle({ style: {'color': 'black'} });
                $scope.chart4.chartBackground.attr({ fill : 'white'});
            }, 2000);
        };

        $scope.renderChart1 = function () {
            var aa = $filter('filter')($scope.block1, {timeframe: $scope.stat_settings.timeframe});
            var bb = $filter('filter')(aa, {availability: $scope.stat_settings.availability})[0];
            $timeout(function() {
                $scope.chart1 = new Highcharts.Chart(bb.chartOptions);
                console.log($scope.chart1);
            }, 500);
        };

        $scope.renderChart2 = function () {
            var aa = $filter('filter')($scope.block2, {timeframe: $scope.stat_settings.timeframe});
            var bb = $filter('filter')(aa, {production: $scope.stat_settings.production})[0];
            $timeout(function() {
                $scope.chart2 = new Highcharts.Chart(bb.chartOptions);
                console.log($scope.chart2);
            }, 500);
        };

        $scope.renderChart3 = function () {
            var aa = $filter('filter')($scope.block3, {timeframe: $scope.stat_settings.timeframe});
            var bb = $filter('filter')(aa, {ftr: $scope.stat_settings.ftr})[0];
            $timeout(function() {
                $scope.chart3 = new Highcharts.Chart(bb.chartOptions);
                console.log($scope.chart4);
            }, 500);
        };

        $scope.renderChart4 = function () {
            var aa = $filter('filter')($scope.block4, {timeframe: $scope.stat_settings.timeframe});
            var bb = $filter('filter')(aa, {downtime: $scope.stat_settings.downtime})[0];
            $timeout(function() {
                $scope.chart4 = new Highcharts.Chart(bb.chartOptions);
                console.log($scope.chart4);
            }, 500);
        };

        $scope.renderAllCharts = function () {
            $scope.renderChart1();
            $scope.renderChart2();
            $scope.renderChart3();
            $scope.renderChart4();
        };

        $scope.renderAllCharts();

        $scope.favmachines = [
        {'id': 1, 'site': 'Pulsar K-11', 'plant': 'Running Part', 'machineName': '2WSM-Auto', 'currentOEE': 370, 'previousOEE': 38, 'status': 'on', 'lastAlive': 0},
        {'id': 2, 'site': 'Pulsar K-11', 'plant': 'Running Part', 'machineName': 'Core Pressing', 'currentOEE': 473, 'previousOEE': 22, 'status': 'on', 'lastAlive': 0},
        ]

        $scope.goToMachine = function (machineId) {
            console.log(machineId);
        	$location.path('/machine/'+machineId);
        };

        // $scope.favoriteMachines = 
        
    }]);



