app.service('cdService', function(apiService){
	this.getProducts = function(){
    	return apiService.request({
            apiMethod: "data/ProductData.json",
            httpMethod: 'GET',
            localData:true
        });
    },
    this.loadTransformData = function(xmlData){
    	return apiService.request({
            apiMethod: "services/trident/closingdisclosure/v1/convertXmlToJson",
            httpMethod: 'POST',
            xmlData:xmlData
        });
    },
    this.genearateXmlFromJson = function(data){
        return apiService.request({
            apiMethod: "services/trident/closingdisclosure/v1/convertJsonToXml",
            httpMethod: 'POST',
            formData:data
        });
    },
    this.genearateUCDXml = function(data){
        return apiService.request({
            apiMethod: "services/trident/closingdisclosure/v1/ucdxml",
            httpMethod: 'POST',
            formData:data
        });
    },
    this.transformText2XML = function(textData) {
        return apiService.request({
            apiMethod: "services/actualize/textToXml",
            httpMethod: 'POST',
            formData:textData
        });
    },
    this.generatePDF = function(xml) {
        return apiService.request({
            apiMethod: "services/trident/closingdisclosure/v1/generatePDF",
            httpMethod: 'POST',
            formData:xml
        });
    }
});