'use strict';

postLoginApp.controller('postLoginCtrl', function ($scope, $window, loginService, apiService, $log) {
    	$scope.transactionType = {
    		name : 'new'
    	};

    	$scope.purposeType = {
    		name : 'purchase'
    	};

    	$scope.documentType = {
    		name : 'closingdisclosure'
    	};

    	$scope.formType = {
    		name : 'standard'
    	};


    	$('#SelectTransaction').modal('show');

    	$scope.logUserOut = function() {
			loginService.logout();
        	$window.location.href="login.html" + $window.location.search;
    	}

    	$scope.clear = function() {
    		$scope.purposeType = {
	    		name : 'purchase'
	    	};

	    	$scope.documentType = {
	    		name : 'closingdisclosure'
	    	};

	    	$scope.formType = {
	    		name : 'standard'
	    	};
    	}

    	$scope.submit = function() {
    		location.href = "index.html#/home?documentType="+$scope.documentType.name+"&purposeType="+$scope.purposeType.name+"&formType="+$scope.formType.name;
    	}

});