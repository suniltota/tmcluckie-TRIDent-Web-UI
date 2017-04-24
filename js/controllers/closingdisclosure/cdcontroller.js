/**
 * Controller for transform function
 */
app.controller('closingDisclosureCtrl', function ($scope, $sce, $filter, staticData, cdService, $routeParams) {
	//$scope.purposes = staticData.purposes;
	var requestDFormat = "MM-dd-yyyy"
	$scope.format = staticData.dateDisplayFormat;
	$scope.states = staticData.state;
	$scope.lienPriorityType = staticData.lienPriorityType;
	$scope.adjustableRate = staticData.adjustableRate;
	$scope.mortgageType = staticData.mortgageType;
	$scope.paymentFrequencyType = staticData.paymentFrequencyType;
	$scope.fileName = "Actualize_XML.xml"
	$scope._YES = "YES";
	$scope._NO = "NO";
    $scope.showTab = 'closingInfo';
	$scope.options = [{ name: "Yes", id: true }, { name: "No", id: false }];
	$scope.cdformdata = staticData.cdformdata;

	var borrowerAddress ={};
	var sellerAddress ={};
	var lenderAddress ={};
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

    $scope.closeChange = function(closingDate){
    $scope.mydate = new Date();
    $scope.compareDate = $scope.mydate.setDate($scope.mydate.getDate() + 5);
    $scope.cd = $scope.closingDate;
    if( $scope.compareDate >=  $scope.cd){
    	$scope.cdformdata.closingDisclosurePageOne.closingInformation.closingDate = $scope.cd.setDate($scope.cd.getDate() + 5);
    }
	
    }
	
    var refreshData = function(){

        $scope.cdformdata = staticData.cdformdata;

		angular.forEach($scope.cdformdata.closingDisclosurePageOne.transactionInformation.lenderFullName, function(l){
			l.type="O";
		});
		$scope.cdformdata.closingDisclosurePageOne.costsAtClosing.ClosingCosts.amount = 0;
		$scope.cdformdata.closingDisclosurePageOne.costsAtClosing.CashToClose.amount = 0;
		$scope.cdformdata.closingDisclosurePageOne.costsAtClosing.ClosingCosts.totalLoanCosts = 0;
		$scope.cdformdata.closingDisclosurePageOne.costsAtClosing.ClosingCosts.totalOtherCosts = 0;
		$scope.cdformdata.closingDisclosurePageOne.costsAtClosing.ClosingCosts.lenderCredits = 0;
		$scope.cdformdata.closingDisclosurePageOne.closingInformation.dateIssued = new Date();
		$scope.cdformdata.closingDisclosurePageOne.transactionInformation.isBorrower = true;
		$scope.cdformdata.closingDisclosurePageOne.transactionInformation.isLender = true;
		$scope.cdformdata.closingDisclosurePageOne.transactionInformation.isSeller = true;
        $scope.chooseone = "streetAddress";
        $scope.cdformdata.closingDisclosurePageOne.closingInformation.property.isLegalDescription = $scope._NO;


    /*
		$scope.cdformdata = staticData.cdformdata;

		angular.forEach($scope.cdformdata.closingDisclosurePageOne.transactionInformation.lenderFullName, function(l){
			l.type="O";
		});
		$scope.cdformdata.closingDisclosurePageOne.costsAtClosing.ClosingCosts.amount = 0;
		$scope.cdformdata.closingDisclosurePageOne.costsAtClosing.CashToClose.amount = 0;
		$scope.cdformdata.closingDisclosurePageOne.costsAtClosing.ClosingCosts.totalLoanCosts = 0;
		$scope.cdformdata.closingDisclosurePageOne.costsAtClosing.ClosingCosts.totalOtherCosts = 0;
		$scope.cdformdata.closingDisclosurePageOne.costsAtClosing.ClosingCosts.lenderCredits = 0;
		$scope.cdformdata.closingDisclosurePageOne.closingInformation.dateIssued = new Date();
		$scope.cdformdata.closingDisclosurePageOne.transactionInformation.isBorrower = true;
		$scope.cdformdata.closingDisclosurePageOne.transactionInformation.isLender = true;
		$scope.cdformdata.closingDisclosurePageOne.transactionInformation.isSeller = true;

		$scope.cdformdata = staticData.cdformdata;
		$scope.cdformdata.closingDisclosurePageOne.closingInformation.property.isStreeAddress = $scope._YES;
		$scope.cdformdata.closingDisclosurePageOne.closingInformation.property.isLegalDescription = $scope._YES;
		$scope.cdformdata.closingDisclosurePageOne.closingInformation.isPurchaseTransaction = $scope._YES;
		$scope.cdformdata.closingDisclosurePageOne.closingInformation.salesContractDetail = {"personalPropertyIndicator" :$scope._NO}
		$scope.cdformdata.closingDisclosurePageOne.closingInformation.propertyValuationDetail = {"propertyValuationDetailIndicator":$scope._YES}
		$scope.cdformdata.closingDisclosurePageOne.transactionInformation.propertyValuationDetail;
		//For added dynamic element from UI
		borrowerAddress  = angular.copy($scope.cdformdata.closingDisclosurePageOne.transactionInformation.borrowerDetails[0]);
		sellerAddress  = angular.copy($scope.cdformdata.closingDisclosurePageOne.transactionInformation.sellerDetails[0]);
		lenderAddress = angular.copy($scope.cdformdata.closingDisclosurePageOne.transactionInformation.lenderFullName[0]);

		$scope.cdformdata.closingDisclosurePageOne.loanInformation.purpose = localStorage["purpose"];
		$scope.cdformdata.closingDisclosurePageOne.loanInformation.purposeType = $scope._YES;
		$scope.cdformdata.closingDisclosurePageOne.loanInformation.integratedDisclosureHomeEquityLoanIndicator =$scope.NO;
		$scope.cdformdata.closingDisclosurePageOne.loanInformation.miRequiredIndicator = $scope._YES;
		$scope.cdformdata.closingDisclosurePageOne.loanTerms.loanAmountIncreaseIndicator = $scope._YES;
		$scope.cdformdata.closingDisclosurePageOne.loanTerms.negativeAmoritzationIndicator = $scope.cdformdata.closingDisclosurePageOne.loanTerms.loanAmountIncreaseIndicator;
		$scope.cdformdata.closingDisclosurePageOne.loanTerms.interestRate.buydownTemporarySubsidyFundingIndicator = $scope._YES;
		$scope.cdformdata.closingDisclosurePageOne.loanTerms.interestRate.gseBuydownReflectedInNoteIndicator = $scope._YES;
		$scope.cdformdata.closingDisclosurePageOne.loanTerms.interestRate.interestRateIncreaseIndicator = $scope._YES;
		$scope.cdformdata.closingDisclosurePageOne.loanTerms.principalInterest.interestOnlyIndicator = $scope._YES;
		$scope.cdformdata.closingDisclosurePageOne.loanTerms.principalInterest.paymentIncreaseIndicator = $scope._YES;
		$scope.cdformdata.closingDisclosurePageOne.loanTerms.prepaymentPenalty.prepaymentPenaltyIndicator = $scope._YES;
		$scope.cdformdata.closingDisclosurePageOne.loanTerms.balloonPayment.balloonIndicator = $scope._YES;
		if($scope.cdformdata.closingDisclosurePageTwo.closingCostDetailsOtherCosts.iEPatClosingList == undefined)
			$scope.cdformdata.closingDisclosurePageTwo.closingCostDetailsOtherCosts.iEPatClosingList =[];
		for(i=0;i<14;i++){
			if($scope.cdformdata.closingDisclosurePageTwo.closingCostDetailsOtherCosts.iEPatClosingList[i] ==undefined) {
				$scope.cdformdata.closingDisclosurePageTwo.closingCostDetailsOtherCosts.iEPatClosingList[i]={"displayLabel":""};
				if(i==13)
					$scope.cdformdata.closingDisclosurePageTwo.closingCostDetailsOtherCosts.iEPatClosingList[i].displayLabel ="Aggregate Adjustment";
			}
		}
		$scope.cdformdata.closingDisclosurePageTwo.closingCostDetailsOtherCosts.tOGovtFeesList=[{"feeType":"Recording Fees"}];
	*/}
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
    	console.log($scope.cdformdata.closingDisclosurePageOne.loanInformation.purpose);
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
    	if($scope.cdformdata.closingDisclosurePageOne.transactionInformation.borrower!=null && $scope.cdformdata.closingDisclosurePageOne.transactionInformation.borrower.length>0){
			var borrower ={};
			angular.forEach($scope.cdformdata.closingDisclosurePageOne.transactionInformation.borrower, function(b, index){
				if(b.address.stateCode != null)
					b.state = getStateByStateCode(b.address.stateCode);
				if(borrower[b.borrowerDetails.firstName.trim()] == undefined){
					if(index !=0 ){
						$scope.cdformdata.closingDisclosurePageOne.transactionInformation.borrowerDisplayName += " & ";
					}else{
						$scope.cdformdata.closingDisclosurePageOne.transactionInformation.borrowerDisplayName="";
						$scope.cdformdata.closingDisclosurePageOne.transactionInformation.borrowerAddress = b.address
					}
					$scope.cdformdata.closingDisclosurePageOne.transactionInformation.borrowerDisplayName += b.borrowerDetails.firstName
					
					borrower[b.borrowerDetails.firstName] = b.address;
				}
			});
			$scope.cdformdata.closingDisclosurePageOne.transactionInformation.isBorrower = true;
		}else{
			$scope.cdformdata.closingDisclosurePageOne.transactionInformation.isBorrower = false;
		}
		if($scope.cdformdata.closingDisclosurePageOne.transactionInformation.lender!=null && $scope.cdformdata.closingDisclosurePageOne.transactionInformation.lender.length>0){
			var lender ={};
			angular.forEach($scope.cdformdata.closingDisclosurePageOne.transactionInformation.lender, function(l, index){
				if(l.address.stateCode != null)
					l.state = getStateByStateCode(l.address.stateCode);
				if(lender[l.lenderDetails.firstName.trim()] == undefined){
					if(index !=0 ){
						$scope.cdformdata.closingDisclosurePageOne.transactionInformation.lenderDisplayName += " & ";
					}else{
						$scope.cdformdata.closingDisclosurePageOne.transactionInformation.lenderDisplayName="";
						$scope.cdformdata.closingDisclosurePageOne.transactionInformation.lenderAddress = l.address
					}
					$scope.cdformdata.closingDisclosurePageOne.transactionInformation.lenderDisplayName += l.lenderDetails.firstName
					
					lender[l.lenderDetails.firstName] = l.address;
				}
			});
			$scope.cdformdata.closingDisclosurePageOne.transactionInformation.isLender = true;
		}else{
			$scope.cdformdata.closingDisclosurePageOne.transactionInformation.isLender = false;
		}
		if($scope.cdformdata.closingDisclosurePageOne.transactionInformation.seller!=null && $scope.cdformdata.closingDisclosurePageOne.transactionInformation.seller.length>0){
			var seller ={};
			angular.forEach($scope.cdformdata.closingDisclosurePageOne.transactionInformation.seller, function(s, index){
				if(s.address.stateCode != null)
					s.state = getStateByStateCode(s.address.stateCode);
				if(seller[s.sellerDetails.firstName.trim()] == undefined){
					if(index !=0 ){
						$scope.cdformdata.closingDisclosurePageOne.transactionInformation.sellerDisplayName += " & ";
					}else{
						$scope.cdformdata.closingDisclosurePageOne.transactionInformation.sellerDisplayName = "";
						$scope.cdformdata.closingDisclosurePageOne.transactionInformation.sellerAddress = s.address
					}
					$scope.cdformdata.closingDisclosurePageOne.transactionInformation.sellerDisplayName += s.sellerDetails.firstName
					seller[s.sellerDetails.firstName] = s.address;
				}
			});
			$scope.cdformdata.closingDisclosurePageOne.transactionInformation.isSeller = true;
		}else{
			$scope.cdformdata.closingDisclosurePageOne.transactionInformation.isSeller = false;
		}
		$scope.cdformdata.closingDisclosurePageOne.projectedPayments.miTerm = 51;
		/*for(i=0;i<15;i++){
			if($scope.cdformdata.closingDisclosurePageTwo.closingCostDetailsOtherCosts.otherCostsList[i] ==undefined) {
				$scope.cdformdata.closingDisclosurePageTwo.closingCostDetailsOtherCosts.otherCostsList[i]={"displayLabel":""};
				if(i==14)
					$scope.cdformdata.closingDisclosurePageTwo.closingCostDetailsOtherCosts.otherCostsList[i].displayLabel ="Aggregate Adjustment";
			}
		}*/
    }

    var loadTransformData = function(fileData){
    	$("#spinner").show();
		cdService.loadTransformData(fileData).success(function(data){

			$(data).each(function(){
				$scope.cdformdata = data;
				$scope.cdformdata.closingDisclosurePageOne.closingInformation.dateIssued = new Date();
				//SET YES or No Values here.
				$scope.cdformdata.closingDisclosurePageOne.closingInformation.property.isStreeAddress = $scope._YES;

				if($scope.cdformdata.closingDisclosurePageOne.closingInformation.property!=null){
					if($scope.cdformdata.closingDisclosurePageOne.closingInformation.property.stateCode != null)
						$scope.cdformdata.closingDisclosurePageOne.closingInformation.property.state = getStateByStateCode($scope.cdformdata.closingDisclosurePageOne.closingInformation.property.stateCode);

					if($scope.cdformdata.closingDisclosurePageOne.closingInformation.property.unparsedLegalDescription == null){
						$scope.chooseone = "streetAddress";
					}
					else{
						$scope.chooseone = "legalDescription";
					}

				}
				if($scope.cdformdata.closingDisclosurePageOne.loanInformation.purpose == 'Purchase')
					$scope.cdformdata.closingDisclosurePageOne.closingInformation.isPurchaseTransaction = $scope._YES;
				else
					$scope.cdformdata.closingDisclosurePageOne.closingInformation.isPurchaseTransaction = $scope._NO;

				updateAddressDetails();
				
				/*angular.forEach($scope.products, function(p){
					if($scope.cdformdata.closingDisclosurePageOne.loanInformation.product == p["CFPB-compliant_name"])
						$scope.cdformdata.closingDisclosurePageOne.loanInformation.productL = p;	
				});*/
				if($scope.cdformdata.closingDisclosurePageOne.loanInformation.constructionLoanType == undefined || $scope.cdformdata.closingDisclosurePageOne.loanInformation.constructionLoanType == "")
					$scope.cdformdata.closingDisclosurePageOne.loanInformation.purposeType = $scope._NO;
				if($scope.cdformdata.closingDisclosurePageTwo.closingCostDetailsLoanCosts!=undefined && $scope.cdformdata.closingDisclosurePageTwo.closingCostDetailsLoanCosts.originationCharges!=null && $scope.cdformdata.closingDisclosurePageTwo.closingCostDetailsLoanCosts.originationCharges.length>0){

					var orgCharge = angular.copy($scope.cdformdata.closingDisclosurePageTwo.closingCostDetailsLoanCosts.originationCharges);
					$scope.cdformdata.closingDisclosurePageTwo.closingCostDetailsLoanCosts.originationCharges = [];
					$scope.cdformdata.closingDisclosurePageTwo.closingCostDetailsLoanCosts.originationCharges.push({});

					angular.forEach(orgCharge, function(orgCharg){
						if(orgCharg.displayLabel!=null && orgCharg.displayLabel.indexOf("of Loan Amount (Points)") != -1){
							$scope.cdformdata.closingDisclosurePageTwo.closingCostDetailsLoanCosts.originationCharges[0]= orgCharg;
						}else{
							$scope.cdformdata.closingDisclosurePageTwo.closingCostDetailsLoanCosts.originationCharges.push(orgCharg);							
						}
					});
				}
			});
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
				cdService.transformText2XML(fileData).success(function(data){
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
    	$scope.cdformdata.closingDisclosurePageOne.closingInformation.dateIssued = $filter('date')($scope.cdformdata.closingDisclosurePageOne.closingInformation.dateIssued,requestDFormat);
    	$scope.cdformdata.closingDisclosurePageOne.closingInformation.closingDate = $filter('date')($scope.cdformdata.closingDisclosurePageOne.closingInformation.closingDate,requestDFormat);
    	$scope.cdformdata.closingDisclosurePageOne.closingInformation.disbursementDate = $filter('date')($scope.cdformdata.closingDisclosurePageOne.closingInformation.disbursementDate,requestDFormat);
    	cdService.saveUCD($scope.transformData).success(function(data){
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
    	$scope.cdformdata.closingDisclosurePageOne.transactionInformation.borrower.push(angular.copy(borrowerAddress));
    }
    $scope.removeBorrower = function(index){
    	$scope.cdformdata.closingDisclosurePageOne.transactionInformation.borrower.splice(index,1);
    }
    $scope.addSeller = function(){
    	$scope.cdformdata.closingDisclosurePageOne.transactionInformation.seller.push(angular.copy(sellerAddress));
    }
    $scope.removeSeller = function(index){
    	$scope.cdformdata.closingDisclosurePageOne.transactionInformation.seller.splice(index,1);
    }
    $scope.addLender = function(){
    	$scope.cdformdata.closingDisclosurePageOne.transactionInformation.lender.push(angular.copy(lenderAddress));
    }
    $scope.removeLender = function(index){
    	$scope.cdformdata.closingDisclosurePageOne.transactionInformation.lender.splice(index,1);
    }
    $scope.updateValue = function(){
    	console.log($scope.cdformdata.closingDisclosurePageOne.loanInformation.mortgageType);
    }
    $scope.updateStateValue = function(address){
    	address.stateCode = address.state.STATE_CODE;
    }
    $scope.loadNewPage = function(){
    	localStorage["purpose"] = $scope.purposeType;
    	refreshData();
    }
    $scope.otherchange = function(event){
    	//alert($scope.cdformdata.closingDisclosurePageOne.loanInformation.loanType_o);
    	if($scope.cdformdata.closingDisclosurePageOne.loanInformation.loanType_o == true){
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
    		$scope.cdformdata.closingDisclosurePageOne.transactionInformation.borrower = $scope.borrowers;
    		updateAddressDetails();
    	}
    	else{
    		$scope.borrowers = angular.copy($scope.cdformdata.closingDisclosurePageOne.transactionInformation.borrower);
    	}
    }
    $scope.loadSellerData = function(isUpdate){
    	if(isUpdate){
    		$scope.cdformdata.closingDisclosurePageOne.transactionInformation.seller = $scope.sellers;
    		updateAddressDetails();
    	}
    	else{
    		$scope.sellers = angular.copy($scope.cdformdata.closingDisclosurePageOne.transactionInformation.seller);
    	}
    }
    $scope.loadPropertyData = function(isUpdate){
    	if(isUpdate){
    		$scope.cdformdata.closingDisclosurePageOne.closingInformation.property = $scope.property;
    		updateAddressDetails();
    	}
    	else{
    		$scope.property = angular.copy($scope.cdformdata.closingDisclosurePageOne.closingInformation.property);
    	}
    }
    $scope.loadLenderData = function(isUpdate){
    	if(isUpdate){
    		$scope.cdformdata.closingDisclosurePageOne.transactionInformation.lender = $scope.lenders;
    		updateAddressDetails();
    	}
    	else{
    		$scope.lenders = angular.copy($scope.cdformdata.closingDisclosurePageOne.transactionInformation.lender);
    	}
    }
    $scope.generatePDF = function(){
    	$("#spinner").show();
    	cdService.saveUCD($scope.transformData).success(function(data){
    		cdService.generatePDF(data).success(function(pdfData){
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

    $scope.activeTab = [];
    $scope.tabs = [
    	{"heading":"Closing Information","template":"templates/cdwizardpages/wizardClosingInfo.html"},
    	{"heading":"Transaction Information","template":"templates/cdwizardpages/wizardTransactionInfo.html"},
    	{"heading":"Loan Information","template":"templates/cdwizardpages/wizardLoanInfo.html"},
    	{"heading":"Loan Terms","template":"templates/cdwizardpages/wizardLoanTerms.html"},
    	{"heading":"Closing Cost Details - Loan Costs","template":"templates/cdwizardpages/wizardLoanCosts.html"},
    	{"heading":"Closing Cost Details - Other Costs","template":"templates/cdwizardpages/wizardOtherCosts.html"}
    	];
    $scope.index = 0;
	$scope.next = function() {
		$scope.activeTab[++$scope.index] = true;
	}
	$scope.previous = function() {
		$scope.activeTab[--$scope.index] = true;
	}
	$scope.updateActiveTab = function(val){
		$scope.activeTab[val] = true;
		$scope.index = val;
	}
	
	
	
});