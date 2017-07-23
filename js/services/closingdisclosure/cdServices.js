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
    this.genearateXmlFromJson = function(data, embeddedPDF){
        if(data != undefined)
            data.embeddedPDF = embeddedPDF;
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
    this.validateUCDXml = function(data){
        return apiService.request({
            apiMethod: "actualize/transformx/services/ucd/cd/validate",
            httpMethod: 'POST',
            formData:data
        });
    },
    this.calculatePayments = function(data){
        return apiService.request({
            apiMethod: "actualize/transformx/services/ucd/calculatepayments/",
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
    },
    this.generateJsonFromTemplate = function(data) {
        return apiService.request({
            apiMethod: "actualize/transformx/v1/templatetocdjson",
            httpMethod: 'POST',
            formData:data
        });
    },
    this.generatePDFFromJson = function(data) {
        return apiService.request({
            apiMethod: "actualize/transformx/v1/cdjsontopdf",
            httpMethod: 'POST',
            formData:data
        });
    },
    this.genearateUCDXmlFromJson = function(data, embeddedPDF) {
        if(data != undefined)
            data.embeddedPDF = embeddedPDF;
        return apiService.request({
            apiMethod: "actualize/transformx/v1/cdjsontrim",
            httpMethod: 'POST',
            formData:data
        });
    },
    this.validateUCDXmlFromJson = function(data, embeddedPDF) {
        if(data != undefined)
            data.embeddedPDF = embeddedPDF;
        return apiService.request({
            apiMethod: "actualize/transformx/v1/validatecdjson",
            httpMethod: 'POST',
            formData:data
        });
    },
    this.calculatePaymentsFromJson = function(data) {
        return apiService.request({
            apiMethod: "actualize/transformx/v1/calculatecdjson",
            httpMethod: 'POST',
            formData:data
        });
    }
});