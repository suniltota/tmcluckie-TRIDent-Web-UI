/**
 * Controller for transform function
 */
app.controller('closingDisclosureCtrl', function ($scope, $sce, $filter, $location, $anchorScroll, staticData, cdService) {

	if(localStorage.loanPurposeType != undefined) {
		staticData.basicLoanInfo.loanPurposeType = localStorage.loanPurposeType;
	}
	if(localStorage.loanFormType != undefined) {
		staticData.basicLoanInfo.loanFormType = localStorage.loanFormType;
	}
	$scope.originationChargeDisplayLabelStatus=false;
	$scope.originationChargeDisplayLabelValue;
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
	$scope.sectionAfeeTypes = staticData.sectionAfeeTypes;
	$scope.sectionBfeeTypes = staticData.sectionBfeeTypes;
	$scope.sectionCfeeTypes = staticData.sectionCfeeTypes;
	$scope.sectionEfeeTypes = staticData.sectionEfeeTypes;
	$scope.sectionHfeeTypes = staticData.sectionHfeeTypes;
	$scope.feePaidToTypes = staticData.feePaidToTypes;
	$scope.feePaidToTypeDescription = staticData.feePaidToTypeDescription;
	$scope.prepaidItems = staticData.prepaidItems;
    $scope.escrowItemTypes = staticData.escrowItemTypes;
    $scope.liabilityTypes = staticData.liabilityTypes;
    $scope.adjustmentTypes = staticData.adjustmentTypes;
    $scope.liabilityTypesPayoff = staticData.liabilityTypesPayoff;
    $scope.sectionNliabilityTypes = staticData.sectionNliabilityTypes;
    $scope.sectionKadjustmentTypes = staticData.sectionKadjustmentTypes;
    $scope.sectionLadjustmentTypes = staticData.sectionLadjustmentTypes;
    $scope.sectionNadjustmentTypes = staticData.sectionNadjustmentTypes;
    $scope.prorationItemTypes = staticData.prorationItemTypes;
    $scope.subordinateLiens = staticData.subordinateLiens;
    $scope.otherCredits = staticData.otherCredits;
    $scope.payeeTypes = staticData.payeeTypes;
    $scope.licenseAuthorityLevelTypes = staticData.licenseAuthorityLevelTypes;
    $scope.repayMethodType = staticData.repayMethodType;
    $scope.repayExemptionReasonType = staticData.repayExemptionReasonType;
    $scope.liabilityadjustments = staticData.liabilityadjustments;
    $scope.liabilityOrAdjustments = staticData.liabilityOrAdjustments;
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
    $scope.checkBorrower = false;
    $scope.interestRatePercent = 0;
    $scope.piAmount = 0;
    $scope.disclosureOnly = true;
    $scope.toleranceCure = false;
    $scope.toleranceCureDrpdwn = false;
	var borrower ={};
	var seller ={};
	var ausTypeIdentifier = {};
	var ETIAComponentType = {};
	var paymentCalculation = {};
	var principalInterest = {};
	var mortgageInsurance = {};
	var estimatedEscrow = {};
	var estimatedTotal = {};
    var originationCharges = {};
    var sbDidNotShopFors = {};
    var sbDidShopFors = {};
    var tOGovtFees = {};
    var recordingFees = [];
    var prepaidsList = {};
    var escrowItemsList = {};
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
    var recordingFeetotalObj = {
        "bpAtClosing": "",
        "bpB4Closing": "",
        "spAtClosing": "",
        "spB4Closing": "",
        "paidByOthers": "",
        "lenderStatus": false,
        "displayLabel": "",
        "gseDisplayLabel": "",
        "feePaidToFullName": "",
        "feeActualTotalAmount": "",
        "feePaidToType": "ThirdPartyProvider",
        "feePaidToTypeOtherDescription": "",
        "feePercentBasisType": "",
        "feeTotalPercent": "",
        "feeType": "",
        "feeTypeOtherDescription": "",
        "integratedDisclosureSectionType": "",
        "optionalCostIndicator": false,
        "regulationZPointsAndFeesIndicator": true,
        "paymentIncludedInAPRIndicator": true,
        "recordingFeeForDeed":"",
        "recordingFeeForMortgage":""
	};
	$scope.dateOptions = {
 		formatYear: 'yy',
 		startingDay: 1
 	};
    $scope.FormType = '';
    $scope.LoanType = '';

    if($scope.loanBasicInfo!=undefined){
	    if($scope.loanBasicInfo.loanFormType == 'standard'){
	    	$scope.FormType = 'Standard'
	    }
	    else if($scope.loanBasicInfo.loanFormType == 'alternate'){
	    	$scope.FormType = 'Alternate'
	    }

	    if($scope.loanBasicInfo.loanPurposeType == 'purchase'){
	    	$scope.LoanType = 'Purchase'
	    }
	    else if($scope.loanBasicInfo.loanPurposeType == 'refinance'){
	    	$scope.LoanType = 'Refinance'
	    }
    }

	var initializeCDformData = function() {
		$scope.cdformdata = staticData.cdformdata;
		$scope.cdformdata.termsOfLoan.loanPurposeType = $scope.loanBasicInfo.loanPurposeType.capitalizeFirstLetter();

		borrower = angular.copy($scope.cdformdata.transactionInformation.borrowerDetails[0]);
		seller = angular.copy($scope.cdformdata.transactionInformation.sellerDetails[0]);
		ausTypeIdentifier = angular.copy($scope.cdformdata.loanInformation.automatedUnderwritings[0]);
		ETIAComponentType = angular.copy($scope.cdformdata.etiaSection.etiaValues[0]);
		originationCharges = angular.copy($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[0]);
		sbDidNotShopFors = angular.copy($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[0]);
		sbDidShopFors = angular.copy($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[0]);
		tOGovtFees = angular.copy($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0]);
		prepaidsList = angular.copy($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[0]);
		escrowItemsList = angular.copy($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[0]);
		otherCostsList = angular.copy($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[0]);
		liability = angular.copy($scope.cdformdata.liabilityList[0]);
		adjustment = angular.copy($scope.cdformdata.closingAdjustmentItemList[0]);
		prorationObj = angular.copy($scope.cdformdata.prorationsList[0]);
		paymentCalculation = angular.copy($scope.cdformdata.projectedPayments.paymentCalculation[0]);
		principalInterest = angular.copy($scope.cdformdata.projectedPayments.principalInterest[0]);
		mortgageInsurance = angular.copy($scope.cdformdata.projectedPayments.mortgageInsurance[0]);
		estimatedEscrow = angular.copy($scope.cdformdata.projectedPayments.estimatedEscrow[0]);
		estimatedTotal = angular.copy($scope.cdformdata.projectedPayments.estimatedTotal[0]);
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
        
        //To Update The Interest Rate Percent
        if ($scope.cdformdata.loanTerms.temporaryBuydown.buydownReflectedInNoteIndicator==true && $scope.cdformdata.loanTerms.temporaryBuydown.buydownInitialEffectiveInterestRatePercent!='') {
			$scope.interestRatePercent = $scope.cdformdata.loanTerms.temporaryBuydown.buydownInitialEffectiveInterestRatePercent;
		} else if($scope.cdformdata.termsOfLoan.disclosedFullyIndexedRatePercent!='') {
			$scope.interestRatePercent = $scope.cdformdata.termsOfLoan.disclosedFullyIndexedRatePercent;
		} else if ($scope.cdformdata.termsOfLoan.weightedAverageInterestRatePercent!='') {
			$scope.interestRatePercent = $scope.cdformdata.termsOfLoan.weightedAverageInterestRatePercent;
		} else {
			$scope.interestRatePercent = $scope.cdformdata.termsOfLoan.noteRatePercent;
		}
		
		//To Update the Principal And Interest Amount

		if($scope.cdformdata.payment.paymentRule.initialPrincipalAndInterestPaymentAmount!=''){
            $scope.piAmount = $scope.cdformdata.payment.paymentRule.initialPrincipalAndInterestPaymentAmount;
		}
		else if($scope.cdformdata.payment.paymentRule.fullyIndexedInitialPrincipalAndInterestPaymentAmount!=''){
            $scope.piAmount = $scope.cdformdata.payment.paymentRule.fullyIndexedInitialPrincipalAndInterestPaymentAmount;
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

			$scope.cdformdata.etiaSection.etiaValues.splice(2, 0, angular.copy(ETIAComponentType));
			$scope.cdformdata.etiaSection.etiaValues[2].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType = '';
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
			} else if(i!=2 && $scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType == '') {
				$scope.cdformdata.etiaSection.etiaValues[2] = $scope.cdformdata.etiaSection.etiaValues[i];
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
			$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[0].displayLabel = 'Loan Amount (Points)';
       	}

        $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges['AfeeTypes']=[];
        $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors['BfeeTypes']=[];
		$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors['CfeeTypes']=[];
		$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList['EfeeTypes']=[];
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList['FprepaidTypes']=[];
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList['GescrowTypes']=[];
		$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList['HfeeTypes']=[];


       	for(i=0; i<$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.length; i++){
			if (i!=0 && $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].feeType == 'LoanDiscountPoints') {
				$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[0] = $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i];
				$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.splice(i, 1);
				i--;
	       	}
	       	if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.AfeeTypes.indexOf($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].feeType)==-1)
				$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.AfeeTypes.push($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].feeType);
		};

		for(i=0; i<$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.length; i++){
			if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.BfeeTypes.indexOf($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].feeType)==-1)
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.BfeeTypes.push($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].feeType);
		};

		for(i=0; i<$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.length; i++){
			if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.CfeeTypes.indexOf($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].feeType)==-1)
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.CfeeTypes.push($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].feeType);
		};
		
		if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList!=undefined) {
			$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.splice(0, 0, angular.copy(recordingFeetotalObj));
			$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].feeType = 'RecordingFee';
			$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].displayLabel = 'Recording Fees Total';
			$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].feePaidToType = 'ThirdPartyProvider';

			$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.splice(1, 0, angular.copy(tOGovtFees));
			$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[1].feeType = 'TransferTaxTotal';
			$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[1].displayLabel = 'Transfer Taxes';
			$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[1].feePaidToType = 'ThirdPartyProvider';

		}


		var temp=0;
        for(i=0; i<$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.length; i++){
	     	var recordingFeetotal = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0];
			if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType == 'RecordingFeeForDeed') {
				recordingFeetotal.recordingFeeForDeed = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeActualTotalAmount;
				$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.splice(i,1);
				i--;
			}
			if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType == 'RecordingFeeForMortgage') {
				recordingFeetotal.recordingFeeForMortgage = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeActualTotalAmount;
				$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.splice(i,1);
				i--;
			}
			if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType == 'RecordingFeeTotal') {
				recordingFeetotal.bpAtClosing = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpAtClosing;
				recordingFeetotal.bpB4Closing = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpB4Closing;
				recordingFeetotal.spAtClosing = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].spAtClosing;
				recordingFeetotal.spB4Closing = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].spB4Closing;
				recordingFeetotal.lenderStatus = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].lenderStatus;
				recordingFeetotal.gseDisplayLabel = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].gseDisplayLabel;
				recordingFeetotal.feePaidToFullName = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feePaidToFullName;
				recordingFeetotal.feePaidToType = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feePaidToType;
				recordingFeetotal.feePaidToTypeOtherDescription = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feePaidToTypeOtherDescription;
				recordingFeetotal.feeTotalPercent = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeTotalPercent;
				recordingFeetotal.optionalCostIndicator = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].optionalCostIndicator;
				recordingFeetotal.regulationZPointsAndFeesIndicator = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].regulationZPointsAndFeesIndicator;
				recordingFeetotal.paymentIncludedInAPRIndicator = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].paymentIncludedInAPRIndicator;
				$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.splice(i,1);
				i--;
			}
			if(i!=1 && temp==0 && $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType == 'TransferTaxTotal') {
				$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[1] = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i];
				$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.splice(i, 1);
				i--;
				temp++;
			}

			if(i>1 && $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType == '') {
				$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.splice(i, 1);
				i--;
			}

			if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.EfeeTypes.indexOf($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType)==-1)
				$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.EfeeTypes.push($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType);
				
		}
        for(i=0; i<$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.length; i++){
			if($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.HfeeTypes.indexOf($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].feeType)==-1)
				$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.HfeeTypes.push($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].feeType);
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
				i--;
	       	} else if (i!=1 && $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType == 'HomeownersInsurancePremium') {
				$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[1] = $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i];
				$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.splice(i, 1);
				i--;
	       	} else if (i!=2 && $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType == 'MortgageInsurancePremium') {
				$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[2] = $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i];
				$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.splice(i, 1);
				i--;
	       	} else if (i!=3 && $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType == 'CountyPropertyTax') {
				$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[3] = $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i];
				$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.splice(i, 1);
				i--;
	       	}

	       	if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.FprepaidTypes.indexOf($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType)==-1)
				$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.FprepaidTypes.push($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType);
		};

		if($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList!=undefined) {
			$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.splice(0, 0, angular.copy(escrowItemsList));
			$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[0].escrowItemType = 'HomeownersInsurance';
			$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[0].displayLabel = 'Homeowners Insurance';
			
			$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.splice(1, 0, angular.copy(escrowItemsList));
			$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[1].escrowItemType = 'MortgageInsurance';
			$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[1].displayLabel = 'Mortgage Insurance';

       		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.splice(2, 0, angular.copy(escrowItemsList));
			$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[2].escrowItemType = 'CountyPropertyTax';
			$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[2].displayLabel = 'Property Taxes';
		}

		for(i=0; i<$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.length; i++){
			if (i!=0 && $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType == 'HomeownersInsurance') {
				$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[0] = $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i];
				$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.splice(i, 1);
				i--;
	       	} else if (i!=1 && $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType == 'MortgageInsurance') {
				$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[1] = $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i];
				$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.splice(i, 1);
				i--;
	       	} else if (i!=2 && $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType == 'CountyPropertyTax') {
				$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[2] = $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i];
				$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.splice(i, 1);
				i--;
	       	}
	       	if($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.GescrowTypes.indexOf($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType)==-1)
				$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.GescrowTypes.push($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType);
		};

		if($scope.cdformdata.closingCostsTotal.lenderCredits!='0.00' && $scope.cdformdata.closingCostsTotal.lenderCredits!='0' && $scope.cdformdata.closingCostsTotal.lenderCredits!='' && $scope.cdformdata.closingCostsTotal.lenderCredits!=null &&  $scope.cdformdata.closingCostsTotal.lenderCredits!=undefined){
    		$scope.toleranceCureDrpdwn = true;
    		if($scope.cdformdata.closingCostsTotal.lenderCreditToleranceCureAmount)
    			$scope.toleranceCure = true;
    		else {
    			$scope.toleranceCure = false;
    			$scope.cdformdata.closingCostsTotal.lenderCreditToleranceCureAmount='';
    		}
    	}



		// Summaries of Tranaction
		$scope.summariesOfTransaction_KSection = {
			"salePriceProperty" : "",
			"salePricePersonalProperty":"",
			"closingCostsPaidAtClosing":"",
			"liabilites" : [],
			"adjustments": [],
			"adjustmentsPaidBySeller":[],
			"sectionTotalAmount":0
		};
		$scope.summariesOfTransaction_MSection = {
			"salePriceProperty" : "",
			"salePricePersonalProperty":"",
			"liabilites" : [],
			"adjustments": [],
			"adjustmentsPaidBySeller":[],
			"sectionTotalAmount":0
		};
		$scope.summariesOfTransaction_LSection = {
			"deposit" : {},
			"loanAmount":"",
			"assumedLoanAmount":"",
			"liabilites" : [],
			"subordinateLien" : {},
			"otherCredits":[],
			"adjustments": [],
			"adjustmentsUnpaidBySeller":[],
			"sectionTotalAmount":0
		};
		$scope.summariesOfTransaction_NSection = {
			"excessDeposit" : {},
			"closingCostsPaidAtClosing":"",
			"assumedLoanAmount":"",
			"liabilites" : [],
			"liabilitesAndAdjustments":[],
			"adjustments": [],
			"adjustmentsUnpaidBySeller":[],
			"sectionTotalAmount":0
		};

		for(i=0; i<$scope.cdformdata.liabilityList.length; i++) {
			if($scope.cdformdata.liabilityList[i].integratedDisclosureSectionType == 'DueFromBorrowerAtClosing') {
				$scope.summariesOfTransaction_KSection.liabilites.push($scope.cdformdata.liabilityList[i]);
				$scope.cdformdata.liabilityList.splice(i,1);
				i--;
			} else if($scope.cdformdata.liabilityList[i].integratedDisclosureSectionType == 'DueToSellerAtClosing') {
				$scope.summariesOfTransaction_MSection.liabilites.push($scope.cdformdata.liabilityList[i]);
				$scope.cdformdata.liabilityList.splice(i,1);
				i--;
			} else if($scope.cdformdata.liabilityList[i].integratedDisclosureSectionType == 'DueFromSellerAtClosing') {
				$scope.summariesOfTransaction_NSection.liabilites.push($scope.cdformdata.liabilityList[i]);
				$scope.cdformdata.liabilityList.splice(i,1);
				i--;
			} else if($scope.cdformdata.liabilityList[i].integratedDisclosureSectionType == 'PaidAlreadyByOrOnBehalfOfBorrowerAtClosing') {
				$scope.summariesOfTransaction_LSection.liabilites.push($scope.cdformdata.liabilityList[i]);
				$scope.cdformdata.liabilityList.splice(i,1);
				i--;
			}
		}
		for(i=0; i<$scope.cdformdata.closingAdjustmentItemList.length; i++) {
			if($scope.cdformdata.closingAdjustmentItemList[i].integratedDisclosureSectionType == 'DueFromBorrowerAtClosing') {
				$scope.summariesOfTransaction_KSection.adjustments.push($scope.cdformdata.closingAdjustmentItemList[i]);
				$scope.cdformdata.closingAdjustmentItemList.splice(i,1);
				i--;
			} else if($scope.cdformdata.closingAdjustmentItemList[i].integratedDisclosureSectionType == 'DueToSellerAtClosing') {
				$scope.cdformdata.closingAdjustmentItemList[i]['isFromBorrower'] = false;
				$scope.summariesOfTransaction_MSection.adjustments.push($scope.cdformdata.closingAdjustmentItemList[i]);
				$scope.cdformdata.closingAdjustmentItemList.splice(i,1);
				i--;
			} else if($scope.cdformdata.closingAdjustmentItemList[i].integratedDisclosureSectionType == 'DueFromSellerAtClosing') {
				$scope.summariesOfTransaction_NSection.adjustments.push($scope.cdformdata.closingAdjustmentItemList[i]);
				$scope.cdformdata.closingAdjustmentItemList.splice(i,1);
				i--;
			} else if($scope.cdformdata.closingAdjustmentItemList[i].integratedDisclosureSectionType == 'PaidAlreadyByOrOnBehalfOfBorrowerAtClosing') {
				$scope.summariesOfTransaction_LSection.adjustments.push($scope.cdformdata.closingAdjustmentItemList[i]);
				$scope.cdformdata.closingAdjustmentItemList.splice(i,1);
				i--;
			}
		}

		//Summaries of Transaction : K.Due from Borrower At Closing --- Starts from here.
		if($scope.cdformdata.salesContractDetail.saleContractAmount)
			$scope.summariesOfTransaction_KSection.salePriceProperty = $scope.cdformdata.salesContractDetail.saleContractAmount;
		else if($scope.cdformdata.salesContractDetail.realPropertyAmount)
			$scope.summariesOfTransaction_KSection.salePriceProperty = $scope.cdformdata.salesContractDetail.realPropertyAmount;
		else
			$scope.summariesOfTransaction_KSection.salePriceProperty = 0;

		if($scope.cdformdata.salesContractDetail.personalPropertyAmount)
			$scope.summariesOfTransaction_KSection.salePricePersonalProperty = $scope.cdformdata.salesContractDetail.personalPropertyAmount;
		else
			$scope.summariesOfTransaction_KSection.salePricePersonalProperty = 0;

		if($scope.cdformdata.closingCostsTotal.closingCostsSubtotal)
			$scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing = $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing;
		else
			$scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing = 0;

		if($scope.summariesOfTransaction_KSection.liabilites.length > 3) {
			$scope.summariesOfTransaction_KSection.liabilites = $scope.summariesOfTransaction_KSection.liabilites.splice(0, 3);
		}
		for(i=$scope.summariesOfTransaction_KSection.liabilites.length; i<3; i++) {
			var dueFromBrwLiabilityType = angular.copy(liability);
			dueFromBrwLiabilityType.integratedDisclosureSectionType='DueFromBorrowerAtClosing';
			$scope.summariesOfTransaction_KSection.liabilites.push(dueFromBrwLiabilityType);
		}
		if($scope.summariesOfTransaction_KSection.adjustments.length > 2) {
			$scope.summariesOfTransaction_KSection.adjustments = $scope.summariesOfTransaction_KSection.adjustments.splice(0, 2);
		}
		for(i=$scope.summariesOfTransaction_KSection.adjustments.length; i<2; i++) {
			var dueFromBrwAdjustmentType = angular.copy(adjustment);
			dueFromBrwAdjustmentType.integratedDisclosureSectionType='DueFromBorrowerAtClosing';
			dueFromBrwAdjustmentType.integratedDisclosureSubsectionType = 'Adjustments';
			$scope.summariesOfTransaction_KSection.adjustments.push(dueFromBrwAdjustmentType);
		}
		if($scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller!=undefined) {
			$scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller.splice(0, 0, angular.copy(prorationObj));
			$scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[0].prorationItemType = 'CityPropertyTax';
			$scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[0].displayLabel = 'City/Town Taxes';
			$scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[0].integratedDisclosureSectionType = 'DueFromBorrowerAtClosing';
			$scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[0].integratedDisclosureSubsectionType = 'AdjustmentsForItemsPaidBySellerInAdvance';
			
			$scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller.splice(1, 0, angular.copy(prorationObj));
			$scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[1].prorationItemType = 'CountyPropertyTax';
			$scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[1].displayLabel = 'County Taxes';
			$scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[1].integratedDisclosureSectionType = 'DueFromBorrowerAtClosing';
			$scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[1].integratedDisclosureSubsectionType = 'AdjustmentsForItemsPaidBySellerInAdvance';

			$scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller.splice(2, 0, angular.copy(prorationObj));
			$scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[2].displayLabel = 'Assessments';
			$scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[2].integratedDisclosureSectionType = 'DueFromBorrowerAtClosing';
			$scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[2].integratedDisclosureSubsectionType = 'AdjustmentsForItemsPaidBySellerInAdvance';
		}
		for(i=0; i<$scope.cdformdata.prorationsList.length; i++){
			if($scope.cdformdata.prorationsList[i].integratedDisclosureSectionType == 'DueFromBorrowerAtClosing' && 
				$scope.cdformdata.prorationsList[i].integratedDisclosureSubsectionType == 'AdjustmentsForItemsPaidBySellerInAdvance') {
				if($scope.cdformdata.prorationsList[i].prorationItemType == 'CityPropertyTax' || $scope.cdformdata.prorationsList[i].prorationItemType == 'DistrictPropertyTax' || $scope.cdformdata.prorationsList[i].prorationItemType == 'TownPropertyTax') {
					$scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[0] = $scope.cdformdata.prorationsList[i];
					$scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[0].displayLabel = 'City/Town Taxes';
					$scope.cdformdata.prorationsList.splice(i,1);
					i--;
				} else if($scope.cdformdata.prorationsList[i].prorationItemType == 'BoroughPropertyTax' || $scope.cdformdata.prorationsList[i].prorationItemType == 'CountyPropertyTax') {
					$scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[1] = $scope.cdformdata.prorationsList[i];
					$scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[1].displayLabel = 'County Taxes';
					$scope.cdformdata.prorationsList.splice(i,1);
					i--;
				} else if($scope.cdformdata.prorationsList[i].prorationItemType == 'CondominiumAssociationSpecialAssessment' || $scope.cdformdata.prorationsList[i].prorationItemType == 'CooperativeAssociationSpecialAssessment' || $scope.cdformdata.prorationsList[i].prorationItemType == 'HomeownersAssociationSpecialAssessment') {
					$scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[2] = $scope.cdformdata.prorationsList[i];
					$scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[2].displayLabel = 'Assessments';
					$scope.cdformdata.prorationsList.splice(i,1);
					i--;
				} else {
					$scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller.push($scope.cdformdata.prorationsList[i]);
					$scope.cdformdata.prorationsList.splice(i,1);
					i--;
				}
			}
		};
		if($scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller.length > 7) {
			$scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller = $scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller.splice(0, 7);
		}
		for(i=$scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller.length; i<7; i++) {
			var prorationItem = angular.copy(prorationObj);
			prorationItem.integratedDisclosureSectionType = 'DueFromBorrowerAtClosing';
			prorationItem.integratedDisclosureSubsectionType = 'AdjustmentsForItemsPaidBySellerInAdvance';
			$scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller.push(prorationItem);
		}

		//Summaries of Transaction : M.Due to Seller At Closing --- Starts from here.
		$scope.summariesOfTransaction_MSection.salePriceProperty = $scope.summariesOfTransaction_KSection.salePriceProperty;
		$scope.summariesOfTransaction_MSection.salePricePersonalProperty = $scope.summariesOfTransaction_KSection.salePricePersonalProperty;
		if($scope.summariesOfTransaction_KSection.adjustments[0].closingAdjustmentItemType) {
			var sellerAdjustment = $scope.summariesOfTransaction_KSection.adjustments[0];
			sellerAdjustment['isFromBorrower'] = true;
			sellerAdjustment.integratedDisclosureSectionType = "DueToSellerAtClosing";
			$scope.summariesOfTransaction_MSection.adjustments.splice(0, 0, sellerAdjustment);
		}
		if($scope.summariesOfTransaction_KSection.adjustments[1].closingAdjustmentItemType) {
			var sellerAdjustment = $scope.summariesOfTransaction_KSection.adjustments[1];
			sellerAdjustment['isFromBorrower'] = true;
			sellerAdjustment.integratedDisclosureSectionType = "DueToSellerAtClosing";
			$scope.summariesOfTransaction_MSection.adjustments.splice(1, 0,sellerAdjustment);
		}
		if($scope.summariesOfTransaction_MSection.adjustments.length > 5) {
			$scope.summariesOfTransaction_MSection.adjustments = $scope.summariesOfTransaction_MSection.adjustments.splice(0, 5);
		}
		for(i=$scope.summariesOfTransaction_MSection.adjustments.length; i<5; i++) {
			var sellerAdjustment = angular.copy(adjustment);
			sellerAdjustment.integratedDisclosureSectionType='DueToSellerAtClosing';
			sellerAdjustment.integratedDisclosureSubsectionType = 'Adjustments';
			sellerAdjustment['isFromBorrower'] = false;
			$scope.summariesOfTransaction_MSection.adjustments.push(sellerAdjustment);
		}
		for(i=0; i<$scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller.length; i++) {
			var adjustmentPaidBySellerInAdvance = $scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[i];
			adjustmentPaidBySellerInAdvance.integratedDisclosureSectionType = 'DueToSellerAtClosing';
			adjustmentPaidBySellerInAdvance.integratedDisclosureSubsectionType = 'AdjustmentsForItemsPaidBySellerInAdvance';
			$scope.summariesOfTransaction_MSection.adjustmentsPaidBySeller.push(adjustmentPaidBySellerInAdvance);
		}

		//Summaries of Transaction : L.Paid Already by or on Behalf of Borrower at Closing --- Starts from here.
		if($scope.cdformdata.closingCostFundList==undefined || $scope.cdformdata.closingCostFundList.length==0) {
			$scope.cdformdata.closingCostFundList = staticData.cdformdata.closingCostFundList;
		}
		for(i=0; i<$scope.cdformdata.closingCostFundList.length; i++) {
			if($scope.cdformdata.closingCostFundList[i].fundsType == 'DepositOnSalesContract') {
				$scope.summariesOfTransaction_LSection.deposit = $scope.cdformdata.closingCostFundList[i];
			}
			if($scope.cdformdata.closingCostFundList[i].fundsType == 'ExcessDeposit') {
				$scope.summariesOfTransaction_NSection.excessDeposit = $scope.cdformdata.closingCostFundList[i];
			}
		}
		if($scope.cdformdata.termsOfLoan.noteAmount)
			$scope.summariesOfTransaction_LSection.loanAmount = $scope.cdformdata.termsOfLoan.noteAmount;
		if($scope.cdformdata.termsOfLoan.assumedLoanAmount)
			$scope.summariesOfTransaction_LSection.assumedLoanAmount = $scope.cdformdata.termsOfLoan.assumedLoanAmount;
 		if($scope.summariesOfTransaction_LSection.liabilites.length==0) {
			var paidAlreadyByLiability = angular.copy(liability);
			paidAlreadyByLiability.integratedDisclosureSectionType='PaidAlreadyByOrOnBehalfOfBorrowerAtClosing';
			$scope.summariesOfTransaction_LSection.liabilites.push(paidAlreadyByLiability);
		}
		if($scope.summariesOfTransaction_LSection.adjustments!=undefined) {
			var paidAlreadyByAdjustment = angular.copy(adjustment);
			paidAlreadyByAdjustment.integratedDisclosureSectionType='PaidAlreadyByOrOnBehalfOfBorrowerAtClosing';
			paidAlreadyByAdjustment.closingAdjustmentItemType = 'SellerCredit';
			$scope.summariesOfTransaction_LSection.adjustments.splice(0, 0, paidAlreadyByAdjustment);
		}
		for(i=0; i<$scope.summariesOfTransaction_LSection.adjustments.length; i++) {
			if($scope.summariesOfTransaction_LSection.adjustments[i].integratedDisclosureSubsectionType == 'OtherCredits') {
				if($scope.summariesOfTransaction_LSection.adjustments[i].paidByEntityFullName) {
					$scope.summariesOfTransaction_LSection.adjustments[i]['fullName'] = $scope.summariesOfTransaction_LSection.adjustments[i].paidByEntityFullName;
					$scope.summariesOfTransaction_LSection.adjustments[i]['payeeType'] = 'Organization';
				} else if($scope.summariesOfTransaction_LSection.adjustments[i].paidByIndividualFullName) {
					$scope.summariesOfTransaction_LSection.adjustments[i]['fullName'] = $scope.summariesOfTransaction_LSection.adjustments[i].paidByIndividualFullName;
					$scope.summariesOfTransaction_LSection.adjustments[i]['payeeType'] = 'Individual';
 				}
				$scope.summariesOfTransaction_LSection.otherCredits.push($scope.summariesOfTransaction_LSection.adjustments[i]);
				$scope.summariesOfTransaction_LSection.adjustments.splice(i, 1);
				i--;
			} 
			else if($scope.summariesOfTransaction_LSection.adjustments[i].integratedDisclosureSubsectionType == 'Adjustments') {
				if($scope.summariesOfTransaction_LSection.adjustments[i].paidByEntityFullName) {
					$scope.summariesOfTransaction_LSection.adjustments[i]['fullName'] = $scope.summariesOfTransaction_LSection.adjustments[i].paidByEntityFullName;
					$scope.summariesOfTransaction_LSection.adjustments[i]['payeeType'] = 'Organization';
				} else if($scope.summariesOfTransaction_LSection.adjustments[i].paidByIndividualFullName) {
					$scope.summariesOfTransaction_LSection.adjustments[i]['fullName'] = $scope.summariesOfTransaction_LSection.adjustments[i].paidByIndividualFullName;
					$scope.summariesOfTransaction_LSection.adjustments[i]['payeeType'] = 'Individual';
 				}
				/*$scope.summariesOfTransaction_LSection.adjustments.push($scope.summariesOfTransaction_LSection.adjustments[i]);
				$scope.summariesOfTransaction_LSection.adjustments.splice(i, 1);
				i--;*/
			} else if($scope.summariesOfTransaction_LSection.adjustments[i].integratedDisclosureSubsectionType == 'AdjustmentsForItemsUnpaidBySeller') {
				$scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller.push($scope.summariesOfTransaction_LSection.adjustments[i]);
				$scope.summariesOfTransaction_LSection.adjustments.splice(i, 1);
				i--;
 			} else {
				if(i!=0 && $scope.summariesOfTransaction_LSection.adjustments[i].closingAdjustmentItemType=='SellerCredit') {
					$scope.summariesOfTransaction_LSection.adjustments[0] = $scope.summariesOfTransaction_LSection.adjustments[i];
					$scope.summariesOfTransaction_LSection.adjustments.splice(i, 1);
					i--;
				} else if(($scope.summariesOfTransaction_LSection.adjustments[i].closingAdjustmentItemType=='ProceedsOfSubordinateLiens'
				 			|| $scope.summariesOfTransaction_LSection.adjustments[i].closingAdjustmentItemType=='Other') 
							&& $scope.summariesOfTransaction_LSection.adjustments[i].integratedDisclosureSubsectionType != 'Adjustments') {
					$scope.summariesOfTransaction_LSection.subordinateLien = $scope.summariesOfTransaction_LSection.adjustments[i];
					$scope.summariesOfTransaction_LSection.adjustments.splice(i, 1);
					i--;
					$scope.disclosureOnly = false;
				}
 			} 
 		}
 		if($scope.summariesOfTransaction_LSection.otherCredits.length > 2) {
			$scope.summariesOfTransaction_LSection.otherCredits = $scope.summariesOfTransaction_LSection.otherCredits.splice(0, 2);
		}
		for(i=$scope.summariesOfTransaction_LSection.otherCredits.length; i<2; i++) {
			var otherCreditsAdjustment = angular.copy(adjustment);
			otherCreditsAdjustment.integratedDisclosureSectionType='PaidAlreadyByOrOnBehalfOfBorrowerAtClosing';
			otherCreditsAdjustment.integratedDisclosureSubsectionType = 'OtherCredits';
			$scope.summariesOfTransaction_LSection.otherCredits.push(otherCreditsAdjustment);
		}
		if($scope.summariesOfTransaction_LSection.adjustments.length > 5) {
			$scope.summariesOfTransaction_LSection.adjustments = $scope.summariesOfTransaction_LSection.adjustments.splice(0, 5);
		}
		for(i=$scope.summariesOfTransaction_LSection.adjustments.length; i<5; i++) {
			var paidAlreadyByAdjustment = angular.copy(adjustment);
			paidAlreadyByAdjustment.integratedDisclosureSectionType='PaidAlreadyByOrOnBehalfOfBorrowerAtClosing';
			paidAlreadyByAdjustment.integratedDisclosureSubsectionType = 'Adjustments';
			$scope.summariesOfTransaction_LSection.adjustments.push(paidAlreadyByAdjustment);
		}
		if($scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller!=undefined) {
			$scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller.splice(0, 0, angular.copy(prorationObj));
			$scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller[0].prorationItemType = 'CityPropertyTax';
			$scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller[0].displayLabel = 'City/Town Taxes';
			$scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller[0].integratedDisclosureSectionType = 'PaidAlreadyByOrOnBehalfOfBorrowerAtClosing';
			$scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller[0].integratedDisclosureSubsectionType = 'AdjustmentsForItemsUnpaidBySeller';
			
			$scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller.splice(1, 0, angular.copy(prorationObj));
			$scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller[1].prorationItemType = 'CountyPropertyTax';
			$scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller[1].displayLabel = 'County Taxes';
			$scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller[1].integratedDisclosureSectionType = 'PaidAlreadyByOrOnBehalfOfBorrowerAtClosing';
			$scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller[1].integratedDisclosureSubsectionType = 'AdjustmentsForItemsUnpaidBySeller';

			$scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller.splice(2, 0, angular.copy(prorationObj));
			$scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller[2].displayLabel = 'Assessments';
			$scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller[2].integratedDisclosureSectionType = 'PaidAlreadyByOrOnBehalfOfBorrowerAtClosing';
			$scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller[2].integratedDisclosureSubsectionType = 'AdjustmentsForItemsUnpaidBySeller';
		}
		for(i=0; i<$scope.cdformdata.prorationsList.length; i++){
			if($scope.cdformdata.prorationsList[i].integratedDisclosureSectionType == 'PaidAlreadyByOrOnBehalfOfBorrowerAtClosing' && 
				$scope.cdformdata.prorationsList[i].integratedDisclosureSubsectionType == 'AdjustmentsForItemsUnpaidBySeller') {
				if($scope.cdformdata.prorationsList[i].prorationItemType == 'CityPropertyTax' || $scope.cdformdata.prorationsList[i].prorationItemType == 'DistrictPropertyTax' || $scope.cdformdata.prorationsList[i].prorationItemType == 'TownPropertyTax') {
					$scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller[0] = $scope.cdformdata.prorationsList[i];
					$scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller[0].displayLabel = 'City/Town Taxes';
					$scope.cdformdata.prorationsList.splice(i,1);
					i--;
				} else if($scope.cdformdata.prorationsList[i].prorationItemType == 'BoroughPropertyTax' || $scope.cdformdata.prorationsList[i].prorationItemType == 'CountyPropertyTax') {
					$scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller[1] = $scope.cdformdata.prorationsList[i];
					$scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller[1].displayLabel = 'County Taxes';
					$scope.cdformdata.prorationsList.splice(i,1);
					i--;
				} else if($scope.cdformdata.prorationsList[i].prorationItemType == 'CondominiumAssociationSpecialAssessment' || $scope.cdformdata.prorationsList[i].prorationItemType == 'CooperativeAssociationSpecialAssessment' || $scope.cdformdata.prorationsList[i].prorationItemType == 'HomeownersAssociationSpecialAssessment') {
					$scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller[2] = $scope.cdformdata.prorationsList[i];
					$scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller[2].displayLabel = 'Assessments';
					$scope.cdformdata.prorationsList.splice(i,1);
					i--;
				} else {
					$scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller.push($scope.cdformdata.prorationsList[i]);
					$scope.cdformdata.prorationsList.splice(i,1);
					i--;
				}
			}
		};
		if($scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller.length > 6) {
			$scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller = $scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller.splice(0, 6);
		}
		for(i=$scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller.length; i<6; i++) {
			var unpaidByAdjustment = angular.copy(adjustment);
			unpaidByAdjustment.integratedDisclosureSectionType='PaidAlreadyByOrOnBehalfOfBorrowerAtClosing';
			unpaidByAdjustment.integratedDisclosureSubsectionType = 'AdjustmentsForItemsUnpaidBySeller';
			$scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller.push(unpaidByAdjustment);
		}

		//Summaries of Transaction : N.Due from Seller at Closing --- Starts from here.
		if($scope.cdformdata.closingCostsTotal.closingCostsSubtotal)
			$scope.summariesOfTransaction_NSection.closingCostsPaidAtClosing = $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing;
		else
			$scope.summariesOfTransaction_NSection.closingCostsPaidAtClosing = 0;

		$scope.summariesOfTransaction_NSection.assumedLoanAmount = $scope.summariesOfTransaction_LSection.assumedLoanAmount;
		
		var dueFromSellerAdjustmentsAndLiabilityObj = {
			"dueFromSellerItemType":"",
			"displayLabel":"",
			"itemType":"",
			"otherDescription":"",
			"pocIndicator":"",
			"amount":""
		}
		if($scope.summariesOfTransaction_NSection.liabilites!=undefined) {
			$scope.summariesOfTransaction_NSection.liabilites.splice(0, 0, angular.copy(liability));
			$scope.summariesOfTransaction_NSection.liabilites[0].liabilityType = 'FirstPositionMortgageLien';
			$scope.summariesOfTransaction_NSection.liabilites[0].displayLabel = 'Payoff of First Mortgage';
			$scope.summariesOfTransaction_NSection.liabilites[0].integratedDisclosureSectionType = 'DueFromSellerAtClosing';

			$scope.summariesOfTransaction_NSection.liabilites.splice(1, 0, angular.copy(liability));
			$scope.summariesOfTransaction_NSection.liabilites[1].liabilityType = 'SecondPositionMortgageLien';
			$scope.summariesOfTransaction_NSection.liabilites[1].displayLabel = 'Payoff of Second Mortgage';
			$scope.summariesOfTransaction_NSection.liabilites[1].integratedDisclosureSectionType = 'DueFromSellerAtClosing';
		}
		for(i=0; i<$scope.summariesOfTransaction_NSection.liabilites.length; i++){
			if(i!=0 && $scope.summariesOfTransaction_NSection.liabilites[i].liabilityType=='FirstPositionMortgageLien') {
				$scope.summariesOfTransaction_NSection.liabilites[0] = $scope.summariesOfTransaction_NSection.liabilites[i]; 
				$scope.summariesOfTransaction_NSection.liabilites.splice(i,1);
				i--;
			} else if(i!=1 && $scope.summariesOfTransaction_NSection.liabilites[i].liabilityType=='SecondPositionMortgageLien') {
				$scope.summariesOfTransaction_NSection.liabilites[1] = $scope.summariesOfTransaction_NSection.liabilites[i]; 
				$scope.summariesOfTransaction_NSection.liabilites.splice(i,1);
				i--;
			} else if($scope.summariesOfTransaction_NSection.liabilites[i].liabilityType!='FirstPositionMortgageLien' && $scope.summariesOfTransaction_NSection.liabilites[i].liabilityType!='SecondPositionMortgageLien'){
				var dueFromSellerObj = angular.copy(dueFromSellerAdjustmentsAndLiabilityObj);
				dueFromSellerObj.dueFromSellerItemType = "Liability";
				dueFromSellerObj.displayLabel = $scope.summariesOfTransaction_NSection.liabilites[i].displayLabel;
				dueFromSellerObj.itemType =$scope.summariesOfTransaction_NSection.liabilites[i].liabilityType;
				dueFromSellerObj.otherDescription = $scope.summariesOfTransaction_NSection.liabilites[i].liabilityTypeOtherDescription;
				dueFromSellerObj.amount = $scope.summariesOfTransaction_NSection.liabilites[i].payoffAmount;
				$scope.summariesOfTransaction_NSection.liabilitesAndAdjustments.push(dueFromSellerObj);
				$scope.summariesOfTransaction_NSection.liabilites.splice(i,1);
				i--;
			}
		};
		if($scope.summariesOfTransaction_NSection.adjustments!=undefined) {
			$scope.summariesOfTransaction_NSection.adjustments.splice(0, 0, $scope.summariesOfTransaction_LSection.adjustments[0]);
			$scope.summariesOfTransaction_NSection.adjustments[0].integratedDisclosureSectionType='DueFromSellerAtClosing';
		}
		for(i=0; i<$scope.summariesOfTransaction_NSection.adjustments.length; i++){
			if(i!=0 && $scope.summariesOfTransaction_NSection.adjustments[i].closingAdjustmentItemType=='SellerCredit') {
				$scope.summariesOfTransaction_NSection.adjustments.splice(i,1);
				i--;
			} else if($scope.summariesOfTransaction_NSection.adjustments[i].closingAdjustmentItemType!='SellerCredit') {
				var dueFromSellerObj = angular.copy(dueFromSellerAdjustmentsAndLiabilityObj);
				dueFromSellerObj.dueFromSellerItemType = "Adjustment";
				dueFromSellerObj.displayLabel = $scope.summariesOfTransaction_NSection.adjustments[i].displayLabel;
				dueFromSellerObj.itemType = $scope.summariesOfTransaction_NSection.adjustments[i].closingAdjustmentItemType;
				dueFromSellerObj.otherDescription = $scope.summariesOfTransaction_NSection.adjustments[i].closingAdjustmentItemTypeOtherDescription;
				dueFromSellerObj.pocIndicator = $scope.summariesOfTransaction_NSection.adjustments[i].closingAdjustmentItemPaidOutsideOfClosingIndicator;
				dueFromSellerObj.amount = $scope.summariesOfTransaction_NSection.adjustments[i].closingAdjustmentItemAmount;
				$scope.summariesOfTransaction_NSection.liabilitesAndAdjustments.push(dueFromSellerObj);
				$scope.summariesOfTransaction_NSection.adjustments.splice(i,1);
				i--;
			}
		};
		if($scope.summariesOfTransaction_NSection.liabilitesAndAdjustments.length>6) {
			$scope.summariesOfTransaction_NSection.liabilitesAndAdjustments = $scope.summariesOfTransaction_NSection.liabilitesAndAdjustments.splice(0, 6);
		}
		for(i=$scope.summariesOfTransaction_NSection.liabilitesAndAdjustments.length;i<6;i++){
			$scope.summariesOfTransaction_NSection.liabilitesAndAdjustments.push(angular.copy(dueFromSellerAdjustmentsAndLiabilityObj))
		}
		if($scope.summariesOfTransaction_NSection.adjustmentsUnpaidBySeller!=undefined) {
			$scope.summariesOfTransaction_NSection.adjustmentsUnpaidBySeller.push.apply($scope.summariesOfTransaction_NSection.adjustmentsUnpaidBySeller, $scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller);
		}

 		//Payoffs And Payments starts here...
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
				payoffLiability.partialPayoffIndicator = $scope.cdformdata.liabilityList[i].payoffPartialIndicators;
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

	$scope.checkPropertyRadio = function() {
		if(!$scope.cdformdata.closingInformation.property.legalDescription)
			$scope.cdformdata.closingInformation.property.unparsedLegalDescription = "";
	}
	
	$scope.changePropertyPrice = function() {
		if($scope.cdformdata.salesContractDetail.personalPropertyIndicator) {
			$scope.cdformdata.salesContractDetail.saleContractAmount = "";
		} else 
			$scope.cdformdata.salesContractDetail.realPropertyAmount = "";
	}

	$scope.changePropertyValueAmount = function() {
		if($scope.cdformdata.closingInformation.propertyValuationDetail.propertyValue=='Appraised') {
			$scope.cdformdata.closingInformation.propertyValuationDetail.propertyEstimatedValueAmount = "";
		} else {
			$scope.cdformdata.closingInformation.propertyValuationDetail.propertyValuationAmount = "";
		}
	}

	$scope.scrollTo = function(id) {
           $location.hash(id);
           $anchorScroll();
         };

     $scope.productDescription = function(){
     	$scope.changeTab('loanInfo'); 
     	setTimeout( function(){
     	$scope.scrollTo('ProductDescriptionInfo');
     	}, 500)

     }


     
	$scope.addBorrower = function(){
    	$scope.cdformdata.transactionInformation.borrowerDetails.push(angular.copy(borrower));
    }

    $scope.removeBorrower = function(index){
    	$scope.cdformdata.transactionInformation.borrowerDetails.splice(index,1);
    }
    $scope.backtoTop = function(){
    	console.log("i am here");
    	$('#PDFviewContainer').scrollTop(0);
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
    $scope.removeAusTypeIdentifier = function(index){
    	var indexval = 0;
    	if(index==5 || index==8){
                indexval = index+1;
    		for(i=indexval;i>indexval-3;i--){
    	       $scope.cdformdata.loanInformation.automatedUnderwritings.splice(i-1,1);
    		}
    	 }
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
   
    $scope.addescrowItemsList = function(){
    	$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.push(angular.copy(escrowItemsList));
    }

    $scope.addotherCostsList = function(){
    	$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.push(angular.copy(otherCostsList));
    }

    $scope.addDueFromBrwLiability = function(){
    	$scope.cdformdata.liabilityList.push(angular.copy(dueFromBrwLiabilityType));
    }
	$scope.changeTab = function(tabName){
    	$scope.showTab = tabName;
    	$('#PDFviewContainer').scrollTop(0);
    }
    $scope.navigateTo = function(tabName, idname){
    	$scope.showTab = tabName;
    	setTimeout( function(){
     		$scope.scrollTo(idname);
     	}, 200);
    }
    $scope.addPayOff = function(){
    	$scope.payoffsAndPaymentsList.push(angular.copy(payoffsAndPaymentObj));
    }
    $scope.clearPayoff = function(index){
    	$scope.payoffsAndPaymentsList[index].payOffType='';
    	$scope.payoffsAndPaymentsList[index].displayLabel='';
    	$scope.payoffsAndPaymentsList[index].itemType='';
    	$scope.payoffsAndPaymentsList[index].otherDescription='';
    	$scope.payoffsAndPaymentsList[index].paidToFullName='';
    	$scope.payoffsAndPaymentsList[index].paidByFullName='';
    	$scope.payoffsAndPaymentsList[index].securedIndicator='';
    	$scope.payoffsAndPaymentsList[index].partialPayoffIndicator='';
    	//if($scope.payoffsAndPaymentsList[index].payOffType='')
    	$scope.payoffsAndPaymentsList[index].prepaymentPenaltyAmount='';
    }
    $scope.deletePayoff = function(index){
    	$scope.payoffsAndPaymentsList.splice(index,1);
    }
    $scope.amortizationChange = function(){
    	if($scope.cdformdata.loanInformation.amortizationType == 'Step'){
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
    /*$scope.negativeAmortizationChange = function(){
    	if($scope.cdformdata.loanDetail.negativeAmortizationIndicator == false){
    		$scope.cdformdata.negativeAmortization.negativeAmortizationType ='';
    	}
    }*/
	$scope.updateETIAComponentTypes = function(value, index) {
		var previousVal = $scope.cdformdata.etiaSection.etiaTypes[index];
		$scope.cdformdata.etiaSection.etiaTypes[index] = value;
		for(i=0; i<$scope.ETIAComponentTypes.length; i++){
			if($scope.ETIAComponentTypes[i].value == value) {
				$scope.ETIAComponentTypes[i].disabled = true;
				$scope.originationChargeDisplayLabelValue=$scope.sectionAfeeTypes[i].name;
			} else if ($scope.ETIAComponentTypes[i].value == previousVal) {
				$scope.ETIAComponentTypes[i].disabled = false;
			}
		}
	}
	$scope.updateSectionAfeeTypes = function(value, index) {
		var previousAfeeVal = $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.AfeeTypes[index];
       	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.AfeeTypes[index] = value;
		for(i=0; i<$scope.sectionAfeeTypes.length; i++){
			if($scope.sectionAfeeTypes[i].value == value) {
				$scope.sectionAfeeTypes[i].disabled = true;
				$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].displayLabel = $scope.sectionAfeeTypes[i].name;
			} else if ($scope.sectionAfeeTypes[i].value == previousAfeeVal) {
				$scope.sectionAfeeTypes[i].disabled = false;
			}
		}
	}
	$scope.updateSectionBfeeTypes = function(value, index) {
		var previousBfeeVal = $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.BfeeTypes[index];
		$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.BfeeTypes[index] = value;
		for(i=0; i<$scope.sectionBfeeTypes.length; i++){
			if($scope.sectionBfeeTypes[i].value == value) {
				$scope.sectionBfeeTypes[i].disabled = true;
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].displayLabel = $scope.sectionBfeeTypes[i].name;
			} else if ($scope.sectionBfeeTypes[i].value == previousBfeeVal) {
				$scope.sectionBfeeTypes[i].disabled = false;
			}
		}
	}
	$scope.updateSectionCfeeTypes = function(value, index) {
		var previousCfeeVal = $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.CfeeTypes[index];
		$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.CfeeTypes[index] = value;
		for(i=0; i<$scope.sectionCfeeTypes.length; i++){
			if($scope.sectionCfeeTypes[i].value == value) {
				$scope.sectionCfeeTypes[i].disabled = true;
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].displayLabel = $scope.sectionCfeeTypes[i].name;
			} else if ($scope.sectionCfeeTypes[i].value == previousCfeeVal) {
				$scope.sectionCfeeTypes[i].disabled = false;
			}
		}
	}
	$scope.updateSectionEfeeTypes = function(value, index) {
		var previousEfeeVal = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.EfeeTypes[index];
		$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.EfeeTypes[index] = value;
		for(i=0; i<$scope.sectionEfeeTypes.length; i++){
			if($scope.sectionEfeeTypes[i].value == value) {
				$scope.sectionEfeeTypes[i].disabled = true;
				$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].displayLabel = $scope.sectionEfeeTypes[i].name;
			} else if ($scope.sectionEfeeTypes[i].value == previousEfeeVal) {
				$scope.sectionEfeeTypes[i].disabled = false;
			}
		}
	}

	$scope.updateSectionFprepaidTypes = function(value, index) {
		var previousFprepaidVal = $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.FprepaidTypes[index];
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.FprepaidTypes[index] = value;
		for(i=0; i<$scope.prepaidItems.length; i++){
			if($scope.prepaidItems[i].value == value) {
				$scope.prepaidItems[i].disabled = true;
				$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[index].displayLabel = $scope.prepaidItems[i].name;
			} else if ($scope.prepaidItems[i].value == previousFprepaidVal) {
				$scope.prepaidItems[i].disabled = false;
			}
		}
	}

	$scope.updateSectionGescrowTypes = function(value, index) {
		var previousGescrowVal = $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.GescrowTypes[index];
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.GescrowTypes[index] = value;
		for(i=0; i<$scope.escrowItemTypes.length; i++){
			if($scope.escrowItemTypes[i].value == value) {
				$scope.escrowItemTypes[i].disabled = true;
				$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[index].displayLabel = $scope.escrowItemTypes[i].name;
			} else if ($scope.escrowItemTypes[i].value == previousGescrowVal) {
				$scope.escrowItemTypes[i].disabled = false;
			}
		}
	}

	$scope.updateSectionHfeeTypes = function(value, index) {
		var previousHfeeVal = $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.HfeeTypes[index];
		$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.HfeeTypes[index] = value;
		for(i=0; i<$scope.sectionHfeeTypes.length; i++){
			if($scope.sectionHfeeTypes[i].value == value) {
				$scope.sectionHfeeTypes[i].disabled = true;
				$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[index].displayLabel = $scope.sectionHfeeTypes[i].name;
			} else if ($scope.sectionHfeeTypes[i].value == previousHfeeVal) {
				$scope.sectionHfeeTypes[i].disabled = false;
			}
		}
	}

    $scope.sameBorrower = function(index){
    	var bCheck = $scope.cdformdata.transactionInformation.borrowerDetails[index];
    	if(bCheck.checkBorrower == true){
    	   $scope.cdformdata.transactionInformation.borrowerDetails[index] = angular.copy($scope.cdformdata.transactionInformation.borrowerDetails[0]);
    	   $scope.cdformdata.transactionInformation.borrowerDetails[index].checkBorrower = true;
    	   $scope.cdformdata.transactionInformation.borrowerDetails[index].nameModel.firstName = '';
    	   $scope.cdformdata.transactionInformation.borrowerDetails[index].nameModel.lastName = '';
    	   $scope.cdformdata.transactionInformation.borrowerDetails[index].nameModel.middleName = '';
    	   $scope.cdformdata.transactionInformation.borrowerDetails[index].nameModel.suffixName = '';
    	   $scope.cdformdata.transactionInformation.borrowerDetails[index].nameModel.fullName = '';
        }
    }
    $scope.sameSeller = function(index){
    	var sCheck = $scope.cdformdata.transactionInformation.sellerDetails[index];
    	if(sCheck.checkSeller == true){
    	   $scope.cdformdata.transactionInformation.sellerDetails[index] = angular.copy($scope.cdformdata.transactionInformation.sellerDetails[0]);
    	   $scope.cdformdata.transactionInformation.sellerDetails[index].checkSeller = true;
    	   $scope.cdformdata.transactionInformation.sellerDetails[index].nameModel.firstName = '';
    	   $scope.cdformdata.transactionInformation.sellerDetails[index].nameModel.lastName = '';
    	   $scope.cdformdata.transactionInformation.sellerDetails[index].nameModel.middleName = '';
    	   $scope.cdformdata.transactionInformation.sellerDetails[index].nameModel.suffixName = '';
    	   $scope.cdformdata.transactionInformation.sellerDetails[index].nameModel.fullName = '';
        }
    }
    $scope.addProjectedPayments = function(){
    	if($scope.cdformdata.projectedPayments.paymentCalculation.length <= 3){
	    	$scope.cdformdata.projectedPayments.paymentCalculation.push(angular.copy(paymentCalculation));
			$scope.cdformdata.projectedPayments.principalInterest.push(angular.copy(principalInterest));
			$scope.cdformdata.projectedPayments.mortgageInsurance.push(angular.copy(mortgageInsurance));
			$scope.cdformdata.projectedPayments.estimatedEscrow.push(angular.copy(estimatedEscrow));
			$scope.cdformdata.projectedPayments.estimatedTotal.push(angular.copy(estimatedTotal));
	    }
    }
    $scope.deleteProjectedPayments = function(index){
	    	$scope.cdformdata.projectedPayments.paymentCalculation.splice(index, 1);
			$scope.cdformdata.projectedPayments.principalInterest.splice(index, 1);
			$scope.cdformdata.projectedPayments.mortgageInsurance.splice(index, 1);
			$scope.cdformdata.projectedPayments.estimatedEscrow.splice(index, 1);
			$scope.cdformdata.projectedPayments.estimatedTotal.splice(index, 1);
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

    $scope.toleranceCheck = function(){
    	if($scope.cdformdata.closingCostsTotal.lenderCredits!='0.00' && $scope.cdformdata.closingCostsTotal.lenderCredits!='0' && $scope.cdformdata.closingCostsTotal.lenderCredits!='' && $scope.cdformdata.closingCostsTotal.lenderCredits!=null &&  $scope.cdformdata.closingCostsTotal.lenderCredits!=undefined){
    		$scope.toleranceCureDrpdwn = true;
    		$scope.cdformdata.closingCostsTotal.lenderCreditToleranceCureAmount='';
    	}
    	else{
    		$scope.toleranceCureDrpdwn = false;
    		$scope.toleranceCure = false;
    		$scope.cdformdata.closingCostsTotal.lenderCreditToleranceCureAmount='';
    	}
    }

    $scope.toleranceChange = function(){
    	if($scope.toleranceCureDrpdwn == true){
           $scope.toleranceCure = true;
    	   $scope.cdformdata.closingCostsTotal.lenderCreditToleranceCureAmount='';
    	}
    	else{
    		$scope.toleranceCure = false;
    	    $scope.cdformdata.closingCostsTotal.lenderCreditToleranceCureAmount='';
    	}
    }

     $scope.updateSectionMAdjustments = function(index) {
     	var selectedSectionKadjustmentTypes = [];
		for(var i=0; i<$scope.summariesOfTransaction_KSection.adjustments.length; i++) {
			if((i==0 || i==1) && $scope.summariesOfTransaction_KSection.adjustments[i].closingAdjustmentItemType) {
				var sellerAdjustment = $scope.summariesOfTransaction_KSection.adjustments[i];
				sellerAdjustment['isFromBorrower'] = true;
				sellerAdjustment.integratedDisclosureSectionType = "DueToSellerAtClosing";
				$scope.summariesOfTransaction_MSection.adjustments.splice(i, 0, sellerAdjustment);
			}
			if($scope.summariesOfTransaction_KSection.adjustments[i].closingAdjustmentItemType && selectedSectionKadjustmentTypes.indexOf($scope.summariesOfTransaction_KSection.adjustments[i].closingAdjustmentItemType) == -1) {
				selectedSectionKadjustmentTypes.push($scope.summariesOfTransaction_KSection.adjustments[i].closingAdjustmentItemType);
			}
		}
		for(var i=0; i<selectedSectionKadjustmentTypes.length; i++) {
			for(var j=0; j<$scope.summariesOfTransaction_MSection.adjustments.length; j++) {
				if(j!=0 && j!=1 && selectedSectionKadjustmentTypes[i]==$scope.summariesOfTransaction_MSection.adjustments[j].closingAdjustmentItemType) {
					$scope.summariesOfTransaction_MSection.adjustments.splice(j,1);
					j--;
				}
			}
		}
		if($scope.summariesOfTransaction_MSection.adjustments.length > 5) {
			$scope.summariesOfTransaction_MSection.adjustments = $scope.summariesOfTransaction_MSection.adjustments.splice(0, 5);
		}
		for(i=$scope.summariesOfTransaction_MSection.adjustments.length; i<5; i++) {
			var sellerAdjustment = angular.copy(adjustment);
			sellerAdjustment.integratedDisclosureSectionType='DueToSellerAtClosing';
			sellerAdjustment.integratedDisclosureSubsectionType = 'Adjustments';
			sellerAdjustment['isFromBorrower'] = false;
			$scope.summariesOfTransaction_MSection.adjustments.push(sellerAdjustment);
		}

     }

    $scope.updateOtherCreditsFullName = function(index) {
    	var paidAlreadyByAdjustmentsOtherCredit = $scope.paidAlreadyByAdjustmentsOtherCredits[index];
    	if(paidAlreadyByAdjustmentsOtherCredit.payeeType=='Organization') {
    		paidAlreadyByAdjustmentsOtherCredit.paidByEntityFullName = paidAlreadyByAdjustmentsOtherCredit.fullName;
    	} else if (paidAlreadyByAdjustmentsOtherCredit.payeeType=='Individual') {
    		paidAlreadyByAdjustmentsOtherCredit.paidByIndividualFullName = paidAlreadyByAdjustmentsOtherCredit.fullName;
    	}
    }

    $scope.updatePropertyValuationMethodType = function() {
    	$scope.cdformdata.closingInformation.propertyValuationDetail.propertyValuationMethodTypeOtherDescription = $scope.cdformdata.closingInformation.propertyValuationDetail.propertyValuationMethodType!='Other' ? '' : $scope.cdformdata.closingInformation.propertyValuationDetail.propertyValuationMethodTypeOtherDescription;
    }

    $scope.deleteOC = function(index){
    	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.splice(index,1);
    }

    $scope.deleteSDidNot = function(index){
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.splice(index,1);
    }

    $scope.deleteSDid = function(index){
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.splice(index,1);
    }

    $scope.clearOC = function(index){
    	if(index==0){
    	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].feeTotalPercent ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].feePaidToType ='Lender';
    	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].feePaidToTypeOtherDescription ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].feePaidToFullName ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].bpAtClosing ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].bpB4Closing ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].spAtClosing ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].spB4Closing ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].paidByOthers ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].lenderStatus ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].paymentIncludedInAPRIndicator = true;
    	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].regulationZPointsAndFeesIndicator = true;
    	}
    	else{
    	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].feeTotalPercent ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].displayLabel ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].feeType ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].feeTypeOtherDescription ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].feePaidToType ='Lender';
    	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].feePaidToTypeOtherDescription ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].feePaidToFullName ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].bpAtClosing ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].bpB4Closing ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].spAtClosing ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].spB4Closing ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].paidByOthers ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].lenderStatus ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].paymentIncludedInAPRIndicator = true;
    	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].regulationZPointsAndFeesIndicator = true;
        }
    }
	
	$scope.clearSDidNot = function(index){
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feeTotalPercent ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].displayLabel ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feeType ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feeTypeOtherDescription ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToType ='ThirdPartyProvider';
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToTypeOtherDescription ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToFullName ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].bpAtClosing ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].bpB4Closing ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].spAtClosing ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].spB4Closing ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].paidByOthers ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].lenderStatus ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].paymentIncludedInAPRIndicator = true;
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].regulationZPointsAndFeesIndicator = true;
    }

    $scope.clearSDid = function(index){
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feeTotalPercent ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].displayLabel ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feeType ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feeTypeOtherDescription ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToType ='ThirdPartyProvider';
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToTypeOtherDescription ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToFullName ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].bpAtClosing ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].bpB4Closing ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].spAtClosing ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].spB4Closing ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].paidByOthers ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].lenderStatus ='';
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].paymentIncludedInAPRIndicator = true;
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].regulationZPointsAndFeesIndicator = true;
    }
    $scope.clearRecordings = function(){
        $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].recordingFeeForDeed='';
    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].recordingFeeForMortgage='';
    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].feePaidToType='ThirdPartyProvider';
	    $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].feePaidToTypeOtherDescription='';
    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].bpAtClosing='';
    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].bpB4Closing='';
    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].spAtClosing='';
    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].spB4Closing='';
    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].paidByOthers='';
    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].lenderStatus='';
    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].feeTypeOtherDescription='';
    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].paymentIncludedInAPRIndicator = true;
    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].regulationZPointsAndFeesIndicator = true;
    }
    //deleteOGF
    $scope.clearOGF = function(index){

    	if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].feeType =='TransferTaxTotal'){
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].bpAtClosing='';
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].bpB4Closing='';
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].spAtClosing='';
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].spB4Closing='';
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].paidByOthers='';
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].lenderStatus='';
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].feePaidToFullName='';
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].feeActualTotalAmount='';
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].feePaidToType='ThirdPartyProvider';
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].feePaidToTypeOtherDescription='';
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].feePercentBasisType='';
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].feeTotalPercent='';
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].feeTypeOtherDescription='';
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].paymentIncludedInAPRIndicator = true;
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].regulationZPointsAndFeesIndicator = true;
    	}
    	else{
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].bpAtClosing='';
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].bpB4Closing='';
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].spAtClosing='';
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].spB4Closing='';
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].paidByOthers='';
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].lenderStatus='';
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].displayLabel='';
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].gseDisplayLabel='';
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].feePaidToFullName='';
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].feeActualTotalAmount='';
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].feePaidToType='ThirdPartyProvider';
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].feePaidToTypeOtherDescription='';
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].feePercentBasisType='';
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].feeTotalPercent='';
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].feeType='';
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].feeTypeOtherDescription='';
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].paymentIncludedInAPRIndicator = true;
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].regulationZPointsAndFeesIndicator = true;
        }
    }
    $scope.deleteOGF = function(index){
        $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.splice(index,1);
    }
    //Prepaid Interest
    $scope.clearPrepaid = function(i){
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemPerDiemAmount = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemPerDiemCalculationMethodType = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemPaidFromDate = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemPaidThroughDate = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpAtClosing = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpB4Closing = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spAtClosing = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spB4Closing = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].paidByOthers = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].lenderStatus = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].paymentIncludedInAPRIndicator = true;
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].regulationZPointsAndFeesIndicator = true;
    }

    $scope.clearPrepaidInfo = function(i){
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].feePaidToType = 'ThirdPartyProvider';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].feePaidToTypeOtherDescription = 'ThirdPartyProvider';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidPaidToFullName = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpAtClosing = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpB4Closing = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spAtClosing = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spB4Closing = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].paidByOthers = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].lenderStatus = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].paymentIncludedInAPRIndicator = true;
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].regulationZPointsAndFeesIndicator = true;
    }
    
    $scope.clearPrepaidList = function(i){
    	$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType = '';
    	$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].displayLabel = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].feePaidToType = 'ThirdPartyProvider';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].feePaidToTypeOtherDescription = 'ThirdPartyProvider';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidPaidToFullName = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpAtClosing = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpB4Closing = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spAtClosing = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spB4Closing = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].paidByOthers = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].lenderStatus = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].paymentIncludedInAPRIndicator = true;
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].regulationZPointsAndFeesIndicator = true;
    }

    $scope.deletePrepaidInfo = function(i){
    	$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.splice(i,1);
    }

    //Escrows

    $scope.clearEscrow = function(i){
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowMonthlyPaymentAmount = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowCollectedNumberOfMonthsCount = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].feePaidToType = 'ThirdPartyProvider';
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].feePaidToTypeOtherDescription = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpAtClosing = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpB4Closing = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].spAtClosing = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].spB4Closing = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].paidByOthers = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].lenderStatus = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].paymentIncludedInAPRIndicator = true;
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].regulationZPointsAndFeesIndicator = true;
    }
    
    $scope.clearEscrowsList = function(i){
    	$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType = '';
    	$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].displayLabel = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].feePaidToType = 'ThirdPartyProvider';
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].feePaidToTypeOtherDescription = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].prepaidPaidToFullName = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpAtClosing = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpB4Closing = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].spAtClosing = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].spB4Closing = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].paidByOthers = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].lenderStatus = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].paymentIncludedInAPRIndicator = true;
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].regulationZPointsAndFeesIndicator = true;
    }

    $scope.deleteEscrowsList = function(i){
    	$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.splice(i,1);
    }
    
    $scope.clearOthers = function(i){
    	$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].displayLabel = '';
    	$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].feeType = '';
    	$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].feeTypeOtherDescription = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].feePaidToType = 'ThirdPartyProvider';
		$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].feePaidToTypeOtherDescription = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].feePaidToFullName = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].bpAtClosing = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].bpB4Closing = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].spAtClosing = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].spB4Closing = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].paidByOthers = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].lenderStatus = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].paymentIncludedInAPRIndicator = true;
		$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].regulationZPointsAndFeesIndicator = true;
    }
    $scope.deleteOthers = function(i){
    	$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.splice(i,1);
    }
    $scope.sectionApaidToChange = function(index){
    	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].feePaidToTypeOtherDescription = '';
    }
    $scope.sectionBpaidToChange = function(index){
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToTypeOtherDescription = '';
    }
    $scope.sectionCpaidToChange = function(index){
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToTypeOtherDescription = '';
    }
    $scope.sectionEpaidToChange = function(index){
    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].feePaidToTypeOtherDescription = '';
    }
    $scope.sectionFpaidToChange = function(index){
    	$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[index].feePaidToTypeOtherDescription = '';
    }
    $scope.sectionGpaidToChange = function(index){
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[index].feePaidToTypeOtherDescription = '';
    }
    $scope.sectionHpaidToChange = function(index){
    	$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[index].feePaidToTypeOtherDescription = '';
    }

    $scope.aggregateAdjustment = function(value){
    	//alert(value);
    	 bpAtClosing.iEPatClosingTotalbpAtClosing = 0;
    	if(value!=undefined && value!=""){
    		for(i=0; i<$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.length; i++) {
         	   bpAtClosing.iEPatClosingTotalbpAtClosing += $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpAtClosing) : +0;
            }
       	    bpAtClosing.iEPatClosingTotalbpAtClosing  += parseFloat(value);
	        $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount = bpAtClosing.iEPatClosingTotalbpAtClosing + bpB4Closing.iEPatClosingTotalbpB4Closing;
	        $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.otherTotalAmount;
	        $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing = parseFloat(bpAtClosing.tOGovtFeesTotalbpAtClosing) + parseFloat(bpAtClosing.prepaidsTotalbpAtClosing) + parseFloat(bpAtClosing.iEPatClosingTotalbpAtClosing) + parseFloat(bpAtClosing.otherTotalbpAtClosing);
	        $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing);
	        $scope.cdformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostsTotal.lenderCredits=='' || $scope.cdformdata.closingCostsTotal.lenderCredits==undefined ? +0 : $scope.cdformdata.closingCostsTotal.lenderCredits);
       }
       else if(value==undefined || value==""){
       	    value=0;
       	    for(i=0; i<$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.length; i++) {
         	   bpAtClosing.iEPatClosingTotalbpAtClosing += $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpAtClosing) : +0;
            }
       	    bpAtClosing.iEPatClosingTotalbpAtClosing  += parseFloat(value);
	        $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount = bpAtClosing.iEPatClosingTotalbpAtClosing + bpB4Closing.iEPatClosingTotalbpB4Closing;
	        $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.otherTotalAmount;
	        $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing = parseFloat(bpAtClosing.tOGovtFeesTotalbpAtClosing) + parseFloat(bpAtClosing.prepaidsTotalbpAtClosing) + parseFloat(bpAtClosing.iEPatClosingTotalbpAtClosing) + parseFloat(bpAtClosing.otherTotalbpAtClosing);
	        $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing);
	        $scope.cdformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostsTotal.lenderCredits=='' || $scope.cdformdata.closingCostsTotal.lenderCredits==undefined ? +0 : $scope.cdformdata.closingCostsTotal.lenderCredits);
       }
    }
    
    $scope.loanDiscount = function(index){
 	   var loanDiscountAmount = 0;
       loanDiscountAmount = $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].feeTotalPercent ? ($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].feeTotalPercent*$scope.cdformdata.termsOfLoan.noteAmount)/100 : +0;
 	   $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].bpAtClosing = loanDiscountAmount; 
    }

    $scope.recordingTotal = function(){
    	var recordingFeeAmount = 0;
        if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].recordingFeeForDeed)
        recordingFeeAmount += parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].recordingFeeForDeed);
        if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].recordingFeeForMortgage)
        recordingFeeAmount += parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].recordingFeeForMortgage);
        if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].recordingFeeForDeed!="" || $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].recordingFeeForMortgage!="")
        {
          $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].bpAtClosing = recordingFeeAmount;
        }
    }
    
    $scope.perDiemCalc = function(){
    	for(i=0; i<$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.length; i++) {
	    	if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType == 'PrepaidInterest'){
				var fromDate = new Date($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemPaidFromDate);
				var toDate = new Date($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemPaidThroughDate);
				var diemAmount = 0;
				var timeDiff = Math.abs(toDate.getTime() - fromDate.getTime());
				var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
				diemAmount =  $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemPerDiemAmount ? $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemPerDiemAmount : +0;
				$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpAtClosing = parseFloat(diemAmount*diffDays);
		    }
	    }
    }

    $scope.amountPerMonth = function(index){
    	var amount = 0;
		var months = 0;
		if($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[index].escrowMonthlyPaymentAmount && $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[index].escrowCollectedNumberOfMonthsCount){
			amount = $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[index].escrowMonthlyPaymentAmount ? $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[index].escrowMonthlyPaymentAmount : +0;
			months = $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[index].escrowCollectedNumberOfMonthsCount ? $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[index].escrowCollectedNumberOfMonthsCount : +0;
			$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[index].bpAtClosing = parseFloat(amount*months);
	    }else{
            $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[index].bpAtClosing = '';
	    }
    }
    
    $scope.$watchCollection('[cdformdata.loanInformation.loanTermYears, cdformdata.loanInformation.loanTermMonths]', function(newValues, oldValues){
    	$scope.cdformdata.maturityRule.loanMaturityPeriodCount = 0;
    	if($scope.cdformdata.loanInformation.loanTermYears)
    		$scope.cdformdata.maturityRule.loanMaturityPeriodCount = parseInt($scope.cdformdata.loanInformation.loanTermYears * 12);
    	if($scope.cdformdata.loanInformation.loanTermMonths)
    		$scope.cdformdata.maturityRule.loanMaturityPeriodCount = $scope.cdformdata.maturityRule.loanMaturityPeriodCount + parseInt($scope.cdformdata.loanInformation.loanTermMonths);
    	$scope.cdformdata.maturityRule.loanMaturityPeriodType = 'Month';
    });

    $scope.$watch('cdformdata.loanDetail.negativeAmortizationIndicator', function(newValue, oldValue){
    	if($scope.cdformdata.loanDetail.negativeAmortizationIndicator) {
    		$scope.cdformdata.loanDetail.loanAmountIncreaseIndicator = true;
    	}
    	else {
    		$scope.cdformdata.loanDetail.loanAmountIncreaseIndicator = false;
    		$scope.cdformdata.negativeAmortization.negativeAmortizationType = '';
    	}
    }, true);
    
    $scope.$watch('cdformdata.closingCostsTotal.closingCostsSubtotal', function(newValue, oldValue){
    	if($scope.cdformdata.closingCostsTotal.closingCostsSubtotal) {
    		$scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing = $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing;
    		$scope.summariesOfTransaction_NSection.closingCostsPaidAtClosing = $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing;
    	}
    	else {
    		$scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing = 0;
    		$scope.summariesOfTransaction_NSection.closingCostsPaidAtClosing = 0;
    	}
    }, true);

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
         	bpAtClosing.originationChargeTotalbpAtClosing += $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpAtClosing) : +0;
         	bpB4Closing.originationChargeTotalbpB4Closing += $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpB4Closing) : +0;
         	spAtClosing.originationChargeTotalspAtClosing += $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spAtClosing) : +0;
          	spB4Closing.originationChargeTotalspB4Closing += $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spB4Closing) : +0;
          	paidByOthers.originationChargeTotalpaidByOthers += $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].paidByOthers ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].paidByOthers) : +0;
         }

         $scope.cdformdata.closingCostDetailsLoanCosts.ocTotalAmount = bpAtClosing.originationChargeTotalbpAtClosing + bpB4Closing.originationChargeTotalbpB4Closing;
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpAtClosing = parseFloat(bpAtClosing.originationChargeTotalbpAtClosing) + parseFloat(bpAtClosing.sbDidNotShopTotalbpAtClosing) + parseFloat(bpAtClosing.sbDidShopTotalbpAtClosing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpB4Closing = parseFloat(bpB4Closing.originationChargeTotalbpB4Closing) + parseFloat(bpB4Closing.sbDidNotShopTotalbpB4Closing) + parseFloat(bpB4Closing.sbDidShopTotalbpB4Closing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spAtClosing = parseFloat(spAtClosing.originationChargeTotalspAtClosing) + parseFloat(spAtClosing.sbDidNotShopTotalspAtClosing) + parseFloat(spAtClosing.sbDidShopTotalspAtClosing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spB4Closing = parseFloat(spB4Closing.originationChargeTotalspB4Closing) + parseFloat(spB4Closing.sbDidNotShopTotalspB4Closing) + parseFloat(spB4Closing.sbDidShopTotalspB4Closing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers = parseFloat(paidByOthers.originationChargeTotalpaidByOthers) + parseFloat(paidByOthers.sbDidNotShopTotalpaidByOthers) + parseFloat(paidByOthers.sbDidShopTotalpaidByOthers);
         
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount = $scope.cdformdata.closingCostDetailsLoanCosts.ocTotalAmount + $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopTotalAmount + $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopTotalAmount;
         $scope.cdformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostsTotal.lenderCredits=='' || $scope.cdformdata.closingCostsTotal.lenderCredits==undefined ? +0 : $scope.cdformdata.closingCostsTotal.lenderCredits);
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
         	bpAtClosing.sbDidNotShopTotalbpAtClosing += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpAtClosing) : +0;
         	bpB4Closing.sbDidNotShopTotalbpB4Closing += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpB4Closing) : +0;
         	spAtClosing.sbDidNotShopTotalspAtClosing += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spAtClosing) : +0;
          	spB4Closing.sbDidNotShopTotalspB4Closing += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spB4Closing) : +0;
          	paidByOthers.sbDidNotShopTotalpaidByOthers += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].paidByOthers ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].paidByOthers) : +0;
         }
         $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopTotalAmount = bpAtClosing.sbDidNotShopTotalbpAtClosing + bpB4Closing.sbDidNotShopTotalbpB4Closing;
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpAtClosing = parseFloat(bpAtClosing.originationChargeTotalbpAtClosing) + parseFloat(bpAtClosing.sbDidNotShopTotalbpAtClosing) + parseFloat(bpAtClosing.sbDidShopTotalbpAtClosing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpB4Closing = parseFloat(bpB4Closing.originationChargeTotalbpB4Closing) + parseFloat(bpB4Closing.sbDidNotShopTotalbpB4Closing) + parseFloat(bpB4Closing.sbDidShopTotalbpB4Closing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spAtClosing = parseFloat(spAtClosing.originationChargeTotalspAtClosing) + parseFloat(spAtClosing.sbDidNotShopTotalspAtClosing) + parseFloat(spAtClosing.sbDidShopTotalspAtClosing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spB4Closing = parseFloat(spB4Closing.originationChargeTotalspB4Closing) + parseFloat(spB4Closing.sbDidNotShopTotalspB4Closing) + parseFloat(spB4Closing.sbDidShopTotalspB4Closing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers = parseFloat(paidByOthers.originationChargeTotalpaidByOthers) + parseFloat(paidByOthers.sbDidNotShopTotalpaidByOthers) + parseFloat(paidByOthers.sbDidShopTotalpaidByOthers);
         
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount = $scope.cdformdata.closingCostDetailsLoanCosts.ocTotalAmount + $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopTotalAmount + $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopTotalAmount;
         $scope.cdformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostsTotal.lenderCredits=='' || $scope.cdformdata.closingCostsTotal.lenderCredits==undefined ? +0 : $scope.cdformdata.closingCostsTotal.lenderCredits);
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
         	bpAtClosing.sbDidShopTotalbpAtClosing += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpAtClosing) : +0;
         	bpB4Closing.sbDidShopTotalbpB4Closing += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpB4Closing) : +0;
         	spAtClosing.sbDidShopTotalspAtClosing += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spAtClosing) : +0;
          	spB4Closing.sbDidShopTotalspB4Closing += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spB4Closing) : +0;
          	paidByOthers.sbDidShopTotalpaidByOthers += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].paidByOthers ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].paidByOthers) : +0;
        }
         $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopTotalAmount = bpAtClosing.sbDidShopTotalbpAtClosing + bpB4Closing.sbDidShopTotalbpB4Closing;
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpAtClosing = parseFloat(bpAtClosing.originationChargeTotalbpAtClosing) + parseFloat(bpAtClosing.sbDidNotShopTotalbpAtClosing) + parseFloat(bpAtClosing.sbDidShopTotalbpAtClosing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpB4Closing = parseFloat(bpB4Closing.originationChargeTotalbpB4Closing) + parseFloat(bpB4Closing.sbDidNotShopTotalbpB4Closing) + parseFloat(bpB4Closing.sbDidShopTotalbpB4Closing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spAtClosing = parseFloat(spAtClosing.originationChargeTotalspAtClosing) + parseFloat(spAtClosing.sbDidNotShopTotalspAtClosing) + parseFloat(spAtClosing.sbDidShopTotalspAtClosing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spB4Closing = parseFloat(spB4Closing.originationChargeTotalspB4Closing) + parseFloat(spB4Closing.sbDidNotShopTotalspB4Closing) + parseFloat(spB4Closing.sbDidShopTotalspB4Closing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers = parseFloat(paidByOthers.originationChargeTotalpaidByOthers) + parseFloat(paidByOthers.sbDidNotShopTotalpaidByOthers) + parseFloat(paidByOthers.sbDidShopTotalpaidByOthers);
         
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount = $scope.cdformdata.closingCostDetailsLoanCosts.ocTotalAmount + $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopTotalAmount + $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopTotalAmount;
         $scope.cdformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostsTotal.lenderCredits=='' || $scope.cdformdata.closingCostsTotal.lenderCredits==undefined ? +0 : $scope.cdformdata.closingCostsTotal.lenderCredits);
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
         	bpAtClosing.tOGovtFeesTotalbpAtClosing += $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpAtClosing) : +0;
         	bpB4Closing.tOGovtFeesTotalbpB4Closing += $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpB4Closing) : +0;
         	spAtClosing.tOGovtFeesTotalspAtClosing += $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].spAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].spAtClosing) : +0;
          	spB4Closing.tOGovtFeesTotalspB4Closing += $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].spB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].spB4Closing) : +0;
          	paidByOthers.tOGovtFeesTotalpaidByOthers += $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].paidByOthers ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].paidByOthers) : +0;
         }

         $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount = bpAtClosing.tOGovtFeesTotalbpAtClosing + bpB4Closing.tOGovtFeesTotalbpB4Closing;
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing = parseFloat(bpAtClosing.tOGovtFeesTotalbpAtClosing) + parseFloat(bpAtClosing.prepaidsTotalbpAtClosing) + parseFloat(bpAtClosing.iEPatClosingTotalbpAtClosing) + parseFloat(bpAtClosing.otherTotalbpAtClosing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpB4Closing = parseFloat(bpB4Closing.tOGovtFeesTotalbpB4Closing) + parseFloat(bpB4Closing.prepaidsTotalbpB4Closing) + parseFloat(bpB4Closing.iEPatClosingTotalbpB4Closing) + parseFloat(bpB4Closing.otherTotalbpB4Closing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing = parseFloat(spAtClosing.tOGovtFeesTotalspAtClosing) + parseFloat(spAtClosing.prepaidsTotalspAtClosing) + parseFloat(spAtClosing.iEPatClosingTotalspAtClosing) + parseFloat(spAtClosing.otherTotalspAtClosing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spB4Closing = parseFloat(spB4Closing.tOGovtFeesTotalspB4Closing) + parseFloat(spB4Closing.prepaidsTotalspB4Closing) + parseFloat(spB4Closing.iEPatClosingTotalspB4Closing) + parseFloat(spB4Closing.otherTotalspB4Closing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers = parseFloat(paidByOthers.tOGovtFeesTotalpaidByOthers) + parseFloat(paidByOthers.prepaidsTotalpaidByOthers) + parseFloat(paidByOthers.iEPatClosingTotalpaidByOthers) + parseFloat(paidByOthers.otherTotalpaidByOthers);
         
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.otherTotalAmount;
         $scope.cdformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostsTotal.lenderCredits=='' || $scope.cdformdata.closingCostsTotal.lenderCredits==undefined ? +0 : $scope.cdformdata.closingCostsTotal.lenderCredits);
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
         	bpAtClosing.prepaidsTotalbpAtClosing += $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpAtClosing) : +0;
         	bpB4Closing.prepaidsTotalbpB4Closing += $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpB4Closing) : +0;
         	spAtClosing.prepaidsTotalspAtClosing += $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spAtClosing) : +0;
          	spB4Closing.prepaidsTotalspB4Closing += $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spB4Closing) : +0;
          	paidByOthers.prepaidsTotalpaidByOthers += $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].paidByOthers ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].paidByOthers) : +0;
         }

         $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount = bpAtClosing.prepaidsTotalbpAtClosing + bpB4Closing.prepaidsTotalbpB4Closing;
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing = parseFloat(bpAtClosing.tOGovtFeesTotalbpAtClosing) + parseFloat(bpAtClosing.prepaidsTotalbpAtClosing) + parseFloat(bpAtClosing.iEPatClosingTotalbpAtClosing) + parseFloat(bpAtClosing.otherTotalbpAtClosing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpB4Closing = parseFloat(bpB4Closing.tOGovtFeesTotalbpB4Closing) + parseFloat(bpB4Closing.prepaidsTotalbpB4Closing) + parseFloat(bpB4Closing.iEPatClosingTotalbpB4Closing) + parseFloat(bpB4Closing.otherTotalbpB4Closing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing = parseFloat(spAtClosing.tOGovtFeesTotalspAtClosing) + parseFloat(spAtClosing.prepaidsTotalspAtClosing) + parseFloat(spAtClosing.iEPatClosingTotalspAtClosing) + parseFloat(spAtClosing.otherTotalspAtClosing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spB4Closing = parseFloat(spB4Closing.tOGovtFeesTotalspB4Closing) + parseFloat(spB4Closing.prepaidsTotalspB4Closing) + parseFloat(spB4Closing.iEPatClosingTotalspB4Closing) + parseFloat(spB4Closing.otherTotalspB4Closing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers = parseFloat(paidByOthers.tOGovtFeesTotalpaidByOthers) + parseFloat(paidByOthers.prepaidsTotalpaidByOthers) + parseFloat(paidByOthers.iEPatClosingTotalpaidByOthers) + parseFloat(paidByOthers.otherTotalpaidByOthers);
         
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.otherTotalAmount;
         $scope.cdformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostsTotal.lenderCredits=='' || $scope.cdformdata.closingCostsTotal.lenderCredits==undefined ? +0 : $scope.cdformdata.closingCostsTotal.lenderCredits);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpB4Closing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpB4Closing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spB4Closing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spB4Closing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.paidByOthers = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers);
    }, true);

    $scope.$watch('cdformdata.closingCostDetailsOtherCosts.escrowItemsList', function(newValue, oldValue) {
		 bpAtClosing.iEPatClosingTotalbpAtClosing = 0;
		 bpB4Closing.iEPatClosingTotalbpB4Closing = 0;
		 spAtClosing.iEPatClosingTotalspAtClosing = 0;
		 spB4Closing.iEPatClosingTotalspB4Closing = 0;
		 paidByOthers.iEPatClosingTotalpaidByOthers = 0;

         for(i=0; i<$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.length; i++) {
         	/*var amount = 0;
			var months = 0;
			amount = $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowMonthlyPaymentAmount ? $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowMonthlyPaymentAmount : +0;
			months = $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowCollectedNumberOfMonthsCount ? $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowCollectedNumberOfMonthsCount : +0;
			$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpAtClosing = parseFloat(amount*months);*/
         	bpAtClosing.iEPatClosingTotalbpAtClosing += $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpAtClosing) : +0;
         	bpB4Closing.iEPatClosingTotalbpB4Closing += $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpB4Closing) : +0;
         	spAtClosing.iEPatClosingTotalspAtClosing += $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].spAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].spAtClosing) : +0;
          	spB4Closing.iEPatClosingTotalspB4Closing += $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].spB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].spB4Closing) : +0;
          	paidByOthers.iEPatClosingTotalpaidByOthers += $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].paidByOthers ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].paidByOthers) : +0;
         }

         bpAtClosing.iEPatClosingTotalbpAtClosing += ($scope.cdformdata.closingDisclosureDocDetails.escrowAggregateAccountingAdjustmentAmount == '' || undefined == $scope.cdformdata.closingDisclosureDocDetails.escrowAggregateAccountingAdjustmentAmount) ? +0 : parseFloat($scope.cdformdata.closingDisclosureDocDetails.escrowAggregateAccountingAdjustmentAmount);

         $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount = bpAtClosing.iEPatClosingTotalbpAtClosing + bpB4Closing.iEPatClosingTotalbpB4Closing;
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing = parseFloat(bpAtClosing.tOGovtFeesTotalbpAtClosing) + parseFloat(bpAtClosing.prepaidsTotalbpAtClosing) + parseFloat(bpAtClosing.iEPatClosingTotalbpAtClosing) + parseFloat(bpAtClosing.otherTotalbpAtClosing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpB4Closing = parseFloat(bpB4Closing.tOGovtFeesTotalbpB4Closing) + parseFloat(bpB4Closing.prepaidsTotalbpB4Closing) + parseFloat(bpB4Closing.iEPatClosingTotalbpB4Closing) + parseFloat(bpB4Closing.otherTotalbpB4Closing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing = parseFloat(spAtClosing.tOGovtFeesTotalspAtClosing) + parseFloat(spAtClosing.prepaidsTotalspAtClosing) + parseFloat(spAtClosing.iEPatClosingTotalspAtClosing) + parseFloat(spAtClosing.otherTotalspAtClosing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spB4Closing = parseFloat(spB4Closing.tOGovtFeesTotalspB4Closing) + parseFloat(spB4Closing.prepaidsTotalspB4Closing) + parseFloat(spB4Closing.iEPatClosingTotalspB4Closing) + parseFloat(spB4Closing.otherTotalspB4Closing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers = parseFloat(paidByOthers.tOGovtFeesTotalpaidByOthers) + parseFloat(paidByOthers.prepaidsTotalpaidByOthers) + parseFloat(paidByOthers.iEPatClosingTotalpaidByOthers) + parseFloat(paidByOthers.otherTotalpaidByOthers);
         
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.otherTotalAmount;
         $scope.cdformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostsTotal.lenderCredits=='' || $scope.cdformdata.closingCostsTotal.lenderCredits==undefined ? +0 : $scope.cdformdata.closingCostsTotal.lenderCredits);
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
         	bpAtClosing.otherTotalbpAtClosing += $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].bpAtClosing) : +0;
         	bpB4Closing.otherTotalbpB4Closing += $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].bpB4Closing) : +0;
         	spAtClosing.otherTotalspAtClosing += $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].spAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].spAtClosing) : +0;
          	spB4Closing.otherTotalspB4Closing += $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].spB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].spB4Closing) : +0;
          	paidByOthers.otherTotalpaidByOthers += $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].paidByOthers ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].paidByOthers) : +0;
         }

         $scope.cdformdata.closingCostDetailsOtherCosts.otherTotalAmount = bpAtClosing.otherTotalbpAtClosing + bpB4Closing.otherTotalbpB4Closing;
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing = parseFloat(bpAtClosing.tOGovtFeesTotalbpAtClosing) + parseFloat(bpAtClosing.prepaidsTotalbpAtClosing) + parseFloat(bpAtClosing.iEPatClosingTotalbpAtClosing) + parseFloat(bpAtClosing.otherTotalbpAtClosing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpB4Closing = parseFloat(bpB4Closing.tOGovtFeesTotalbpB4Closing) + parseFloat(bpB4Closing.prepaidsTotalbpB4Closing) + parseFloat(bpB4Closing.iEPatClosingTotalbpB4Closing) + parseFloat(bpB4Closing.otherTotalbpB4Closing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing = parseFloat(spAtClosing.tOGovtFeesTotalspAtClosing) + parseFloat(spAtClosing.prepaidsTotalspAtClosing) + parseFloat(spAtClosing.iEPatClosingTotalspAtClosing) + parseFloat(spAtClosing.otherTotalspAtClosing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spB4Closing = parseFloat(spB4Closing.tOGovtFeesTotalspB4Closing) + parseFloat(spB4Closing.prepaidsTotalspB4Closing) + parseFloat(spB4Closing.iEPatClosingTotalspB4Closing) + parseFloat(spB4Closing.otherTotalspB4Closing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers = parseFloat(paidByOthers.tOGovtFeesTotalpaidByOthers) + parseFloat(paidByOthers.prepaidsTotalpaidByOthers) + parseFloat(paidByOthers.iEPatClosingTotalpaidByOthers) + parseFloat(paidByOthers.otherTotalpaidByOthers);
         
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.otherTotalAmount;
         $scope.cdformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostsTotal.lenderCredits=='' || $scope.cdformdata.closingCostsTotal.lenderCredits==undefined ? +0 : $scope.cdformdata.closingCostsTotal.lenderCredits);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpB4Closing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpB4Closing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spB4Closing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spB4Closing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.paidByOthers = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers);
    }, true);

    $scope.$watch('cdformdata.cashToCloses', function(newValue,oldValue){
    	var cashToCloseItemEstimatedAmount = 0;
    	var cashToCloseItemFinalAmount = 0;
    	if($scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemEstimatedAmount)
    	cashToCloseItemEstimatedAmount +=  $scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemEstimatedAmount);
    	if($scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount)
    	cashToCloseItemEstimatedAmount +=  $scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount);
    	if($scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemEstimatedAmount)
    	cashToCloseItemEstimatedAmount +=  $scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemEstimatedAmount);
    	if($scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemEstimatedAmount)
    	cashToCloseItemEstimatedAmount +=  $scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemEstimatedAmount);
    	if($scope.cdformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemEstimatedAmount)
    	cashToCloseItemEstimatedAmount +=  $scope.cdformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemEstimatedAmount);
    	if($scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemEstimatedAmount)
    	cashToCloseItemEstimatedAmount +=  $scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemEstimatedAmount);
    	if($scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemEstimatedAmount)
    	cashToCloseItemEstimatedAmount +=  $scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemEstimatedAmount == ''  ? +0 : parseFloat($scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemEstimatedAmount);
    	if($scope.cdformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemEstimatedAmount)
    	cashToCloseItemEstimatedAmount +=  $scope.cdformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemEstimatedAmount);
    	if($scope.cdformdata.cashToCloses.sellerCredits.integratedDisclosureCashToCloseItemEstimatedAmount)
    	cashToCloseItemEstimatedAmount +=  $scope.cdformdata.cashToCloses.sellerCredits.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.sellerCredits.integratedDisclosureCashToCloseItemEstimatedAmount);
    	if($scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemEstimatedAmount)
    	cashToCloseItemEstimatedAmount +=  $scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemEstimatedAmount);
        
        if($scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemFinalAmount)
        cashToCloseItemFinalAmount +=  $scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemFinalAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemFinalAmount);
    	if($scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemFinalAmount)
    	cashToCloseItemFinalAmount +=  $scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemFinalAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemFinalAmount);
    	if($scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemFinalAmount)
    	cashToCloseItemFinalAmount +=  $scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemFinalAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemFinalAmount);
    	if($scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemFinalAmount)
    	cashToCloseItemFinalAmount +=  $scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemFinalAmount == ''  ? +0 : parseFloat($scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemFinalAmount);
    	if($scope.cdformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemFinalAmount)
    	cashToCloseItemFinalAmount +=  $scope.cdformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemFinalAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemFinalAmount);
    	if($scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemFinalAmount)
    	cashToCloseItemFinalAmount +=  $scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemFinalAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemFinalAmount);
    	if($scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemFinalAmount)
    	cashToCloseItemFinalAmount +=  $scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemFinalAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemFinalAmount);
    	if($scope.cdformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemFinalAmount)
    	cashToCloseItemFinalAmount +=  $scope.cdformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemFinalAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemFinalAmount);
    	if($scope.cdformdata.cashToCloses.sellerCredits.integratedDisclosureCashToCloseItemFinalAmount)
    	cashToCloseItemFinalAmount +=  $scope.cdformdata.cashToCloses.sellerCredits.integratedDisclosureCashToCloseItemFinalAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.sellerCredits.integratedDisclosureCashToCloseItemFinalAmount);
    	if($scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemFinalAmount)
    	cashToCloseItemFinalAmount +=  $scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemFinalAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemFinalAmount);

        $scope.cdformdata.cashToCloses.cashToCloseTotal[0].integratedDisclosureCashToCloseItemEstimatedAmount = cashToCloseItemEstimatedAmount;
        $scope.cdformdata.cashToCloses.cashToCloseTotal[1].integratedDisclosureCashToCloseItemFinalAmount = cashToCloseItemFinalAmount;
    }, true);
    
    $scope.$watch('cdformdata.closingCostsTotal.lenderCredits', function(newValue,oldValue){
    	var totalClosingCosts = 0;
    	totalClosingCosts += $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing + $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing;
    	if($scope.cdformdata.closingCostsTotal.lenderCredits)
  			totalClosingCosts +=  parseFloat($scope.cdformdata.closingCostsTotal.lenderCredits);
        $scope.cdformdata.closingCostsTotal.totalClosingCosts = totalClosingCosts;
    },true);
    

	$scope.$watch('cdformdata.salesContractDetail', function(newValue,oldValue){
		if($scope.cdformdata.salesContractDetail.saleContractAmount){
			$scope.summariesOfTransaction_KSection.salePriceProperty = $scope.cdformdata.salesContractDetail.saleContractAmount;
			$scope.summariesOfTransaction_MSection.salePriceProperty = $scope.cdformdata.salesContractDetail.saleContractAmount;
		} else if($scope.cdformdata.salesContractDetail.realPropertyAmount){
			$scope.summariesOfTransaction_KSection.salePriceProperty = $scope.cdformdata.salesContractDetail.realPropertyAmount;
			$scope.summariesOfTransaction_MSection.salePriceProperty = $scope.cdformdata.salesContractDetail.realPropertyAmount;
		} else{
			$scope.summariesOfTransaction_KSection.salePriceProperty = 0;
			$scope.summariesOfTransaction_MSection.salePriceProperty = 0;
		}
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

    $scope.$watch('summariesOfTransaction_KSection', function(newValues,oldValues){
 		$scope.summariesOfTransaction_KSection.sectionTotalAmount = 0;
    	if($scope.summariesOfTransaction_KSection.salePriceProperty)
			$scope.summariesOfTransaction_KSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_KSection.salePriceProperty);
		if($scope.summariesOfTransaction_KSection.salePricePersonalProperty) {
			 $scope.summariesOfTransaction_KSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_KSection.salePricePersonalProperty);
			 $scope.summariesOfTransaction_MSection.salePricePersonalProperty = $scope.summariesOfTransaction_KSection.salePricePersonalProperty;
			 $scope.cdformdata.salesContractDetail.personalPropertyAmount = $scope.summariesOfTransaction_KSection.salePricePersonalProperty;
		}
		if($scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing)
			$scope.summariesOfTransaction_KSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing);
		for(i=0; i<$scope.summariesOfTransaction_KSection.liabilites.length; i++) {
			if($scope.summariesOfTransaction_KSection.liabilites[i].payoffAmount)
				$scope.summariesOfTransaction_KSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_KSection.liabilites[i].payoffAmount);
		}
		for(i=0; i<$scope.summariesOfTransaction_KSection.adjustments.length; i++) {
			if($scope.summariesOfTransaction_KSection.adjustments[i].closingAdjustmentItemAmount)
				$scope.summariesOfTransaction_KSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_KSection.adjustments[i].closingAdjustmentItemAmount);
		}
		for(i=0; i<$scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller.length; i++) {
			if($scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[i].prorationItemAmount)
				$scope.summariesOfTransaction_KSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[i].prorationItemAmount);
		}
		$scope.cdformdata.summariesofTransactions.borrowerTransaction.dueFromBorrowerAtClosing.integratedDisclosureSectionSummaryDetailModel.integratedDisclosureSectionTotalAmount = $scope.summariesOfTransaction_KSection.sectionTotalAmount;
		$scope.sotBorrowerTransactionTotalAmount = parseFloat($scope.summariesOfTransaction_KSection.sectionTotalAmount) + (-parseFloat($scope.summariesOfTransaction_LSection.sectionTotalAmount));
    }, true);

    $scope.$watch('summariesOfTransaction_MSection', function(newValues,oldValues){
 		$scope.summariesOfTransaction_MSection.sectionTotalAmount = 0;
    	if($scope.summariesOfTransaction_MSection.salePriceProperty)
			$scope.summariesOfTransaction_MSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_MSection.salePriceProperty);
		if($scope.summariesOfTransaction_MSection.salePricePersonalProperty) {
			 $scope.summariesOfTransaction_MSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_MSection.salePricePersonalProperty);
		}
		for(i=0; i<$scope.summariesOfTransaction_MSection.adjustments.length; i++) {
			if($scope.summariesOfTransaction_MSection.adjustments[i].closingAdjustmentItemAmount)
				$scope.summariesOfTransaction_MSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_MSection.adjustments[i].closingAdjustmentItemAmount);
		}
		for(i=0; i<$scope.summariesOfTransaction_MSection.adjustmentsPaidBySeller.length; i++) {
			if($scope.summariesOfTransaction_MSection.adjustmentsPaidBySeller[i].prorationItemAmount)
				$scope.summariesOfTransaction_MSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_MSection.adjustmentsPaidBySeller[i].prorationItemAmount);
		}
		$scope.cdformdata.summariesofTransactions.sellerTransaction.toSellerAtClosing.integratedDisclosureSectionSummaryDetailModel.integratedDisclosureSectionTotalAmount = $scope.summariesOfTransaction_MSection.sectionTotalAmount;
		$scope.sotSellerTransactionTotalAmount = parseFloat($scope.summariesOfTransaction_MSection.sectionTotalAmount) +(- parseFloat($scope.summariesOfTransaction_NSection.sectionTotalAmount));
    }, true);

    $scope.$watch('summariesOfTransaction_LSection', function(newValues,oldValues){
 		$scope.summariesOfTransaction_LSection.sectionTotalAmount = 0;
    	if($scope.summariesOfTransaction_LSection.deposit.closingCostFundAmount)
			$scope.summariesOfTransaction_LSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_LSection.deposit.closingCostFundAmount);
		if($scope.summariesOfTransaction_LSection.loanAmount) {
			 $scope.summariesOfTransaction_LSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_LSection.loanAmount);
		}
		if($scope.summariesOfTransaction_LSection.assumedLoanAmount) {
			$scope.summariesOfTransaction_NSection.assumedLoanAmount = $scope.summariesOfTransaction_LSection.assumedLoanAmount;
			 $scope.summariesOfTransaction_LSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_LSection.assumedLoanAmount);
		}
		if($scope.summariesOfTransaction_LSection.subordinateLien.closingAdjustmentItemAmount){
			$scope.summariesOfTransaction_LSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_LSection.subordinateLien.closingAdjustmentItemAmount);
		}
		for(i=0; i<$scope.summariesOfTransaction_LSection.otherCredits.length; i++) {
			if($scope.summariesOfTransaction_LSection.otherCredits[i].closingAdjustmentItemAmount)
				$scope.summariesOfTransaction_LSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_LSection.otherCredits[i].closingAdjustmentItemAmount);
		}
		for(i=0; i<$scope.summariesOfTransaction_LSection.adjustments.length; i++) {
			if($scope.summariesOfTransaction_LSection.adjustments[i].closingAdjustmentItemAmount)
				$scope.summariesOfTransaction_LSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_LSection.adjustments[i].closingAdjustmentItemAmount);
		}
		for(i=0; i<$scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller.length; i++) {
			if($scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller[i].prorationItemAmount)
				$scope.summariesOfTransaction_LSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller[i].prorationItemAmount);
		}
		$scope.cdformdata.summariesofTransactions.borrowerTransaction.paidAlreadyByOrOnBehalfOfBorrowerAtClosing.integratedDisclosureSectionSummaryDetailModel.integratedDisclosureSectionTotalAmount = $scope.summariesOfTransaction_LSection.sectionTotalAmount;
		$scope.sotBorrowerTransactionTotalAmount = parseFloat($scope.summariesOfTransaction_KSection.sectionTotalAmount) +(-parseFloat($scope.summariesOfTransaction_LSection.sectionTotalAmount));
    }, true);

    $scope.$watch('summariesOfTransaction_NSection', function(newValues,oldValues){
 		$scope.summariesOfTransaction_NSection.sectionTotalAmount = 0;
    	if($scope.summariesOfTransaction_NSection.excessDeposit.closingCostFundAmount)
			$scope.summariesOfTransaction_NSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_NSection.excessDeposit.closingCostFundAmount);
		if($scope.summariesOfTransaction_NSection.closingCostsPaidAtClosing)
			$scope.summariesOfTransaction_NSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_NSection.closingCostsPaidAtClosing);
		if($scope.summariesOfTransaction_NSection.assumedLoanAmount) {
			 $scope.summariesOfTransaction_NSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_NSection.assumedLoanAmount);
		}
		for(i=0; i<$scope.summariesOfTransaction_NSection.liabilites.length; i++) {
			if($scope.summariesOfTransaction_NSection.liabilites[i].payoffAmount)
				$scope.summariesOfTransaction_NSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_NSection.liabilites[i].payoffAmount);
		}
		for(i=0; i<$scope.summariesOfTransaction_NSection.liabilitesAndAdjustments.length; i++) {
			if($scope.summariesOfTransaction_NSection.liabilitesAndAdjustments[i].amount)
				$scope.summariesOfTransaction_NSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_NSection.liabilitesAndAdjustments[i].amount);
		}
		for(i=0; i<$scope.summariesOfTransaction_NSection.adjustments.length; i++) {
			if($scope.summariesOfTransaction_NSection.adjustments[i].closingAdjustmentItemAmount)
				$scope.summariesOfTransaction_NSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_NSection.adjustments[i].closingAdjustmentItemAmount);
		}
		for(i=0; i<$scope.summariesOfTransaction_NSection.adjustmentsUnpaidBySeller.length; i++) {
			if($scope.summariesOfTransaction_NSection.adjustmentsUnpaidBySeller[i].prorationItemAmount)
				$scope.summariesOfTransaction_NSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_NSection.adjustmentsUnpaidBySeller[i].prorationItemAmount);
		}
		$scope.cdformdata.summariesofTransactions.sellerTransaction.fromSellerAtClosing.integratedDisclosureSectionSummaryDetailModel.integratedDisclosureSectionTotalAmount = $scope.summariesOfTransaction_NSection.sectionTotalAmount;
		$scope.sotSellerTransactionTotalAmount = parseFloat($scope.summariesOfTransaction_MSection.sectionTotalAmount) +(- parseFloat($scope.summariesOfTransaction_NSection.sectionTotalAmount));
    }, true);

    $scope.$watch('sotBorrowerTransactionTotalAmount', function(newValue,oldValue){
    	$scope.cdformdata.closingInformationDetail.cashFromBorrowerAtClosingAmount = '';
    	$scope.cdformdata.closingInformationDetail.cashToBorrowerAtClosingAmount = '';
		if($scope.sotBorrowerTransactionTotalAmount >= 0 ){
			$scope.cdformdata.closingInformationDetail.cashFromBorrowerAtClosingAmount = $scope.sotBorrowerTransactionTotalAmount;
		} else {
			$scope.cdformdata.closingInformationDetail.cashToBorrowerAtClosingAmount = 0-$scope.sotBorrowerTransactionTotalAmount;
		}
	}, true);

	$scope.$watch('sotSellerTransactionTotalAmount', function(newValue,oldValue){
		$scope.cdformdata.closingInformationDetail.cashToSellerAtClosingAmount = '';
		$scope.cdformdata.closingInformationDetail.cashFromSellerAtClosingAmount = '';
		if($scope.sotSellerTransactionTotalAmount >= 0) {
			$scope.cdformdata.closingInformationDetail.cashToSellerAtClosingAmount = $scope.sotSellerTransactionTotalAmount;
		} else {
			$scope.cdformdata.closingInformationDetail.cashFromSellerAtClosingAmount = 0-$scope.sotSellerTransactionTotalAmount;
		}
	}, true);

    $scope.$watch('cdformdata.termsOfLoan.noteAmount', function(newValue,oldValue){
		if($scope.cdformdata.termsOfLoan.noteAmount){
			$scope.summariesOfTransaction_LSection.loanAmount = $scope.cdformdata.termsOfLoan.noteAmount;
		} else{
			$scope.summariesOfTransaction_LSection.loanAmount = 0;
		}

	//Calculations regarding Loan Discount Percentage in Section A. Origination Charge of Other Costs
 	for(i=0; i<$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.length; i++){
	   if ($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].feeType == 'LoanDiscountPoints'){
		   var loanDiscountAmount = 0;
		   if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].feeTotalPercent && $scope.cdformdata.termsOfLoan.noteAmount){
		   		loanDiscountAmount = $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].feeTotalPercent ? ($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].feeTotalPercent*$scope.cdformdata.termsOfLoan.noteAmount)/100 : +0;
	 	   		$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpAtClosing = loanDiscountAmount;
		   } else {
		   		$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpAtClosing ='';
		   }
       }
    }

	}, true);

    $scope.$watch('cdformdata.projectedPayments',function(newValue,oldValue){
        
    	for(i=0;i<$scope.cdformdata.projectedPayments.paymentCalculation.length;i++){
    		var estimatedTotalMinimumPayment = 0;
        	var estimatedTotalMaximumPayment = 0;

        	//Minimum Payment Calculation
    		if($scope.cdformdata.projectedPayments.principalInterest[i].projectedPaymentPrincipalAndInterestMinimumPaymentAmount){
	    		estimatedTotalMinimumPayment += parseFloat($scope.cdformdata.projectedPayments.principalInterest[i].projectedPaymentPrincipalAndInterestMinimumPaymentAmount);
	            if($scope.cdformdata.projectedPayments.mortgageInsurance[i].projectedPaymentMIPaymentAmount)
	    	    estimatedTotalMinimumPayment += parseFloat($scope.cdformdata.projectedPayments.mortgageInsurance[i].projectedPaymentMIPaymentAmount);
	            if($scope.cdformdata.projectedPayments.estimatedEscrow[i].projectedPaymentEstimatedEscrowPaymentAmount)
	    	    estimatedTotalMinimumPayment += parseFloat($scope.cdformdata.projectedPayments.estimatedEscrow[i].projectedPaymentEstimatedEscrowPaymentAmount);
	    	    $scope.cdformdata.projectedPayments.estimatedTotal[i].projectedPaymentEstimatedTotalMinimumPaymentAmount = estimatedTotalMinimumPayment;
    	    }else{
    	    	$scope.cdformdata.projectedPayments.estimatedTotal[i].projectedPaymentEstimatedTotalMinimumPaymentAmount = '';
    	    }

    	    //Maximum Payment Calculation
            if($scope.cdformdata.projectedPayments.principalInterest[i].projectedPaymentPrincipalAndInterestMaximumPaymentAmount)
    		estimatedTotalMaximumPayment += parseFloat($scope.cdformdata.projectedPayments.principalInterest[i].projectedPaymentPrincipalAndInterestMaximumPaymentAmount);
            if($scope.cdformdata.projectedPayments.mortgageInsurance[i].projectedPaymentMIPaymentAmount)
    	    estimatedTotalMaximumPayment += parseFloat($scope.cdformdata.projectedPayments.mortgageInsurance[i].projectedPaymentMIPaymentAmount);
            if($scope.cdformdata.projectedPayments.estimatedEscrow[i].projectedPaymentEstimatedEscrowPaymentAmount)
    	    estimatedTotalMaximumPayment += parseFloat($scope.cdformdata.projectedPayments.estimatedEscrow[i].projectedPaymentEstimatedEscrowPaymentAmount);
    	    $scope.cdformdata.projectedPayments.estimatedTotal[i].projectedPaymentEstimatedTotalMaximumPaymentAmount = estimatedTotalMaximumPayment;
    	}
    }, true);

    /*$scope.$watch('cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList',function(newValue,oldValue){
           var recordingFeeAmount = 0;
          //var previousValue = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].bpAtClosing;
           if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].recordingFeeForDeed)
           recordingFeeAmount += parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].recordingFeeForDeed);
           if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].recordingFeeForMortgage)
           recordingFeeAmount += parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].recordingFeeForMortgage);
           if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].recordingFeeForDeed!="" || $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].recordingFeeForMortgage!=""){
              $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].bpAtClosing = recordingFeeAmount;
           }
    },true);*/

   /* $scope.$watch('cdformdata.closingDisclosureDocDetails.escrowAggregateAccountingAdjustmentAmount',function(newValue,oldValue){
       var adjustmentAmount = 0;
       if($scope.cdformdata.closingDisclosureDocDetails.escrowAggregateAccountingAdjustmentAmount)
       	  adjustmentAmount += parseFloat($scope.cdformdata.closingDisclosureDocDetails.escrowAggregateAccountingAdjustmentAmount)

        bpAtClosing.iEPatClosingTotalbpAtClosing += adjustmentAmount;
        $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount = bpAtClosing.iEPatClosingTotalbpAtClosing + bpB4Closing.iEPatClosingTotalbpB4Closing;
        $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount + $scope.cdformdata.closingCostDetailsOtherCosts.otherTotalAmount;
        $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing = parseFloat(bpAtClosing.tOGovtFeesTotalbpAtClosing) + parseFloat(bpAtClosing.prepaidsTotalbpAtClosing) + parseFloat(bpAtClosing.iEPatClosingTotalbpAtClosing) + parseFloat(bpAtClosing.otherTotalbpAtClosing);
        $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing);
        $scope.cdformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostsTotal.lenderCredits=='' || $scope.cdformdata.closingCostsTotal.lenderCredits==undefined ? +0 : $scope.cdformdata.closingCostsTotal.lenderCredits);
         
    },true);*/
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


String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}