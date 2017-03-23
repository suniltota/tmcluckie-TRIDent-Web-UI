/**
 * Controller for transform function
 */
app.controller('transformCtrl', function ($scope, $sce, $filter, staticData, transformService) {
	//$scope.purposes = staticData.purposes;
	var requestDFormat = "MM-dd-yyyy"
	$scope.format = staticData.dateDisplayFormat;
	$scope.states = staticData.stateCode;
	$scope.lienPriorityType = staticData.lienPriorityType;
	$scope.adjustableRate = staticData.adjustableRate;
	$scope.mortgageType = staticData.mortgageType;
	$scope.paymentFrequencyType = staticData.paymentFrequencyType;
	$scope.fileName = "Actualize_XML.xml"
	$scope._YES = "YES";
	$scope._NO = "NO";
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
	/*transformService.getProducts().success(function (result) {
        $scope.products = result;
    });*/
    var refreshData = function(){
		$scope.transformData = staticData.transformData[0];

		angular.forEach($scope.transformData.pageOne.transactionInformation.lender, function(l){
			l.type="O";
		});
		
		$scope.transformData.pageOne.closingInformation.dateIssued = new Date();
		$scope.transformData.pageOne.transactionInformation.isBorrower = true;
		$scope.transformData.pageOne.transactionInformation.isLender = true;
		$scope.transformData.pageOne.transactionInformation.isSeller = true;

		$scope.transformData = staticData.transformData[0];
		$scope.transformData.pageOne.closingInformation.property.isStreeAddress = $scope._YES;
		$scope.transformData.pageOne.closingInformation.property.isLegalDescription = $scope._YES;
		$scope.transformData.pageOne.closingInformation.isPurchaseTransaction = $scope._YES;
		$scope.transformData.pageOne.closingInformation.salesContractDetail = {"personalPropertyIndicator" :$scope._NO}
		$scope.transformData.pageOne.closingInformation.propertyValuationDetail = {"propertyValuationDetailIndicator":$scope._YES}
		$scope.transformData.pageOne.transactionInformation.propertyValuationDetail;
		//For added dynamic element from UI
		var borrowerAddress  = angular.copy($scope.transformData.pageOne.transactionInformation.borrower[0]);
		var sellerAddress  = angular.copy($scope.transformData.pageOne.transactionInformation.seller[0]);
		var lenderAddress = angular.copy($scope.transformData.pageOne.transactionInformation.lender[0]);

		$scope.transformData.pageOne.loanInformation.purpose = localStorage["purpose"];
		$scope.transformData.pageOne.loanInformation.purposeType = $scope._YES;
		$scope.transformData.pageOne.loanInformation.integratedDisclosureHomeEquityLoanIndicator =$scope.NO;
		$scope.transformData.pageOne.loanInformation.miRequiredIndicator = $scope._YES;
		$scope.transformData.pageOne.loanTerms.loanAmountIncreaseIndicator = $scope._YES;
		$scope.transformData.pageOne.loanTerms.negativeAmoritzationIndicator = $scope.transformData.pageOne.loanTerms.loanAmountIncreaseIndicator;
		$scope.transformData.pageOne.loanTerms.interestRate.buydownTemporarySubsidyFundingIndicator = $scope._YES;
		$scope.transformData.pageOne.loanTerms.interestRate.gseBuydownReflectedInNoteIndicator = $scope._YES;
		$scope.transformData.pageOne.loanTerms.interestRate.interestRateIncreaseIndicator = $scope._YES;
		$scope.transformData.pageOne.loanTerms.principalInterest.interestOnlyIndicator = $scope._YES;
		$scope.transformData.pageOne.loanTerms.principalInterest.paymentIncreaseIndicator = $scope._YES;
		$scope.transformData.pageOne.loanTerms.prepaymentPenalty.prepaymentPenaltyIndicator = $scope._YES;
		$scope.transformData.pageOne.loanTerms.balloonPayment.balloonIndicator = $scope._YES;

	}
	refreshData();
    $scope.openUCDXMLFile = function(){
    	$("#UCDXMLFILE").click();
    }
    $scope.importFile = function(){
    	$("#trid_import_text").click();
    }
    $scope.renderHtml = function(html_code){
    	return $sce.trustAsHtml(html_code);
    }
    $scope.updatePurpose = function(){
    	console.log($scope.transformData.pageOne.loanInformation.purpose);
    }
    var getStateByStateCode = function(stateCode){
    	var state = {};
    	angular.forEach($scope.states, function(s){
    		if(s.STATE_CODE == stateCode)
    			state = s;
    	});
    	return state;
    }

    var updateAddressDetails = function() {
    	if($scope.transformData.pageOne.transactionInformation.borrower!=null && $scope.transformData.pageOne.transactionInformation.borrower.length>0){
			var borrower ={};
			angular.forEach($scope.transformData.pageOne.transactionInformation.borrower, function(b, index){
				if(borrower[b.borrowerDetails.firstName.trim()] == undefined){
					if(index !=0 ){
						$scope.transformData.pageOne.transactionInformation.borrowerDisplayName += " & ";
					}else{
						$scope.transformData.pageOne.transactionInformation.borrowerDisplayName="";
					}
					$scope.transformData.pageOne.transactionInformation.borrowerDisplayName += b.borrowerDetails.firstName
					$scope.transformData.pageOne.transactionInformation.borrowerAddress = b.address
					borrower[b.borrowerDetails.firstName] = b.address;
				}
			});
			$scope.transformData.pageOne.transactionInformation.isBorrower = true;
		}else{
			$scope.transformData.pageOne.transactionInformation.isBorrower = false;
		}
		if($scope.transformData.pageOne.transactionInformation.lender!=null && $scope.transformData.pageOne.transactionInformation.lender.length>0){
			var lender ={};
			angular.forEach($scope.transformData.pageOne.transactionInformation.lender, function(l, index){
				if(lender[l.lenderDetails.firstName.trim()] == undefined){
					if(index !=0 ){
						$scope.transformData.pageOne.transactionInformation.lenderDisplayName += " & ";
					}else{
						$scope.transformData.pageOne.transactionInformation.lenderDisplayName="";
					}
					$scope.transformData.pageOne.transactionInformation.lenderDisplayName += l.lenderDetails.firstName
					$scope.transformData.pageOne.transactionInformation.lenderAddress = l.address
					lender[l.lenderDetails.firstName] = l.address;
				}
			});
			$scope.transformData.pageOne.transactionInformation.isLender = true;
		}else{
			$scope.transformData.pageOne.transactionInformation.isLender = false;
		}
		if($scope.transformData.pageOne.transactionInformation.seller!=null && $scope.transformData.pageOne.transactionInformation.seller.length>0){
			var seller ={};
			angular.forEach($scope.transformData.pageOne.transactionInformation.seller, function(s, index){
				if(seller[s.sellerDetails.firstName.trim()] == undefined){
					if(index !=0 ){
						$scope.transformData.pageOne.transactionInformation.sellerDisplayName += " & ";
					}else{
						$scope.transformData.pageOne.transactionInformation.sellerDisplayName = "";
					}
					$scope.transformData.pageOne.transactionInformation.sellerDisplayName += s.sellerDetails.firstName
					$scope.transformData.pageOne.transactionInformation.sellerAddress = s.address
					seller[s.sellerDetails.firstName] = s.address;
				}
			});
			$scope.transformData.pageOne.transactionInformation.isSeller = true;
		}else{
			$scope.transformData.pageOne.transactionInformation.isSeller = false;
		}
    }

    var loadTransformData = function(fileData){
    	$("#spinner").show();
		transformService.loadTransformData(fileData).success(function(data){
			if(data != null && data.length>0){
				$scope.transformData = data[0];
				$scope.transformData.pageOne.closingInformation.dateIssued = new Date();
				//SET YES or No Values here.
				$scope.transformData.pageOne.closingInformation.property.isStreeAddress = $scope._YES;

				if($scope.transformData.pageOne.closingInformation.property!=null){
					if($scope.transformData.pageOne.closingInformation.property.stateCode != null)
						$scope.transformData.pageOne.closingInformation.property.state = getStateByStateCode($scope.transformData.pageOne.closingInformation.property.stateCode);

					if($scope.transformData.pageOne.closingInformation.property.unparsedLegalDescription == null)
						$scope.transformData.pageOne.closingInformation.property.isLegalDescription = $scope._NO;
					else
						$scope.transformData.pageOne.closingInformation.property.isLegalDescription = $scope._YES;

				}
				if($scope.transformData.pageOne.loanInformation.purpose == 'Purchase')
					$scope.transformData.pageOne.closingInformation.isPurchaseTransaction = $scope._YES;
				else
					$scope.transformData.pageOne.closingInformation.isPurchaseTransaction = $scope._NO;

				updateAddressDetails();
				
				/*angular.forEach($scope.products, function(p){
					if($scope.transformData.pageOne.loanInformation.product == p["CFPB-compliant_name"])
						$scope.transformData.pageOne.loanInformation.productL = p;	
				});*/
				if($scope.transformData.pageOne.loanInformation.constructionLoanType == undefined || $scope.transformData.pageOne.loanInformation.constructionLoanType == "")
					$scope.transformData.pageOne.loanInformation.purposeType = $scope._NO;
				if($scope.transformData.pageTwo.closingCostDetailsLoanCosts!=undefined && $scope.transformData.pageTwo.closingCostDetailsLoanCosts.originationCharges!=null && $scope.transformData.pageTwo.closingCostDetailsLoanCosts.originationCharges.length>0){

					var orgCharge = angular.copy($scope.transformData.pageTwo.closingCostDetailsLoanCosts.originationCharges);
					$scope.transformData.pageTwo.closingCostDetailsLoanCosts.originationCharges = [];
					$scope.transformData.pageTwo.closingCostDetailsLoanCosts.originationCharges.push({});

					angular.forEach(orgCharge, function(orgCharg){
						if(orgCharg.displayLabel!=null && orgCharg.displayLabel.indexOf("of Loan Amount (Points)") != -1){
							$scope.transformData.pageTwo.closingCostDetailsLoanCosts.originationCharges[0]= orgCharg;
						}else{
							$scope.transformData.pageTwo.closingCostDetailsLoanCosts.originationCharges.push(orgCharg);							
						}
					});
				}
			}
			$("#spinner").hide();
		}).error( function(data, status){
    		$("#spinner").hide();
    	});
    }
    
    $scope.importTextFile = function(file){
        $("#spinner").show();
        var filename = file.files[0].name;
        var fileType = filename.substr((filename.lastIndexOf('.') + 1));
		if(fileType!='txt') {
			//alert("Not Required type "+val);
			$('#loadfile').modal('show'); 
			$('#spinner').hide();
		 }
		 else{
	        var reader = new FileReader();
			reader.readAsText(file.files[0], "UTF-8");
			reader.onload = function (evt) {
				var fileData = evt.target.result;
				transformService.transformText2XML(fileData).success(function(data){
					loadTransformData(data);
				});
				$("#spinner").hide();
			}
	     }
    }
    
    $scope.fileNameChanged = function(file){
    	$scope.fileName = file.files[0].name;
        var reader = new FileReader();
		reader.readAsText(file.files[0], "UTF-8");
		reader.onload = function (evt) {
			var fileData = evt.target.result;
			loadTransformData(fileData);
		}
    }

    $scope.saveFile = function(){
    	$("#spinner").show();
    	$scope.transformData.pageOne.closingInformation.dateIssued = $filter('date')($scope.transformData.pageOne.closingInformation.dateIssued,requestDFormat);
    	$scope.transformData.pageOne.closingInformation.closingDate = $filter('date')($scope.transformData.pageOne.closingInformation.closingDate,requestDFormat);
    	$scope.transformData.pageOne.closingInformation.disbursementDate = $filter('date')($scope.transformData.pageOne.closingInformation.disbursementDate,requestDFormat);
    	transformService.saveUCD($scope.transformData).success(function(data){
			var a = document.createElement('a');
			var xmlData = vkbeautify.xml(data)
			var blob = new Blob([xmlData], {'type':'application/octet-stream'});
			a.href = window.URL.createObjectURL(blob);
			a.download = $scope.fileName;
			a.click();
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
    $scope.updateValue = function(){
    	console.log($scope.transformData.pageOne.loanInformation.mortgageType);
    }
    $scope.updateStateValue = function(address){
    	address.stateCode = address.state.STATE_CODE;
    }
    $scope.loadNewPage = function(){
    	localStorage["purpose"] = $scope.purposeType;
    	refreshData();
    }
    $scope.otherchange = function(event){
    	//alert($scope.transformData.pageOne.loanInformation.loanType_o);
    	if($scope.transformData.pageOne.loanInformation.loanType_o == true){
    		$("#otherdescription").removeAttr("disabled");
    	}
    	else{
    		$("#otherdescription").attr("disabled","disabled");
    	}
    }
    $scope.borrowers = [];
    $scope.property = {};
    $scope.sellers = [];
    $scope.lenders = [];

    $scope.loadBorrowerData = function(isUpdate){
    	if(isUpdate){
    		$scope.transformData.pageOne.transactionInformation.borrower = $scope.borrowers;
    		updateAddressDetails();
    	}
    	else{
    		$scope.borrowers = angular.copy($scope.transformData.pageOne.transactionInformation.borrower);
    	}
    }
    $scope.loadSellerData = function(isUpdate){
    	if(isUpdate){
    		$scope.transformData.pageOne.transactionInformation.seller = $scope.sellers;
    		updateAddressDetails();
    	}
    	else{
    		$scope.sellers = angular.copy($scope.transformData.pageOne.transactionInformation.seller);
    	}
    }
    $scope.loadPropertyData = function(isUpdate){
    	if(isUpdate){
    		$scope.transformData.pageOne.closingInformation.property = $scope.property;
    		updateAddressDetails();
    	}
    	else{
    		$scope.property = angular.copy($scope.transformData.pageOne.closingInformation.property);
    	}
    }
    $scope.loadLenderData = function(isUpdate){
    	if(isUpdate){
    		$scope.transformData.pageOne.transactionInformation.lender = $scope.lenders;
    		updateAddressDetails();
    	}
    	else{
    		$scope.lenders = angular.copy($scope.transformData.pageOne.transactionInformation.lender);
    	}
    }
    $scope.generatePDF = function(){
    	$("#spinner").show();
    	transformService.saveUCD($scope.transformData).success(function(data){
    		transformService.generatePDF(data).success(function(pdfData){
    			if(pdfData!=null && pdfData.length>0){
    				$("#pdfViewerId").show();
    				$scope.pdfAsDataUri = "data:application/pdf;base64,"+pdfData[0].responseData;
					$("#carousel").pdfSlider();
    			}
    			//console.log(pdfData);
    			$("#spinner").hide();
    		}).error( function(pdfData, status){
    			$("#spinner").hide();
    		});
    	}).error( function(data, status){
    		$("#spinner").hide();
    	});
    }
});