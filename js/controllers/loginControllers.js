'use strict';

loginApp.controller('loginCtrl', ['$scope', 'apiService', 'loginService',
    function ($scope, apiService, loginService) {
    	
		$scope.waitingForLoginResponse=false;            
		var loginSpinnerContainer = angular.element( document.querySelector("#loginSpinner"));
		loginSpinnerContainer.append('<div class="ion-loading-c" style="font-size:20pt" data-pack="default" data-animation="true"></div>');
		localStorage.clear();
		sessionStorage.clear();
		$scope.submitted=false;
		$scope.loginFailure=false;
		$scope.errorMsg=""; 
		//$scope.purposes = [{"displayName":"Purchase","value":"Purchase"},{"displayName":"Refinance","value":"Refinance"},{"displayName":"HomeEquity","value":"HomeEquity"}];;

		$scope.selectedApiServer = "http://localhost:8080/actualize/";
		$scope.$watch('selectedApiServer', function(newValue, oldValue){
			apiService.setBasePath(newValue);
			localStorage.apiBasePath=newValue;
		});

		$scope.onLoginSubmit = function(){
			
			$scope.waitingForLoginResponse=true;
			var username, pwd;
			if($scope.user){
			  pwd = $scope.user.pw;
			  username = $scope.user.username;
			}

			if(typeof pwd == 'undefined' || pwd == '' || typeof username == 'undefined' || username == '') {
				//if either username or pw fields are emtpy, short-circuit login process
			  $scope.submitted=true;
			  $scope.waitingForLoginResponse=false;

			  return;
			} else {
				$scope.submitted=false;
			}
			pwd = pwd.replace("%","%25");
			pwd = pwd.replace("&","%26");
			//login submission logic here
			var params={username:username, password:pwd};
			apiService.request({apiMethod:'services/user/login',params:params,httpMethod:'POST'}).success(function(data, status) {
				$scope.waitingForLoginResponse=false;
				$scope.loginFailure=false;
				localStorage.userDetails = JSON.stringify(data);
				//localStorage.purpose = $scope.purpose.value;
                loginService.setSessionId();  
				location.href = "postLogin.html";
			}).
			error(function(data, status) {
				$scope.waitingForLoginResponse=false;
				if(null == data && "-1" == status)
					$scope.errorMsg = "Unable to connect to server. Please try again later.";
				else if(null != data)
					$scope.errorMsg = data.message;
				else
					$scope.errorMsg = "There was an error processing the request. Please try again later.";
				$scope.loginFailure=true;
			});
		};
	}
])