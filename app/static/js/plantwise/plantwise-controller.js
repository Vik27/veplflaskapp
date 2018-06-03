'use strict';

angular.module('fractalApp')
	.controller('plantwiseController', ['$filter', '$rootScope', '$scope', '$location', '$timeout',
	'$mdDialog', 'resolvedAjaxItems', 'machinepager',
		function ($filter, $rootScope, $scope, $location, $timeout,
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

    	$rootScope.expLevel = 'California';

        // var tree;

        // var rawTreeData = [
        //     {
        //         "DemographicId": 10,
        //         "ParentId": null,
        //         "Name": "United States of America",
        //         "Description": "United States of America",
        //         "Area": 9826675,
        //         "Population": 918212000,
        //         "TimeZone": "UTC -5 to -10"
        //     },
        //     {
        //         "DemographicId": 2,
        //         "ParentId": 10,
        //         "Name": "California",
        //         "Description": "The Tech State",
        //         "Area": 423970,
        //         "Population": 38340000,
        //         "TimeZone": "Pacific Time"
        //     },
        //     {
        //         "DemographicId": 3,
        //         "ParentId": 2,
        //         "Name": "San Francisco",
        //         "Description": "The happening city",
        //         "Area": 231,
        //         "Population": 837442,
        //         "TimeZone": "PST"
        //     },
        //     {
        //         "DemographicId": 4,
        //         "ParentId": 2,
        //         "Name": "Los Angeles",
        //         "Description": "Disco city",
        //         "Area": 503,
        //         "Population": 3904657,
        //         "TimeZone": "PST"
        //     },
        //     {
        //         "DemographicId": 5,
        //         "ParentId": 1,
        //         "Name": "Illinois",
        //         "Description": "Not so cool",
        //         "Area": 57914,
        //         "Population": 12882135,
        //         "TimeZone": "Central Time Zone"
        //     },
        //     {
        //         "DemographicId": 6,
        //         "ParentId": 5,
        //         "Name": "Chicago",
        //         "Description": "Financial City",
        //         "Area": 234,
        //         "Population": 2695598,
        //         "TimeZone": "CST"
        //     },
        //     {
        //         "DemographicId": 7,
        //         "ParentId": 10,
        //         "Name": "Texas",
        //         "Description": "Rances, Oil & Gas",
        //         "Area": 268581,
        //         "Population": 26448193,
        //         "TimeZone": "Mountain"
        //     },
        //     {
        //         "DemographicId": 8,
        //         "ParentId": 10,
        //         "Name": "New York",
        //         "Description": "The largest diverse city",
        //         "Area": 141300,
        //         "Population": 19651127,
        //         "TimeZone": "Eastern Time Zone"
        //     },
        //     {
        //         "DemographicId": 14,
        //         "ParentId": 8,
        //         "Name": "Manhattan",
        //         "Description": "Time Square is the place",
        //         "Area": 269.403,
        //         "Population": 0,
        //         "TimeZone": "EST"
        //     },
        //     {
        //         "DemographicId": 15,
        //         "ParentId": 14,
        //         "Name": "Manhattan City",
        //         "Description": "Manhattan island",
        //         "Area": 33.77,
        //         "Population": 0,
        //         "TimeZone": "EST"
        //     },
        //     {
        //         "DemographicId": 16,
        //         "ParentId": 14,
        //         "Name": "Time Square",
        //         "Description": "Time Square for new year",
        //         "Area": 269.40,
        //         "Population": 0,
        //         "TimeZone": "EST"
        //     },
        //     {
        //         "DemographicId": 17,
        //         "ParentId": 8,
        //         "Name": "Niagra water fall",
        //         "Description": "Close to Canada",
        //         "Area": 65.7,
        //         "Population": 0,
        //         "TimeZone": "EST"
        //     },
        //     {
        //         "DemographicId": 18,
        //         "ParentId": 8,
        //         "Name": "Long Island",
        //         "Description": "Harbour to Atlantic",
        //         "Area": 362.9,
        //         "Population": 0,
        //         "TimeZone": "EST"
        //     },
        //     {
        //         "DemographicId": 51,
        //         "ParentId": 1,
        //         "Name": "All_Other",
        //         "Description": "All_Other demographics",
        //         "Area": 0,
        //         "Population": 0,
        //         "TimeZone": 0
        //     },
        //     {
        //         "DemographicId": 201,
        //         "ParentId": null,
        //         "Name": "India",
        //         "Description": "Hydrabad tech city",
        //         "Area": 5566.9,
        //         "Population": 718212000,
        //         "TimeZone": "IST"
        //     },
        //     {
        //         "DemographicId": 301,
        //         "ParentId": null,
        //         "Name": "Bangladesh",
        //         "Description": "Country of love",
        //         "Area": 5566.78,
        //         "Population": 718212004,
        //         "TimeZone": "BST"
        //     }
        // ];

        // var myTreeData = getTree(rawTreeData, 'DemographicId', 'ParentId');

        // $scope.tree_data = myTreeData;
        // console.log($scope.tree_data);
        // $scope.my_tree = tree = {};
        $scope.my_tree = {};
        $scope.expanding_property = {
            field: "Name",
            color: "Colr",
            href: "Link",
            displayName: "Demographic Name",
            sortable: true,
            filterable: true,
            cellTemplate: "<span style='padding-left: 5px;'><i>{{row.branch[expandingProperty.field]}}</i></span>"
        };
        // $scope.col_defs = [
        //     {
        //         field: "Description",
        //         sortable: true,
        //         sortingType: "string"
        //     },
        //     {
        //         field: "Area",
        //         sortable: true,
        //         sortingType: "number",
        //         filterable: true
        //     },
        //     {
        //         field: "Population",
        //         sortable: true,
        //         sortingType: "number"
        //     },
        //     {
        //         field: "TimeZone",
        //         displayName: "Time Zone",
        //         cellTemplate: "<strong>{{row.branch[col.field]}}</strong>"
        //     }
        // ];
        $scope.my_tree_handler = function (branch) {
            console.log('you clicked on', branch)
        }

        // function getTree(data, primaryIdName, parentIdName) {
        //     if (!data || data.length == 0 || !primaryIdName || !parentIdName)
        //         return [];

        //     var tree = [],
        //         rootIds = [],
        //         item = data[0],
        //         primaryKey = item[primaryIdName],
        //         treeObjs = {},
        //         parentId,
        //         parent,
        //         len = data.length,
        //         i = 0;

        //     while (i < len) {
        //         item = data[i++];
        //         primaryKey = item[primaryIdName];
        //         treeObjs[primaryKey] = item;
        //         parentId = item[parentIdName];

        //         if (parentId) {
        //             parent = treeObjs[parentId];

        //             if (parent.children) {
        //                 parent.children.push(item);
        //             } else {
        //                 parent.children = [item];
        //             }
        //         } else {
        //             rootIds.push(primaryKey);
        //         }
        //     }

        //     for (var i = 0; i < rootIds.length; i++) {
        //         tree.push(treeObjs[rootIds[i]]);
        //     }
        //     ;

        //     return tree;
        // }

        $scope.tree_data = [
			{
				Name:"USA",
				Colr:"red",
				Link:false,
				Area:9826675,
				Population:318212000,
				TimeZone:"UTC -5 to -10",
				children:[
					{
						Name:"California",
						Colr:"blue",
						Link:false,
						Area:423970,
						Population:38340000,
						TimeZone:"Pacific Time",
						children:[
							{
								Name:"San Francisco",
								Colr:"yellow",
								Link:true,
								Area:231,
								Population:837442,
								TimeZone:"PST"
							},
							{
								Name:"Los Angeles",
								Colr:"green",
								Link:true,
								Area:503,
								Population:3904657,
								TimeZone:"PST"
							}
						]
					},
					{
						Name:"Illinois",
						Colr:"default",
						Link:false,
						Area:57914,
						Population:12882135,
						TimeZone:"Central Time Zone",
						children:[
							{
								Name:"Chicago",
								Colr:"default",
								Link:true,
								Area:234,
								Population:2695598,
								TimeZone:"CST"
							}
						]
					}
				]
			},	
			{
				Name:"Texas",
				Colr:"default",
				Link:false,
				Area:268581,
				Population:26448193,
				TimeZone:"Mountain"
			}
		];

		$scope.col_defs = [
			{
				field: "TimeZone",
				displayName: "Time Zone",
				sortable : true,
				filterable : true
			},
			{
				field: "Area",
				sortable : true,
				sortingType : "number",
				filterable : true
			},
			{
				field: "Population",
				sortable : true,
				sortingType : "number",

			}
		];


}]);