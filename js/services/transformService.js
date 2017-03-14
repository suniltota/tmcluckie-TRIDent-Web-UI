app.service('transformService', function(apiService){
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
            apiMethod: "services/actualize/saveUCD",
            httpMethod: 'POST',
            formData:data
        });
    }
});