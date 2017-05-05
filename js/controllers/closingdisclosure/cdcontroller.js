/**
 * Controller for transform function
 */
app.controller('closingDisclosureCtrl', function ($scope, $sce, $filter, staticData, cdService) {

	if(localStorage.loanTransactionType != undefined) {
		staticData.basicLoanInfo.loanTransactionType = localStorage.loanTransactionType;
	}
	if(localStorage.loanPurposeType != undefined) {
		staticData.basicLoanInfo.loanPurposeType = localStorage.loanPurposeType;
	}
	if(localStorage.loanFormType != undefined) {
		staticData.basicLoanInfo.loanFormType = localStorage.loanFormType;
	}
	$scope.loanBasicInfo = staticData.basicLoanInfo;
	$scope.showTab = 'closingInfo';
	$scope.dateFormat = staticData.dateDisplayFormat;
	$scope.dropDownBooleanOptions = staticData.dropDownBooleanOptions;
	$scope.escrowDropDownBooleanOptions = staticData.escrowDropDownBooleanOptions;
	$scope.stateCodes = staticData.stateCodes;
	$scope.countryCodes = staticData.countryCodes;
	$scope.propertyValuationMethodTypes = staticData.propertyValuationMethodTypes;
	$scope.borrowerPartyRoleTypes = staticData.borrowerPartyRoleTypes;
	$scope.loanPeriodTypes = staticData.loanPeriodTypes;
	$scope.loanTypes = staticData.loanTypes;
	$scope.ausTypes = staticData.ausTypes;
	$scope.lienPriorityTypes = staticData.lienPriorityTypes;
	$scope.amortizationTypes = staticData.amortizationTypes;
	$scope.constructionLoanTypes = staticData.constructionLoanTypes;
	$scope.negativeAmortizationTypes = staticData.negativeAmortizationTypes;
	$scope.calendarMonths = staticData.calendarMonths;
	$scope.miCompanyNameTypes = staticData.miCompanyNameTypes;
	$scope.ETIAComponentTypes = staticData.ETIAComponentTypes;
	$scope.feeTypes = staticData.feeTypes;
	$scope.feePaidToTypes = staticData.feePaidToTypes;
	$scope.prepaidItems = staticData.prepaidItems;
    $scope.escrowItemTypes = staticData.escrowItemTypes;
	var borrower ={};
	var seller ={};
	var ausTypeIdentifier = {};
	var ETIAComponentType = {};
    var originationCharges = {};
    var sbDidNotShopFors = {};
    var sbDidShopFors = {};
    var tOGovtFeesList = {};
    var prepaidsList = {};
    var iEPatClosingList = {};
    var otherCostsList = {};

	$scope.dateOptions = {
 		formatYear: 'yy',
 		startingDay: 1
 	};

	var initializeCDformData = function() {
		$scope.cdformdata = staticData.cdformdata;
		$scope.cdformdata.loanInformation.purpose = $scope.loanBasicInfo.loanPurposeType;
		borrower = angular.copy($scope.cdformdata.transactionInformation.borrowerDetails[0]);
		seller = angular.copy($scope.cdformdata.transactionInformation.sellerDetails[0]);
		ausTypeIdentifier = angular.copy($scope.cdformdata.loanInformation.automatedUnderwritings[0]);
		ETIAComponentType = angular.copy($scope.cdformdata.etiaSection.etiaValues[2]);
		originationCharges = angular.copy($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[0]);
		sbDidNotShopFors = angular.copy($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[0]);
		sbDidShopFors = angular.copy($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[0]);
		tOGovtFeesList = angular.copy($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[3]);
		prepaidsList = angular.copy($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[4]);
		iEPatClosingList = angular.copy($scope.cdformdata.closingCostDetailsOtherCosts.iEPatClosingList[3]);
		otherCostsList = angular.copy($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[0]); 
		$scope.cdformdata.closingInformation.propertyValuationDetail.propertyValue = 'Appraised';
		if(localStorage.jsonData != undefined) {
			$scope.cdformdata = angular.fromJson(localStorage.jsonData);
			$scope.cdformdata.loanInformation['loanTermYears'] = $scope.cdformdata.loanInformation.loanMaturityPeriodCount/12;
			$scope.cdformdata.loanInformation['loanTermMonths'] = $scope.cdformdata.loanInformation.loanMaturityPeriodCount%12;
		}
		
		for (i = $scope.cdformdata.loanInformation.automatedUnderwritings.length; i < 3; i++) { 
		    $scope.cdformdata.loanInformation.automatedUnderwritings.push(angular.copy(ausTypeIdentifier));
		}
		var lender = {
				"type": "O",
				"nameModel": {
					"firstName": "",
					"lastName": "",
					"middleName": "",
					"suffixName": "",
					"fullName": ""
				},
				"partyRoleType": "NotePayTo",
				"partyRoleOtherDescription": "",
				"address": {
					"addressLineText": "",
					"addressType": "",
					"addressUnitDesignatorType": "",
					"addressUnitIdentifier": "",
					"cityName": "",
					"countryCode": "",
					"postalCode": "",
					"stateCode": ""
				}
		}
		var isLenderTypeOrganization = false;
		for(i=0; i<$scope.cdformdata.transactionInformation.lenderDetails.length; i++){
		       if($scope.cdformdata.transactionInformation.lenderDetails[i].type == 'O') {
		       		isLenderTypeOrganization = true;
		       		break;
		       }
		};
		if(!isLenderTypeOrganization)
			$scope.cdformdata.transactionInformation.lenderDetails.push(lender);

		var productAdjustmentInformation = {
			'fixedPeriodMonths' :'',
			'firstChangePeriodMonths':'',
			'subsequentChangePeriodMonths':'',
			'loanCapRate':'',
			'firstChangeInterestRateLimit':'',
			'subsequentChangeInterestRateLimit' :''
		};
		$scope.cdformdata.loanInformation['productAdjustmentInformation'] = productAdjustmentInformation;
		$scope.cdformdata.loanInformation.isProductAdjustmentinfoPresent = false;

		$scope.cdformdata.etiaSection['etiaTypes']=[];
		for(i=0; i<$scope.cdformdata.etiaSection.etiaValues.length; i++){
		    if(i==0 && $scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType != 'PropertyTaxes') {
	       		var propertyTaxesETIA = {
	       			"projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType": "PropertyTaxes",
			        "projectedPaymentEstimatedTaxesInsuranceAssessmentComponentTypeOtherDescription": "",
			        "projectedPaymentEscrowedType": "Escrowed"
	       		};
	       		$scope.cdformdata.etiaSection.etiaValues.splice(0, 0, propertyTaxesETIA);
	       	} else if(i==1 && $scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType != 'HomeownersInsurance') {
				var homeownersInsuranceETIA = {
					"projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType": "HomeownersInsurance",
		        	"projectedPaymentEstimatedTaxesInsuranceAssessmentComponentTypeOtherDescription": "",
		        	"projectedPaymentEscrowedType": "Escrowed"
				};
				$scope.cdformdata.etiaSection.etiaValues.splice(1, 0, homeownersInsuranceETIA);
			} else if($scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType == 'PropertyTaxes' || 
				$scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType == 'HomeownersInsurance') {
				$scope.cdformdata.etiaSection.etiaValues.splice(i, 1);
				i--;
			} else {
				if($scope.cdformdata.etiaSection.etiaTypes.indexOf($scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType)==-1)
				$scope.cdformdata.etiaSection.etiaTypes.push($scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType);
	
			}
		};
		
		$scope.cdformdata.closingInformation.dateIssued = new Date();
		$scope.cdformdata.closingInformation.closingDate = add_business_days($scope.cdformdata.closingInformation.dateIssued, 5);
	}

	initializeCDformData();

	$scope.changeProductInfo = function() {
		if($scope.cdformdata.loanInformation.amortizationType!='Fixed') {
			$scope.cdformdata.loanInformation.isProductAdjustmentinfoPresent = false;
			var productInfo = $scope.cdformdata.loanInformation.productAdjustmentInformation;
			if(productInfo.fixedPeriodMonths) {
				productInfo['fixedPeriodYears'] = productInfo.fixedPeriodMonths/12;
				productInfo['firstChangeStartYear'] = productInfo.fixedPeriodYears+1;
				$scope.cdformdata.loanInformation.isProductAdjustmentinfoPresent = true;
			}
			if(productInfo.firstChangePeriodMonths){
				productInfo['firstChangePeriodYears'] = productInfo.firstChangePeriodMonths/12;
				$scope.cdformdata.loanInformation.isProductAdjustmentinfoPresent = true;
			}
			if(productInfo.subsequentChangePeriodMonths){
				productInfo['subsequentChangePeriodYears'] = productInfo.subsequentChangePeriodMonths/12;
				$scope.cdformdata.loanInformation.isProductAdjustmentinfoPresent = true;
			}
		} else {
			$scope.cdformdata.loanInformation.isProductAdjustmentinfoPresent = false;
		}
	}

	$scope.checkRadio = function() {
		console.log($scope.cdformdata.closingInformation.property.legalDescription);
	}

	$scope.addBorrower = function(){
    	$scope.cdformdata.transactionInformation.borrowerDetails.push(angular.copy(borrower));
    }

    $scope.removeBorrower = function(index){
    	$scope.cdformdata.transactionInformation.borrowerDetails.splice(index,1);
    }

    $scope.addSeller = function(){
    	$scope.cdformdata.transactionInformation.sellerDetails.push(angular.copy(seller));
    }

    $scope.removeSeller = function(index){
    	$scope.cdformdata.transactionInformation.sellerDetails.splice(index,1);
    }

    $scope.addAusTypeIdentifier = function(){
    	$scope.cdformdata.loanInformation.automatedUnderwritings.push(angular.copy(ausTypeIdentifier));
    	$scope.cdformdata.loanInformation.automatedUnderwritings.push(angular.copy(ausTypeIdentifier));
    	$scope.cdformdata.loanInformation.automatedUnderwritings.push(angular.copy(ausTypeIdentifier));
    }

    $scope.removeSeller = function(index){
    	$scope.cdformdata.transactionInformation.sellerDetails.splice(index,1);
    }

    $scope.addETIAComponent = function(){
    	$scope.cdformdata.etiaSection.etiaValues.push(angular.copy(ETIAComponentType));
    	$scope.cdformdata.etiaSection.total = $scope.cdformdata.etiaSection.etiaValues.length;
    }

	$scope.addETIAComponent = function(){
		$scope.cdformdata.etiaSection.etiaValues.push(angular.copy(ETIAComponentType));
		$scope.cdformdata.etiaSection.total = $scope.cdformdata.etiaSection.etiaValues.length;
    }

    $scope.addOrganizationCharges = function(){
    	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.push(angular.copy(originationCharges));
    }

    $scope.addsbDidNotShopFor = function(){
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.push(angular.copy(sbDidNotShopFors));
    }

    $scope.addsbDidShopFor = function(){
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.push(angular.copy(sbDidShopFors));
    }

    $scope.addtOGovtFeesList = function(){
    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.push(angular.copy(tOGovtFeesList));
    }

    $scope.addprepaidsList = function(){
    	$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.push(angular.copy(prepaidsList));
    }
   
    $scope.addiEPatClosingList = function(){
    	$scope.cdformdata.closingCostDetailsOtherCosts.iEPatClosingList.push(angular.copy(iEPatClosingList));
    }

     $scope.addotherCostsList = function(){
    	$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.push(angular.copy(otherCostsList));
    }

	$scope.updateETIAComponentTypes = function(value, index) {
		var previousVal = $scope.cdformdata.etiaSection.etiaTypes[index];
		$scope.cdformdata.etiaSection.etiaTypes[index] = value;
		for(i=0; i<$scope.ETIAComponentTypes.length; i++){
			if($scope.ETIAComponentTypes[i].value == value) {
				$scope.ETIAComponentTypes[i].disabled = true;
			} else if ($scope.ETIAComponentTypes[i].value == previousVal) {
				$scope.ETIAComponentTypes[i].disabled = false;
			}
		}
	}

	/*$scope.originationChargeTotalAmount = function() {
		cdformdata.closingCostDetailsLoanCosts.ocTotalAmount
	}
*/	
	$scope.$watch('cdformdata.closingCostDetailsLoanCosts.originationCharges', function(newValue, oldValue) {
         var originationChargeTotalAmount = 0;
         for(i=0; i<$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.length; i++) {
         	originationChargeTotalAmount += $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpAtClosing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpAtClosing);
         	originationChargeTotalAmount += $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpB4Closing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpB4Closing);
         }
         $scope.cdformdata.closingCostDetailsLoanCosts.ocTotalAmount = originationChargeTotalAmount;
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount = $scope.cdformdata.closingCostDetailsLoanCosts.ocTotalAmount + $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopTotalAmount + $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopTotalAmount;
    }, true);

    $scope.$watch('cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors', function(newValue, oldValue) {
         var sbDidNotShopTotalAmount = 0;
         for(i=0; i<$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.length; i++) {
         	sbDidNotShopTotalAmount += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpAtClosing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpAtClosing);
         	sbDidNotShopTotalAmount += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpB4Closing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpB4Closing);
         }
         $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopTotalAmount = sbDidNotShopTotalAmount;
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount = $scope.cdformdata.closingCostDetailsLoanCosts.ocTotalAmount + $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopTotalAmount + $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopTotalAmount;
    }, true);

    $scope.$watch('cdformdata.closingCostDetailsLoanCosts.sbDidShopFors', function(newValue, oldValue) {
         var sbDidShopTotalAmount = 0;
         for(i=0; i<$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.length; i++) {
         	sbDidShopTotalAmount += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpAtClosing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpAtClosing);
         	sbDidShopTotalAmount += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpB4Closing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpB4Closing);
         }
         $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopTotalAmount = sbDidShopTotalAmount;
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount = $scope.cdformdata.closingCostDetailsLoanCosts.ocTotalAmount + $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopTotalAmount + $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopTotalAmount;
    }, true);
});

//date param of proper format to create date object.
// ex:- 04/25/2008
function add_business_days(date, days) {
  var now = new Date(date);
  var dayOfTheWeek = now.getDay();
  var calendarDays = days;
  var deliveryDay = dayOfTheWeek + days;
  if (deliveryDay >= 6) {
    //deduct this-week days
    days -= 6 - dayOfTheWeek;
    //count this coming weekend
    calendarDays += 2;
    //how many whole weeks?
    deliveryWeeks = Math.floor(days / 5);
    //two days per weekend per week
    calendarDays += deliveryWeeks * 2;
  }
  now.setTime(now.getTime() + calendarDays * 24 * 60 * 60 * 1000);
  return now;
}