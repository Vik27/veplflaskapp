// Declare app level module which depends on filters, and services
angular.module('loginPageApp', []);

angular.module('loginPageApp').factory('loginpage',
  ['$q', '$timeout', '$http', '$rootScope',
  function ($q, $timeout, $http, $rootScope) {

    // create user variable
    var user = null;
    $rootScope.loggedInUser = null;

    return ({
      login: login,
    });


    function login(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();
      // send a post request to the server
      $http.post('/noviga/loginpage', {username: username, password: password})
      // handle success
      .then(function (data) {
        console.log(data);
        // console.log(status);
        if(data.status === 200 && data.data.result){
          user = true;
          deferred.resolve(data);
        } else {
          user = false;
          deferred.reject();
        }
      },
      // handle error
      function (data) {
        user = false;
        deferred.reject();
      });
      // return promise object
      return deferred.promise;
    };
}]);


angular.module('loginPageApp')
    .controller('loginCtrl', ['$scope', 'loginpage', '$http', '$window',
      function ($scope, loginpage, $http, $window) {

      $scope.error = false;
      $scope.errorMessage = null;

      $scope.loginForm = {
        'username': '',
        'password': '',
      };

      $scope.login = function () {
        // initial values
        // $scope.error = false;
        $scope.disabled = true;
        loginpage.login($scope.loginForm.username, $scope.loginForm.password)
        .then(function (data) {
          console.log('successful login and redirected to the main fractal app');
          $window.location.href = '/';
        })
        .catch(function (error) {
          $scope.error = true;
          console.log('error');
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });
      };

}]);


