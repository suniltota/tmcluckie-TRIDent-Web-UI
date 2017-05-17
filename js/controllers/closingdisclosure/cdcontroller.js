/**
 * Controller for transform function
 */
app.controller('closingDisclosureCtrl', function ($scope, $sce, $filter, staticData, cdService) {

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
    $scope.liabilityTypes = staticData.liabilityTypes;
    $scope.adjustmentTypes = staticData.adjustmentTypes;
    $scope.prorationItemTypes = staticData.prorationItemTypes;
    $scope.subordinateLiens = staticData.subordinateLiens;
    $scope.otherCredits = staticData.otherCredits;
    $scope.payeeTypes = staticData.payeeTypes;
    $scope.licenseAuthorityLevelTypes = staticData.licenseAuthorityLevelTypes;
    $scope.repayMethodType = staticData.repayMethodType;
    $scope.repayExemptionReasonType = staticData.repayExemptionReasonType;
    $scope.liabilityadjustments = staticData.liabilityadjustments;
    $scope.payOffTypes = staticData.payOffTypes;
    $scope.indexTypes = staticData.indexTypes;
    $scope.lateChargeTypes = staticData.lateChargeTypes;
    $scope.partialPaymentTypes = staticData.partialPaymentTypes;
    $scope.escrowAbsenceReasons = staticData.escrowAbsenceReasons;
    $scope.paymentFrequencyTypes = staticData.paymentFrequencyTypes;
    $scope.payoffsAndPaymentsTotalAmount = 0;
    $scope.showLenderTolerance = false;
    $scope.toleranceSelection = false;
    $scope.salePriceAmount = 0;
    $scope.payOffTypeSelection = '';
    $scope.stepPaymentIndicator = false;
	var borrower ={};
	var seller ={};
	var ausTypeIdentifier = {};
	var ETIAComponentType = {};
    var originationCharges = {};
    var sbDidNotShopFors = {};
    var sbDidShopFors = {};
    var tOGovtFees = {};
    var recordingFees = [];
    var prepaidsList = {};
    var iEPatClosingList = {};
    var otherCostsList = {};
    var liability= {};
    var adjustment = {};
	var prorationObj = {};
    var payoffsAndPaymentObj = {
          "payOffType":"",
          "displayLabel":"",
          "itemType":"",
          "otherDescription":"",
          "paidToFullName":"",
          "paidByFullName":"",
          "payoffAmount":"",
          "securedIndicator":"",
          "partialPayoffIndicator":"",
          "prepaymentPenaltyAmount":""
    };

	$scope.dateOptions = {
 		formatYear: 'yy',
 		startingDay: 1
 	};

	var initializeCDformData = function() {
		$scope.cdformdata = staticData.cdformdata;
		$scope.cdformdata.termsOfLoan.loanPurposeType = $scope.loanBasicInfo.loanPurposeType;

		borrower = angular.copy($scope.cdformdata.transactionInformation.borrowerDetails[0]);
		seller = angular.copy($scope.cdformdata.transactionInformation.sellerDetails[0]);
		ausTypeIdentifier = angular.copy($scope.cdformdata.loanInformation.automatedUnderwritings[0]);
		ETIAComponentType = angular.copy($scope.cdformdata.etiaSection.etiaValues[0]);
		originationCharges = angular.copy($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[0]);
		sbDidNotShopFors = angular.copy($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[0]);
		sbDidShopFors = angular.copy($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[0]);
		tOGovtFees = angular.copy($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0]);
		prepaidsList = angular.copy($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[0]);
		iEPatClosingList = angular.copy($scope.cdformdata.closingCostDetailsOtherCosts.iEPatClosingList[3]);
		otherCostsList = angular.copy($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[0]);
		liability = angular.copy($scope.cdformdata.liabilityList[0]);
		adjustment = angular.copy($scope.cdformdata.closingAdjustmentItemList[0]);
		prorationObj = angular.copy($scope.cdformdata.prorationsList[0]);
		$scope.cdformdata.closingInformation.propertyValuationDetail.propertyValue = 'Appraised';
        $scope.cdformdata.closingInformation.dateIssued = new Date();
		$scope.cdformdata.closingInformationDetail.closingDate = add_business_days($scope.cdformdata.closingInformation.dateIssued, 5);
		if(localStorage.jsonData != undefined) {
			$scope.cdformdata = angular.fromJson(localStorage.jsonData);
			$scope.cdformdata.loanInformation['loanTermYears'] = $scope.cdformdata.maturityRule.loanMaturityPeriodCount/12;
			$scope.cdformdata.loanInformation['loanTermMonths'] = $scope.cdformdata.maturityRule.loanMaturityPeriodCount%12;
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
		if($scope.cdformdata.etiaSection.etiaValues!=undefined) {
			$scope.cdformdata.etiaSection.etiaValues.splice(0, 0, angular.copy(ETIAComponentType));
			$scope.cdformdata.etiaSection.etiaValues[0].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType = 'PropertyTaxes';

			$scope.cdformdata.etiaSection.etiaValues.splice(1, 0, angular.copy(ETIAComponentType));
			$scope.cdformdata.etiaSection.etiaValues[1].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType = 'HomeownersInsurance';
		}

		for(i=0; i<$scope.cdformdata.etiaSection.etiaValues.length; i++){
			if(i!=0 && $scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType == 'PropertyTaxes') {
				$scope.cdformdata.etiaSection.etiaValues[0] = $scope.cdformdata.etiaSection.etiaValues[i];
				$scope.cdformdata.etiaSection.etiaValues.splice(i, 1);
				i--;
			} else if(i!=1 && $scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType == 'HomeownersInsurance') {
				$scope.cdformdata.etiaSection.etiaValues[1] = $scope.cdformdata.etiaSection.etiaValues[i];
				$scope.cdformdata.etiaSection.etiaValues.splice(i, 1);
				i--;
			} else {
				if($scope.cdformdata.etiaSection.etiaTypes.indexOf($scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType)==-1)
				$scope.cdformdata.etiaSection.etiaTypes.push($scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType);
			}
		};

		if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges!=undefined) {
   			$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.splice(0, 0, angular.copy(originationCharges));
			$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[0].feeType = 'LoanDiscountPoints';
			$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[0].displayLabel = 'Loan Discount Points';
       	}

       	for(i=0; i<$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.length; i++){
			if (i!=0 && $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].feeType == 'LoanDiscountPoints') {
				$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[0] = $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i];
				$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.splice(i, 1);
	       	}
		};

		if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList!=undefined) {
			$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.splice(0, 0, angular.copy(tOGovtFees));
			$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].feeType = 'RecordingFeeForDeed';
			$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].displayLabel = 'Recording Fees';

			$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.splice(1, 0, angular.copy(tOGovtFees));
			$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[1].feeType = 'RecordingFeeForMortgage';
			$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[1].displayLabel = 'Recording Fees';

			$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.splice(2, 0, angular.copy(tOGovtFees));
			$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[2].feeType = 'RecordingFeeTotal';
			$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[2].displayLabel = 'Recording Fees Total';
		}

		for(i=0; i<$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.length; i++){
			if(i!=0 && $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType == 'RecordingFeeForDeed') {
				$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0] = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i];
				$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.splice(i, 1);
				i--;
			} else if(i!=1 && $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType == 'RecordingFeeForMortgage') {
				$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[1] = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i];
				$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.splice(i, 1);
				i--;
			} else if(i!=2 && $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType == 'RecordingFeeTotal') {
				$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[2] = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i];
				$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.splice(i, 1);
				i--;
			}
		};

		if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList!=undefined) {
			$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.splice(0, 0, angular.copy(prepaidsList));
			$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[0].prepaidItemType = 'PrepaidInterest';
			$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[0].displayLabelText = 'Prepaid Interest';
			
			$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.splice(1, 0, angular.copy(prepaidsList));
			$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[1].prepaidItemType = 'HomeownersInsurancePremium';
			$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[1].displayLabelText = 'Homeowners Insurance Premium';

       		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.splice(2, 0, angular.copy(prepaidsList));
			$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[2].prepaidItemType = 'MortgageInsurancePremium';
			$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[2].displayLabelText = 'Mortgage Insurance Premium';

       		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.splice(3, 0, angular.copy(prepaidsList));
			$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[3].prepaidItemType = 'CountyPropertyTax';
			$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[3].displayLabelText = 'Property Taxes';

		}

		for(i=0; i<$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.length; i++){
			if (i!=0 && $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType == 'PrepaidInterest') {
				$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[0] = $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i];
				$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.splice(i, 1);
	       	} else if (i!=1 && $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType == 'HomeownersInsurancePremium') {
				$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[1] = $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i];
				$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.splice(i, 1);
	       	} else if (i!=2 && $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType == 'MortgageInsurancePremium') {
				$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[2] = $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i];
				$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.splice(i, 1);
	       	} else if (i!=3 && $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType == 'CountyPropertyTax') {
				$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[3] = $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i];
				$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.splice(i, 1);
	       	}
		};


		// Summaries of Tranaction
		if($scope.cdformdata.salesContractDetail.saleContractAmount)
			$scope.salePriceAmount = $scope.cdformdata.salesContractDetail.saleContractAmount;
		else if($scope.cdformdata.salesContractDetail.realPropertyAmount)
			$scope.salePriceAmount = $scope.cdformdata.salesContractDetail.realPropertyAmount;
		else
			$scope.salePriceAmount = 0;

		$scope.cdformdata.liabilities = angular.copy($scope.cdformdata.liabilityList);
		$scope.cdformdata.adjustments = angular.copy($scope.cdformdata.closingAdjustmentItemList);
		$scope.cdformdata.prorations = angular.copy($scope.cdformdata.prorationsList);
		$scope.cdformdata.liabilityList = [];
		$scope.cdformdata.closingAdjustmentItemList = [];
		$scope.cdformdata.prorationsList = [];

		var dueFromBrwLiabilities = [];
		var dueToSellerLiabilities = [];
		var dueFromSellerLiabilities = [];
		var dueFromBrwAdjustments = [];
		var paidAlreadyByAdjustments = [];
		var dueToSellerAdjustments = [];
		var dueFromSellerAdjustments = [];
		var dueFromBrwAdjustmentsPaidBySeller = [];

		for(i=0; i<$scope.cdformdata.liabilities.length; i++) {
			if($scope.cdformdata.liabilities[i].integratedDisclosureSectionType == 'DueFromBorrowerAtClosing') {
				dueFromBrwLiabilities.push($scope.cdformdata.liabilities[i]);
				$scope.cdformdata.liabilities.splice(i,1);
				i--;
			} else if($scope.cdformdata.liabilities[i].integratedDisclosureSectionType == 'DueToSellerAtClosing') {
				dueToSellerLiabilities.push($scope.cdformdata.liabilities[i]);
				$scope.cdformdata.liabilities.splice(i,1);
				i--;
			} else if($scope.cdformdata.liabilities[i].integratedDisclosureSectionType == 'DueFromSellerAtClosing') {
				dueFromSellerLiabilities.push($scope.cdformdata.liabilities[i]);
				$scope.cdformdata.liabilities.splice(i,1);
				i--;
			}
		}
		for(i=0; i<$scope.cdformdata.adjustments.length; i++) {
			if($scope.cdformdata.adjustments[i].integratedDisclosureSectionType == 'DueFromBorrowerAtClosing') {
				dueFromBrwAdjustments.push($scope.cdformdata.adjustments[i]);
				$scope.cdformdata.adjustments.splice(i,1);
				i--;
			} else if($scope.cdformdata.adjustments[i].integratedDisclosureSectionType == 'DueToSellerAtClosing') {
				dueToSellerAdjustments.push($scope.cdformdata.adjustments[i]);
				$scope.cdformdata.adjustments.splice(i,1);
				i--;
			} else if($scope.cdformdata.adjustments[i].integratedDisclosureSectionType == 'DueFromSellerAtClosing') {
				dueFromSellerAdjustments.push($scope.cdformdata.adjustments[i]);
				$scope.cdformdata.adjustments.splice(i,1);
				i--;
			} else if($scope.cdformdata.adjustments[i].integratedDisclosureSectionType == 'PaidAlreadyByOrOnBehalfOfBorrowerAtClosing') {
				paidAlreadyByAdjustments.push($scope.cdformdata.adjustments[i]);
				$scope.cdformdata.adjustments.splice(i,1);
				i--;
			}
		}
		
		if(dueFromBrwLiabilities.length > 3) {
			dueFromBrwLiabilities = dueFromBrwLiabilities.splice(0, 3);
		}
		for(i=dueFromBrwLiabilities.length; i<3; i++) {
			var dueFromBrwLiabilityType = angular.copy(liability);
			dueFromBrwLiabilityType.integratedDisclosureSectionType='DueFromBorrowerAtClosing';
			dueFromBrwLiabilities.push(dueFromBrwLiabilityType);
		}
		$scope.cdformdata.liabilityList.push.apply($scope.cdformdata.liabilityList, dueFromBrwLiabilities);
		if(dueFromBrwAdjustments.length > 2) {
			dueFromBrwAdjustments = dueFromBrwAdjustments.splice(0, 2);
		}
		for(i=dueFromBrwAdjustments.length; i<2; i++) {
			var dueFromBrwAdjustmentType = angular.copy(adjustment);
			dueFromBrwAdjustmentType.integratedDisclosureSectionType='DueFromBorrowerAtClosing';
			dueFromBrwAdjustments.push(dueFromBrwAdjustmentType);
		}
		$scope.cdformdata.closingAdjustmentItemList.push.apply($scope.cdformdata.closingAdjustmentItemList, dueFromBrwAdjustments);

		if(dueFromBrwAdjustmentsPaidBySeller!=undefined) {
			dueFromBrwAdjustmentsPaidBySeller.splice(0, 0, angular.copy(prorationObj));
			dueFromBrwAdjustmentsPaidBySeller[0].prorationItemType = 'CityPropertyTax';
			dueFromBrwAdjustmentsPaidBySeller[0].displayLabel = 'City/Town Taxes';
			dueFromBrwAdjustmentsPaidBySeller[0].integratedDisclosureSectionType = 'DueFromBorrowerAtClosing';
			dueFromBrwAdjustmentsPaidBySeller[0].integratedDisclosureSubsectionType = 'AdjustmentsForItemsPaidBySellerInAdvance';
			
			dueFromBrwAdjustmentsPaidBySeller.splice(1, 0, angular.copy(prorationObj));
			dueFromBrwAdjustmentsPaidBySeller[1].prorationItemType = 'CountyPropertyTax';
			dueFromBrwAdjustmentsPaidBySeller[1].displayLabel = 'County Taxes';
			dueFromBrwAdjustmentsPaidBySeller[1].integratedDisclosureSectionType = 'DueFromBorrowerAtClosing';
			dueFromBrwAdjustmentsPaidBySeller[1].integratedDisclosureSubsectionType = 'AdjustmentsForItemsPaidBySellerInAdvance';

			dueFromBrwAdjustmentsPaidBySeller.splice(2, 0, angular.copy(prorationObj));
			dueFromBrwAdjustmentsPaidBySeller[2].displayLabel = 'Assessments';
			dueFromBrwAdjustmentsPaidBySeller[2].integratedDisclosureSectionType = 'DueFromBorrowerAtClosing';
			dueFromBrwAdjustmentsPaidBySeller[2].integratedDisclosureSubsectionType = 'AdjustmentsForItemsPaidBySellerInAdvance';
		}

		for(i=0; i<$scope.cdformdata.prorations.length; i++){
			if($scope.cdformdata.prorations[i].integratedDisclosureSectionType == 'DueFromBorrowerAtClosing' && 
				$scope.cdformdata.prorations[i].integratedDisclosureSubsectionType == 'AdjustmentsForItemsPaidBySellerInAdvance') {
				if($scope.cdformdata.prorations[i].prorationItemType == 'CityPropertyTax' || $scope.cdformdata.prorations[i].prorationItemType == 'DistrictPropertyTax' || $scope.cdformdata.prorations[i].prorationItemType == 'TownPropertyTax') {
					dueFromBrwAdjustmentsPaidBySeller[0] = $scope.cdformdata.prorations[i];
					dueFromBrwAdjustmentsPaidBySeller[0].displayLabel = 'City/Town Taxes';
					$scope.cdformdata.prorations.splice(i,1);
					i--;
				} else if($scope.cdformdata.prorations[i].prorationItemType == 'BoroughPropertyTax' || $scope.cdformdata.prorations[i].prorationItemType == 'CountyPropertyTax') {
					dueFromBrwAdjustmentsPaidBySeller[1] = $scope.cdformdata.prorations[i];
					dueFromBrwAdjustmentsPaidBySeller[1].displayLabel = 'County Taxes';
					$scope.cdformdata.prorations.splice(i,1);
					i--;
				} else if($scope.cdformdata.prorations[i].prorationItemType == 'CondominiumAssociationSpecialAssessment' || $scope.cdformdata.prorations[i].prorationItemType == 'CooperativeAssociationSpecialAssessment' || $scope.cdformdata.prorations[i].prorationItemType == 'HomeownersAssociationSpecialAssessment') {
					dueFromBrwAdjustmentsPaidBySeller[2] = $scope.cdformdata.prorations[i];
					dueFromBrwAdjustmentsPaidBySeller[2].displayLabel = 'Assessments';
					$scope.cdformdata.prorations.splice(i,1);
					i--;
				} else {
					dueFromBrwAdjustmentsPaidBySeller.push($scope.cdformdata.prorations[i]);
				}
			}
		};
		for(i=dueFromBrwAdjustmentsPaidBySeller.length; i<7; i++) {
			var prorationItem = angular.copy(prorationObj);
			prorationItem.integratedDisclosureSectionType = 'DueFromBorrowerAtClosing';
			prorationItem.integratedDisclosureSubsectionType = 'AdjustmentsForItemsPaidBySellerInAdvance';
			dueFromBrwAdjustmentsPaidBySeller.push(prorationItem);
		}
		$scope.cdformdata.prorationsList.push.apply($scope.cdformdata.prorationsList, dueFromBrwAdjustmentsPaidBySeller);

		/*/PaidAlreadyByOrOnBehalfOfBorrowerAtClosing
        var paidAlreadyBrwAtClosingAdjustmentTypes = [];

        paidAlreadyBrwAtClosingAdjustmentTypes = $scope.cdformdata.closingAdjustmentItemList.filter(function(item){
		    return item.integratedDisclosureSectionType == 'PaidAlreadyByOrOnBehalfOfBorrowerAtClosing'
		});
		for(i=dueFromBrwAdjustmentTypes.length; i<3; i++) {
			var paidAlreadyBrwAtClosingAdjustmentType = angular.copy(liability);
			paidAlreadyBrwAtClosingAdjustmentType.integratedDisclosureSectionType='PaidAlreadyByOrOnBehalfOfBorrowerAtClosing';
			$scope.cdformdata.closingAdjustmentItemList.push(paidAlreadyBrwAtClosingAdjustmentType);
		}
        
        var dueToSellerAtClosing =[];

        dueToSellerAtClosing = $scope.cdformdata.closingAdjustmentItemList.filter(function(item){
		    return item.integratedDisclosureSectionType == 'DueToSellerAtClosing'
		});

		for(i=0;i<dueToSellerAtClosing.length;i++){
			for(j=0;j<dueFromBrwAdjustmentTypes.length;j++){
				if(dueToSellerAtClosing[i].closingAdjustmentItemType == dueFromBrwAdjustmentTypes[j].closingAdjustmentItemType){
					dueToSellerAtClosing.splice(i,1);
				}
			}
		}
        /*for(k=0;k<$scope.cdformdata.closingAdjustmentItemList.length;k++){
        	if($scope.cdformdata.summariesofTransactions.closingAdjustmentItemList[k].integratedDisclosureSectionType == 'DueToSellerAtClosing'){
        		$scope.cdformdata.summariesofTransactions.closingAdjustmentItemList[k].splice(k,1);
        	}
        }*/

		$scope.payoffsAndPaymentsList = [];
		for(i=0; i<$scope.cdformdata.liabilityList.length; i++) {
			if($scope.cdformdata.liabilityList[i].integratedDisclosureSectionType == 'PayoffsAndPayments')
			{
				var payoffLiability = angular.copy(payoffsAndPaymentObj);
				payoffLiability.payOffType = 'Liability';
				payoffLiability.displayLabel = $scope.cdformdata.liabilityList[i].displayLabel;
				payoffLiability.itemType = $scope.cdformdata.liabilityList[i].liabilityType;
				payoffLiability.otherDescription = $scope.cdformdata.liabilityList[i].liabilityTypeOtherDescription;
				payoffLiability.paidToFullName = $scope.cdformdata.liabilityList[i].liabilityHolderFullName;
				payoffLiability.securedIndicator = $scope.cdformdata.liabilityList[i].liabilitySecuredBySubjectPropertyIndicator;
				//payoffLiability.partialPayoffIndicator = $scope.cdformdata.liabilityList[i].liabilitypartialPayoffIndicator;
				payoffLiability.payoffAmount = $scope.cdformdata.liabilityList[i].payoffAmount;
	            payoffLiability.prepaymentPenaltyAmount = $scope.cdformdata.liabilityList[i].payoffPrepaymentPenaltyAmount;
				$scope.payoffsAndPaymentsList.push(payoffLiability);
		    }
		}
      	for(i=0; i<$scope.cdformdata.closingAdjustmentItemList.length; i++) {
			if($scope.cdformdata.closingAdjustmentItemList[i].integratedDisclosureSectionType == 'PayoffsAndPayments')
			{
				var payoffAdjustment = angular.copy(payoffsAndPaymentObj);
				payoffAdjustment.payOffType = 'Adjustment';
				payoffAdjustment.displayLabel = $scope.cdformdata.closingAdjustmentItemList[i].displayLabel;
				payoffAdjustment.itemType = $scope.cdformdata.closingAdjustmentItemList[i].closingAdjustmentItemType;
				payoffAdjustment.otherDescription = $scope.cdformdata.closingAdjustmentItemList[i].closingAdjustmentItemTypeOtherDescription;
				payoffAdjustment.paidToFullName = $scope.cdformdata.closingAdjustmentItemList[i].paidToEntityFullName;
				if($scope.cdformdata.closingAdjustmentItemList[i].paidByIndividualFullName != '' && $scope.cdformdata.closingAdjustmentItemList[i].paidByIndividualFullName != null){
				    payoffAdjustment.paidByFullName = $scope.cdformdata.closingAdjustmentItemList[i].paidByIndividualFullName;
				}
				else if($scope.cdformdata.closingAdjustmentItemList[i].paidByEntityFullName != '' && $scope.cdformdata.closingAdjustmentItemList[i].paidByEntityFullName != null){
					payoffAdjustment.paidByFullName = $scope.cdformdata.closingAdjustmentItemList[i].paidByEntityFullName;
				} 
				payoffAdjustment.payoffAmount = $scope.cdformdata.closingAdjustmentItemList[i].closingAdjustmentItemAmount;
				$scope.payoffsAndPaymentsList.push(payoffAdjustment);
		    }
		}

		if($scope.payoffsAndPaymentsList.length==0) {
			$scope.payoffsAndPaymentsList.push(angular.copy(payoffsAndPaymentObj));
		}

		setTimeout(function(){$("#spinner").hide();}, 3000);
		
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
    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.push(angular.copy(tOGovtFees));
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

    $scope.addDueFromBrwLiability = function(){
    	$scope.cdformdata.liabilityList.push(angular.copy(dueFromBrwLiabilityType));
    }
	$scope.changeTab = function(tabName){
    	$scope.showTab = tabName;
    }
    $scope.addPayOff = function(){
    	$scope.payoffsAndPaymentsList.push(angular.copy(payoffsAndPaymentObj));
    }
    $scope.deleteField = function(index){
    	$scope.payoffsAndPaymentsList.splice(index,1);
    }
    $scope.amortizationChange = function(){
    	if($scope.cdformdata.loanInformation.amortizationType == 'Step' ){
			$scope.stepPaymentIndicator = true;
		}
		else{
			$scope.stepPaymentIndicator = false;
		}
    }
    $scope.constructionChange = function(){
    	if($scope.cdformdata.loanDetail.constructionLoanIndicator == false){
    		$scope.cdformdata.construction.constructionLoanType ='';
    	}
    }
    $scope.negativeAmortizationChange = function(){
    	if($scope.cdformdata.loanDetail.negativeAmortizationIndicator == false){
    		$scope.cdformdata.negativeAmortization.negativeAmortizationType ='';
    	}
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
    
	$scope.calculateCash = function(){
		var totalEstimatedAmount = 0;
		if($scope.cdformdata.cashToCloses.totalClosingCosts != null)
		totalEstimatedAmount += $scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount);
    	if($scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing != null)
    	totalEstimatedAmount += $scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemEstimatedAmount);
		if($scope.cdformdata.cashToCloses.deposit != null)
		totalEstimatedAmount += $scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemEstimatedAmount);
    	if($scope.cdformdata.cashToCloses.sellerCredits != null)
    	totalEstimatedAmount += $scope.cdformdata.cashToCloses.sellerCredits.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.sellerCredits.integratedDisclosureCashToCloseItemEstimatedAmount);
    	if($scope.cdformdata.cashToCloses.loanAmount != null)
    	totalEstimatedAmount += $scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemEstimatedAmount);
    	if($scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits != null)
    	totalEstimatedAmount += $scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemEstimatedAmount);
    	if($scope.cdformdata.cashToCloses.totalPayoffsAndPayments != null)
    	totalEstimatedAmount += $scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemEstimatedAmount);
	    $scope.cdformdata.cashToCloses.cashToCloseTotal[0].integratedDisclosureCashToCloseItemEstimatedAmount = totalEstimatedAmount;
	}

    $scope.clearCalculations = function(){
    	$scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemEstimatedAmount = '';
    	$scope.cdformdata.cashToCloses.sellerCredits.integratedDisclosureCashToCloseItemEstimatedAmount = '';
    	$scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemEstimatedAmount = '';
    	$scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemEstimatedAmount = '';
    }
    
    $scope.lenderTolerance = function(){
    	if($scope.cdformdata.closingCostsTotal.lenderCredits!='0.00' && $scope.cdformdata.closingCostsTotal.lenderCredits!='0' && $scope.cdformdata.closingCostsTotal.lenderCredits!='' && $scope.cdformdata.closingCostsTotal.lenderCredits!=null){
            $scope.showLenderTolerance = true;
            $scope.toleranceSelection = false;
    	}
    	else{
    		$scope.showLenderTolerance = false;
    		$scope.toleranceSelection = false;
    		$scope.cdformdata.closingCostsTotal.lenderCreditToleranceCureAmount = '';
    	}
    }

	var bpAtClosing = {
		'originationChargeTotalbpAtClosing' : 0,
		'sbDidNotShopTotalbpAtClosing' : 0,
		'sbDidShopTotalbpAtClosing' : 0,
		'tOGovtFeesTotalbpAtClosing' : 0,
		'prepaidsTotalbpAtClosing' : 0,
		'iEPatClosingTotalbpAtClosing' : 0,
		'otherTotalbpAtClosing' : 0
	};
	var bpB4Closing = {
		'originationChargeTotalbpB4Closing' : 0,
		'sbDidNotShopTotalbpB4Closing' : 0,
		'sbDidShopTotalbpB4Closing' : 0,
		'tOGovtFeesTotalbpB4Closing' : 0,
		'prepaidsTotalbpB4Closing' : 0,
		'iEPatClosingTotalbpB4Closing' : 0,
		'otherTotalbpB4Closing' : 0
	};
	var spAtClosing = {
		'originationChargeTotalspAtClosing' : 0,
		'sbDidNotShopTotalspAtClosing' : 0,
		'sbDidShopTotalspAtClosing' : 0,
		'tOGovtFeesTotalspAtClosing' : 0,
		'prepaidsTotalspAtClosing' : 0,
		'iEPatClosingTotalspAtClosing' : 0,
		'otherTotalspAtClosing' : 0
	};
	var spB4Closing = {
		'originationChargeTotalspB4Closing' : 0,
		'sbDidNotShopTotalspB4Closing' : 0,
		'sbDidShopTotalspB4Closing' : 0,
		'tOGovtFeesTotalspB4Closing' : 0,
		'prepaidsTotalspB4Closing' : 0,
		'iEPatClosingTotalspB4Closing' : 0,
		'otherTotalspB4Closing' : 0
	};
	var paidByOthers = {
		'originationChargeTotalpaidByOthers' : 0,
		'sbDidNotShopTotalpaidByOthers' : 0,
		'sbDidShopTotalpaidByOthers' : 0,
		'tOGovtFeesTotalpaidByOthers' : 0,
		'prepaidsTotalpaidByOthers' : 0,
		'iEPatClosingTotalpaidByOthers' : 0,
		'otherTotalpaidByOthers' : 0
	};

	//This watch will trigger any change happens in the amount of 
	$scope.$watch('cdformdata.closingCostDetailsLoanCosts.originationCharges', function(newValue, oldValue) {
		 bpAtClosing.originationChargeTotalbpAtClosing = 0;
		 bpB4Closing.originationChargeTotalbpB4Closing = 0;
		 spAtClosing.originationChargeTotalspAtClosing = 0;
		 spB4Closing.originationChargeTotalspB4Closing = 0;
		 paidByOthers.originationChargeTotalpaidByOthers = 0;

         for(i=0; i<$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.length; i++) {
         	bpAtClosing.originationChargeTotalbpAtClosing += $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpAtClosing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpAtClosing);
         	bpB4Closing.originationChargeTotalbpB4Closing += $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpB4Closing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpB4Closing);
         	spAtClosing.originationChargeTotalspAtClosing += $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spAtClosing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spAtClosing);
          	spB4Closing.originationChargeTotalspB4Closing += $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spB4Closing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spB4Closing);
          	paidByOthers.originationChargeTotalpaidByOthers += $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].paidByOthers == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].paidByOthers);
         }

         $scope.cdformdata.closingCostDetailsLoanCosts.ocTotalAmount = bpAtClosing.originationChargeTotalbpAtClosing + bpB4Closing.originationChargeTotalbpB4Closing;
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpAtClosing = parseFloat(bpAtClosing.originationChargeTotalbpAtClosing) + parseFloat(bpAtClosing.sbDidNotShopTotalbpAtClosing) + parseFloat(bpAtClosing.sbDidShopTotalbpAtClosing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpB4Closing = parseFloat(bpB4Closing.originationChargeTotalbpB4Closing) + parseFloat(bpB4Closing.sbDidNotShopTotalbpB4Closing) + parseFloat(bpB4Closing.sbDidShopTotalbpB4Closing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spAtClosing = parseFloat(spAtClosing.originationChargeTotalspAtClosing) + parseFloat(spAtClosing.sbDidNotShopTotalspAtClosing) + parseFloat(spAtClosing.sbDidShopTotalspAtClosing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spB4Closing = parseFloat(spB4Closing.originationChargeTotalspB4Closing) + parseFloat(spB4Closing.sbDidNotShopTotalspB4Closing) + parseFloat(spB4Closing.sbDidShopTotalspB4Closing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers = parseFloat(paidByOthers.originationChargeTotalpaidByOthers) + parseFloat(paidByOthers.sbDidNotShopTotalpaidByOthers) + parseFloat(paidByOthers.sbDidShopTotalpaidByOthers);
         
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount = $scope.cdformdata.closingCostDetailsLoanCosts.ocTotalAmount + $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopTotalAmount + $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopTotalAmount;
         $scope.cdformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpB4Closing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpB4Closing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spB4Closing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spB4Closing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.paidByOthers = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers);
         
    }, true);

    $scope.$watch('cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors', function(newValue, oldValue) {
    	 bpAtClosing.sbDidNotShopTotalbpAtClosing = 0;
    	 bpB4Closing.sbDidNotShopTotalbpB4Closing = 0;
    	 spAtClosing.sbDidNotShopTotalspAtClosing = 0;
		 spB4Closing.sbDidNotShopTotalspB4Closing = 0;
		 paidByOthers.sbDidNotShopTotalpaidByOthers = 0;

         for(i=0; i<$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.length; i++) {
         	bpAtClosing.sbDidNotShopTotalbpAtClosing += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpAtClosing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpAtClosing);
         	bpB4Closing.sbDidNotShopTotalbpB4Closing += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpB4Closing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpB4Closing);
         	spAtClosing.sbDidNotShopTotalspAtClosing += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spAtClosing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spAtClosing);
          	spB4Closing.sbDidNotShopTotalspB4Closing += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spB4Closing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spB4Closing);
          	paidByOthers.sbDidNotShopTotalpaidByOthers += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].paidByOthers == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].paidByOthers);
         }
         $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopTotalAmount = bpAtClosing.sbDidNotShopTotalbpAtClosing + bpB4Closing.sbDidNotShopTotalbpB4Closing;
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpAtClosing = parseFloat(bpAtClosing.originationChargeTotalbpAtClosing) + parseFloat(bpAtClosing.sbDidNotShopTotalbpAtClosing) + parseFloat(bpAtClosing.sbDidShopTotalbpAtClosing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpB4Closing = parseFloat(bpB4Closing.originationChargeTotalbpB4Closing) + parseFloat(bpB4Closing.sbDidNotShopTotalbpB4Closing) + parseFloat(bpB4Closing.sbDidShopTotalbpB4Closing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spAtClosing = parseFloat(spAtClosing.originationChargeTotalspAtClosing) + parseFloat(spAtClosing.sbDidNotShopTotalspAtClosing) + parseFloat(spAtClosing.sbDidShopTotalspAtClosing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spB4Closing = parseFloat(spB4Closing.originationChargeTotalspB4Closing) + parseFloat(spB4Closing.sbDidNotShopTotalspB4Closing) + parseFloat(spB4Closing.sbDidShopTotalspB4Closing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers = parseFloat(paidByOthers.originationChargeTotalpaidByOthers) + parseFloat(paidByOthers.sbDidNotShopTotalpaidByOthers) + parseFloat(paidByOthers.sbDidShopTotalpaidByOthers);
         
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount = $scope.cdformdata.closingCostDetailsLoanCosts.ocTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount;
         $scope.cdformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpB4Closing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpB4Closing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spB4Closing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spB4Closing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.paidByOthers = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers);
    }, true);

    $scope.$watch('cdformdata.closingCostDetailsLoanCosts.sbDidShopFors', function(newValue, oldValue) {
    	 bpAtClosing.sbDidShopTotalbpAtClosing = 0;
    	 bpB4Closing.sbDidShopTotalbpB4Closing = 0;
    	 spAtClosing.sbDidShopTotalspAtClosing = 0;
		 spB4Closing.sbDidShopTotalspB4Closing = 0;
		 paidByOthers.sbDidShopTotalpaidByOthers = 0;

         for(i=0; i<$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.length; i++) {
         	bpAtClosing.sbDidShopTotalbpAtClosing += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpAtClosing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpAtClosing);
         	bpB4Closing.sbDidShopTotalbpB4Closing += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpB4Closing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpB4Closing);
         	spAtClosing.sbDidShopTotalspAtClosing += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spAtClosing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spAtClosing);
          	spB4Closing.sbDidShopTotalspB4Closing += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spB4Closing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spB4Closing);
          	paidByOthers.sbDidShopTotalpaidByOthers += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].paidByOthers == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].paidByOthers);
        }
         $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopTotalAmount = bpAtClosing.sbDidShopTotalbpAtClosing + bpB4Closing.sbDidShopTotalbpB4Closing;
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpAtClosing = parseFloat(bpAtClosing.originationChargeTotalbpAtClosing) + parseFloat(bpAtClosing.sbDidNotShopTotalbpAtClosing) + parseFloat(bpAtClosing.sbDidShopTotalbpAtClosing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpB4Closing = parseFloat(bpB4Closing.originationChargeTotalbpB4Closing) + parseFloat(bpB4Closing.sbDidNotShopTotalbpB4Closing) + parseFloat(bpB4Closing.sbDidShopTotalbpB4Closing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spAtClosing = parseFloat(spAtClosing.originationChargeTotalspAtClosing) + parseFloat(spAtClosing.sbDidNotShopTotalspAtClosing) + parseFloat(spAtClosing.sbDidShopTotalspAtClosing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spB4Closing = parseFloat(spB4Closing.originationChargeTotalspB4Closing) + parseFloat(spB4Closing.sbDidNotShopTotalspB4Closing) + parseFloat(spB4Closing.sbDidShopTotalspB4Closing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers = parseFloat(paidByOthers.originationChargeTotalpaidByOthers) + parseFloat(paidByOthers.sbDidNotShopTotalpaidByOthers) + parseFloat(paidByOthers.sbDidShopTotalpaidByOthers);
         
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount = $scope.cdformdata.closingCostDetailsLoanCosts.ocTotalAmount + $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopTotalAmount + $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopTotalAmount;
         $scope.cdformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpB4Closing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpB4Closing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spB4Closing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spB4Closing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.paidByOthers = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers);
    }, true);

    $scope.$watch('cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList', function(newValue, oldValue) {
		 bpAtClosing.tOGovtFeesTotalbpAtClosing = 0;
		 bpB4Closing.tOGovtFeesTotalbpB4Closing = 0;
		 spAtClosing.tOGovtFeesTotalspAtClosing = 0;
		 spB4Closing.tOGovtFeesTotalspB4Closing = 0;
		 paidByOthers.tOGovtFeesTotalpaidByOthers = 0;

         for(i=0; i<$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.length; i++) {
         	bpAtClosing.tOGovtFeesTotalbpAtClosing += $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpAtClosing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpAtClosing);
         	bpB4Closing.tOGovtFeesTotalbpB4Closing += $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpB4Closing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpB4Closing);
         	spAtClosing.tOGovtFeesTotalspAtClosing += $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].spAtClosing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].spAtClosing);
          	spB4Closing.tOGovtFeesTotalspB4Closing += $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].spB4Closing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].spB4Closing);
          	paidByOthers.tOGovtFeesTotalpaidByOthers += $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].paidByOthers == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].paidByOthers);
         }

         $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount = bpAtClosing.tOGovtFeesTotalbpAtClosing + bpB4Closing.tOGovtFeesTotalbpB4Closing;
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing = parseFloat(bpAtClosing.tOGovtFeesTotalbpAtClosing) + parseFloat(bpAtClosing.prepaidsTotalbpAtClosing) + parseFloat(bpAtClosing.iEPatClosingTotalbpAtClosing) + parseFloat(bpAtClosing.otherTotalbpAtClosing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpB4Closing = parseFloat(bpB4Closing.tOGovtFeesTotalbpB4Closing) + parseFloat(bpB4Closing.prepaidsTotalbpB4Closing) + parseFloat(bpB4Closing.iEPatClosingTotalbpB4Closing) + parseFloat(bpB4Closing.otherTotalbpB4Closing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing = parseFloat(spAtClosing.tOGovtFeesTotalbpAtClosing) + parseFloat(spAtClosing.prepaidsTotalbpAtClosing) + parseFloat(spAtClosing.iEPatClosingTotalbpAtClosing) + parseFloat(spAtClosing.otherTotalbpB4Closing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spB4Closing = parseFloat(spB4Closing.tOGovtFeesTotalbpAtClosing) + parseFloat(spB4Closing.prepaidsTotalbpAtClosing) + parseFloat(spB4Closing.iEPatClosingTotalbpAtClosing) + parseFloat(spB4Closing.otherTotalbpB4Closing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers = parseFloat(paidByOthers.tOGovtFeesTotalbpAtClosing) + parseFloat(paidByOthers.prepaidsTotalbpAtClosing) + parseFloat(paidByOthers.iEPatClosingTotalbpAtClosing) + parseFloat(paidByOthers.otherTotalbpB4Closing);
         
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.iEPatClosingTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.otherTotalAmount;
         $scope.cdformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpB4Closing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpB4Closing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spB4Closing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spB4Closing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.paidByOthers = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers);
    }, true);

    $scope.$watch('cdformdata.closingCostDetailsOtherCosts.prepaidsList', function(newValue, oldValue) {
		 bpAtClosing.prepaidsTotalbpAtClosing = 0;
		 bpB4Closing.prepaidsTotalbpB4Closing = 0;
		 spAtClosing.prepaidsTotalspAtClosing = 0;
		 spB4Closing.prepaidsTotalspB4Closing = 0;
		 paidByOthers.prepaidsTotalpaidByOthers = 0;

         for(i=0; i<$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.length; i++) {
         	bpAtClosing.prepaidsTotalbpAtClosing += $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpAtClosing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpAtClosing);
         	bpB4Closing.prepaidsTotalbpB4Closing += $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpB4Closing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpB4Closing);
         	spAtClosing.prepaidsTotalspAtClosing += $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spAtClosing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spAtClosing);
          	spB4Closing.prepaidsTotalspB4Closing += $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spB4Closing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spB4Closing);
          	paidByOthers.prepaidsTotalpaidByOthers += $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].paidByOthers == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].paidByOthers);
         }

         $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount = bpAtClosing.prepaidsTotalbpAtClosing + bpB4Closing.prepaidsTotalbpB4Closing;
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing = parseFloat(bpAtClosing.tOGovtFeesTotalbpAtClosing) + parseFloat(bpAtClosing.prepaidsTotalbpAtClosing) + parseFloat(bpAtClosing.iEPatClosingTotalbpAtClosing) + parseFloat(bpAtClosing.otherTotalbpAtClosing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpB4Closing = parseFloat(bpB4Closing.tOGovtFeesTotalbpB4Closing) + parseFloat(bpB4Closing.prepaidsTotalbpB4Closing) + parseFloat(bpB4Closing.iEPatClosingTotalbpB4Closing) + parseFloat(bpB4Closing.otherTotalbpB4Closing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing = parseFloat(spAtClosing.tOGovtFeesTotalbpAtClosing) + parseFloat(spAtClosing.prepaidsTotalbpAtClosing) + parseFloat(spAtClosing.iEPatClosingTotalbpAtClosing) + parseFloat(spAtClosing.otherTotalbpB4Closing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spB4Closing = parseFloat(spB4Closing.tOGovtFeesTotalbpAtClosing) + parseFloat(spB4Closing.prepaidsTotalbpAtClosing) + parseFloat(spB4Closing.iEPatClosingTotalbpAtClosing) + parseFloat(spB4Closing.otherTotalbpB4Closing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers = parseFloat(paidByOthers.tOGovtFeesTotalbpAtClosing) + parseFloat(paidByOthers.prepaidsTotalbpAtClosing) + parseFloat(paidByOthers.iEPatClosingTotalbpAtClosing) + parseFloat(paidByOthers.otherTotalbpB4Closing);
         
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.iEPatClosingTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.otherTotalAmount;
         $scope.cdformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpB4Closing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpB4Closing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spB4Closing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spB4Closing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.paidByOthers = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers);
    }, true);

    $scope.$watch('cdformdata.closingCostDetailsOtherCosts.iEPatClosingList', function(newValue, oldValue) {
		 bpAtClosing.iEPatClosingTotalbpAtClosing = 0;
		 bpB4Closing.iEPatClosingTotalbpB4Closing = 0;
		 spAtClosing.iEPatClosingTotalspAtClosing = 0;
		 spB4Closing.iEPatClosingTotalspB4Closing = 0;
		 paidByOthers.iEPatClosingTotalpaidByOthers = 0;

         for(i=0; i<$scope.cdformdata.closingCostDetailsOtherCosts.iEPatClosingList.length; i++) {
         	bpAtClosing.iEPatClosingTotalbpAtClosing += $scope.cdformdata.closingCostDetailsOtherCosts.iEPatClosingList[i].bpAtClosing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.iEPatClosingList[i].bpAtClosing);
         	bpB4Closing.iEPatClosingTotalbpB4Closing += $scope.cdformdata.closingCostDetailsOtherCosts.iEPatClosingList[i].bpB4Closing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.iEPatClosingList[i].bpB4Closing);
         	spAtClosing.iEPatClosingTotalspAtClosing += $scope.cdformdata.closingCostDetailsOtherCosts.iEPatClosingList[i].spAtClosing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.iEPatClosingList[i].spAtClosing);
          	spB4Closing.iEPatClosingTotalspB4Closing += $scope.cdformdata.closingCostDetailsOtherCosts.iEPatClosingList[i].spB4Closing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.iEPatClosingList[i].spB4Closing);
          	paidByOthers.iEPatClosingTotalpaidByOthers += $scope.cdformdata.closingCostDetailsOtherCosts.iEPatClosingList[i].paidByOthers == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.iEPatClosingList[i].paidByOthers);
         }

         $scope.cdformdata.closingCostDetailsOtherCosts.iEPatClosingTotalAmount = bpAtClosing.iEPatClosingTotalbpAtClosing + bpB4Closing.iEPatClosingTotalbpB4Closing;
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing = parseFloat(bpAtClosing.tOGovtFeesTotalbpAtClosing) + parseFloat(bpAtClosing.prepaidsTotalbpAtClosing) + parseFloat(bpAtClosing.iEPatClosingTotalbpAtClosing) + parseFloat(bpAtClosing.otherTotalbpAtClosing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpB4Closing = parseFloat(bpB4Closing.tOGovtFeesTotalbpB4Closing) + parseFloat(bpB4Closing.prepaidsTotalbpB4Closing) + parseFloat(bpB4Closing.iEPatClosingTotalbpB4Closing) + parseFloat(bpB4Closing.otherTotalbpB4Closing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing = parseFloat(spAtClosing.tOGovtFeesTotalbpAtClosing) + parseFloat(spAtClosing.prepaidsTotalbpAtClosing) + parseFloat(spAtClosing.iEPatClosingTotalbpAtClosing) + parseFloat(spAtClosing.otherTotalbpB4Closing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spB4Closing = parseFloat(spB4Closing.tOGovtFeesTotalbpAtClosing) + parseFloat(spB4Closing.prepaidsTotalbpAtClosing) + parseFloat(spB4Closing.iEPatClosingTotalbpAtClosing) + parseFloat(spB4Closing.otherTotalbpB4Closing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers = parseFloat(paidByOthers.tOGovtFeesTotalbpAtClosing) + parseFloat(paidByOthers.prepaidsTotalbpAtClosing) + parseFloat(paidByOthers.iEPatClosingTotalbpAtClosing) + parseFloat(paidByOthers.otherTotalbpB4Closing);
         
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.iEPatClosingTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.otherTotalAmount;
         $scope.cdformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpB4Closing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpB4Closing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spB4Closing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spB4Closing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.paidByOthers = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers);
    }, true);

    $scope.$watch('cdformdata.closingCostDetailsOtherCosts.otherCostsList', function(newValue, oldValue) {
		 bpAtClosing.otherTotalbpAtClosing = 0;
		 bpB4Closing.otherTotalbpB4Closing = 0;
		 spAtClosing.otherTotalspAtClosing = 0;
		 spB4Closing.otherTotalspB4Closing = 0;
		 paidByOthers.otherTotalpaidByOthers = 0;

         for(i=0; i<$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.length; i++) {
         	bpAtClosing.otherTotalbpAtClosing += $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].bpAtClosing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].bpAtClosing);
         	bpB4Closing.otherTotalbpB4Closing += $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].bpB4Closing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].bpB4Closing);
         	spAtClosing.otherTotalspAtClosing += $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].spAtClosing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].spAtClosing);
          	spB4Closing.otherTotalspB4Closing += $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].spB4Closing == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].spB4Closing);
          	paidByOthers.otherTotalpaidByOthers += $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].paidByOthers == null ? +0 : parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].paidByOthers);
         }

         $scope.cdformdata.closingCostDetailsOtherCosts.otherTotalAmount = bpAtClosing.otherTotalbpAtClosing + bpB4Closing.otherTotalbpB4Closing;
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing = parseFloat(bpAtClosing.tOGovtFeesTotalbpAtClosing) + parseFloat(bpAtClosing.prepaidsTotalbpAtClosing) + parseFloat(bpAtClosing.iEPatClosingTotalbpAtClosing) + parseFloat(bpAtClosing.otherTotalbpAtClosing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpB4Closing = parseFloat(bpB4Closing.tOGovtFeesTotalbpB4Closing) + parseFloat(bpB4Closing.prepaidsTotalbpB4Closing) + parseFloat(bpB4Closing.iEPatClosingTotalbpB4Closing) + parseFloat(bpB4Closing.otherTotalbpB4Closing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing = parseFloat(spAtClosing.tOGovtFeesTotalbpAtClosing) + parseFloat(spAtClosing.prepaidsTotalbpAtClosing) + parseFloat(spAtClosing.iEPatClosingTotalbpAtClosing) + parseFloat(spAtClosing.otherTotalbpB4Closing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spB4Closing = parseFloat(spB4Closing.tOGovtFeesTotalbpAtClosing) + parseFloat(spB4Closing.prepaidsTotalbpAtClosing) + parseFloat(spB4Closing.iEPatClosingTotalbpAtClosing) + parseFloat(spB4Closing.otherTotalbpB4Closing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers = parseFloat(paidByOthers.tOGovtFeesTotalbpAtClosing) + parseFloat(paidByOthers.prepaidsTotalbpAtClosing) + parseFloat(paidByOthers.iEPatClosingTotalbpAtClosing) + parseFloat(paidByOthers.otherTotalbpB4Closing);
         
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.iEPatClosingTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.otherTotalAmount;
         $scope.cdformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpB4Closing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpB4Closing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spB4Closing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spB4Closing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.paidByOthers = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers);
    }, true);

    $scope.$watch('cdformdata.cashToCloses', function(newValue,oldValue){
    	var cashToCloseItemEstimatedAmount = 0;
    	var cashToCloseItemFinalAmount = 0;
    	if($scope.cdformdata.cashToCloses.loanAmount != null)
    	cashToCloseItemEstimatedAmount +=  $scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemEstimatedAmount == null ? +0 : parseFloat($scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemEstimatedAmount);
    	if($scope.cdformdata.cashToCloses.totalClosingCosts != null)
    	cashToCloseItemEstimatedAmount +=  $scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount == null ? +0 : parseFloat($scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount);
    	if($scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing != null)
    	cashToCloseItemEstimatedAmount +=  $scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemEstimatedAmount == null ? +0 : parseFloat($scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemEstimatedAmount);
    	if($scope.cdformdata.cashToCloses.closingCostsFinanced != null)
    	cashToCloseItemEstimatedAmount +=  $scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemEstimatedAmount == null ? +0 : parseFloat($scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemEstimatedAmount);
    	if($scope.cdformdata.cashToCloses.downPayment != null)
    	cashToCloseItemEstimatedAmount +=  $scope.cdformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemEstimatedAmount == null ? +0 : parseFloat($scope.cdformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemEstimatedAmount);
    	if($scope.cdformdata.cashToCloses.totalPayoffsAndPayments != null)
    	cashToCloseItemEstimatedAmount +=  $scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemEstimatedAmount == null ? +0 : parseFloat($scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemEstimatedAmount);
    	if($scope.cdformdata.cashToCloses.deposit != null)
    	cashToCloseItemEstimatedAmount +=  $scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemEstimatedAmount == null  ? +0 : parseFloat($scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemEstimatedAmount);
    	if($scope.cdformdata.cashToCloses.fundsForBorrower != null)
    	cashToCloseItemEstimatedAmount +=  $scope.cdformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemEstimatedAmount == null ? +0 : parseFloat($scope.cdformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemEstimatedAmount);
    	if($scope.cdformdata.cashToCloses.sellerCredits != null)
    	cashToCloseItemEstimatedAmount +=  $scope.cdformdata.cashToCloses.sellerCredits.integratedDisclosureCashToCloseItemEstimatedAmount == null ? +0 : parseFloat($scope.cdformdata.cashToCloses.sellerCredits.integratedDisclosureCashToCloseItemEstimatedAmount);
    	if($scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits != null)
    	cashToCloseItemEstimatedAmount +=  $scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemEstimatedAmount == null ? +0 : parseFloat($scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemEstimatedAmount);
        
        if($scope.cdformdata.cashToCloses.loanAmount != null)
        cashToCloseItemFinalAmount +=  $scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemFinalAmount == null ? +0 : parseFloat($scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemFinalAmount);
    	if($scope.cdformdata.cashToCloses.totalClosingCosts != null)
    	cashToCloseItemFinalAmount +=  $scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemFinalAmount == null ? +0 : parseFloat($scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemFinalAmount);
    	if($scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing != null)
    	cashToCloseItemFinalAmount +=  $scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemFinalAmount == null ? +0 : parseFloat($scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemFinalAmount);
    	if($scope.cdformdata.cashToCloses.closingCostsFinanced != null)
    	cashToCloseItemFinalAmount +=  $scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemFinalAmount == null  ? +0 : parseFloat($scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemFinalAmount);
    	if($scope.cdformdata.cashToCloses.downPayment != null)
    	cashToCloseItemFinalAmount +=  $scope.cdformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemFinalAmount == null ? +0 : parseFloat($scope.cdformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemFinalAmount);
    	if($scope.cdformdata.cashToCloses.totalPayoffsAndPayments != null)
    	cashToCloseItemFinalAmount +=  $scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemFinalAmount == null ? +0 : parseFloat($scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemFinalAmount);
    	if($scope.cdformdata.cashToCloses.deposit != null)
    	cashToCloseItemFinalAmount +=  $scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemFinalAmount == null ? +0 : parseFloat($scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemFinalAmount);
    	if($scope.cdformdata.cashToCloses.fundsForBorrower != null)
    	cashToCloseItemFinalAmount +=  $scope.cdformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemFinalAmount == null ? +0 : parseFloat($scope.cdformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemFinalAmount);
    	if($scope.cdformdata.cashToCloses.sellerCredits != null)
    	cashToCloseItemFinalAmount +=  $scope.cdformdata.cashToCloses.sellerCredits.integratedDisclosureCashToCloseItemFinalAmount == null ? +0 : parseFloat($scope.cdformdata.cashToCloses.sellerCredits.integratedDisclosureCashToCloseItemFinalAmount);
    	if($scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits != null)
    	cashToCloseItemFinalAmount +=  $scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemFinalAmount == null ? +0 : parseFloat($scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemFinalAmount);

        $scope.cdformdata.cashToCloses.cashToCloseTotal[0].integratedDisclosureCashToCloseItemEstimatedAmount = cashToCloseItemEstimatedAmount;
        $scope.cdformdata.cashToCloses.cashToCloseTotal[1].integratedDisclosureCashToCloseItemFinalAmount = cashToCloseItemFinalAmount;
    }, true);
    
    $scope.$watch('cdformdata.closingCostsTotal.lenderCredits', function(newValue,oldValue){
    	var totalClosingCosts = 0;
    	totalClosingCosts += $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing + $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing;
    	if($scope.cdformdata.closingCostsTotal.lenderCredits)
  			totalClosingCosts +=  $scope.cdformdata.closingCostsTotal.lenderCredits == null ? +0 : parseFloat($scope.cdformdata.closingCostsTotal.lenderCredits);
        $scope.cdformdata.closingCostsTotal.totalClosingCosts = totalClosingCosts;
    },true);
    

	$scope.$watch('cdformdata.salesContractDetail', function(newValue,oldValue){
		if($scope.cdformdata.salesContractDetail.saleContractAmount)
			$scope.salePriceAmount = $scope.cdformdata.salesContractDetail.saleContractAmount;
		else if($scope.cdformdata.salesContractDetail.realPropertyAmount)
			$scope.salePriceAmount = $scope.cdformdata.salesContractDetail.realPropertyAmount;
		else
			$scope.salePriceAmount = 0;
	}, true);
    
    $scope.$watch('payoffsAndPaymentsList', function(newValue,oldValue){
		var totalAmount = 0;
	   for(k=0;k<$scope.payoffsAndPaymentsList.length;k++){
	   		if($scope.payoffsAndPaymentsList[k].payoffAmount)
        		totalAmount += parseFloat($scope.payoffsAndPaymentsList[k].payoffAmount);
        }
        $scope.payoffsAndPaymentsTotalAmount = totalAmount;

        for(i=0;i<$scope.cdformdata.liabilityList.length;i++){
           if($scope.cdformdata.liabilityList[i].integratedDisclosureSectionType == 'PayoffsAndPayments') {
               $scope.cdformdata.liabilityList.splice(i,1);
               i--;
           }
        };

        for(i=0;i<$scope.cdformdata.closingAdjustmentItemList.length;i++){
           if($scope.cdformdata.closingAdjustmentItemList[i].integratedDisclosureSectionType == 'PayoffsAndPayments') {
               $scope.cdformdata.closingAdjustmentItemList.splice(i,1);
               i--;
           }
        };

        $.each($scope.payoffsAndPaymentsList, function (index,payoffObj) {
            if(payoffObj.payOffType == 'Liability') {
                var liabilityObj = {
                  "displayLabel": payoffObj.displayLabel,
                  "liabilityDescription": "",
                  "liabilityType": payoffObj.itemType,
                  "liabilityTypeOtherDescription": (payoffObj.itemType!='Other' ? '' : payoffObj.otherDescription),
                  "integratedDisclosureSectionType": "PayoffsAndPayments",
                  "liabilitySecuredBySubjectPropertyIndicator": (payoffObj.securedIndicator ? true : false) ,
                  "liabilityHolderFullName": payoffObj.paidToFullName,
                  "payoffAmount": payoffObj.payoffAmount,
                  "partialPayoffIndicator" : (payoffObj.partialPayoffIndicator ? true : false),
                  "payoffPrepaymentPenaltyAmount": payoffObj.payoffPrepaymentPenaltyAmount
                };
                $scope.cdformdata.liabilityList.push(liabilityObj);
            } 
            else if(payoffObj.payOffType == 'Adjustment') {
            	var adjustmentObj = {
		            "displayLabel": payoffObj.displayLabel,
		            "closingAdjustmentItemAmount": payoffObj.payoffAmount,
		            "closingAdjustmentItemPaidOutsideOfClosingIndicator": "",
		            "closingAdjustmentItemType": payoffObj.itemType,
		            "closingAdjustmentItemTypeOtherDescription": (payoffObj.itemType!='Other' ? '' : payoffObj.otherDescription),
		            "integratedDisclosureSectionType": "PayoffsAndPayments",
		            "integratedDisclosureSubsectionType": "Adjustments",
		            "paidByIndividualFullName": payoffObj.paidByFullName,
		            "paidByEntityFullName": "",
		            "paidToEntityFullName": payoffObj.paidToFullName,
		        };
                $scope.cdformdata.closingAdjustmentItemList.push(adjustmentObj);
            }
        });
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