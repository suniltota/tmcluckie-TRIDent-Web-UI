/**
 * Controller for transform function
 */
app.controller('closingDisclosureCtrl', function ($scope, $sce, $filter, $location, $rootScope, $anchorScroll, staticData, cdService) {

	if(localStorage.loanPurposeType != undefined) {
		staticData.basicLoanInfo.loanPurposeType = localStorage.loanPurposeType;
	}
	if(localStorage.loanFormType != undefined) {
		staticData.basicLoanInfo.loanFormType = localStorage.loanFormType;
	}
	$scope.originationChargeDisplayLabelStatus=false;
	$scope.originationChargeDisplayLabelValue;
	$scope.loanBasicInfo = angular.copy(staticData.basicLoanInfo);
	$scope.showTab = 'closingInfo';
	$scope.dateFormat = angular.copy(staticData.dateDisplayFormat);
	$scope.dropDownBooleanOptions = angular.copy(staticData.dropDownBooleanOptions);
	$scope.escrowDropDownBooleanOptions = angular.copy(staticData.escrowDropDownBooleanOptions);
	$scope.escrowDropDownBooleanOptionsWithSome = angular.copy(staticData.escrowDropDownBooleanOptionsWithSome);
	$scope.stateCodes = angular.copy(staticData.stateCodes);
	$scope.usstateCodes = angular.copy(staticData.usstateCodes);
	$scope.canadaStateCodes = angular.copy(staticData.canadaStateCodes);
	$scope.countryCodes = angular.copy(staticData.countryCodes);
	$scope.propertyValuationMethodTypes = angular.copy(staticData.propertyValuationMethodTypes);
	$scope.borrowerPartyRoleTypes = angular.copy(staticData.borrowerPartyRoleTypes);
	$scope.loanPeriodTypes = angular.copy(staticData.loanPeriodTypes);
	$scope.loanTypes = angular.copy(staticData.loanTypes);
	$scope.ausTypes = angular.copy(staticData.ausTypes);
	$scope.lienPriorityTypes = angular.copy(staticData.lienPriorityTypes);
	$scope.amortizationTypes = angular.copy(staticData.amortizationTypes);
	$scope.constructionLoanTypes = angular.copy(staticData.constructionLoanTypes);
	$scope.negativeAmortizationTypes = angular.copy(staticData.negativeAmortizationTypes);
	$scope.calendarMonths = angular.copy(staticData.calendarMonths);
	$scope.miCompanyNameTypes = angular.copy(staticData.miCompanyNameTypes);
	$scope.ETIAComponentTypes = angular.copy(staticData.ETIAComponentTypes);
	$scope.sectionAfeeTypes = angular.copy(staticData.sectionAfeeTypes);
	$scope.sectionBfeeTypes = angular.copy(staticData.sectionBfeeTypes);
	$scope.sectionCfeeTypes = angular.copy(staticData.sectionCfeeTypes);
	$scope.sectionEfeeTypes = angular.copy(staticData.sectionEfeeTypes);
	$scope.sectionHfeeTypes = angular.copy(staticData.sectionHfeeTypes);
	$scope.feePaidToTypes = angular.copy(staticData.feePaidToTypes);
	$scope.feePaidToTypeDescription = angular.copy(staticData.feePaidToTypeDescription);
	$scope.prepaidItems = angular.copy(staticData.prepaidItems);
    $scope.escrowItemTypes = angular.copy(staticData.escrowItemTypes);
    $scope.liabilityTypes = angular.copy(staticData.liabilityTypes);
    $scope.adjustmentTypes = angular.copy(staticData.adjustmentTypes);
    $scope.liabilityTypesPayoff = angular.copy(staticData.liabilityTypesPayoff);
    $scope.sectionNliabilityTypes = angular.copy(staticData.sectionNliabilityTypes);
    $scope.sectionKadjustmentTypes = angular.copy(staticData.sectionKadjustmentTypes);
    $scope.sectionLadjustmentTypes = angular.copy(staticData.sectionLadjustmentTypes);
    $scope.sectionNadjustmentTypes = angular.copy(staticData.sectionNadjustmentTypes);
    $scope.prorationItemTypes = angular.copy(staticData.prorationItemTypes);
    $scope.prorationItemAssesmentTypes = angular.copy(staticData.prorationItemAssesmentTypes);
    $scope.subordinateLiens = angular.copy(staticData.subordinateLiens);
    $scope.otherCredits = angular.copy(staticData.otherCredits);
    $scope.payeeTypes = angular.copy(staticData.payeeTypes);
    $scope.licenseAuthorityLevelTypes = angular.copy(staticData.licenseAuthorityLevelTypes);
    $scope.repayMethodType = angular.copy(staticData.repayMethodType);
    $scope.repayExemptionReasonType = angular.copy(staticData.repayExemptionReasonType);
    $scope.liabilityadjustments = angular.copy(staticData.liabilityadjustments);
    $scope.liabilityOrAdjustments = angular.copy(staticData.liabilityOrAdjustments);
    $scope.indexTypes = angular.copy(staticData.indexTypes);
    $scope.lateChargeTypes = angular.copy(staticData.lateChargeTypes);
    $scope.partialPaymentTypes = angular.copy(staticData.partialPaymentTypes);
    $scope.escrowAbsenceReasons = angular.copy(staticData.escrowAbsenceReasons);
    $scope.paymentFrequencyTypes = angular.copy(staticData.paymentFrequencyTypes);
    $scope.stateProperty = angular.copy(staticData.stateProperty);
    $scope.signatureTypes = angular.copy(staticData.signatureTypes);
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
    $scope.toleranceCure = false;
    $scope.toleranceCureDrpdwn = false;
    $scope.escrowWaiverFeeAmount = 0;
    $scope.loanMaturityPeriodTypes = angular.copy(staticData.loanMaturityPeriodTypes);
    $scope.results = false;
    $scope.adjustmentsAndProrationsAmountsKSection = 0;
    $scope.adjustmentsAndProrationsAmountsLSection = 0;
    $rootScope.lenderIDForHeader='';
    $rootScope.applicantLastnameforHeader='';
    $rootScope.PurposeTypeForHeader='';
    var cashTocloses = {};
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
	var miPremium = {};
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

    $rootScope.PurposeTypeForHeader=$scope.LoanType;//.cdformdata.closingDisclosureDocDetails.formType;
	var initializeCDformData = function() {
		$scope.cdformdata = angular.copy(staticData.cdformdata);
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
		cashTocloses = angular.copy($scope.cdformdata.cashToCloses.cashToCloseTotal[0]);
		miPremium = angular.copy($scope.cdformdata.miPremium[0]);
		$scope.cdformdata.closingInformation.propertyValuationDetail.propertyValue = 'Appraised';
        $scope.cdformdata.integratedDisclosureDetail.integratedDisclosureIssuedDate = $filter('date')(new Date, 'yyyy-MM-dd');
		$scope.cdformdata.closingInformationDetail.closingDate = $filter('date')(add_business_days($scope.cdformdata.integratedDisclosureDetail.integratedDisclosureIssuedDate, 5), 'yyyy-MM-dd');
	    $scope.cdformdata.etiaSection['propertyTaxesCheck'] = false;
	    $scope.cdformdata.etiaSection['HomeownersInsuranceCheck'] = false;
	    $scope.cdformdata.etiaSection['otherData'] = '';
	    $scope.cdformdata.etiaSection['otherCheck'] = false;
	    $scope.cdformdata['nonEscrowArray'] = [];	
	    $scope.cdformdata['escrowArray'] = [];		
		$scope.cdformdata['disbursementMinDate'] = '';
		$scope.cdformdata['signatureDate'] = '';
		$scope.cdformdata['principalAndInterestMonthsCount']='';
        $scope.cdformdata.closingDisclosureDocDetails.documentSignatureRequiredIndicator=true;
		if($scope.loanBasicInfo.loanPurposeType == 'purchase') {
			$scope.cdformdata.salesContractDetail.personalPropertyIndicator = false;
		} else {
			$scope.cdformdata.transactionInformation.refinanceSameLenderIndicator = false;
		}
		
		if(localStorage.jsonData != undefined) {
			$scope.cdformdata = angular.fromJson(localStorage.jsonData);
			$scope.cdformdata.loanInformation['loanTermYears'] = $scope.cdformdata.maturityRule.loanMaturityPeriodCount/12;
			$scope.cdformdata.loanInformation['loanTermMonths'] = $scope.cdformdata.maturityRule.loanMaturityPeriodCount%12;

			if($scope.cdformdata.loanInformation.amortizationType=='GraduatedPaymentARM' || $scope.cdformdata.loanInformation.amortizationType=='AdjustableRate'){
				if(!$scope.cdformdata.termsOfLoan.disclosedFullyIndexedRatePercent){
					if($scope.cdformdata.termsOfLoan.noteRatePercent){
						$scope.cdformdata.termsOfLoan.disclosedFullyIndexedRatePercent = $scope.cdformdata.termsOfLoan.noteRatePercent;
				    	$scope.cdformdata.termsOfLoan.noteRatePercent='';
				    }
			    }
			}

			if($scope.cdformdata.principalAndInterestPaymentAdjustment.firstPrincipalAndInterestPaymentChangeMonthsCount && $scope.cdformdata.principalAndInterestPaymentAdjustment.firstPrincipalAndInterestPaymentChangeMonthsCount!=undefined){
				$scope.cdformdata.principalAndInterestMonthsCount = $scope.cdformdata.principalAndInterestPaymentAdjustment.firstPrincipalAndInterestPaymentChangeMonthsCount-1;
			}

		}
		//Disbursement Date Calculation
		if($scope.cdformdata.closingInformationDetail.closingDate && $scope.cdformdata.closingInformationDetail.closingDate!=undefined){
	        $scope.cdformdata.disbursementMinDate = $scope.cdformdata.disbursementMinDate ? $scope.cdformdata.disbursementMinDate : $filter('date')(add_business_days_disbursement($scope.cdformdata.closingInformationDetail.closingDate, 1), 'yyyy-MM-dd');
	        $scope.cdformdata.closingInformationDetail.disbursementDate = $filter('date')(add_business_days_disbursement($scope.cdformdata.closingInformationDetail.closingDate, 1), 'yyyy-MM-dd');
        }
        
        //Confirm Receipt Execution Date
        if($scope.cdformdata.closingInformationDetail.closingDate && $scope.cdformdata.closingInformationDetail.closingDate!=undefined){
	        $scope.cdformdata.closingDisclosureDocDetails.executionDate = $scope.cdformdata.closingDisclosureDocDetails.executionDate ? $scope.cdformdata.closingDisclosureDocDetails.executionDate : $scope.cdformdata.closingInformationDetail.closingDate;
        }
        
		if(!$scope.cdformdata.miPremium || $scope.cdformdata.miPremium.length==0) 
			$scope.cdformdata['miPremium'] = angular.copy(staticData.cdformdata.miPremium);

		for(var i=$scope.cdformdata.miPremium.length; i<3; i++){
			$scope.cdformdata.miPremium.push(angular.copy(miPremium));
		}

		$scope.cdformdata.miPremium[0].miPremiumPeriodType='First';
        $scope.cdformdata.miPremium[1].miPremiumPeriodType='Second';
        $scope.cdformdata.miPremium[2].miPremiumPeriodType='Third';

		//Calculating Cash To Closes Default Values
        $scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount= $scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount ? $scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount : +0;
		$scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemEstimatedAmount = $scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemEstimatedAmount ?$scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemEstimatedAmount : +0;
        $scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemEstimatedAmount =  $scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemEstimatedAmount ? $scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemEstimatedAmount : +0;
		$scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemEstimatedAmount=$scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemEstimatedAmount ? $scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemEstimatedAmount : +0;
		$scope.cdformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemEstimatedAmount=$scope.cdformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemEstimatedAmount ? $scope.cdformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemEstimatedAmount : +0;
		$scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemEstimatedAmount=$scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemEstimatedAmount ? $scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemEstimatedAmount : +0;
		$scope.cdformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemEstimatedAmount=$scope.cdformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemEstimatedAmount ? $scope.cdformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemEstimatedAmount : +0;
		$scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemEstimatedAmount=$scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemEstimatedAmount ? $scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemEstimatedAmount : +0;
		$scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemEstimatedAmount=$scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemEstimatedAmount ? $scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemEstimatedAmount : +0;
		$scope.cdformdata.cashToCloses.sellerCredits.integratedDisclosureCashToCloseItemEstimatedAmount=$scope.cdformdata.cashToCloses.sellerCredits.integratedDisclosureCashToCloseItemEstimatedAmount ? $scope.cdformdata.cashToCloses.sellerCredits.integratedDisclosureCashToCloseItemEstimatedAmount : +0;
		
		$scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemFinalAmount=$scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemFinalAmount ? $scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemFinalAmount : +0;
		$scope.cdformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemFinalAmount=$scope.cdformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemFinalAmount ? $scope.cdformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemFinalAmount : +0;
		$scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemFinalAmount=$scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemFinalAmount ? $scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemFinalAmount : +0;
		$scope.cdformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemFinalAmount=$scope.cdformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemFinalAmount ? $scope.cdformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemFinalAmount : +0;
		$scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemFinalAmount=$scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemFinalAmount ? $scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemFinalAmount : +0;
		$scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemFinalAmount=$scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemFinalAmount ? $scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemFinalAmount : +0;
		


		
        //Adding Form and Document types for AML & PDF Generation
        $scope.cdformdata.closingDisclosureDocDetails.documentType='ClosingDisclosure';

		if($scope.loanBasicInfo.loanFormType == 'standard'){
        	$scope.cdformdata.closingDisclosureDocDetails.formType = 'ModelForm';
        }else if($scope.loanBasicInfo.loanFormType == 'alternate'){
        	$scope.cdformdata.closingDisclosureDocDetails.formType = 'AlternateForm';
        }

        if($scope.loanBasicInfo.loanPurposeType=='purchase'){
        	if($scope.cdformdata.transactionInformation.sellerDetails.length==0){
        		$scope.cdformdata.transactionInformation.sellerDetails.push(angular.copy(seller));
        	}
        }

        
        //Closing Costs Default Values

        if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.length==0){
			$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.push(angular.copy(originationCharges));
		}
		
		if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.length==0){
			$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.push(angular.copy(sbDidNotShopFors));
		}

		if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.length==0){
			$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.push(angular.copy(sbDidShopFors));
		}

		if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.length==0){
			$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.push(angular.copy(prepaidsList));
		}

		if($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.length==0){
			$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.push(angular.copy(escrowItemsList));
		}

		if($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.length==0){
			$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.push(angular.copy(otherCostsList));
		}


        $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing = parseFloat($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing ? $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing : +0);
        $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing = parseFloat($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing ? $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing : +0);
        $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing = parseFloat($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing ? $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing : +0);
        $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spB4Closing = parseFloat($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spB4Closing ? $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spB4Closing : +0);
        $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.paidByOthers = parseFloat($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.paidByOthers ? $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.paidByOthers : +0);
	    
	    $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpAtClosing ? $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpAtClosing : +0); 
        $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpB4Closing ? $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpB4Closing : +0);
        $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spAtClosing ? $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spAtClosing : +0);
        $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spB4Closing ? $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spB4Closing : +0);
        $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers ? $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers : +0);
        
        $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing = parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing ? $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing : +0); 
        $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpB4Closing = parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpB4Closing ? $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpB4Closing : +0);
        $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing = parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing ? $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing : +0);
        $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spB4Closing = parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spB4Closing ? $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spB4Closing : +0);
        $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers = parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers ? $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers : +0);
        
	    if(!$scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount || $scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount==null){
        	$scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount ? $scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount : +0);
        }else{
        	$scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount ? $scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount : +0);
        }

        if(!$scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount || $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount==null){
        	$scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount = parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount ? $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount : +0); 
        }else{
        	$scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount = parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount ? $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount : +0); 
        }
		
		if(!$scope.cdformdata.closingCostsTotal.totalClosingCosts || $scope.cdformdata.closingCostsTotal.totalClosingCosts==null){
           $scope.cdformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.cdformdata.closingCostsTotal.totalClosingCosts ? $scope.cdformdata.closingCostsTotal.totalClosingCosts : +0);
		}else{
           $scope.cdformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.cdformdata.closingCostsTotal.totalClosingCosts ? $scope.cdformdata.closingCostsTotal.totalClosingCosts : +0);
		}

        $scope.cdformdata.closingCostsTotal.lenderCredits = parseFloat($scope.cdformdata.closingCostsTotal.lenderCredits ? $scope.cdformdata.closingCostsTotal.lenderCredits : +0);


		if($scope.cdformdata.loanInformation.loanIdentifiers && $scope.cdformdata.loanInformation.loanIdentifiers.length>0){
			$scope.MERS_MIN_ID = '';
			for(var i=0; i<$scope.cdformdata.loanInformation.loanIdentifiers.length; i++) {
				if($scope.cdformdata.loanInformation.loanIdentifiers[i].loanIdentifierType == 'MERS_MIN') {
					$scope.MERS_MIN_ID = $scope.cdformdata.loanInformation.loanIdentifiers[i].loanIdentifier;
				}
			}
		}
		$scope.cdformdata['micIdentifier'] = "";
		if($scope.cdformdata.miDataDetail.miCertificateIdentifier){
			$scope.cdformdata.micIdentifier = $scope.cdformdata.miDataDetail.miCertificateIdentifier;
		} else {
			if($scope.cdformdata.termsOfLoan.mortgageType != 'Conventional') {
				for(var i=0; i<$scope.cdformdata.loanInformation.loanIdentifiers.length; i++) {
					if($scope.cdformdata.loanInformation.loanIdentifiers[i].loanIdentifierType == 'AgencyCase') {
						$scope.cdformdata.micIdentifier = $scope.cdformdata.loanInformation.loanIdentifiers[i].loanIdentifier;
					}
				}
			}
		}

		for (i = $scope.cdformdata.loanInformation.automatedUnderwritings.length; i < 3; i++) { 
		    $scope.cdformdata.loanInformation.automatedUnderwritings.push(angular.copy(ausTypeIdentifier));
		}
		if($scope.cdformdata.loanDetail.interestRateIncreaseIndicator && $scope.cdformdata.interestRateAdjustment.ceilingRatePercentEarliestEffectiveMonthsCount) {
			$scope.cdformdata.interestRateAdjustment['ceilingRatePercentEarliestEffectiveYearCount'] = Math.ceil((parseInt($scope.cdformdata.interestRateAdjustment.ceilingRatePercentEarliestEffectiveMonthsCount)+1)/12);
		} else {
			$scope.cdformdata.interestRateAdjustment['ceilingRatePercentEarliestEffectiveYearCount'] = '';
		}
		if($scope.cdformdata.loanDetail.paymentIncreaseIndicator && $scope.cdformdata.principalAndInterestPaymentAdjustment.principalAndInterestPaymentMaximumAmountEarliestEffectiveMonthsCount) {
			$scope.cdformdata.principalAndInterestPaymentAdjustment['principalAndInterestPaymentMaximumAmountEarliestEffectiveYearCount'] = Math.ceil(parseInt($scope.cdformdata.principalAndInterestPaymentAdjustment.principalAndInterestPaymentMaximumAmountEarliestEffectiveMonthsCount)/12);
		} else {
			$scope.cdformdata.principalAndInterestPaymentAdjustment['principalAndInterestPaymentMaximumAmountEarliestEffectiveYearCount'] = '';
		}
		if($scope.cdformdata.loanDetail.balloonIndicator) {
			$scope.cdformdata['balloonPeriodType'] = $scope.cdformdata.maturityRule.loanMaturityPeriodType;
			$scope.cdformdata['balloonPeriodCount'] = $scope.cdformdata.maturityRule.loanMaturityPeriodCount;
 		} else {
 			$scope.cdformdata['balloonPeriodType'] = '';
 			$scope.cdformdata['balloonPeriodCount'] = '';
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

		$scope.cdformdata.loanTerms.prepaymentPenalty['prepaymentPenaltyExpirationInYears'] = '';
		if($scope.cdformdata.loanTerms.prepaymentPenalty.prepaymentPenaltyExpirationMonthsCount)
			$scope.cdformdata.loanTerms.prepaymentPenalty.prepaymentPenaltyExpirationInYears = Math.round($scope.cdformdata.loanTerms.prepaymentPenalty.prepaymentPenaltyExpirationMonthsCount/12);
		$scope.cdformdata.projectedPayments['miPaymentAmount'] = '';
		if($scope.cdformdata.projectedPayments.mortgageInsurance.length>0) {
			$scope.cdformdata.projectedPayments.miPaymentAmount = $scope.cdformdata.projectedPayments.mortgageInsurance[0].projectedPaymentMIPaymentAmount;
		}

		$scope.cdformdata.etiaSection['etiaTypes']=[];
		if($scope.cdformdata.etiaSection.etiaValues!=undefined) {
			$scope.cdformdata.etiaSection.etiaValues.splice(0, 0, angular.copy(ETIAComponentType));
			$scope.cdformdata.etiaSection.etiaValues[0].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType = 'PropertyTaxes';
            //$scope.cdformdata.etiaSection.etiaValues[0].projectedPaymentEscrowedType='NotEscrowed';

			$scope.cdformdata.etiaSection.etiaValues.splice(1, 0, angular.copy(ETIAComponentType));
			$scope.cdformdata.etiaSection.etiaValues[1].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType = 'HomeownersInsurance';
            //$scope.cdformdata.etiaSection.etiaValues[1].projectedPaymentEscrowedType='NotEscrowed';
			
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

		if($scope.cdformdata.etiaSection.etiaValues.length>3){
			for(i=0; i<$scope.cdformdata.etiaSection.etiaValues.length; i++){
                if($scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType == ''){
                	$scope.cdformdata.etiaSection.etiaValues.splice(i, 1);
                }
			}
		}

        $scope.insuranceCheck = {"insuranceTaxCheck" :false};
	    for(i=0;i<$scope.cdformdata.etiaSection.etiaValues.length;i++){
	    	if($scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType=='PropertyTaxes' 
	    		|| $scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType=='HomeownersInsurance'){
	    		$scope.cdformdata.etiaSection.etiaValues[i]['insuranceTaxCheck'] = false;
	    	}
	    }

	    for(i=0; i<$scope.cdformdata.etiaSection.etiaValues.length; i++){
	    	if($scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType=='PropertyTaxes' 
	    		|| $scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType=='HomeownersInsurance'){
	    		if($scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType=='PropertyTaxes'){
	    			if($scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEscrowedType=='Escrowed'){
		    		    $scope.cdformdata.etiaSection.etiaValues[i].insuranceTaxCheck= true;
		    		    $scope.cdformdata.etiaSection.propertyTaxesCheck = true;
		    		}else if($scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEscrowedType=='NotEscrowed'){
		    		    $scope.cdformdata.etiaSection.etiaValues[i].insuranceTaxCheck= false;
		    		    $scope.cdformdata.etiaSection.propertyTaxesCheck = true;
		    		}
	    		}else if($scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType=='HomeownersInsurance'){
		    		if($scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEscrowedType=='Escrowed'){
		    		    $scope.cdformdata.etiaSection.etiaValues[i].insuranceTaxCheck= true;
		    		    $scope.cdformdata.etiaSection.HomeownersInsuranceCheck = true;
		    		}else if($scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEscrowedType=='NotEscrowed'){
		    		    $scope.cdformdata.etiaSection.etiaValues[i].insuranceTaxCheck= false;
		    		    $scope.cdformdata.etiaSection.HomeownersInsuranceCheck = true;
		    		}
	    	    }
	    	}
	    }

	   
		if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges!=undefined) {
   			$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.splice(0, 0, angular.copy(originationCharges));
			$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[0].feeType = 'LoanDiscountPoints';
			$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[0].displayLabel = 'Loan Amount (Points)';
			for(j=0;j<$scope.sectionAfeeTypes.length;j++){
				if($scope.sectionAfeeTypes[j].value=='LoanDiscountPoints'){
					$scope.sectionAfeeTypes[j].disabled = true;
				}
			}
       	}

        $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges['AfeeTypes']=[];
        $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors['BfeeTypes']=[];
		$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors['CfeeTypes']=[];
		$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList['EfeeTypes']=[];
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList['FprepaidTypes']=[];
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList['GescrowTypes']=[];
		$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList['HfeeTypes']=[];

		//RegulationZTotalLoanAmount, RegulationZTotalAffiliateFeesAmount, RegulationZTotalPointsAndFeesAmount

		$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges['RegulationZTotalAffiliateFeesAmount']=0;
		$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges['RegulationZTotalLoanAmount']=0;
		$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges['RegulationZTotalPointsAndFeesAmount']=0;
		$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors['RegulationZTotalAffiliateFeesAmount']=0;
		$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors['RegulationZTotalLoanAmount']=0;
		$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors['RegulationZTotalPointsAndFeesAmount']=0;
		$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors['RegulationZTotalAffiliateFeesAmount']=0;
		$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors['RegulationZTotalLoanAmount']=0;
		$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors['RegulationZTotalPointsAndFeesAmount']=0;
		$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList['RegulationZTotalAffiliateFeesAmount']=0;
		$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList['RegulationZTotalLoanAmount']=0;
		$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList['RegulationZTotalPointsAndFeesAmount']=0;
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList['RegulationZTotalAffiliateFeesAmount']=0;
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList['RegulationZTotalLoanAmount']=0;
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList['RegulationZTotalPointsAndFeesAmount']=0;
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList['RegulationZTotalAffiliateFeesAmount']=0;
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList['RegulationZTotalLoanAmount']=0;
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList['RegulationZTotalPointsAndFeesAmount']=0;
		$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList['RegulationZTotalAffiliateFeesAmount']=0;
		$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList['RegulationZTotalLoanAmount']=0;
		$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList['RegulationZTotalPointsAndFeesAmount']=0;
        
        
		if(!$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount){
			$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount = parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount ? $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount : +0);
		}
		if(!$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount){
			$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount = parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount ? $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount : +0);
		}
		if(!$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount){
			$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount = parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount ? $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount : +0);
		}
		if(!$scope.cdformdata.closingCostDetailsOtherCosts.otherTotalAmount){
			$scope.cdformdata.closingCostDetailsOtherCosts.otherTotalAmount = parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherTotalAmount ? $scope.cdformdata.closingCostDetailsOtherCosts.otherTotalAmount : +0);
		}

       	for(i=0; i<$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.length; i++){
			if (i!=0 && $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].feeType == 'LoanDiscountPoints') {
				$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[0] = $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i];
				$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.splice(i, 1);
				$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[0].displayLabel = 'Loan Amount (Points)';
				i--;
	       	}
	       	if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].feePaidToType==''){
	       		$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].feePaidToType='Lender';
	       	}
	       	if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.AfeeTypes.indexOf($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].feeType)==-1)
				$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.AfeeTypes.push($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].feeType);
		};

		for(i=0; i<$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.length; i++){
			if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.BfeeTypes.indexOf($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].feeType)==-1)
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.BfeeTypes.push($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].feeType);
		    
		    if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].feePaidToType==''){
	       		$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].feePaidToType='ThirdPartyProvider';
	       	}
		};

		for(i=0; i<$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.length; i++){
			if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.CfeeTypes.indexOf($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].feeType)==-1)
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.CfeeTypes.push($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].feeType);
		    
		    if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].feePaidToType==''){
	       		$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].feePaidToType='ThirdPartyProvider';
	       	}
   
		};
		$scope.recordingFeetotalObj = {
	        "bpAtClosing": "",
	        "bpB4Closing": "",
	        "spAtClosing": "",
	        "spB4Closing": "",
	        "paidByOthers": "",
	        "lenderStatus": false,
	        "displayLabel": "",
	        "feePaidToFullName": "",
	        "feeActualTotalAmount": "",
	        "feePaidToType": "ThirdPartyProvider",
	        "feePaidToTypeOtherDescription": "",
	        "feePercentBasisType": "",
	        "feeTotalPercent": "",
	        "feeType": "RecordingFeeTotal",
	        "feeTypeOtherDescription": "",
	        "integratedDisclosureSectionType": "TaxesAndOtherGovernmentFees",
	        "optionalCostIndicator": null,
	        "regulationZPointsAndFeesIndicator": null,
	        "paymentIncludedInAPRIndicator": false,
	        "recordingFeeForDeed":"",
	        "recordingFeeForMortgage":""
		};
		for(i=0; i<$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.length; i++){
			if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType=='') {
				$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.splice(i,1);
				i--;
			} else if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType == 'RecordingFeeForDeed') {
				$scope.recordingFeetotalObj.recordingFeeForDeed = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeActualTotalAmount;
				$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.splice(i,1);
				i--;
			} else if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType == 'RecordingFeeForMortgage') {
				$scope.recordingFeetotalObj.recordingFeeForMortgage = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeActualTotalAmount;
				$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.splice(i,1);
				i--;
			} else if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType == 'RecordingFeeTotal') {
				$scope.recordingFeetotalObj.bpAtClosing = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpAtClosing;
				$scope.recordingFeetotalObj.bpB4Closing = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpB4Closing;
				$scope.recordingFeetotalObj.spAtClosing = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].spAtClosing;
				$scope.recordingFeetotalObj.spB4Closing = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].spB4Closing;
				$scope.recordingFeetotalObj.lenderStatus = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].lenderStatus;
				$scope.recordingFeetotalObj.gseDisplayLabel = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].gseDisplayLabel;
				$scope.recordingFeetotalObj.feePaidToFullName = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feePaidToFullName;
				$scope.recordingFeetotalObj.feePaidToType = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feePaidToType;
				$scope.recordingFeetotalObj.feePaidToTypeOtherDescription = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feePaidToTypeOtherDescription;
				$scope.recordingFeetotalObj.feeTotalPercent = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeTotalPercent;
				$scope.recordingFeetotalObj.optionalCostIndicator = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].optionalCostIndicator;
				$scope.recordingFeetotalObj.regulationZPointsAndFeesIndicator = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].regulationZPointsAndFeesIndicator;
				$scope.recordingFeetotalObj.paymentIncludedInAPRIndicator = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].paymentIncludedInAPRIndicator;
				$scope.recordingFeetotalObj.integratedDisclosureSectionType = 'TaxesAndOtherGovernmentFees';
				$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.splice(i,1);
				i--;
				if($scope.recordingFeetotalObj.feePaidToType==''){
					$scope.recordingFeetotalObj.feePaidToType='ThirdPartyProvider';
				}
			} else if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType = 'TransferTaxTotal'){
                if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feePaidToType==''){
                	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feePaidToType = 'ThirdPartyProvider';
                }
			}else if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.EfeeTypes.indexOf($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType)==-1) {
				$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.EfeeTypes.push($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType);
			}
		}
		if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.EfeeTypes.length==0) {
			$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.splice(0, 0, angular.copy(tOGovtFees));
			$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].feeType = 'TransferTaxTotal';
			$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].displayLabel = 'Transfer Taxes';
			$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].feePaidToType = 'ThirdPartyProvider';
            for(i=0;i<$scope.sectionEfeeTypes.length;i++){
            	if($scope.sectionEfeeTypes[i].value=='TransferTaxTotal'){
                   //$scope.sectionEfeeTypes[i].disabled=true;
            	}
            }
            if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.EfeeTypes.indexOf('TransferTaxTotal')==-1) {
				$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.EfeeTypes.push('TransferTaxTotal');
			}
		}
        for(i=0; i<$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.length; i++){
			if($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.HfeeTypes.indexOf($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].feeType)==-1)
				$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.HfeeTypes.push($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].feeType);
		};
		if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList!=undefined) {
			$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.splice(0, 0, angular.copy(prepaidsList));
			$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[0].prepaidItemType = 'PrepaidInterest';
			$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[0].displayLabelText = 'Prepaid Interest';
			$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[0].feePaidToType = 'Lender';
			$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[0].paymentIncludedInAPRIndicator = true;
			
			$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.splice(1, 0, angular.copy(prepaidsList));
			$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[1].prepaidItemType = 'HomeownersInsurancePremium';
			$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[1].displayLabelText = 'Homeowners Insurance Premium';

       		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.splice(2, 0, angular.copy(prepaidsList));
			$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[2].prepaidItemType = 'MortgageInsurancePremium';
			$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[2].displayLabelText = 'Mortgage Insurance Premium';

       		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.splice(3, 0, angular.copy(prepaidsList));
			$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[3].prepaidItemType = 'CountyPropertyTax';
			$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[3].displayLabelText = 'Property Taxes';
			for(i=0;i<$scope.prepaidItems.length;i++){
            	if($scope.prepaidItems[i].value=='CountyPropertyTax'){
                   //$scope.prepaidItems[i].disabled=true;
            	}
            }
		}

		for(i=0; i<$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.length; i++){
			if (i!=0 && $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType == 'PrepaidInterest') {
				$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[0] = $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i];
				$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.splice(i, 1);
				i--;
				if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[0].feePaidToType==''){
					$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[0].feePaidToType='Lender';
				}
	       	} else if (i!=1 && $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType == 'HomeownersInsurancePremium') {
				$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[1] = $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i];
				$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.splice(i, 1);
				i--;
				if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[1].feePaidToType==''){
					$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[1].feePaidToType='ThirdPartyProvider';
				}
	       	} else if (i!=2 && $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType == 'MortgageInsurancePremium') {
				$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[2] = $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i];
				$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.splice(i, 1);
				i--;
				if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[2].feePaidToType==''){
					$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[2].feePaidToType='ThirdPartyProvider';
				}
	       	} else if (i!=3 && $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType == 'CountyPropertyTax') {
				$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[3] = $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i];
				$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.splice(i, 1);
				i--;
				if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[3].feePaidToType==''){
					$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[3].feePaidToType='ThirdPartyProvider';
				}
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
				if($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[0].feePaidToType==''){
					$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[0].feePaidToType='ThirdPartyProvider';
				}
	       	} else if (i!=1 && $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType == 'MortgageInsurance') {
				$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[1] = $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i];
				$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.splice(i, 1);
				i--;
				if($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[1].feePaidToType==''){
					$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[1].feePaidToType='ThirdPartyProvider';
				}
	       	} else if (i!=2 && $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType == 'CountyPropertyTax') {
				$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[2] = $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i];
				$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.splice(i, 1);
				i--;
				if($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[2].feePaidToType==''){
					$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[2].feePaidToType='ThirdPartyProvider';
				}
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
		if($scope.loanBasicInfo.loanFormType == 'standard') {

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
				"deposit" : '',
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
				"excessDeposit" : '',
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
            
            if($scope.loanBasicInfo.loanFormType == 'standard'){
				if($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing && $scope.cdformdata.closingCostsTotal.lenderCredits) {
		    		$scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing = parseFloat($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing) + parseFloat($scope.cdformdata.closingCostsTotal.lenderCredits);
		    	}else if($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing) {
		    		$scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing = parseFloat($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing);
		    	}
		    	else{
		    		$scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing = 0;
		    	}
			}

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
						$scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[0] = angular.copy($scope.cdformdata.prorationsList[i]);
						$scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[0].displayLabel = 'City/Town Taxes';
						$scope.cdformdata.prorationsList.splice(i,1);
						i--;
					} else if($scope.cdformdata.prorationsList[i].prorationItemType == 'BoroughPropertyTax' || $scope.cdformdata.prorationsList[i].prorationItemType == 'CountyPropertyTax') {
						$scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[1] = angular.copy($scope.cdformdata.prorationsList[i]);
						$scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[1].displayLabel = 'County Taxes';
						$scope.cdformdata.prorationsList.splice(i,1);
						i--;
					} else if($scope.cdformdata.prorationsList[i].prorationItemType == 'CondominiumAssociationSpecialAssessment' || $scope.cdformdata.prorationsList[i].prorationItemType == 'CooperativeAssociationSpecialAssessment' || $scope.cdformdata.prorationsList[i].prorationItemType == 'HomeownersAssociationSpecialAssessment') {
						$scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[2] = angular.copy($scope.cdformdata.prorationsList[i]);
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
				var sellerAdjustment = angular.copy($scope.summariesOfTransaction_KSection.adjustments[0]);
				sellerAdjustment['isFromBorrower'] = true;
				sellerAdjustment.integratedDisclosureSectionType = "DueToSellerAtClosing";
				$scope.summariesOfTransaction_MSection.adjustments.splice(0, 0, sellerAdjustment);
			}
			if($scope.summariesOfTransaction_KSection.adjustments[1].closingAdjustmentItemType) {
				var sellerAdjustment = angular.copy($scope.summariesOfTransaction_KSection.adjustments[1]);
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
				var adjustmentPaidBySellerInAdvance = angular.copy($scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[i]);
				adjustmentPaidBySellerInAdvance.integratedDisclosureSectionType = 'DueToSellerAtClosing';
				adjustmentPaidBySellerInAdvance.integratedDisclosureSubsectionType = 'AdjustmentsForItemsPaidBySellerInAdvance';
				$scope.summariesOfTransaction_MSection.adjustmentsPaidBySeller.push(adjustmentPaidBySellerInAdvance);
			}

			//Summaries of Transaction : L.Paid Already by or on Behalf of Borrower at Closing --- Starts from here.
			if($scope.cdformdata.closingCostFundList==undefined || $scope.cdformdata.closingCostFundList.length==0) {
				$scope.cdformdata.closingCostFundList = angular.copy(staticData.cdformdata.closingCostFundList);
			}
			for(i=0; i<$scope.cdformdata.closingCostFundList.length; i++) {
				if($scope.cdformdata.closingCostFundList[i].fundsType == 'DepositOnSalesContract' 
					&& $scope.cdformdata.closingCostFundList[i].integratedDisclosureSectionType == 'PaidAlreadyByOrOnBehalfOfBorrowerAtClosing') {
					$scope.summariesOfTransaction_LSection.deposit = $scope.cdformdata.closingCostFundList[i].closingCostFundAmount;
					$scope.cdformdata.closingCostFundList.splice(i,1);
					i--;
				} else if($scope.cdformdata.closingCostFundList[i].fundsType == 'ExcessDeposit' 
					&& $scope.cdformdata.closingCostFundList[i].integratedDisclosureSectionType == 'DueFromSellerAtClosing') {
					$scope.summariesOfTransaction_NSection.excessDeposit = $scope.cdformdata.closingCostFundList[i].closingCostFundAmount;
					$scope.cdformdata.closingCostFundList.splice(i,1);
					i--;
	 			}
			}
			if($scope.cdformdata.termsOfLoan.noteAmount)
				$scope.summariesOfTransaction_LSection.loanAmount = $scope.cdformdata.termsOfLoan.noteAmount;
			if($scope.cdformdata.termsOfLoan.assumedLoanAmount)
				$scope.summariesOfTransaction_LSection.assumedLoanAmount = $scope.cdformdata.termsOfLoan.assumedLoanAmount;

			$scope.cdformdata.disclosureOnly = true;
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
				} else if($scope.summariesOfTransaction_LSection.adjustments[i].integratedDisclosureSubsectionType == 'Adjustments') {
					if($scope.summariesOfTransaction_LSection.adjustments[i].paidByEntityFullName) {
						$scope.summariesOfTransaction_LSection.adjustments[i]['fullName'] = $scope.summariesOfTransaction_LSection.adjustments[i].paidByEntityFullName;
						$scope.summariesOfTransaction_LSection.adjustments[i]['payeeType'] = 'Organization';
					} else if($scope.summariesOfTransaction_LSection.adjustments[i].paidByIndividualFullName) {
						$scope.summariesOfTransaction_LSection.adjustments[i]['fullName'] = $scope.summariesOfTransaction_LSection.adjustments[i].paidByIndividualFullName;
						$scope.summariesOfTransaction_LSection.adjustments[i]['payeeType'] = 'Individual';
	 				}
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
						$scope.cdformdata.disclosureOnly = false;
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
				var unpaidByAdjustment = angular.copy(prorationObj);
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
				$scope.summariesOfTransaction_NSection.adjustments.splice(0, 0, angular.copy($scope.summariesOfTransaction_LSection.adjustments[0]));
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
	    $scope.cdformdata.payment.paymentRule['partialPaymentAllowedIndicatorAPP'] = false;
	    $scope.cdformdata.payment.paymentRule['partialPaymentAllowedIndicatorHUCA'] = false;
	    $scope.cdformdata.payment.paymentRule['partialPaymentAllowedIndicatorNotAccept'] = true;
        if($scope.cdformdata.payment.paymentRule.partialPaymentAllowedIndicator){
			if($scope.cdformdata.payment.partialPayments.partialPaymentModels[0].partialPaymentApplicationMethodType=='ApplyPartialPayment'){
				$scope.cdformdata.payment.paymentRule.partialPaymentAllowedIndicatorAPP = true;
				$scope.cdformdata.payment.paymentRule.partialPaymentAllowedIndicatorHUCA = false;
				$scope.cdformdata.payment.paymentRule.partialPaymentAllowedIndicatorNotAccept = false;
			}else if($scope.cdformdata.payment.partialPayments.partialPaymentModels[0].partialPaymentApplicationMethodType=='HoldUntilCompleteAmount'){
				$scope.cdformdata.payment.paymentRule.partialPaymentAllowedIndicatorHUCA = true;
				$scope.cdformdata.payment.paymentRule.partialPaymentAllowedIndicatorAPP = false;
				$scope.cdformdata.payment.paymentRule.partialPaymentAllowedIndicatorNotAccept = false;
			}
        }else{
           $scope.cdformdata.payment.paymentRule.partialPaymentAllowedIndicatorNotAccept = true;
        }

        //Interest Only Term Months Count
        $scope.cdformdata['interestOnlyValue'] = 0;
		if($scope.cdformdata.interestOnly.interestOnlyTermMonthsCount){
        	$scope.cdformdata.interestOnlyValue = $scope.cdformdata.interestOnly.interestOnlyTermMonthsCount%12 == 0 ? ($scope.cdformdata.interestOnly.interestOnlyTermMonthsCount/12)+1 : Math.ceil($scope.cdformdata.interestOnly.interestOnlyTermMonthsCount/12);
        }

		setTimeout(function(){$("#spinner").hide();}, 3000);
		
	}

	initializeCDformData();

	$scope.checkPropertyRadio = function() {
		$scope.cdformdata.closingInformation.property.unparsedLegalDescription = "";
		$scope.cdformdata.closingInformation.property.addressLineText = '';
	}
	
	$scope.changePropertyPrice = function() {
		if($scope.cdformdata.salesContractDetail.personalPropertyIndicator == true) {
			$scope.cdformdata.salesContractDetail.saleContractAmount = "";
		} else if($scope.cdformdata.salesContractDetail.personalPropertyIndicator == false) {
			$scope.cdformdata.salesContractDetail.realPropertyAmount = "";
		} else {
			$scope.cdformdata.salesContractDetail.saleContractAmount = "";
			$scope.cdformdata.salesContractDetail.realPropertyAmount = "";
		}
	}

	$scope.changePropertyValueAmount = function() {
		if($scope.cdformdata.closingInformation.propertyValuationDetail.propertyValue=='Appraised') {
			$scope.cdformdata.closingInformation.propertyValuationDetail.propertyEstimatedValueAmount = "";
		} else {
			$scope.cdformdata.closingInformation.propertyValuationDetail.propertyValuationAmount = "";
		}
	}
    
    $scope.borrowerCheck = function(index){
    	if($scope.cdformdata.transactionInformation.borrowerDetails[index].type == 'O'){
    		$scope.cdformdata.transactionInformation.borrowerDetails[index].partyRoleType ='Borrower';
    		$scope.cdformdata.transactionInformation.borrowerDetails[index].nameModel.firstName ='';
    		$scope.cdformdata.transactionInformation.borrowerDetails[index].nameModel.middleName ='';
    		$scope.cdformdata.transactionInformation.borrowerDetails[index].nameModel.lastName ='';
    		$scope.cdformdata.transactionInformation.borrowerDetails[index].nameModel.suffixName ='';
    	}else{
    		$scope.cdformdata.transactionInformation.borrowerDetails[index].nameModel.fullName ='';
    	}
    }

    $scope.sellerCheck = function(index){
    	if($scope.cdformdata.transactionInformation.sellerDetails[index].type == 'O'){
    		$scope.cdformdata.transactionInformation.sellerDetails[index].nameModel.firstName ='';
    		$scope.cdformdata.transactionInformation.sellerDetails[index].nameModel.middleName ='';
    		$scope.cdformdata.transactionInformation.sellerDetails[index].nameModel.lastName ='';
    		$scope.cdformdata.transactionInformation.sellerDetails[index].nameModel.suffixName ='';
    	}else{
    		$scope.cdformdata.transactionInformation.sellerDetails[index].nameModel.fullName ='';
    	}
    }

    $scope.loanChange = function(){
    	$scope.cdformdata.termsOfLoan.mortgageTypeOtherDescription = '';
    }

    $scope.ausChange = function(index){
    	$scope.cdformdata.loanInformation.automatedUnderwritings[index].automatedUnderwritingSystemTypeOtherDescription = '';
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

    $scope.backToTop = function(){
    	//console.log("i am here");
    	$('#PDFviewContainer').scrollTop(0);
    }
    
	$scope.addBorrower = function(){
    	$scope.cdformdata.transactionInformation.borrowerDetails.push(angular.copy(borrower));
    }

    $scope.removeBorrower = function(index){
    	$scope.cdformdata.transactionInformation.borrowerDetails.splice(index,1);
    }
    $scope.backtoTopborrower = function(){
    	$location.hash();
    	$anchorScroll('transactioninfo');
    }
    $scope.backtoTopSeller = function(){
    	$location.hash();
    	$anchorScroll('transactioninfo');
    }
    $scope.backtoTopLender = function(){
    	$location.hash();
    	$anchorScroll('transactioninfo');
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

    $scope.updateProjectedPaymentsMI = function () {
    	if(!$scope.cdformdata.loanDetail.miRequiredIndicator) {
    		for(var i=0; i<$scope.cdformdata.projectedPayments.mortgageInsurance.length;i++) {
    			$scope.cdformdata.projectedPayments.mortgageInsurance[i].projectedPaymentMIPaymentAmount = '0';
    		}
    	}
    }

	$scope.addETIAComponent = function(){
		$scope.cdformdata.etiaSection.etiaValues.push(angular.copy(ETIAComponentType));
		$scope.cdformdata.etiaSection.total = $scope.cdformdata.etiaSection.etiaValues.length;
    }

    $scope.removeETIAComponent = function(componentType,index){
		for(i=0; i<$scope.ETIAComponentTypes.length; i++){
			if($scope.ETIAComponentTypes[i].value == componentType) {
				$scope.ETIAComponentTypes[i].disabled = false;
			}
		}
		$scope.cdformdata.etiaSection.etiaValues.splice(index,1);
    }

    $scope.clearETIAComponent = function(componentType,index){
    	for(i=0; i<$scope.ETIAComponentTypes.length; i++){
			if($scope.ETIAComponentTypes[i].value == componentType) {
				$scope.ETIAComponentTypes[i].disabled = false;
			}
		}
		$scope.cdformdata.etiaSection.etiaValues[index].projectedPaymentEscrowedType='';
		$scope.cdformdata.etiaSection.etiaValues[index].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType='';
		$scope.cdformdata.etiaSection.etiaValues[index].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentTypeOtherDescription='';
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
    	$scope.payoffsAndPaymentsList[index].prepaymentPenaltyAmount='';
    }
    $scope.deletePayoff = function(index){
    	$scope.payoffsAndPaymentsList.splice(index,1);
    }
    $scope.amortizationChange = function(){ 
    	if($scope.cdformdata.loanInformation.amortizationType == 'Fixed') {
    		$scope.cdformdata.loanDetail.interestRateIncreaseIndicator = false;
    		if(!$scope.cdformdata.loanDetail.interestOnlyIndicator){
    			$scope.cdformdata.loanDetail.paymentIncreaseIndicator = false;
    		}
    		$scope.cdformdata.loanInformation.fixedPeriodMonths = '';
    		$scope.cdformdata.interestRateAdjustment.firstRateChangeMonthsCount = '';
    		$scope.cdformdata.interestRateAdjustment.firstPerChangeRateAdjustmentFrequencyMonthsCount = '';
    		$scope.cdformdata.interestRateAdjustment.subsequentPerChangeRateAdjustmentFrequencyMonthsCount = '';
    		$scope.cdformdata.interestRateAdjustment.ceilingRatePercent = '';
    		$scope.cdformdata.interestRateAdjustment.firstPerChangeMaximumIncreaseRatePercent = '';
    		$scope.cdformdata.interestRateAdjustment.subsequentPerChangeMaximumIncreaseRatePercent = '';
    		$scope.cdformdata.interestRateAdjustment.floorRatePercent = '';
    		$scope.cdformdata.principalAndInterestPaymentAdjustment.firstPrincipalAndInterestPaymentChangeMonthsCount = '';
    		$scope.cdformdata.principalAndInterestMonthsCount='';
    		$scope.cdformdata.principalAndInterestPaymentAdjustment.firstPerChangePrincipalAndInterestPaymentAdjustmentFrequencyMonthsCount='';
    		$scope.cdformdata.principalAndInterestPaymentAdjustment.subsequentPerChangePrincipalAndInterestPaymentAdjustmentFrequencyMonthsCount='';

    	} else {
    		if($scope.cdformdata.loanInformation.amortizationType == 'Step') {
    			$scope.stepPaymentIndicatorValue = true;
    			$scope.stepChange($scope.stepPaymentIndicatorValue);
    		}
    		if($scope.cdformdata.loanInformation.amortizationType == '') {
	    		$scope.cdformdata.loanDetail.interestRateIncreaseIndicator = false;
	    		$scope.cdformdata.loanDetail.paymentIncreaseIndicator = false;
    	    }else{
    	    	$scope.cdformdata.loanDetail.interestRateIncreaseIndicator = true;
    		    $scope.cdformdata.loanDetail.paymentIncreaseIndicator = true;
    	    }
    	}
    	projectedPaymentsCalculation();
    	$scope.updateProjectedPaymentsMI();
    	for(j=0;j<$scope.cdformdata.projectedPayments.estimatedEscrow.length;j++){
            $scope.cdformdata.projectedPayments.estimatedEscrow[j].projectedPaymentEstimatedEscrowPaymentAmount = $scope.cdformdata.projectedPayments.estimatedEscrow[0].projectedPaymentEstimatedEscrowPaymentAmount;
        }
    }

    var projectedPaymentsCalculation = function(){
    	if($scope.cdformdata.loanInformation.amortizationType == '' || $scope.cdformdata.loanInformation.amortizationType == 'Fixed') {
    	    for(i=$scope.cdformdata.projectedPayments.paymentCalculation.length; i>0; i--){
    			$scope.cdformdata.projectedPayments.paymentCalculation.splice(i,1);
				$scope.cdformdata.projectedPayments.principalInterest.splice(i,1);
				$scope.cdformdata.projectedPayments.mortgageInsurance.splice(i,1);
				$scope.cdformdata.projectedPayments.estimatedEscrow.splice(i,1);
				$scope.cdformdata.projectedPayments.estimatedTotal.splice(i,1);
	        }
	        if($scope.cdformdata.projectedPayments.paymentCalculation.length==0){
	        	$scope.cdformdata.projectedPayments.paymentCalculation.push(angular.copy(paymentCalculation));
				$scope.cdformdata.projectedPayments.principalInterest.push(angular.copy(principalInterest));
				$scope.cdformdata.projectedPayments.mortgageInsurance.push(angular.copy(mortgageInsurance));
				$scope.cdformdata.projectedPayments.estimatedEscrow.push(angular.copy(estimatedEscrow));
				$scope.cdformdata.projectedPayments.estimatedTotal.push(angular.copy(estimatedTotal));
	        }
	    }
	    else
	    {
            if($scope.cdformdata.projectedPayments.paymentCalculation.length == 1){
	            for(i=1;i<=3;i++){
			    	$scope.cdformdata.projectedPayments.paymentCalculation.push(angular.copy(paymentCalculation));
					$scope.cdformdata.projectedPayments.principalInterest.push(angular.copy(principalInterest));
					$scope.cdformdata.projectedPayments.mortgageInsurance.push(angular.copy(mortgageInsurance));
					$scope.cdformdata.projectedPayments.estimatedEscrow.push(angular.copy(estimatedEscrow));
					$scope.cdformdata.projectedPayments.estimatedTotal.push(angular.copy(estimatedTotal));
		        }
	        }
	    }
    }

    $scope.amortizationBalloonChange = function(){
        $scope.cdformdata.loanInformation.loanAmortizationPeriodCount='';
    }
	
    $scope.interestOnlyTermMonthsCountChange = function(){
        if($scope.cdformdata.interestOnly.interestOnlyTermMonthsCount){
        	$scope.cdformdata.interestOnlyValue = $scope.cdformdata.interestOnly.interestOnlyTermMonthsCount%12 == 0 ? ($scope.cdformdata.interestOnly.interestOnlyTermMonthsCount/12)+1 : Math.ceil($scope.cdformdata.interestOnly.interestOnlyTermMonthsCount/12);
        }
    }
    
    $scope.constructionChange = function(){
    	if($scope.cdformdata.loanDetail.constructionLoanIndicator == false){
    		$scope.cdformdata.construction.constructionLoanType ='';
    		$scope.cdformdata.construction.constructionPeriodNumberOfMonthsCount = '';
    		$scope.cdformdata.construction.constructionLoanTotalTermMonthsCount = '';
    	}
    }

    $scope.clChange = function(){
    	if($scope.cdformdata.construction.constructionLoanType == ''){
    		$scope.cdformdata.construction.constructionPeriodNumberOfMonthsCount = '';
    		$scope.cdformdata.construction.constructionLoanTotalTermMonthsCount = '';

    	}
    }

    $scope.interestChange = function(){
    	$scope.cdformdata.interestOnly.interestOnlyTermMonthsCount = '';
    	if($scope.cdformdata.loanDetail.interestOnlyIndicator){
    		$scope.cdformdata.loanDetail.paymentIncreaseIndicator = true;
    	}else{
    		$scope.cdformdata.loanDetail.paymentIncreaseIndicator = false;
    	}
    }

    $scope.interestRateYearToMonthsAdjustment = function(){
		if($scope.cdformdata.interestRateAdjustment.ceilingRatePercentEarliestEffectiveYearCount) {
			$scope.cdformdata.interestRateAdjustment.ceilingRatePercentEarliestEffectiveMonthsCount = parseInt($scope.cdformdata.interestRateAdjustment.ceilingRatePercentEarliestEffectiveYearCount-1) * 12;
		} else {
			$scope.cdformdata.interestRateAdjustment.ceilingRatePercentEarliestEffectiveMonthsCount = '';
		}
    }
    $scope.principleInterestRateYearToMonthsAdjustment = function(){
		if($scope.cdformdata.principalAndInterestPaymentAdjustment.principalAndInterestPaymentMaximumAmountEarliestEffectiveYearCount) {
			$scope.cdformdata.principalAndInterestPaymentAdjustment.principalAndInterestPaymentMaximumAmountEarliestEffectiveMonthsCount= (parseInt($scope.cdformdata.principalAndInterestPaymentAdjustment.principalAndInterestPaymentMaximumAmountEarliestEffectiveYearCount) -1) * 12 + 1;
		} else {
			$scope.cdformdata.principalAndInterestPaymentAdjustment.principalAndInterestPaymentMaximumAmountEarliestEffectiveMonthsCount = '';
		}
    }

    $scope.nATypeChange = function(){
    	if($scope.cdformdata.negativeAmortization.negativeAmortizationType==''){
    		$scope.cdformdata.negativeAmortization.negativeAmortizationMaximumLoanBalanceAmount = '';
    		$scope.cdformdata.negativeAmortization.negativeAmortizationLimitMonthsCount = '';
    	}
    }

    $scope.seasonalChange = function(){
    	$scope.cdformdata.payment.paymentRule.seasonalPaymentPeriodStartMonth = '';
    	$scope.cdformdata.payment.paymentRule.seasonalPaymentPeriodEndMonth = '';
    }

    $scope.stepChange = function(val){
    	if(val==true){
    		$scope.stepPaymentIndicator = true;
    	}else{
    		$scope.stepPaymentIndicator = false;
    	}
		$scope.cdformdata.interestRateAdjustment.totalStepCount = '';
    	$scope.cdformdata.payment.paymentRule.totalStepPaymentCount = '';
    }

    $scope.optionalChange = function(){
    	$scope.cdformdata.payment.paymentRule.totalOptionalPaymentCount = '';
    }

    $scope.temporaryChange = function(){
    	$scope.cdformdata.loanTerms.temporaryBuydown.gseBuydownReflectedInNoteIndicator = null;
    	$scope.cdformdata.loanTerms.temporaryBuydown.buydownInitialEffectiveInterestRatePercent = '';
    	$scope.cdformdata.loanTerms.temporaryBuydown.buydownChangeFrequencyMonthsCount = '';
    	$scope.cdformdata.loanTerms.temporaryBuydown.buydownDurationMonthsCount = '';
    	$scope.cdformdata.loanTerms.temporaryBuydown.buydownIncreaseRatePercent = '';
    	$scope.cdformdata.termsOfLoan.noteRatePercent = '';
    	$scope.cdformdata.termsOfLoan.disclosedFullyIndexedRatePercent = '';
    }
    $scope.temporaryBuydownChange = function(){
    	$scope.cdformdata.loanTerms.temporaryBuydown.buydownInitialEffectiveInterestRatePercent = '';
    	$scope.cdformdata.loanTerms.temporaryBuydown.buydownChangeFrequencyMonthsCount = '';
    	$scope.cdformdata.loanTerms.temporaryBuydown.buydownDurationMonthsCount = '';
    	$scope.cdformdata.loanTerms.temporaryBuydown.buydownIncreaseRatePercent = '';
    }

    $scope.principalAndInterestChange = function(){
       $scope.cdformdata.principalAndInterestPaymentAdjustment.firstPerChangePrincipalAndInterestPaymentAdjustmentFrequencyMonthsCount = '';
       $scope.cdformdata.principalAndInterestPaymentAdjustment.firstPrincipalAndInterestPaymentChangeMonthsCount = '';
       $scope.cdformdata.principalAndInterestPaymentAdjustment.principalAndInterestPaymentMaximumAmount = '';
       $scope.cdformdata.principalAndInterestPaymentAdjustment.principalAndInterestPaymentMaximumAmountEarliestEffectiveMonthsCount = '';
       $scope.cdformdata.principalAndInterestPaymentAdjustment.principalAndInterestPaymentMaximumAmountEarliestEffectiveYearCount = '';
       $scope.cdformdata.principalAndInterestMonthsCount = '';
    }

    $scope.prepaymentPenaltyChange = function(){
    	$scope.cdformdata.loanTerms.prepaymentPenalty.prepaymentPenaltyMaximumLifeOfLoanAmount = '';
    	$scope.cdformdata.loanTerms.prepaymentPenalty.prepaymentPenaltyExpirationMonthsCount = '';
    	$scope.cdformdata.loanTerms.prepaymentPenalty.prepaymentPenaltyExpirationInYears = '';
    }

    $scope.balloonIndicatorChange = function() {
    	$scope.cdformdata.balloonPeriodType = '';
 		$scope.cdformdata.balloonPeriodCount = '';
 		$scope.cdformdata.loanInformation.loanAmortizationPeriodType='';
 		$scope.cdformdata.loanInformation.loanAmortizationPeriodCount='';
    }

	$scope.updateETIAComponentTypes = function(value, index) {
		var previousVal = $scope.cdformdata.etiaSection.etiaTypes[index];
		$scope.cdformdata.etiaSection.etiaTypes[index] = value;
		$scope.cdformdata.etiaSection.etiaValues[index].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentTypeOtherDescription = '';
		for(i=0; i<$scope.ETIAComponentTypes.length; i++){
			if($scope.ETIAComponentTypes[i].value == value) {
				if(value!='Other'){
					$scope.ETIAComponentTypes[i].disabled = true;
				}
			} else if ($scope.ETIAComponentTypes[i].value == previousVal) {
				$scope.ETIAComponentTypes[i].disabled = false;
			}
		}
		if($scope.cdformdata.etiaSection.etiaValues[index].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType!=''){
			$scope.cdformdata.etiaSection.etiaValues[index].projectedPaymentEscrowedType='NotEscrowed';
		}else{
			$scope.cdformdata.etiaSection.etiaValues[index].projectedPaymentEscrowedType='';
		}
		
	}

	$scope.updateSectionAfeeTypes = function(value, index) {
		var previousAfeeVal = $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.AfeeTypes[index];
       	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.AfeeTypes[index] = value;
       	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].feeTypeOtherDescription = '';
       	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].displayLabel = '';
		for(i=0; i<$scope.sectionAfeeTypes.length; i++){
			if($scope.sectionAfeeTypes[i].value == value) {
				if(value!='Other'){
				   //$scope.sectionAfeeTypes[i].disabled = true;
				}
			} else if ($scope.sectionAfeeTypes[i].value == previousAfeeVal) {
				$scope.sectionAfeeTypes[i].disabled = false;
			}
		}
	}

	$scope.updateSectionBfeeTypes = function(value, index) {
		var previousBfeeVal = $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.BfeeTypes[index];
		$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.BfeeTypes[index] = value;
		$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feeTypeOtherDescription = '';
		$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].displayLabel = '';
		for(i=0; i<$scope.sectionBfeeTypes.length; i++){
			if($scope.sectionBfeeTypes[i].value == value) {
				if(value!='Other'){
				   //$scope.sectionBfeeTypes[i].disabled = true;
			    }
			} else if ($scope.sectionBfeeTypes[i].value == previousBfeeVal) {
				$scope.sectionBfeeTypes[i].disabled = false;
			}
		}
	}
	$scope.updateSectionCfeeTypes = function(value, index) {
		var previousCfeeVal = $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.CfeeTypes[index];
		$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.CfeeTypes[index] = value;
		$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feeTypeOtherDescription = '';
		$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].displayLabel = '';
		for(i=0; i<$scope.sectionCfeeTypes.length; i++){
			if($scope.sectionCfeeTypes[i].value == value) {
				if(value!='Other'){
				   //$scope.sectionCfeeTypes[i].disabled = true;
				}
			} else if ($scope.sectionCfeeTypes[i].value == previousCfeeVal) {
				$scope.sectionCfeeTypes[i].disabled = false;
			}
		}
	}
	$scope.updateSectionEfeeTypes = function(value, index) {
		var previousEfeeVal = $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.EfeeTypes[index];
		$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.EfeeTypes[index] = value;
		$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].feeTypeOtherDescription = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].displayLabel = '';
		for(i=0; i<$scope.sectionEfeeTypes.length; i++){
			if($scope.sectionEfeeTypes[i].value == value) {
				if(value!='Other'){
				   //$scope.sectionEfeeTypes[i].disabled = true;
			    }
			} else if ($scope.sectionEfeeTypes[i].value == previousEfeeVal) {
				$scope.sectionEfeeTypes[i].disabled = false;
			}
		}
	}

	$scope.updateSectionFprepaidTypes = function(value, index) {
		var previousFprepaidVal = $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.FprepaidTypes[index];
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.FprepaidTypes[index] = value;
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[index].prepaidItemTypeOtherDescription = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[index].displayLabel = '';
		for(i=0; i<$scope.prepaidItems.length; i++){
			if($scope.prepaidItems[i].value == value) {
				if(value!='Other'){
				   //$scope.prepaidItems[i].disabled = true;
				}
			} else if ($scope.prepaidItems[i].value == previousFprepaidVal) {
				$scope.prepaidItems[i].disabled = false;
			}
		}
	}

	$scope.updateSectionGescrowTypes = function(value, index) {
		var previousGescrowVal = $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.GescrowTypes[index];
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.GescrowTypes[index] = value;
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[index].escrowItemTypeOtherDescription = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[index].displayLabel = '';
		for(i=0; i<$scope.escrowItemTypes.length; i++){
			if($scope.escrowItemTypes[i].value == value) {
				if(value!='Other'){
				   //$scope.escrowItemTypes[i].disabled = true;
				}
			} else if ($scope.escrowItemTypes[i].value == previousGescrowVal) {
				$scope.escrowItemTypes[i].disabled = false;
			}
		}
	}

	$scope.updateSectionHfeeTypes = function(value, index) {
		var previousHfeeVal = $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.HfeeTypes[index];
		$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.HfeeTypes[index] = value;
		$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[index].feeTypeOtherDescription = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[index].displayLabel = '';
		for(i=0; i<$scope.sectionHfeeTypes.length; i++){
			if($scope.sectionHfeeTypes[i].value == value) {
				if(value!='Other'){
				   //$scope.sectionHfeeTypes[i].disabled = true;
				}
			} else if ($scope.sectionHfeeTypes[i].value == previousHfeeVal) {
				$scope.sectionHfeeTypes[i].disabled = false;
			}
		}
	}
    
    //Summaries of Transactions
    $scope.sotKLchange = function(index){
         $scope.summariesOfTransaction_KSection.liabilites[index].liabilityTypeOtherDescription = '';
    }

    $scope.sotKAchange = function(index){
         $scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[index].prorationItemTypeOtherDescription = '';
    }

    $scope.disclosureChange = function(){
        $scope.summariesOfTransaction_LSection.subordinateLien= {};
        $scope.cdformdata.loanDetail.totalSubordinateFinancingAmount = '';
        $scope.cdformdata.loanDetail.subordinateFinancingIsNewIndicator = false;
     	$scope.summariesOfTransaction_LSection.liabilites[0].liabilityDescription = '';
    }
    $scope.subordinateLienChange = function() {
    	$scope.summariesOfTransaction_LSection.subordinateLien.closingAdjustmentItemTypeOtherDescription = '';
    	$scope.cdformdata.loanDetail.totalSubordinateFinancingAmount = '';
        $scope.cdformdata.loanDetail.subordinateFinancingIsNewIndicator = false;
     }

    $scope.sotLOCchange = function(index){
    	$scope.summariesOfTransaction_LSection.otherCredits[index].closingAdjustmentItemTypeOtherDescription = '';
    }

    $scope.sotLAchange = function(index){
    	$scope.summariesOfTransaction_LSection.adjustments[index].closingAdjustmentItemTypeOtherDescription = '';
    }

    $scope.sotLAUPchange = function(index){
    	$scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller[index].prorationItemTypeOtherDescription = '';
    }
    
    $scope.sotMAchange = function(index){
    	$scope.summariesOfTransaction_MSection.adjustments[index].closingAdjustmentItemTypeOtherDescription = '';
    }

    $scope.sotNchange = function(index){
    	$scope.summariesOfTransaction_NSection.liabilitesAndAdjustments[index].itemType = '';
    	$scope.summariesOfTransaction_NSection.liabilitesAndAdjustments[index].otherDescription = '';
    	$scope.summariesOfTransaction_NSection.liabilitesAndAdjustments[index].pocIndicator = '';
    }

    $scope.sotNLAchange = function(index){
    	$scope.summariesOfTransaction_NSection.liabilitesAndAdjustments[index].otherDescription = '';
    }
    
    $scope.payOffChange = function(index){
        $scope.payoffsAndPaymentsList[index].otherDescription='';
        $scope.payoffsAndPaymentsList[index].itemType='';
        $scope.payoffsAndPaymentsList[index].securedIndicator='';
        $scope.payoffsAndPaymentsList[index].payoffPartialIndicator='';
        $scope.payoffsAndPaymentsList[index].prepaymentPenaltyAmount='';
    }
    
    $scope.itemsChange = function(index){
        $scope.payoffsAndPaymentsList[index].otherDescription='';
    }

    $scope.sameBorrower = function(index){
    	var bCheck = $scope.cdformdata.transactionInformation.borrowerDetails[index];
    	if(bCheck.checkBorrower == true){
    	   $scope.cdformdata.transactionInformation.borrowerDetails[index].address = angular.copy($scope.cdformdata.transactionInformation.borrowerDetails[0].address);
    	   $scope.cdformdata.transactionInformation.borrowerDetails[index].checkBorrower = true;
        }
    }
    
    $scope.sameSeller = function(index){
    	var sCheck = $scope.cdformdata.transactionInformation.sellerDetails[index];
    	if(sCheck.checkSeller == true){
    	   $scope.cdformdata.transactionInformation.sellerDetails[index].address = angular.copy($scope.cdformdata.transactionInformation.sellerDetails[0].address);
    	   $scope.cdformdata.transactionInformation.sellerDetails[index].checkSeller = true;
        }
    }

    $scope.bcountryChange = function(index){
        $scope.cdformdata.transactionInformation.borrowerDetails[index].address.stateCode = '';
    }

    $scope.scountryChange = function(index){
        $scope.cdformdata.transactionInformation.sellerDetails[index].address.stateCode = '';
    }

    $scope.indexChange = function(index){
    	$scope.cdformdata.interestRateAdjustment.indexTypeOtherDescription = '';
    }
    
    $scope.repayMethodChange = function(){
    	$scope.cdformdata.loanCalculationsQualifiedMortgage.qualifiedMortgage.abilityToRepayExemptionReasonType = '';
    }

    $scope.addProjectedPayments = function(){
    	var ppLength = $scope.cdformdata.projectedPayments.paymentCalculation.length;
    	if($scope.cdformdata.projectedPayments.paymentCalculation.length <= 3){
	    	$scope.cdformdata.projectedPayments.paymentCalculation.push(angular.copy(paymentCalculation));
			$scope.cdformdata.projectedPayments.principalInterest.push(angular.copy(principalInterest));
			$scope.cdformdata.projectedPayments.mortgageInsurance.push(angular.copy(mortgageInsurance));
			$scope.cdformdata.projectedPayments.estimatedEscrow.push(angular.copy(estimatedEscrow));
			$scope.cdformdata.projectedPayments.estimatedTotal.push(angular.copy(estimatedTotal));
			$scope.cdformdata.projectedPayments.estimatedEscrow[ppLength].projectedPaymentEstimatedEscrowPaymentAmount = $scope.cdformdata.projectedPayments.estimatedEscrow[0].projectedPaymentEstimatedEscrowPaymentAmount;
	    }

	    if(!$scope.cdformdata.loanDetail.miRequiredIndicator) {
    		for(var i=0; i<$scope.cdformdata.projectedPayments.mortgageInsurance.length;i++) {
    			$scope.cdformdata.projectedPayments.mortgageInsurance[i].projectedPaymentMIPaymentAmount = '0';
    		}
    	}else{
    		for(var i=0; i<$scope.cdformdata.projectedPayments.mortgageInsurance.length;i++) {
    			if($scope.cdformdata.projectedPayments.mortgageInsurance[0].projectedPaymentMIPaymentAmount && $scope.cdformdata.projectedPayments.mortgageInsurance[0].projectedPaymentMIPaymentAmount!=undefined){
    				$scope.cdformdata.projectedPayments.mortgageInsurance[i].projectedPaymentMIPaymentAmount = $scope.cdformdata.projectedPayments.mortgageInsurance[0].projectedPaymentMIPaymentAmount ? $scope.cdformdata.projectedPayments.mortgageInsurance[0].projectedPaymentMIPaymentAmount : '0';
    			}
    		}
    	}
    }
    $scope.deleteProjectedPayments = function(index){
	    	$scope.cdformdata.projectedPayments.paymentCalculation.splice(index, 1);
			$scope.cdformdata.projectedPayments.principalInterest.splice(index, 1);
			$scope.cdformdata.projectedPayments.mortgageInsurance.splice(index, 1);
			$scope.cdformdata.projectedPayments.estimatedEscrow.splice(index, 1);
			$scope.cdformdata.projectedPayments.estimatedTotal.splice(index, 1);
    }


    $scope.resultsCalculator = function(){
        $scope.results = false;
        $scope.cdformdata['salePrice'] = $scope.cdformdata.salesContractDetail.personalPropertyIndicator ? parseFloat($scope.cdformdata.salesContractDetail.realPropertyAmount) : parseFloat($scope.cdformdata.salesContractDetail.saleContractAmount);
		$scope.cdformdata['depositAmount'] = $scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemFinalAmount ? parseFloat($scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemFinalAmount) : +0;
		$scope.cdformdata['sellerCreditsAmount'] = $scope.cdformdata.cashToCloses.sellerCredits.integratedDisclosureCashToCloseItemFinalAmount ? parseFloat($scope.cdformdata.cashToCloses.sellerCredits.integratedDisclosureCashToCloseItemFinalAmount) : +0;
		$scope.cdformdata['adjustmentsAmount'] = $scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemFinalAmount ? parseFloat($scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemFinalAmount) : +0;
		$scope.cdformdata['totalPayoffAmount'] = $scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemFinalAmount ? parseFloat($scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemFinalAmount) : +0;
        $scope.cdformdata['downPayment'] = $scope.cdformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemFinalAmount ? parseFloat($scope.cdformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemFinalAmount) : +0;
        $scope.cdformdata['closingCostsFinanced'] = $scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemFinalAmount ? parseFloat($scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemFinalAmount) : +0;
        $scope.cdformdata['fundsForBorrower'] = $scope.cdformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemFinalAmount ? parseFloat($scope.cdformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemFinalAmount) : +0;
        if($scope.loanBasicInfo.loanFormType == 'standard'){
           $scope.cdformdata['loanAssumedAmount'] = parseFloat($scope.cdformdata.termsOfLoan.noteAmount) + parseFloat($scope.summariesOfTransaction_LSection.assumedLoanAmount ? parseFloat($scope.summariesOfTransaction_LSection.assumedLoanAmount) : +0);
        }
    } 
    
    $scope.depositChange = function(){
        $scope.results = false;
    }

    $scope.adjustmentsAndOtherCreditsChange = function(){
        $scope.results = false;
        $scope.cdformdata.totalPayoffAmount = $scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemFinalAmount ? parseFloat($scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemFinalAmount) : +0;
        if($scope.loanBasicInfo.loanFormType == 'alternate'){
        	if($scope.cdformdata.adjustmentsAmount && $scope.cdformdata.adjustmentsAmount!=undefined){
                 $scope.cdformdata.totalPayoffAmount = parseFloat($scope.cdformdata.totalPayoffAmount-$scope.cdformdata.adjustmentsAmount);
           	}else{
           		$scope.cdformdata.totalPayoffAmount = $scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemFinalAmount ? parseFloat($scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemFinalAmount) : +0;
           	}
        }
    }
    
    $scope.totalPayoffChangeCC = function(){
        $scope.results = false;
    }

    $scope.sellerCreditsChange = function(){
        $scope.results = false;
    }

    $scope.salePriceChange = function(){
        $scope.results = false;
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
     	$scope.summariesOfTransaction_KSection.adjustments[index].closingAdjustmentItemTypeOtherDescription = '';
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

    $scope.deleteOC = function(feeType,index){
    	for(j=0; j<$scope.sectionAfeeTypes.length; j++){
	        if($scope.sectionAfeeTypes[j].value == feeType) {
	            $scope.sectionAfeeTypes[j].disabled = false;
	        } 
        }
    	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.splice(index,1);
    }

    $scope.deleteSDidNot = function(feeType,index){
    	for(j=0; j<$scope.sectionBfeeTypes.length; j++){
	        if($scope.sectionBfeeTypes[j].value == feeType) {
	            $scope.sectionBfeeTypes[j].disabled = false;
	        } 
        }
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.splice(index,1);
    }

    $scope.deleteSDid = function(feeType,index){
    	for(j=0; j<$scope.sectionCfeeTypes.length; j++){
	        if($scope.sectionCfeeTypes[j].value == feeType) {
	            $scope.sectionCfeeTypes[j].disabled = false;
	        } 
        }
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.splice(index,1);
    }

    $scope.clearOC = function(feeType,index){
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
		for(j=0; j<$scope.sectionAfeeTypes.length; j++){
	        if($scope.sectionAfeeTypes[j].value == feeType) {
	            $scope.sectionAfeeTypes[j].disabled = false;
	        } 
        }
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
	
	$scope.clearSDidNot = function(feeType,index){
		for(j=0; j<$scope.sectionBfeeTypes.length; j++){
	        if($scope.sectionBfeeTypes[j].value == feeType) {
	            $scope.sectionBfeeTypes[j].disabled = false;
	        } 
        }
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

    $scope.clearSDid = function(feeType,index){
    	for(j=0; j<$scope.sectionCfeeTypes.length; j++){
	        if($scope.sectionCfeeTypes[j].value == feeType) {
	            $scope.sectionCfeeTypes[j].disabled = false;
	        } 
        }
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
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].paymentIncludedInAPRIndicator = false;
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].regulationZPointsAndFeesIndicator = false;
    }
       $scope.clearRecordings = function(){
        $scope.recordingFeetotalObj.recordingFeeForDeed='';
    	$scope.recordingFeetotalObj.recordingFeeForMortgage='';
    	$scope.recordingFeetotalObj.feePaidToType='ThirdPartyProvider';
	    $scope.recordingFeetotalObj.feePaidToTypeOtherDescription='';
    	$scope.recordingFeetotalObj.bpAtClosing='';
    	$scope.recordingFeetotalObj.bpB4Closing='';
    	$scope.recordingFeetotalObj.spAtClosing='';
    	$scope.recordingFeetotalObj.spB4Closing='';
    	$scope.recordingFeetotalObj.paidByOthers='';
    	$scope.recordingFeetotalObj.lenderStatus=false;
    	$scope.recordingFeetotalObj.feeTypeOtherDescription='';
    	$scope.recordingFeetotalObj.paymentIncludedInAPRIndicator = false;
    }
    //deleteOGF
    $scope.clearOGF = function(feeType,index){
        for(j=0; j<$scope.sectionEfeeTypes.length; j++){
	        if($scope.sectionEfeeTypes[j].value == feeType) {
	            $scope.sectionEfeeTypes[j].disabled = false;
	        } 
        }
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
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].paymentIncludedInAPRIndicator = false;
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].regulationZPointsAndFeesIndicator = null;
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
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].paymentIncludedInAPRIndicator = false;
	    	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[index].regulationZPointsAndFeesIndicator = null;
        }
    }
    $scope.deleteOGF = function(feeType,index){
    	for(j=0; j<$scope.sectionEfeeTypes.length; j++){
	        if($scope.sectionEfeeTypes[j].value == feeType) {
	            $scope.sectionEfeeTypes[j].disabled = false;
	        } 
        }
        $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.splice(index,1);
    }
    //Prepaid Interest
    $scope.clearPrepaid = function(i){
    	$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].feePaidToType = 'Lender';
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
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].regulationZPointsAndFeesIndicator = false;
    }

    $scope.clearPrepaidInfo = function(i){
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].feePaidToType = 'ThirdPartyProvider';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].feePaidToTypeOtherDescription = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidPaidToFullName = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpAtClosing = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpB4Closing = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spAtClosing = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spB4Closing = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].paidByOthers = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].lenderStatus = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].paymentIncludedInAPRIndicator = false;
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].regulationZPointsAndFeesIndicator = false;
    }
    
    $scope.clearPrepaidList = function(prepaidType,i){
    	for(j=0; j<$scope.prepaidItems.length; j++){
	        if($scope.prepaidItems[j].value == prepaidType) {
	            $scope.prepaidItems[j].disabled = false;
	        } 
        }
    	$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType = '';
    	$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].displayLabel = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].feePaidToType = 'ThirdPartyProvider';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].feePaidToTypeOtherDescription = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidPaidToFullName = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpAtClosing = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpB4Closing = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spAtClosing = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spB4Closing = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].paidByOthers = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].lenderStatus = '';
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].paymentIncludedInAPRIndicator = false;
		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].regulationZPointsAndFeesIndicator = false;
    }

    $scope.deletePrepaidInfo = function(prepaidType,i){
    	for(j=0; j<$scope.prepaidItems.length; j++){
	        if($scope.prepaidItems[j].value == prepaidType) {
	            $scope.prepaidItems[j].disabled = false;
	        } 
        }
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
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].paymentIncludedInAPRIndicator = false;
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].regulationZPointsAndFeesIndicator = false;
    }
    
    $scope.clearEscrowsList = function(escrowValue,i){
    	for(j=0; j<$scope.escrowItemTypes.length; j++){
            if($scope.escrowItemTypes[j].value == escrowValue) {
                $scope.escrowItemTypes[j].disabled = false;
            } 
        }
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
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].paymentIncludedInAPRIndicator = false;
		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].regulationZPointsAndFeesIndicator = false;
    }

    $scope.deleteEscrowsList = function(escrowValue,i){
    	for(j=0; j<$scope.escrowItemTypes.length; j++){
            if($scope.escrowItemTypes[j].value == escrowValue) {
                $scope.escrowItemTypes[j].disabled = false;
            } 
        }
    	$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.splice(i,1);
    }
    
    $scope.clearOthers = function(feeType,i){
    	for(j=0; j<$scope.sectionHfeeTypes.length; j++){
            if($scope.sectionHfeeTypes[j].value == feeType) {
                $scope.sectionHfeeTypes[j].disabled = false;
            } 
        }
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
		$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].paymentIncludedInAPRIndicator = false;
		$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].regulationZPointsAndFeesIndicator = false;
		$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].optionalCostIndicator = false;
    }
    $scope.deleteOthers = function(feeType,i){
    	for(j=0; j<$scope.sectionHfeeTypes.length; j++){
            if($scope.sectionHfeeTypes[j].value == feeType) {
                $scope.sectionHfeeTypes[j].disabled = false;
            } 
        }
    	$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.splice(i,1);
    }
    $scope.sectionApaidToChange = function(index){
    	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].feePaidToTypeOtherDescription = '';
    	if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].feePaidToType == 'Lender'){
    		$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].feePaidToFullName = '';
    	}
    	$scope.sectionAZIndicator(index);
    }
    $scope.sectionBpaidToChange = function(index){
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToTypeOtherDescription = '';
    	$scope.sectionBZIndicator(index);
    }
    $scope.sectionCpaidToChange = function(index){
    	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToTypeOtherDescription = '';
    	$scope.sectionCZIndicator(index);
    }
    $scope.sectionEpaidToChange = function(index){
    	if(index == 0 || index == '0')
    		$scope.recordingFeetotalObj.feePaidToTypeOtherDescription='';
    	else
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
    	$scope.sectionHZIndicator(index);
    }
    
    //Closing Costs Regulation Z Indicator Validations
    $scope.sectionAZIndicator = function(index){
        if(($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].feePaidToType == 'Lender' && $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].bpAtClosing) || ($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].feePaidToType == 'Lender' && $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].bpB4Closing)){
        	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].regulationZPointsAndFeesIndicator = true;
        }else if(($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].feePaidToType == 'Lender' && $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].spAtClosing) || ($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].feePaidToType == 'Lender' && $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].spB4Closing)){
        	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].regulationZPointsAndFeesIndicator = false;
        }else if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].feePaidToType == 'Lender' && $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].lenderStatus == true){
        	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].regulationZPointsAndFeesIndicator = false;
        }else if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].feePaidToType == 'Lender' && $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].paidByOthers){
        	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].regulationZPointsAndFeesIndicator = false;
        }else{
        	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].regulationZPointsAndFeesIndicator = true;
        }
    }

    $scope.sectionBZIndicator = function(index){
        if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].bpAtClosing || $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].bpB4Closing){
			if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToType == 'Broker'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].regulationZPointsAndFeesIndicator = true;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToType == 'Investor'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].regulationZPointsAndFeesIndicator = true;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToType == 'Lender'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].regulationZPointsAndFeesIndicator = true;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToType == 'Other' && $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToTypeOtherDescription == 'LenderAffiliate'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].regulationZPointsAndFeesIndicator = true;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToType == 'Other' && $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToTypeOtherDescription == 'BrokerAffiliate'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].regulationZPointsAndFeesIndicator = true;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToType == 'ThirdPartyProvider'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].regulationZPointsAndFeesIndicator = false;
			}
        }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].spAtClosing || $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].spB4Closing){
            if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToType == 'Broker'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].regulationZPointsAndFeesIndicator = true;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToType == 'Investor'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].regulationZPointsAndFeesIndicator = true;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToType == 'Lender'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].regulationZPointsAndFeesIndicator = false;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToType == 'Other' && $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToTypeOtherDescription == 'LenderAffiliate'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].regulationZPointsAndFeesIndicator = false;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToType == 'Other' && $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToTypeOtherDescription == 'BrokerAffiliate'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].regulationZPointsAndFeesIndicator = true;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToType == 'ThirdPartyProvider'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].regulationZPointsAndFeesIndicator = false;
			}
        }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].lenderStatus == true){
            if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToType == 'Broker'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].regulationZPointsAndFeesIndicator = true;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToType == 'Investor'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].regulationZPointsAndFeesIndicator = true;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToType == 'Lender'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].regulationZPointsAndFeesIndicator = false;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToType == 'Other' && $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToTypeOtherDescription == 'LenderAffiliate'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].regulationZPointsAndFeesIndicator = false;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToType == 'Other' && $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToTypeOtherDescription == 'BrokerAffiliate'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].regulationZPointsAndFeesIndicator = true;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToType == 'ThirdPartyProvider'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].regulationZPointsAndFeesIndicator = false;
			}
        }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].paidByOthers){
            if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToType == 'Broker'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].regulationZPointsAndFeesIndicator = true;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToType == 'Investor'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].regulationZPointsAndFeesIndicator = true;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToType == 'Lender'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].regulationZPointsAndFeesIndicator = false;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToType == 'Other' && $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToTypeOtherDescription == 'LenderAffiliate'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].regulationZPointsAndFeesIndicator = false;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToType == 'Other' && $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToTypeOtherDescription == 'BrokerAffiliate'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].regulationZPointsAndFeesIndicator = true;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].feePaidToType == 'ThirdPartyProvider'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].regulationZPointsAndFeesIndicator = false;
			}
        }else{
        	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[index].regulationZPointsAndFeesIndicator = true;
        }
    }
    
    $scope.sectionCZIndicator = function(index){
        if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].bpAtClosing || $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].bpB4Closing){
			if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToType == 'Broker'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].regulationZPointsAndFeesIndicator = true;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToType == 'Investor'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].regulationZPointsAndFeesIndicator = true;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToType == 'Lender'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].regulationZPointsAndFeesIndicator = true;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToType == 'Other' && $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToTypeOtherDescription == 'LenderAffiliate'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].regulationZPointsAndFeesIndicator = true;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToType == 'Other' && $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToTypeOtherDescription == 'BrokerAffiliate'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].regulationZPointsAndFeesIndicator = true;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToType == 'ThirdPartyProvider'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].regulationZPointsAndFeesIndicator = false;
			}
        }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].spAtClosing || $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].spB4Closing){
            if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToType == 'Broker'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].regulationZPointsAndFeesIndicator = true;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToType == 'Investor'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].regulationZPointsAndFeesIndicator = true;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToType == 'Lender'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].regulationZPointsAndFeesIndicator = false;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToType == 'Other' && $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToTypeOtherDescription == 'LenderAffiliate'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].regulationZPointsAndFeesIndicator = false;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToType == 'Other' && $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToTypeOtherDescription == 'BrokerAffiliate'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].regulationZPointsAndFeesIndicator = true;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToType == 'ThirdPartyProvider'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].regulationZPointsAndFeesIndicator = false;
			}
        }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].lenderStatus == true){
            if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToType == 'Broker'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].regulationZPointsAndFeesIndicator = true;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToType == 'Investor'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].regulationZPointsAndFeesIndicator = true;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToType == 'Lender'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].regulationZPointsAndFeesIndicator = false;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToType == 'Other' && $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToTypeOtherDescription == 'LenderAffiliate'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].regulationZPointsAndFeesIndicator = false;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToType == 'Other' && $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToTypeOtherDescription == 'BrokerAffiliate'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].regulationZPointsAndFeesIndicator = true;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToType == 'ThirdPartyProvider'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].regulationZPointsAndFeesIndicator = false;
			}
        }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].paidByOthers){
            if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToType == 'Broker'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].regulationZPointsAndFeesIndicator = true;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToType == 'Investor'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].regulationZPointsAndFeesIndicator = true;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToType == 'Lender'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].regulationZPointsAndFeesIndicator = false;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToType == 'Other' && $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToTypeOtherDescription == 'LenderAffiliate'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].regulationZPointsAndFeesIndicator = false;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToType == 'Other' && $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToTypeOtherDescription == 'BrokerAffiliate'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].regulationZPointsAndFeesIndicator = true;
			}else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].feePaidToType == 'ThirdPartyProvider'){
				$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].regulationZPointsAndFeesIndicator = false;
			}
        }else{
        	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[index].regulationZPointsAndFeesIndicator = false;
        }
    }
    
    $scope.sectionHZIndicator = function(index){
        if(($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[index].feePaidToType == 'ThirdPartyProvider' && $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[index].bpAtClosing) || ($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[index].feePaidToType == 'ThirdPartyProvider' && $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[index].bpB4Closing)){
        	$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[index].regulationZPointsAndFeesIndicator = false;
        }else if(($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[index].feePaidToType == 'ThirdPartyProvider' && $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[index].spAtClosing) || ($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[index].feePaidToType == 'ThirdPartyProvider' && $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[index].spB4Closing)){
        	$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[index].regulationZPointsAndFeesIndicator = false;
        }else if($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[index].feePaidToType == 'ThirdPartyProvider' && $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[index].lenderStatus == true){
        	$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[index].regulationZPointsAndFeesIndicator = false;
        }else if($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[index].feePaidToType == 'ThirdPartyProvider' && $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[index].paidByOthers){
        	$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[index].regulationZPointsAndFeesIndicator = false;
        }else{
        	$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[index].regulationZPointsAndFeesIndicator = true;
        }
    }

    $scope.aggregateAdjustment = function(value,paidByType){
    	//alert(value);
    	if(paidByType=='Borrower'){
    	    bpAtClosing.iEPatClosingTotalbpAtClosing = 0;
    	    if(value!=undefined && value!=""){
	    		for(i=0; i<$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.length; i++) {
	         	   bpAtClosing.iEPatClosingTotalbpAtClosing += $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpAtClosing) : +0;
	            }
		    bpAtClosing.iEPatClosingTotalbpAtClosing  += parseFloat(value);
		        $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount = bpAtClosing.iEPatClosingTotalbpAtClosing + bpB4Closing.iEPatClosingTotalbpB4Closing;
		        $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount = parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount ? $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount : +0) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount ?$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount : +0) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount ? $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount : +0) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherTotalAmount ? $scope.cdformdata.closingCostDetailsOtherCosts.otherTotalAmount : +0);
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
		        $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount = parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount ? $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount : +0) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount ?$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount : +0) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount ? $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount : +0) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherTotalAmount ? $scope.cdformdata.closingCostDetailsOtherCosts.otherTotalAmount : +0);
		        $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing = parseFloat(bpAtClosing.tOGovtFeesTotalbpAtClosing) + parseFloat(bpAtClosing.prepaidsTotalbpAtClosing) + parseFloat(bpAtClosing.iEPatClosingTotalbpAtClosing) + parseFloat(bpAtClosing.otherTotalbpAtClosing);
		        $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing);
		        $scope.cdformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostsTotal.lenderCredits=='' || $scope.cdformdata.closingCostsTotal.lenderCredits==undefined ? +0 : $scope.cdformdata.closingCostsTotal.lenderCredits);
	       }
        }else if(paidByType=='Seller'){
    	    spAtClosing.iEPatClosingTotalspAtClosing = 0;
    	    if(value!=undefined && value!=""){
	    		for(i=0; i<$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.length; i++) {
	         	   spAtClosing.iEPatClosingTotalspAtClosing += $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].spAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].spAtClosing) : +0;
	            }
	       	    spAtClosing.iEPatClosingTotalspAtClosing  += parseFloat(value);
                $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing = parseFloat(spAtClosing.tOGovtFeesTotalspAtClosing) + parseFloat(spAtClosing.prepaidsTotalspAtClosing) + parseFloat(spAtClosing.iEPatClosingTotalspAtClosing) + parseFloat(spAtClosing.otherTotalspAtClosing);		        
                $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing);
	        }
	        else if(value==undefined || value==""){
	       	    value=0;
	       	    for(i=0; i<$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.length; i++) {
	         	   spAtClosing.iEPatClosingTotalspAtClosing += $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpAtClosing) : +0;
	            }
	       	    spAtClosing.iEPatClosingTotalspAtClosing  += parseFloat(value);
                $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing = parseFloat(spAtClosing.tOGovtFeesTotalspAtClosing) + parseFloat(spAtClosing.prepaidsTotalspAtClosing) + parseFloat(spAtClosing.iEPatClosingTotalspAtClosing) + parseFloat(spAtClosing.otherTotalspAtClosing);		        
                $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing);
	       }
        }else if(paidByType=='Other'){
		    paidByOthers.iEPatClosingTotalpaidByOthers = 0;
    	    if(value!=undefined && value!=""){
	    		for(i=0; i<$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.length; i++) {
	         	   paidByOthers.iEPatClosingTotalpaidByOthers += $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].paidByOthers ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].paidByOthers) : +0;
	            }
	       	    paidByOthers.iEPatClosingTotalpaidByOthers  += parseFloat(value);
	       	    $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers = parseFloat(paidByOthers.tOGovtFeesTotalpaidByOthers) + parseFloat(paidByOthers.prepaidsTotalpaidByOthers) + parseFloat(paidByOthers.iEPatClosingTotalpaidByOthers) + parseFloat(paidByOthers.otherTotalpaidByOthers);
	       	    $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.paidByOthers = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers);

	        }
	        else if(value==undefined || value==""){
	       	    value=0;
	       	    for(i=0; i<$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.length; i++) {
	         	   paidByOthers.iEPatClosingTotalpaidByOthers += $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].paidByOthers ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].paidByOthers) : +0;
	            }
	       	    paidByOthers.iEPatClosingTotalpaidByOthers  += parseFloat(value);
	       	    $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers = parseFloat(paidByOthers.tOGovtFeesTotalpaidByOthers) + parseFloat(paidByOthers.prepaidsTotalpaidByOthers) + parseFloat(paidByOthers.iEPatClosingTotalpaidByOthers) + parseFloat(paidByOthers.otherTotalpaidByOthers);
                $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.paidByOthers = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers);

	       }
        }
    }
    
    $scope.loanDiscount = function(index){
 	   var loanDiscountAmount = 0;
 	   var totalPercent = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].feeTotalPercent ? $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].feeTotalPercent : +0);
       loanDiscountAmount = $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].feeTotalPercent ? ($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].feeTotalPercent*$scope.cdformdata.termsOfLoan.noteAmount)/100 : +0;
 	   $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[index].bpAtClosing = loanDiscountAmount; 
       
       //Reg.Z Excluded Bona Fide Discount Points Indicator
       if(totalPercent>0){
           	$scope.cdformdata.loanCalculationsQualifiedMortgage.qualifiedMortgage.regulationZExcludedBonaFideDiscountPointsIndicator = true;
           	$scope.cdformdata.loanCalculationsQualifiedMortgage.qualifiedMortgage.regulationZExcludedBonaFideDiscountPointsPercent = totalPercent;
       }else{
            $scope.cdformdata.loanCalculationsQualifiedMortgage.qualifiedMortgage.regulationZExcludedBonaFideDiscountPointsIndicator = false;
            $scope.cdformdata.loanCalculationsQualifiedMortgage.qualifiedMortgage.regulationZExcludedBonaFideDiscountPointsPercent = '';
       }

    }

    $scope.recordingTotal = function(){
    	$scope.recordingFeetotalObj.feeActualTotalAmount = 0;
        if($scope.recordingFeetotalObj.recordingFeeForDeed)
        	$scope.recordingFeetotalObj.feeActualTotalAmount += parseFloat($scope.recordingFeetotalObj.recordingFeeForDeed);
        if($scope.recordingFeetotalObj.recordingFeeForMortgage)
        	$scope.recordingFeetotalObj.feeActualTotalAmount += parseFloat($scope.recordingFeetotalObj.recordingFeeForMortgage);
    }
    
    $scope.perDiemCalc = function(){
    	for(i=0; i<$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.length; i++) {
	    	if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType == 'PrepaidInterest'){
	    		if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemPaidFromDate)
	    			$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemPaidFromDate = 
	    		$filter('date')(new Date(Date.parse($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemPaidFromDate)), "yyyy-MM-dd");
	    		if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemPaidThroughDate)
	    			$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemPaidThroughDate = 
	    		$filter('date')(new Date(Date.parse($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemPaidThroughDate)), "yyyy-MM-dd");
		    	var prepaidCalMethodType = $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemPerDiemCalculationMethodType;
	    		if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemPaidFromDate 
	    			&& $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemPaidThroughDate
	    			&& $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemPaidFromDate != 'Invalid Date'
	    			&& $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemPaidThroughDate != 'Invalid Date' 
	    			&& prepaidCalMethodType) {
					var fromDate = new Date($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemPaidFromDate);
					var toDate = new Date($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemPaidThroughDate);
					var diemAmount = 0;
					var diffDays = 0;
					if(toDate<fromDate)
						diffDays = differenceInDays(toDate, fromDate, prepaidCalMethodType) * -1;
					else 
						diffDays = differenceInDays(fromDate, toDate, prepaidCalMethodType)
					diemAmount =  $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemPerDiemAmount ? $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemPerDiemAmount : +0;
					$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpAtClosing = parseFloat(diemAmount*diffDays);
	    		}
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
        
        //Calculating Prepaids bpAtClosing amount
	    var prepaidmonths = 0;
		var escrowAmount = 0;
		for(i=0;i<$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.length;i++){
			if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType.indexOf($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[index].escrowItemType)!=-1 && $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[index].escrowItemType){
				if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemMonthsPaidCount && $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[index].escrowMonthlyPaymentAmount){
					prepaidmonths = $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemMonthsPaidCount ? $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemMonthsPaidCount : +0;
					escrowAmount = $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[index].escrowMonthlyPaymentAmount ? $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[index].escrowMonthlyPaymentAmount : +0;
					$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpAtClosing = parseFloat(prepaidmonths*escrowAmount);
			    } else{
		            $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpAtClosing = '';
			    }
		    }
	    }
    }

    $scope.prepaidPerMonth = function(ideType,index){
		var months = 0;
		var prepaidAmount = 0;
		for(i=0;i<$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.length;i++){
			if(ideType.indexOf($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType)!=-1 && $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType){
				if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[index].prepaidItemMonthsPaidCount && $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowMonthlyPaymentAmount){
					months = $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[index].prepaidItemMonthsPaidCount ? $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[index].prepaidItemMonthsPaidCount : +0;
					prepaidAmount = $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowMonthlyPaymentAmount ? $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowMonthlyPaymentAmount : +0;
					$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[index].bpAtClosing = parseFloat(months*prepaidAmount);
			    }else{
		            $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[index].bpAtClosing = '';
			    }
		    }
	    }
    }
    
    $scope.nonEscrowCalc = function(value){
    	var etiaTotalAmountInCalc = 0;
    	var nonEscrowAmountInCalc = 0;
        	nonEscrowAmountInCalc = value ? parseFloat(value) : +0;
        	etiaTotalAmountInCalc = $scope.cdformdata.integratedDisclosureDetail.firstYearTotalEscrowPaymentAmount ? parseFloat($scope.cdformdata.integratedDisclosureDetail.firstYearTotalEscrowPaymentAmount) : +0;
            $scope.cdformdata.etiaSection.projectedPaymentEstimatedTaxesInsuranceAssessmentTotalAmount = parseFloat((etiaTotalAmountInCalc+nonEscrowAmountInCalc)/12);
    }

    $scope.updateDepositAmount = function(){
    	if($scope.summariesOfTransaction_LSection.deposit) {
    	    $scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemFinalAmount = parseFloat($scope.summariesOfTransaction_LSection.deposit*-1);
    	}else{
    		$scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemFinalAmount = 0;
    	}
    	$scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemType='Deposit';
    }

    $scope.liabilityForeClosure = function(){
    	for(i=0;i<$scope.stateProperty.length;i++){
    		if($scope.stateProperty[i].state == $scope.cdformdata.closingInformation.property.stateCode){
    			$scope.cdformdata.loanCalculationsQualifiedMortgage.loanCalculationModel.deficiencyRightsPreservedIndicator = $scope.stateProperty[i].value;
    		}
    	}
    }

    $scope.updateOptionalPaymentMonthsCount = function() {
    	if($scope.cdformdata.negativeAmortization.negativeAmortizationLimitMonthsCount) {
    		$scope.cdformdata.payment.paymentRule.totalOptionalPaymentCount = $scope.cdformdata.negativeAmortization.negativeAmortizationLimitMonthsCount;
    	}
    }

    $scope.partialPaymentCheckAPP = function(){
        if($scope.cdformdata.payment.paymentRule.partialPaymentAllowedIndicatorAPP == true){
           $scope.cdformdata.payment.paymentRule.partialPaymentAllowedIndicator = true;
           $scope.cdformdata.payment.paymentRule.partialPaymentAllowedIndicatorHUCA = false;
           $scope.cdformdata.payment.paymentRule.partialPaymentAllowedIndicatorNotAccept = false;
           $scope.cdformdata.payment.partialPayments.partialPaymentModels[0].partialPaymentApplicationMethodType = 'ApplyPartialPayment';
        }else{
        	if($scope.cdformdata.payment.paymentRule.partialPaymentAllowedIndicatorAPP == false 
        		&& $scope.cdformdata.payment.paymentRule.partialPaymentAllowedIndicatorHUCA == false 
        		&& $scope.cdformdata.payment.paymentRule.partialPaymentAllowedIndicatorNotAccept == false){
        		$scope.cdformdata.payment.partialPayments.partialPaymentModels[0].partialPaymentApplicationMethodType = '';
            }
        }
    }
    $scope.partialPaymentCheckHUCA = function(){
        if($scope.cdformdata.payment.paymentRule.partialPaymentAllowedIndicatorHUCA == true){
           $scope.cdformdata.payment.paymentRule.partialPaymentAllowedIndicator = true;
           $scope.cdformdata.payment.paymentRule.partialPaymentAllowedIndicatorAPP = false;
           $scope.cdformdata.payment.paymentRule.partialPaymentAllowedIndicatorNotAccept = false;
           $scope.cdformdata.payment.partialPayments.partialPaymentModels[0].partialPaymentApplicationMethodType = 'HoldUntilCompleteAmount';
        }else{
        	if($scope.cdformdata.payment.paymentRule.partialPaymentAllowedIndicatorAPP == false 
        		&& $scope.cdformdata.payment.paymentRule.partialPaymentAllowedIndicatorHUCA == false 
        		&& $scope.cdformdata.payment.paymentRule.partialPaymentAllowedIndicatorNotAccept == false){
        		$scope.cdformdata.payment.partialPayments.partialPaymentModels[0].partialPaymentApplicationMethodType = '';
            }
        }
    }
    $scope.partialPaymentCheckNotAccept = function(){
        if($scope.cdformdata.payment.paymentRule.partialPaymentAllowedIndicatorNotAccept){
           $scope.cdformdata.payment.paymentRule.partialPaymentAllowedIndicator = false;
           $scope.cdformdata.payment.paymentRule.partialPaymentAllowedIndicatorHUCA = false;
           $scope.cdformdata.payment.paymentRule.partialPaymentAllowedIndicatorAPP = false;
           $scope.cdformdata.payment.partialPayments.partialPaymentModels[0].partialPaymentApplicationMethodType = '';
        }else{
        	if($scope.cdformdata.payment.paymentRule.partialPaymentAllowedIndicatorAPP == false 
        		&& $scope.cdformdata.payment.paymentRule.partialPaymentAllowedIndicatorHUCA == false 
        		&& $scope.cdformdata.payment.paymentRule.partialPaymentAllowedIndicatorNotAccept == false){
        		$scope.cdformdata.payment.partialPayments.partialPaymentModels[0].partialPaymentApplicationMethodType = '';
            }
        }
    }

    $scope.qualififiedCalculations = function(){

    	$scope.cdformdata.loanCalculationsQualifiedMortgage.qualifiedMortgage.regulationZTotalAffiliateFeesAmount = 
    	parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.RegulationZTotalAffiliateFeesAmount + 
    		$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.RegulationZTotalAffiliateFeesAmount + 
    		$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.RegulationZTotalAffiliateFeesAmount + 
    		$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.RegulationZTotalAffiliateFeesAmount + 
    		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.RegulationZTotalAffiliateFeesAmount + 
    		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.RegulationZTotalAffiliateFeesAmount + 
    		$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.RegulationZTotalAffiliateFeesAmount);

    	$scope.cdformdata.loanCalculationsQualifiedMortgage.qualifiedMortgage.regulationZTotalLoanAmount = 
    	parseFloat($scope.cdformdata.termsOfLoan.noteAmount ? $scope.cdformdata.termsOfLoan.noteAmount : +0)-
    	parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.RegulationZTotalLoanAmount + 
    		$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.RegulationZTotalLoanAmount + 
    		$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.RegulationZTotalLoanAmount + 
    		$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.RegulationZTotalLoanAmount + 
    		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.RegulationZTotalLoanAmount + 
    		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.RegulationZTotalLoanAmount + 
    		$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.RegulationZTotalLoanAmount);

        /*$scope.cdformdata.loanCalculationsQualifiedMortgage.qualifiedMortgage.regulationZTotalLoanAmount = 
    	parseFloat($scope.cdformdata.termsOfLoan.noteAmount ? $scope.cdformdata.termsOfLoan.noteAmount : +0);*/

    	$scope.cdformdata.loanCalculationsQualifiedMortgage.qualifiedMortgage.regulationZTotalPointsAndFeesAmount = 
    	parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.RegulationZTotalPointsAndFeesAmount + 
    		$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.RegulationZTotalPointsAndFeesAmount + 
    		$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.RegulationZTotalPointsAndFeesAmount + 
    		$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.RegulationZTotalPointsAndFeesAmount + 
    		$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.RegulationZTotalPointsAndFeesAmount + 
    		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.RegulationZTotalPointsAndFeesAmount + 
    		$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.RegulationZTotalPointsAndFeesAmount);
    }

    $scope.signatureChange = function(){
    	$scope.cdformdata.closingDisclosureDocDetails.actualSignatureTypeOtherDescription='';
    }

    $scope.calculateLateCharge = function()
	{
		$("#spinner").show();
    	cdService.lateChargeRuleFromJson($scope.cdformdata).success(function(lateChargeResponseData){
			localStorage.jsonData = JSON.stringify(lateChargeResponseData);
			initializeCDformData();
			$("#spinner").hide();
		}).error( function(data, status){
			if(data && data.message) 
				$scope.errorMsg = data.message;
			else
				$scope.errorMsg = "We have encountered an error in late charge service.";
	    	$('#ErrorModalPopup').modal('show');
    		$("#spinner").hide();
    	});
	}

    $scope.calculatePayments = function() {
    	$("#spinner").show();
    	cdService.calculatePaymentsFromJson($scope.cdformdata).success(function(calculationsData){
			if(calculationsData.errorsList) {
				$scope.calculation_errors = calculationsData.errorsList.error;
				$('#CalculateModalPopup').modal('show');
			} else if(calculationsData.closingDisclosure) {
				localStorage.jsonData = JSON.stringify(calculationsData.closingDisclosure);
				initializeCDformData();
			} else {
				$scope.errorMsg = "We have encountered an error in calculate service.";
	    		$('#ErrorModalPopup').modal('show');
			}
			$("#spinner").hide();
		}).error( function(data, status){
			$scope.errorMsg = "We have encountered an error in calculate service.";
	    	$('#ErrorModalPopup').modal('show');
    		$("#spinner").hide();
    	});
    }

  	$scope.generatePDF = function(){
    	$("#spinner").show();
    	cdService.generatePDFFromJson($scope.cdformdata).success(function(pdfData) {
		 $scope.pdfAsDataUri = "data:application/pdf;base64,"+pdfData[0].responseData;
			if(pdfData!=null){
    			var isIE = '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style;
				if (isIE == true){
					$("#commonPdf").html('');
				 	$("#pdfViewerId").show();
				 	$(".PDFDownloadIcon").show();
				$rootScope.pdfDataForIE=pdfData[0].responseData;
				$("#carousel").show();
				var pdfData1 = atob(''+pdfData[0].responseData+'');
				var loadingTask = PDFJS.getDocument({data: pdfData1});
 				var container = document.getElementById('carousel');
				loadingTask.promise.then(function(pdf) {
					var promise = Promise.resolve();
  					for (var i = 0; i < pdf.numPages; i++) {
    					promise = promise.then(function (id) {
     					return pdf.getPage(id + 1).then(function (pdfPage) {
							var SCALE = 1.0; 
							var pdfPageView = new PDFJS.PDFPageView({
						      container: container,
						      id: id,
						      scale: SCALE,
						      defaultViewport: pdfPage.getViewport(SCALE),
						      textLayerFactory: new PDFJS.DefaultTextLayerFactory(),
						      annotationLayerFactory: new PDFJS.DefaultAnnotationLayerFactory()
						    });
						    pdfPageView.setPdfPage(pdfPage);
						    return pdfPageView.draw();        
						      });
						    }.bind(null, i));
						  }
						  return promise;
					 	}), function (reason) {
						  console.error(reason);
						};
				$(".PDFCloseIcon").show();
			}
			else{
				$("#iePdf").html('');
				$("#pdfViewerId").show();
				$("#carousel").pdfSlider('init');
				$("#carousel").show();
				$(".PDFCloseIcon").show();}
	      }
			$("#spinner").hide();
    	}).error( function(data, status){
    		$("#spinner").hide();
    		$scope.errorMsg = "We have encountered an error in PDF service.";
	    	$('#ErrorModalPopup').modal('show');
    	});
    }
    $scope.closePDF = function(){
    	var isIE = '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style;
		if (isIE == true){
		 	$("#carousel").html("");
 			$("#carousel").hide();
 			$("#pdfViewerId").hide();
 			$("#closePDFdiv").hide();
 			$(".PDFDownloadIcon").hide();
		} else {
	        $("#carousel").pdfSlider('destroy');
	        $(".PDFCloseIcon").hide();
	        $("#pdfViewerId").hide();
	    }		
    }
    $scope.downloadPDF =function(){
	    var pdfDataForIE = $rootScope.pdfDataForIE;
		var fileName = "ClosingDisclosure_"+new Date().getTime()+".pdf";
	    var byteCharacters = atob(pdfDataForIE);
	    var byteNumbers = new Array(byteCharacters.length);
	    for (var i = 0; i < byteCharacters.length; i++) {
	        byteNumbers[i] = byteCharacters.charCodeAt(i);
	    }
	    var byteArray = new Uint8Array(byteNumbers);
	    var blob = new Blob([byteArray], {type: 'application/pdf'});
	    window.navigator.msSaveOrOpenBlob(blob, fileName);
    }

    $scope.generateXML = function(embeddedPDF){
    	$("#spinner").show();
    	cdService.genearateXmlFromJson($scope.cdformdata, embeddedPDF).success(function(data){
    		$scope.xmlData = data;
    		LoadXMLString("xmlViewerId",$scope.xmlData);
    		$("#xmlView").show();
    		$("#spinner").hide();
    	}).error( function(data, status){
    		$("#spinner").hide();
    	});
    }
    
 	$scope.xmlEmbeddedPDFPopup = function(){
    	var viewMenuScope = angular.element($("#ChooseEmbeddedPDF")).scope();
      	viewMenuScope.xmlTitle = "XML";
      	viewMenuScope.embeddedPDF=false;
      	$('#ChooseEmbeddedPDF').modal('show');   
    }
    $scope.generateUCDXML = function(embeddedPDF){
    	$("#spinner").show();
    	cdService.genearateUCDXmlFromJson($scope.cdformdata, embeddedPDF).success(function(data){
    		$scope.ucdxmlData = data;
    		LoadXMLString("ucdXmlViewerId",$scope.ucdxmlData);
    		$("#ucdXmlView").show();
    		$("#spinner").hide();
		}).error( function(data, status){
    		$("#spinner").hide();
    		$scope.errorMsg = "We have encountered an error in UCD xml service.";
    	});
    }
    
	$scope.validateUCD = function() {
    	$("#spinner").show();
    	cdService.genearateXmlFromJson($scope.cdformdata, true).success(function(data){
    		$scope.xmlData = data;
    		cdService.genearateUCDXml($scope.xmlData, false).success(function(data){
	    		$scope.ucdxmlData = data;
	    		cdService.validateUCDXml($scope.ucdxmlData).success(function(validationdata){
	    			var x2js = new X2JS();
				    var errors = x2js.xml_str2json(validationdata);
				    $scope.validation_errors = errors.VALIDATION_ERRORS.VALIDATION_ERROR;
                    console.log($scope.validation_errors);
                    $('#UCDValidationModalPopup').modal('show');
	    			$("#spinner").hide();
	    		}).error( function(data, status){
		    		$("#spinner").hide();
		    		$scope.errorMsg = "We have encountered an error in validate service.";
		    		$('#ErrorModalPopup').modal('show');
		    	});
	    	}).error( function(data, status){
	    		$("#spinner").hide();
	    		$scope.errorMsg = "We have encountered an error in UCD xml generation service before validate.";
	    		$('#ErrorModalPopup').modal('show');
	    	});
    	}).error( function(data, status){
    		$("#spinner").hide();
    		$scope.errorMsg = "We have encountered an error in json to xml conversion before validate.";
    		$('#ErrorModalPopup').modal('show');
    	});
    }
    
    $scope.closeXML = function(){
    	$("#xmlView").hide();
    }
    $scope.closeUCDXML = function(){
    	$("#ucdXmlView").hide();
    }

    $scope.downloadXML = function() {
    	window.URL = window.webkitURL || window.URL;
    	var xmltext = $scope.xmlData;
		var loanId = '';
		var loanIdentifiers = $scope.cdformdata.loanInformation.loanIdentifiers;
		for(var j=0; j<loanIdentifiers.length; j++) {
			if(loanIdentifiers[j].loanIdentifierType == 'LenderLoan')
				loanId = loanIdentifiers[j].loanIdentifier;
		}
		var filename = "ClosingDisclosure_"+loanId+ "_"+new Date().getTime()+'.xml';
		var bb = new Blob([xmltext], {type: 'application/octet-stream'});
        saveAs(bb, filename);
    }

    $scope.downloadUCDXML = function() {
    	window.URL = window.webkitURL || window.URL;
    	var xmltext = $scope.ucdxmlData;
		var loanId = '';
		var loanIdentifiers = $scope.cdformdata.loanInformation.loanIdentifiers;
		for(var j=0; j<loanIdentifiers.length; j++) {
			if(loanIdentifiers[j].loanIdentifierType == 'LenderLoan')
				loanId = loanIdentifiers[j].loanIdentifier;
		}
		var filename = "ClosingDisclosure_"+loanId+"_UCD"+ "_"+new Date().getTime()+'.xml';
		var bb = new Blob([xmltext], {type: 'application/octet-stream'});
        saveAs(bb, filename);
    }
     $scope.checkPrincipalInterest = function(){
    		$("#cdinitialPrincipalAndInterestPaymentAmount input").blur();
    }
     var cashToclosesCalculations = function(){
       //Calculating Cash To Close Calculations
        //Closng Costs Financed
        var diffClosingCosts = 0;
        var diffClosingCostsAtClosing = 0;
        var noteAmountPayOffDiff = 0;
        var notePersonalAmountDiff = 0;
        var personalAmountDiff = 0;
        
        //diffClosingCosts
        $scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemFinalAmount = $scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemFinalAmount ? parseFloat($scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemFinalAmount) : +0;
        $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing = $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing ? parseFloat($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing) : +0;
        diffClosingCosts = parseFloat($scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemFinalAmount*-1)-parseFloat($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing);
        
        //diffClosingCostsAtClosing
        $scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemFinalAmount = $scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemFinalAmount ? parseFloat($scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemFinalAmount) : +0;
        $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing = $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing ? parseFloat($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing) : +0;
        diffClosingCostsAtClosing = parseFloat($scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemFinalAmount)-parseFloat($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing);
        
        //noteAmountPayOffDiff
        noteAmountPayOffDiff = parseFloat($scope.cdformdata.termsOfLoan.noteAmount ? $scope.cdformdata.termsOfLoan.noteAmount : +0)-parseFloat($scope.payoffsAndPaymentsTotalAmount ? $scope.payoffsAndPaymentsTotalAmount : +0);
                
    	if($scope.cdformdata.salesContractDetail.saleContractAmount && $scope.cdformdata.salesContractDetail.saleContractAmount!=undefined){
           personalAmountDiff = ($scope.cdformdata.salesContractDetail.saleContractAmount ? parseFloat($scope.cdformdata.salesContractDetail.saleContractAmount) : +0) + ($scope.cdformdata.salesContractDetail.personalPropertyAmount ? parseFloat($scope.cdformdata.salesContractDetail.personalPropertyAmount) : +0);
    	}else if($scope.cdformdata.salesContractDetail.realPropertyAmount && $scope.cdformdata.salesContractDetail.realPropertyAmount!=undefined){
           personalAmountDiff = ($scope.cdformdata.salesContractDetail.realPropertyAmount ? parseFloat($scope.cdformdata.salesContractDetail.realPropertyAmount) : +0) + ($scope.cdformdata.salesContractDetail.personalPropertyAmount ? parseFloat($scope.cdformdata.salesContractDetail.personalPropertyAmount) : +0);
    	}

        if($scope.cdformdata.termsOfLoan.noteAmount && $scope.cdformdata.termsOfLoan.noteAmount!=undefined){
            notePersonalAmountDiff = $scope.cdformdata.termsOfLoan.noteAmount ? parseFloat($scope.cdformdata.termsOfLoan.noteAmount)-parseFloat(personalAmountDiff) : +0;
        }

        if($scope.loanBasicInfo.loanFormType == 'alternate'){
            if(diffClosingCosts<0){
                $scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemFinalAmount = 0;
            }else if(noteAmountPayOffDiff > diffClosingCosts){
                $scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemFinalAmount = Math.round(parseFloat(diffClosingCosts));
            }else if(noteAmountPayOffDiff <= 0){
                $scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemFinalAmount = 0;
            }else{
                $scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemFinalAmount = Math.round(parseFloat(noteAmountPayOffDiff));
            }
        }else{
            if(diffClosingCostsAtClosing<0){
                $scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemFinalAmount = 0;
            }else if(notePersonalAmountDiff >= 0){
                $scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemFinalAmount = Math.round(parseFloat(notePersonalAmountDiff*-1));
            }else if(notePersonalAmountDiff < 0){
                $scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemFinalAmount = 0;
            }
        }
        $scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemType = 'ClosingCostsFinanced';
     
        //Down Payment
        var closingCostsfinanced = 0;
        var noteAmount = 0;
        var noteAndFinancedAmount = 0;
        var salePriceValue = personalAmountDiff-parseFloat($scope.cdformdata.salesContractDetail.personalPropertyAmount ? $scope.cdformdata.salesContractDetail.personalPropertyAmount : +0);
        noteAmount = $scope.cdformdata.termsOfLoan.noteAmount ? parseFloat($scope.cdformdata.termsOfLoan.noteAmount) : +0;
        closingCostsfinanced = $scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemFinalAmount ? parseFloat($scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemFinalAmount) : +0;
        noteAndFinancedAmount = parseFloat(noteAmount+closingCostsfinanced);

        if(noteAmount>salePriceValue){
        	$scope.cdformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemFinalAmount = 0;
        }else if(noteAmount<salePriceValue){
        	$scope.cdformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemFinalAmount = Math.round(parseFloat(salePriceValue-noteAndFinancedAmount));
        }

        $scope.cdformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemType = 'DownPayment';

        //Funds For Borrower
        if($scope.loanBasicInfo.loanPurposeType == 'purchase'){
		    if(noteAmount>personalAmountDiff){
			    $scope.cdformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemFinalAmount = Math.round(parseFloat(personalAmountDiff-noteAndFinancedAmount));
			}else if(noteAmount<personalAmountDiff){
			    $scope.cdformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemFinalAmount = 0;
			}
		}
		$scope.cdformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemType = 'FundsForBorrower';
		
		//Calculating Cash To Close
		//Adjustments And Other Credits
		if($scope.loanBasicInfo.loanFormType == 'standard') {
	        $scope.adjustmentsAndProrationsAmountsKSection = $scope.adjustmentsAndProrationsAmountsKSection ? parseFloat($scope.adjustmentsAndProrationsAmountsKSection) : +0;
			$scope.adjustmentsAndProrationsAmountsLSection = $scope.adjustmentsAndProrationsAmountsLSection ? parseFloat($scope.adjustmentsAndProrationsAmountsLSection) : +0;
	        $scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemFinalAmount = Math.round(parseFloat($scope.cdformdata.salesContractDetail.personalPropertyAmount ? $scope.cdformdata.salesContractDetail.personalPropertyAmount : +0)+parseFloat($scope.adjustmentsAndProrationsAmountsKSection)-parseFloat($scope.adjustmentsAndProrationsAmountsLSection)-parseFloat($scope.summariesOfTransaction_LSection.subordinateLien.closingAdjustmentItemAmount ? $scope.summariesOfTransaction_LSection.subordinateLien.closingAdjustmentItemAmount : +0));
        }
        $scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemType = 'AdjustmentsAndOtherCredits';
    }

    $scope.$watchCollection('[cdformdata.loanInformation.loanTermYears, cdformdata.loanInformation.loanTermMonths, cdformdata.closingInformationDetail.closingDate]', function(newValues, oldValues){
    	$scope.cdformdata.maturityRule.loanMaturityPeriodCount = 0;
    	if($scope.cdformdata.loanInformation.loanTermYears)
    		$scope.cdformdata.maturityRule.loanMaturityPeriodCount = parseInt($scope.cdformdata.loanInformation.loanTermYears * 12);
    	if($scope.cdformdata.loanInformation.loanTermMonths)
    		$scope.cdformdata.maturityRule.loanMaturityPeriodCount = $scope.cdformdata.maturityRule.loanMaturityPeriodCount + parseInt($scope.cdformdata.loanInformation.loanTermMonths);
    	$scope.cdformdata.maturityRule.loanMaturityPeriodType = 'Month';
        
        if($scope.cdformdata.closingInformationDetail.closingDate && $scope.cdformdata.closingInformationDetail.closingDate!=undefined){
			$scope.cdformdata.disbursementMinDate = $filter('date')(add_business_days_disbursement($scope.cdformdata.closingInformationDetail.closingDate, 1), 'yyyy-MM-dd');
			$scope.cdformdata.closingInformationDetail.disbursementDate = $filter('date')(add_business_days_disbursement($scope.cdformdata.closingInformationDetail.closingDate, 1), 'yyyy-MM-dd');
		}
        //Confirm Receipt Execution Date
		if($scope.cdformdata.closingInformationDetail.closingDate && $scope.cdformdata.closingInformationDetail.closingDate!=undefined){
	        $scope.cdformdata.closingDisclosureDocDetails.executionDate = $scope.cdformdata.closingDisclosureDocDetails.executionDate ? $scope.cdformdata.closingDisclosureDocDetails.executionDate : $scope.cdformdata.closingInformationDetail.closingDate;
        }

    });

    $scope.$watch('cdformdata.loanDetail.negativeAmortizationIndicator', function(newValue, oldValue){
    	if($scope.cdformdata.loanDetail.negativeAmortizationIndicator) {
    		$scope.cdformdata.loanDetail.loanAmountIncreaseIndicator = true;
    		$scope.cdformdata.payment.paymentRule.paymentOptionIndicator = true;
    	}
    	else {
    		$scope.cdformdata.loanDetail.loanAmountIncreaseIndicator = false;
    		$scope.cdformdata.negativeAmortization.negativeAmortizationType = '';
    		$scope.cdformdata.negativeAmortization.negativeAmortizationMaximumLoanBalanceAmount = '';
    		$scope.cdformdata.negativeAmortization.negativeAmortizationLimitMonthsCount = '';
    	}
    }, true);

    $scope.$watch('cdformdata.interestRateAdjustment', function(newValue, oldValue){
    	if($scope.cdformdata.interestRateAdjustment.firstPerChangeMaximumIncreaseRatePercent || $scope.cdformdata.interestRateAdjustment.firstPerChangeRateAdjustmentFrequencyMonthsCount) {
    		$scope.cdformdata.interestRateAdjustment.firstAdjustmentRule = 'First';
    	}
    	if($scope.cdformdata.interestRateAdjustment.subsequentPerChangeMaximumIncreaseRatePercent || $scope.cdformdata.interestRateAdjustment.subsequentPerChangeRateAdjustmentFrequencyMonthsCount) {
    		$scope.cdformdata.interestRateAdjustment.subsequentAdjustmentRule = 'Subsequent';
    	}
    }, true);

    $scope.$watch('cdformdata.principalAndInterestPaymentAdjustment', function(newValue, oldValue){
    	if($scope.cdformdata.principalAndInterestPaymentAdjustment.firstPerChangePrincipalAndInterestPaymentAdjustmentFrequencyMonthsCount) {
    		$scope.cdformdata.principalAndInterestPaymentAdjustment.firstAdjustmentRuleType = 'First';
    	}
    	if($scope.cdformdata.principalAndInterestPaymentAdjustment.subsequentPerChangePrincipalAndInterestPaymentAdjustmentFrequencyMonthsCount) {
    		$scope.cdformdata.principalAndInterestPaymentAdjustment.subsequentAdjustmentRuleType = 'Subsequent';
    	}
    }, true);
    
    $scope.$watch('cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing', function(newValue, oldValue){
    	if($scope.loanBasicInfo.loanFormType == 'standard'){
	    	 if($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing && $scope.cdformdata.closingCostsTotal.lenderCredits) {
	    		$scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing = parseFloat($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing) + parseFloat($scope.cdformdata.closingCostsTotal.lenderCredits);
	    		$scope.summariesOfTransaction_NSection.closingCostsPaidAtClosing = $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing;
	    	}else if($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing) {
	    		$scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing = parseFloat($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing);
	    		$scope.summariesOfTransaction_NSection.closingCostsPaidAtClosing = $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing;
	    	}
	    	else {
	    		$scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing = 0;
	    		$scope.summariesOfTransaction_NSection.closingCostsPaidAtClosing = 0;
	    	}
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
    $scope.cdformdata['totalAffiliateAmount'] = 0;
	//This watch will trigger any change happens in the amount of 
	$scope.$watch('cdformdata.closingCostDetailsLoanCosts.originationCharges', function(newValue, oldValue) {
		 bpAtClosing.originationChargeTotalbpAtClosing = 0;
		 bpB4Closing.originationChargeTotalbpB4Closing = 0;
		 spAtClosing.originationChargeTotalspAtClosing = 0;
		 spB4Closing.originationChargeTotalspB4Closing = 0;
		 paidByOthers.originationChargeTotalpaidByOthers = 0;
		 $scope.escrowWaiverFeeAmount = 0;
		 $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.RegulationZTotalAffiliateFeesAmount=0;
		 $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.RegulationZTotalLoanAmount=0;
		 $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.RegulationZTotalPointsAndFeesAmount=0;
        
        for(i=0; i<$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.length; i++) {
            
            /*if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].feeType == 'LoanDiscountPoints'){
            	 $scope.loanDiscount(i);
            }*/

        	if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].feeType=='EscrowWaiverFee'){
        		if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].feeActualTotalAmount!=undefined && $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].feeActualTotalAmount)
            	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpAtClosing = $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].feeActualTotalAmount;
            }
            if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].feeType!='Other'){
            	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].feeTypeOtherDescription='';
            }

            if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].paidByOthers==''|| $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].paidByOthers==null 
            	|| $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].paidByOthers=='0' || $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].paidByOthers=='0.00'){
            	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].lenderStatus=false;
            }

         	bpAtClosing.originationChargeTotalbpAtClosing += $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpAtClosing) : +0;
         	bpB4Closing.originationChargeTotalbpB4Closing += $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpB4Closing) : +0;
         	spAtClosing.originationChargeTotalspAtClosing += $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spAtClosing) : +0;
          	spB4Closing.originationChargeTotalspB4Closing += $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spB4Closing) : +0;
          	paidByOthers.originationChargeTotalpaidByOthers += $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].paidByOthers ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].paidByOthers) : +0;
            
            for(j=0; j<$scope.sectionAfeeTypes.length; j++){
				if($scope.sectionAfeeTypes[j].value == $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].feeType) {
					if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].feeType!='Other'){
					   //$scope.sectionAfeeTypes[j].disabled = true;
					}
				} 
		    }

            if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].paymentIncludedInAPRIndicator==null){
            	$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].paymentIncludedInAPRIndicator='';
            }
            
            //Escrow Waiver Fee Calculation
            if(($scope.escrowWaiverFeeAmount=="0.00" || $scope.escrowWaiverFeeAmount=="0") && $scope.escrowWaiverFeeAmount==''){
		        if($scope.cdformdata.loanDetail.escrowIndicator==false && $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].feeType =='EscrowWaiverFee'){
		            if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpAtClosing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpAtClosing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpB4Closing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpB4Closing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spAtClosing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spAtClosing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spB4Closing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spB4Closing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].paidByOthers){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].paidByOthers);
		            }
		        }
		    }

            //RegulationZTotalLoanAmount, RegulationZTotalAffiliateFeesAmount, RegulationZTotalPointsAndFeesAmount

            if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].feePaidToTypeOtherDescription=='BrokerAffiliate' 
            	|| $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].feePaidToTypeOtherDescription=='LenderAffiliate'){
                if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpAtClosing){
	               $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpB4Closing){
	               $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpB4Closing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spAtClosing){
	               $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spB4Closing){
	               $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spB4Closing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].paidByOthers){
	               $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].paidByOthers ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].paidByOthers) : +0;
	            }
            }

            if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].paymentIncludedInAPRIndicator==true){
                if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpAtClosing){
	               $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.RegulationZTotalLoanAmount += $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpB4Closing){
	               $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.RegulationZTotalLoanAmount += $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpB4Closing) : +0;
	            }
            }

            if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].regulationZPointsAndFeesIndicator==true){
                if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpAtClosing){
	               $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpB4Closing){
	               $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpB4Closing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spAtClosing){
	               $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spB4Closing){
	               $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spB4Closing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].paidByOthers){
	               $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].paidByOthers ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].paidByOthers) : +0;
	            }
            }

            //
         }

        for(i=0; i<$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.length; i++) {
        	if(($scope.escrowWaiverFeeAmount=="0.00" || $scope.escrowWaiverFeeAmount=="0") && $scope.escrowWaiverFeeAmount==''){
		        if($scope.cdformdata.loanDetail.escrowIndicator==false && $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].feeType =='EscrowWaiverFee'){
		            if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpAtClosing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpAtClosing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpB4Closing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpB4Closing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spAtClosing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spAtClosing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spB4Closing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spB4Closing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].paidByOthers){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].paidByOthers);
		            }
		        }
		    }
        }

        for(i=0; i<$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.length; i++) {
            if(($scope.escrowWaiverFeeAmount=="0.00" || $scope.escrowWaiverFeeAmount=="0") && $scope.escrowWaiverFeeAmount==''){
		        if($scope.cdformdata.loanDetail.escrowIndicator==false && $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].feeType =='EscrowWaiverFee'){
		            if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpAtClosing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpAtClosing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpB4Closing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpB4Closing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spAtClosing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spAtClosing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spB4Closing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spB4Closing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].paidByOthers){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].paidByOthers);
		            }
		        }
	        }
	    }


         $scope.cdformdata.closingCostDetailsLoanCosts.ocTotalAmount = bpAtClosing.originationChargeTotalbpAtClosing + bpB4Closing.originationChargeTotalbpB4Closing;
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpAtClosing = parseFloat(bpAtClosing.originationChargeTotalbpAtClosing) + parseFloat(bpAtClosing.sbDidNotShopTotalbpAtClosing) + parseFloat(bpAtClosing.sbDidShopTotalbpAtClosing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpB4Closing = parseFloat(bpB4Closing.originationChargeTotalbpB4Closing) + parseFloat(bpB4Closing.sbDidNotShopTotalbpB4Closing) + parseFloat(bpB4Closing.sbDidShopTotalbpB4Closing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spAtClosing = parseFloat(spAtClosing.originationChargeTotalspAtClosing) + parseFloat(spAtClosing.sbDidNotShopTotalspAtClosing) + parseFloat(spAtClosing.sbDidShopTotalspAtClosing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spB4Closing = parseFloat(spB4Closing.originationChargeTotalspB4Closing) + parseFloat(spB4Closing.sbDidNotShopTotalspB4Closing) + parseFloat(spB4Closing.sbDidShopTotalspB4Closing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers = parseFloat(paidByOthers.originationChargeTotalpaidByOthers) + parseFloat(paidByOthers.sbDidNotShopTotalpaidByOthers) + parseFloat(paidByOthers.sbDidShopTotalpaidByOthers);
         
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.ocTotalAmount ? $scope.cdformdata.closingCostDetailsLoanCosts.ocTotalAmount : +0)+parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopTotalAmount ? $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopTotalAmount : +0)+parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopTotalAmount ? $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopTotalAmount : +0);
         $scope.cdformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostsTotal.lenderCredits=='' || $scope.cdformdata.closingCostsTotal.lenderCredits==undefined ? +0 : $scope.cdformdata.closingCostsTotal.lenderCredits);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpB4Closing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpB4Closing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spB4Closing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spB4Closing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.paidByOthers = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers);
        
        if($scope.loanBasicInfo.loanFormType == 'standard'){
	        if($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing && $scope.cdformdata.closingCostsTotal.lenderCredits) {
	    		$scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing = parseFloat($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing) + parseFloat($scope.cdformdata.closingCostsTotal.lenderCredits);
	    		$scope.summariesOfTransaction_NSection.closingCostsPaidAtClosing = $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing;
	    	}else if($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing) {
	    		$scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing = parseFloat($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing);
	    		$scope.summariesOfTransaction_NSection.closingCostsPaidAtClosing = $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing;
	    	}
	    	else {
	    		$scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing = 0;
	    		$scope.summariesOfTransaction_NSection.closingCostsPaidAtClosing = 0;
	    	}
	    }

	    $scope.qualififiedCalculations();

    }, true);

    $scope.$watch('cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors', function(newValue, oldValue) {
    	 bpAtClosing.sbDidNotShopTotalbpAtClosing = 0;
    	 bpB4Closing.sbDidNotShopTotalbpB4Closing = 0;
    	 spAtClosing.sbDidNotShopTotalspAtClosing = 0;
		 spB4Closing.sbDidNotShopTotalspB4Closing = 0;
		 paidByOthers.sbDidNotShopTotalpaidByOthers = 0;
         $scope.escrowWaiverFeeAmount = 0;
         $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.RegulationZTotalAffiliateFeesAmount=0;
		 $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.RegulationZTotalLoanAmount=0;
		 $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.RegulationZTotalPointsAndFeesAmount=0;

        for(i=0; i<$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.length; i++) {
            if(($scope.escrowWaiverFeeAmount=="0.00" || $scope.escrowWaiverFeeAmount=="0") && $scope.escrowWaiverFeeAmount==''){
		        if($scope.cdformdata.loanDetail.escrowIndicator==false && $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].feeType =='EscrowWaiverFee'){
		            if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpAtClosing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpAtClosing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpB4Closing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpB4Closing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spAtClosing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spAtClosing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spB4Closing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spB4Closing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].paidByOthers){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].paidByOthers);
		            }
		        }
	        }
	    }

        for(i=0; i<$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.length; i++) {
        	if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].feeType=='EscrowWaiverFee'){
        		if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].feeActualTotalAmount!=undefined && $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].feeActualTotalAmount)
            	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpAtClosing = $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].feeActualTotalAmount;
            }
            if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].feeType!='Other'){
            	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].feeTypeOtherDescription='';
            }

         	bpAtClosing.sbDidNotShopTotalbpAtClosing += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpAtClosing) : +0;
         	bpB4Closing.sbDidNotShopTotalbpB4Closing += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpB4Closing) : +0;
         	spAtClosing.sbDidNotShopTotalspAtClosing += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spAtClosing) : +0;
          	spB4Closing.sbDidNotShopTotalspB4Closing += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spB4Closing) : +0;
          	paidByOthers.sbDidNotShopTotalpaidByOthers += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].paidByOthers ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].paidByOthers) : +0;
      
          	//Escrow Waiver Fee Calculation
            if(($scope.escrowWaiverFeeAmount=="0.00" || $scope.escrowWaiverFeeAmount=="0") && $scope.escrowWaiverFeeAmount==''){
		        if($scope.cdformdata.loanDetail.escrowIndicator==false && $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].feeType =='EscrowWaiverFee'){
		            if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpAtClosing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpAtClosing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpB4Closing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpB4Closing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spAtClosing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spAtClosing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spB4Closing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spB4Closing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].paidByOthers){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].paidByOthers);
		            }
		        }
		    }

	        for(j=0; j<$scope.sectionBfeeTypes.length; j++){
				if($scope.sectionBfeeTypes[j].value == $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].feeType) {
					if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].feeType!='Other'){
					   //$scope.sectionBfeeTypes[j].disabled = true;
					}
				} 
		    }

		    if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].paymentIncludedInAPRIndicator==null){
            	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].paymentIncludedInAPRIndicator='';
            }

            if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].feePaidToTypeOtherDescription=='BrokerAffiliate' 
            	|| $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].feePaidToTypeOtherDescription=='LenderAffiliate'){
                if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpAtClosing){
	               $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpB4Closing){
	               $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpB4Closing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spAtClosing){
	               $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spB4Closing){
	               $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spB4Closing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].paidByOthers){
	               $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].paidByOthers ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].paidByOthers) : +0;
	            }
            }

            if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].paymentIncludedInAPRIndicator==true){
                if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpAtClosing){
	               $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.RegulationZTotalLoanAmount += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpB4Closing){
	               $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.RegulationZTotalLoanAmount += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpB4Closing) : +0;
	            }
            }

            if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].regulationZPointsAndFeesIndicator==true){
                if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpAtClosing){
	               $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpB4Closing){
	               $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpB4Closing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spAtClosing){
	               $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spB4Closing){
	               $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spB4Closing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].paidByOthers){
	               $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].paidByOthers ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].paidByOthers) : +0;
	            }
            }

         }

         for(i=0; i<$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.length; i++) {
            if(($scope.escrowWaiverFeeAmount=="0.00" || $scope.escrowWaiverFeeAmount=="0") && $scope.escrowWaiverFeeAmount==''){
		        if($scope.cdformdata.loanDetail.escrowIndicator==false && $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].feeType =='EscrowWaiverFee'){
		            if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpAtClosing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpAtClosing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpB4Closing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpB4Closing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spAtClosing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spAtClosing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spB4Closing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spB4Closing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].paidByOthers){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].paidByOthers);
		            }
		        }
	        }
		}

         $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopTotalAmount = parseFloat(bpAtClosing.sbDidNotShopTotalbpAtClosing) + parseFloat(bpB4Closing.sbDidNotShopTotalbpB4Closing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpAtClosing = parseFloat(bpAtClosing.originationChargeTotalbpAtClosing) + parseFloat(bpAtClosing.sbDidNotShopTotalbpAtClosing) + parseFloat(bpAtClosing.sbDidShopTotalbpAtClosing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpB4Closing = parseFloat(bpB4Closing.originationChargeTotalbpB4Closing) + parseFloat(bpB4Closing.sbDidNotShopTotalbpB4Closing) + parseFloat(bpB4Closing.sbDidShopTotalbpB4Closing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spAtClosing = parseFloat(spAtClosing.originationChargeTotalspAtClosing) + parseFloat(spAtClosing.sbDidNotShopTotalspAtClosing) + parseFloat(spAtClosing.sbDidShopTotalspAtClosing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spB4Closing = parseFloat(spB4Closing.originationChargeTotalspB4Closing) + parseFloat(spB4Closing.sbDidNotShopTotalspB4Closing) + parseFloat(spB4Closing.sbDidShopTotalspB4Closing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers = parseFloat(paidByOthers.originationChargeTotalpaidByOthers) + parseFloat(paidByOthers.sbDidNotShopTotalpaidByOthers) + parseFloat(paidByOthers.sbDidShopTotalpaidByOthers);
         
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.ocTotalAmount ? $scope.cdformdata.closingCostDetailsLoanCosts.ocTotalAmount : +0)+parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopTotalAmount ? $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopTotalAmount : +0)+parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopTotalAmount ? $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopTotalAmount : +0);
         $scope.cdformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostsTotal.lenderCredits=='' || $scope.cdformdata.closingCostsTotal.lenderCredits==undefined ? +0 : $scope.cdformdata.closingCostsTotal.lenderCredits);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpB4Closing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpB4Closing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spB4Closing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spB4Closing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.paidByOthers = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers);
        
        if($scope.loanBasicInfo.loanFormType == 'standard'){
	        if($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing && $scope.cdformdata.closingCostsTotal.lenderCredits) {
	    		$scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing = parseFloat($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing) + parseFloat($scope.cdformdata.closingCostsTotal.lenderCredits);
	    		$scope.summariesOfTransaction_NSection.closingCostsPaidAtClosing = $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing;
	    	}else if($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing) {
	    		$scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing = parseFloat($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing);
	    		$scope.summariesOfTransaction_NSection.closingCostsPaidAtClosing = $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing;
	    	}
	    	else {
	    		$scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing = 0;
	    		$scope.summariesOfTransaction_NSection.closingCostsPaidAtClosing = 0;
	    	}
        }
        
        $scope.qualififiedCalculations();

    }, true);

    $scope.$watch('cdformdata.closingCostDetailsLoanCosts.sbDidShopFors', function(newValue, oldValue) {
    	 bpAtClosing.sbDidShopTotalbpAtClosing = 0;
    	 bpB4Closing.sbDidShopTotalbpB4Closing = 0;
    	 spAtClosing.sbDidShopTotalspAtClosing = 0;
		 spB4Closing.sbDidShopTotalspB4Closing = 0;
		 paidByOthers.sbDidShopTotalpaidByOthers = 0;
         $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.RegulationZTotalAffiliateFeesAmount=0;
		 $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.RegulationZTotalLoanAmount=0;
		 $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.RegulationZTotalPointsAndFeesAmount=0;

         //Escrow Waiver Fee Calculation
         $scope.escrowWaiverFeeAmount = 0;
         for(i=0; i<$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.length; i++) {
            if(($scope.escrowWaiverFeeAmount=="0.00" || $scope.escrowWaiverFeeAmount=="0") && $scope.escrowWaiverFeeAmount==''){
		        if($scope.cdformdata.loanDetail.escrowIndicator==false && $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].feeType =='EscrowWaiverFee'){
		            if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpAtClosing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpAtClosing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpB4Closing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpB4Closing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spAtClosing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spAtClosing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spB4Closing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].spB4Closing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].paidByOthers){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].paidByOthers);
		            }
		        }
	        }
	    }

         for(i=0; i<$scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors.length; i++) {
	        if(($scope.escrowWaiverFeeAmount=="0.00" || $scope.escrowWaiverFeeAmount=="0") && $scope.escrowWaiverFeeAmount==''){
	            if($scope.cdformdata.loanDetail.escrowIndicator==false && $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].feeType =='EscrowWaiverFee'){
	                if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpAtClosing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpAtClosing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpB4Closing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].bpB4Closing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spAtClosing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spAtClosing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spB4Closing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].spB4Closing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].paidByOthers){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopFors[i].paidByOthers);
		            }
	            }
	        }
         }

         for(i=0; i<$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.length; i++) {
         	if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].feeType=='EscrowWaiverFee'){
        		if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].feeActualTotalAmount!=undefined && $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].feeActualTotalAmount)
            	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpAtClosing = $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].feeActualTotalAmount;
            }

            if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].feeType!='Other'){
            	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].feeTypeOtherDescription='';
            }
            
         	bpAtClosing.sbDidShopTotalbpAtClosing += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpAtClosing) : +0;
         	bpB4Closing.sbDidShopTotalbpB4Closing += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpB4Closing) : +0;
         	spAtClosing.sbDidShopTotalspAtClosing += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spAtClosing) : +0;
          	spB4Closing.sbDidShopTotalspB4Closing += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spB4Closing) : +0;
          	paidByOthers.sbDidShopTotalpaidByOthers += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].paidByOthers ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].paidByOthers) : +0;
        
            //Escrow Waiver Fee Calculation
            if(($scope.escrowWaiverFeeAmount=="0.00" || $scope.escrowWaiverFeeAmount=="0") && $scope.escrowWaiverFeeAmount==''){
		        if($scope.cdformdata.loanDetail.escrowIndicator==false && $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].feeType =='EscrowWaiverFee'){
		            if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpAtClosing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpAtClosing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpB4Closing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpB4Closing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spAtClosing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spAtClosing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spB4Closing){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spB4Closing);
		            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].paidByOthers){
		               $scope.escrowWaiverFeeAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].paidByOthers);
		            }
		        }
	        }

	        for(j=0; j<$scope.sectionCfeeTypes.length; j++){
				if($scope.sectionCfeeTypes[j].value == $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].feeType) {
					if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].feeType!='Other'){
					   //$scope.sectionCfeeTypes[j].disabled = true;
					}
				} 
		    }

		    if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].paymentIncludedInAPRIndicator==null){
            	$scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].paymentIncludedInAPRIndicator='';
            }

             //RegulationZTotalLoanAmount, RegulationZTotalAffiliateFeesAmount, RegulationZTotalPointsAndFeesAmount

            if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].feePaidToTypeOtherDescription=='BrokerAffiliate' 
            	|| $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].feePaidToTypeOtherDescription=='LenderAffiliate'){
                if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpAtClosing){
	               $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpB4Closing){
	               $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpB4Closing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spAtClosing){
	               $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spB4Closing){
	               $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spB4Closing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].paidByOthers){
	               $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].paidByOthers ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].paidByOthers) : +0;
	            }
            }

            if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].paymentIncludedInAPRIndicator==true){
                if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpAtClosing){
	               $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.RegulationZTotalLoanAmount += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpB4Closing){
	               $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.RegulationZTotalLoanAmount += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpB4Closing) : +0;
	            }
            }

            if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].regulationZPointsAndFeesIndicator==true){
                if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpAtClosing){
	               $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpB4Closing){
	               $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].bpB4Closing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spAtClosing){
	               $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spB4Closing){
	               $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].spB4Closing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].paidByOthers){
	               $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].paidByOthers ? parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopFors[i].paidByOthers) : +0;
	            }
            }
         }
         $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopTotalAmount = bpAtClosing.sbDidShopTotalbpAtClosing + bpB4Closing.sbDidShopTotalbpB4Closing;
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpAtClosing = parseFloat(bpAtClosing.originationChargeTotalbpAtClosing) + parseFloat(bpAtClosing.sbDidNotShopTotalbpAtClosing) + parseFloat(bpAtClosing.sbDidShopTotalbpAtClosing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpB4Closing = parseFloat(bpB4Closing.originationChargeTotalbpB4Closing) + parseFloat(bpB4Closing.sbDidNotShopTotalbpB4Closing) + parseFloat(bpB4Closing.sbDidShopTotalbpB4Closing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spAtClosing = parseFloat(spAtClosing.originationChargeTotalspAtClosing) + parseFloat(spAtClosing.sbDidNotShopTotalspAtClosing) + parseFloat(spAtClosing.sbDidShopTotalspAtClosing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spB4Closing = parseFloat(spB4Closing.originationChargeTotalspB4Closing) + parseFloat(spB4Closing.sbDidNotShopTotalspB4Closing) + parseFloat(spB4Closing.sbDidShopTotalspB4Closing);
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers = parseFloat(paidByOthers.originationChargeTotalpaidByOthers) + parseFloat(paidByOthers.sbDidNotShopTotalpaidByOthers) + parseFloat(paidByOthers.sbDidShopTotalpaidByOthers);
         
         $scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.ocTotalAmount ? $scope.cdformdata.closingCostDetailsLoanCosts.ocTotalAmount : +0)+parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopTotalAmount ? $scope.cdformdata.closingCostDetailsLoanCosts.sbDidNotShopTotalAmount : +0)+parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopTotalAmount ? $scope.cdformdata.closingCostDetailsLoanCosts.sbDidShopTotalAmount : +0);
         $scope.cdformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostsTotal.lenderCredits=='' || $scope.cdformdata.closingCostsTotal.lenderCredits==undefined ? +0 : $scope.cdformdata.closingCostsTotal.lenderCredits);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpB4Closing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpB4Closing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spB4Closing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spB4Closing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.paidByOthers = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers);
         
        if($scope.loanBasicInfo.loanFormType == 'standard'){
	        if($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing && $scope.cdformdata.closingCostsTotal.lenderCredits) {
	    		$scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing = parseFloat($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing) + parseFloat($scope.cdformdata.closingCostsTotal.lenderCredits);
	    		$scope.summariesOfTransaction_NSection.closingCostsPaidAtClosing = $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing;
	    	}else if($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing) {
	    		$scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing = parseFloat($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing);
	    		$scope.summariesOfTransaction_NSection.closingCostsPaidAtClosing = $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing;
	    	}
	    	else {
	    		$scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing = 0;
	    		$scope.summariesOfTransaction_NSection.closingCostsPaidAtClosing = 0;
	    	}
        }
        
        $scope.qualififiedCalculations();

    }, true);

	$scope.$watch('recordingFeetotalObj', function(newValue, oldValue) {
		if(newValue.recordingFeeForDeed!=oldValue.recordingFeeForDeed || newValue.recordingFeeForMortgage!=oldValue.recordingFeeForMortgage) {
			newValue.bpAtClosing = 0;
			if(newValue.recordingFeeForDeed)
				newValue.bpAtClosing += parseFloat(newValue.recordingFeeForDeed);
			if(newValue.recordingFeeForMortgage)
				newValue.bpAtClosing += parseFloat(newValue.recordingFeeForMortgage);
		}
		var recordingFeeForDeed = {
            "bpAtClosing": "",
            "bpB4Closing": "",
            "spAtClosing": "",
            "spB4Closing": "",
            "paidByOthers": "",
            "lenderStatus": false,
            "displayLabel": null,
            "feePaidToFullName": "",
            "feeActualTotalAmount": $scope.recordingFeetotalObj.recordingFeeForDeed,
            "feePaidToType": "",
            "feePaidToTypeOtherDescription": "",
            "feePercentBasisType": "",
            "feeTotalPercent": "",
            "feeType": "RecordingFeeForDeed",
            "feeTypeOtherDescription": "",
            "integratedDisclosureSectionType": "TaxesAndOtherGovernmentFees",
            "optionalCostIndicator": null,
            "regulationZPointsAndFeesIndicator": null,
            "paymentIncludedInAPRIndicator": false
        };
		var recordingFeeForMortgage = {
            "bpAtClosing": "",
            "bpB4Closing": "",
            "spAtClosing": "",
            "spB4Closing": "",
            "paidByOthers": "",
            "lenderStatus": false,
            "displayLabel": null,
            "feePaidToFullName": "",
            "feeActualTotalAmount": $scope.recordingFeetotalObj.recordingFeeForMortgage,
            "feePaidToType": "",
            "feePaidToTypeOtherDescription": "",
            "feePercentBasisType": "",
            "feeTotalPercent": "",
            "feeType": "RecordingFeeForMortgage",
            "feeTypeOtherDescription": "",
            "integratedDisclosureSectionType": "TaxesAndOtherGovernmentFees",
            "optionalCostIndicator": null,
            "regulationZPointsAndFeesIndicator": null,
            "paymentIncludedInAPRIndicator": false
        };
		var recordingFeeForTotal = {
            "bpAtClosing": $scope.recordingFeetotalObj.bpAtClosing,
            "bpB4Closing": $scope.recordingFeetotalObj.bpB4Closing,
            "spAtClosing": $scope.recordingFeetotalObj.spAtClosing,
            "spB4Closing": $scope.recordingFeetotalObj.spB4Closing,
            "paidByOthers": $scope.recordingFeetotalObj.paidByOthers,
            "lenderStatus": $scope.recordingFeetotalObj.lenderStatus,
            "displayLabel": "",
            "feePaidToFullName": "",
            "feeActualTotalAmount": "",
            "feePaidToType": $scope.recordingFeetotalObj.feePaidToType,
            "feePaidToTypeOtherDescription": $scope.recordingFeetotalObj.feePaidToTypeOtherDescription,
            "feePercentBasisType": "",
            "feeTotalPercent": "",
            "feeType": "RecordingFeeTotal",
            "feeTypeOtherDescription": "",
            "integratedDisclosureSectionType": "TaxesAndOtherGovernmentFees",
            "optionalCostIndicator": null,
            "regulationZPointsAndFeesIndicator": null,
            "paymentIncludedInAPRIndicator": $scope.recordingFeetotalObj.paymentIncludedInAPRIndicator
        };
        for(i=0; i<$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.length; i++) {
        	if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType=='RecordingFeeForDeed' ||
        		$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType=='RecordingFeeForMortgage' ||
        		$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType=='RecordingFeeTotal') {
        		$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.splice(i,1);
			i--;
		}
        }
        if(recordingFeeForDeed.feeActualTotalAmount){
            $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.push(recordingFeeForDeed);
        }
        if(recordingFeeForMortgage.feeActualTotalAmount){
            $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.push(recordingFeeForMortgage);
        }
        if(recordingFeeForTotal.bpAtClosing || recordingFeeForTotal.bpB4Closing || recordingFeeForTotal.spAtClosing
		|| recordingFeeForTotal.spB4Closing || recordingFeeForTotal.paidByOthers){
            $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.push(recordingFeeForTotal);
        }
	}, true);

    $scope.$watch('cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList', function(newValue, oldValue) {
		bpAtClosing.tOGovtFeesTotalbpAtClosing = 0;
		bpB4Closing.tOGovtFeesTotalbpB4Closing = 0;
		spAtClosing.tOGovtFeesTotalspAtClosing = 0;
		spB4Closing.tOGovtFeesTotalspB4Closing = 0;
		paidByOthers.tOGovtFeesTotalpaidByOthers = 0;
		$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.RegulationZTotalAffiliateFeesAmount=0;
		$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.RegulationZTotalLoanAmount=0;
		$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.RegulationZTotalPointsAndFeesAmount=0;

		for(i=0; i<$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.length; i++) {
		if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType=='RecordingFeeForDeed' ||
			$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType=='RecordingFeeForMortgage' ||
			$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType=='RecordingFeeTotal') {
			$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.splice(i,1);
			i--;
		}
        }
        if($scope.recordingFeetotalObj.recordingFeeForDeed){
		var recordingDeedFees = angular.copy(tOGovtFees);
			recordingDeedFees.feeType = 'RecordingFeeForDeed';
			recordingDeedFees.feePaidToType = '';
			recordingDeedFees.feeActualTotalAmount = $scope.recordingFeetotalObj.recordingFeeForDeed;
            $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.push(recordingDeedFees);
        }
        if($scope.recordingFeetotalObj.recordingFeeForMortgage){
		var recordingMortgageFees = angular.copy(tOGovtFees);
			recordingMortgageFees.feeType = 'RecordingFeeForMortgage';
			recordingMortgageFees.feePaidToType = '';
			recordingMortgageFees.feeActualTotalAmount = $scope.recordingFeetotalObj.recordingFeeForMortgage;
            $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.push(recordingMortgageFees);
        }
        if($scope.recordingFeetotalObj.bpAtClosing || $scope.recordingFeetotalObj.bpB4Closing || $scope.recordingFeetotalObj.spAtClosing
		|| $scope.recordingFeetotalObj.spB4Closing || $scope.recordingFeetotalObj.paidByOthers){
			var recordingFeeForTotal = {
	            "bpAtClosing": $scope.recordingFeetotalObj.bpAtClosing,
	            "bpB4Closing": $scope.recordingFeetotalObj.bpB4Closing,
	            "spAtClosing": $scope.recordingFeetotalObj.spAtClosing,
	            "spB4Closing": $scope.recordingFeetotalObj.spB4Closing,
	            "paidByOthers": $scope.recordingFeetotalObj.paidByOthers,
	            "lenderStatus": $scope.recordingFeetotalObj.lenderStatus,
	            "displayLabel": "",
	            "feePaidToFullName": "",
	            "feeActualTotalAmount": "",
	            "feePaidToType": $scope.recordingFeetotalObj.feePaidToType,
	            "feePaidToTypeOtherDescription": $scope.recordingFeetotalObj.feePaidToTypeOtherDescription,
	            "feePercentBasisType": "",
	            "feeTotalPercent": "",
	            "feeType": "RecordingFeeTotal",
	            "feeTypeOtherDescription": "",
	            "integratedDisclosureSectionType": "TaxesAndOtherGovernmentFees",
	            "optionalCostIndicator": null,
	            "regulationZPointsAndFeesIndicator": null,
	            "paymentIncludedInAPRIndicator": $scope.recordingFeetotalObj.paymentIncludedInAPRIndicator
	        };
            $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.push(recordingFeeForTotal);
        }

        if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.length <=3) {
		var hasAnyOtherTaxOtherThanRecordingAndTransfer = false;
		for(i=0; i<$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.length; i++) {
			if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType!='RecordingFeeForDeed' &&
				$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType!='RecordingFeeForMortgage' &&
				$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType!='RecordingFeeTotal' &&
				$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType!='TransferTaxTotal') {
					hasAnyOtherTaxOtherThanRecordingAndTransfer = true;
			}
		}
		if(!hasAnyOtherTaxOtherThanRecordingAndTransfer && $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.EfeeTypes.indexOf('TransferTaxTotal')==-1) {
			$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.splice(0, 0, angular.copy(tOGovtFees));
				$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].feeType = 'TransferTaxTotal';
				$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].displayLabel = 'Transfer Taxes';
				$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[0].feePaidToType = 'ThirdPartyProvider';
	            for(i=0;i<$scope.sectionEfeeTypes.length;i++){
			if($scope.sectionEfeeTypes[i].value=='TransferTaxTotal'){
	                  // $scope.sectionEfeeTypes[i].disabled=true;
			}
	            }
	            if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.EfeeTypes.indexOf('TransferTaxTotal')==-1) {
					$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.EfeeTypes.push('TransferTaxTotal');
				}
		}
        }

         for(i=0; i<$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.length; i++) {

         	if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType!='Other'){
            	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeTypeOtherDescription='';
            }

		    bpAtClosing.tOGovtFeesTotalbpAtClosing += $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpAtClosing) : +0;
         	bpB4Closing.tOGovtFeesTotalbpB4Closing += $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpB4Closing) : +0;
         	spAtClosing.tOGovtFeesTotalspAtClosing += $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].spAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].spAtClosing) : +0;
          	spB4Closing.tOGovtFeesTotalspB4Closing += $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].spB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].spB4Closing) : +0;
          	paidByOthers.tOGovtFeesTotalpaidByOthers += $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].paidByOthers ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].paidByOthers) : +0;
            
            for(j=0; j<$scope.sectionEfeeTypes.length; j++){
				if($scope.sectionEfeeTypes[j].value == $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType) {
					if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feeType!='Other'){
					   //$scope.sectionEfeeTypes[j].disabled = true;
					}
				} 
		    }

		    if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].paymentIncludedInAPRIndicator==null){
            	$scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].paymentIncludedInAPRIndicator='';
            }

            //RegulationZTotalLoanAmount, RegulationZTotalAffiliateFeesAmount, RegulationZTotalPointsAndFeesAmount

            if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feePaidToTypeOtherDescription=='BrokerAffiliate' 
            	|| $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].feePaidToTypeOtherDescription=='LenderAffiliate'){
                if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpAtClosing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpB4Closing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpB4Closing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].spAtClosing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].spAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].spAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].spB4Closing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].spB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].spB4Closing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].paidByOthers){
	               $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].paidByOthers ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].paidByOthers) : +0;
	            }
            }

            if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].paymentIncludedInAPRIndicator==true){
                if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpAtClosing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.RegulationZTotalLoanAmount += $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpB4Closing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.RegulationZTotalLoanAmount += $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpB4Closing) : +0;
	            }
            }

            if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].regulationZPointsAndFeesIndicator==true){
                if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpAtClosing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpB4Closing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].bpB4Closing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].spAtClosing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].spAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].spAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].spB4Closing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].spB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].spB4Closing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].paidByOthers){
	               $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].paidByOthers ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesList[i].paidByOthers) : +0;
	            }
            }
         }

         $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount = bpAtClosing.tOGovtFeesTotalbpAtClosing + bpB4Closing.tOGovtFeesTotalbpB4Closing;
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing = parseFloat(bpAtClosing.tOGovtFeesTotalbpAtClosing) + parseFloat(bpAtClosing.prepaidsTotalbpAtClosing) + parseFloat(bpAtClosing.iEPatClosingTotalbpAtClosing) + parseFloat(bpAtClosing.otherTotalbpAtClosing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpB4Closing = parseFloat(bpB4Closing.tOGovtFeesTotalbpB4Closing) + parseFloat(bpB4Closing.prepaidsTotalbpB4Closing) + parseFloat(bpB4Closing.iEPatClosingTotalbpB4Closing) + parseFloat(bpB4Closing.otherTotalbpB4Closing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing = parseFloat(spAtClosing.tOGovtFeesTotalspAtClosing) + parseFloat(spAtClosing.prepaidsTotalspAtClosing) + parseFloat(spAtClosing.iEPatClosingTotalspAtClosing) + parseFloat(spAtClosing.otherTotalspAtClosing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spB4Closing = parseFloat(spB4Closing.tOGovtFeesTotalspB4Closing) + parseFloat(spB4Closing.prepaidsTotalspB4Closing) + parseFloat(spB4Closing.iEPatClosingTotalspB4Closing) + parseFloat(spB4Closing.otherTotalspB4Closing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers = parseFloat(paidByOthers.tOGovtFeesTotalpaidByOthers) + parseFloat(paidByOthers.prepaidsTotalpaidByOthers) + parseFloat(paidByOthers.iEPatClosingTotalpaidByOthers) + parseFloat(paidByOthers.otherTotalpaidByOthers);

         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount = parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount ? $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount : +0) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount ?$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount : +0) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount ? $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount : +0) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherTotalAmount ? $scope.cdformdata.closingCostDetailsOtherCosts.otherTotalAmount : +0);
         $scope.cdformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostsTotal.lenderCredits=='' || $scope.cdformdata.closingCostsTotal.lenderCredits==undefined ? +0 : $scope.cdformdata.closingCostsTotal.lenderCredits);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpB4Closing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpB4Closing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spB4Closing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spB4Closing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.paidByOthers = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers);
         
        if($scope.loanBasicInfo.loanFormType == 'standard'){
	        if($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing && $scope.cdformdata.closingCostsTotal.lenderCredits) {
	    		$scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing = parseFloat($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing) + parseFloat($scope.cdformdata.closingCostsTotal.lenderCredits);
	    		$scope.summariesOfTransaction_NSection.closingCostsPaidAtClosing = $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing;
	    	}else if($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing) {
	    		$scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing = parseFloat($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing);
	    		$scope.summariesOfTransaction_NSection.closingCostsPaidAtClosing = $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing;
	    	}
	    	else {
	    		$scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing = 0;
	    		$scope.summariesOfTransaction_NSection.closingCostsPaidAtClosing = 0;
	    	}
        }
        
        $scope.qualififiedCalculations();

    }, true);

    $scope.$watch('cdformdata.closingCostDetailsOtherCosts.prepaidsList', function(newValue, oldValue) {
		 bpAtClosing.prepaidsTotalbpAtClosing = 0;
		 bpB4Closing.prepaidsTotalbpB4Closing = 0;
		 spAtClosing.prepaidsTotalspAtClosing = 0;
		 spB4Closing.prepaidsTotalspB4Closing = 0;
		 paidByOthers.prepaidsTotalpaidByOthers = 0;
		 $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.RegulationZTotalAffiliateFeesAmount=0;
		 $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.RegulationZTotalLoanAmount=0;
		 $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.RegulationZTotalPointsAndFeesAmount=0;

         for(i=0; i<$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.length; i++) {
         	bpAtClosing.prepaidsTotalbpAtClosing += $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpAtClosing) : +0;
         	bpB4Closing.prepaidsTotalbpB4Closing += $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpB4Closing) : +0;
         	spAtClosing.prepaidsTotalspAtClosing += $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spAtClosing) : +0;
          	spB4Closing.prepaidsTotalspB4Closing += $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spB4Closing) : +0;
          	paidByOthers.prepaidsTotalpaidByOthers += $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].paidByOthers ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].paidByOthers) : +0;
            
            if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType!='Other'){
            	$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemTypeOtherDescription='';
            }

          	for(j=0; j<$scope.prepaidItems.length; j++){
				if($scope.prepaidItems[j].value == $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType) {
					if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType!='Other'){
					   //$scope.prepaidItems[j].disabled = true;
					}
				} 
		    }

        	if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType == 'MortgageInsurancePremium'){
		    	if($scope.cdformdata.miDataDetail.miCompanyNameType){
		    		if($scope.cdformdata.miDataDetail.miCompanyNameType!='Other'){
        				$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidPaidToFullName = $scope.cdformdata.miDataDetail.miCompanyNameType;
		    		}else{
        				$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidPaidToFullName = $scope.cdformdata.miDataDetail.miCompanyNameTypeOtherDescription;
		    		}
        		}
	        }

		    if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].paymentIncludedInAPRIndicator==null){
            	$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].paymentIncludedInAPRIndicator='';
            }

            if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType=='CityPropertyTax' || $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType=='CountyPropertyTax' ||
            	$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType=='DistrictPropertyTax' || $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType=='SchoolPropertyTax' ||
            	$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType=='StatePropertyTax' || $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType=='TownshipPropertyTax' || 
            	$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType=='VillagePropertyTax' || $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType=='TownPropertyTax')
            {
            	$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].regulationZPointsAndFeesIndicator = null;
            }

            //RegulationZTotalLoanAmount, RegulationZTotalAffiliateFeesAmount, RegulationZTotalPointsAndFeesAmount

            if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].feePaidToTypeOtherDescription=='BrokerAffiliate' 
            	|| $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].feePaidToTypeOtherDescription=='LenderAffiliate'){
                if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpAtClosing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpB4Closing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpB4Closing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spAtClosing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spB4Closing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spB4Closing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].paidByOthers){
	               $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].paidByOthers ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].paidByOthers) : +0;
	            }
            }

            if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].paymentIncludedInAPRIndicator==true){
                if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpAtClosing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.RegulationZTotalLoanAmount += $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpB4Closing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.RegulationZTotalLoanAmount += $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpB4Closing) : +0;
	            }
            }

            if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].regulationZPointsAndFeesIndicator==true){
                if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpAtClosing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpB4Closing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].bpB4Closing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spAtClosing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spB4Closing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].spB4Closing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].paidByOthers){
	               $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].paidByOthers ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].paidByOthers) : +0;
	            }
            }
         }

         $scope.cdformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount = bpAtClosing.prepaidsTotalbpAtClosing + bpB4Closing.prepaidsTotalbpB4Closing;
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing = parseFloat(bpAtClosing.tOGovtFeesTotalbpAtClosing) + parseFloat(bpAtClosing.prepaidsTotalbpAtClosing) + parseFloat(bpAtClosing.iEPatClosingTotalbpAtClosing) + parseFloat(bpAtClosing.otherTotalbpAtClosing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpB4Closing = parseFloat(bpB4Closing.tOGovtFeesTotalbpB4Closing) + parseFloat(bpB4Closing.prepaidsTotalbpB4Closing) + parseFloat(bpB4Closing.iEPatClosingTotalbpB4Closing) + parseFloat(bpB4Closing.otherTotalbpB4Closing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing = parseFloat(spAtClosing.tOGovtFeesTotalspAtClosing) + parseFloat(spAtClosing.prepaidsTotalspAtClosing) + parseFloat(spAtClosing.iEPatClosingTotalspAtClosing) + parseFloat(spAtClosing.otherTotalspAtClosing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spB4Closing = parseFloat(spB4Closing.tOGovtFeesTotalspB4Closing) + parseFloat(spB4Closing.prepaidsTotalspB4Closing) + parseFloat(spB4Closing.iEPatClosingTotalspB4Closing) + parseFloat(spB4Closing.otherTotalspB4Closing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers = parseFloat(paidByOthers.tOGovtFeesTotalpaidByOthers) + parseFloat(paidByOthers.prepaidsTotalpaidByOthers) + parseFloat(paidByOthers.iEPatClosingTotalpaidByOthers) + parseFloat(paidByOthers.otherTotalpaidByOthers);

         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount = parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount ? $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount : +0) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount ?$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount : +0) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount ? $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount : +0) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherTotalAmount ? $scope.cdformdata.closingCostDetailsOtherCosts.otherTotalAmount : +0);
         $scope.cdformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostsTotal.lenderCredits=='' || $scope.cdformdata.closingCostsTotal.lenderCredits==undefined ? +0 : $scope.cdformdata.closingCostsTotal.lenderCredits);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpB4Closing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpB4Closing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spB4Closing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spB4Closing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.paidByOthers = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers);
        
        if($scope.loanBasicInfo.loanFormType == 'standard'){
	        if($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing && $scope.cdformdata.closingCostsTotal.lenderCredits) {
	    		$scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing = parseFloat($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing) + parseFloat($scope.cdformdata.closingCostsTotal.lenderCredits);
	    		$scope.summariesOfTransaction_NSection.closingCostsPaidAtClosing = $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing;
	    	}else if($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing) {
	    		$scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing = parseFloat($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing);
	    		$scope.summariesOfTransaction_NSection.closingCostsPaidAtClosing = $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing;
	    	}
	    	else {
	    		$scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing = 0;
	    		$scope.summariesOfTransaction_NSection.closingCostsPaidAtClosing = 0;
	    	}
        }

        $scope.qualififiedCalculations();

    }, true);

    $scope.$watch('cdformdata.closingCostDetailsOtherCosts.escrowItemsList', function(newValue, oldValue) {
		 bpAtClosing.iEPatClosingTotalbpAtClosing = 0;
		 bpB4Closing.iEPatClosingTotalbpB4Closing = 0;
		 spAtClosing.iEPatClosingTotalspAtClosing = 0;
		 spB4Closing.iEPatClosingTotalspB4Closing = 0;
		 paidByOthers.iEPatClosingTotalpaidByOthers = 0;
		 $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.RegulationZTotalAffiliateFeesAmount=0;
		 $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.RegulationZTotalLoanAmount=0;
		 $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.RegulationZTotalPointsAndFeesAmount=0;
         $scope.cdformdata.escrowArray = [];
         var escrowValue = '';
         var etiaTotalAmount = 0;
         var nonEscrowAmount = 0;
         var escrowMonthlyAmount = 0;
         var yesVal=0;
	     var noVal=0;
	     var someVal=0;
         $scope.cdformdata.integratedDisclosureDetail.firstYearTotalEscrowPaymentDescription = '';
         for(i=0; i<$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.length; i++) {
         	bpAtClosing.iEPatClosingTotalbpAtClosing += $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpAtClosing) : +0;
         	bpB4Closing.iEPatClosingTotalbpB4Closing += $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpB4Closing) : +0;
         	spAtClosing.iEPatClosingTotalspAtClosing += $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].spAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].spAtClosing) : +0;
          	spB4Closing.iEPatClosingTotalspB4Closing += $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].spB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].spB4Closing) : +0;
          	paidByOthers.iEPatClosingTotalpaidByOthers += $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].paidByOthers ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].paidByOthers) : +0;
            
            if($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType!='Other'){
            	$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemTypeOtherDescription='';
            }

            for(j=0; j<$scope.escrowItemTypes.length; j++){
				if($scope.escrowItemTypes[j].value == $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType) {
					if($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType!='Other'){
					   //$scope.escrowItemTypes[j].disabled = true;
					}
				} 
		    }

		    if($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].paymentIncludedInAPRIndicator==null){
            	$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].paymentIncludedInAPRIndicator='';
            }

            if($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType=='CityPropertyTax' || $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType=='CountyPropertyTax' ||
            	$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType=='DistrictPropertyTax' || $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType=='SchoolPropertyTax' ||
            	$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType=='StatePropertyTax' || $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType=='TownshipPropertyTax' || 
            	$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType=='VillagePropertyTax' || $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType=='TownPropertyTax')
            {
            	$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].regulationZPointsAndFeesIndicator = null;
            }

            //RegulationZTotalLoanAmount, RegulationZTotalAffiliateFeesAmount, RegulationZTotalPointsAndFeesAmount

            if($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].feePaidToTypeOtherDescription=='BrokerAffiliate' 
            	|| $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].feePaidToTypeOtherDescription=='LenderAffiliate'){
                if($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpAtClosing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpB4Closing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpB4Closing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].spAtClosing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].spAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].spAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].spB4Closing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].spB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].spB4Closing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].paidByOthers){
	               $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].paidByOthers ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].paidByOthers) : +0;
	            }
            }

            if($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].paymentIncludedInAPRIndicator==true){
                if($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpAtClosing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.RegulationZTotalLoanAmount += $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpB4Closing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.RegulationZTotalLoanAmount += $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpB4Closing) : +0;
	            }
            }

            if($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].regulationZPointsAndFeesIndicator==true){
                if($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpAtClosing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpB4Closing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpB4Closing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].spAtClosing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].spAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].spAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].spB4Closing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].spB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].spB4Closing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].paidByOthers){
	               $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].paidByOthers ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].paidByOthers) : +0;
	            }
            }

            //Projected Payments Escrow Monthly Payment Amount
            if($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType!='MortgageInsurance'){
               escrowMonthlyAmount += $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowMonthlyPaymentAmount ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowMonthlyPaymentAmount) : +0;
               for(j=0;j<$scope.cdformdata.projectedPayments.estimatedEscrow.length;j++){
               	$scope.cdformdata.projectedPayments.estimatedEscrow[j].projectedPaymentEstimatedEscrowPaymentAmount = escrowMonthlyAmount ? parseFloat(escrowMonthlyAmount) : +0;
               }
            }

           
            //Escrow Account
	        if(bpAtClosing.iEPatClosingTotalbpAtClosing && bpAtClosing.iEPatClosingTotalbpAtClosing!=undefined 
	        	&& bpAtClosing.iEPatClosingTotalbpAtClosing!="0.00" && bpAtClosing.iEPatClosingTotalbpAtClosing!="0"){
	        		$scope.cdformdata.loanDetail.escrowIndicator =true;
	        }else{
	        	$scope.cdformdata.loanDetail.escrowIndicator =false;
	        }

            //Calculation For Estimated Taxes Insurance Assessment Total Amount
            if($scope.cdformdata.integratedDisclosureDetail.firstYearTotalNonEscrowPaymentAmount && $scope.cdformdata.integratedDisclosureDetail.firstYearTotalNonEscrowPaymentAmount!=undefined){
                nonEscrowAmount = $scope.cdformdata.integratedDisclosureDetail.firstYearTotalNonEscrowPaymentAmount ? parseFloat($scope.cdformdata.integratedDisclosureDetail.firstYearTotalNonEscrowPaymentAmount) : +0;
	        }
        	if($scope.cdformdata.termsOfLoan.lienPriorityType=='FirstLien' && $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType!='MortgageInsurance' && $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType!=''){
	            etiaTotalAmount += $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowMonthlyPaymentAmount ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowMonthlyPaymentAmount) : +0; 
	        }

	        //Escrowed Property Costs over Year 1 & Monthly Escrow Payment
	        if($scope.cdformdata.loanDetail.escrowIndicator){
	        	$scope.cdformdata.integratedDisclosureDetail.firstYearTotalEscrowPaymentAmount = etiaTotalAmount ? parseFloat(etiaTotalAmount*12) : +0;
	        }else{
	        	 $scope.cdformdata.integratedDisclosureDetail.firstYearTotalEscrowPaymentAmount = 0;
	        }

	        $scope.cdformdata.etiaSection.projectedPaymentEstimatedTaxesInsuranceAssessmentTotalAmount = parseFloat(($scope.cdformdata.integratedDisclosureDetail.firstYearTotalEscrowPaymentAmount+nonEscrowAmount)/12);

            //Adding Values to Escrow Account
            	if($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpAtClosing || $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].bpB4Closing || $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].spAtClosing
            		|| $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].spB4Closing || $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].paidByOthers){
		            if($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType!='MortgageInsurance'){
	                    if($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType=='CityPropertyTax' || $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType=='CountyPropertyTax' ||
	                    	$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType=='DistrictPropertyTax' || $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType=='SchoolPropertyTax' ||
	                    	$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType=='StatePropertyTax' || $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType=='TownshipPropertyTax' || 
	                    	$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType=='VillagePropertyTax' || $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType=='TownPropertyTax' ||
	                    	$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType=='PropertyTax')
	                    {
	                    	if($scope.cdformdata.escrowArray.indexOf('PropertyTaxes')==-1){
	                    	    $scope.cdformdata.escrowArray.push('PropertyTaxes');
	                    	}
	                    }else{
	                    	if($scope.cdformdata.escrowArray.indexOf($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType)==-1){
		            	    	$scope.cdformdata.escrowArray.push($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType);
	                        }
	                    }
		            }
		        }

	        if($scope.cdformdata.escrowArray.indexOf('PropertyTaxes')!=-1){
            	$scope.cdformdata.etiaSection.etiaValues[0].projectedPaymentEscrowedType='Escrowed';
            	$scope.cdformdata.etiaSection.etiaValues[0].insuranceTaxCheck = true; 
            	$scope.cdformdata.etiaSection.propertyTaxesCheck = true;
            }else{
            	//$scope.cdformdata.etiaSection.etiaValues[0].projectedPaymentEscrowedType='NotEscrowed';
            	$scope.cdformdata.etiaSection.etiaValues[0].insuranceTaxCheck = false; 
            }

            if($scope.cdformdata.escrowArray.indexOf('HomeownersInsurance')!=-1){
            	$scope.cdformdata.etiaSection.etiaValues[1].projectedPaymentEscrowedType='Escrowed';
            	$scope.cdformdata.etiaSection.etiaValues[1].insuranceTaxCheck = true; 
            	$scope.cdformdata.etiaSection.HomeownersInsuranceCheck = true;
            }else{
            	//$scope.cdformdata.etiaSection.etiaValues[1].projectedPaymentEscrowedType='NotEscrowed';
            	$scope.cdformdata.etiaSection.etiaValues[1].insuranceTaxCheck = false; 
            }
	        

            //Escrow Account 'Escrowed Property Costs includes'
		    if($scope.cdformdata.loanDetail.escrowIndicator){
	            if($scope.cdformdata.escrowArray.length>0){
		            $scope.cdformdata.integratedDisclosureDetail.firstYearTotalEscrowPaymentDescription =
			            angular.forEach($scope.cdformdata.escrowArray, function(value) { 
			            	return value;
			            }).join(",").replace(/([A-Z]+)/g, " $1");
	            }
	        }
           
        }

         bpAtClosing.iEPatClosingTotalbpAtClosing += ($scope.cdformdata.closingDisclosureDocDetails.escrowAggregateAccountingAdjustmentAmount == '' || undefined == $scope.cdformdata.closingDisclosureDocDetails.escrowAggregateAccountingAdjustmentAmount) ? +0 : parseFloat($scope.cdformdata.closingDisclosureDocDetails.escrowAggregateAccountingAdjustmentAmount);
         spAtClosing.iEPatClosingTotalspAtClosing += ($scope.cdformdata.closingDisclosureDocDetails.escrowAggregateAccountingAdjustmentAmountSellerPaid == '' || undefined == $scope.cdformdata.closingDisclosureDocDetails.escrowAggregateAccountingAdjustmentAmountSellerPaid) ? +0 : parseFloat($scope.cdformdata.closingDisclosureDocDetails.escrowAggregateAccountingAdjustmentAmountSellerPaid);
         paidByOthers.iEPatClosingTotalpaidByOthers += ($scope.cdformdata.closingDisclosureDocDetails.escrowAggregateAccountingAdjustmentAmountOthersPaid == '' || undefined == $scope.cdformdata.closingDisclosureDocDetails.escrowAggregateAccountingAdjustmentAmountOthersPaid) ? +0 : parseFloat($scope.cdformdata.closingDisclosureDocDetails.escrowAggregateAccountingAdjustmentAmountOthersPaid);

         $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount = bpAtClosing.iEPatClosingTotalbpAtClosing + bpB4Closing.iEPatClosingTotalbpB4Closing;
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing = parseFloat(bpAtClosing.tOGovtFeesTotalbpAtClosing) + parseFloat(bpAtClosing.prepaidsTotalbpAtClosing) + parseFloat(bpAtClosing.iEPatClosingTotalbpAtClosing) + parseFloat(bpAtClosing.otherTotalbpAtClosing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpB4Closing = parseFloat(bpB4Closing.tOGovtFeesTotalbpB4Closing) + parseFloat(bpB4Closing.prepaidsTotalbpB4Closing) + parseFloat(bpB4Closing.iEPatClosingTotalbpB4Closing) + parseFloat(bpB4Closing.otherTotalbpB4Closing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing = parseFloat(spAtClosing.tOGovtFeesTotalspAtClosing) + parseFloat(spAtClosing.prepaidsTotalspAtClosing) + parseFloat(spAtClosing.iEPatClosingTotalspAtClosing) + parseFloat(spAtClosing.otherTotalspAtClosing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spB4Closing = parseFloat(spB4Closing.tOGovtFeesTotalspB4Closing) + parseFloat(spB4Closing.prepaidsTotalspB4Closing) + parseFloat(spB4Closing.iEPatClosingTotalspB4Closing) + parseFloat(spB4Closing.otherTotalspB4Closing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers = parseFloat(paidByOthers.tOGovtFeesTotalpaidByOthers) + parseFloat(paidByOthers.prepaidsTotalpaidByOthers) + parseFloat(paidByOthers.iEPatClosingTotalpaidByOthers) + parseFloat(paidByOthers.otherTotalpaidByOthers);

         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount = parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount ? $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount : +0) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount ?$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount : +0) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount ? $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount : +0) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherTotalAmount ? $scope.cdformdata.closingCostDetailsOtherCosts.otherTotalAmount : +0);
         $scope.cdformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostsTotal.lenderCredits=='' || $scope.cdformdata.closingCostsTotal.lenderCredits==undefined ? +0 : $scope.cdformdata.closingCostsTotal.lenderCredits);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpB4Closing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpB4Closing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spB4Closing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spB4Closing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.paidByOthers = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers);
         
         //Escrow Account:Initial Escrow Payment
        if($scope.cdformdata.loanDetail.escrowIndicator){
           $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount = bpAtClosing.iEPatClosingTotalbpAtClosing;
        }

        if($scope.loanBasicInfo.loanFormType == 'standard'){
	        if($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing && $scope.cdformdata.closingCostsTotal.lenderCredits) {
	    		$scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing = parseFloat($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing) + parseFloat($scope.cdformdata.closingCostsTotal.lenderCredits);
	    		$scope.summariesOfTransaction_NSection.closingCostsPaidAtClosing = $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing;
	    	}else if($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing) {
	    		$scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing = parseFloat($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing);
	    		$scope.summariesOfTransaction_NSection.closingCostsPaidAtClosing = $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing;
	    	}
	    	else {
	    		$scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing = 0;
	    		$scope.summariesOfTransaction_NSection.closingCostsPaidAtClosing = 0;
	    	}
        }

        for(i=0;i<$scope.cdformdata.etiaSection.etiaValues.length;i++){
            if($scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType!='HomeownersInsurance' 
            	&& $scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType!='PropertyTaxes'
            	&& $scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType!=''){
            	$scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEscrowedType='NotEscrowed';
            	for(j=0;j<$scope.cdformdata.escrowArray.length;j++){
            		if($scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType==$scope.cdformdata.escrowArray[j]){
                        $scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEscrowedType='Escrowed';
		            }
            	}
            }
		}

		for(i=0;i<$scope.cdformdata.etiaSection.etiaValues.length;i++){
            if($scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType!='HomeownersInsurance' 
            	&& $scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType!='PropertyTaxes'
            	&& $scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType!=''){
                if($scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEscrowedType=='NotEscrowed'){
                	noVal++;
                }else if($scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEscrowedType=='Escrowed'){
                    yesVal++;
                }
            }
		}

		if(noVal>0 && yesVal>0){
          $scope.cdformdata.etiaSection.otherData = 'Some';
          $scope.cdformdata.etiaSection.otherCheck = true;
		}else if(noVal==0 && yesVal>0){
           $scope.cdformdata.etiaSection.otherData = 'Yes';
           $scope.cdformdata.etiaSection.otherCheck = true;
		}else if(noVal>0 && yesVal==0){
           $scope.cdformdata.etiaSection.otherData = 'No';
           $scope.cdformdata.etiaSection.otherCheck = true;
		}else{
		   $scope.cdformdata.etiaSection.otherData = '';
		   $scope.cdformdata.etiaSection.otherCheck = false;
		}

        $scope.qualififiedCalculations();

    }, true);

    $scope.$watch('cdformdata.closingCostDetailsOtherCosts.otherCostsList', function(newValue, oldValue) {
		 bpAtClosing.otherTotalbpAtClosing = 0;
		 bpB4Closing.otherTotalbpB4Closing = 0;
		 spAtClosing.otherTotalspAtClosing = 0;
		 spB4Closing.otherTotalspB4Closing = 0;
		 paidByOthers.otherTotalpaidByOthers = 0;
		 $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.RegulationZTotalAffiliateFeesAmount=0;
		 $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.RegulationZTotalLoanAmount=0;
		 $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.RegulationZTotalPointsAndFeesAmount=0;

         for(i=0; i<$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.length; i++) {
         	bpAtClosing.otherTotalbpAtClosing += $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].bpAtClosing) : +0;
         	bpB4Closing.otherTotalbpB4Closing += $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].bpB4Closing) : +0;
         	spAtClosing.otherTotalspAtClosing += $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].spAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].spAtClosing) : +0;
          	spB4Closing.otherTotalspB4Closing += $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].spB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].spB4Closing) : +0;
          	paidByOthers.otherTotalpaidByOthers += $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].paidByOthers ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].paidByOthers) : +0;
            
            if($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].feeType!='Other'){
            	$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].feeTypeOtherDescription='';
            }

            for(j=0; j<$scope.sectionHfeeTypes.length; j++){
				if($scope.sectionHfeeTypes[j].value == $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].feeType) {
					if($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].feeType!='Other'){
					   //$scope.sectionHfeeTypes[j].disabled = true;
					}
				} 
		    }

		    if($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].paymentIncludedInAPRIndicator==null){
            	$scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].paymentIncludedInAPRIndicator='';
            }

            //RegulationZTotalLoanAmount, RegulationZTotalAffiliateFeesAmount, RegulationZTotalPointsAndFeesAmount

            if($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].feePaidToTypeOtherDescription=='BrokerAffiliate' 
            	|| $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].feePaidToTypeOtherDescription=='LenderAffiliate'){
                if($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].bpAtClosing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].bpAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].bpB4Closing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].bpB4Closing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].spAtClosing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].spAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].spAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].spB4Closing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].spB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].spB4Closing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].paidByOthers){
	               $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.RegulationZTotalAffiliateFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].paidByOthers ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].paidByOthers) : +0;
	            }
            }

            if($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].paymentIncludedInAPRIndicator==true){
                if($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].bpAtClosing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.RegulationZTotalLoanAmount += $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].bpAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].bpB4Closing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.RegulationZTotalLoanAmount += $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].bpB4Closing) : +0;
	            }
            }

            if($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].regulationZPointsAndFeesIndicator==true){
                if($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].bpAtClosing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].bpAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].bpAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].bpB4Closing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].bpB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].bpB4Closing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].spAtClosing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].spAtClosing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].spAtClosing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].spB4Closing){
	               $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].spB4Closing ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].spB4Closing) : +0;
	            }else if($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].paidByOthers){
	               $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList.RegulationZTotalPointsAndFeesAmount += $scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].paidByOthers ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherCostsList[i].paidByOthers) : +0;
	            }
            }
         }

         $scope.cdformdata.closingCostDetailsOtherCosts.otherTotalAmount = bpAtClosing.otherTotalbpAtClosing + bpB4Closing.otherTotalbpB4Closing;
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing = parseFloat(bpAtClosing.tOGovtFeesTotalbpAtClosing) + parseFloat(bpAtClosing.prepaidsTotalbpAtClosing) + parseFloat(bpAtClosing.iEPatClosingTotalbpAtClosing) + parseFloat(bpAtClosing.otherTotalbpAtClosing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpB4Closing = parseFloat(bpB4Closing.tOGovtFeesTotalbpB4Closing) + parseFloat(bpB4Closing.prepaidsTotalbpB4Closing) + parseFloat(bpB4Closing.iEPatClosingTotalbpB4Closing) + parseFloat(bpB4Closing.otherTotalbpB4Closing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing = parseFloat(spAtClosing.tOGovtFeesTotalspAtClosing) + parseFloat(spAtClosing.prepaidsTotalspAtClosing) + parseFloat(spAtClosing.iEPatClosingTotalspAtClosing) + parseFloat(spAtClosing.otherTotalspAtClosing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spB4Closing = parseFloat(spB4Closing.tOGovtFeesTotalspB4Closing) + parseFloat(spB4Closing.prepaidsTotalspB4Closing) + parseFloat(spB4Closing.iEPatClosingTotalspB4Closing) + parseFloat(spB4Closing.otherTotalspB4Closing);
         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers = parseFloat(paidByOthers.tOGovtFeesTotalpaidByOthers) + parseFloat(paidByOthers.prepaidsTotalpaidByOthers) + parseFloat(paidByOthers.iEPatClosingTotalpaidByOthers) + parseFloat(paidByOthers.otherTotalpaidByOthers);

         $scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount = parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount ? $scope.cdformdata.closingCostDetailsOtherCosts.tOGovtFeesTotalAmount : +0) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount ?$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsTotalAmount : +0) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount ? $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsTotalAmount : +0) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.otherTotalAmount ? $scope.cdformdata.closingCostDetailsOtherCosts.otherTotalAmount : +0);
         $scope.cdformdata.closingCostsTotal.totalClosingCosts = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCostsTotalAmount) + parseFloat($scope.cdformdata.closingCostsTotal.lenderCredits=='' || $scope.cdformdata.closingCostsTotal.lenderCredits==undefined ? +0 : $scope.cdformdata.closingCostsTotal.lenderCredits);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpAtClosing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.bpB4Closing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.bpB4Closing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spAtClosing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spAtClosing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spB4Closing = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.spB4Closing) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.spB4Closing);
         $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.paidByOthers = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.tlCosts.paidByOthers) + parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.totalOtherCosts.paidByOthers);
        
        if($scope.loanBasicInfo.loanFormType == 'standard'){
	        if($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing && $scope.cdformdata.closingCostsTotal.lenderCredits) {
	    		$scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing = parseFloat($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing) + parseFloat($scope.cdformdata.closingCostsTotal.lenderCredits);
	    		$scope.summariesOfTransaction_NSection.closingCostsPaidAtClosing = $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing;
	    	}else if($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing) {
	    		$scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing = parseFloat($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing);
	    		$scope.summariesOfTransaction_NSection.closingCostsPaidAtClosing = $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.spAtClosing;
	    	}
	    	else {
	    		$scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing = 0;
	    		$scope.summariesOfTransaction_NSection.closingCostsPaidAtClosing = 0;
	    	}
        }

        $scope.qualififiedCalculations();

    }, true);

    $scope.$watch('cdformdata.cashToCloses', function(newValue,oldValue){
    	var cashToCloseItemEstimatedAmount = 0;
    	var cashToCloseItemFinalAmount = 0;

    	//Total Closing Costs(J)
    	if($scope.loanBasicInfo.loanFormType == 'alternate'){
            $scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemFinalAmount = parseFloat($scope.cdformdata.closingCostsTotal.totalClosingCosts*-1);    		
        }else{
        	$scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemFinalAmount = parseFloat($scope.cdformdata.closingCostsTotal.totalClosingCosts);
        }
    	$scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemType='TotalClosingCosts';
    	
    	//closing Costs Paid Before Closing
    	if($scope.loanBasicInfo.loanFormType == 'alternate'){
    	    $scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemFinalAmount = Math.round(parseFloat($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing ? $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing : +0)); 
            $scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemType = 'ClosingCostsPaidBeforeClosing';
        }else{
    	    $scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemFinalAmount = Math.round(parseFloat($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing ? $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing*-1 : +0));
            $scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemType = 'ClosingCostsPaidBeforeClosing';
        }
		
		//Loan Amount        
        if($scope.cdformdata.termsOfLoan.noteAmount && $scope.cdformdata.termsOfLoan.noteAmount!=undefined && $scope.loanBasicInfo.loanFormType == 'alternate'){
            $scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemFinalAmount = $scope.cdformdata.termsOfLoan.noteAmount ? parseFloat($scope.cdformdata.termsOfLoan.noteAmount) : +0;
            $scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemType = 'LoanAmount';
        }

        var estimatedLoanAmount =  $scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemEstimatedAmount);
		var finalLoanAmount =  $scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemFinalAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemFinalAmount);

		var estimatedTotalClosingCostsAmount =  $scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount);
		var finalTotalClosingCostsAmount =  $scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemFinalAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemFinalAmount);

		var estimatedClosingCostsPaidBeforeClosingAmount =  $scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemEstimatedAmount);
		var finalClosingCostsPaidBeforeClosingAmount =  $scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemFinalAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemFinalAmount);

		var estimatedClosingCostsFinancedAmount =  $scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemEstimatedAmount);
		var finalClosingCostsFinancedAmount =  $scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemFinalAmount == ''  ? +0 : parseFloat($scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemFinalAmount);

		var estimatedDownPaymentAmount =  $scope.cdformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemEstimatedAmount);
		var finalDownPaymentAmount =  $scope.cdformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemFinalAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemFinalAmount);

		var estimatedDepositAmount =  $scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemEstimatedAmount == ''  ? +0 : parseFloat($scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemEstimatedAmount);
		var finalDepositAmount =  $scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemFinalAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemFinalAmount);

		var estimatedFundsForBorrowerAmount =  $scope.cdformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemEstimatedAmount);
		var finalFundsForBorrowerAmount =  $scope.cdformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemFinalAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemFinalAmount);

		var estimatedSellerCreditsAmount =  $scope.cdformdata.cashToCloses.sellerCredits.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.sellerCredits.integratedDisclosureCashToCloseItemEstimatedAmount);
		var finalSellerCreditsAmount =  $scope.cdformdata.cashToCloses.sellerCredits.integratedDisclosureCashToCloseItemFinalAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.sellerCredits.integratedDisclosureCashToCloseItemFinalAmount);

		var estimatedAdjustmentsAndOtherCreditsAmount =  $scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemEstimatedAmount);
		var finalAdjustmentsAndOtherCreditsAmount =  $scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemFinalAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemFinalAmount);

		var estimatedTotalPayoffsAndPaymentsAmount =  $scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemEstimatedAmount);
		var finalTotalPayoffsAndPaymentsAmount =  $scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemFinalAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemFinalAmount);

		if(estimatedLoanAmount!=finalLoanAmount){
		    $scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemAmountChangedIndicator = true;
		    if($scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemAmountChangedIndicator){
			  if(estimatedLoanAmount>finalLoanAmount){
					$scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemChangeDescription='This amount Decreased';
				}else if(estimatedLoanAmount<finalLoanAmount){
					$scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemChangeDescription='This amount increased';
				}
		    }
		}else {
		    $scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemAmountChangedIndicator = false;
		    $scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemChangeDescription='';
		}	

        if(estimatedTotalClosingCostsAmount!=finalTotalClosingCostsAmount){
		    $scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemAmountChangedIndicator = true;
		    if($scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemAmountChangedIndicator){
				if(estimatedTotalClosingCostsAmount>finalTotalClosingCostsAmount){
					$scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemChangeDescription='See Total Loan Costs (D) And Total Other Costs (I)';
				}else if(estimatedTotalClosingCostsAmount<finalTotalClosingCostsAmount){
					$scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemChangeDescription='See Total Loan Costs (D) And Total Other Costs (I)';
				}
		    }
	    }else {
		    $scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemAmountChangedIndicator = false;
		    $scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemChangeDescription='';
	    }

        if(estimatedClosingCostsPaidBeforeClosingAmount!=finalClosingCostsPaidBeforeClosingAmount){
		    $scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemAmountChangedIndicator = true;
		    if($scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemAmountChangedIndicator){
			   
				if(estimatedClosingCostsPaidBeforeClosingAmount>finalClosingCostsPaidBeforeClosingAmount){
					$scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemChangeDescription='You paid these closing costs before closing';
				}else if(estimatedClosingCostsPaidBeforeClosingAmount<finalClosingCostsPaidBeforeClosingAmount){
					$scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemChangeDescription='You paid these closing costs before closing';
				}
		    }
	    }else {
		    $scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemAmountChangedIndicator = false;
		    $scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemChangeDescription='';
	    }

        if(estimatedClosingCostsFinancedAmount!=finalClosingCostsFinancedAmount){
		    $scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemAmountChangedIndicator = true;
		    if($scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemAmountChangedIndicator){
				
				if(estimatedClosingCostsFinancedAmount>finalClosingCostsFinancedAmount){
					$scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemChangeDescription='You included these closing costs in the loan amount, which you decreased the loan amount.';
				}else if(estimatedClosingCostsFinancedAmount<finalClosingCostsFinancedAmount){
					$scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemChangeDescription='You included these closing costs in the loan amount, which you increased the loan amount.';
				}
		    }
	    }else {
		    $scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemAmountChangedIndicator = false;
		    $scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemChangeDescription='';
	    }

        if(estimatedDownPaymentAmount!=finalDownPaymentAmount){
		    $scope.cdformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemAmountChangedIndicator = true;
		    if($scope.cdformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemAmountChangedIndicator){
				if(estimatedDownPaymentAmount>finalDownPaymentAmount){
					$scope.cdformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemChangeDescription='You decreased this payment. See Details in Section K.';
				}else if(estimatedDownPaymentAmount<finalDownPaymentAmount){
					$scope.cdformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemChangeDescription='You increased this payment. See Details in Section K.';
				}
		    }
	    }else {
		    $scope.cdformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemAmountChangedIndicator = false;
		    $scope.cdformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemChangeDescription='';

	    }

        if(estimatedDepositAmount!=finalDepositAmount){
			$scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemAmountChangedIndicator = true;
			if($scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemAmountChangedIndicator){
				if(estimatedDepositAmount>finalDepositAmount){
					$scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemChangeDescription='You decreased this payment. See Details in Section L.';
				}else if(estimatedDepositAmount<finalDepositAmount){
					$scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemChangeDescription='You increased this payment. See Details in Section L.';
				}
			}
	    }else {
		    $scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemAmountChangedIndicator = false;
		    $scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemChangeDescription='';
	    }

        if(estimatedFundsForBorrowerAmount!=finalFundsForBorrowerAmount){
		    $scope.cdformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemAmountChangedIndicator = true;
		    if($scope.cdformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemAmountChangedIndicator){
				if(estimatedFundsForBorrowerAmount>finalFundsForBorrowerAmount){
					$scope.cdformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemChangeDescription='Your available funds from the loan amount have decreased';
				}else if(estimatedFundsForBorrowerAmount<finalFundsForBorrowerAmount){
					$scope.cdformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemChangeDescription='Your available funds from the loan amount have increased';
				}
		    }
	    }else {
		    $scope.cdformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemAmountChangedIndicator = false;
		    $scope.cdformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemChangeDescription='';
	    }

        if(estimatedSellerCreditsAmount!=finalSellerCreditsAmount){
			$scope.cdformdata.cashToCloses.sellerCredits.integratedDisclosureCashToCloseItemAmountChangedIndicator = true;
			if($scope.cdformdata.cashToCloses.sellerCredits.integratedDisclosureCashToCloseItemAmountChangedIndicator){
				$scope.cdformdata.cashToCloses.sellerCredits.integratedDisclosureCashToCloseItemChangeDescription='See Seller Credits in Section L';
			}
		}else {
		    $scope.cdformdata.cashToCloses.sellerCredits.integratedDisclosureCashToCloseItemAmountChangedIndicator = false;
		    $scope.cdformdata.cashToCloses.sellerCredits.integratedDisclosureCashToCloseItemChangeDescription='';
		}

        if(estimatedAdjustmentsAndOtherCreditsAmount!=finalAdjustmentsAndOtherCreditsAmount){
			$scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemAmountChangedIndicator = true;
			if($scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemAmountChangedIndicator){
				if(estimatedAdjustmentsAndOtherCreditsAmount>finalAdjustmentsAndOtherCreditsAmount){
					$scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemChangeDescription='See Details in Section K and L.';
				}else if(estimatedAdjustmentsAndOtherCreditsAmount<finalAdjustmentsAndOtherCreditsAmount){
					$scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemChangeDescription='See Details in Section K and L.';
				}
			}
		}else {
			$scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemAmountChangedIndicator = false;
			$scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemChangeDescription='';
	    }

        if(estimatedTotalPayoffsAndPaymentsAmount!=finalTotalPayoffsAndPaymentsAmount){
		    $scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemAmountChangedIndicator = true;
		    if($scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemAmountChangedIndicator){
				if(estimatedTotalPayoffsAndPaymentsAmount>finalTotalPayoffsAndPaymentsAmount){
					$scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemChangeDescription='See Payoffs and Payments (K).';
				}else if(estimatedTotalPayoffsAndPaymentsAmount<finalTotalPayoffsAndPaymentsAmount){
					$scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemChangeDescription='See Payoffs and Payments (K).';
				}
		    }
	    }else {
		   $scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemAmountChangedIndicator = false;
		   $scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemChangeDescription='';
	    }

        if($scope.loanBasicInfo.loanFormType == 'standard'){
			$scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemType='ClosingCostsFinanced';
			$scope.cdformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemType='DownPayment';
			$scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemType='Deposit';
			$scope.cdformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemType='FundsForBorrower';
			$scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemType='AdjustmentsAndOtherCredits';
			$scope.cdformdata.cashToCloses.sellerCredits.integratedDisclosureCashToCloseItemType= 'SellerCredits';
			$scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemType='';
			$scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemType= '';
		}else{
            $scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemType='LoanAmount';
			$scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemType= 'TotalPayoffsAndPayments';
			$scope.cdformdata.cashToCloses.closingCostsFinanced.integratedDisclosureCashToCloseItemType='ClosingCostsFinanced';
			$scope.cdformdata.cashToCloses.downPayment.integratedDisclosureCashToCloseItemType='';
			$scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemType='';
			$scope.cdformdata.cashToCloses.fundsForBorrower.integratedDisclosureCashToCloseItemType='';
			$scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemType='';
			$scope.cdformdata.cashToCloses.sellerCredits.integratedDisclosureCashToCloseItemType= '';
		}

        if($scope.loanBasicInfo.loanFormType == 'standard'){
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
        }else{
        	if($scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemEstimatedAmount)
	    	cashToCloseItemEstimatedAmount +=  $scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemEstimatedAmount);
	    	if($scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount)
	    	cashToCloseItemEstimatedAmount +=  $scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemEstimatedAmount);
	    	if($scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemEstimatedAmount)
	    	cashToCloseItemEstimatedAmount +=  $scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemEstimatedAmount);
	    	if($scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemEstimatedAmount)
	    	cashToCloseItemEstimatedAmount +=  $scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemEstimatedAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemEstimatedAmount);

	        if($scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemFinalAmount)
	        cashToCloseItemFinalAmount +=  $scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemFinalAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemFinalAmount);
	    	if($scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemFinalAmount)
	    	cashToCloseItemFinalAmount +=  $scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemFinalAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemFinalAmount);
	    	if($scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemFinalAmount)
	    	cashToCloseItemFinalAmount +=  $scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemFinalAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemFinalAmount);
	    	if($scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemFinalAmount)
	    	cashToCloseItemFinalAmount +=  $scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemFinalAmount == '' ? +0 : parseFloat($scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemFinalAmount);
        }

        if($scope.cdformdata.cashToCloses.cashToCloseTotal.length>1){
	        $scope.cdformdata.cashToCloses.cashToCloseTotal[0].integratedDisclosureCashToCloseItemEstimatedAmount = cashToCloseItemEstimatedAmount;
	        $scope.cdformdata.cashToCloses.cashToCloseTotal[1].integratedDisclosureCashToCloseItemFinalAmount = cashToCloseItemFinalAmount;

        }else{
		    $scope.cdformdata.cashToCloses.cashToCloseTotal[0].integratedDisclosureCashToCloseItemEstimatedAmount = cashToCloseItemEstimatedAmount;
	        $scope.cdformdata.cashToCloses.cashToCloseTotal.push(angular.copy(cashTocloses));
	        $scope.cdformdata.cashToCloses.cashToCloseTotal[1].integratedDisclosureCashToCloseItemFinalAmount = cashToCloseItemFinalAmount;
        }

        /*$scope.cdformdata.cashToCloses.cashToCloseTotal[0].integratedDisclosureCashToCloseItemEstimatedAmount = cashToCloseItemEstimatedAmount;
	    $scope.cdformdata.cashToCloses.cashToCloseTotal[1].integratedDisclosureCashToCloseItemFinalAmount = cashToCloseItemFinalAmount;*/

        if($scope.loanBasicInfo.loanFormType == 'alternate'){
		if($scope.cdformdata.cashToCloses.cashToCloseTotal[0].integratedDisclosureCashToCloseItemEstimatedAmount){
			if($scope.cdformdata.cashToCloses.cashToCloseTotal[0].integratedDisclosureCashToCloseItemEstimatedAmount>0){
			    $scope.cdformdata.cashToCloses.cashToCloseTotal[0].integratedDisclosureCashToCloseItemPaymentType = 'ToBorrower';
			    $scope.cdformdata.closingInformationDetail.cashToBorrowerAtClosingAmount = $scope.cdformdata.cashToCloses.cashToCloseTotal[0].integratedDisclosureCashToCloseItemEstimatedAmount;
			        $scope.cdformdata.closingInformationDetail.cashFromBorrowerAtClosingAmount = '';
			    }else if($scope.cdformdata.cashToCloses.cashToCloseTotal[0].integratedDisclosureCashToCloseItemEstimatedAmount<0){
				$scope.cdformdata.cashToCloses.cashToCloseTotal[0].integratedDisclosureCashToCloseItemPaymentType = 'FromBorrower';
				$scope.cdformdata.closingInformationDetail.cashFromBorrowerAtClosingAmount = 0-$scope.cdformdata.cashToCloses.cashToCloseTotal[0].integratedDisclosureCashToCloseItemEstimatedAmount;
			        $scope.cdformdata.closingInformationDetail.cashToBorrowerAtClosingAmount='';
			    }
		    }

		if($scope.cdformdata.cashToCloses.cashToCloseTotal[1].integratedDisclosureCashToCloseItemFinalAmount){
			if($scope.cdformdata.cashToCloses.cashToCloseTotal[1].integratedDisclosureCashToCloseItemFinalAmount>0){
			    $scope.cdformdata.cashToCloses.cashToCloseTotal[1].integratedDisclosureCashToCloseItemPaymentType = 'ToBorrower';
			    $scope.cdformdata.closingInformationDetail.cashToBorrowerAtClosingAmount = $scope.cdformdata.cashToCloses.cashToCloseTotal[1].integratedDisclosureCashToCloseItemFinalAmount;
			        $scope.cdformdata.closingInformationDetail.cashFromBorrowerAtClosingAmount = '';
			    }else if($scope.cdformdata.cashToCloses.cashToCloseTotal[1].integratedDisclosureCashToCloseItemFinalAmount<0){
				$scope.cdformdata.cashToCloses.cashToCloseTotal[1].integratedDisclosureCashToCloseItemPaymentType = 'FromBorrower';
				$scope.cdformdata.closingInformationDetail.cashFromBorrowerAtClosingAmount = 0-$scope.cdformdata.cashToCloses.cashToCloseTotal[1].integratedDisclosureCashToCloseItemFinalAmount;
			        $scope.cdformdata.closingInformationDetail.cashToBorrowerAtClosingAmount='';
			    }
		    }
        }

        //Sale Price
        if($scope.loanBasicInfo.loanPurposeType == 'refinance' && $scope.loanBasicInfo.loanFormType == 'standard'){
            $scope.cdformdata.salesContractDetail.saleContractAmount = 0;
        }
      
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
    
    $scope.$watch('cdformdata.closingCostsTotal.lenderCredits', function(newValue,oldValue){
    	var totalClosingCosts = 0;
    	totalClosingCosts += $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing + $scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing;
    	if($scope.cdformdata.closingCostsTotal.lenderCredits)
  			totalClosingCosts +=  parseFloat($scope.cdformdata.closingCostsTotal.lenderCredits);
        $scope.cdformdata.closingCostsTotal.totalClosingCosts = totalClosingCosts;
        
        if($scope.loanBasicInfo.loanFormType == 'standard'){
	        if($scope.cdformdata.closingCostsTotal.lenderCredits) {
	    		$scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing = parseFloat($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing) + parseFloat($scope.cdformdata.closingCostsTotal.lenderCredits);
	    	}
	    	else {
	    		$scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing = parseFloat($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpAtClosing);
	    	}
        }

    },true);
    

	$scope.$watch('cdformdata.salesContractDetail', function(newValue,oldValue){
		
		//Cash To Close Calculations
        cashToclosesCalculations();
		if($scope.loanBasicInfo.loanFormType == 'standard'){
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
	    }
	}, true);
    
    $scope.$watch('payoffsAndPaymentsList', function(newValue,oldValue){
	   var totalAmount = 0;
	   for(k=0;k<$scope.payoffsAndPaymentsList.length;k++){
	   		if($scope.payoffsAndPaymentsList[k].payOffType!='' && $scope.payoffsAndPaymentsList[k].payoffAmount)
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
                  "payoffPrepaymentPenaltyAmount": payoffObj.prepaymentPenaltyAmount
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

        $scope.cdformdata.payoffsAndPayments.integratedDisclosureSectionSummary.integratedDisclosureSectionSummaryDetailModel.integratedDisclosureSectionTotalAmount = $scope.payoffsAndPaymentsTotalAmount ? parseFloat($scope.payoffsAndPaymentsTotalAmount).toFixed(2) : +0;
        $scope.cdformdata.payoffsAndPayments.integratedDisclosureSectionSummary.integratedDisclosureSectionSummaryDetailModel.integratedDisclosureSectionType='PayoffsAndPayments';
        $scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemFinalAmount =  $scope.payoffsAndPaymentsTotalAmount ? parseFloat($scope.payoffsAndPaymentsTotalAmount*-1).toFixed(2) : +0;
        $scope.cdformdata.cashToCloses.totalPayoffsAndPayments.integratedDisclosureCashToCloseItemType = 'TotalPayoffsAndPayments';
    }, true);

    $scope.$watch('summariesOfTransaction_KSection', function(newValues,oldValues){
		if($scope.loanBasicInfo.loanFormType == 'standard') {
 		$scope.summariesOfTransaction_KSection.sectionTotalAmount = 0;
 		$scope.adjustmentsAndProrationsAmountsKSection = 0;
 		for(i=0; i<$scope.cdformdata.liabilityList.length; i++) {
			if($scope.cdformdata.liabilityList[i].integratedDisclosureSectionType == 'DueFromBorrowerAtClosing') {
				$scope.cdformdata.liabilityList.splice(i,1);
				i--;
			}
		}
		for(i=0; i<$scope.cdformdata.closingAdjustmentItemList.length; i++) {
			if($scope.cdformdata.closingAdjustmentItemList[i].integratedDisclosureSectionType == 'DueFromBorrowerAtClosing') {
				$scope.cdformdata.closingAdjustmentItemList.splice(i,1);
				i--;
			}
		}
		for(i=0; i<$scope.cdformdata.prorationsList.length; i++) {
			if($scope.cdformdata.prorationsList[i].integratedDisclosureSectionType == 'DueFromBorrowerAtClosing' 
				&& $scope.cdformdata.prorationsList[i].integratedDisclosureSubsectionType == 'AdjustmentsForItemsPaidBySellerInAdvance') {
				$scope.cdformdata.prorationsList.splice(i,1);
				i--;
			}
		}
    	if($scope.summariesOfTransaction_KSection.salePriceProperty)
			$scope.summariesOfTransaction_KSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_KSection.salePriceProperty);
		if($scope.summariesOfTransaction_KSection.salePricePersonalProperty) {
			 $scope.summariesOfTransaction_KSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_KSection.salePricePersonalProperty);
			 $scope.summariesOfTransaction_MSection.salePricePersonalProperty = $scope.summariesOfTransaction_KSection.salePricePersonalProperty;
			 $scope.cdformdata.salesContractDetail.personalPropertyAmount = parseFloat($scope.summariesOfTransaction_KSection.salePricePersonalProperty);
		}
		if($scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing)
			$scope.summariesOfTransaction_KSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_KSection.closingCostsPaidAtClosing);
		for(i=0; i<$scope.summariesOfTransaction_KSection.liabilites.length; i++) {
			if($scope.summariesOfTransaction_KSection.liabilites[i].payoffAmount)
				$scope.summariesOfTransaction_KSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_KSection.liabilites[i].payoffAmount);
			if($scope.summariesOfTransaction_KSection.liabilites[i].payoffAmount && $scope.summariesOfTransaction_KSection.liabilites[i].liabilityType) {
				$scope.cdformdata.liabilityList.push($scope.summariesOfTransaction_KSection.liabilites[i]);
			}
		}
		for(i=0; i<$scope.summariesOfTransaction_KSection.adjustments.length; i++) {

			if($scope.summariesOfTransaction_KSection.adjustments[i].closingAdjustmentItemAmount)
				$scope.summariesOfTransaction_KSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_KSection.adjustments[i].closingAdjustmentItemAmount);
			if($scope.summariesOfTransaction_KSection.adjustments[i].closingAdjustmentItemAmount && $scope.summariesOfTransaction_KSection.adjustments[i].closingAdjustmentItemType) {
				$scope.cdformdata.closingAdjustmentItemList.push($scope.summariesOfTransaction_KSection.adjustments[i]);
				$scope.adjustmentsAndProrationsAmountsKSection += parseFloat($scope.summariesOfTransaction_KSection.adjustments[i].closingAdjustmentItemAmount);
			}
			if($scope.summariesOfTransaction_KSection.adjustments[i].closingAdjustmentItemType) {
				var sellerAdjustment = angular.copy($scope.summariesOfTransaction_KSection.adjustments[i]);
				sellerAdjustment['isFromBorrower'] = true;
				sellerAdjustment.integratedDisclosureSectionType = "DueToSellerAtClosing";
				var isAdujstmentExists = false;
				for(var j=0; j<$scope.summariesOfTransaction_MSection.adjustments.length; j++) {
					if($scope.summariesOfTransaction_MSection.adjustments[j].closingAdjustmentItemType == sellerAdjustment.closingAdjustmentItemType) {
						$scope.summariesOfTransaction_MSection.adjustments[j] = sellerAdjustment;
						isAdujstmentExists = true;
					}
				}
				if(!isAdujstmentExists) {
					$scope.summariesOfTransaction_MSection.adjustments.splice(0, 0, sellerAdjustment);
				}
			}
		}
		if($scope.summariesOfTransaction_MSection.adjustments.length > 5) {
			$scope.summariesOfTransaction_MSection.adjustments = $scope.summariesOfTransaction_MSection.adjustments.splice(0, 5);
		}
		$scope.summariesOfTransaction_MSection.adjustmentsPaidBySeller = [];
		for(i=0; i<$scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller.length; i++) {
			if($scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[i].prorationItemAmount)
				$scope.summariesOfTransaction_KSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[i].prorationItemAmount);
			if($scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[i].prorationItemAmount && $scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[i].prorationItemType) {
				$scope.cdformdata.prorationsList.push($scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[i]);
				$scope.adjustmentsAndProrationsAmountsKSection += parseFloat($scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[i].prorationItemAmount);

			}
			var adjustmentPaidBySellerInAdvance = angular.copy($scope.summariesOfTransaction_KSection.adjustmentsPaidBySeller[i]);
			adjustmentPaidBySellerInAdvance.integratedDisclosureSectionType = 'DueToSellerAtClosing';
			adjustmentPaidBySellerInAdvance.integratedDisclosureSubsectionType = 'AdjustmentsForItemsPaidBySellerInAdvance';
			$scope.summariesOfTransaction_MSection.adjustmentsPaidBySeller.push(adjustmentPaidBySellerInAdvance);
		}
		$scope.cdformdata.summariesofTransactions.borrowerTransaction.dueFromBorrowerAtClosing.integratedDisclosureSectionSummaryDetailModel.integratedDisclosureSectionTotalAmount = $scope.summariesOfTransaction_KSection.sectionTotalAmount;
		$scope.sotBorrowerTransactionTotalAmount = parseFloat($scope.summariesOfTransaction_KSection.sectionTotalAmount) + (-parseFloat($scope.summariesOfTransaction_LSection.sectionTotalAmount));


		//Calculating Cash To Close
		//Adjustments And Other Credits
        $scope.adjustmentsAndProrationsAmountsKSection = $scope.adjustmentsAndProrationsAmountsKSection ? parseFloat($scope.adjustmentsAndProrationsAmountsKSection) : +0;
		$scope.adjustmentsAndProrationsAmountsLSection = $scope.adjustmentsAndProrationsAmountsLSection ? parseFloat($scope.adjustmentsAndProrationsAmountsLSection) : +0;
	    $scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemFinalAmount = parseFloat($scope.cdformdata.salesContractDetail.personalPropertyAmount ? $scope.cdformdata.salesContractDetail.personalPropertyAmount : +0)+parseFloat($scope.adjustmentsAndProrationsAmountsKSection)-parseFloat($scope.adjustmentsAndProrationsAmountsLSection)-parseFloat($scope.summariesOfTransaction_LSection.subordinateLien.closingAdjustmentItemAmount ? $scope.summariesOfTransaction_LSection.subordinateLien.closingAdjustmentItemAmount : +0);
		}
    }, true);

    $scope.$watch('summariesOfTransaction_MSection', function(newValues,oldValues){
		if($scope.loanBasicInfo.loanFormType == 'standard') {
 		$scope.summariesOfTransaction_MSection.sectionTotalAmount = 0;
		for(i=0; i<$scope.cdformdata.closingAdjustmentItemList.length; i++) {
			if($scope.cdformdata.closingAdjustmentItemList[i].integratedDisclosureSectionType == 'DueToSellerAtClosing') {
				$scope.cdformdata.closingAdjustmentItemList.splice(i,1);
				i--;
			}
		}
		for(i=0; i<$scope.cdformdata.prorationsList.length; i++) {
			if($scope.cdformdata.prorationsList[i].integratedDisclosureSectionType == 'DueToSellerAtClosing') {
				$scope.cdformdata.prorationsList.splice(i,1);
				i--;
			}
		}
    	if($scope.summariesOfTransaction_MSection.salePriceProperty)
			$scope.summariesOfTransaction_MSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_MSection.salePriceProperty);
		if($scope.summariesOfTransaction_MSection.salePricePersonalProperty) {
			 $scope.summariesOfTransaction_MSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_MSection.salePricePersonalProperty);
		}
		for(i=0; i<$scope.summariesOfTransaction_MSection.adjustments.length; i++) {
			if($scope.summariesOfTransaction_MSection.adjustments[i].closingAdjustmentItemAmount)
				$scope.summariesOfTransaction_MSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_MSection.adjustments[i].closingAdjustmentItemAmount);
			if($scope.summariesOfTransaction_MSection.adjustments[i].closingAdjustmentItemAmount && $scope.summariesOfTransaction_MSection.adjustments[i].closingAdjustmentItemType) {
				$scope.cdformdata.closingAdjustmentItemList.push($scope.summariesOfTransaction_MSection.adjustments[i]);
			}
		}
		for(i=0; i<$scope.summariesOfTransaction_MSection.adjustmentsPaidBySeller.length; i++) {
			if($scope.summariesOfTransaction_MSection.adjustmentsPaidBySeller[i].prorationItemAmount)
				$scope.summariesOfTransaction_MSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_MSection.adjustmentsPaidBySeller[i].prorationItemAmount);
			if($scope.summariesOfTransaction_MSection.adjustmentsPaidBySeller[i].prorationItemAmount && $scope.summariesOfTransaction_MSection.adjustmentsPaidBySeller[i].prorationItemType) {
				$scope.cdformdata.prorationsList.push($scope.summariesOfTransaction_MSection.adjustmentsPaidBySeller[i]);
			}
		}
		$scope.cdformdata.summariesofTransactions.sellerTransaction.toSellerAtClosing.integratedDisclosureSectionSummaryDetailModel.integratedDisclosureSectionTotalAmount = $scope.summariesOfTransaction_MSection.sectionTotalAmount;
		$scope.sotSellerTransactionTotalAmount = parseFloat($scope.summariesOfTransaction_MSection.sectionTotalAmount) +(- parseFloat($scope.summariesOfTransaction_NSection.sectionTotalAmount));
		}
    }, true);

    $scope.$watch('summariesOfTransaction_LSection', function(newValues,oldValues){
		if($scope.loanBasicInfo.loanFormType == 'standard') {
 		$scope.summariesOfTransaction_LSection.sectionTotalAmount = 0;
        $scope.adjustmentsAndProrationsAmountsLSection = 0;
 		for(i=0; i<$scope.cdformdata.liabilityList.length; i++) {
			if($scope.cdformdata.liabilityList[i].integratedDisclosureSectionType == 'PaidAlreadyByOrOnBehalfOfBorrowerAtClosing') {
				$scope.cdformdata.liabilityList.splice(i,1);
				i--;
			}
		}
 		for(i=0; i<$scope.cdformdata.closingAdjustmentItemList.length; i++) {
			if($scope.cdformdata.closingAdjustmentItemList[i].integratedDisclosureSectionType == 'PaidAlreadyByOrOnBehalfOfBorrowerAtClosing') {
				$scope.cdformdata.closingAdjustmentItemList.splice(i,1);
				i--;
			}
		}
		for(i=0; i<$scope.cdformdata.prorationsList.length; i++) {
			if($scope.cdformdata.prorationsList[i].integratedDisclosureSectionType == 'PaidAlreadyByOrOnBehalfOfBorrowerAtClosing') {
				$scope.cdformdata.prorationsList.splice(i,1);
				i--;
			}
		}
    	if($scope.summariesOfTransaction_LSection.deposit) {
			$scope.summariesOfTransaction_LSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_LSection.deposit);
		    //$scope.cdformdata.cashToCloses.deposit.integratedDisclosureCashToCloseItemFinalAmount = parseFloat($scope.summariesOfTransaction_LSection.deposit*-1);
			if($scope.cdformdata.closingCostFundList && $scope.cdformdata.closingCostFundList.length>0) {
				for (var i = 0; i < $scope.cdformdata.closingCostFundList.length; i++) {
					if($scope.cdformdata.closingCostFundList[i].fundsType=='DepositOnSalesContract' 
						&& $scope.cdformdata.closingCostFundList[i].integratedDisclosureSectionType == 'PaidAlreadyByOrOnBehalfOfBorrowerAtClosing'){
						$scope.cdformdata.closingCostFundList.splice(i, 1);
						i--;
					}
				}
			} else {
				$scope.cdformdata.closingCostFundList = [];
			}
			var closingCostsFound = staticData.cdformdata.closingCostFundList[1];
			closingCostsFound.closingCostFundAmount =parseFloat($scope.summariesOfTransaction_LSection.deposit);
			$scope.cdformdata.closingCostFundList.push(closingCostsFound);
    	}
		if($scope.summariesOfTransaction_LSection.loanAmount) {
			 $scope.summariesOfTransaction_LSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_LSection.loanAmount);
			 $scope.cdformdata.termsOfLoan.assumedLoanAmount = $scope.summariesOfTransaction_LSection.assumedLoanAmount;
		}
		if($scope.summariesOfTransaction_LSection.assumedLoanAmount) {
			$scope.summariesOfTransaction_NSection.assumedLoanAmount = $scope.summariesOfTransaction_LSection.assumedLoanAmount;
			 $scope.summariesOfTransaction_LSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_LSection.assumedLoanAmount);
		}
		if($scope.cdformdata.disclosureOnly) {
			$scope.cdformdata.liabilityList.push($scope.summariesOfTransaction_LSection.liabilites[0]);
		} else {
			if($scope.summariesOfTransaction_LSection.subordinateLien.closingAdjustmentItemAmount){
				$scope.summariesOfTransaction_LSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_LSection.subordinateLien.closingAdjustmentItemAmount);
			}
			if($scope.summariesOfTransaction_LSection.subordinateLien.closingAdjustmentItemAmount && $scope.summariesOfTransaction_LSection.subordinateLien.closingAdjustmentItemType) {
				var adjustment = angular.copy($scope.summariesOfTransaction_LSection.subordinateLien);
				adjustment.integratedDisclosureSectionType='PaidAlreadyByOrOnBehalfOfBorrowerAtClosing';
				adjustment.integratedDisclosureSubsectionType = '';
				$scope.cdformdata.closingAdjustmentItemList.push(adjustment);
			}
 		}
		for(i=0; i<$scope.summariesOfTransaction_LSection.otherCredits.length; i++) {
			if($scope.summariesOfTransaction_LSection.otherCredits[i].closingAdjustmentItemAmount)
				$scope.summariesOfTransaction_LSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_LSection.otherCredits[i].closingAdjustmentItemAmount);
			if($scope.summariesOfTransaction_LSection.otherCredits[i].closingAdjustmentItemAmount && $scope.summariesOfTransaction_LSection.otherCredits[i].closingAdjustmentItemType) {
				$scope.cdformdata.closingAdjustmentItemList.push($scope.summariesOfTransaction_LSection.otherCredits[i]);
				$scope.adjustmentsAndProrationsAmountsLSection += parseFloat($scope.summariesOfTransaction_LSection.otherCredits[i].closingAdjustmentItemAmount);
			}
		}
		for(i=0; i<$scope.summariesOfTransaction_LSection.adjustments.length; i++) {
			if($scope.summariesOfTransaction_LSection.adjustments[i].closingAdjustmentItemAmount)
				$scope.summariesOfTransaction_LSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_LSection.adjustments[i].closingAdjustmentItemAmount);
			if($scope.summariesOfTransaction_LSection.adjustments[i].closingAdjustmentItemAmount && $scope.summariesOfTransaction_LSection.adjustments[i].closingAdjustmentItemType) {
				$scope.cdformdata.closingAdjustmentItemList.push($scope.summariesOfTransaction_LSection.adjustments[i]);
				if($scope.summariesOfTransaction_LSection.adjustments[i].closingAdjustmentItemType!='SellerCredit'){
				   $scope.adjustmentsAndProrationsAmountsLSection += parseFloat($scope.summariesOfTransaction_LSection.adjustments[i].closingAdjustmentItemAmount);
			    }
			}
			//Seller Credit
			if($scope.summariesOfTransaction_LSection.adjustments[i].closingAdjustmentItemType=='SellerCredit'){
        		$scope.cdformdata.cashToCloses.sellerCredits.integratedDisclosureCashToCloseItemFinalAmount = parseFloat($scope.summariesOfTransaction_LSection.adjustments[i].closingAdjustmentItemAmount*-1);
        		for(var j=0; j<$scope.summariesOfTransaction_NSection.adjustments.length; j++) {
        			if($scope.summariesOfTransaction_NSection.adjustments[j].closingAdjustmentItemType=='SellerCredit'){
        				$scope.summariesOfTransaction_NSection.adjustments[j].closingAdjustmentItemAmount = $scope.summariesOfTransaction_LSection.adjustments[i].closingAdjustmentItemAmount;
        			}
        		}
        	}
		}
		$scope.summariesOfTransaction_NSection.adjustmentsUnpaidBySeller = [];
		for(i=0; i<$scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller.length; i++) {
			if($scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller[i].prorationItemAmount)
				$scope.summariesOfTransaction_LSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller[i].prorationItemAmount);
			if($scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller[i].prorationItemAmount && $scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller[i].prorationItemType) {
				$scope.cdformdata.prorationsList.push($scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller[i]);
			    $scope.adjustmentsAndProrationsAmountsLSection += parseFloat($scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller[i].prorationItemAmount);
			}

			var adjustmentUnpaidBySeller = angular.copy($scope.summariesOfTransaction_LSection.adjustmentsUnpaidBySeller[i]);
			adjustmentUnpaidBySeller.integratedDisclosureSectionType = 'DueFromSellerAtClosing';
			adjustmentUnpaidBySeller.integratedDisclosureSubsectionType = 'AdjustmentsForItemsUnpaidBySeller';
			$scope.summariesOfTransaction_NSection.adjustmentsUnpaidBySeller.push(adjustmentUnpaidBySeller);
		}
		$scope.cdformdata.summariesofTransactions.borrowerTransaction.paidAlreadyByOrOnBehalfOfBorrowerAtClosing.integratedDisclosureSectionSummaryDetailModel.integratedDisclosureSectionTotalAmount = $scope.summariesOfTransaction_LSection.sectionTotalAmount;
		$scope.sotBorrowerTransactionTotalAmount = parseFloat($scope.summariesOfTransaction_KSection.sectionTotalAmount) +(-parseFloat($scope.summariesOfTransaction_LSection.sectionTotalAmount));
        
        //Calculating Cash To Close
		//Adjustments And Other Credits

        $scope.adjustmentsAndProrationsAmountsKSection = $scope.adjustmentsAndProrationsAmountsKSection ? parseFloat($scope.adjustmentsAndProrationsAmountsKSection) : +0;
		$scope.adjustmentsAndProrationsAmountsLSection = $scope.adjustmentsAndProrationsAmountsLSection ? parseFloat($scope.adjustmentsAndProrationsAmountsLSection) : +0;
	    $scope.cdformdata.cashToCloses.adjustmentsAndOtherCredits.integratedDisclosureCashToCloseItemFinalAmount = parseFloat($scope.cdformdata.salesContractDetail.personalPropertyAmount ? $scope.cdformdata.salesContractDetail.personalPropertyAmount : +0)+parseFloat($scope.adjustmentsAndProrationsAmountsKSection)-parseFloat($scope.adjustmentsAndProrationsAmountsLSection)-parseFloat($scope.summariesOfTransaction_LSection.subordinateLien.closingAdjustmentItemAmount ? $scope.summariesOfTransaction_LSection.subordinateLien.closingAdjustmentItemAmount : +0);
		}
    }, true);

    $scope.$watch('summariesOfTransaction_NSection', function(newValues,oldValues){
		if($scope.loanBasicInfo.loanFormType == 'standard') {
 		$scope.summariesOfTransaction_NSection.sectionTotalAmount = 0;
 		for(i=0; i<$scope.cdformdata.liabilityList.length; i++) {
			if($scope.cdformdata.liabilityList[i].integratedDisclosureSectionType == 'DueFromSellerAtClosing') {
				$scope.cdformdata.liabilityList.splice(i,1);
				i--;
			}
		}
 		for(i=0; i<$scope.cdformdata.closingAdjustmentItemList.length; i++) {
			if($scope.cdformdata.closingAdjustmentItemList[i].integratedDisclosureSectionType == 'DueFromSellerAtClosing') {
				$scope.cdformdata.closingAdjustmentItemList.splice(i,1);
				i--;
			}
		}
		for(i=0; i<$scope.cdformdata.prorationsList.length; i++) {
			if($scope.cdformdata.prorationsList[i].integratedDisclosureSectionType == 'DueFromSellerAtClosing') {
				$scope.cdformdata.prorationsList.splice(i,1);
				i--;
			}
		}
    	if($scope.summariesOfTransaction_NSection.excessDeposit) {
			$scope.summariesOfTransaction_NSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_NSection.excessDeposit);
			if($scope.cdformdata.closingCostFundList && $scope.cdformdata.closingCostFundList.length>0) {
				for (var i = 0; i < $scope.cdformdata.closingCostFundList.length; i++) {
					if($scope.cdformdata.closingCostFundList[i].fundsType=='ExcessDeposit' 
						&& $scope.cdformdata.closingCostFundList[i].integratedDisclosureSectionType == 'DueFromSellerAtClosing'){
						$scope.cdformdata.closingCostFundList.splice(i, 1);
						i--;
					}
				}
			} else {
				$scope.cdformdata.closingCostFundList = [];
			}

			var closingCostsFound = staticData.cdformdata.closingCostFundList[0];
			closingCostsFound.closingCostFundAmount =parseFloat($scope.summariesOfTransaction_NSection.excessDeposit);
			$scope.cdformdata.closingCostFundList.push(closingCostsFound);
    	}
		if($scope.summariesOfTransaction_NSection.closingCostsPaidAtClosing)
			$scope.summariesOfTransaction_NSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_NSection.closingCostsPaidAtClosing);
		if($scope.summariesOfTransaction_NSection.assumedLoanAmount) {
			 $scope.summariesOfTransaction_NSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_NSection.assumedLoanAmount);
		}
		for(i=0; i<$scope.summariesOfTransaction_NSection.liabilites.length; i++) {
			if($scope.summariesOfTransaction_NSection.liabilites[i].payoffAmount)
				$scope.summariesOfTransaction_NSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_NSection.liabilites[i].payoffAmount);
			if($scope.summariesOfTransaction_NSection.liabilites[i].payoffAmount && $scope.summariesOfTransaction_NSection.liabilites[i].liabilityType) {
				$scope.cdformdata.liabilityList.push($scope.summariesOfTransaction_NSection.liabilites[i]);
			}
		}
		for(i=0; i<$scope.summariesOfTransaction_NSection.liabilitesAndAdjustments.length; i++) {
			if($scope.summariesOfTransaction_NSection.liabilitesAndAdjustments[i].amount)
				$scope.summariesOfTransaction_NSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_NSection.liabilitesAndAdjustments[i].amount);
			if($scope.summariesOfTransaction_NSection.liabilitesAndAdjustments[i].dueFromSellerItemType == 'Liability') {
				if($scope.summariesOfTransaction_NSection.liabilitesAndAdjustments[i].amount && $scope.summariesOfTransaction_NSection.liabilitesAndAdjustments[i].itemType) {
					var liability_N = angular.copy(liability);
					liability_N.displayLabel = $scope.summariesOfTransaction_NSection.liabilitesAndAdjustments[i].displayLabel;
					liability_N.liabilityType = $scope.summariesOfTransaction_NSection.liabilitesAndAdjustments[i].itemType;
					liability_N.liabilityTypeOtherDescription = $scope.summariesOfTransaction_NSection.liabilitesAndAdjustments[i].otherDescription;
					liability_N.integratedDisclosureSectionType = "DueFromSellerAtClosing";
					liability_N.payoffAmount = $scope.summariesOfTransaction_NSection.liabilitesAndAdjustments[i].amount;
					$scope.cdformdata.liabilityList.push(liability_N);
				}
			} else if($scope.summariesOfTransaction_NSection.liabilitesAndAdjustments[i].dueFromSellerItemType == 'Adjustment') {
				if($scope.summariesOfTransaction_NSection.liabilitesAndAdjustments[i].amount && $scope.summariesOfTransaction_NSection.liabilitesAndAdjustments[i].itemType) {
					var adjustment_N = angular.copy(adjustment);
					adjustment_N.displayLabel = $scope.summariesOfTransaction_NSection.liabilitesAndAdjustments[i].displayLabel;
					adjustment_N.closingAdjustmentItemType = $scope.summariesOfTransaction_NSection.liabilitesAndAdjustments[i].itemType;
					adjustment_N.closingAdjustmentItemTypeOtherDescription = $scope.summariesOfTransaction_NSection.liabilitesAndAdjustments[i].otherDescription;
					adjustment_N.integratedDisclosureSectionType = "DueFromSellerAtClosing";
					adjustment_N.closingAdjustmentItemPaidOutsideOfClosingIndicator = $scope.summariesOfTransaction_NSection.liabilitesAndAdjustments[i].pocIndicator;
					adjustment_N.closingAdjustmentItemAmount = $scope.summariesOfTransaction_NSection.liabilitesAndAdjustments[i].amount;
					$scope.cdformdata.closingAdjustmentItemList.push(adjustment_N);
				}
			}
		}
		for(i=0; i<$scope.summariesOfTransaction_NSection.adjustments.length; i++) {
			if($scope.summariesOfTransaction_NSection.adjustments[i].closingAdjustmentItemAmount)
				$scope.summariesOfTransaction_NSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_NSection.adjustments[i].closingAdjustmentItemAmount);
			if($scope.summariesOfTransaction_NSection.adjustments[i].closingAdjustmentItemAmount && $scope.summariesOfTransaction_NSection.adjustments[i].closingAdjustmentItemType) {
				$scope.cdformdata.closingAdjustmentItemList.push($scope.summariesOfTransaction_NSection.adjustments[i]);
			}
		}
		for(i=0; i<$scope.summariesOfTransaction_NSection.adjustmentsUnpaidBySeller.length; i++) {
			if($scope.summariesOfTransaction_NSection.adjustmentsUnpaidBySeller[i].prorationItemAmount)
				$scope.summariesOfTransaction_NSection.sectionTotalAmount += parseFloat($scope.summariesOfTransaction_NSection.adjustmentsUnpaidBySeller[i].prorationItemAmount);
			if($scope.summariesOfTransaction_NSection.adjustmentsUnpaidBySeller[i].prorationItemAmount && $scope.summariesOfTransaction_NSection.adjustmentsUnpaidBySeller[i].prorationItemType) {
				$scope.cdformdata.prorationsList.push($scope.summariesOfTransaction_NSection.adjustmentsUnpaidBySeller[i]);
			}
		}
		$scope.cdformdata.summariesofTransactions.sellerTransaction.fromSellerAtClosing.integratedDisclosureSectionSummaryDetailModel.integratedDisclosureSectionTotalAmount = $scope.summariesOfTransaction_NSection.sectionTotalAmount;
		$scope.cdformdata.summariesofTransactions.sellerTransaction.fromSellerAtClosing.integratedDisclosureSectionSummaryDetailModel.integratedDisclosureSectionType = 'DueFromSellerAtClosing';
		$scope.sotSellerTransactionTotalAmount = parseFloat($scope.summariesOfTransaction_MSection.sectionTotalAmount) +(- parseFloat($scope.summariesOfTransaction_NSection.sectionTotalAmount));
		}
    }, true);


    $scope.$watch('cdformdata.termsOfLoan', function(newValue,oldValue){
    	if($scope.loanBasicInfo.loanFormType == 'standard'){
			if($scope.cdformdata.termsOfLoan.noteAmount){
				$scope.summariesOfTransaction_LSection.loanAmount = $scope.cdformdata.termsOfLoan.noteAmount;
			} else{
				$scope.summariesOfTransaction_LSection.loanAmount = 0;
			}
		}
   
	//Calculations regarding Loan Discount Percentage in Section A. Origination Charge of Other Costs
 	for(i=0; i<$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges.length; i++){
	   if ($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].feeType == 'LoanDiscountPoints'){
		   var loanDiscountAmount = 0;
		   var totalPercent = 0;
		   if($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].feeTotalPercent && $scope.cdformdata.termsOfLoan.noteAmount){
		   		loanDiscountAmount = $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].feeTotalPercent ? ($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].feeTotalPercent*$scope.cdformdata.termsOfLoan.noteAmount)/100 : +0;
	 	   		totalPercent = parseFloat($scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].feeTotalPercent ? $scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].feeTotalPercent : +0);
	 	   		$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpAtClosing = loanDiscountAmount;
		   } else {
		   		$scope.cdformdata.closingCostDetailsLoanCosts.originationCharges[i].bpAtClosing ='';
		   }

		   //Reg.Z Excluded Bona Fide Discount Points Indicator
	       if(totalPercent>0){
	           	$scope.cdformdata.loanCalculationsQualifiedMortgage.qualifiedMortgage.regulationZExcludedBonaFideDiscountPointsIndicator = true;
	           	$scope.cdformdata.loanCalculationsQualifiedMortgage.qualifiedMortgage.regulationZExcludedBonaFideDiscountPointsPercent = totalPercent;
	       }else{
	            $scope.cdformdata.loanCalculationsQualifiedMortgage.qualifiedMortgage.regulationZExcludedBonaFideDiscountPointsIndicator = false;
	            $scope.cdformdata.loanCalculationsQualifiedMortgage.qualifiedMortgage.regulationZExcludedBonaFideDiscountPointsPercent = '';
	       }
       }
    }
    
     if($scope.cdformdata.termsOfLoan.noteAmount && $scope.cdformdata.termsOfLoan.noteAmount!=undefined && $scope.loanBasicInfo.loanFormType == 'alternate'){
        $scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemFinalAmount = parseFloat($scope.cdformdata.termsOfLoan.noteAmount ? $scope.cdformdata.termsOfLoan.noteAmount : +0);
        $scope.cdformdata.cashToCloses.loanAmount.integratedDisclosureCashToCloseItemType = 'LoanAmount';
     }
     //Cash To Close Calculations
     cashToclosesCalculations();
    
     var etiaTotalAmount = 0;
     var nonEscrowAmount = 0;
     for(i=0; i<$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.length; i++) {

        //Calculation For Estimated Taxes Insurance Assessment Total Amount
        if($scope.cdformdata.integratedDisclosureDetail.firstYearTotalNonEscrowPaymentAmount && $scope.cdformdata.integratedDisclosureDetail.firstYearTotalNonEscrowPaymentAmount!=undefined){
            nonEscrowAmount = $scope.cdformdata.integratedDisclosureDetail.firstYearTotalNonEscrowPaymentAmount ? parseFloat($scope.cdformdata.integratedDisclosureDetail.firstYearTotalNonEscrowPaymentAmount) : +0;
        }
    	if($scope.cdformdata.termsOfLoan.lienPriorityType=='FirstLien' && $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType!='MortgageInsurance' && $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType!=''){
            etiaTotalAmount += $scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowMonthlyPaymentAmount ? parseFloat($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowMonthlyPaymentAmount) : +0; 
        }

        //Escrowed Property Costs over Year 1 & Monthly Escrow Payment
        if($scope.cdformdata.loanDetail.escrowIndicator){
        	$scope.cdformdata.integratedDisclosureDetail.firstYearTotalEscrowPaymentAmount = etiaTotalAmount ? parseFloat(etiaTotalAmount*12) : +0;
        }else {
	        $scope.cdformdata.integratedDisclosureDetail.firstYearTotalEscrowPaymentAmount = 0;
	    }


        $scope.cdformdata.etiaSection.projectedPaymentEstimatedTaxesInsuranceAssessmentTotalAmount = parseFloat(($scope.cdformdata.integratedDisclosureDetail.firstYearTotalEscrowPaymentAmount+nonEscrowAmount)/12);

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

    $scope.$watch('MERS_MIN_ID',function(newValue,oldValue){
     	for(var i=0; i<$scope.cdformdata.loanInformation.loanIdentifiers.length; i++) {
			if($scope.cdformdata.loanInformation.loanIdentifiers[i].loanIdentifierType == 'MERS_MIN') {
				$scope.cdformdata.loanInformation.loanIdentifiers.splice(i,1);
				i--;
			}
		}
    	if($scope.MERS_MIN_ID) {
			var loanIdentifier = {
            	"loanIdentifierType": "MERS_MIN",
            	"loanIdentifier": $scope.MERS_MIN_ID
        	};
        	$scope.cdformdata.loanInformation.loanIdentifiers.push(loanIdentifier);
	   	}
    }, true);

    $scope.$watch('cdformdata.micIdentifier',function(newValue,oldValue){
    	if($scope.cdformdata.micIdentifier) {
    		$scope.cdformdata.loanDetail.miRequiredIndicator = true;
    		if($scope.cdformdata.termsOfLoan.mortgageType!='Conventional') {
    			for(i=0;i<$scope.cdformdata.loanInformation.loanIdentifiers.length;i++){
		    		if($scope.cdformdata.loanInformation.loanIdentifiers[i].loanIdentifierType=='AgencyCase'){
		    			$scope.cdformdata.loanInformation.loanIdentifiers.splice(i,1);
		    		}
		    	}
    			var loanIdentifier = {
                	"loanIdentifierType": "AgencyCase",
                	"loanIdentifier": $scope.cdformdata.micIdentifier
	        	};
	        	$scope.cdformdata.loanInformation.loanIdentifiers.push(loanIdentifier);
	        	$scope.cdformdata.miDataDetail.miCertificateIdentifier='';
    		} else {
    			$scope.cdformdata.miDataDetail.miCertificateIdentifier = $scope.cdformdata.micIdentifier;
    		}
	   	}
    }, true);

    $scope.$watch('cdformdata.termsOfLoan.mortgageType',function(newValue,oldValue){
    	if($scope.cdformdata.micIdentifier) {
    		$scope.cdformdata.loanDetail.miRequiredIndicator = true;
    		if($scope.cdformdata.termsOfLoan.mortgageType!='Conventional') {
    			for(i=0;i<$scope.cdformdata.loanInformation.loanIdentifiers.length;i++){
		    		if($scope.cdformdata.loanInformation.loanIdentifiers[i].loanIdentifierType=='AgencyCase'){
		    			$scope.cdformdata.loanInformation.loanIdentifiers.splice(i,1);
		    		}
		    	}
    			var loanIdentifier = {
                	"loanIdentifierType": "AgencyCase",
                	"loanIdentifier": $scope.cdformdata.micIdentifier
	        	};
	        	$scope.cdformdata.loanInformation.loanIdentifiers.push(loanIdentifier);
	        	$scope.cdformdata.miDataDetail.miCertificateIdentifier='';
    		} else {
    			$scope.cdformdata.miDataDetail.miCertificateIdentifier = $scope.cdformdata.micIdentifier;
    		}
	   	}
    }, true);

	$scope.$watch('cdformdata.loanTerms.prepaymentPenalty.prepaymentPenaltyExpirationInYears',function(newValue,oldValue){
    	if($scope.cdformdata.loanTerms.prepaymentPenalty.prepaymentPenaltyExpirationInYears) {
    		$scope.cdformdata.loanTerms.prepaymentPenalty.prepaymentPenaltyExpirationMonthsCount = parseInt($scope.cdformdata.loanTerms.prepaymentPenalty.prepaymentPenaltyExpirationInYears) * 12; 
    	} else {
    		$scope.cdformdata.loanTerms.prepaymentPenalty.prepaymentPenaltyExpirationMonthsCount = '';
    	}
	}, true);

	$scope.$watch('cdformdata.projectedPayments.miPaymentAmount',function(newValue,oldValue){
        if($scope.cdformdata.projectedPayments.miPaymentAmount && $scope.cdformdata.projectedPayments.miPaymentAmount!=undefined){
        	for(i=0;i<$scope.cdformdata.projectedPayments.paymentCalculation.length;i++){
        	 	$scope.cdformdata.projectedPayments.mortgageInsurance[i].projectedPaymentMIPaymentAmount = $scope.cdformdata.projectedPayments.miPaymentAmount ? $scope.cdformdata.projectedPayments.miPaymentAmount : 0.00;
            }
            for(i=0;i<$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList.length;i++){
            	if($scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowItemType == 'MortgageInsurance'){
            		$scope.cdformdata.closingCostDetailsOtherCosts.escrowItemsList[i].escrowMonthlyPaymentAmount = $scope.cdformdata.projectedPayments.miPaymentAmount ? $scope.cdformdata.projectedPayments.miPaymentAmount : 0.00;
            		$scope.amountPerMonth('1');
            	}
            }
        }
	},true);
 
    $scope.$watch('cdformdata.principalAndInterestMonthsCount',function(newValue,oldValue){
		if($scope.cdformdata.principalAndInterestMonthsCount && $scope.cdformdata.principalAndInterestMonthsCount!=undefined){
		   $scope.cdformdata.principalAndInterestPaymentAdjustment.firstPrincipalAndInterestPaymentChangeMonthsCount = $scope.cdformdata.principalAndInterestMonthsCount+1;
		}
	},true);
    
    //Total closing Costs
    $scope.$watch('cdformdata.closingCostsTotal.totalClosingCosts',function(newValue,oldValue){
        if($scope.cdformdata.closingCostsTotal.totalClosingCosts){
      	   $scope.cdformdata.cashToCloses.totalClosingCosts.integratedDisclosureCashToCloseItemFinalAmount = $scope.cdformdata.closingCostsTotal.totalClosingCosts;
        }
    },true);

    $scope.$watch('cdformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing',function(newValue,oldValue){
        if($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing){
		   $scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemFinalAmount = parseFloat($scope.cdformdata.closingCostsTotal.closingCostsSubtotal.bpB4Closing*-1); 
           $scope.cdformdata.cashToCloses.closingCostsPaidBeforeClosing.integratedDisclosureCashToCloseItemType = 'ClosingCostsPaidBeforeClosing';
        }
    },true);

    $scope.$watch('cdformdata.etiaSection',function(newValue,oldValue){
    	$scope.cdformdata.nonEscrowArray = [];  
    	var yesVal=0;
	    var noVal=0;
	    var someVal=0;

        if($scope.cdformdata.etiaSection.propertyTaxesCheck == true){
        	if($scope.cdformdata.escrowArray.indexOf('PropertyTaxes')!=-1){
        		$scope.cdformdata.etiaSection.etiaValues[0].projectedPaymentEscrowedType ='Escrowed'
        		$scope.cdformdata.etiaSection.etiaValues[0].insuranceTaxCheck = true; 
        	}else if($scope.cdformdata.escrowArray.indexOf('PropertyTaxes')==-1){
        		$scope.cdformdata.etiaSection.etiaValues[0].projectedPaymentEscrowedType ='NotEscrowed'
        		$scope.cdformdata.etiaSection.etiaValues[0].insuranceTaxCheck = false;
        	}
        }else if($scope.cdformdata.etiaSection.propertyTaxesCheck == false){
        	$scope.cdformdata.etiaSection.etiaValues[0].projectedPaymentEscrowedType ='';
        	$scope.cdformdata.etiaSection.etiaValues[0].insuranceTaxCheck = false;
        }

        if($scope.cdformdata.etiaSection.HomeownersInsuranceCheck == true){
        	if($scope.cdformdata.escrowArray.indexOf('HomeownersInsurance')!=-1){
        		$scope.cdformdata.etiaSection.etiaValues[1].projectedPaymentEscrowedType ='Escrowed'
        		$scope.cdformdata.etiaSection.etiaValues[1].insuranceTaxCheck = true;
        	}else if($scope.cdformdata.escrowArray.indexOf('HomeownersInsurance')==-1){
        		$scope.cdformdata.etiaSection.etiaValues[1].projectedPaymentEscrowedType ='NotEscrowed'
        		$scope.cdformdata.etiaSection.etiaValues[1].insuranceTaxCheck = false;
        	}
        }else if($scope.cdformdata.etiaSection.HomeownersInsuranceCheck == false){
            $scope.cdformdata.etiaSection.etiaValues[1].projectedPaymentEscrowedType ='';
        	$scope.cdformdata.etiaSection.etiaValues[1].insuranceTaxCheck = false;
        }     

    	// if($scope.cdformdata.loanDetail.escrowIndicator){	
	    for(i=0;i<$scope.cdformdata.etiaSection.etiaValues.length;i++){
            if($scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEscrowedType=='NotEscrowed' && $scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType!='HomeownersInsurance' && $scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType!='PropertyTaxes'){
                $scope.cdformdata.nonEscrowArray.push($scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType);
	        }
	    }
	    //Adding Values to Non Escrow Account
	    if($scope.cdformdata.nonEscrowArray.length>0){
	        $scope.cdformdata.integratedDisclosureDetail.firstYearTotalNonEscrowPaymentDescription =
	        angular.forEach($scope.cdformdata.nonEscrowArray, function(value) { 
	        	return value;
	        }).join(",").replace(/([A-Z]+)/g, " $1");
	    }

	    for(i=0;i<$scope.cdformdata.etiaSection.etiaValues.length;i++){
            if($scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType!='HomeownersInsurance' 
           	&& $scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType!='PropertyTaxes'
            	&& $scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType!=''){
            	$scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEscrowedType='NotEscrowed';
            	for(j=0;j<$scope.cdformdata.escrowArray.length;j++){
            		if($scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType==$scope.cdformdata.escrowArray[j]){
                        $scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEscrowedType='Escrowed';
		            }
            	}
            }
		}

        for(i=0;i<$scope.cdformdata.etiaSection.etiaValues.length;i++){
            if($scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType!='Homeowners Insurance' 
            	&& $scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType!='Property Taxes'
            	&& $scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType!=''){
                if($scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEscrowedType=='NotEscrowed'){
                	noVal++;
                }else if($scope.cdformdata.etiaSection.etiaValues[i].projectedPaymentEscrowedType=='Escrowed'){
                    yesVal++;
                }
            }
		}

		if(noVal>0 && yesVal>0){
          $scope.cdformdata.etiaSection.otherData = 'Some';
          $scope.cdformdata.etiaSection.otherCheck = true;
		}else if(noVal==0 && yesVal>0){
           $scope.cdformdata.etiaSection.otherData = 'Yes';
           $scope.cdformdata.etiaSection.otherCheck = true;
		}else if(noVal>0 && yesVal==0){
           $scope.cdformdata.etiaSection.otherData = 'No';
           $scope.cdformdata.etiaSection.otherCheck = true;
		}else{
		   $scope.cdformdata.etiaSection.otherData = '';
		   $scope.cdformdata.etiaSection.otherCheck = false;
		}

    },true);
     
    $scope.$watch('cdformdata.contactInformation',function(newValue,oldValue){
    	if($scope.cdformdata.contactInformation.lender!=null && $scope.cdformdata.contactInformation.lender!=undefined){
           $scope.cdformdata.contactInformation.lender.partyRoleType = 'NotePayTo';
    	}
    	if($scope.cdformdata.contactInformation.mortagageBroker!=null && $scope.cdformdata.contactInformation.mortagageBroker!=undefined){
           $scope.cdformdata.contactInformation.mortagageBroker.partyRoleType = 'MortgageBroker';
    	}
    	if($scope.cdformdata.contactInformation.realEstateBrokerB!=null && $scope.cdformdata.contactInformation.realEstateBrokerB!=undefined){
           $scope.cdformdata.contactInformation.realEstateBrokerB.partyRoleType = 'RealEstateAgent';
    	}
    	if($scope.cdformdata.contactInformation.realEstateBrokerS!=null && $scope.cdformdata.contactInformation.realEstateBrokerS!=undefined){
           $scope.cdformdata.contactInformation.realEstateBrokerS.partyRoleType = 'RealEstateAgent';
    	}
    	if($scope.cdformdata.contactInformation.settlementAgent!=null && $scope.cdformdata.contactInformation.settlementAgent!=undefined){
           $scope.cdformdata.contactInformation.settlementAgent.partyRoleType = 'ClosingAgent';
    	}

    },true);

     $scope.$watch('cdformdata.miDataDetail',function(newValue,oldValue){
        if($scope.cdformdata.miDataDetail.miCompanyNameType){
        	for(i=0;i<$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList.length;i++){
        		if($scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidItemType == 'MortgageInsurancePremium'){
        			if($scope.cdformdata.miDataDetail.miCompanyNameType!='Other'){
        				$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidPaidToFullName = $scope.cdformdata.miDataDetail.miCompanyNameType;
		    		}else{
        				$scope.cdformdata.closingCostDetailsOtherCosts.prepaidsList[i].prepaidPaidToFullName = $scope.cdformdata.miDataDetail.miCompanyNameTypeOtherDescription;
		    		}
        		}
        	}
        }
    },true);

    $scope.$watch('cdformdata.closingDisclosureDocDetails',function(newValue,oldValue){
        if(!$scope.cdformdata.closingDisclosureDocDetails.documentSignatureRequiredIndicator){
        	$scope.cdformdata.closingDisclosureDocDetails.actualSignatureType = '';
        	$scope.cdformdata.closingDisclosureDocDetails.actualSignatureTypeOtherDescription = '';
        	$scope.cdformdata.closingDisclosureDocDetails.executionDate = $scope.cdformdata.closingInformationDetail.closingDate;
        }
    },true);

     /// Start for Header meta data ///
		    $rootScope.applicantLastnameforHeader=$scope.cdformdata.transactionInformation.borrowerDetails[0].nameModel.lastName;
		    $rootScope.lenderIDForHeader=$scope.cdformdata.loanInformation.loanIdentifiers[0].loanIdentifier;

		    $scope.$watch('cdformdata.transactionInformation.borrowerDetails[0].nameModel.lastName',function(newValue,oldValue){
		    	 $rootScope.applicantLastnameforHeader=$scope.cdformdata.transactionInformation.borrowerDetails[0].nameModel.lastName;
		    	 $rootScope.lenderIDForHeader=$scope.cdformdata.loanInformation.loanIdentifiers[0].loanIdentifier;
		    },true);

		    $scope.$watch('cdformdata.loanInformation.loanIdentifiers',function(newValue,oldValue){
		    	 $rootScope.lenderIDForHeader=$scope.cdformdata.loanInformation.loanIdentifiers[0].loanIdentifier;
		    },true);

    /// End for Header meta data ///

    $scope.SameAsPropertyInformation = function () {    
    	
        	this.borrower.address.addressLineText=$scope.cdformdata.closingInformation.property.addressLineText;
        	this.borrower.address.cityName=$scope.cdformdata.closingInformation.property.cityName;
        	this.borrower.address.countryCode='US';
        	this.borrower.address.stateCode=$scope.cdformdata.closingInformation.property.stateCode;
        	this.borrower.address.postalCode=$scope.cdformdata.closingInformation.property.postalCode;
        
     };


/// Start to enable dirty flag
$scope.$watch('cdformdata',function(newValue,oldValue){
$scope.dirtyFlagEnable=false;
    if(($scope.cdformdata.salesContractDetail.saleContractAmount|| $scope.cdformdata.salesContractDetail.realPropertyAmount || 
    	$scope.cdformdata.closingInformation.propertyValuationDetail.propertyValuationAmount  || 
    	$scope.cdformdata.closingInformation.propertyValuationDetail.propertyEstimatedValueAmount )
    && $scope.cdformdata.loanInformation.loanTermYears 
    && ($scope.cdformdata.termsOfLoan.noteRatePercent  || $scope.cdformdata.termsOfLoan.disclosedFullyIndexedRatePercent )
    && $scope.cdformdata.termsOfLoan.noteAmount 
    && $scope.cdformdata.loanInformation.amortizationType 
    ){
    $scope.dirtyFlagEnable=true;
    ///nested if start
     if($scope.cdformdata.loanInformation.amortizationType =='AdjustableRate' || $scope.cdformdata.loanInformation.amortizationType !='Fixed'){
	    $scope.dirtyFlagEnable=false;
	    if($scope.cdformdata.interestRateAdjustment.firstRateChangeMonthsCount && $scope.cdformdata.interestRateAdjustment.ceilingRatePercent
			    && $scope.cdformdata.interestRateAdjustment.firstPerChangeRateAdjustmentFrequencyMonthsCount
			    && $scope.cdformdata.interestRateAdjustment.firstPerChangeMaximumIncreaseRatePercent &&
			    $scope.cdformdata.principalAndInterestPaymentAdjustment.firstPrincipalAndInterestPaymentChangeMonthsCount
			    && $scope.cdformdata.principalAndInterestPaymentAdjustment.firstPerChangePrincipalAndInterestPaymentAdjustmentFrequencyMonthsCount){
	    			$scope.dirtyFlagEnable=true;
				    if($scope.cdformdata.loanDetail.miRequiredIndicator==true){
				    	$scope.dirtyFlagEnable=false;
					    if($scope.cdformdata.projectedPayments.miPaymentAmount  && $scope.cdformdata.miDataDetail.miScheduledTerminationDate 
					     && $scope.cdformdata.closingInformationDetail.closingDate){
					    	$scope.dirtyFlagEnable=true;  } 
				   }  else if($scope.cdformdata.loanDetail.miRequiredIndicator==false){
				   	$scope.dirtyFlagEnable=true;
				   }
				
			   	 }
		    }
		    else if($scope.cdformdata.loanInformation.amortizationType=='Fixed' && $scope.cdformdata.termsOfLoan.noteRatePercent){
			    	$scope.dirtyFlagEnable=true; 
		     }
    	}

	},true);
 /// End to enable dirty flag

    $scope.renderHelpText = function(elementName) {
    	var helpText = $("#"+elementName).html();
    	var elementTitle = $("help-verbiage[name='"+elementName+"']").attr('title');
    	var elementText =  getDynamicTemplate(elementName, elementTitle) +'<span>'+ helpText + '</span></span></span>';
    	$("help-verbiage[name='"+elementName+"']").html(elementText);
    }
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

function add_business_days_disbursement(date, days) {
    var now = new Date(date);
    var dayOfTheWeek = now.getDay();
    var calendarDays = days;
    var deliveryDay = dayOfTheWeek + days;

    if(dayOfTheWeek!=6){
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
    }else if(dayOfTheWeek==6){
            days -= 6 - dayOfTheWeek;
	    	//count this coming weekend
	    	calendarDays += 1;
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

function differenceInDays(fromDate, toDate, perDiemMethodType) {
	var startDate = new Date(fromDate);
	var endDate = new Date(toDate);
	var diffDays = 0;
	switch(perDiemMethodType) {
		case "360": {
			var startmonth = startDate.getMonth() + 1; //months from 1-12
			var startday = startDate.getDate();
			var startyear = startDate.getFullYear();

			var endmonth = endDate.getMonth() + 1; //months from 1-12
			var endday = endDate.getDate();
			var endyear = endDate.getFullYear();
			if(endyear>=startyear) {
				var yeardiff =0, monthDiff=0, daysdiff = 0; 
				if(endyear>startyear) 
					yeardiff = endyear - startyear;
				monthDiff = yeardiff * 12;
				monthDiff = monthDiff - startmonth;
				monthDiff = monthDiff + endmonth;
				monthDiff =  monthDiff <= 0 ? 0 : monthDiff;
				if(monthDiff>0) {
					if(startday>endday) {
						startday = startday == 31 ? 30 : startday;
						daysdiff = 30 - startday;
						daysdiff = daysdiff + endday;
						if(monthDiff>0)
							daysdiff = daysdiff + ((monthDiff-1) * 30);
					} else if(startday<endday) {
						daysdiff = endday - startday;
						if(monthDiff>0)
							daysdiff = daysdiff + (monthDiff * 30);
					} else if(startday == endday){
						daysdiff = monthDiff * 30;
					}
				} else {
					if(startday<endday) {
						endday = endday == 31 ? 30 : endday;
						daysdiff = endday - startday;
					}
				}
				diffDays = daysdiff;
			}
		}
		break;
	    case "365": {
	    	var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
			diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

			var startmonth = startDate.getMonth() + 1; //months from 1-12
			var startday = startDate.getDate();
			var startyear = startDate.getFullYear();

			var endmonth = endDate.getMonth() + 1; //months from 1-12
			var endday = endDate.getDate();
			var endyear = endDate.getFullYear();
			if(isLeapYear(startyear) || isLeapYear(endyear)) {
				if((startmonth<=2) || endmonth >= 2) {
					diffDays = diffDays - 1;
				}
			}
	    }
	    break;
	    default: {
	    	var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
			diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
	    }
	}
	return diffDays;
}

function isLeapYear(year) {
	if (((year % 4 == 0) && !(year % 100 == 0)) || (year % 400 == 0))
		return true;
	return false;
}

function getDynamicTemplate (elemName, elemtitle){
	var classTemp="";
	if(elemtitle == "help_tooltip"){
	  classTemp ='<span class="helpText tooltip-msg" ng-mouseover="renderHelpText(\''+elemName+'\')"> ? <span>';
	}else if(elemtitle == "help_tooltip_text"){
	  classTemp ='<span class="helpText tooltip-msg tooltip_text" ng-mouseover="renderHelpText(\''+elemName+'\')"> ? <span>';
	}else if(elemtitle == "help_tooltip_textLeft"){
	  classTemp ='<span class="helpText tooltip-msg tooltip_textLeft" ng-mouseover="renderHelpText(\''+elemName+'\')"> ? <span>';
	}else if(elemtitle == "help_tooltip_textTop"){
	  classTemp ='<span class="helpText tooltip-msg tooltip_textTop" ng-mouseover="renderHelpText(\''+elemName+'\')"> ? <span>';
	}else if(elemtitle == "help_tooltip_padding"){
	  classTemp ='<span class="helpText tooltip-msg tooltip_padding" ng-mouseover="renderHelpText(\''+elemName+'\')"> ? <span>';
	}else if(elemtitle == "help_tooltip_padding_left"){
	  classTemp ='<span class="helpText tooltip-msg tooltip_padding_left" ng-mouseover="renderHelpText(\''+elemName+'\')"> ? <span>';
	}else if(elemtitle == "calenderInput"){
	  classTemp ='<span class="helpText tooltip-msg calenderInput" ng-mouseover="renderHelpText(\''+elemName+'\')"> ? <span>';
	}else if(elemtitle == "leftTooltip"){
	  classTemp ='<span class="helpText tooltip-msg left" ng-mouseover="renderHelpText(\''+elemName+'\')"> ? <span>';
	}else if(elemtitle == "leftTooltip_select"){
	  classTemp ='<span class="helpText tooltip-msg select_help" ng-mouseover="renderHelpText(\''+elemName+'\')"> ? <span>';
	}else if(elemtitle == "leftTooltip_selectPadding"){
	  classTemp ='<span class="helpText tooltip-msg select_helpPadding" ng-mouseover="renderHelpText(\''+elemName+'\')"> ? <span>';
	}else if(elemtitle == "topTooltip"){
	  classTemp ='<span class="helpText tooltip-msg top" ng-mouseover="renderHelpText(\''+elemName+'\')"> ? <span>';
	}else if(elemtitle == "topPaddingTooltip"){
	  classTemp ='<span class="helpText tooltip-msg topPadding" ng-mouseover="renderHelpText(\''+elemName+'\')"> ? <span>';
	}else if(elemtitle == "help_tooltip_lg"){
	  classTemp ='<span class="helpText tooltip-msg tooltip_lg" ng-mouseover="renderHelpText(\''+elemName+'\')"> ? <span>';
	}
	return classTemp + '<b></b>';
}
