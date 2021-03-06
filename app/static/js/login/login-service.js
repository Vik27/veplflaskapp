angular.module('fractalApp').factory('AuthService',
  ['$q', '$timeout', '$http', '$rootScope',
  function ($q, $timeout, $http, $rootScope) {

    // create user variable
    var user = null;
    $rootScope.loggedInUser = null;

    return ({
      isLoggedIn: isLoggedIn,
      logout: logout,
      getUser: getUser,
      getStatus: getStatus,
      // checkUser:checkUser,
    });



  function logout() {

    var deferred = $q.defer();

    $http.get('/noviga/logout')
    .then(function(data){
      if (data.result) {
        // console.log(data.result);
        user = false;
        deferred.resolve();
      }
    },
    function(){
      user = false;
      deferred.reject();
    });

    return deferred.promise;
  };

  function getStatus() {

   var deferred = $q.defer();

   $http.get('/noviga/getStatus')
   .then(function (data) {
    if (data.status) {
      user = true;
      // console.log('world')
      deferred.resolve();
    } else {
      user = false;
      // console.log('round')
      deferred.resolve();
    }
   },
   function (data) {
    user = false;
    deferred.reject();
   })

   return deferred.promise;
  };


  function getUser() {

    var deferred = $q.defer();
    $http.get('/noviga/getUser')
    .then(
      function (response) {
        if(response !== 'null') {
          user = true;
          deferred.resolve(response);
        } else {
          user = false;
          deferred.resolve(response);
        }
      },
      function (errResponse) {
        // console.error('Error while fetching current user');
        deferred.reject(errResponse);
      }
    );
    return deferred.promise;
  };


  function isLoggedIn() {

    if (user) {
      // console.log('what')
      return true;
    } else {
      // console.log('where')
      return false;
    }
  };

}]);
