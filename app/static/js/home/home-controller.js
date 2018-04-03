angular.module('fractalApp')
  .controller('homeController', ['$scope', 'resolvedAjaxItems', 'AuthService', '$window', '$q',
    function ($scope, resolvedAjaxItems, AuthService, $window, $q) {
    	console.log('Y');
    	$scope.message = resolvedAjaxItems;

    	// $scope.user1 = function() {
    	// 	var us = $q.when(User.get({id:1}));
    	// 	console.log(us);
    	// 	$window.alert(us.username);
    	// };

    	// $scope.user2 = function() {
    	// 	var us = AuthService.getone();
    	// 	console.log(us);
    	// 	$window.alert(us.username);
    	// }
    }]);



// angular.module('MyApp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])

// .controller('AppCtrl', function($scope) {

// });


/**
Copyright 2016 Google Inc. All Rights Reserved. 
Use of this source code is governed by an MIT-style license that can be foundin the LICENSE file at http://material.angularjs.org/HEAD/license.
**/