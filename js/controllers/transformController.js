/**
 * Controller for transform function
 */
app.controller('transformCtrl', function ($scope, $sce, staticData, transformService) {
	$scope.purposes = staticData.purposes;

	$scope.format = staticData.dateDisplayFormat;
	$scope.states = staticData.stateCode;
	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1
	};
	$scope.documentType= {
      "loanType": "Purchase",
      "standardView": true,
      "alternateView": false,
      "payoffsAndPayments": false,
      "refinanceTypeLoan": false,
      "homeEquityLoanIndicator": false,
      "sellerOnly": false
    }
	transformService.getProducts().success(function (result) {
        $scope.products = result;
    });
	$scope.transformData = staticData.transformData[0];
	$scope.transformData.pageOne.closingInformation.dateIssued = new Date();
	$scope.transformData.pageOne.transactionInformation.isBorrower = true;
	$scope.transformData.pageOne.transactionInformation.isLender = true;
	$scope.transformData.pageOne.transactionInformation.isSeller = true;

	$scope.transformData = staticData.transformData[0];
	$scope.transformData.pageOne.closingInformation.property.isStreeAddress = "YES";
	$scope.transformData.pageOne.closingInformation.property.isLegalDescription = "YES";
	$scope.transformData.pageOne.closingInformation.isPurchaseTransaction = "YES";
	$scope.transformData.pageOne.closingInformation.salesContractDetail = {"personalPropertyIndicator" :"NO"}
	$scope.transformData.pageOne.closingInformation.propertyValuationDetail = {"propertyValuationDetailIndicator":"YES"}
	$scope.transformData.pageOne.transactionInformation.propertyValuationDetail;
	//For added dynamic element from UI
	var borrowerAddress  = angular.copy($scope.transformData.pageOne.transactionInformation.borrower[0]);
	var sellerAddress  = angular.copy($scope.transformData.pageOne.transactionInformation.seller[0]);
	var lenderAddress = angular.copy($scope.transformData.pageOne.transactionInformation.lender[0]);

	$scope.transformData.pageOne.loanInformation.purpose = JSON.parse(localStorage["purpose"]);
	
    $scope.openUCDXMLFile = function(){
    	$("#UCDXMLFILE").click();
    }
    $scope.renderHtml = function(html_code){
    	return $sce.trustAsHtml(html_code);
    }
    $scope.updatePurpose = function(){
    	console.log($scope.transformData.pageOne.loanInformation.purpose);
    }

    var loadTransformData = function(fileData){
    	$("#spinner").show();
		transformService.loadTransformData(fileData).success(function(data){
			if(data != null && data.length>0){
				$scope.transformData = data[0];
				$scope.transformData.pageOne.closingInformation.dateIssued = new Date();
				if($scope.transformData.pageOne.transactionInformation.borrower!=null && $scope.transformData.pageOne.transactionInformation.borrower.length>0){
					var borrower ={};
					angular.forEach($scope.transformData.pageOne.transactionInformation.borrower, function(b, index){
						if(borrower[b.borrowerFullName.trim()] == undefined){
							if(index !=0 ){
								$scope.transformData.pageOne.transactionInformation.borrowerDisplayName += " & ";
							}else{
								$scope.transformData.pageOne.transactionInformation.borrowerDisplayName="";
							}
							$scope.transformData.pageOne.transactionInformation.borrowerDisplayName += b.borrowerFullName
							$scope.transformData.pageOne.transactionInformation.borrowerAddress = b.address
							borrower[b.borrowerFullName] = b.address;
						}
					});
					$scope.transformData.pageOne.transactionInformation.isBorrower = true;
				}else{
					$scope.transformData.pageOne.transactionInformation.isBorrower = false;
				}
				if($scope.transformData.pageOne.transactionInformation.lender!=null && $scope.transformData.pageOne.transactionInformation.lender.length>0){
					var lender ={};
					angular.forEach($scope.transformData.pageOne.transactionInformation.lender, function(l, index){
						if(lender[l.lenderFullName.trim()] == undefined){
							if(index !=0 ){
								$scope.transformData.pageOne.transactionInformation.lenderDisplayName += " & ";
							}else{
								$scope.transformData.pageOne.transactionInformation.lenderDisplayName="";
							}
							$scope.transformData.pageOne.transactionInformation.lenderDisplayName += l.lenderFullName
							$scope.transformData.pageOne.transactionInformation.lenderAddress = l.address
							lender[l.lenderFullName] = l.address;
						}
					});
					$scope.transformData.pageOne.transactionInformation.isLender = true;
				}else{
					$scope.transformData.pageOne.transactionInformation.isLender = false;
				}
				if($scope.transformData.pageOne.transactionInformation.seller!=null && $scope.transformData.pageOne.transactionInformation.seller.length>0){
					var seller ={};
					angular.forEach($scope.transformData.pageOne.transactionInformation.seller, function(s, index){
						if(seller[s.sellerFullName.trim()] == undefined){
							if(index !=0 ){
								$scope.transformData.pageOne.transactionInformation.sellerDisplayName += " & ";
							}else{
								$scope.transformData.pageOne.transactionInformation.sellerDisplayName = "";
							}
							$scope.transformData.pageOne.transactionInformation.sellerDisplayName += s.sellerFullName
							$scope.transformData.pageOne.transactionInformation.sellerAddress = s.address
							seller[s.sellerFullName] = s.address;
						}
					});
					$scope.transformData.pageOne.transactionInformation.isSeller = true;
				}else{
					$scope.transformData.pageOne.transactionInformation.isSeller = false;
				}
				angular.forEach($scope.purposes, function(p){
					if($scope.transformData.pageOne.loanInformation.purpose == p.value)
						$scope.transformData.pageOne.loanInformation.purpose = p;	
				});
				console.log($scope.transformData.pageOne.loanInformation.product);
				angular.forEach($scope.products, function(p){
					if($scope.transformData.pageOne.loanInformation.product == p["CFPB-compliant_name"])
						$scope.transformData.pageOne.loanInformation.product = p;	
				});
			}
			$("#spinner").hide();
		}).error( function(data, status){
    		$("#spinner").hide();
    	});
    }

    $scope.fileNameChanged = function(file){
        var reader = new FileReader();
		reader.readAsText(file.files[0], "UTF-8");
		reader.onload = function (evt) {
			var fileData = evt.target.result;
			loadTransformData(fileData);
		}
    }
    $scope.saveFile = function(){
    	$("#spinner").show();
    	transformService.saveUCD($scope.transformData).success(function(data){
    		$("#spinner").hide();
    	}).error( function(data, status){
    		$("#spinner").hide();
    	});
    }
    $scope.addBorrower = function(){
    	$scope.transformData.pageOne.transactionInformation.borrower.push(angular.copy(borrowerAddress));
    }
    $scope.addSeller = function(){
    	$scope.transformData.pageOne.transactionInformation.seller.push(angular.copy(sellerAddress));
    }
    $scope.addLender = function(){
    	$scope.transformData.pageOne.transactionInformation.lender.push(angular.copy(lenderAddress));
    }
});