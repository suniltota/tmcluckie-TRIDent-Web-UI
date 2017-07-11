/**
 * Controller for transform function 
 */
app.controller('loanEstimateCtrl', function ($scope, $sce,$rootScope, $filter,$location, $anchorScroll, staticData, leService) {
	
	if(localStorage.loanPurposeType != undefined) {
		staticData.basicLoanInfo.loanPurposeType = localStorage.loanPurposeType;
	}
	if(localStorage.loanFormType != undefined) {
		staticData.basicLoanInfo.loanFormType = localStorage.loanFormType;
	}
	$(".helpIcon").tooltip();
	$scope.rateLokedTime=["1:00","2:00","3:00","4:00","5:00","6:00","7:00","8:00",
	"9:00","10:00","11:00","12:00"];
	$scope.rateLockedTimePeriod=["AM","PM"];
	$scope.rateLockedTimeZone=["EST","CST","MST","PST","IST"];
	$scope.originationChargeDisplayLabelStatus=false;
	$scope.originationChargeDisplayLabelValue;
	$rootScope.xmlStringData= '';
	$scope.loanBasicInfo = staticData.basicLoanInfo;
	$scope.showTab = 'closingInfo';
	$scope.dateFormat = staticData.dateDisplayFormat;
	$scope.dropDownBooleanOptions = staticData.dropDownBooleanOptions;
	$scope.escrowDropDownBooleanOptions = staticData.escrowDropDownBooleanOptions;
	$scope.stateCodes = staticData.stateCodes;
	$scope.countryCodes = staticData.countryCodes;
	$scope.usstateCodes = staticData.usstateCodes;
	$scope.canadaStateCodes = staticData.canadaStateCodes;
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
    $scope.stepPaymentIndicatorValue = false;
    $scope.checkBorrower = false;
    $scope.interestRatePercent = 0;
    $scope.piAmount = 0;
    $scope.disclosureOnly = true;
    $scope.toleranceCure = false;
    $scope.toleranceCureDrpdwn = false;
    $scope.loanMaturityPeriodTypes = staticData.loanMaturityPeriodTypes;
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
    $scope.DocumentType = 'LoanEstimate';
    if($scope.loanBasicInfo!=undefined){
	    if($scope.loanBasicInfo.loanFormType == 'standard'){
	    	$scope.FormType = 'StandardForm'
	    }
	    else if($scope.loanBasicInfo.loanFormType == 'alternate'){
	    	$scope.FormType = 'AlternateForm'
	    }

	    if($scope.loanBasicInfo.loanPurposeType == 'purchase'){
	    	$scope.LoanType = 'Purchase'
	    }
	    else if($scope.loanBasicInfo.loanPurposeType == 'refinance'){
	    	$scope.LoanType = 'Refinance'
	    }
    }

	var initializeLEformdata = function() {

		$scope.leformdata = staticData.leformdata;
		//console.log($scope.leformdata.closingInformation.lenderName);
		$scope.leformdata.termsOfLoan.loanPurposeType = $scope.loanBasicInfo.loanPurposeType.capitalizeFirstLetter();

		borrower = angular.copy($scope.leformdata.transactionInformation.borrowerDetails[0]);
		seller = angular.copy($scope.leformdata.transactionInformation.sellerDetails[0]);
		ausTypeIdentifier = angular.copy($scope.leformdata.loanInformation.automatedUnderwritings[0]);
		ETIAComponentType = angular.copy($scope.leformdata.etiaSection.etiaValues[0]);
		originationCharges = angular.copy($scope.leformdata.closingCostDetailsLoanCosts.originationCharges[0]);
		sbDidNotShopFors = angular.copy($scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[0]);
		sbDidShopFors = angular.copy($scope.leformdata.closingCostDetailsLoanCosts.sbDidShopFors[0]);
		tOGovtFees = angular.copy($scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0]);
		prepaidsList = angular.copy($scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[0]);
		escrowItemsList = angular.copy($scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[0]);
		otherCostsList = angular.copy($scope.leformdata.closingCostDetailsOtherCosts.otherCostsList[0]);
		liability = angular.copy($scope.leformdata.liabilityList[0]);
		adjustment = angular.copy($scope.leformdata.closingAdjustmentItemList[0]);
		prorationObj = angular.copy($scope.leformdata.prorationsList[0]);
		paymentCalculation = angular.copy($scope.leformdata.projectedPayments.paymentCalculation[0]);
		principalInterest = angular.copy($scope.leformdata.projectedPayments.principalInterest[0]);
		mortgageInsurance = angular.copy($scope.leformdata.projectedPayments.mortgageInsurance[0]);
		estimatedEscrow = angular.copy($scope.leformdata.projectedPayments.estimatedEscrow[0]);
		estimatedTotal = angular.copy($scope.leformdata.projectedPayments.estimatedTotal[0]);
		$scope.leformdata.closingInformation.propertyValuationDetail.propertyValue = 'Appraised';
        $scope.leformdata.closingInformation.dateIssued = new Date();
		$scope.leformdata.closingInformationDetail.closingDate = add_business_days($scope.leformdata.closingInformation.dateIssued, 5);
		$scope.leformdata.integratedDisclosureDetail.integratedDisclosureIssuedDate = $scope.leformdata.closingInformation.dateIssued;

		if(localStorage.jsonData != undefined) {
			$scope.leformdata = angular.fromJson(localStorage.jsonData);
			$scope.leformdata.loanInformation['loanTermYears'] = $scope.leformdata.maturityRule.loanMaturityPeriodCount/12;
			$scope.leformdata.loanInformation['loanTermMonths'] = $scope.leformdata.maturityRule.loanMaturityPeriodCount%12;
		}

		 //Adding Form and Document types for AML & PDF Generation
        $scope.leformdata.loanEstimateDocDetails.documentType='LoanEstimate';

		if($scope.loanBasicInfo.loanFormType == 'standard'){
        	$scope.leformdata.loanEstimateDocDetails.formType = 'StandardForm';
        }else if($scope.loanBasicInfo.loanFormType == 'alternate'){
        	$scope.leformdata.loanEstimateDocDetails.formType = 'AlternateForm';
        }

        if($scope.loanBasicInfo.loanPurposeType == 'purchase') {
			$scope.leformdata.salesContractDetail.personalPropertyIndicator = false;
		} else {
			$scope.leformdata.transactionInformation.refinanceSameLenderIndicator = false;
		}

		$scope.leformdata.closingInformationDetail.closingCostExpirationDate = add_business_days($scope.leformdata.closingInformation.dateIssued, 10);
		$scope.closingCostExpirationDate=$scope.leformdata.closingInformationDetail.closingCostExpirationDate;
            var expireDate = new Date($scope.closingCostExpirationDate);
            expireDate.setHours(0);
            expireDate.setMinutes(0);
        $scope.leformdata.integratedDisclosureDetail.integratedDisclosureEstimatedClosingCostsExpirationDatetime=$filter('date')(expireDate, "yyyy-MM-ddTHH:mm:ss'Z'");

        for (i = $scope.leformdata.loanInformation.automatedUnderwritings.length; i < 3; i++) { 
		    $scope.leformdata.loanInformation.automatedUnderwritings.push(angular.copy(ausTypeIdentifier));
		}
        
        //To Update The Interest Rate Percent
        if ($scope.leformdata.loanTerms.temporaryBuydown.buydownReflectedInNoteIndicator==true && $scope.leformdata.loanTerms.temporaryBuydown.buydownInitialEffectiveInterestRatePercent!='') {
			$scope.interestRatePercent = $scope.leformdata.loanTerms.temporaryBuydown.buydownInitialEffectiveInterestRatePercent;
		} else if($scope.leformdata.termsOfLoan.disclosedFullyIndexedRatePercent!='') {
			$scope.interestRatePercent = $scope.leformdata.termsOfLoan.disclosedFullyIndexedRatePercent;
		} else if ($scope.leformdata.termsOfLoan.weightedAverageInterestRatePercent!='') {
			$scope.interestRatePercent = $scope.leformdata.termsOfLoan.weightedAverageInterestRatePercent;
		} else {
			$scope.interestRatePercent = $scope.leformdata.termsOfLoan.noteRatePercent;
		}
		
		//To Update the Principal And Interest Amount

		if($scope.leformdata.payment.paymentRule.initialPrincipalAndInterestPaymentAmount!=''){
            $scope.piAmount = $scope.leformdata.payment.paymentRule.initialPrincipalAndInterestPaymentAmount;
		}
		else if($scope.leformdata.payment.paymentRule.fullyIndexedInitialPrincipalAndInterestPaymentAmount!=''){
            $scope.piAmount = $scope.leformdata.payment.paymentRule.fullyIndexedInitialPrincipalAndInterestPaymentAmount;
		}

		if($scope.leformdata.loanDetail.balloonIndicator) {
			$scope.leformdata['balloonPeriodType'] = $scope.leformdata.maturityRule.loanMaturityPeriodType;
			$scope.leformdata['balloonPeriodCount'] = $scope.leformdata.maturityRule.loanMaturityPeriodCount;
 		} else {
 			$scope.leformdata['balloonPeriodType'] = '';
 			$scope.leformdata['balloonPeriodCount'] = '';
		}

		$scope.leformdata.loanEstimateDocDetails.formType=$scope.FormType;
		$scope.leformdata.loanEstimateDocDetails.documentType=$scope.DocumentType;
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
		for(i=0; i<$scope.leformdata.transactionInformation.lenderDetails.length; i++){
		       if($scope.leformdata.transactionInformation.lenderDetails[i].type == 'O') {
		       		isLenderTypeOrganization = true;
		       		break;
		       }
		};
		if(!isLenderTypeOrganization)
			$scope.leformdata.transactionInformation.lenderDetails.push(lender);

		var productAdjustmentInformation = {
			'fixedPeriodMonths' :'',
			'firstChangePeriodMonths':'',
			'subsequentChangePeriodMonths':'',
			'loanCapRate':'',
			'firstChangeInterestRateLimit':'',
			'subsequentChangeInterestRateLimit' :''
		};
		$scope.leformdata.loanInformation['productAdjustmentInformation'] = productAdjustmentInformation;
		$scope.leformdata.loanInformation.isProductAdjustmentinfoPresent = false;

		$scope.leformdata.etiaSection['etiaTypes']=[];
		if($scope.leformdata.etiaSection.etiaValues!=undefined) {
			$scope.leformdata.etiaSection.etiaValues.splice(0, 0, angular.copy(ETIAComponentType));
			$scope.leformdata.etiaSection.etiaValues[0].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType = 'PropertyTaxes';

			$scope.leformdata.etiaSection.etiaValues.splice(1, 0, angular.copy(ETIAComponentType));
			$scope.leformdata.etiaSection.etiaValues[1].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType = 'HomeownersInsurance';

			$scope.leformdata.etiaSection.etiaValues.splice(2, 0, angular.copy(ETIAComponentType));
			$scope.leformdata.etiaSection.etiaValues[2].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType = '';
		}

		for(i=0; i<$scope.leformdata.etiaSection.etiaValues.length; i++){
			if(i!=0 && $scope.leformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType == 'PropertyTaxes') {
				$scope.leformdata.etiaSection.etiaValues[0] = $scope.leformdata.etiaSection.etiaValues[i];
				$scope.leformdata.etiaSection.etiaValues.splice(i, 1);
				i--;
			} else if(i!=1 && $scope.leformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType == 'HomeownersInsurance') {
				$scope.leformdata.etiaSection.etiaValues[1] = $scope.leformdata.etiaSection.etiaValues[i];
				$scope.leformdata.etiaSection.etiaValues.splice(i, 1);
				i--;
			} else if(i!=2 && $scope.leformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType == '') {
				$scope.leformdata.etiaSection.etiaValues[2] = $scope.leformdata.etiaSection.etiaValues[i];
				$scope.leformdata.etiaSection.etiaValues.splice(i, 1);
				i--;
			} else {
				if($scope.leformdata.etiaSection.etiaTypes.indexOf($scope.leformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType)==-1)
				$scope.leformdata.etiaSection.etiaTypes.push($scope.leformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType);
			}
		};

		$scope.insuranceCheck = {"insuranceTaxCheck" :false};
	    for(i=0;i<$scope.leformdata.etiaSection.etiaValues.length;i++){
	    	if($scope.leformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType=='PropertyTaxes' 
	    		|| $scope.leformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType=='HomeownersInsurance'){
	    		$scope.leformdata.etiaSection.etiaValues[i]['insuranceTaxCheck'] = false;
	    	}
	    }

		if($scope.leformdata.closingCostDetailsLoanCosts.originationCharges!=undefined) {
   			$scope.leformdata.closingCostDetailsLoanCosts.originationCharges.splice(0, 0, angular.copy(originationCharges));
			$scope.leformdata.closingCostDetailsLoanCosts.originationCharges[0].feeType = 'LoanDiscountPoints';
			$scope.leformdata.closingCostDetailsLoanCosts.originationCharges[0].displayLabel = 'Loan Amount (Points)';
			$scope.leformdata.closingCostDetailsLoanCosts.originationCharges[0].integratedDisclosureSectionType = 'OriginationCharges';
			for(j=0;j<$scope.sectionAfeeTypes.length;j++){
				if($scope.sectionAfeeTypes[j].value=='LoanDiscountPoints'){
					$scope.sectionAfeeTypes[j].disabled = true;
				}
			}
       	}

        $scope.leformdata.closingCostDetailsLoanCosts.originationCharges['AfeeTypes']=[];
        $scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors['BfeeTypes']=[];
		$scope.leformdata.closingCostDetailsLoanCosts.sbDidShopFors['CfeeTypes']=[];
		$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList['EfeeTypes']=[];
		$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList['FprepaidTypes']=[];
		$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList['GescrowTypes']=[];
		$scope.leformdata.closingCostDetailsOtherCosts.otherCostsList['HfeeTypes']=[];


       	for(i=0; i<$scope.leformdata.closingCostDetailsLoanCosts.originationCharges.length; i++){
			if (i!=0 && $scope.leformdata.closingCostDetailsLoanCosts.originationCharges[i].feeType == 'LoanDiscountPoints') {
				$scope.leformdata.closingCostDetailsLoanCosts.originationCharges[0] = $scope.leformdata.closingCostDetailsLoanCosts.originationCharges[i];
				$scope.leformdata.closingCostDetailsLoanCosts.originationCharges[0].integratedDisclosureSectionType = 'OriginationCharges';
				$scope.leformdata.closingCostDetailsLoanCosts.originationCharges.splice(i, 1);
				i--;
	       	}
	       	if($scope.leformdata.closingCostDetailsLoanCosts.originationCharges.AfeeTypes.indexOf($scope.leformdata.closingCostDetailsLoanCosts.originationCharges[i].feeType)==-1)
				$scope.leformdata.closingCostDetailsLoanCosts.originationCharges.AfeeTypes.push($scope.leformdata.closingCostDetailsLoanCosts.originationCharges[i].feeType);
		};

		for(i=0; i<$scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.length; i++){
			if($scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.BfeeTypes.indexOf($scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].feeType)==-1)
				$scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.BfeeTypes.push($scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].feeType);
		};

		for(i=0; i<$scope.leformdata.closingCostDetailsLoanCosts.sbDidShopFors.length; i++){
			if($scope.leformdata.closingCostDetailsLoanCosts.sbDidShopFors.CfeeTypes.indexOf($scope.leformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].feeType)==-1)
				$scope.leformdata.closingCostDetailsLoanCosts.sbDidShopFors.CfeeTypes.push($scope.leformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].feeType);
		};
		
		if($scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList!=undefined) {
			$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList.splice(0, 0, angular.copy(recordingFeetotalObj));
			$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].feeType = 'RecordingFeeTotal';
			$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].displayLabel = 'Recording Fees Total';
			$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].feePaidToType = 'ThirdPartyProvider';
			$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].integratedDisclosureSectionType = 'TaxesAndOtherGovernmentFees';
			$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].paymentIncludedInAPRIndicator = false;

			$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList.splice(1, 0, angular.copy(tOGovtFees));
			$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[1].feeType = 'TransferTaxTotal';
			$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[1].displayLabel = 'Transfer Taxes';
			$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[1].feePaidToType = 'ThirdPartyProvider';
			$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[1].integratedDisclosureSectionType = 'TaxesAndOtherGovernmentFees';
            $scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[1].paymentIncludedInAPRIndicator = false;
		}


        for(i=0; i<$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList.length; i++){
	     	
	     	if(i!=0 && $scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType == 'RecordingFeeTotal') {
				$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0] = $scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i];
				$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].integratedDisclosureSectionType = 'TaxesAndOtherGovernmentFees';
				$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList.splice(i, 1);
				i--;
			}

			if(i!=1 && $scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType == 'TransferTaxTotal') {
				$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[1] = $scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i];
				$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[1].integratedDisclosureSectionType = 'TaxesAndOtherGovernmentFees';
				$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList.splice(i, 1);
				i--;
			}

			if(i>1 && $scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType == '') {
				$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList.splice(i, 1);
				i--;
			}

			if($scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList.EfeeTypes.indexOf($scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType)==-1)
				$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList.EfeeTypes.push($scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType);
				
		}

        for(i=0; i<$scope.leformdata.closingCostDetailsOtherCosts.otherCostsList.length; i++){
			if($scope.leformdata.closingCostDetailsOtherCosts.otherCostsList.HfeeTypes.indexOf($scope.leformdata.closingCostDetailsOtherCosts.otherCostsList[i].feeType)==-1)
				$scope.leformdata.closingCostDetailsOtherCosts.otherCostsList.HfeeTypes.push($scope.leformdata.closingCostDetailsOtherCosts.otherCostsList[i].feeType);
		};
		if($scope.leformdata.closingCostDetailsOtherCosts.prepaidsList!=undefined) {
			$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList.splice(0, 0, angular.copy(prepaidsList));
			$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[0].prepaidItemType = 'PrepaidInterest';
			$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[0].displayLabelText = 'Prepaid Interest';
			$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[0].paymentIncludedInAPRIndicator=true;

			$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList.splice(1, 0, angular.copy(prepaidsList));
			$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[1].prepaidItemType = 'HomeownersInsurancePremium';
			$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[1].displayLabelText = 'Homeowners Insurance Premium';

       		$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList.splice(2, 0, angular.copy(prepaidsList));
			$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[2].prepaidItemType = 'MortgageInsurancePremium';
			$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[2].displayLabelText = 'Mortgage Insurance Premium';
			$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[2].paymentIncludedInAPRIndicator=true;

       		$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList.splice(3, 0, angular.copy(prepaidsList));
			$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[3].prepaidItemType = 'CountyPropertyTax';
			$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[3].displayLabelText = 'Property Taxes';
			//$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[3].paymentIncludedInAPRIndicator=false;

		}

		for(i=0; i<$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList.length; i++){
			if (i!=0 && $scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType == 'PrepaidInterest') {
				$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[0] = $scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i];
				$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList.splice(i, 1);
				i--;
	       	} else if (i!=1 && $scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType == 'HomeownersInsurancePremium') {
				$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[1] = $scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i];
				$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[1].paymentIncludedInAPRIndicator=false;
				$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList.splice(i, 1);
				i--;
	       	} else if (i!=2 && $scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType == 'MortgageInsurancePremium') {
				$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[2] = $scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i];
				$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList.splice(i, 1);
				i--;
	       	} else if (i!=3 && $scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType == 'CountyPropertyTax') {
				$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[3] = $scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i];
				$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList.splice(i, 1);
				i--;
	       	}

	       	if($scope.leformdata.closingCostDetailsOtherCosts.prepaidsList.FprepaidTypes.indexOf($scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType)==-1)
				$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList.FprepaidTypes.push($scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType);
		};

		if($scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList!=undefined) {
			$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList.splice(0, 0, angular.copy(escrowItemsList));
			$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[0].escrowItemType = 'HomeownersInsurance';
			$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[0].displayLabel = 'Homeowners Insurance';
			
			$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList.splice(1, 0, angular.copy(escrowItemsList));
			$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[1].escrowItemType = 'MortgageInsurance';
			$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[1].displayLabel = 'Mortgage Insurance';
			$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[1].paymentIncludedInAPRIndicator = true;

       		$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList.splice(2, 0, angular.copy(escrowItemsList));
			$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[2].escrowItemType = 'CountyPropertyTax';
			$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[2].displayLabel = 'Property Taxes';
		}

		for(i=0; i<$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList.length; i++){
			if (i!=0 && $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType == 'HomeownersInsurance') {
				$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[0] = $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i];
				$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList.splice(i, 1);
				i--;
	       	} else if (i!=1 && $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType == 'MortgageInsurance') {
				$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[1] = $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i];
				$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList.splice(i, 1);
				i--;
	       	} else if (i!=2 && $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType == 'CountyPropertyTax') {
				$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[2] = $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i];
				$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList.splice(i, 1);
				i--;
	       	}
	       	if($scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList.GescrowTypes.indexOf($scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType)==-1)
				$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList.GescrowTypes.push($scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType);
		};

 		//Payoffs And Payments starts here...
		$scope.payoffsAndPaymentsList = [];
		for(i=0; i<$scope.leformdata.liabilityList.length; i++) {
			if($scope.leformdata.liabilityList[i].integratedDisclosureSectionType == 'PayoffsAndPayments')
			{
				var payoffLiability = angular.copy(payoffsAndPaymentObj);
				payoffLiability.payOffType = 'Liability';
				payoffLiability.displayLabel = $scope.leformdata.liabilityList[i].displayLabel;
				payoffLiability.itemType = $scope.leformdata.liabilityList[i].liabilityType;
				payoffLiability.otherDescription = $scope.leformdata.liabilityList[i].liabilityTypeOtherDescription;
				payoffLiability.paidToFullName = $scope.leformdata.liabilityList[i].liabilityHolderFullName;
				payoffLiability.securedIndicator = $scope.leformdata.liabilityList[i].liabilitySecuredBySubjectPropertyIndicator;
				payoffLiability.partialPayoffIndicator = $scope.leformdata.liabilityList[i].payoffPartialIndicators;
				payoffLiability.payoffAmount = $scope.leformdata.liabilityList[i].payoffAmount;
	            payoffLiability.prepaymentPenaltyAmount = $scope.leformdata.liabilityList[i].payoffPrepaymentPenaltyAmount;
				$scope.payoffsAndPaymentsList.push(payoffLiability);
		    }
		}
      	for(i=0; i<$scope.leformdata.closingAdjustmentItemList.length; i++) {
			if($scope.leformdata.closingAdjustmentItemList[i].integratedDisclosureSectionType == 'PayoffsAndPayments')
			{
				var payoffAdjustment = angular.copy(payoffsAndPaymentObj);
				payoffAdjustment.payOffType = 'Adjustment';
				payoffAdjustment.displayLabel = $scope.leformdata.closingAdjustmentItemList[i].displayLabel;
				payoffAdjustment.itemType = $scope.leformdata.closingAdjustmentItemList[i].closingAdjustmentItemType;
				payoffAdjustment.otherDescription = $scope.leformdata.closingAdjustmentItemList[i].closingAdjustmentItemTypeOtherDescription;
				payoffAdjustment.paidToFullName = $scope.leformdata.closingAdjustmentItemList[i].paidToEntityFullName;
				if($scope.leformdata.closingAdjustmentItemList[i].paidByIndividualFullName != '' && $scope.leformdata.closingAdjustmentItemList[i].paidByIndividualFullName != null){
				    payoffAdjustment.paidByFullName = $scope.leformdata.closingAdjustmentItemList[i].paidByIndividualFullName;
				}
				else if($scope.leformdata.closingAdjustmentItemList[i].paidByEntityFullName != '' && $scope.leformdata.closingAdjustmentItemList[i].paidByEntityFullName != null){
					payoffAdjustment.paidByFullName = $scope.leformdata.closingAdjustmentItemList[i].paidByEntityFullName;
				} 
				payoffAdjustment.payoffAmount = $scope.leformdata.closingAdjustmentItemList[i].closingAdjustmentItemAmount;
				$scope.payoffsAndPaymentsList.push(payoffAdjustment);
		    }
		}

		if($scope.payoffsAndPaymentsList.length==0) {
			$scope.payoffsAndPaymentsList.push(angular.copy(payoffsAndPaymentObj));
		}

		setTimeout(function(){$("#spinner").hide();}, 3000);
		
	}

	initializeLEformdata();

	$scope.changeProductInfo = function() {
		if($scope.leformdata.loanInformation.amortizationType!='Fixed') {
			$scope.leformdata.loanInformation.isProductAdjustmentinfoPresent = false;
			var productInfo = $scope.leformdata.loanInformation.productAdjustmentInformation;
			if(productInfo.fixedPeriodMonths) {
				productInfo['fixedPeriodYears'] = productInfo.fixedPeriodMonths/12;
				productInfo['firstChangeStartYear'] = productInfo.fixedPeriodYears+1;
				$scope.leformdata.loanInformation.isProductAdjustmentinfoPresent = true;
			}
			if(productInfo.firstChangePeriodMonths){
				productInfo['firstChangePeriodYears'] = productInfo.firstChangePeriodMonths/12;
				$scope.leformdata.loanInformation.isProductAdjustmentinfoPresent = true;
			}
			if(productInfo.subsequentChangePeriodMonths){
				productInfo['subsequentChangePeriodYears'] = productInfo.subsequentChangePeriodMonths/12;
				$scope.leformdata.loanInformation.isProductAdjustmentinfoPresent = true;
			}
		} else {
			$scope.leformdata.loanInformation.isProductAdjustmentinfoPresent = false;
		}
	}

	$scope.checkRadio = function() {
		if(!$scope.leformdata.closingInformation.property.legalDescription){
			$scope.leformdata.closingInformation.property.unparsedLegalDescription = "";
			$scope.leformdata.closingInformation.property.addressLineText = '';
		}
	}

	$scope.applicantCheck = function(index){
    	if($scope.leformdata.transactionInformation.borrowerDetails[index].type == 'O'){
    		$scope.leformdata.transactionInformation.borrowerDetails[index].partyRoleType ='Borrower';
    		$scope.leformdata.transactionInformation.borrowerDetails[index].nameModel.firstName ='';
    		$scope.leformdata.transactionInformation.borrowerDetails[index].nameModel.middleName ='';
    		$scope.leformdata.transactionInformation.borrowerDetails[index].nameModel.lastName ='';
    		$scope.leformdata.transactionInformation.borrowerDetails[index].nameModel.suffixName ='';
    	}else{
    		$scope.leformdata.transactionInformation.borrowerDetails[index].nameModel.fullName ='';
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
    	$scope.leformdata.transactionInformation.borrowerDetails.push(angular.copy(borrower));
    }

    $scope.removeBorrower = function(index){
    	$scope.leformdata.transactionInformation.borrowerDetails.splice(index,1);
    }
    $scope.backToTop = function(){
    	//console.log("i am here");
    	$('#PDFviewContainer').scrollTop(0);
    }

    $scope.addSeller = function(){
    	$scope.leformdata.transactionInformation.sellerDetails.push(angular.copy(seller));
    }

    $scope.removeSeller = function(index){
    	$scope.leformdata.transactionInformation.sellerDetails.splice(index,1);
    }

    $scope.addAusTypeIdentifier = function(){
    	$scope.leformdata.loanInformation.automatedUnderwritings.push(angular.copy(ausTypeIdentifier));
    	$scope.leformdata.loanInformation.automatedUnderwritings.push(angular.copy(ausTypeIdentifier));
    	$scope.leformdata.loanInformation.automatedUnderwritings.push(angular.copy(ausTypeIdentifier));
    }
    $scope.removeAusTypeIdentifier = function(index){
    	var indexval = 0;
    	if(index==5 || index==8){
                indexval = index+1;
    		for(i=indexval;i>indexval-3;i--){
    	       $scope.leformdata.loanInformation.automatedUnderwritings.splice(i-1,1);
    		}
    	 }
    }

    $scope.removeSeller = function(index){
    	$scope.leformdata.transactionInformation.sellerDetails.splice(index,1);
    }

    $scope.updateProjectedPaymentsMI = function () {
    	if(!$scope.leformdata.loanDetail.miRequiredIndicator) {
    		for(var i=0; i<$scope.leformdata.projectedPayments.mortgageInsurance.length;i++) {
    			$scope.leformdata.projectedPayments.mortgageInsurance[i].projectedPaymentMIPaymentAmount = '0';
    		}
    	}
    }

    $scope.addETIAComponent = function(){
    	$scope.leformdata.etiaSection.etiaValues.push(angular.copy(ETIAComponentType));
    	$scope.leformdata.etiaSection.total = $scope.leformdata.etiaSection.etiaValues.length;
    }

	$scope.addETIAComponent = function(){
		$scope.leformdata.etiaSection.etiaValues.push(angular.copy(ETIAComponentType));
		$scope.leformdata.etiaSection.total = $scope.leformdata.etiaSection.etiaValues.length;
    }
    $scope.leformdata.closingCostDetailsLoanCosts.originationCharges.push(angular.copy(originationCharges));

    $scope.addOrganizationCharges = function(){
    	$scope.leformdata.closingCostDetailsLoanCosts.originationCharges.push(angular.copy(originationCharges));
    }

    $scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.push(angular.copy(sbDidNotShopFors));
    $scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.push(angular.copy(sbDidNotShopFors));
    $scope.addsbDidNotShopFor = function(){
    	$scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.push(angular.copy(sbDidNotShopFors));
    }
    $scope.leformdata.closingCostDetailsLoanCosts.sbDidShopFors.push(angular.copy(sbDidShopFors));
    $scope.leformdata.closingCostDetailsLoanCosts.sbDidShopFors.push(angular.copy(sbDidShopFors));
    $scope.addsbDidShopFor = function(){
    	$scope.leformdata.closingCostDetailsLoanCosts.sbDidShopFors.push(angular.copy(sbDidShopFors));
    }

    $scope.addtOGovtFeesList = function(){
    	$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList.push(angular.copy(tOGovtFees));
    }
    $scope.leformdata.closingCostDetailsOtherCosts.prepaidsList.push(angular.copy(prepaidsList));
    $scope.addprepaidsList = function(){
    	$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList.push(angular.copy(prepaidsList));
    }
   $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList.push(angular.copy(escrowItemsList));
    $scope.addescrowItemsList = function(){
    	$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList.push(angular.copy(escrowItemsList));
    }
	$scope.leformdata.closingCostDetailsOtherCosts.otherCostsList.push(angular.copy(otherCostsList));
	$scope.leformdata.closingCostDetailsOtherCosts.otherCostsList.push(angular.copy(otherCostsList));
    $scope.addotherCostsList = function(){
    	$scope.leformdata.closingCostDetailsOtherCosts.otherCostsList.push(angular.copy(otherCostsList));
    }

    $scope.addDueFromBrwLiability = function(){
    	$scope.leformdata.liabilityList.push(angular.copy(dueFromBrwLiabilityType));
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
    	if($scope.leformdata.loanInformation.amortizationType == 'Fixed') {
    		$scope.leformdata.loanDetail.interestRateIncreaseIndicator = false;
    		$scope.leformdata.loanDetail.paymentIncreaseIndicator = false;
    		$scope.leformdata.loanInformation.fixedPeriodMonths = '';
    		$scope.leformdata.interestRateAdjustment.firstPerChangeRateAdjustmentFrequencyMonthsCount = '';
    		$scope.leformdata.interestRateAdjustment.subsequentPerChangeRateAdjustmentFrequencyMonthsCount = '';
    		$scope.leformdata.interestRateAdjustment.ceilingRatePercent = '';
    		$scope.leformdata.interestRateAdjustment.firstPerChangeMaximumIncreaseRatePercent = '';
    		$scope.leformdata.interestRateAdjustment.subsequentPerChangeMaximumIncreaseRatePercent = '';
    		$scope.leformdata.interestRateAdjustment.floorRatePercent = '';
    	} else {
    		if($scope.leformdata.loanInformation.amortizationType == 'Step') {
    			$scope.stepPaymentIndicatorValue = true;
    			$scope.stepChange($scope.stepPaymentIndicatorValue);
    		}
    		if($scope.leformdata.loanInformation.amortizationType == '') {
	    		$scope.leformdata.loanDetail.interestRateIncreaseIndicator = false;
	    		$scope.leformdata.loanDetail.paymentIncreaseIndicator = false;
    	    }else{
    	    	$scope.leformdata.loanDetail.interestRateIncreaseIndicator = true;
    		    $scope.leformdata.loanDetail.paymentIncreaseIndicator = true;
    	    }
    	}
    	projectedPaymentsCalculation();
    	$scope.updateProjectedPaymentsMI();
    	for(j=0;j<$scope.leformdata.projectedPayments.estimatedEscrow.length;j++){
            $scope.leformdata.projectedPayments.estimatedEscrow[j].projectedPaymentEstimatedEscrowPaymentAmount = $scope.leformdata.projectedPayments.estimatedEscrow[0].projectedPaymentEstimatedEscrowPaymentAmount;
        }
    }

    var projectedPaymentsCalculation = function(){
    	if($scope.leformdata.loanInformation.amortizationType == '' || $scope.leformdata.loanInformation.amortizationType == 'Fixed') {
    	    for(i=$scope.leformdata.projectedPayments.paymentCalculation.length; i>0; i--){
    			$scope.leformdata.projectedPayments.paymentCalculation.splice(i,1);
				$scope.leformdata.projectedPayments.principalInterest.splice(i,1);
				$scope.leformdata.projectedPayments.mortgageInsurance.splice(i,1);
				$scope.leformdata.projectedPayments.estimatedEscrow.splice(i,1);
				$scope.leformdata.projectedPayments.estimatedTotal.splice(i,1);
	        }
	        if($scope.leformdata.projectedPayments.paymentCalculation.length==0){
	        	$scope.leformdata.projectedPayments.paymentCalculation.push(angular.copy(paymentCalculation));
				$scope.leformdata.projectedPayments.principalInterest.push(angular.copy(principalInterest));
				$scope.leformdata.projectedPayments.mortgageInsurance.push(angular.copy(mortgageInsurance));
				$scope.leformdata.projectedPayments.estimatedEscrow.push(angular.copy(estimatedEscrow));
				$scope.leformdata.projectedPayments.estimatedTotal.push(angular.copy(estimatedTotal));
	        }
	    }
	    else
	    {
            if($scope.leformdata.projectedPayments.paymentCalculation.length == 1){
	            for(i=1;i<=3;i++){
			    	$scope.leformdata.projectedPayments.paymentCalculation.push(angular.copy(paymentCalculation));
					$scope.leformdata.projectedPayments.principalInterest.push(angular.copy(principalInterest));
					$scope.leformdata.projectedPayments.mortgageInsurance.push(angular.copy(mortgageInsurance));
					$scope.leformdata.projectedPayments.estimatedEscrow.push(angular.copy(estimatedEscrow));
					$scope.leformdata.projectedPayments.estimatedTotal.push(angular.copy(estimatedTotal));
		        }
	        }
	    }
    }
    $scope.constructionChange = function(){
    	if($scope.leformdata.loanDetail.constructionLoanIndicator == false){
    		$scope.leformdata.construction.constructionLoanType ='';
    		$scope.leformdata.construction.constructionPeriodNumberOfMonthsCount = '';
    		$scope.leformdata.construction.constructionLoanTotalTermMonthsCount = '';
    	}
    }
    $scope.rateLockChange = function(){
    	if($scope.leformdata.loanInformation.rateLokerIndicator ==false ||$scope.leformdata.loanInformation.rateLokerIndicator =='' || $scope.leformdata.loanInformation.rateLokerIndicator==null)
  		{
  			$scope.leformdata.loanInformation.rateLokedDate= '';
  			$scope.leformdata.loanInformation.rateLokedTime=='';
    		$scope.leformdata.loanInformation.rateLockedTimePeriod ='';
    		$scope.leformdata.loanInformation.rateLockedTimeZone='';
  		}
  		else if($scope.leformdata.loanInformation.rateLokerIndicator ==true){ 
  			$scope.leformdata.loanInformation.rateLokedTime=null;
  		}
    }

    $scope.clChange = function(){
    	if($scope.leformdata.construction.constructionLoanType == ''){
    		$scope.leformdata.construction.constructionPeriodNumberOfMonthsCount = '';
    		$scope.leformdata.construction.constructionLoanTotalTermMonthsCount = '';

    	}
    }
    $scope.timeClr = function(){
    	if( $scope.leformdata.loanInformation.rateLokedTime==''){
    		$scope.leformdata.loanInformation.rateLockedTimePeriod ='';
    		$scope.leformdata.loanInformation.rateLockedTimeZone='';
    	}
    }
    $scope.timePeriodClr = function(){
    	if( $scope.leformdata.loanInformation.rateLockedTimePeriod==''){
    		$scope.leformdata.loanInformation.rateLockedTimeZone='';
    	}
    }
    /*$scope.negativeAmortizationChange = function(){
    	if($scope.leformdata.loanDetail.negativeAmortizationIndicator == false){
    		$scope.leformdata.negativeAmortization.negativeAmortizationType ='';
    	}
    }*/
	$scope.updateETIAComponentTypes = function(value, index) {
		var previousVal = $scope.leformdata.etiaSection.etiaTypes[index];
		$scope.leformdata.etiaSection.etiaTypes[index] = value;
		for(i=0; i<$scope.ETIAComponentTypes.length; i++){
			if($scope.ETIAComponentTypes[i].value == value) {
				$scope.ETIAComponentTypes[i].disabled = true;
			} else if ($scope.ETIAComponentTypes[i].value == previousVal) {
				$scope.ETIAComponentTypes[i].disabled = false;
			}
		}
	}
	///
	$scope.updateSectionAfeeTypes = function(value, index) {
		var previousAfeeVal = $scope.leformdata.closingCostDetailsLoanCosts.originationCharges.AfeeTypes[index];
       	$scope.leformdata.closingCostDetailsLoanCosts.originationCharges.AfeeTypes[index] = value;
		for(i=0; i<$scope.sectionAfeeTypes.length; i++){
			if($scope.sectionAfeeTypes[i].value == value) {
				if(value!='Other'){
				   $scope.sectionAfeeTypes[i].disabled = true;
				}
			} else if ($scope.sectionAfeeTypes[i].value == previousAfeeVal) {
				$scope.sectionAfeeTypes[i].disabled = false;
			}
		}
	}
	$scope.updateSectionBfeeTypes = function(value, index) {
		var previousBfeeVal = $scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.BfeeTypes[index];
		$scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.BfeeTypes[index] = value;
		for(i=0; i<$scope.sectionBfeeTypes.length; i++){
			if($scope.sectionBfeeTypes[i].value == value) {
				if(value!='Other'){
				   $scope.sectionBfeeTypes[i].disabled = true;
				}
			} else if ($scope.sectionBfeeTypes[i].value == previousBfeeVal) {
				$scope.sectionBfeeTypes[i].disabled = false;
			}
		}
	}
	$scope.updateSectionCfeeTypes = function(value, index) {
		var previousCfeeVal = $scope.leformdata.closingCostDetailsLoanCosts.sbDidShopFors.CfeeTypes[index];
		$scope.leformdata.closingCostDetailsLoanCosts.sbDidShopFors.CfeeTypes[index] = value;
		for(i=0; i<$scope.sectionCfeeTypes.length; i++){
			if($scope.sectionCfeeTypes[i].value == value) {
				if(value!='Other'){
				   $scope.sectionCfeeTypes[i].disabled = true;
				}
			} else if ($scope.sectionCfeeTypes[i].value == previousCfeeVal) {
				$scope.sectionCfeeTypes[i].disabled = false;
			}
		}
	}
	$scope.updateSectionEfeeTypes = function(value, index) {
		var previousEfeeVal = $scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList.EfeeTypes[index];
		$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList.EfeeTypes[index] = value;
		for(i=0; i<$scope.sectionEfeeTypes.length; i++){
			if($scope.sectionEfeeTypes[i].value == value) {
				if(value!='Other'){
				   $scope.sectionEfeeTypes[i].disabled = true;
				}
			} else if ($scope.sectionEfeeTypes[i].value == previousEfeeVal) {
				$scope.sectionEfeeTypes[i].disabled = false;
			}
		}
	}

	$scope.updateSectionFprepaidTypes = function(value, index) {
		var previousFprepaidVal = $scope.leformdata.closingCostDetailsOtherCosts.prepaidsList.FprepaidTypes[index];
		$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList.FprepaidTypes[index] = value;
		for(i=0; i<$scope.prepaidItems.length; i++){
			if($scope.prepaidItems[i].value == value) {
				if(value!='Other'){
				   $scope.prepaidItems[i].disabled = true;
				}
			} else if ($scope.prepaidItems[i].value == previousFprepaidVal) {
				$scope.prepaidItems[i].disabled = false;
			}
		}
	}

	$scope.updateSectionGescrowTypes = function(value, index) {
		var previousGescrowVal = $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList.GescrowTypes[index];
		$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList.GescrowTypes[index] = value;
		for(i=0; i<$scope.escrowItemTypes.length; i++){
			if($scope.escrowItemTypes[i].value == value) {
				if(value!='Other'){
				   $scope.escrowItemTypes[i].disabled = true;
				}
			} else if ($scope.escrowItemTypes[i].value == previousGescrowVal) {
				$scope.escrowItemTypes[i].disabled = false;
			}
		}
	}

	$scope.updateSectionHfeeTypes = function(value, index) {
		var previousHfeeVal = $scope.leformdata.closingCostDetailsOtherCosts.otherCostsList.HfeeTypes[index];
		$scope.leformdata.closingCostDetailsOtherCosts.otherCostsList.HfeeTypes[index] = value;
		for(i=0; i<$scope.sectionHfeeTypes.length; i++){
			if($scope.sectionHfeeTypes[i].value == value) {
				if(value!='Other'){
				   $scope.sectionHfeeTypes[i].disabled = true;
				}
			} else if ($scope.sectionHfeeTypes[i].value == previousHfeeVal) {
				$scope.sectionHfeeTypes[i].disabled = false;
			}
		}
	}

    $scope.sameBorrower = function(index){
    	var bCheck = $scope.leformdata.transactionInformation.borrowerDetails[index];
    	if(bCheck.checkBorrower == true){
    	   $scope.leformdata.transactionInformation.borrowerDetails[index] = angular.copy($scope.leformdata.transactionInformation.borrowerDetails[0]);
    	   $scope.leformdata.transactionInformation.borrowerDetails[index].checkBorrower = true;
    	   $scope.leformdata.transactionInformation.borrowerDetails[index].nameModel.firstName = '';
    	   $scope.leformdata.transactionInformation.borrowerDetails[index].nameModel.lastName = '';
    	   $scope.leformdata.transactionInformation.borrowerDetails[index].nameModel.middleName = '';
    	   $scope.leformdata.transactionInformation.borrowerDetails[index].nameModel.suffixName = '';
    	   $scope.leformdata.transactionInformation.borrowerDetails[index].nameModel.fullName = '';
        }
    }
    $scope.sameSeller = function(index){
    	var sCheck = $scope.leformdata.transactionInformation.sellerDetails[index];
    	if(sCheck.checkSeller == true){
    	   $scope.leformdata.transactionInformation.sellerDetails[index] = angular.copy($scope.leformdata.transactionInformation.sellerDetails[0]);
    	   $scope.leformdata.transactionInformation.sellerDetails[index].checkSeller = true;
    	   $scope.leformdata.transactionInformation.sellerDetails[index].nameModel.firstName = '';
    	   $scope.leformdata.transactionInformation.sellerDetails[index].nameModel.lastName = '';
    	   $scope.leformdata.transactionInformation.sellerDetails[index].nameModel.middleName = '';
    	   $scope.leformdata.transactionInformation.sellerDetails[index].nameModel.suffixName = '';
    	   $scope.leformdata.transactionInformation.sellerDetails[index].nameModel.fullName = '';
        }
    }
    $scope.addProjectedPayments = function(){
    	var ppLength = $scope.leformdata.projectedPayments.paymentCalculation.length;
    	if($scope.leformdata.projectedPayments.paymentCalculation.length <= 3){
	    	$scope.leformdata.projectedPayments.paymentCalculation.push(angular.copy(paymentCalculation));
			$scope.leformdata.projectedPayments.principalInterest.push(angular.copy(principalInterest));
			$scope.leformdata.projectedPayments.mortgageInsurance.push(angular.copy(mortgageInsurance));
			$scope.leformdata.projectedPayments.estimatedEscrow.push(angular.copy(estimatedEscrow));
			$scope.leformdata.projectedPayments.estimatedTotal.push(angular.copy(estimatedTotal));
			$scope.leformdata.projectedPayments.estimatedEscrow[ppLength].projectedPaymentEstimatedEscrowPaymentAmount = $scope.leformdata.projectedPayments.estimatedEscrow[0].projectedPaymentEstimatedEscrowPaymentAmount;
	    }

	    if(!$scope.leformdata.loanDetail.miRequiredIndicator) {
    		for(var i=0; i<$scope.leformdata.projectedPayments.mortgageInsurance.length;i++) {
    			$scope.leformdata.projectedPayments.mortgageInsurance[i].projectedPaymentMIPaymentAmount = '0';
    		}
    	}
    }
    $scope.deleteProjectedPayments = function(index){ 
	    	$scope.leformdata.projectedPayments.paymentCalculation.splice(index, 1);
			$scope.leformdata.projectedPayments.principalInterest.splice(index, 1);
			$scope.leformdata.projectedPayments.mortgageInsurance.splice(index, 1);
			$scope.leformdata.projectedPayments.estimatedEscrow.splice(index, 1);
			$scope.leformdata.projectedPayments.estimatedTotal.splice(index, 1);
    }
   
    $scope.interestChange = function(){
    	$scope.leformdata.interestOnly.interestOnlyTermMonthsCount = '';
    	if(leformdata.loanDetail.interestOnlyIndicator){
    		$scope.leformdata.loanDetail.paymentIncreaseIndicator = true;
    	}else{
    		$scope.leformdata.loanDetail.paymentIncreaseIndicator = false;
    	}
    }

    $scope.interestRateYearToMonthsAdjustment = function(){
		if($scope.leformdata.interestRateAdjustment.ceilingRatePercentEarliestEffectiveYearCount) {
			$scope.leformdata.interestRateAdjustment.ceilingRatePercentEarliestEffectiveMonthsCount = parseInt($scope.leformdata.interestRateAdjustment.ceilingRatePercentEarliestEffectiveYearCount-1) * 12;
		} else {
			$scope.leformdata.interestRateAdjustment.ceilingRatePercentEarliestEffectiveMonthsCount = '';
		}
    }

    $scope.principleInterestRateYearToMonthsAdjustment = function(){
		if($scope.leformdata.principalAndInterestPaymentAdjustment.principalAndInterestPaymentMaximumAmountEarliestEffectiveYearCount) {
			$scope.leformdata.principalAndInterestPaymentAdjustment.principalAndInterestPaymentMaximumAmountEarliestEffectiveMonthsCount= (parseInt($scope.leformdata.principalAndInterestPaymentAdjustment.principalAndInterestPaymentMaximumAmountEarliestEffectiveYearCount) -1) * 12 + 1;
		} else {
			$scope.leformdata.principalAndInterestPaymentAdjustment.principalAndInterestPaymentMaximumAmountEarliestEffectiveMonthsCount = '';
		}
    }

    $scope.nATypeChange = function(){
    	if($scope.leformdata.negativeAmortization.negativeAmortizationType==''){
    		$scope.leformdata.negativeAmortization.negativeAmortizationMaximumLoanBalanceAmount = '';
    		$scope.leformdata.negativeAmortization.negativeAmortizationLimitMonthsCount = '';
    	}
    }

    $scope.seasonalChange = function(){
    	$scope.leformdata.payment.paymentRule.seasonalPaymentPeriodStartMonth = '';
    	$scope.leformdata.payment.paymentRule.seasonalPaymentPeriodEndMonth = '';
    }
    
    $scope.prepaymentPenaltyChange = function(){
    	$scope.leformdata.loanTerms.prepaymentPenalty.prepaymentPenaltyMaximumLifeOfLoanAmount = '';
    	$scope.leformdata.loanTerms.prepaymentPenalty.prepaymentPenaltyExpirationMonthsCount = '';
    	$scope.leformdata.loanTerms.prepaymentPenalty.prepaymentPenaltyExpirationInYears = '';
    }
    
    $scope.balloonIndicatorChange = function() {
    	$scope.leformdata.balloonPeriodType = '';
 		$scope.leformdata.balloonPeriodCount = '';
    }

    $scope.stepChange = function(val){
    	if(val==true){
    		$scope.stepPaymentIndicator = true;
    	}else{
    		$scope.stepPaymentIndicator = false;
    	}
		$scope.leformdata.interestRateAdjustment.totalStepCount = '';
    	$scope.leformdata.payment.paymentRule.totalStepPaymentCount = '';
    }

    $scope.optionalChange = function(){
    	$scope.leformdata.payment.paymentRule.totalOptionalPaymentCount = '';
    }
    
    $scope.updatePropertyValuationMethodType = function() {
    	$scope.leformdata.closingInformation.propertyValuationDetail.propertyValuationMethodTypeOtherDescription = $scope.leformdata.closingInformation.propertyValuationDetail.propertyValuationMethodType!='Other' ? '' : $scope.leformdata.closingInformation.propertyValuationDetail.propertyValuationMethodTypeOtherDescription;
    }

    $scope.deleteOC = function(feeType,index){
    	for(j=0; j<$scope.sectionAfeeTypes.length; j++){
	        if($scope.sectionAfeeTypes[j].value == feeType) {
	            $scope.sectionAfeeTypes[j].disabled = false;
	        } 
        }
    	$scope.leformdata.closingCostDetailsLoanCosts.originationCharges.splice(index,1);
    }

    $scope.deleteSDidNot = function(feeType,index){
    	for(j=0; j<$scope.sectionBfeeTypes.length; j++){
	        if($scope.sectionBfeeTypes[j].value == feeType) {
	            $scope.sectionBfeeTypes[j].disabled = false;
	        } 
        }
    	$scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.splice(index,1);
    }

    $scope.deleteSDid = function(feeType,index){
    	for(j=0; j<$scope.sectionCfeeTypes.length; j++){
	        if($scope.sectionCfeeTypes[j].value == feeType) {
	            $scope.sectionCfeeTypes[j].disabled = false;
	        } 
        }
    	$scope.leformdata.closingCostDetailsLoanCosts.sbDidShopFors.splice(index,1);
    }
    $scope.termsOfLoanMortgagaTypeClear =function(mortagageLoanTypeValue){
    	$scope.leformdata.termsOfLoan.mortgageTypeOtherDescription='';
    }

    $scope.clearOC = function(feeType,index){
    	if(index==0){
    	$scope.leformdata.closingCostDetailsLoanCosts.originationCharges[index].feeTotalPercent ='';
    	$scope.leformdata.closingCostDetailsLoanCosts.originationCharges[index].feePaidToType ='';
    	$scope.leformdata.closingCostDetailsLoanCosts.originationCharges[index].feePaidToTypeOtherDescription ='';
    	$scope.leformdata.closingCostDetailsLoanCosts.originationCharges[index].feePaidToFullName ='';
    	$scope.leformdata.closingCostDetailsLoanCosts.originationCharges[index].feeEstimatedTotalAmount ='';
    	$scope.leformdata.closingCostDetailsLoanCosts.originationCharges[index].paymentIncludedInAPRIndicator = true;
    	$scope.leformdata.closingCostDetailsLoanCosts.originationCharges[index].regulationZPointsAndFeesIndicator = null;
    	}
    	else{
    		for(j=0; j<$scope.sectionAfeeTypes.length; j++){
	        if($scope.sectionAfeeTypes[j].value == feeType) {
	            $scope.sectionAfeeTypes[j].disabled = false;
	        } 
        }
    	$scope.leformdata.closingCostDetailsLoanCosts.originationCharges[index].feeTotalPercent ='';
    	$scope.leformdata.closingCostDetailsLoanCosts.originationCharges[index].displayLabel ='';
    	$scope.leformdata.closingCostDetailsLoanCosts.originationCharges[index].feeType ='';
    	$scope.leformdata.closingCostDetailsLoanCosts.originationCharges[index].feeTypeOtherDescription ='';
    	$scope.leformdata.closingCostDetailsLoanCosts.originationCharges[index].feePaidToType ='Lender';
    	$scope.leformdata.closingCostDetailsLoanCosts.originationCharges[index].feePaidToTypeOtherDescription ='';
    	$scope.leformdata.closingCostDetailsLoanCosts.originationCharges[index].feePaidToFullName ='';
    	$scope.leformdata.closingCostDetailsLoanCosts.originationCharges[index].feeEstimatedTotalAmount ='';
    	$scope.leformdata.closingCostDetailsLoanCosts.originationCharges[index].paymentIncludedInAPRIndicator = true;
    	$scope.leformdata.closingCostDetailsLoanCosts.originationCharges[index].regulationZPointsAndFeesIndicator = null;
        }
    }
	
	$scope.clearSDidNot = function(feeType,index){
		for(j=0; j<$scope.sectionBfeeTypes.length; j++){
	        if($scope.sectionBfeeTypes[j].value == feeType) {
	            $scope.sectionBfeeTypes[j].disabled = false;
	        } 
        }
    	$scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feeTotalPercent ='';
    	$scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].displayLabel ='';
    	$scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feeType ='';
    	$scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feeTypeOtherDescription ='';
    	$scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToType ='';
    	$scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToTypeOtherDescription ='';
    	$scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToFullName ='';
    	$scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feeEstimatedTotalAmount ='';
    	$scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].paymentIncludedInAPRIndicator = true;
    	$scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].regulationZPointsAndFeesIndicator = null;
    }

    $scope.clearSDid = function(feeType,index){
    	for(j=0; j<$scope.sectionCfeeTypes.length; j++){
	        if($scope.sectionCfeeTypes[j].value == feeType) {
	            $scope.sectionCfeeTypes[j].disabled = false;
	        } 
        }
    	$scope.leformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feeTotalPercent ='';
    	$scope.leformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].displayLabel ='';
    	$scope.leformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feeType ='';
    	$scope.leformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feeTypeOtherDescription ='';
    	$scope.leformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToType ='ThirdPartyProvider';
    	$scope.leformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToTypeOtherDescription ='';
    	$scope.leformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToFullName ='';
    	$scope.leformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feeEstimatedTotalAmount ='';
    	$scope.leformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].paymentIncludedInAPRIndicator = true;
    	$scope.leformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].regulationZPointsAndFeesIndicator = null;
    }
    $scope.clearRecordings = function(){
        $scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].recordingFeeForDeed='';
    	$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].recordingFeeForMortgage='';
    	$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].feePaidToType='ThirdPartyProvider';
    	$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].feeEstimatedTotalAmount ='';
    	$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].feeTypeOtherDescription='';
    	$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].paymentIncludedInAPRIndicator = true;
    	$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].regulationZPointsAndFeesIndicator = null;
    }
    //deleteOGF
    $scope.clearOGF = function(feeType,index){

    	if($scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[1].feeType =='TransferTaxTotal'){
	    	$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[1].feePaidToFullName='';
	    	$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[1].feeActualTotalAmount='';
	    	$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[1].feePaidToType='ThirdPartyProvider';
	    	$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[1].feePaidToTypeOtherDescription='';
	    	$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[1].feePercentBasisType='';
	    	$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[1].feeTotalPercent='';
	    	$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[1].feeTypeOtherDescription='';
    	    $scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[1].feeEstimatedTotalAmount ='';
	    	$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[1].paymentIncludedInAPRIndicator = true;
	    	$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[1].regulationZPointsAndFeesIndicator = true;
    	}
    	else{
	      	$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].displayLabel='';
	    	$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].gseDisplayLabel='';
	    	$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].feePaidToFullName='';
	    	$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].feeActualTotalAmount='';
	    	$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].feePaidToType='ThirdPartyProvider';
	    	$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].feePaidToTypeOtherDescription='';
	    	$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].feePercentBasisType='';
	    	$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].feeTotalPercent='';
	    	$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].feeType='';
	    	$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].feeTypeOtherDescription='';
    	    $scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].feeEstimatedTotalAmount ='';
	    	$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].paymentIncludedInAPRIndicator = false;
	    	$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].regulationZPointsAndFeesIndicator = true;
        }
    }
    $scope.deleteOGF = function(index){
        $scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList.splice(index,1);
    }
    //Prepaid Interest
    $scope.clearPrepaid = function(i){
		$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemPerDiemAmount = '';
		$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemPerDiemCalculationMethodType = '';
		$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemPaidFromDate = '';
		$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemPaidThroughDate = '';
    	$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemEstimatedTotalAmount ='';
		$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].paymentIncludedInAPRIndicator = false;
		$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].regulationZPointsAndFeesIndicator = true;
    }

    $scope.clearPrepaidInfo = function(i){
		$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].feePaidToType = 'ThirdPartyProvider';
		$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidPaidToFullName = '';
    	$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemEstimatedTotalAmount ='';
		$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].paymentIncludedInAPRIndicator = true;
		$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].regulationZPointsAndFeesIndicator = true;
		$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemMonthsPaidCount='';
		$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].feePaidToTypeOtherDescription='';
		$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemPerDiemAmount='';
		$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].numberOfDays='';
		$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidInterestRate='';
		$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemNumberOfDaysCount='';
    }
    
    $scope.clearPrepaidList = function(prepaidType,i){
    	for(j=0; j<$scope.prepaidItems.length; j++){
	        if($scope.prepaidItems[j].value == prepaidType) {
	            $scope.prepaidItems[j].disabled = false;
	        } 
        }
    	$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType = '';
    	$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].displayLabel = '';
		$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].feePaidToType = 'ThirdPartyProvider';
		$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidPaidToFullName = '';
    	$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemEstimatedTotalAmount ='';
		$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].paymentIncludedInAPRIndicator = true;
		$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].regulationZPointsAndFeesIndicator = true;
		$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].feePaidToTypeOtherDescription='';
		$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemPerDiemAmount='';
		$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].numberOfDays='';
		$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidInterestRate='';
		$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemMonthsPaidCount='';
    }

    $scope.deletePrepaidInfo = function(prepaidType,i){
    	for(j=0; j<$scope.prepaidItems.length; j++){
	        if($scope.prepaidItems[j].value == prepaidType) {
	            $scope.prepaidItems[j].disabled = false;
	        } 
        }
    	$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList.splice(i,1);
    }

    //Escrows

    $scope.clearEscrow = function(i){
		$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowMonthlyPaymentAmount = '';
		$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowCollectedNumberOfMonthsCount = '';
		$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].feePaidToType = 'ThirdPartyProvider';
    	$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemEstimatedTotalAmount ='';
		$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].paymentIncludedInAPRIndicator = true;
		$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].regulationZPointsAndFeesIndicator = true;
    }
    
    $scope.clearEscrowsList = function(escrowValue,i){
    	for(j=0; j<$scope.escrowItemTypes.length; j++){
            if($scope.escrowItemTypes[j].value == escrowValue) {
                $scope.escrowItemTypes[j].disabled = false;
            } 
        }
    	$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType = '';
    	$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].displayLabel = '';
		$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].feePaidToType = 'ThirdPartyProvider';
		$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowCollectedNumberOfMonthsCount = '';
    	$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemEstimatedTotalAmount ='';
		$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].prepaidPaidToFullName = '';
		$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].paymentIncludedInAPRIndicator = true;
		$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].regulationZPointsAndFeesIndicator = true;
		$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowMonthlyPaymentAmount = '';
    }

    $scope.deleteEscrowsList = function(escrowValue,i){
    	for(j=0; j<$scope.escrowItemTypes.length; j++){
            if($scope.escrowItemTypes[j].value == escrowValue) {
                $scope.escrowItemTypes[j].disabled = false;
            } 
        }
    	$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList.splice(i,1);
    }
    
    $scope.clearOthers = function(feeType,i){
    	for(j=0; j<$scope.sectionHfeeTypes.length; j++){
            if($scope.sectionHfeeTypes[j].value == feeType) {
                $scope.sectionHfeeTypes[j].disabled = false;
            } 
        }
    	$scope.leformdata.closingCostDetailsOtherCosts.otherCostsList[i].displayLabel = '';
    	$scope.leformdata.closingCostDetailsOtherCosts.otherCostsList[i].feeType = '';
    	$scope.leformdata.closingCostDetailsOtherCosts.otherCostsList[i].feeTypeOtherDescription = '';
		$scope.leformdata.closingCostDetailsOtherCosts.otherCostsList[i].feePaidToType = 'ThirdPartyProvider';
		$scope.leformdata.closingCostDetailsOtherCosts.otherCostsList[i].feePaidToTypeOtherDescription = '';
		$scope.leformdata.closingCostDetailsOtherCosts.otherCostsList[i].feePaidToFullName = '';
    	$scope.leformdata.closingCostDetailsOtherCosts.otherCostsList[i].feeEstimatedTotalAmount ='';
		$scope.leformdata.closingCostDetailsOtherCosts.otherCostsList[i].paymentIncludedInAPRIndicator = false;
		$scope.leformdata.closingCostDetailsOtherCosts.otherCostsList[i].regulationZPointsAndFeesIndicator = true;
    }
    $scope.deleteOthers = function(feeType,i){
    	for(j=0; j<$scope.sectionHfeeTypes.length; j++){
            if($scope.sectionHfeeTypes[j].value == feeType) {
                $scope.sectionHfeeTypes[j].disabled = false;
            } 
        }
    	$scope.leformdata.closingCostDetailsOtherCosts.otherCostsList.splice(i,1);
    }

    $scope.loanDiscount = function(index){
 	   var loanDiscountAmount = 0;
       loanDiscountAmount = $scope.leformdata.closingCostDetailsLoanCosts.originationCharges[index].feeTotalPercent ? ($scope.leformdata.closingCostDetailsLoanCosts.originationCharges[index].feeTotalPercent*$scope.leformdata.termsOfLoan.noteAmount)/100 : +0;
 	   $scope.leformdata.closingCostDetailsLoanCosts.originationCharges[index].feeEstimatedTotalAmount = loanDiscountAmount; 
    }

    $scope.perDiemCalc = function(){
    	for(i=0; i<$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList.length; i++) {
	    	if($scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType == 'PrepaidInterest'){
			    var diemAmount = 0;
				var diffDays = $scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemNumberOfDaysCount;
				diemAmount =  $scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemPerDiemAmount ? $scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemPerDiemAmount : +0;
				$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemEstimatedTotalAmount = Math.round(parseFloat(diemAmount*diffDays));
		    }
	    }
    }

    $scope.amountPerMonth = function(index){
    	var amount = 0;
		var months = 0;
		if($scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[index].escrowMonthlyPaymentAmount && $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[index].escrowCollectedNumberOfMonthsCount){
			amount = $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[index].escrowMonthlyPaymentAmount ? $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[index].escrowMonthlyPaymentAmount : +0;
			months = $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[index].escrowCollectedNumberOfMonthsCount ? $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[index].escrowCollectedNumberOfMonthsCount : +0;
			$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[index].escrowItemEstimatedTotalAmount = parseFloat(amount*months);
	    }else{
            $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[index].escrowItemEstimatedTotalAmount = '';
	    }
        
        //Calculating Prepaids bpAtClosing amount
	    var prepaidmonths = 0;
		var escrowAmount = 0;
		for(i=0;i<$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList.length;i++){
			if($scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType.indexOf($scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[index].escrowItemType)!=-1 && $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[index].escrowItemType){
				if($scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemMonthsPaidCount && $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[index].escrowMonthlyPaymentAmount){
					prepaidmonths = $scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemMonthsPaidCount ? $scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemMonthsPaidCount : +0;
					escrowAmount = $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[index].escrowMonthlyPaymentAmount ? $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[index].escrowMonthlyPaymentAmount : +0;
					$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemEstimatedTotalAmount = parseFloat(prepaidmonths*escrowAmount);
			    } else{
		            $scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemEstimatedTotalAmount = '';
			    }
		    }
	    }
    }
    $scope.bcountryChange = function(index){
        $scope.leformdata.transactionInformation.borrowerDetails[index].address.stateCode = '';
    }
    $scope.prepaidPerMonth = function(ideType,index){
		var months = 0;
		var prepaidAmount = 0;
		for(i=0;i<$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList.length;i++){
			if(ideType.indexOf($scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType)!=-1 && $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType){
				if($scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[index].prepaidItemMonthsPaidCount && $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowMonthlyPaymentAmount){
					months = $scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[index].prepaidItemMonthsPaidCount ? $scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[index].prepaidItemMonthsPaidCount : +0;
					prepaidAmount = $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowMonthlyPaymentAmount ? $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowMonthlyPaymentAmount : +0;
					$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[index].prepaidItemEstimatedTotalAmount = parseFloat(months*prepaidAmount);
			    }else{
		            $scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[index].prepaidItemEstimatedTotalAmount = '';
			    }
		    }
	    }
    }
    
    $scope.liabilityForeClosure = function(){
    	for(i=0;i<$scope.stateProperty.length;i++){
    		if($scope.stateProperty[i].state == $scope.leformdata.closingInformation.property.stateCode){
    			$scope.leformdata.loanCalculationsQualifiedMortgage.loanCalculationModel.deficiencyRightsPreservedIndicator = $scope.stateProperty[i].value;
    		}
    	}
    }

    $scope.updateOptionalPaymentMonthsCount = function() {
    	if($scope.leformdata.negativeAmortization.negativeAmortizationLimitMonthsCount) {
    		$scope.leformdata.payment.paymentRule.totalOptionalPaymentCount = $scope.leformdata.negativeAmortization.negativeAmortizationLimitMonthsCount;
    	}
    }
    
    $scope.calculatePayments = function() {
    	$("#spinner").show();
    	leService.genearateXmlFromJson($scope.leformdata, false).success(function(xmldata){
    		leService.calculatePayments(xmldata).success(function(calculationsData){
    			var xmlstring = $.parseXML( calculationsData );
                var $xml = $(xmlstring);
                var Exceptions = $xml.find("exceptions");
                if(Exceptions.length>0) {
                	var x2js = new X2JS();
				    var errors = x2js.xml_str2json(calculationsData);
				    $scope.calculation_errors = errors.exceptions.exception;
				    $('#CalculateModalPopup').modal('show');
				    $("#spinner").hide();
                } else {
                	leService.loadTransformData(calculationsData).success(function(jsonData){
						//$scope.leformdata = jsonData;
		    			localStorage.jsonData = JSON.stringify(jsonData);
						initializeLEformdata();
		    			$("#spinner").hide();
	    			}).error( function(data, status){
			    		alert('There is an error getting while converting calculations xml to json. Please provide the input data properly and check again.');
			    		$("#spinner").hide();
			    	});
                }
    		}).error( function(data, status){
    			alert('There is an error getting while converting ucd xml to calculations xml. Please provide the input data properly and check again.');
	    		$("#spinner").hide();
	    	});
    	}).error( function(data, status){
    		alert('There is an error getting while converting json to xml. Please provide the input data properly and check again.');
    		$("#spinner").hide();
    	});
    }

    $scope.generatePDF = function(){
    	$scope.leformdata.documentClassification.documentType="Other";
    	if($scope.leformdata.loanEstimateDocDetails.formType=='StandardForm')
    		{
    				$scope.leformdata.documentClassification.documentTypeOtherDescription="LoanEstimate:ModelForm";
    		}else{
   				 	$scope.leformdata.documentClassification.documentTypeOtherDescription="LoanEstimate:AlternateForm";
   			 }
    	$("#spinner").show();
    	leService.genearateXmlFromJson($scope.leformdata, true).success(function(data){
    		leService.generatePDF(data).success(function(pdfData){
    			if(pdfData!=null){
    				$("#pdfViewerId").show();
    				$scope.pdfAsDataUri = "data:application/pdf;base64,"+pdfData.responseData;
					$("#carousel").pdfSlider('init');
					$("#carousel").show();
					$(".PDFCloseIcon").show();
    			}
    			$("#spinner").hide();
    		}).error( function(pdfData, status){
    			$("#spinner").hide();
    		});
    	}).error( function(data, status){
    		$("#spinner").hide();
    	});
    }

    $scope.closePDF = function(){
        $("#carousel").pdfSlider('destroy');
        $(".PDFCloseIcon").hide();
    }

    $scope.generateXML = function(embeddedPDF){
    	$scope.leformdata.documentClassification.documentType="Other";
    	if($scope.leformdata.loanEstimateDocDetails.formType=='StandardForm')
		{
			$scope.leformdata.documentClassification.documentTypeOtherDescription="LoanEstimate:ModelForm";
		}else{
			$scope.leformdata.documentClassification.documentTypeOtherDescription="LoanEstimate:AlternateForm";
	    }

    	$("#spinner").show();
    	leService.genearateXmlFromJson($scope.leformdata, embeddedPDF).success(function(data){

    		$scope.xmlData = data;
    		LoadXMLString("xmlViewerId",$scope.xmlData);
    		$("#xmlView").show();
    		$("#spinner").hide();
    	}).error( function(data, status){
    		$("#spinner").hide();
    	});
    }
    $scope.closeXML = function(){
    	$("#xmlView").hide();
    }
    $scope.downloadXML = function() {
    	window.URL = window.webkitURL || window.URL;
    	var xmltext = $scope.xmlData;
		var pom = document.createElement('a');
		var loanId = '';
		var loanIdentifiers = $scope.leformdata.loanInformation.loanIdentifiers;
		for(var j=0; j<loanIdentifiers.length; j++) {
			if(loanIdentifiers[j].loanIdentifierType == 'LenderLoan')
				loanId = loanIdentifiers[j].loanIdentifier;
		}
		var filename = "LoanEstimate_"+loanId+ "_"+new Date().getTime();
		var bb = new Blob([xmltext], {type: 'application/octet-stream'});
		saveAs(bb, filename);
    }

    $scope.$watchCollection('[leformdata.loanInformation.loanTermYears, leformdata.loanInformation.loanTermMonths,leformdata.loanInformation.rateLokerIndicator,leformdata.loanInformation.rateLokedDate,leformdata.loanInformation.rateLokedTime,leformdata.loanInformation.rateLockedTimePeriod,leformdata.loanInformation.rateLockedTimeZone]', function(newValues, oldValues){
    $scope.leformdata.maturityRule.loanMaturityPeriodCount = 0;
    if($scope.leformdata.loanInformation.loanTermYears)
    $scope.leformdata.maturityRule.loanMaturityPeriodCount = parseInt($scope.leformdata.loanInformation.loanTermYears * 12);
    if($scope.leformdata.loanInformation.loanTermMonths)
    $scope.leformdata.maturityRule.loanMaturityPeriodCount = $scope.leformdata.maturityRule.loanMaturityPeriodCount + parseInt($scope.leformdata.loanInformation.loanTermMonths);
    if($scope.leformdata.loanInformation.rateLokerIndicator==true){
    $scope.leformdata.loanProduct.lock.lockStatusType= 'Locked';
    }else{
    $scope.leformdata.loanProduct.lock.lockStatusType= 'None';
    }
    $scope.leformdata.loanProduct.lock.lockExpirationDatetime=$scope.leformdata.loanInformation.rateLokedDate;
    var utcdate =$scope.leformdata.loanInformation.rateLokedDate+' '+$scope.leformdata.loanInformation.rateLokedTime+' '+$scope.leformdata.loanInformation.rateLockedTimePeriod+' '+$scope.leformdata.loanInformation.rateLockedTimeZone;
    var rateLokedDate1 =$scope.leformdata.loanInformation.rateLokedDate;
    var rateLockedTime1=$scope.leformdata.loanInformation.rateLokedTime;
    var rateLockedTimePeriod1=$scope.leformdata.loanInformation.rateLockedTimePeriod;
    if(rateLokedDate1 != undefined && rateLockedTime1 != undefined && rateLockedTimePeriod1 != undefined
            && rateLokedDate1.length != 0 && rateLockedTime1.length != 0 && rateLockedTimePeriod1.length != 0){
        var hours =rateLockedTime1.split(':');
        var _utc = new Date(rateLokedDate1);
        if(rateLockedTimePeriod1 == 'PM'){
            _utc.setHours(parseInt(hours[0]) + 12);
        }else{
            _utc.setHours(parseInt(hours[0]));
        }
        _utc.setMinutes(parseInt(hours[1]));
    $scope.leformdata.loanProduct.lock.lockExpirationDatetime=$filter('date')(_utc, "yyyy-MM-ddTHH:mm:ss'Z'");
    }
    $scope.leformdata.loanProduct.lock.lockExpirationTimezoneType=$scope.leformdata.loanInformation.rateLockedTimeZone;
    $scope.leformdata.maturityRule.loanMaturityPeriodType = 'Month';

    });

        $scope.$watchCollection('[leformdata.loanInformation.loanTermYears, leformdata.loanInformation.loanTermMonths]', function(newValues, oldValues){
    	$scope.leformdata.maturityRule.loanMaturityPeriodCount = 0;
    	if($scope.leformdata.loanInformation.loanTermYears)
    		$scope.leformdata.maturityRule.loanMaturityPeriodCount = parseInt($scope.leformdata.loanInformation.loanTermYears * 12);
    	if($scope.leformdata.loanInformation.loanTermMonths)
    		$scope.leformdata.maturityRule.loanMaturityPeriodCount = $scope.leformdata.maturityRule.loanMaturityPeriodCount + parseInt($scope.leformdata.loanInformation.loanTermMonths);
    	$scope.leformdata.maturityRule.loanMaturityPeriodType = 'Month';
    });

    $scope.$watch('leformdata.loanDetail.negativeAmortizationIndicator', function(newValue, oldValue){
    	if($scope.leformdata.loanDetail.negativeAmortizationIndicator) {
    		$scope.leformdata.loanDetail.loanAmountIncreaseIndicator = true;
    		$scope.leformdata.payment.paymentRule.paymentOptionIndicator = true;
    	}
    	else {
    		$scope.leformdata.loanDetail.loanAmountIncreaseIndicator = false;
    		$scope.leformdata.negativeAmortization.negativeAmortizationType = '';
    		$scope.leformdata.negativeAmortization.negativeAmortizationMaximumLoanBalanceAmount = '';
    		$scope.leformdata.negativeAmortization.negativeAmortizationLimitMonthsCount = '';
    	}
    }, true);

    $scope.$watch('leformdata.interestRateAdjustment', function(newValue, oldValue){
    	if($scope.leformdata.interestRateAdjustment.firstPerChangeMaximumIncreaseRatePercent || $scope.leformdata.interestRateAdjustment.firstPerChangeRateAdjustmentFrequencyMonthsCount) {
    		$scope.leformdata.interestRateAdjustment.firstAdjustmentRule = 'First';
    	}
    	if($scope.leformdata.interestRateAdjustment.subsequentPerChangeMaximumIncreaseRatePercent || $scope.leformdata.interestRateAdjustment.subsequentPerChangeRateAdjustmentFrequencyMonthsCount) {
    		$scope.leformdata.interestRateAdjustment.subsequentAdjustmentRule = 'Subsequent';
    	}
    }, true);

    $scope.$watch('leformdata.principalAndInterestPaymentAdjustment', function(newValue, oldValue){
    	if($scope.leformdata.principalAndInterestPaymentAdjustment.firstPerChangePrincipalAndInterestPaymentAdjustmentFrequencyMonthsCount) {
    		$scope.leformdata.principalAndInterestPaymentAdjustment.firstAdjustmentRuleType = 'First';
    	}
    	if($scope.leformdata.principalAndInterestPaymentAdjustment.subsequentPerChangePrincipalAndInterestPaymentAdjustmentFrequencyMonthsCount) {
    		$scope.leformdata.principalAndInterestPaymentAdjustment.subsequentAdjustmentRuleType = 'Subsequent';
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
	$scope.$watch('leformdata.closingCostDetailsLoanCosts.originationCharges', function(newValue, oldValue) {
		 bpAtClosing.originationChargeTotalbpAtClosing = 0;
		 bpB4Closing.originationChargeTotalbpB4Closing = 0;
		 spAtClosing.originationChargeTotalspAtClosing = 0;
		 spB4Closing.originationChargeTotalspB4Closing = 0;
		 paidByOthers.originationChargeTotalpaidByOthers = 0;

         for(i=0; i<$scope.leformdata.closingCostDetailsLoanCosts.originationCharges.length; i++) {
         	paidByOthers.originationChargeTotalpaidByOthers += $scope.leformdata.closingCostDetailsLoanCosts.originationCharges[i].feeEstimatedTotalAmount ? parseFloat($scope.leformdata.closingCostDetailsLoanCosts.originationCharges[i].feeEstimatedTotalAmount) : +0;
            
            for(j=0; j<$scope.sectionAfeeTypes.length; j++){
				if($scope.sectionAfeeTypes[j].value == $scope.leformdata.closingCostDetailsLoanCosts.originationCharges[i].feeType) {
					if($scope.leformdata.closingCostDetailsLoanCosts.originationCharges[i].feeType!='Other'){
					   $scope.sectionAfeeTypes[j].disabled = true;
					}
				} 
		    }
            
            if($scope.leformdata.closingCostDetailsLoanCosts.originationCharges[i].paymentIncludedInAPRIndicator==null){
            	$scope.leformdata.closingCostDetailsLoanCosts.originationCharges[i].paymentIncludedInAPRIndicator='';
            }
         }

         $scope.leformdata.closingCostDetailsLoanCosts.ocTotalAmount = paidByOthers.originationChargeTotalpaidByOthers;
         $scope.leformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers = parseFloat(paidByOthers.originationChargeTotalpaidByOthers) + parseFloat(paidByOthers.sbDidNotShopTotalpaidByOthers) + parseFloat(paidByOthers.sbDidShopTotalpaidByOthers);
         
         $scope.leformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount = $scope.leformdata.closingCostDetailsLoanCosts.ocTotalAmount + $scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopTotalAmount + $scope.leformdata.closingCostDetailsLoanCosts.sbDidShopTotalAmount;
         $scope.leformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.leformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount) + parseFloat($scope.leformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount) + parseFloat($scope.leformdata.closingCostsTotal.lenderCredits=='' || $scope.leformdata.closingCostsTotal.lenderCredits==undefined ? +0 : $scope.leformdata.closingCostsTotal.lenderCredits);
         $scope.leformdata.closingCostsTotal.closingCostsSubtotal.paidByOthers = parseFloat($scope.leformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers) + parseFloat($scope.leformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount);

    }, true);

    $scope.$watch('leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors', function(newValue, oldValue) {
    	 bpAtClosing.sbDidNotShopTotalbpAtClosing = 0;
    	 bpB4Closing.sbDidNotShopTotalbpB4Closing = 0;
    	 spAtClosing.sbDidNotShopTotalspAtClosing = 0;
		 spB4Closing.sbDidNotShopTotalspB4Closing = 0;
		 paidByOthers.sbDidNotShopTotalpaidByOthers = 0;
         $scope.escrowWaiverFeeAmount = 0;

         for(i=0; i<$scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.length; i++) {
         	paidByOthers.sbDidNotShopTotalpaidByOthers += $scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].feeEstimatedTotalAmount ? parseFloat($scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].feeEstimatedTotalAmount) : +0;

          	//Escrow Waiver Fee Calculation
	        if($scope.leformdata.loanDetail.escrowIndicator==false && $scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].feeType =='EscrowWaiverFee'){
	            if($scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpAtClosing){
	               $scope.escrowWaiverFeeAmount = $scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpAtClosing ? parseFloat($scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpAtClosing) : +0;
	            }
	        }

	        for(j=0; j<$scope.sectionBfeeTypes.length; j++){
				if($scope.sectionBfeeTypes[j].value == $scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].feeType) {
					if($scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].feeType!='Other'){
					   $scope.sectionBfeeTypes[j].disabled = true;
					}
				} 
		    }

		    if($scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].paymentIncludedInAPRIndicator==null){
            	$scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].paymentIncludedInAPRIndicator='';
            }
         }

         $scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopTotalAmount = paidByOthers.sbDidNotShopTotalpaidByOthers;
         $scope.leformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers = parseFloat(paidByOthers.originationChargeTotalpaidByOthers) + parseFloat(paidByOthers.sbDidNotShopTotalpaidByOthers) + parseFloat(paidByOthers.sbDidShopTotalpaidByOthers);
         
         $scope.leformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount = $scope.leformdata.closingCostDetailsLoanCosts.ocTotalAmount + $scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopTotalAmount + $scope.leformdata.closingCostDetailsLoanCosts.sbDidShopTotalAmount;
         $scope.leformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.leformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount) + parseFloat($scope.leformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount) + parseFloat($scope.leformdata.closingCostsTotal.lenderCredits=='' || $scope.leformdata.closingCostsTotal.lenderCredits==undefined ? +0 : $scope.leformdata.closingCostsTotal.lenderCredits);
         $scope.leformdata.closingCostsTotal.closingCostsSubtotal.paidByOthers = parseFloat($scope.leformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers) + parseFloat($scope.leformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount);
        
    }, true);

    $scope.$watch('leformdata.closingCostDetailsLoanCosts.sbDidShopFors', function(newValue, oldValue) {
    	 bpAtClosing.sbDidShopTotalbpAtClosing = 0;
    	 bpB4Closing.sbDidShopTotalbpB4Closing = 0;
    	 spAtClosing.sbDidShopTotalspAtClosing = 0;
		 spB4Closing.sbDidShopTotalspB4Closing = 0;
		 paidByOthers.sbDidShopTotalpaidByOthers = 0;

         for(i=0; i<$scope.leformdata.closingCostDetailsLoanCosts.sbDidShopFors.length; i++) {
			
			paidByOthers.sbDidShopTotalpaidByOthers += $scope.leformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].feeEstimatedTotalAmount ? parseFloat($scope.leformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].feeEstimatedTotalAmount) : +0;
	        
	        for(j=0; j<$scope.sectionCfeeTypes.length; j++){
				if($scope.sectionCfeeTypes[j].value == $scope.leformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].feeType) {
					if($scope.leformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].feeType!='Other'){
					   $scope.sectionCfeeTypes[j].disabled = true;
					}
				} 
		    }

		    if($scope.leformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].paymentIncludedInAPRIndicator==null){
            	$scope.leformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].paymentIncludedInAPRIndicator='';
            }
         }
         $scope.leformdata.closingCostDetailsLoanCosts.sbDidShopTotalAmount = paidByOthers.sbDidShopTotalpaidByOthers;
         $scope.leformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers = parseFloat(paidByOthers.originationChargeTotalpaidByOthers) + parseFloat(paidByOthers.sbDidNotShopTotalpaidByOthers) + parseFloat(paidByOthers.sbDidShopTotalpaidByOthers);
         
         $scope.leformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount = $scope.leformdata.closingCostDetailsLoanCosts.ocTotalAmount + $scope.leformdata.closingCostDetailsLoanCosts.sbDidNotShopTotalAmount + $scope.leformdata.closingCostDetailsLoanCosts.sbDidShopTotalAmount;
         $scope.leformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.leformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount) + parseFloat($scope.leformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount) + parseFloat($scope.leformdata.closingCostsTotal.lenderCredits=='' || $scope.leformdata.closingCostsTotal.lenderCredits==undefined ? +0 : $scope.leformdata.closingCostsTotal.lenderCredits);
         $scope.leformdata.closingCostsTotal.closingCostsSubtotal.paidByOthers = parseFloat($scope.leformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers) + parseFloat($scope.leformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount);


    }, true);



    $scope.$watch('leformdata.closingCostDetailsOtherCosts.tOGovtFeesList', function(newValue, oldValue) {
		 bpAtClosing.tOGovtFeesTotalbpAtClosing = 0;
		 bpB4Closing.tOGovtFeesTotalbpB4Closing = 0;
		 spAtClosing.tOGovtFeesTotalspAtClosing = 0;
		 spB4Closing.tOGovtFeesTotalspB4Closing = 0;
		 paidByOthers.tOGovtFeesTotalpaidByOthers = 0;

         for(i=0; i<$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList.length; i++) {
			paidByOthers.tOGovtFeesTotalpaidByOthers += $scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeEstimatedTotalAmount ? parseFloat($scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeEstimatedTotalAmount) : +0;

            for(j=0; j<$scope.sectionEfeeTypes.length; j++){
				if($scope.sectionEfeeTypes[j].value == $scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType) {
					if($scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType!='Other'){
					   $scope.sectionEfeeTypes[j].disabled = true;
					}
				} 
		    }

		    if($scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].paymentIncludedInAPRIndicator==null){
            	$scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].paymentIncludedInAPRIndicator='';
            }
         }

         $scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount = paidByOthers.tOGovtFeesTotalpaidByOthers;

         $scope.leformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount = $scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount + $scope.leformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount + $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount + $scope.leformdata.closingCostDetailsOtherCosts.otherTotalAmount;
         $scope.leformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.leformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount) + parseFloat($scope.leformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount) + parseFloat($scope.leformdata.closingCostsTotal.lenderCredits=='' || $scope.leformdata.closingCostsTotal.lenderCredits==undefined ? +0 : $scope.leformdata.closingCostsTotal.lenderCredits);
         $scope.leformdata.closingCostsTotal.closingCostsSubtotal.paidByOthers = parseFloat($scope.leformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers) + parseFloat($scope.leformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount);

    }, true);

    $scope.$watch('leformdata.closingCostDetailsOtherCosts.prepaidsList', function(newValue, oldValue) {
		 bpAtClosing.prepaidsTotalbpAtClosing = 0;
		 bpB4Closing.prepaidsTotalbpB4Closing = 0;
		 spAtClosing.prepaidsTotalspAtClosing = 0;
		 spB4Closing.prepaidsTotalspB4Closing = 0;
		 paidByOthers.prepaidsTotalpaidByOthers = 0;

         for(i=0; i<$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList.length; i++) {
			paidByOthers.prepaidsTotalpaidByOthers += $scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemEstimatedTotalAmount ? parseFloat($scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemEstimatedTotalAmount) : +0;

          	for(j=0; j<$scope.prepaidItems.length; j++){
				if($scope.prepaidItems[j].value == $scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType) {
					if($scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType!='Other'){
					   $scope.prepaidItems[j].disabled = true;
					}
				} 
		    }

		    if($scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].paymentIncludedInAPRIndicator==null){
            	$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].paymentIncludedInAPRIndicator='';
            }

            if($scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType=='CityPropertyTax' || $scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType=='CountyPropertyTax' ||
            	$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType=='DistrictPropertyTax' || $scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType=='SchoolPropertyTax' ||
            	$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType=='StatePropertyTax' || $scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType=='TownshipPropertyTax' || 
            	$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType=='VillagePropertyTax' || $scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType=='TownPropertyTax')
            {
            	$scope.leformdata.closingCostDetailsOtherCosts.prepaidsList[i].regulationZPointsAndFeesIndicator = null;
            }
         }

         $scope.leformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount = paidByOthers.prepaidsTotalpaidByOthers;

         $scope.leformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount = $scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount + $scope.leformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount + $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount + $scope.leformdata.closingCostDetailsOtherCosts.otherTotalAmount;
         $scope.leformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.leformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount) + parseFloat($scope.leformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount) + parseFloat($scope.leformdata.closingCostsTotal.lenderCredits=='' || $scope.leformdata.closingCostsTotal.lenderCredits==undefined ? +0 : $scope.leformdata.closingCostsTotal.lenderCredits);
         $scope.leformdata.closingCostsTotal.closingCostsSubtotal.paidByOthers = parseFloat($scope.leformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers) + parseFloat($scope.leformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount);

    }, true);

    $scope.$watch('leformdata.closingCostDetailsOtherCosts.escrowItemsList', function(newValue, oldValue) {
		 bpAtClosing.iEPatClosingTotalbpAtClosing = 0;
		 bpB4Closing.iEPatClosingTotalbpB4Closing = 0;
		 spAtClosing.iEPatClosingTotalspAtClosing = 0;
		 spB4Closing.iEPatClosingTotalspB4Closing = 0;
		 paidByOthers.iEPatClosingTotalpaidByOthers = 0;
         var escrowArray = [];
         var escrowValue = '';
         var etiaTotalAmount = 0;
         var nonEscrowAmount = 0;
         var escrowMonthlyAmount = 0;
         $scope.leformdata.integratedDisclosureDetail.firstYearTotalEscrowPaymentDescription ='';
         for(i=0; i<$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList.length; i++) {
         	paidByOthers.iEPatClosingTotalpaidByOthers += $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemEstimatedTotalAmount ? parseFloat($scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemEstimatedTotalAmount) : +0;

            for(j=0; j<$scope.escrowItemTypes.length; j++){
				if($scope.escrowItemTypes[j].value == $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType) {
					if($scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType!='Other'){
					   $scope.escrowItemTypes[j].disabled = true;
					}
				} 
		    }

		    if($scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].paymentIncludedInAPRIndicator==null){
            	$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].paymentIncludedInAPRIndicator='';
            }

            //Projected Payments Escrow Monthly Payment Amount
            if($scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType!='MortgageInsurance'){
               escrowMonthlyAmount += $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowMonthlyPaymentAmount ? parseFloat($scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowMonthlyPaymentAmount) : +0;
               for(j=0;j<$scope.leformdata.projectedPayments.estimatedEscrow.length;j++){
                   $scope.leformdata.projectedPayments.estimatedEscrow[j].projectedPaymentEstimatedEscrowPaymentAmount = escrowMonthlyAmount ? parseFloat(escrowMonthlyAmount) : +0;
               }
            }

           
            //Escrow Account
	        if(bpAtClosing.iEPatClosingTotalbpAtClosing && bpAtClosing.iEPatClosingTotalbpAtClosing!=undefined 
	        	&& bpAtClosing.iEPatClosingTotalbpAtClosing!="0.00" && bpAtClosing.iEPatClosingTotalbpAtClosing!="0"){
	        		$scope.leformdata.loanDetail.escrowIndicator =true;
	        }else{
	        	$scope.leformdata.loanDetail.escrowIndicator =false;
	        }

            //Calculation For Estimated Taxes Insurance Assessment Total Amount
            if($scope.leformdata.integratedDisclosureDetail.firstYearTotalNonEscrowPaymentAmount && $scope.leformdata.integratedDisclosureDetail.firstYearTotalNonEscrowPaymentAmount!=undefined){
                nonEscrowAmount = $scope.leformdata.integratedDisclosureDetail.firstYearTotalNonEscrowPaymentAmount ? parseFloat($scope.leformdata.integratedDisclosureDetail.firstYearTotalNonEscrowPaymentAmount) : +0;
	        }
        	if($scope.leformdata.termsOfLoan.lienPriorityType=='FirstLien' && $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType!='MortgageInsurance' && $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType!=''){
	            etiaTotalAmount += $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowMonthlyPaymentAmount ? parseFloat($scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowMonthlyPaymentAmount) : +0; 
	        }
   
	        //$scope.leformdata.etiaSection.projectedPaymentEstimatedTaxesInsuranceAssessmentTotalAmount = etiaTotalAmount;

            //Adding Values to Escrow Account
            if($scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemEstimatedTotalAmount && $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType!='MortgageInsurance'){
                if($scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType=='CityPropertyTax' || $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType=='CountyPropertyTax' ||
                	$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType=='DistrictPropertyTax' || $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType=='SchoolPropertyTax' ||
                	$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType=='StatePropertyTax' || $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType=='TownshipPropertyTax' || 
                	$scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType=='VillagePropertyTax' || $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType=='TownPropertyTax')
                {
                	 if(escrowArray.indexOf('PropertyTaxes')==-1){
                	    escrowArray.push('PropertyTaxes');
                	 }

                }else{
                	if(escrowArray.indexOf($scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType)==-1){
            	    	escrowArray.push($scope.leformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType);
                    }
                }
            }

            $scope.leformdata.integratedDisclosureDetail.firstYearTotalEscrowPaymentDescription =
	            angular.forEach(escrowArray, function(value) { 
	            	return value;
	            }).join(",").replace(/([A-Z]+)/g, " $1");

            if($scope.leformdata.integratedDisclosureDetail.firstYearTotalEscrowPaymentDescription.trim().indexOf('Property Taxes')!=-1){
            	$scope.leformdata.etiaSection.etiaValues[0].projectedPaymentEscrowedType='Escrowed';
            	$scope.leformdata.etiaSection.propertyTaxesCheck = true;
            	$scope.leformdata.etiaSection.etiaValues[0].insuranceTaxCheck = true; 
            }else{
            	$scope.leformdata.etiaSection.etiaValues[0].projectedPaymentEscrowedType='NotEscrowed';
            	$scope.leformdata.etiaSection.etiaValues[0].insuranceTaxCheck = false; 
            }

             if($scope.leformdata.integratedDisclosureDetail.firstYearTotalEscrowPaymentDescription.trim().indexOf('Homeowners Insurance')!=-1){
            	$scope.leformdata.etiaSection.etiaValues[1].projectedPaymentEscrowedType='Escrowed';
            	$scope.leformdata.etiaSection.HomeownersInsuranceCheck = true;
            	$scope.leformdata.etiaSection.etiaValues[1].insuranceTaxCheck = true; 
            }else{
            	$scope.leformdata.etiaSection.etiaValues[1].projectedPaymentEscrowedType='NotEscrowed';
            	$scope.leformdata.etiaSection.etiaValues[1].insuranceTaxCheck = false; 
            }
        }

         $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount = paidByOthers.iEPatClosingTotalpaidByOthers;

         $scope.leformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount = $scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount + $scope.leformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount + $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount + $scope.leformdata.closingCostDetailsOtherCosts.otherTotalAmount;
         $scope.leformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.leformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount) + parseFloat($scope.leformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount) + parseFloat($scope.leformdata.closingCostsTotal.lenderCredits=='' || $scope.leformdata.closingCostsTotal.lenderCredits==undefined ? +0 : $scope.leformdata.closingCostsTotal.lenderCredits);
         $scope.leformdata.closingCostsTotal.closingCostsSubtotal.paidByOthers = parseFloat($scope.leformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers) + parseFloat($scope.leformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount);
         
         //Escrow Account:Initial Escrow Payment
        if($scope.leformdata.loanDetail.escrowIndicator){
           $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount = bpAtClosing.iEPatClosingTotalbpAtClosing;
        }

    }, true);

    $scope.$watch('leformdata.closingCostDetailsOtherCosts.otherCostsList', function(newValue, oldValue) {
		 bpAtClosing.otherTotalbpAtClosing = 0;
		 bpB4Closing.otherTotalbpB4Closing = 0;
		 spAtClosing.otherTotalspAtClosing = 0;
		 spB4Closing.otherTotalspB4Closing = 0;
		 paidByOthers.otherTotalpaidByOthers = 0;

         for(i=0; i<$scope.leformdata.closingCostDetailsOtherCosts.otherCostsList.length; i++) {
         	paidByOthers.otherTotalpaidByOthers += $scope.leformdata.closingCostDetailsOtherCosts.otherCostsList[i].feeEstimatedTotalAmount ? parseFloat($scope.leformdata.closingCostDetailsOtherCosts.otherCostsList[i].feeEstimatedTotalAmount) : +0;

            for(j=0; j<$scope.sectionHfeeTypes.length; j++){
				if($scope.sectionHfeeTypes[j].value == $scope.leformdata.closingCostDetailsOtherCosts.otherCostsList[i].feeType) {
					if($scope.leformdata.closingCostDetailsOtherCosts.otherCostsList[i].feeType!='Other'){
					   $scope.sectionHfeeTypes[j].disabled = true;
					}
				} 
		    }

		    if($scope.leformdata.closingCostDetailsOtherCosts.otherCostsList[i].paymentIncludedInAPRIndicator==null){
            	$scope.leformdata.closingCostDetailsOtherCosts.otherCostsList[i].paymentIncludedInAPRIndicator='';
            }
         }

         $scope.leformdata.closingCostDetailsOtherCosts.otherTotalAmount = paidByOthers.otherTotalpaidByOthers;

         $scope.leformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount = $scope.leformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount + $scope.leformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount + $scope.leformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount + $scope.leformdata.closingCostDetailsOtherCosts.otherTotalAmount;
         $scope.leformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.leformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount) + parseFloat($scope.leformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount) + parseFloat($scope.leformdata.closingCostsTotal.lenderCredits=='' || $scope.leformdata.closingCostsTotal.lenderCredits==undefined ? +0 : $scope.leformdata.closingCostsTotal.lenderCredits);
         $scope.leformdata.closingCostsTotal.closingCostsSubtotal.paidByOthers = parseFloat($scope.leformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers) + parseFloat($scope.leformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount);
        
    }, true);

    $scope.$watch('leformdata.cashToCloses', function(newValue,oldValue){
    var cashToCloseItemEstimatedAmount = 0;
    var cashToCloseItemFinalAmount = 0;

    //Total Closing Costs(J)
	if($scope.leformdata.closingCostsTotal.totalClosingCosts){
		if($scope.loanBasicInfo.loanFormType == 'alternate'){
			$scope.leformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount = parseFloat($scope.leformdata.closingCostsTotal.totalClosingCosts*-1);
		}else {
			$scope.leformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount = parseFloat($scope.leformdata.closingCostsTotal.totalClosingCosts);
		}
	}

    if($scope.loanBasicInfo.loanFormType == 'alternate'){
	    if($scope.leformdata.termsOfLoan.noteAmount && $scope.leformdata.termsOfLoan.noteAmount!=undefined && $scope.loanBasicInfo.loanFormType == 'alternate'){
	            $scope.leformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemEstimatedAmount = $scope.leformdata.termsOfLoan.noteAmount ? parseFloat($scope.leformdata.termsOfLoan.noteAmount) : +0;
	    }
	}

    if($scope.loanBasicInfo.loanFormType == 'standard'){
	    if($scope.leformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemEstimatedAmount)
	    cashToCloseItemEstimatedAmount +=  $scope.leformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.leformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemEstimatedAmount);
	    if($scope.leformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount)
	    cashToCloseItemEstimatedAmount +=  $scope.leformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.leformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount);
	    if($scope.leformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemEstimatedAmount)
	    cashToCloseItemEstimatedAmount +=  $scope.leformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.leformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemEstimatedAmount);
	    if($scope.leformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemEstimatedAmount)
	    cashToCloseItemEstimatedAmount +=  $scope.leformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.leformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemEstimatedAmount);
        if($scope.leformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemEstimatedAmount)
	    cashToCloseItemEstimatedAmount +=  $scope.leformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemEstimatedAmount == ''  ? +0 : parseFloat($scope.leformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemEstimatedAmount*-1);
	    if($scope.leformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemEstimatedAmount)
	    cashToCloseItemEstimatedAmount +=  $scope.leformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.leformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemEstimatedAmount*-1);
	    if($scope.leformdata.cashToCloses.sellerCredits.integratedDisclosureCashToCloseItemEstimatedAmount)
	    cashToCloseItemEstimatedAmount +=  $scope.leformdata.cashToCloses.sellerCredits.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.leformdata.cashToCloses.sellerCredits.integratedDisclosureCashToCloseItemEstimatedAmount*-1);
	    if($scope.leformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemEstimatedAmount)
	    cashToCloseItemEstimatedAmount +=  $scope.leformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.leformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemEstimatedAmount);
	}else{
		if($scope.leformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemEstimatedAmount)
	    cashToCloseItemEstimatedAmount +=  $scope.leformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.leformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemEstimatedAmount);
	    if($scope.leformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount)
	    cashToCloseItemEstimatedAmount +=  $scope.leformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.leformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount);
	    if($scope.leformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemEstimatedAmount)
	    cashToCloseItemEstimatedAmount +=  $scope.leformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.leformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemEstimatedAmount);
    }

    $scope.leformdata.cashToCloses.cashToCloseTotal[0].integratedDisclosureCashToCloseItemEstimatedAmount = Math.round(cashToCloseItemEstimatedAmount);
  
    //Closng Costs Financed
    /*var diffClosingCosts = 0;
    var diffClosingCostsAtClosing = 0;
    var noteAmountPayOffDiff = 0;
    var notePersonalAmountDiff = 0;
    var personalAmountDiff = 0;

    if($scope.leformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount && $scope.leformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount!=undefined && $scope.leformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing && $scope.leformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing!=undefined){
        $scope.leformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount = $scope.leformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount ? parseFloat($scope.leformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount) : +0;
        $scope.leformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing = $scope.leformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing ? parseFloat($scope.leformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing) : +0;
        diffClosingCosts = parseFloat($scope.leformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount-$scope.leformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing);
    }

    if($scope.leformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount && $scope.leformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount!=undefined && $scope.leformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing && $scope.leformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing!=undefined){
        $scope.leformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount = $scope.leformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount ? parseFloat($scope.leformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount) : +0;
        $scope.leformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing = $scope.leformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing ? parseFloat($scope.leformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing) : +0;
        diffClosingCostsAtClosing = parseFloat($scope.leformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount-$scope.leformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing);
    }
    
    if($scope.leformdata.termsOfLoan.noteAmount && $scope.leformdata.termsOfLoan.noteAmount!=undefined && $scope.leformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemEstimatedAmount && $scope.leformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemEstimatedAmount!=undefined){
        noteAmountPayOffDiff = parseFloat($scope.leformdata.termsOfLoan.noteAmount-$scope.leformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemEstimatedAmount);
    }
    
    if($scope.leformdata.salesContractDetail.personalPropertyAmount && $scope.leformdata.salesContractDetail.personalPropertyAmount!=undefined){
    if($scope.leformdata.salesContractDetail.saleContractAmount && $scope.leformdata.salesContractDetail.saleContractAmount!=undefined){
           personalAmountDiff = parseFloat($scope.leformdata.salesContractDetail.saleContractAmount+$scope.leformdata.salesContractDetail.personalPropertyAmount);
    }else if($scope.leformdata.salesContractDetail.realPropertyAmount && $scope.leformdata.salesContractDetail.realPropertyAmount!=undefined){
           personalAmountDiff = parseFloat($scope.leformdata.salesContractDetail.realPropertyAmount+$scope.leformdata.salesContractDetail.personalPropertyAmount);
    }
    }

    if($scope.leformdata.termsOfLoan.noteAmount && $scope.leformdata.termsOfLoan.noteAmount!=undefined){
        notePersonalAmountDiff = $scope.leformdata.termsOfLoan.noteAmount ? parseFloat($scope.leformdata.termsOfLoan.noteAmount-personalAmountDiff) : +0;
    }

    if($scope.loanBasicInfo.loanFormType == 'alternate'){
        if(diffClosingCosts<0){
            $scope.leformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemEstimatedAmount = 0;
        }else if(noteAmountPayOffDiff > diffClosingCosts){
            $scope.leformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemEstimatedAmount = parseFloat(diffClosingCosts);
        }else if(noteAmountPayOffDiff <= diffClosingCosts){
            $scope.leformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemEstimatedAmount = 0;
        }else{
            $scope.leformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemEstimatedAmount = parseFloat(noteAmountPayOffDiff);
        }
    }else{
        if(diffClosingCostsAtClosing<0){
            $scope.leformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemEstimatedAmount = 0;
        }else if(notePersonalAmountDiff >= 0){
            $scope.leformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemEstimatedAmount = parseFloat(notePersonalAmountDiff*-1);
        }else if(notePersonalAmountDiff < 0){
            $scope.leformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemEstimatedAmount = 0;
        }
    }*/

    if($scope.loanBasicInfo.loanFormType == 'alternate'){
    	if($scope.leformdata.cashToCloses.cashToCloseTotal[0].integratedDisclosureCashToCloseItemEstimatedAmount>0){
    	    $scope.leformdata.cashToCloses.cashToCloseTotal[0].integratedDisclosureCashToCloseItemPaymentType = 'ToBorrower';
    	    $scope.leformdata.closingInformationDetail.cashToBorrowerAtClosingAmount = $scope.leformdata.cashToCloses.cashToCloseTotal[0].integratedDisclosureCashToCloseItemEstimatedAmount;
	    }else if($scope.leformdata.cashToCloses.cashToCloseTotal[0].integratedDisclosureCashToCloseItemEstimatedAmount<0){
	    	$scope.leformdata.cashToCloses.cashToCloseTotal[0].integratedDisclosureCashToCloseItemPaymentType = 'FromBorrower';
	    	$scope.leformdata.closingInformationDetail.cashFromBorrowerAtClosingAmount = 0-$scope.leformdata.cashToCloses.cashToCloseTotal[0].integratedDisclosureCashToCloseItemEstimatedAmount;
	    }
    }

    }, true);
    
    $scope.$watch('leformdata.closingCostsTotal.lenderCredits', function(newValue,oldValue){
    	var totalClosingCosts = 0;
    	totalClosingCosts += $scope.leformdata.closingCostsTotal.closingCostsSubtotal.paidByOthers;
    	if($scope.leformdata.closingCostsTotal.lenderCredits)
  			totalClosingCosts +=  parseFloat($scope.leformdata.closingCostsTotal.lenderCredits);
        $scope.leformdata.closingCostsTotal.totalClosingCosts = totalClosingCosts;
    },true);
    
    $scope.$watch('payoffsAndPaymentsList', function(newValue,oldValue){
		var totalAmount = 0;
	   for(k=0;k<$scope.payoffsAndPaymentsList.length;k++){
	   		if($scope.payoffsAndPaymentsList[k].payoffAmount)
        		totalAmount += parseFloat($scope.payoffsAndPaymentsList[k].payoffAmount);
        }
        $scope.payoffsAndPaymentsTotalAmount = totalAmount;

        for(i=0;i<$scope.leformdata.liabilityList.length;i++){
           if($scope.leformdata.liabilityList[i].integratedDisclosureSectionType == 'PayoffsAndPayments') {
               $scope.leformdata.liabilityList.splice(i,1);
               i--;
           }
        };

        for(i=0;i<$scope.leformdata.closingAdjustmentItemList.length;i++){
           if($scope.leformdata.closingAdjustmentItemList[i].integratedDisclosureSectionType == 'PayoffsAndPayments') {
               $scope.leformdata.closingAdjustmentItemList.splice(i,1);
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
                $scope.leformdata.liabilityList.push(liabilityObj);
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
                $scope.leformdata.closingAdjustmentItemList.push(adjustmentObj);
            }
        });

        $scope.leformdata.payoffsAndPayments.integratedDisclosureSectionSummary.integratedDisclosureSectionSummaryDetailModel.integratedDisclosureSectionTotalAmount = $scope.payoffsAndPaymentsTotalAmount ? parseFloat($scope.payoffsAndPaymentsTotalAmount).toFixed(2) : +0;

        $scope.leformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemEstimatedAmount =  $scope.payoffsAndPaymentsTotalAmount ? parseFloat($scope.payoffsAndPaymentsTotalAmount*-1).toFixed(2) : +0;
    
    }, true);

    $scope.$watch('leformdata.termsOfLoan', function(newValue,oldValue){

		//Calculations regarding Loan Discount Percentage in Section A. Origination Charge of Other Costs
	 	for(i=0; i<$scope.leformdata.closingCostDetailsLoanCosts.originationCharges.length; i++){
		   if ($scope.leformdata.closingCostDetailsLoanCosts.originationCharges[i].feeType == 'LoanDiscountPoints'){
			   var loanDiscountAmount = 0;
			   if($scope.leformdata.closingCostDetailsLoanCosts.originationCharges[i].feeTotalPercent && $scope.leformdata.termsOfLoan.noteAmount){
			   		loanDiscountAmount = $scope.leformdata.closingCostDetailsLoanCosts.originationCharges[i].feeTotalPercent ? ($scope.leformdata.closingCostDetailsLoanCosts.originationCharges[i].feeTotalPercent*$scope.leformdata.termsOfLoan.noteAmount)/100 : +0;
		 	   		$scope.leformdata.closingCostDetailsLoanCosts.originationCharges[i].feeEstimatedTotalAmount = loanDiscountAmount;
			   } else {
			   		$scope.leformdata.closingCostDetailsLoanCosts.originationCharges[i].feeEstimatedTotalAmount ='';
			   }
	       }
	    }

		if($scope.leformdata.termsOfLoan.noteAmount && $scope.leformdata.termsOfLoan.noteAmount!=undefined && $scope.loanBasicInfo.loanFormType == 'alternate'){
			$scope.leformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemEstimatedAmount = $scope.leformdata.termsOfLoan.noteAmount;
		}

	}, true);


    $scope.$watch('leformdata.projectedPayments',function(newValue,oldValue){
    	for(i=0;i<$scope.leformdata.projectedPayments.paymentCalculation.length;i++){
    		var estimatedTotalMinimumPayment = 0;
        	var estimatedTotalMaximumPayment = 0;

        	//Minimum Payment Calculation
    		if($scope.leformdata.projectedPayments.principalInterest[i].projectedPaymentPrincipalAndInterestMinimumPaymentAmount){
	    		estimatedTotalMinimumPayment += parseFloat($scope.leformdata.projectedPayments.principalInterest[i].projectedPaymentPrincipalAndInterestMinimumPaymentAmount);
	            if($scope.leformdata.projectedPayments.mortgageInsurance[i].projectedPaymentMIPaymentAmount)
	    	    estimatedTotalMinimumPayment += parseFloat($scope.leformdata.projectedPayments.mortgageInsurance[i].projectedPaymentMIPaymentAmount);
	            if($scope.leformdata.projectedPayments.estimatedEscrow[i].projectedPaymentEstimatedEscrowPaymentAmount)
	    	    estimatedTotalMinimumPayment += parseFloat($scope.leformdata.projectedPayments.estimatedEscrow[i].projectedPaymentEstimatedEscrowPaymentAmount);
	    	    $scope.leformdata.projectedPayments.estimatedTotal[i].projectedPaymentEstimatedTotalMinimumPaymentAmount = estimatedTotalMinimumPayment;
    	    }else{
    	    	$scope.leformdata.projectedPayments.estimatedTotal[i].projectedPaymentEstimatedTotalMinimumPaymentAmount = '';
    	    }

    	    //Maximum Payment Calculation
            if($scope.leformdata.projectedPayments.principalInterest[i].projectedPaymentPrincipalAndInterestMaximumPaymentAmount)
    		estimatedTotalMaximumPayment += parseFloat($scope.leformdata.projectedPayments.principalInterest[i].projectedPaymentPrincipalAndInterestMaximumPaymentAmount);
            if($scope.leformdata.projectedPayments.mortgageInsurance[i].projectedPaymentMIPaymentAmount)
    	    estimatedTotalMaximumPayment += parseFloat($scope.leformdata.projectedPayments.mortgageInsurance[i].projectedPaymentMIPaymentAmount);
            if($scope.leformdata.projectedPayments.estimatedEscrow[i].projectedPaymentEstimatedEscrowPaymentAmount)
    	    estimatedTotalMaximumPayment += parseFloat($scope.leformdata.projectedPayments.estimatedEscrow[i].projectedPaymentEstimatedEscrowPaymentAmount);
    	    $scope.leformdata.projectedPayments.estimatedTotal[i].projectedPaymentEstimatedTotalMaximumPaymentAmount = estimatedTotalMaximumPayment;
    	}

    }, true);

        $scope.$watch('MERS_MIN_ID',function(newValue,oldValue){
     	for(var i=0; i<$scope.leformdata.loanInformation.loanIdentifiers.length; i++) {
			if($scope.leformdata.loanInformation.loanIdentifiers[i].loanIdentifierType == 'MERS_MIN') {
				$scope.leformdata.loanInformation.loanIdentifiers.splice(i,1);
				i--;
			}
		}
    	if($scope.MERS_MIN_ID) {
			var loanIdentifier = {
            	"loanIdentifierType": "MERS_MIN",
            	"loanIdentifier": $scope.MERS_MIN_ID
        	};
        	$scope.leformdata.loanInformation.loanIdentifiers.push(loanIdentifier);
	   	}
    }, true);

    $scope.$watch('leformdata.integratedDisclosureDetail',function(newValue,oldValue){
           $scope.leformdata.integratedDisclosureDetail.fiveYearTotalOfPaymentsComparisonAmount = parseFloat($scope.leformdata.integratedDisclosureDetail.fiveYearTotalOfPaymentsComparisonAmount);
           $scope.leformdata.integratedDisclosureDetail.fiveYearPrincipalReductionComparisonAmount = parseFloat($scope.leformdata.integratedDisclosureDetail.fiveYearPrincipalReductionComparisonAmount);
           
    },true);

    $scope.$watch('leformdata.loanCalculationsQualifiedMortgage.loanCalculationModel',function(newValue,oldValue){
        $scope.leformdata.loanCalculationsQualifiedMortgage.loanCalculationModel.aprPercent = $scope.leformdata.loanCalculationsQualifiedMortgage.loanCalculationModel.aprPercent;
        $scope.leformdata.loanCalculationsQualifiedMortgage.loanCalculationModel.feeSummaryTotalInterestPercent = $scope.leformdata.loanCalculationsQualifiedMortgage.loanCalculationModel.feeSummaryTotalInterestPercent;
    },true);
    
    $scope.$watch('leformdata.micIdentifier',function(newValue,oldValue){
    	if($scope.leformdata.micIdentifier) {
    		$scope.leformdata.loanDetail.miRequiredIndicator = true;
    		if($scope.leformdata.termsOfLoan.mortgageType!='Conventional') {
    			var loanIdentifier = {
                	"loanIdentifierType": "AgencyCase",
                	"loanIdentifier": $scope.leformdata.micIdentifier
	        	};
	        	$scope.leformdata.loanInformation.loanIdentifiers.push(loanIdentifier);
    		} else {
    			$scope.leformdata.miDataDetail.miCertificateIdentifier = $scope.leformdata.micIdentifier;
    		}
	   	}
    }, true);

	$scope.$watch('leformdata.loanTerms.prepaymentPenalty.prepaymentPenaltyExpirationInYears',function(newValue,oldValue){
    	if($scope.leformdata.loanTerms.prepaymentPenalty.prepaymentPenaltyExpirationInYears) {
    		$scope.leformdata.loanTerms.prepaymentPenalty.prepaymentPenaltyExpirationMonthsCount = parseInt($scope.leformdata.loanTerms.prepaymentPenalty.prepaymentPenaltyExpirationInYears) * 12; 
    	} else {
    		$scope.leformdata.loanTerms.prepaymentPenalty.prepaymentPenaltyExpirationMonthsCount = '';
    	}
	}, true);
    
    //Total closing Costs
    $scope.$watch('leformdata.closingCostsTotal.totalClosingCosts',function(newValue,oldValue){
        if($scope.leformdata.closingCostsTotal.totalClosingCosts){
			if($scope.loanBasicInfo.loanFormType == 'alternate'){
				$scope.leformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount = parseFloat($scope.leformdata.closingCostsTotal.totalClosingCosts*-1);
			}else {
				$scope.leformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount = parseFloat($scope.leformdata.closingCostsTotal.totalClosingCosts);
			}
		}
    },true);

    $scope.$watch('leformdata.closingInformationDetail.closingCostExpirationDate', function(newValue, oldValue){
        var expireDate = new Date($scope.leformdata.closingInformationDetail.closingCostExpirationDate);
            expireDate.setHours(0);
            expireDate.setMinutes(0);
        $scope.leformdata.integratedDisclosureDetail.integratedDisclosureEstimatedClosingCostsExpirationDatetime=$filter('date')(expireDate, "yyyy-MM-ddTHH:mm:ss'Z'");
	});

   $scope.showtooltip = function($event){
    $scope.mml=angular.element(document.getElementById($event.target.id));
    $scope.tooltipmessage=$scope.mml.html();
     }
    $scope.leformdata.etiaSection['propertyTaxesCheck'] = false;
    $scope.leformdata.etiaSection['HomeownersInsuranceCheck'] = false;
    $scope.$watch('leformdata.etiaSection',function(newValue,oldValue){
    	var nonEscrowArray = [];  
        if($scope.leformdata.etiaSection.propertyTaxesCheck == true){
        	if($scope.leformdata.integratedDisclosureDetail.firstYearTotalEscrowPaymentDescription.trim().indexOf('Property Taxes')!=-1){
        		$scope.leformdata.etiaSection.etiaValues[0].projectedPaymentEscrowedType ='Escrowed'
        		$scope.leformdata.etiaSection.etiaValues[0].insuranceTaxCheck = true; 
        	}else if($scope.leformdata.integratedDisclosureDetail.firstYearTotalEscrowPaymentDescription.trim().indexOf('Property Taxes')==-1){
        		$scope.leformdata.etiaSection.etiaValues[0].projectedPaymentEscrowedType ='NotEscrowed'
        		$scope.leformdata.etiaSection.etiaValues[0].insuranceTaxCheck = false;
        	}
        }

        if($scope.leformdata.etiaSection.HomeownersInsuranceCheck == true){
        	if($scope.leformdata.integratedDisclosureDetail.firstYearTotalEscrowPaymentDescription.trim().indexOf('Homeowners Insurance')!=-1){
        		$scope.leformdata.etiaSection.etiaValues[1].projectedPaymentEscrowedType ='Escrowed'
        		$scope.leformdata.etiaSection.etiaValues[1].insuranceTaxCheck = true;
        	}else if($scope.leformdata.integratedDisclosureDetail.firstYearTotalEscrowPaymentDescription.trim().indexOf('Homeowners Insurance')==-1){
        		$scope.leformdata.etiaSection.etiaValues[1].projectedPaymentEscrowedType ='NotEscrowed'
        		$scope.leformdata.etiaSection.etiaValues[1].insuranceTaxCheck = false;
        	}
        }    

    	if($scope.leformdata.loanDetail.escrowIndicator){	
		    for(i=0;i<$scope.leformdata.etiaSection.etiaValues.length;i++){
                if($scope.leformdata.etiaSection.etiaValues[i].projectedPaymentEscrowedType=='NotEscrowed' && $scope.leformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType!='HomeownersInsurance' && $scope.leformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType!='PropertyTaxes'){
	                nonEscrowArray.push($scope.leformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType);
		        }
		    }
		    //Adding Values to Non Escrow Account
	        $scope.leformdata.integratedDisclosureDetail.firstYearTotalNonEscrowPaymentDescription =
	        angular.forEach(nonEscrowArray, function(value) { 
	        	return value;
	        }).join(",").replace(/([A-Z]+)/g, " $1");
        }
    },true);
   
    // $rootScope.leformdataSendToJsonService=$scope.leformdata;
    // leService.generateXML($rootScope.leformdataSendToJsonService).success(function(data){
    // 		$rootScope.xmlStringData=data;
    // 		LoadXMLString('xmldisplayArea',data);
    // });

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