'use strict';

angular.module('noviga')
  .controller('UserController', ['$scope', '$modal', 'User', 'resolvedAjaxItems', '$timeout', '$filter',
    function ($scope, $modal, User, resolvedAjaxItems, $timeout, $filter) {

      console.log(resolvedAjaxItems.users);
      console.log(resolvedAjaxItems.businesses);
      $scope.error = false;
      $scope.allusers = resolvedAjaxItems.users;
      $scope.businesses = resolvedAjaxItems.businesses;
      $scope.activebinessname = 'All';

      $scope.users = $scope.allusers;
      $scope.setActiveBiness = function(business) {
        if (business === 'all') {
          $scope.activebinessname = 'All';
          $scope.users = $scope.allusers;
        } else {
          $scope.activebinessname = business.name;
          $scope.activebinessid = business.id
          $scope.users = $filter('filter')($scope.allusers, {businessId: business.id});
        }
      };

      $scope.create = function () {
        $scope.error=false;
        $scope.clear();
        $scope.open();
      };

      $scope.update = function (id) {
        $scope.error =false;
        var usr = {};
        angular.forEach($filter('filter')($scope.allusers, {id: id})[0], function(value,key) {
          usr[key] = value;
        });
        $scope.user = usr;
        console.log($scope.user);
        $scope.open(id);
      };

      $scope.delete = function (id) {
        User.delete({id: id},
          function () {
            var ar = $scope.allusers.map(function(e) {return e.id}).indexOf(id);
            $scope.allusers.splice(ar,1);
            if ($scope.activebinessname !== 'All') {
              $scope.users = $filter('filter')($scope.allusers, {businessId: $scope.activebinessid});
            } else {
              $scope.users = $scope.allusers;
            }
          });
      };

      $scope.save = function (id) {
        if (id) {
          User.update({id: id}, $scope.user, function (data) {
            console.log(data);
            var usr = {};
            angular.forEach(data, function(value,key) {
              if(key !== '$promise' && key !== '$resolved') {
                usr[key] = value;
              };
            });
            var ar = $scope.allusers.map(function(e) {return e.id}).indexOf(id);
            $scope.allusers[ar] = usr;

            if ($scope.activebinessname !== 'All') {
              $scope.users = $filter('filter')($scope.allusers, {businessId: $scope.activebinessid});
            } else {
              $scope.users = $scope.allusers;
            }
            
            $scope.clear();
          },
          function (response) {
            console.log(response.data.message);
            $scope.error = true;
            $scope.errorMessage = response.data.message;
            $timeout(function () {
              $scope.error = false;
            },3000);
          });
        } else {
          User.save($scope.user, function (data) {
            console.log(data);
            var usr = {};
            angular.forEach(data, function(value,key) {
              if(key !== '$promise' && key !== '$resolved') {
                usr[key] = value;
              };
            });
            $scope.allusers[$scope.allusers.length] = usr;

            if ($scope.activebinessname !== 'All') {
              $scope.users = $filter('filter')($scope.allusers, {businessId: $scope.activebinessid});
            } else {
              $scope.users = $scope.allusers;
            }

            $scope.clear();
          },
          function (response) {
            console.log(response.data.message);
            $scope.error = true;
            $scope.errorMessage = response.data.message;
            $timeout(function () {
              $scope.error = false;
            },3000);
          });
        }
      };

      $scope.clear = function () {
        $scope.user = {
          
          "username": "",
          
          "password": "",
          
          "contact_email": "",

          "role": "",
          
          "id": "",

          "businessId": "",
        };
      };

      $scope.open = function (id) {
        var userSave = $modal.open({
          templateUrl: 'user-save.html',
          controller: 'UserSaveController',
          size: 'sm',
          windowClass: 'my-modal-popup',
          resolve: {
            user: function () {
              return $scope.user;
            },
            businesses: function() {
              return $scope.businesses;
            }
          }
        });

        userSave.result.then(function (entity) {
          $scope.user = entity;
          $scope.save(id);
        });
      };
    }])
  .controller('UserSaveController', ['$scope', '$modalInstance', 'user', 'businesses',
    function ($scope, $modalInstance, user, businesses) {
      $scope.user = user;
      $scope.businesses = businesses;
      

      $scope.ok = function () {
        $modalInstance.close($scope.user);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);




angular.module('noviga')
  .controller('UserMgrController', ['$rootScope', '$scope', '$modal', 'binessUser', 'resolvedAjaxItems', '$timeout', '$filter', '$location', 'AuthService',
    function ($rootScope, $scope, $modal, binessUser, resolvedAjaxItems, $timeout, $filter, $location, AuthService) {

      console.log(resolvedAjaxItems.users);
      $scope.allusers = resolvedAjaxItems.users;

      $scope.binessSelect = false;
      if ($rootScope.loggedInUser.role === 'Admin') {
        $scope.binessSelect = true;
        $scope.binessuser = true;
        $scope.activebusiness = {'name': 'None', 'id': ""};
        $scope.users = [];
        $scope.businesses = resolvedAjaxItems.businesses;
      } else {
        $scope.users = $scope.allusers;
        $scope.activebusiness = resolvedAjaxItems.businesses;
        if ($scope.allusers.length < ($scope.activebusiness.allowedUsrUsers + $scope.activebusiness.allowedMgrUsers)) {
          $scope.limitReached = true;
        } else {
          $scope.limitReached = false;
        };
      };

      $scope.changeusers = function (business) {
        if (business !=="none") {
          $scope.binessuser = false;
          $scope.activebusiness = business;
          $scope.users = $filter('filter')($scope.allusers, {businessId: business.id});
          if ($scope.users.length < ($scope.activebusiness.allowedUsrUsers + $scope.activebusiness.allowedMgrUsers)) {
            $scope.limitReached = true;
          } else {
            $scope.limitReached = false;
          }
        } else {
          $scope.users = [];
          $scope.activebusiness = {'name': 'None', 'id': null};
          $scope.binessuser = true;
        }
      };

      $scope.create = function () {
        $scope.error=false;
        $scope.clear();
        if ($scope.activebusiness.allowedMgrUsers > $filter('filter')($scope.users, {role: 'Manager'}).length) {
          $scope.mgroptdisabled = false;
        } else {
          $scope.mgroptdisabled = true;
        };
        if ($scope.activebusiness.allowedUsrUsers > $filter('filter')($scope.users, {role: 'User'}).length) {
          $scope.usroptdisabled = false;
        } else {
          $scope.usroptdisabled = true;
        };
        $scope.open();
      };

      $scope.update = function (id) {
        $scope.error =false;
        var usr = {};
        angular.forEach($filter('filter')($scope.users, {id: id})[0], function(value,key) {
          usr[key] = value;
        });
        $scope.user = usr;
        console.log($scope.user);
        var curMgr = $filter('filter')($scope.users, {role: 'Manager'}).length;
        var curUsr = $filter('filter')($scope.users, {role: 'User'}).length;
        var allwdMgr = $scope.activebusiness.allowedMgrUsers;
        var allwdUsr = $scope.activebusiness.allowedUsrUsers;
        if (curMgr < allwdMgr) {
          $scope.mgroptdisabled = false;
        } else {
          if ($scope.user.role === 'Manager') {
            $scope.mgroptdisabled = false;
          } else {
            $scope.mgroptdisabled = true;
          };
        };
        if (curUsr < allwdUsr) {
          $scope.usroptdisabled = false;
        } else {
          if ($scope.user.role === 'User') {
            $scope.usroptdisabled = false;
          } else {
            $scope.usroptdisabled = true;
          }
        }
        $scope.open(id);
      };

      $scope.delete = function (id) {
        binessUser.delete({businessId: $scope.activebusiness.id, id: id},
          function () {
            if ($rootScope.loggedInUser.role === 'Admin') {
              var ar = $scope.allusers.map(function(e) {return e.id}).indexOf(id);
              $scope.allusers.splice(ar,1);
              $scope.users = $filter('filter')($scope.allusers, {businessId: $scope.activebusiness.id});
              if ($scope.users.length < ($scope.activebusiness.allowedUsrUsers + $scope.activebusiness.allowedMgrUsers)) {
                $scope.limitReached = true;
              } else {
                $scope.limitReached = false;
              };
            } else {
              if ($rootScope.loggedInUser.id === id) {
                $location.path('/');
              } else {
                var ar = $scope.users.map(function(e) {return e.id}).indexOf(id);
                $scope.users.splice(ar,1);
                if ($scope.users.length < ($scope.activebusiness.allowedUsrUsers + $scope.activebusiness.allowedMgrUsers)) {
                  $scope.limitReached = true;
                } else {
                  $scope.limitReached = false;
                };
              };
            }
        });
      };

      $scope.save = function (id) {
        if (id) {
          binessUser.update({businessId: $scope.activebusiness.id, id: id}, $scope.user, function (data) {
            console.log(data);
            var usr = {};
            angular.forEach(data, function(value,key) {
              if(key !== '$promise' && key !== '$resolved') {
                usr[key] = value;
              };
            });
            if ($rootScope.loggedInUser.role === 'Admin') {
              var ar = $scope.allusers.map(function(e) {return e.id}).indexOf(id);
              $scope.allusers[ar] = usr;
              $scope.users = $filter('filter')($scope.allusers, {businessId: $scope.activebusiness.id});
            } else {
              var ar = $scope.users.map(function(e) {return e.id}).indexOf(id);
              $scope.users[ar] = usr;
            }
            $scope.clear();
          });
        } else {
          binessUser.save({businessId: $scope.activebusiness.id}, $scope.user, function (data) {
            console.log(data);
            var usr = {};
            angular.forEach(data, function(value,key) {
              if(key !== '$promise' && key !== '$resolved') {
                usr[key] = value;
              };
            });
            if ($rootScope.loggedInUser.role === 'Admin') {
              $scope.allusers[$scope.allusers.length] = usr;
              $scope.users = $filter('filter')($scope.allusers, {businessId: $scope.activebusiness.id});
              if ($scope.users.length < ($scope.activebusiness.allowedUsrUsers + $scope.activebusiness.allowedMgrUsers)) {
                $scope.limitReached = true;
              } else {
                $scope.limitReached = false;
              }
            } else {
              $scope.users[$scope.users.length] = usr;
              if ($scope.users.length < ($scope.activebusiness.allowedUsrUsers + $scope.activebusiness.allowedMgrUsers)) {
                $scope.limitReached = true;
              } else {
                $scope.limitReached = false;
              }
            }
            $scope.clear();
          });
        };
      };

      $scope.clear = function () {
        $scope.user = {
          
          "username": "",
          
          "password": "",
          
          "contact_email": "",

          "role": ""
        };
      };

      $scope.open = function (id) {
        var userSave = $modal.open({
          templateUrl: 'user-mgr-save.html',
          controller: 'UserMgrSaveController',
          size: 'sm',
          windowClass: 'my-modal-popup',
          resolve: {
            user: function () {
              return $scope.user;
            },
            business: function() {
              return $scope.activebusiness;
            },
            usroptdisabled: function() {
              return $scope.usroptdisabled;
            },
            mgroptdisabled: function() {
              return $scope.mgroptdisabled;
            }
          }
        });

        userSave.result.then(function (entity) {
          $scope.user = entity;
          $scope.save(id);
        });
      };
    }])
  .controller('UserMgrSaveController', ['$scope', '$modalInstance', 'user', 'business', 'usroptdisabled', 'mgroptdisabled',
    function ($scope, $modalInstance, user, business, usroptdisabled, mgroptdisabled) {
      $scope.user = user;
      $scope.business = business;
      $scope.usroptdisabled = usroptdisabled;
      $scope.mgroptdisabled = mgroptdisabled;

      $scope.ok = function () {
        $modalInstance.close($scope.user);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);
