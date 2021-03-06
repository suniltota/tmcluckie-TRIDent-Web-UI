'use strict';

postLoginApp.service('cdJsonService', function(apiService){
	this.getJsonFromXml = function(xmlData){
    	return apiService.request({
    		apiMethod: "actualize/transformx/trident/cd/v1/ucdtojson",
            httpMethod: 'POST',
            xmlData:xmlData
        });
    },
    this.getXMLFromTextTemplate = function(xmlData){
    	return apiService.request({
    		apiMethod: "actualize/transformx/transforms/v1/templatetoucd",
            httpMethod: 'POST',
            xmlData:xmlData
        });
    },
    this.generateJsonFromTemplate = function(data) {
        return apiService.request({
            apiMethod: "actualize/transformx/v1/templatetocdjson",
            httpMethod: 'POST',
            formData:data
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
    },
    this.getLeXMLFromTextTemplate = function(xmlData){
        return apiService.request({
            apiMethod: "actualize/transformx/transforms/v1/templatetoucd",
            httpMethod: 'POST',
            xmlData:xmlData
        });
    },
    this.generateJsonFromTemplate = function(data) {
        return apiService.request({
            apiMethod: "actualize/transformx/v1/templatetolejson",
            httpMethod: 'POST',
            formData:data
        });
    }

});