'use strict';

var postLoginApp = angular.module('postLoginApp', [
	'httpServiceModule', 'app.loginServices'
]).

run(['loginService', 'apiService', '$rootScope', '$window', function(loginService, apiService, $rootScope, $window){
	loginService.setSessionId();
	var res= loginService.isUserLoggedIn();
    
    if(!res) {$window.location.href="login.html" + $window.location.search};
}]);