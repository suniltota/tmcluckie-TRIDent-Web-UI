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
            apiMethod: "services/actualize/ucdxml",
            httpMethod: 'POST',
            xmlData:xmlData
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
            apiMethod: "services/actualize/generatePDF",
            httpMethod: 'POST',
            formData:xml
        });
    }
});