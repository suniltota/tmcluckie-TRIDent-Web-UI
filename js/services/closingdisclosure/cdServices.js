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
            apiMethod: "actualize/transformx/trident/cd/v1/ucdtojson",
            httpMethod: 'POST',
            xmlData:xmlData
        });
    },
    this.genearateXmlFromJson = function(data){
        return apiService.request({
            apiMethod: "actualize/transformx/trident/cd/v1/jsontoucd",
            httpMethod: 'POST',
            formData:data
        });
    },
    this.genearateUCDXml = function(data){
        return apiService.request({
            apiMethod: "actualize/transformx/services/ucd/v1/trim",
            httpMethod: 'POST',
            formData:data
        });
    },
    this.calculatePayments = function(data){
        return apiService.request({
            apiMethod: "actualize/transformx/services/ucd/calculatepayments",
            httpMethod: 'POST',
            formData:data
        });
    },
    this.transformText2XML = function(textData) {
        return apiService.request({
            apiMethod: "actualize/transformx/transforms/v1/templatetoucd",
            httpMethod: 'POST',
            formData:textData
        });
    },
    this.generatePDF = function(xml) {
        return apiService.request({
            apiMethod: "actualize/transformx/documents/ucd/cd/v1/pdf",
            httpMethod: 'POST',
            formData:xml
        });
    }
});