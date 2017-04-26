'use strict';

postLoginApp.service('cdXML2JsonService', function(apiService){
	this.getJsonFromXml = function(xmlData){
    	return apiService.request({
    		apiMethod: "services/trident/closingdisclosure/v1/convertXmlToJson",
            httpMethod: 'POST',
            xmlData:xmlData
        });
    }
});