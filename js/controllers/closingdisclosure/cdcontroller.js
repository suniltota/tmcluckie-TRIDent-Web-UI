/**
 * Controller for transform function
 */
app.controller('closingDisclosureCtrl', function ($scope, $sce, $filter, staticData, cdService, $routeParams) {

	$scope.loanBasicInfo = staticData.basicLoanInfo;
	$scope.showTab = 'closingInfo';
	$scope.dateFormat = staticData.dateDisplayFormat;
	$scope.dropDownBooleanOptions = staticData.dropDownBooleanOptions;
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
	var borrower ={};
	var seller ={};
	var ausTypeIdentifier = {};

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
		
		if(localStorage.jsonData != undefined) {
			$scope.cdformdata = angular.fromJson(localStorage.jsonData);
			$scope.cdformdata.loanInformation['loanTermYears'] = $scope.cdformdata.loanInformation.loanTerm/12;
			$scope.cdformdata.loanInformation['loanTermMonths'] = $scope.cdformdata.loanInformation.loanTerm%12;
		} else {
			$scope.cdformdata.closingInformation.property.stateCode = $scope.stateCodes[0].code;
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
    $scope.dropDownOptions =  [{model:"", value:""},{model:"true",value:"YES"},{model:"false",value:"NO"}];

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