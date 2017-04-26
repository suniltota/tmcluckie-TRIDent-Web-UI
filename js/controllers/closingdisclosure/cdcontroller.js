/**
 * Controller for transform function
 */
app.controller('closingDisclosureCtrl', function ($scope, $sce, $filter, staticData, cdService, $routeParams) {
	//$scope.purposes = staticData.purposes;
	var requestDFormat = "MM-dd-yyyy"
	$scope.format = staticData.dateDisplayFormat;
	$scope.states = staticData.state;
	$scope.lienPriorityType = staticData.lienPriorityType;
	$scope.amortizationType  = staticData.amortizationType;
	$scope.mortgageType = staticData.mortgageType;
	$scope.paymentFrequencyType = staticData.paymentFrequencyType;
	$scope.fileName = "Actualize_XML.xml"
	$scope._YES = "YES";
	$scope._NO = "NO";
    $scope.showTab = 'closingInfo';
	$scope.options = [{ name: "Yes", id: true }, { name: "No", id: false }];
	$scope.cdformdata = staticData.cdformdata;
    $scope.formType= $routeParams.formType != undefined ? $routeParams.formType : 'standard';
    $scope.purposeType = $routeParams.purposeType != undefined ? $routeParams.purposeType : 'purchase';
    $scope.ausTypes = staticData.ausTypes;
    $scope.partyRoleTypes = staticData.partyRoleTypes;
	var borrowerAddress ={};
	var sellerAddress ={};
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
    	$scope.cdformdata.closingInformation.closingDate = $scope.cd.setDate($scope.cd.getDate() + 5);
    }
	
    }
	
    var refreshData = function(){

        $scope.cdformdata = staticData.cdformdata;

		angular.forEach($scope.cdformdata.transactionInformation.lenderFullName, function(l){
			l.type="O";
		});
		$scope.cdformdata.costsAtClosing.ClosingCosts.amount = 0;
		$scope.cdformdata.costsAtClosing.CashToClose.amount = 0;
		$scope.cdformdata.costsAtClosing.ClosingCosts.totalLoanCosts = 0;
		$scope.cdformdata.costsAtClosing.ClosingCosts.totalOtherCosts = 0;
		$scope.cdformdata.costsAtClosing.ClosingCosts.lenderCredits = 0;
		$scope.cdformdata.closingInformation.dateIssued = new Date();
		$scope.cdformdata.transactionInformation.isBorrower = true;
		$scope.cdformdata.transactionInformation.isLender = true;
		$scope.cdformdata.transactionInformation.isSeller = true;
        $scope.chooseone = "streetAddress";
        $scope.borrowertype = "I";
        $scope.sellertype = "I";
        $scope.cdformdata.closingInformation.property.isLegalDescription = $scope._NO;


		borrowerAddress  = angular.copy($scope.cdformdata.transactionInformation.borrowerDetails[0]);
		sellerAddress  = angular.copy($scope.cdformdata.transactionInformation.sellerDetails[0]);
    /*
		$scope.cdformdata = staticData.cdformdata;

		angular.forEach($scope.cdformdata.transactionInformation.lenderFullName, function(l){
			l.type="O";
		});
		$scope.cdformdata.costsAtClosing.ClosingCosts.amount = 0;
		$scope.cdformdata.costsAtClosing.CashToClose.amount = 0;
		$scope.cdformdata.costsAtClosing.ClosingCosts.totalLoanCosts = 0;
		$scope.cdformdata.costsAtClosing.ClosingCosts.totalOtherCosts = 0;
		$scope.cdformdata.costsAtClosing.ClosingCosts.lenderCredits = 0;
		$scope.cdformdata.closingInformation.dateIssued = new Date();
		$scope.cdformdata.transactionInformation.isBorrower = true;
		$scope.cdformdata.transactionInformation.isLender = true;
		$scope.cdformdata.transactionInformation.isSeller = true;

		$scope.cdformdata = staticData.cdformdata;
		$scope.cdformdata.closingInformation.property.isStreeAddress = $scope._YES;
		$scope.cdformdata.closingInformation.property.isLegalDescription = $scope._YES;
		$scope.cdformdata.closingInformation.isPurchaseTransaction = $scope._YES;
		$scope.cdformdata.closingInformation.salesContractDetail = {"personalPropertyIndicator" :$scope._NO}
		$scope.cdformdata.closingInformation.propertyValuationDetail = {"propertyValuationDetailIndicator":$scope._YES}
		$scope.cdformdata.transactionInformation.propertyValuationDetail;
		//For added dynamic element from UI
		borrowerAddress  = angular.copy($scope.cdformdata.transactionInformation.borrowerDetails[0]);
		sellerAddress  = angular.copy($scope.cdformdata.transactionInformation.sellerDetails[0]);
		lenderAddress = angular.copy($scope.cdformdata.transactionInformation.lenderFullName[0]);

		$scope.cdformdata.loanInformation.purpose = localStorage["purpose"];
		$scope.cdformdata.loanInformation.purposeType = $scope._YES;
		$scope.cdformdata.loanInformation.integratedDisclosureHomeEquityLoanIndicator =$scope.NO;
		$scope.cdformdata.loanInformation.miRequiredIndicator = $scope._YES;
		$scope.cdformdata.loanTerms.loanAmountIncreaseIndicator = $scope._YES;
		$scope.cdformdata.loanTerms.negativeAmoritzationIndicator = $scope.cdformdata.loanTerms.loanAmountIncreaseIndicator;
		$scope.cdformdata.loanTerms.interestRate.buydownTemporarySubsidyFundingIndicator = $scope._YES;
		$scope.cdformdata.loanTerms.interestRate.gseBuydownReflectedInNoteIndicator = $scope._YES;
		$scope.cdformdata.loanTerms.interestRate.interestRateIncreaseIndicator = $scope._YES;
		$scope.cdformdata.loanTerms.principalInterest.interestOnlyIndicator = $scope._YES;
		$scope.cdformdata.loanTerms.principalInterest.paymentIncreaseIndicator = $scope._YES;
		$scope.cdformdata.loanTerms.prepaymentPenalty.prepaymentPenaltyIndicator = $scope._YES;
		$scope.cdformdata.loanTerms.balloonPayment.balloonIndicator = $scope._YES;
		if($scope.cdformdata.closingCostDetailsOtherCosts.iEPatClosingList == undefined)
			$scope.cdformdata.closingCostDetailsOtherCosts.iEPatClosingList =[];
		for(i=0;i<14;i++){
			if($scope.cdformdata.closingCostDetailsOtherCosts.iEPatClosingList[i] ==undefined) {
				$scope.cdformdata.closingCostDetailsOtherCosts.iEPatClosingList[i]={"displayLabel":""};
				if(i==13)
					$scope.cdformdata.closingCostDetailsOtherCosts.iEPatClosingList[i].displayLabel ="Aggregate Adjustment";
			}
		}
		$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList=[{"feeType":"Recording Fees"}];
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
    	console.log($scope.cdformdata.loanInformation.purpose);
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
    	if($scope.cdformdata.transactionInformation.borrowerDetails!=null && $scope.cdformdata.transactionInformation.borrowerDetails.length>0){
			var borrower ={};
			angular.forEach($scope.cdformdata.transactionInformation.borrowerDetails, function(b, index){
				if(b.address.stateCode != null)
					b.state = getStateByStateCode(b.address.stateCode);
				if(borrower[b.address.firstName] == undefined){
					if(index !=0 ){
						$scope.cdformdata.transactionInformation.borrowerDisplayName += " & ";
					}else{
						$scope.cdformdata.transactionInformation.borrowerDisplayName="";
						$scope.cdformdata.transactionInformation.borrowerAddress = b.address
					}
					$scope.cdformdata.transactionInformation.borrowerDisplayName += b.nameModel.firstName
					
					borrower[b.nameModel.firstName] = b.address;
				}
			});
			$scope.cdformdata.transactionInformation.isBorrower = true;
		}else{
			$scope.cdformdata.transactionInformation.isBorrower = false;
		}
		if($scope.cdformdata.transactionInformation.lenderFullName!=null && $scope.cdformdata.transactionInformation.lenderFullName.length>0){
			var lender ={};
			angular.forEach($scope.cdformdata.transactionInformation.lenderFullName, function(l, index){
				if(l.address.stateCode != null)
					l.state = getStateByStateCode(l.address.stateCode);
				if(lender[l.nameModel.firstName] == undefined){
					if(index !=0 ){
						$scope.cdformdata.transactionInformation.lenderDisplayName += " & ";
					}else{
						$scope.cdformdata.transactionInformation.lenderDisplayName="";
						$scope.cdformdata.transactionInformation.lenderFullName.address = l.address
					}
					$scope.cdformdata.transactionInformation.lenderDisplayName += l.nameModel.firstName
					
					lender[l.nameModel.firstName] = l.address;
				}
			});
			$scope.cdformdata.transactionInformation.isLender = true;
		}else{
			$scope.cdformdata.transactionInformation.isLender = false;
		}
		if($scope.cdformdata.transactionInformation.sellerDetails!=null && $scope.cdformdata.transactionInformation.sellerDetails.length>0){
			var seller ={};
			angular.forEach($scope.cdformdata.transactionInformation.sellerDetails, function(s, index){
				if(s.address.stateCode != null)
					s.state = getStateByStateCode(s.address.stateCode);
				if(seller[s.nameModel.firstName] == undefined){
					if(index !=0 ){
					}else{
						$scope.cdformdata.transactionInformation.sellerDisplayName = "";
						$scope.cdformdata.transactionInformation.sellerAddress = s.address
					}
					$scope.cdformdata.transactionInformation.sellerDisplayName += s.nameModel.firstName
					seller[s.nameModel.firstName] = s.address;
				}
			});
			$scope.cdformdata.transactionInformation.isSeller = true;
		}else{
			$scope.cdformdata.transactionInformation.isSeller = false;
		}
		$scope.cdformdata.projectedPayments.miTerm = 51;
		/*for(i=0;i<15;i++){
			if($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i] ==undefined) {
				$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i]={"displayLabel":""};
				if(i==14)
					$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].displayLabel ="Aggregate Adjustment";
			}
		}*/
    }

    var loadTransformData = function(fileData){
    	$("#spinner").show();
		cdService.loadTransformData(fileData).success(function(data){

			$(data).each(function(){
				$scope.cdformdata = data;
				$scope.cdformdata.closingInformation.dateIssued = new Date();
				//SET YES or No Values here.
				$scope.cdformdata.closingInformation.property.isStreeAddress = $scope._YES;

				if($scope.cdformdata.closingInformation.property!=null){
					if($scope.cdformdata.closingInformation.property.stateCode != null)
						$scope.cdformdata.closingInformation.property.state = getStateByStateCode($scope.cdformdata.closingInformation.property.stateCode);

					if($scope.cdformdata.closingInformation.property.unparsedLegalDescription == null){
						$scope.chooseone = "streetAddress";
					}
					else{
						$scope.chooseone = "legalDescription";
					}

				}
				if($scope.cdformdata.loanInformation.purpose == 'Purchase')
					$scope.cdformdata.closingInformation.isPurchaseTransaction = $scope._YES;
				else
					$scope.cdformdata.closingInformation.isPurchaseTransaction = $scope._NO;

				updateAddressDetails();
				$scope.borrowertype = $scope.cdformdata.transactionInformation.borrowerDetails[0].type;
				$scope.sellertype = $scope.cdformdata.transactionInformation.sellerDetails[0].type;
				/*angular.forEach($scope.products, function(p){
					if($scope.cdformdata.loanInformation.product == p["CFPB-compliant_name"])
						$scope.cdformdata.loanInformation.productL = p;	
				});*/
				
				if($scope.cdformdata.loanInformation.constructionLoanType == undefined || $scope.cdformdata.loanInformation.constructionLoanType == "")
					$scope.cdformdata.loanInformation.purposeType = $scope._NO;
				if($scope.cdformdata.closingCostDetailsLoanCosts!=undefined && $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges!=null && $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.length>0){

					var orgCharge = angular.copy($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges);
					$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges = [];
					$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.push({});

					angular.forEach(orgCharge, function(orgCharg){
						if(orgCharg.displayLabel!=null && orgCharg.displayLabel.indexOf("of Loan Amount (Points)") != -1){
							$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[0]= orgCharg;
						}else{
							$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.push(orgCharg);							
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
    	$scope.cdformdata.closingInformation.dateIssued = $filter('date')($scope.cdformdata.closingInformation.dateIssued,requestDFormat);
    	$scope.cdformdata.closingInformation.closingDate = $filter('date')($scope.cdformdata.closingInformation.closingDate,requestDFormat);
    	$scope.cdformdata.closingInformation.disbursementDate = $filter('date')($scope.cdformdata.closingInformation.disbursementDate,requestDFormat);
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
    	$scope.cdformdata.transactionInformation.borrowerDetails.push(angular.copy(borrowerAddress));
    }
    $scope.removeBorrower = function(index){
    	$scope.cdformdata.transactionInformation.borrowerDetails.splice(index,1);
    }
    $scope.addSeller = function(){
    	$scope.cdformdata.transactionInformation.sellerDetails.push(angular.copy(sellerAddress));
    }
    $scope.removeSeller = function(index){
    	$scope.cdformdata.transactionInformation.sellerDetails.splice(index,1);
    }
    $scope.addLender = function(){
    	$scope.cdformdata.transactionInformation.lenderFullName.push(angular.copy(lenderAddress));
    }
    $scope.removeLender = function(index){
    	$scope.cdformdata.transactionInformation.lenderFullName.splice(index,1);
    }
    $scope.updateValue = function(){
    	console.log($scope.cdformdata.loanInformation.mortgageType);
    }
    $scope.updateStateValue = function(address){
    	address.stateCode = address.state.STATE_CODE;
    }
    $scope.loadNewPage = function(){
    	localStorage["purpose"] = $scope.purposeType;
    	refreshData();
    }
    $scope.otherchange = function(){
    	if($scope.event == 'Other'){
    		$("#otherdescription").removeAttr("disabled");
    	}
    	else{
    		$("#otherdescription").attr("disabled","disabled");
    	}
    }
    /*$scope.borrowers = [];
    $scope.property = {};
    $scope.sellers = [];
    $scope.lenders = [];

    $scope.loadBorrowerData = function(isUpdate){
    	if(isUpdate){
    		$scope.cdformdata.transactionInformation.borrowerDetails = $scope.borrowers;
    		updateAddressDetails();
    	}
    	else{
    		$scope.borrowers = angular.copy($scope.cdformdata.transactionInformation.borrowerDetails);
    	}
    }
    $scope.loadSellerData = function(isUpdate){
    	if(isUpdate){
    		$scope.cdformdata.transactionInformation.sellerDetails = $scope.sellers;
    		updateAddressDetails();
    	}
    	else{
    		$scope.sellers = angular.copy($scope.cdformdata.transactionInformation.sellerDetails);
    	}
    }*/
    $scope.loadPropertyData = function(isUpdate){
    	if(isUpdate){
    		$scope.cdformdata.closingInformation.property = $scope.property;
    		updateAddressDetails();
    	}
    	else{
    		$scope.property = angular.copy($scope.cdformdata.closingInformation.property);
    	}
    }
    $scope.loadLenderData = function(isUpdate){
    	if(isUpdate){
    		$scope.cdformdata.transactionInformation.lender = $scope.lenders;
    		updateAddressDetails();
    	}
    	else{
    		$scope.lenders = angular.copy($scope.cdformdata.transactionInformation.lender);
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