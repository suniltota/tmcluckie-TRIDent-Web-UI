'use strict';

var postLoginApp = angular.module('postLoginApp', [
	'httpServiceModule', 'app.loginServices'
]).

run(['loginService', 'apiService', '$rootScope', '$window', function(loginService, apiService, $rootScope, $window){
    apiService.setBasePath(localStorage.apiBasePath);
    apiService.request({apiMethod:'isLoggedIn',httpMethod:'GET'}).success(function(data, status) {
      loginService.setSessionId();
      var res= loginService.isUserLoggedIn();
      if(!res) {
        window.location.href="login.html" + $window.location.search;
      } else {
        // Set $rootScope.userName.
        loginService.setUserName();
      }
    });
}]);

postLoginApp.directive('fileModel', ['$parse', function ($parse) {
    return {
       restrict: 'A',
       link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;
          
          element.bind('change', function(){
             scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
             });
          });
       }
    };
}]);