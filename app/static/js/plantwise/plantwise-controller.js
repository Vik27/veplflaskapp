'use strict';

angular.module('fractalApp')
	.controller('plantwiseController', ['$filter', '$rootScope', '$scope', '$location', '$timeout',
        '$mdBottomSheet', 'resolvedAjaxItems', 'machinepager',
		function ($filter, $rootScope, $scope, $location, $timeout,
        $mdBottomSheet, resolvedAjaxItems, machinepager) {

		if (window.outerWidth < 600) {
			$scope.screensize = 'mobile';
        	$scope.hght = window.outerHeight + 'px';
        	$scope.wdth = '300px';
        } else {
        	$scope.screensize = 'notMobile';
        	$scope.hght = window.innerHeight + 'px';
        	$scope.wdth = '500px';
        };

    	// $rootScope.expLevel = 'Core Pressing';

        $scope.my_tree = {};
        $scope.expanding_property = {
            field: "Name",
            color: "Colr",
            href: "Link",
            displayName: "Name",
            sortable: true,
            filterable: true,
            cellTemplate: "<span style='padding-left: 5px;'><i>{{row.branch[expandingProperty.field]}}</i></span>"
        };
        
        $scope.my_tree_handler = function (branch) {
            console.log('you clicked on', branch);
	    $location.path(branch.Link);
        };

        var aa = {
            Name: '',
            Colr: [],
            Efficiency: [],
            Availability: [],
            Quality: [],
            Performance: []
        }

        $scope.get_tree_data = function (timeframe) {
            if (timeframe.name === 'Live') {
                $scope.tree_data = [
                    {
                        Name:"VEL-III",
                        Colr:"#ff9900",
                        Link:false,
                        Efficiency:62,
                        Availability:78,
                        Quality:92,
                        Performance:87,
                        children:[
                            {
                                Name:"Electrical",
                                Colr:"#ff9900",
                                Link:false,
                                Efficiency:55,
                                Availability:77,
                                Quality:89,
                                Performance:81,
                                children:[
                                    {
                                        Name:"2WSM-Auto",
                                        Colr:"green",
                                        Link:'/machine/1',
                                        Efficiency:85,
                                        Availability:95,
                                        Quality:90,
                                        Performance:98,
                                    },
                                    {
                                        Name:"Core Pressing",
                                        Colr:"#ff9900",
                                        Link:'/machine/2',
                                        Efficiency:44,
                                        Availability:89,
                                        Quality:87,
                                        Performance:57,
                                    }
                                ]
                            },
                            {
                                Name:"Electronics",
                                Colr:"default",
                                Link:false,
                                Efficiency:70,
                                Availability:79,
                                Quality:94,
                                Performance:95,
                                children:[
                                    {
                                        Name:"SMD Pick-n-Place",
                                        Colr:"green",
                                        Link:true,
                                        Efficiency:70,
                                        Availability:79,
                                        Quality:94,
                                        Performance:95,
                                    }
                                ]
                            }
                        ]
                    },  
                    {
                        Name:"VEL-VI",
                        Colr:"red",
                        Link:false,
                        Efficiency:14,
                        Availability:16,
                        Quality:100,
                        Performance:86,
                        children:[
                            {
                                Name:"Moulding",
                                Colr:"red",
                                Link:false,
                                Efficiency:14,
                                Availability:16,
                                Quality:100,
                                Performance:86,
                                children:[
                                    {
                                        Name:"SM-250A",
                                        Colr:"red",
                                        Link:false,
                                        Efficiency:14,
                                        Availability:16,
                                        Quality:100,
                                        Performance:86,
                                    }
                                ]
                            }
                        ]
                    }
                ];
            } else if (timeframe.name === 'Previous Shift') {
                $scope.tree_data = [
                    {
                        Name:"VEL-III",
                        Colr:"default",
                        Link:false,
                        Efficiency:75,
                        Availability:84,
                        Quality:93,
                        Performance:95,
                        children:[
                            {
                                Name:"Electrical",
                                Colr:"default",
                                Link:false,
                                Efficiency:77,
                                Availability:86,
                                Quality:94,
                                Performance:95,
                                children:[
                                    {
                                        Name:"2WSM-Auto",
                                        Colr:"green",
                                        Link:true,
                                        Efficiency:76,
                                        Availability:83,
                                        Quality:94,
                                        Performance:98,
                                    },
                                    {
                                        Name:"Core Pressing",
                                        Colr:"green",
                                        Link:true,
                                        Efficiency:77,
                                        Availability:89,
                                        Quality:94,
                                        Performance:92,
                                    }
                                ]
                            },
                            {
                                Name:"Electronics",
                                Colr:"default",
                                Link:false,
                                Efficiency:72,
                                Availability:83,
                                Quality:91,
                                Performance:96,
                                children:[
                                    {
                                        Name:"SMD Pick-n-Place",
                                        Colr:"green",
                                        Link:true,
                                        Efficiency:72,
                                        Availability:83,
                                        Quality:91,
                                        Performance:96,
                                    }
                                ]
                            }
                        ]
                    },  
                    {
                        Name:"VEL-VI",
                        Colr:"red",
                        Link:false,
                        Efficiency:15,
                        Availability:19,
                        Quality:90,
                        Performance:86,
                        children:[
                            {
                                Name:"Moulding",
                                Colr:"red",
                                Link:false,
                                Efficiency:15,
                                Availability:19,
                                Quality:90,
                                Performance:86,
                                children:[
                                    {
                                        Name:"SM-250A",
                                        Colr:"red",
                                        Link:false,
                                        Efficiency:15,
                                        Availability:19,
                                        Quality:90,
                                        Performance:86,
                                    }
                                ]
                            }
                        ]
                    }
                ];
            } else if (timeframe.name === 'Yesterday') {
                $scope.tree_data = [
                    {
                        Name:"VEL-III",
                        Colr:"default",
                        Link:false,
                        Efficiency:62,
                        Availability:78,
                        Quality:92,
                        Performance:87,
                        children:[
                            {
                                Name:"Electrical",
                                Colr:"default",
                                Link:false,
                                Efficiency:55,
                                Availability:77,
                                Quality:89,
                                Performance:81,
                                children:[
                                    {
                                        Name:"2WSM-Auto",
                                        Colr:"green",
                                        Link:true,
                                        Efficiency:46,
                                        Availability:68,
                                        Quality:87,
                                        Performance:78,
                                    },
                                    {
                                        Name:"Core Pressing",
                                        Colr:"green",
                                        Link:true,
                                        Efficiency:67,
                                        Availability:87,
                                        Quality:92,
                                        Performance:84,
                                    }
                                ]
                            },
                            {
                                Name:"Electronics",
                                Colr:"default",
                                Link:false,
                                Efficiency:70,
                                Availability:79,
                                Quality:94,
                                Performance:95,
                                children:[
                                    {
                                        Name:"SMD Pick-n-Place",
                                        Colr:"green",
                                        Link:true,
                                        Efficiency:70,
                                        Availability:79,
                                        Quality:94,
                                        Performance:95,
                                    }
                                ]
                            }
                        ]
                    },  
                    {
                        Name:"VEL-VI",
                        Colr:"default",
                        Link:false,
                        Efficiency:72,
                        Availability:78,
                        Quality:100,
                        Performance:92,
                        children:[
                            {
                                Name:"Moulding",
                                Colr:"default",
                                Link:false,
                                Efficiency:72,
                                Availability:78,
                                Quality:100,
                                Performance:92,
                                children:[
                                    {
                                        Name:"SM-250A",
                                        Colr:"green",
                                        Link:false,
                                        Efficiency:72,
                                        Availability:78,
                                        Quality:100,
                                        Performance:92,
                                    }
                                ]
                            }
                        ]
                    }
                ];
            } else {
                $scope.tree_data = [
                    {
                        Name:"VEL-III",
                        Colr:"red",
                        Link:false,
                        Efficiency:62,
                        Availability:72,
                        Quality:91,
                        Performance:96,
                        children:[
                            {
                                Name:"Electrical",
                                Colr:"red",
                                Link:false,
                                Efficiency:56,
                                Availability:65,
                                Quality:88,
                                Performance:97,
                                children:[
                                    {
                                        Name:"2WSM-Auto",
                                        Colr:"red",
                                        Link:true,
                                        Efficiency:39,
                                        Availability:48,
                                        Quality:84,
                                        Performance:98,
                                    },
                                    {
                                        Name:"Core Pressing",
                                        Colr:"green",
                                        Link:true,
                                        Efficiency:74,
                                        Availability:83,
                                        Quality:92,
                                        Performance:97,
                                    }
                                ]
                            },
                            {
                                Name:"Electronics",
                                Colr:"default",
                                Link:false,
                                Efficiency:70,
                                Availability:79,
                                Quality:94,
                                Performance:95,
                                children:[
                                    {
                                        Name:"SMD Pick-n-Place",
                                        Colr:"green",
                                        Link:true,
                                        Efficiency:70,
                                        Availability:79,
                                        Quality:94,
                                        Performance:95,
                                    }
                                ]
                            }
                        ]
                    },  
                    {
                        Name:"VEL-VI",
                        Colr:"red",
                        Link:false,
                        Efficiency:23,
                        Availability:29,
                        Quality:100,
                        Performance:79,
                        children:[
                            {
                                Name:"Moulding",
                                Colr:"red",
                                Link:false,
                                Efficiency:23,
                                Availability:29,
                                Quality:100,
                                Performance:79,
                                children:[
                                    {
                                        Name:"SM-250A",
                                        Colr:"red",
                                        Link:false,
                                        Efficiency:23,
                                        Availability:29,
                                        Quality:100,
                                        Performance:79,
                                    }
                                ]
                            }
                        ]
                    }
                ];
            };
            setTimeout(function() {
                $scope.$apply($scope.my_tree.expand_all);
            }, 100);
        };

		$scope.col_defs = [
			{
				field: "Efficiency",
				sortable : true,
				sortingType : "number"
			},
			{
				field: "Availability",
				sortable : true,
				sortingType : "number",
			},
			{
				field: "Quality",
				sortable : true,
				sortingType : "number",

			},
            {
                field: "Performance",
                sortable: true,
                sortingType: "number"
            }
		];


        $scope.timeframeItems = [
            { name: 'Live', icon: 'share' , checked: true},
            { name: 'Previous Shift', icon: 'upload' , checked: false},
            { name: 'Yesterday', icon: 'copy' , checked: false},
            { name: 'Last Week', icon: 'print' , checked: false},
        ];
        $scope.selectedTimeframe = $scope.timeframeItems[0];
        $scope.get_tree_data($scope.selectedTimeframe);

        $scope.alert = '';
        $scope.showListBottomSheet = function() {
            $scope.alert = '';
            $mdBottomSheet.show({
                templateUrl: 'bottom-sheet-list-template.html',
                controller: 'ListBottomSheetCtrl',
                resolve: {
                    items: function () {
                        return $scope.timeframeItems
                    }
                }
            }).then(function(clickedItemIndex) {
                // $scope.alert = clickedItem['name'] + ' clicked!';
                angular.forEach($scope.timeframeItems, function (value, key) {
                    if (key === clickedItemIndex) {
                        value.checked = true;
                        $scope.selectedTimeframe = $scope.timeframeItems[clickedItemIndex];
                    } else {
                        value.checked = false;
                    };
                });
                $scope.get_tree_data($scope.selectedTimeframe);
            }, function() {
                $scope.alert = 'bottom-sheet-dismissed';
            });
        };


}]);


angular.module('fractalApp')
    .controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet, items) {
        
        $scope.items = items;
        
        $scope.handleTimeframeChange = function ($index) {
            $mdBottomSheet.hide($index);
        };
});

