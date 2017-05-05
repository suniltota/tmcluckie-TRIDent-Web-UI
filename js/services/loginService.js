'use strict';

var loginService = angular.module('app.loginServices', []);

loginService.factory('loginService', [function($resource){
	var isLoggedIn, userName;

    return {
    	isUserLoggedIn:function(){
    		if (isLoggedIn)
    			return true;
    		else
    			return false;
    	},
    	setSessionId:function(){
    		//get session id from localstorage
    		isLoggedIn=localStorage.userDetails != undefined ? true : false;
    	},
	    setUserName:function(){
		    userName=JSON.parse(localStorage.userDetails).userName;
	    },
	    getUserName:function(){
		    return userName;
	    },
    	logout:function(){
    		localStorage.removeItem('userDetails');
            localStorage.clear();
    		isLoggedIn=null;
    	}
    }
}]);