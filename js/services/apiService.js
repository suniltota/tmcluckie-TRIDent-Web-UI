'use strict'; 

var httpServiceModule = angular.module('httpServiceModule', []);

httpServiceModule.factory('apiService', ['$http', '$q', function($http, $q) {
	var basePath="";
	var _httpMethod="POST";
	var caching=false;
	var latestRequest={};
	$http.defaults.withCredentials = true;
	//$http.defaults.headers.post = { 'Access-Control-Allow-Credentials' : 'true' }
	//TODO: <IE10 will require specific XDomainRequest headers for CORS requests

	return{

		/**
		function request: sends a request to actulize's api

		bundle object params:

		apiMethod: the api method to call (should be e)
		params: an object representing the key/value pairs that will be passed along with call
		httpMethod: does the call use "GET" or "POST"? Should be set to one of two

		Returns an object from which promises can be attached
		**/
		request: function(bundle){
			if(typeof bundle.apiMethod == "undefined"){
				throw "apiService.request requires an apiMethod parameter in its params object";
				return -1;
			}

			if(typeof bundle.transformResponse == "undefined"){
				bundle.transformResponse=function(data, headersGetter){
					if(typeof data == 'string') {
						try{
							return	JSON.parse(data);
						}
						catch(e){
							return data;
						}
					}
					else
						return data;
				};
			}			

			if(typeof bundle.httpMethod == "undefined")
				bundle.httpMethod=_httpMethod;

			var dataStr="";
			var contentType = "application/x-www-form-urlencoded";
			var firstIteration=true;
			//assemble params into data string format
			if(typeof bundle.params != "undefined"){
				for (var key in bundle.params) {
					if (bundle.params.hasOwnProperty(key)) {
						if(firstIteration)
							firstIteration=false;
						else
							dataStr+="&";

						//accepts an array and assigns all values to key
						if(Object.prototype.toString.call( bundle.params[key] ) === '[object Array]'){
							for(var i=0;i<bundle.params[key].length;i++){
								if(i>0)
									dataStr+="&";	
								dataStr+= key+"="+escape(bundle.params[key][i]);
							}
						}else if(Object.prototype.toString.call( bundle.params[key] ) === '[object Object]'){	
							dataStr+= key+"="+JSON.stringify(bundle.params[key]);
						}
						else{
							dataStr+= key+"="+escape(bundle.params[key]);
						}
					}
				}
			}
			if(typeof bundle.formData != "undefined"){
				dataStr = bundle.formData;
				contentType = "application/json";
			}
			if(typeof bundle.xmlData != "undefined"){
				dataStr = bundle.xmlData;
				contentType = "application/xml";
			}
			if(typeof bundle.fileData != "undefined"){
				dataStr = bundle.fileData;
				contentType = undefined;
			}
			if(bundle.httpMethod=='GET'){
				if(dataStr!=undefined && dataStr!="") {
					bundle.apiMethod = bundle.apiMethod + "?" + dataStr;
				}
			}

			var canceller = $q.defer();
			var combinedPath=basePath+bundle.apiMethod;
			latestRequest[combinedPath.split('?')[0]]=basePath+bundle.apiMethod/*+dataStr*/;
			if(typeof bundle.localData != "undefined"){
				return $http({
					method: bundle.httpMethod,
					url:bundle.apiMethod,
					transformResponse:bundle.transformResponse
				}).success(function (response) {
					$("#spinner").hide();
        		}).error(function(data, status, headers, config) {});
			}
			if(typeof bundle.fileData != "undefined"){
				return $http({
					cache: caching,
					method: bundle.httpMethod,
					headers:{"Content-Type":contentType},
					url:basePath+bundle.apiMethod, 
					data:dataStr,
					transformRequest: angular.identity,
					transformResponse:bundle.transformResponse,
					timeout: canceller.promise
				}).success(function(data, status, headers, config) {
					$("#pageSpinner").hide();
					//check to see if request has been redirected to login page, suggesting user has been logged out
					if(typeof data==='string' && data.substr(0,44)==='<html><head><title>Login Page</title></head>'){
    					window.location.href="/login" + window.location.search;
					}

					var req;
					if(config.data !== ""){
						var requestArr=config.url.split(config.data);
						req=requestArr[0].split("?")[0];
					}
					else{
						req=config.url;
					}
				    if(latestRequest[req]!==config.url){
				    	//cancel promise 
				    	return $q.reject({ message: 'Rejecting this promise' });
				    }
				    
  				}).error(function(data, status, headers, config) {
  					$("#pageSpinner").hide();
		  			if(status===401){ //user has been logged out server-side. redirect to login pg
		  				window.location.href="/login" + window.location.search;
		  			}
					// called asynchronously if an error occurs
				    // or server returns response with an error status.
				});
			} else {
				  if(bundle.httpMethod=='DELETE' && typeof bundle.params != "undefined") {
					  return $http({
							cache: caching,
							method: bundle.httpMethod,
							headers:{"Content-Type":contentType},
							url:basePath+bundle.apiMethod, 
							params:bundle.params,					
							transformResponse:bundle.transformResponse,
							timeout: canceller.promise
						}).success(function(data, status, headers, config) {
							$("#pageSpinner").hide();
							//check to see if request has been redirected to login page, suggesting user has been logged out
							if(typeof data==='string' && data.substr(0,44)==='<html><head><title>Login Page</title></head>'){
            					window.location.href="/login" + window.location.search;
							}

							var req;
							if(config.data !== ""){
								var requestArr=config.url.split(config.data);
								req=requestArr[0].split("?")[0];
							}
							else{
								req=config.url;
							}
						    if(latestRequest[req]!==config.url){
						    	//cancel promise 
						    	return $q.reject({ message: 'Rejecting this promise' });
						    }
		  				}).error(function(data, status, headers, config) {
		  					$("#pageSpinner").hide();
		  					if(status===401){ //user has been logged out server-side. redirect to login pg
		  						window.location.href="/login" + window.location.search;
		  					}
							// called asynchronously if an error occurs
						    // or server returns response with an error status.
						});
				  } else {
					  return $http({
							cache: caching,
							method: bundle.httpMethod,
							headers:{"Content-Type":contentType},
							url:basePath+bundle.apiMethod, 
							data:dataStr,					
							transformResponse:bundle.transformResponse,
							timeout: canceller.promise
						}).success(function(data, status, headers, config) {
							$("#pageSpinner").hide();
							//check to see if request has been redirected to login page, suggesting user has been logged out
							if(typeof data==='string' && data.substr(0,44)==='<html><head><title>Login Page</title></head>'){
            					window.location.href="/login" + window.location.search;
							}
							
							var req;
							if(config.data !== ""){
								var requestArr=config.url.split(config.data);
								req=requestArr[0].split("?")[0];
							}
							else{
								req=config.url;
							}
						    if(latestRequest[req]!==config.url){
						    	//cancel promise 
						    	return $q.reject({ message: 'Rejecting this promise' });
						    }
						    
		  				}).error(function(data, status, headers, config) {
		  					$("#pageSpinner").hide();
		  					if(status===401){ //user has been logged out server-side. redirect to login pg
		  						//window.location.href="/login" + window.location.search;
		  					}
							// called asynchronously if an error occurs
						    // or server returns response with an error status.
						});
				  }
				
			}
			//TODO: attach default error handlers
		},
		getBasePath: function(){
			return basePath;
		},
		setBasePath: function(bp){
			basePath=bp;
		},
		getHttpMethod: function(){
			return _httpMethod;
		},
		setHttpMethod: function(mthd){
			_httpMethod=mthd;
		}
	}
}]);