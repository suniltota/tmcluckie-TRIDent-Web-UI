app.service('leService', function(apiService){
	this.getProducts = function(){
    	return apiService.request({
            apiMethod: "data/ProductData.json",
            httpMethod: 'GET',
            localData:true
        });
    },
    this.loadTransformData = function(xmlData){
    	return apiService.request({
            apiMethod: "actualize/transformx/trident/le/v1/letojson",
            httpMethod: 'POST',
            xmlData:xmlData
        });
    },
    this.calculatePayments = function(data){
        return apiService.request({
            apiMethod: "actualize/transformx/services/ucd/calculatepayments/",
            httpMethod: 'POST',
            formData:data
        });
    },
    this.saveUCD = function(data){
        return apiService.request({
            apiMethod: "services/actualize/saveUCDXML",
            httpMethod: 'POST',
            formData:[data]
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
            apiMethod: "/actualize/transformx/documents/ucd/le/v1/pdf",
            httpMethod: 'POST',
            formData:xml
        });
    },
    this.genearateXmlFromJson = function(data, embeddedPDF){
        if(data != undefined)
            data.embeddedPDF = embeddedPDF;
        return apiService.request({
            apiMethod: "actualize/transformx/trident/le/v1/jsontole",
            httpMethod: 'POST',
            formData:data
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