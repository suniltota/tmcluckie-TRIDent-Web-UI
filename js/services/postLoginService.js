'use strict';

postLoginApp.service('cdJsonService', function(apiService){
	this.getJsonFromXml = function(xmlData){
    	return apiService.request({
    		apiMethod: "actualize/transformx/trident/cd/v1/ucdtojson",
            httpMethod: 'POST',
            xmlData:xmlData
        });
    }
    this.getXMLFromTextTemplate = function(xmlData){
    	return apiService.request({
    		apiMethod: "actualize/transformx/transforms/v1/templatetoucd",
            httpMethod: 'POST',
            xmlData:xmlData
        });
    }

});
/// for LE
postLoginApp.service('leJsonService', function(apiService){
    this.getLeJsonFromXml = function(xmlData){
        return apiService.request({
            apiMethod: "actualize/transformx/trident/le/v1/letojson",
            httpMethod: 'POST',
            xmlData:xmlData
        });
    }
    this.getLeXMLFromTextTemplate = function(xmlData){
        return apiService.request({
            apiMethod: "actualize/transformx/transforms/v1/templatetoucd",
            httpMethod: 'POST',
            xmlData:xmlData
        });
    }

});