'use strict';

app.service('staticData', function($filter){
	this.purposes = [{"displayName":"Purchase","value":"Purchase"},{"displayName":"Refinance","value":"Refinance"},{"displayName":"HomeEquity","value":"HomeEquity"}];
	this.dateDisplayFormat = "MM/dd/yy";
	this.transformData = [{"documentType":{"loanType":"","standardView":true,"alternateView":false,"payoffsAndPayments":false,"refinanceTypeLoan":false,"homeEquityLoanIndicator":false,"sellerOnly":false,"loanId":""},"pageOne":{"closingInformation":{"dateIssued":"","closingDate":"","disbursementDate":"","settlementAgent":"","fileNo":null,"property":{"addressLineText":"","addressType":"","addressUnitDesignatorType":"","addressUnitIdentifier":"","cityName":"","countryCode":"","postalCode":"","stateCode":""},"salePrice":""},"transactionInformation":{"borrower":[{"isOrganizer":"i","borrowerFullName":"","address":{"addressLineText":"","addressType":"","addressUnitDesignatorType":"","addressUnitIdentifier":"","cityName":"","countryCode":"","postalCode":"","stateCode":""}}],"seller":[{"isOrganizer":"i", "sellerFullName":"","address":{"addressLineText":"","addressType":"Mailing","addressUnitDesignatorType":"","addressUnitIdentifier":"","cityName":"","countryCode":"","postalCode":"","stateCode":""}}],"lender":[{"isOrganizer":"i","lenderFullName":"","address":{"addressLineText":"","addressType":"","addressUnitDesignatorType":"","addressUnitIdentifier":"","cityName":"","countryCode":"","postalCode":"","stateCode":""}}]},"loanInformation":{"loanTerm":"","purpose":"","product":"","loanType":"","loanId":"","mic":""},"loanTerms":{"loanAmount":{"amount":"","status":"NO","details":null},"interestRate":{"interest":"","status":"YES","details":["Adjusts <b>every year","Can go <b>as high as 10.125%</b> in year 6","See <b>AIR Table on page 4</b> for details"]},"principalInterest":{"paymentFrequencyType":"Monthly","amount":"","status":"YES","details":["Adjusts <b>every year</b> starting in year 4","Can go <b>as high as 1,267.60</b> in year 6"]},"prepaymentPenalty":{"amount":null,"status":"NO","details":null},"balloonPayment":{"amount":null,"status":"NO","details":null}},"projectedPayments":{"paymentCalculation":["Years 1-3","Year 4","Year 5","Years 6-30"],"principalInterest":[{"minValue":"","maxValue":"0","interestOnly":null},{"minValue":"","maxValue":"","interestOnly":null},{"minValue":"","maxValue":"","interestOnly":null},{"minValue":"","maxValue":"","interestOnly":null}],"mortgageInsurance":["","","",""],"estimatedEscrow":["","","",""],"estimatedTotalPayment":["","","",""],"estimatedTotalPaymentType":"Monthly","etia":{"amount":"","frequencyType":"","propertyTaxesStatus":"false","homeownersInsuranceStatus":"false","otherStatus":"false","otherDescription":"","propertyTaxesInEscrow":"NO","homeownersInsuranceInEscrow":"NO","otherInEscrow":"NO"}},"costsAtClosing":{"ClosingCosts":{"amount":"","details":[],"totalLoanCosts":"","totalOtherCosts":"","lenderCredits":""},"CashToClose":{"amount":"","details":[],"docType":"true","fromType":"true","toType":null}}},"pageTwo":{"closingCostDetailsLoanCosts":{"ocTotalAmount":"","sbDidNotShopTotalAmount":"","sbDidShopTotalAmount":"","tlCostsTotalAmount":"","originationCharges":[],"tlCosts":{"feeType":'',"displayLabel":"Loan Costs Subtotals (A + B + C)","bpAtClosing":"0","bpB4Closing":"0","spAtClosing":null,"spB4Closing":null,"paidByOthers":null,"toEntity":null}},"closingCostDetailsOtherCosts":{"tOGovtFeesTotalAmount":"","prepaidsTotalAmount":"","iEPatClosingTotalAmount":"0","otherTotalAmount":"","totalOtherCostsTotalAmount":"","totalClosingCostsTotalAmount":"","tOGovtFeesList":[]}}}];
	this.stateCode = [{"STATE_NAME":"Alabama","STATE_CODE":"AL","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"Alaska","STATE_CODE":"AK","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"Arizona","STATE_CODE":"AZ","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"Arkansas","STATE_CODE":"AR","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"California","STATE_CODE":"CA","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"Colorado","STATE_CODE":"CO","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"Connecticut","STATE_CODE":"CT","LIABILITY_AFTER_FORECLOSURE_FLAG":"NO"},{"STATE_NAME":"District of Columbia","STATE_CODE":"DC","LIABILITY_AFTER_FORECLOSURE_FLAG":"NO"},{"STATE_NAME":"Delaware","STATE_CODE":"DE","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"Florida","STATE_CODE":"FL","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"Georgia","STATE_CODE":"GA","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"Hawaii","STATE_CODE":"HI","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"Idaho","STATE_CODE":"ID","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"Illinois","STATE_CODE":"IL","LIABILITY_AFTER_FORECLOSURE_FLAG":"NO"},{"STATE_NAME":"Indiana","STATE_CODE":"IN","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"Iowa","STATE_CODE":"IA","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"Kansas","STATE_CODE":"KS","LIABILITY_AFTER_FORECLOSURE_FLAG":"NO"},{"STATE_NAME":"Kentucky","STATE_CODE":"KY","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"Louisiana","STATE_CODE":"LA","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"Maine","STATE_CODE":"ME","LIABILITY_AFTER_FORECLOSURE_FLAG":"NO"},{"STATE_NAME":"Maryland","STATE_CODE":"MD","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"Massachusetts","STATE_CODE":"MA","LIABILITY_AFTER_FORECLOSURE_FLAG":"NO"},{"STATE_NAME":"Michigan","STATE_CODE":"MI","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"Minnesota","STATE_CODE":"MN","LIABILITY_AFTER_FORECLOSURE_FLAG":"NO"},{"STATE_NAME":"Mississippi","STATE_CODE":"MS","LIABILITY_AFTER_FORECLOSURE_FLAG":"NO"},{"STATE_NAME":"Missouri","STATE_CODE":"MO","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"Montana","STATE_CODE":"MT","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"Nebraska","STATE_CODE":"NE","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"Nevada","STATE_CODE":"NV","LIABILITY_AFTER_FORECLOSURE_FLAG":"NO"},{"STATE_NAME":"New Hampshire","STATE_CODE":"NH","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"New Jersey","STATE_CODE":"NJ","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"New Mexico","STATE_CODE":"NM","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"New York","STATE_CODE":"NY","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"North Carolina","STATE_CODE":"NC","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"North Dakota","STATE_CODE":"ND","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"Ohio","STATE_CODE":"OH","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"Oklahoma","STATE_CODE":"OK","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"Oregon","STATE_CODE":"OR","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"Pennsylvania","STATE_CODE":"PA","LIABILITY_AFTER_FORECLOSURE_FLAG":"NO"},{"STATE_NAME":"Rhode Island","STATE_CODE":"RI","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"South Carolina","STATE_CODE":"SC","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"South Dakota","STATE_CODE":"SD","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"Tennessee","STATE_CODE":"TN","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"Texas","STATE_CODE":"TX","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"Utah","STATE_CODE":"UT","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"Vermont","STATE_CODE":"VT","LIABILITY_AFTER_FORECLOSURE_FLAG":"NO"},{"STATE_NAME":"Virginia","STATE_CODE":"VA","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"Washington","STATE_CODE":"WA","LIABILITY_AFTER_FORECLOSURE_FLAG":"NO"},{"STATE_NAME":"West Virginia","STATE_CODE":"WV","LIABILITY_AFTER_FORECLOSURE_FLAG":"YES"},{"STATE_NAME":"Wisconsin","STATE_CODE":"WI","LIABILITY_AFTER_FORECLOSURE_FLAG":"NO"},{"STATE_NAME":"Wyoming","STATE_CODE":"WY","LIABILITY_AFTER_FORECLOSURE_FLAG":""}];
    this.lienPriorityType = [{"name":"FirstLien","id":"First"},{"name":"SecondLien","id":"Second"},{"name":"ThirdLien","id":"Third"},{"name":"FourthLien","id":"Fourth"}];
    this.amortizationType = [{"name":"AdjustableRate","id":"Adjustable Rate"},{"name":"Fixed","id":"Fixed"},{"name":"GEM","id":"GEM"},{"name":"GraduatedPaymentARM","id":"Graduated Payment ARM"},{"name":"Step","id":"Step"}];
 	this.mortgageType = ["Conventional","FHA","LocalAgency","PublicAndIndianHousing","StateAgency","USDARuralDevelopment","VA","Other"];
	this.paymentFrequencyType =["AtMaturity","Biweekly","Monthly","Quarterly","Semiannual","Semimonthly","Weekly"]
    this.state = {"stateCode" : ["AL","AK","AZ","AR","CF","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","AS","GU","MP","PR","VI","FM","MH","PW","AA","AE","AP","CM","CZ","NB","PI","TT"]};
    this.appraisalMethods = [{"name":"AutomatedValuationModel", "code":"AVM"},{"name":"DesktopAppraisal", "code":"DA"},{"name":"DriveBy", "code":"DB"},{"name":"FullAppraisal", "code":"FA"},{"name":"None", "code":"NA"},{"name":"Other", "code":"Other"},{"name":"PriorAppraisalUsed", "code":"PriorAppraisalUsed"}];
    this.ausTypes = ["Assetwise","Capstone","Clues","DesktopUnderwriter","ECS","FHAScorecard","LoanProspector","Other","Strategyware","Zippy"];
    this.partyRoleTypes = ["NotePayTo","MortgageBroker","RealEstateAgent","ClosingAgent","Borrower","NonTitleSpouse","TitleHolder","Other","NonTitleNonSpouseOwnershipInterest","PropertySeller","LoanDeliveryFilePreparer"];
    
    this.basicLoanInfo = {
		'loanPurposeType': 'purchase',
		'loanFormType': 'standard',
		'loanTransactionType': 'new'
	};
    
 
    this.cdformdata =
    {
	  "closingDisclosureDocType": null,
	  "closingInformation": {
	    "dateIssued": "",
	    "closingDate": "",
	    "disbursementDate": "",
	    "settlementAgent": "",
	    "fileNo": "",
	    "property": {
	      "addressLineText": "",
	      "addressType": "",
	      "addressUnitDesignatorType": "",
	      "addressUnitIdentifier": "",
	      "cityName": "",
	      "countryCode": "",
	      "postalCode": "",
	      "stateCode": "",
	      "unparsedLegalDescription": ""
	    },
	    "salePrice": "",
	    "partyRoleType": "",
	    "salesContractDetail": {
	      "personalPropertyIndicator": "",
	      "personalPropertyAmount": "",
	      "realPropertyAmount": "",
	      "saleContractAmount": ""
	    },
	    "propertyValuationDetail": {
	      "propertyEstimatedValueAmount": "",
	      "propertyValuationAmount": "",
	      "propertyValuationMethodType": "",
	      "propertyValuationMethodTypeOtherDescription": ""
	    }
	  },
	  "transactionInformation": {
	    "borrowerDetails": [
	      {
	        "type": "",
	        "nameModel": {
	          "firstName": "",
	          "lastName": "",
	          "middleName": "",
	          "suffixName": "",
	          "fullName": ""
	        },
	        "partyRoleType": "",
	        "partyRoleOtherDescription": "",
	        "address": {
	          "addressLineText": "",
	          "addressType": "",
	          "addressUnitDesignatorType": "",
	          "addressUnitIdentifier": "",
	          "cityName": "",
	          "countryCode": "",
	          "postalCode": "",
	          "stateCode": "",
	          "unparsedLegalDescription": ""
	        }
	      }
	    ],
	    "sellerDetails": [
	      {
	        "type": "",
	        "nameModel": {
	          "firstName": "",
	          "lastName": "",
	          "middleName": "",
	          "suffixName": "",
	          "fullName": ""
	        },
	        "partyRoleType": "",
	        "partyRoleOtherDescription": "",
	        "address": {
	          "addressLineText": "",
	          "addressType": "",
	          "addressUnitDesignatorType": "",
	          "addressUnitIdentifier": "",
	          "cityName": "",
	          "countryCode": "",
	          "postalCode": "",
	          "stateCode": "",
	          "unparsedLegalDescription": ""
	        }
	      }
	    ],
	    "lenderFullName": [
	      {
	        "type": "",
	        "nameModel": {
	          "firstName": "",
	          "lastName": "",
	          "middleName": "",
	          "suffixName": "",
	          "fullName": ""
	        },
	        "partyRoleType": "",
	        "partyRoleOtherDescription": "",
	        "address": {
	          "addressLineText": "",
	          "addressType": "",
	          "addressUnitDesignatorType": "",
	          "addressUnitIdentifier": "",
	          "cityName": "",
	          "countryCode": "",
	          "postalCode": "",
	          "stateCode": "",
	          "unparsedLegalDescription": ""
	        }
	      }
	    ]
	  },
	  "loanInformation": {
	    "loanTerm": "",
	    "purpose": "",
	    "product": "",
	    "loanType": "",
	    "loanId": "",
	    "mic": "",
	    "constructionLoanType": "",
	    "constructionPeriodNumberOfMonthsCount": "",
	    "constructionLoanTotalTermMonthsCount": "",
	    "loanMaturityPeriodType": "",
	    "loanMaturityPeriodCount": "",
	    "integratedDisclosureHomeEquityLoanIndicator": "",
	    "lienPriorityType": "",
	    "amortizationType": "",
	    "integratedDisclosureLoanProductDescription": "",
	    "mortgageType": "",
	    "mortgageTypeOtherDescription": "",
	    "loanIdentifiers": [
	      {
	        "loanIdentifierType": "LenderLoan",
	        "loanIdentifier": ""
	      },
	      {
	        "loanIdentifierType": "MERS_MIN",
	        "loanIdentifier": ""
	      }
	    ],
	    "miRequiredIndicator": "",
	    "miCertificateIdentifier": ""
	  },
	  "loanTerms": {
	    "loanAmount": {
	      "amount": "",
	      "status": "",
	      "details": "",
	      "noteAmount": "",
	      "negativeAmoritzationIndicator": "",
	      "negativeAmortizationMaximumLoanBalanceAmount": "",
	      "negativeAmortizationLimitMonthsCount": ""
	    },
	    "interestRate": {
	      "interest": "",
	      "status": "",
	      "details": "",
	      "buydownTemporarySubsidyFundingIndicator": "",
	      "gseBuydownReflectedInNoteIndicator": "",
	      "buydownInitialEffectiveInterestRatePercent": "",
	      "buydownChangeFrequencyMonthsCount": "",
	      "buydownIncreaseRatePercent": "",
	      "noteRatePercent": "",
	      "disclosedFullyIndexedRatePercent": "",
	      "interestRateIncreaseIndicator": "",
	      "adjustmentRuleTypeFirst": "",
	      "perChangeRateAdjustmentFrequencyMonthsCount": "",
	      "firstRateChangeMonthsCount": "",
	      "ceilingRatePercentEarliestEffectiveMonthsCount": "",
	      "ceilingRatePercent": ""
	    },
	    "principalInterest": {
	      "paymentFrequencyType": "",
	      "amount": "",
	      "status": "",
	      "details": "",
	      "initialPrincipalAndInterestPaymentAmount": "",
	      "fullyIndexedInitialPrincipalAndInterestPaymentAmount": "",
	      "interestOnlyIndicator": "",
	      "interestOnlyTermMonthsCount": "",
	      "adjustmentRuleType": "",
	      "perChangePrincipalAndInterestPaymentAdjustmentFrequencyMonthsCount": "",
	      "firstPrincipalAndInterestPaymentChangeMonthsCount": "",
	      "principalAndInterestPaymentMaximumAmountEarliestEffectiveMonthsCount": "",
	      "principalAndInterestPaymentMaximumAmount": ""
	    },
	    "prepaymentPenalty": {
	      "amount": "",
	      "status": "",
	      "details": "",
	      "prepaymentPenaltyIndicator": "",
	      "prepaymentPenaltyMaximumLifeOfLoanAmount": "",
	      "prepaymentPenaltyExpirationMonthsCount": ""
	    },
	    "balloonPayment": {
	      "amount": "",
	      "status": "",
	      "details": "",
	      "balloonIndicator": "",
	      "": ""
	    },
	    "intialEscrow": {
	      "escrowIndicator": "",
	      "feeType": "",
	      "feeActualPaymentAmount": "",
	      "integratedDisclosureSectionType": "",
	      "escrowItemType": "",
	      "displayLabelText": "",
	      "feePaidToType": "",
	      "typeOtherDescription": "",
	      "escrowItemPaymentPaidByType": "",
	      "escrowItemActualPaymentAmount": ""
	    },
	    "ETIA": [
	      {
	        "projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType": "",
	        "projectedPaymentEstimatedTaxesInsuranceAssessmentComponentTypeOtherDescription": "",
	        "projectedPaymentEscrowedType": ""
	      }
	    ],
	    "escrowAccount": {
	      "firstYearTotalNonEscrowPaymentDescription": "",
	      "firstYearTotalNonEscrowPaymentAmount": ""
	    }
	  },
	  "projectedPayments": {
	    "projectedPaymentsDetails": [
	      {
	        "paymentFrequencyType": "",
	        "projectedPaymentCalculationPeriodEndNumber": "",
	        "projectedPaymentCalculationPeriodStartNumber": "",
	        "projectedPaymentCalculationPeriodTermType": "",
	        "projectedPaymentCalculationPeriodTermTypeOtherDescription": "",
	        "projectedPaymentEstimatedEscrowPaymentAmount": "",
	        "projectedPaymentEstimatedTotalMaximumPaymentAmount": "",
	        "projectedPaymentEstimatedTotalMinimumPaymentAmount": "",
	        "projectedPaymentMIPaymentAmount": "",
	        "projectedPaymentPrincipalAndInterestMaximumPaymentAmount": "",
	        "projectedPaymentPrincipalAndInterestMinimumPaymentAmount": "",
	        "sequenceNumber": "",
	        "interestOnlyStatus": ""
	      }
	    ],
	    "paymentFrequencyType": "",
	    "paymentCalculation": "",
	    "principalInterest": "",
	    "mortgageInsurance": "",
	    "estimatedEscrow": "",
	    "estimatedTotalPayment": "",
	    "estimatedTotalPaymentType": "",
	    "etia": ""
	  },
	  "costsAtClosing": {
	    "ClosingCosts": {
	      "amount": "",
	      "details": "",
	      "totalLoanCosts": "",
	      "totalOtherCosts": "",
	      "lenderCredits": ""
	    },
	    "CashToClose": {
	      "amount": "",
	      "details": "",
	      "docType": "",
	      "fromType": "",
	      "toType": "",
	      "cashFromBorrowerAtClosingAmount": "",
	      "cashToBorrowerAtClosingAmount": ""
	    }
	  }
	},
	{
	  "closingCostDetailsLoanCosts": {
	    "ocTotalAmount": "",
	    "sbDidNotShopTotalAmount": "",
	    "sbDidShopTotalAmount": "",
	    "tlCostsTotalAmount": "",
	    "originationCharges": [
	      {
	        "displayLabel": null,
	        "gseDisplayLabel": null,
	        "feeActualTotalAmount": null,
	        "feePaidToType": null,
	        "feePaidToTypeOtherDescription": null,
	        "feePercentBasisType": null,
	        "feeTotalPercent": null,
	        "feeType": null,
	        "feeTypeOtherDescription": null,
	        "integratedDisclosureSectionType": null,
	        "optionalCostIndicator": null,
	        "regulationZPointsAndFeesIndicator": null,
	        "bpAtClosing": null,
	        "bpB4Closing": null,
	        "spAtClosing": null,
	        "spB4Closing": null,
	        "paidByOthers": null,
	        "lenderStatus": null
	      }
	    ],
	    "sbDidNotShopFors": [
	      {
	        "displayLabel": null,
	        "gseDisplayLabel": null,
	        "feeActualTotalAmount": null,
	        "feePaidToType": null,
	        "feePaidToTypeOtherDescription": null,
	        "feePercentBasisType": null,
	        "feeTotalPercent": null,
	        "feeType": null,
	        "feeTypeOtherDescription": null,
	        "integratedDisclosureSectionType": null,
	        "optionalCostIndicator": null,
	        "regulationZPointsAndFeesIndicator": null,
	        "bpAtClosing": null,
	        "bpB4Closing": null,
	        "spAtClosing": null,
	        "spB4Closing": null,
	        "paidByOthers": null,
	        "lenderStatus": null
	      }
	    ],
	    "sbDidShopFors": [
	      {
	        "displayLabel": null,
	        "gseDisplayLabel": null,
	        "feeActualTotalAmount": null,
	        "feePaidToType": null,
	        "feePaidToTypeOtherDescription": null,
	        "feePercentBasisType": null,
	        "feeTotalPercent": null,
	        "feeType": null,
	        "feeTypeOtherDescription": null,
	        "integratedDisclosureSectionType": null,
	        "optionalCostIndicator": null,
	        "regulationZPointsAndFeesIndicator": null,
	        "bpAtClosing": null,
	        "bpB4Closing": null,
	        "spAtClosing": null,
	        "spB4Closing": null,
	        "paidByOthers": null,
	        "lenderStatus": null
	      }
	    ],
	    "tlCosts": {
	      "displayLabel": null,
	      "gseDisplayLabel": null,
	      "feeActualTotalAmount": null,
	      "feePaidToType": null,
	      "feePaidToTypeOtherDescription": null,
	      "feePercentBasisType": null,
	      "feeTotalPercent": null,
	      "feeType": null,
	      "feeTypeOtherDescription": null,
	      "integratedDisclosureSectionType": null,
	      "optionalCostIndicator": null,
	      "regulationZPointsAndFeesIndicator": null,
	      "bpAtClosing": null,
	      "bpB4Closing": null,
	      "spAtClosing": null,
	      "spB4Closing": null,
	      "paidByOthers": null,
	      "lenderStatus": null
	    }
	  },
	  "closingCostDetailsOtherCosts": {
	    "tOGovtFeesTotalAmount": null,
	    "prepaidsTotalAmount": null,
	    "iEPatClosingTotalAmount": null,
	    "otherTotalAmount": null,
	    "totalOtherCostsTotalAmount": null,
	    "totalClosingCostsTotalAmount": null,
	    "totalOtherCosts": null,
	    "totalClosingCosts": null,
	    "tOGovtFeesList": null,
	    "prepaidsList": [
	      {
	        "displayLabel": null,
	        "gseDisplayLabel": null,
	        "feeActualTotalAmount": null,
	        "feePaidToType": null,
	        "feePaidToTypeOtherDescription": null,
	        "feePercentBasisType": null,
	        "feeTotalPercent": null,
	        "feeType": null,
	        "feeTypeOtherDescription": null,
	        "integratedDisclosureSectionType": null,
	        "optionalCostIndicator": null,
	        "regulationZPointsAndFeesIndicator": null,
	        "bpAtClosing": null,
	        "bpB4Closing": null,
	        "spAtClosing": null,
	        "spB4Closing": null,
	        "paidByOthers": null,
	        "lenderStatus": null,
	        "fromDate": null,
	        "toDate": null,
	        "months": null
	      }
	    ],
	    "iEPatClosingList": [
	      {
	        "displayLabel": "",
	        "gseDisplayLabel": "",
	        "escrowCollectedNumberOfMonthsCount": "",
	        "escrowItemType": "",
	        "escrowItemTypeOtherDescription": "",
	        "escrowMonthlyPaymentAmount": "",
	        "feePaidToType": null,
	        "feePaidToTypeOtherDescription": "",
	        "integratedDisclosureSectionType": "",
	        "regulationZPointsAndFeesIndicator": null,
	        "paymentIncludedInAPRIndicator": null,
	        "bpAtClosing": null,
	        "bpB4Closing": null,
	        "spAtClosing": null,
	        "spB4Closing": null,
	        "paidByOthers": null,
	        "lenderStatus": null
	      }
	    ],
	    "otherCostsList": [
	      {
	        "displayLabel": "",
	        "gseDisplayLabel": "",
	        "escrowCollectedNumberOfMonthsCount": "",
	        "escrowItemType": "",
	        "escrowItemTypeOtherDescription": "",
	        "escrowMonthlyPaymentAmount": "",
	        "feePaidToType": null,
	        "feePaidToTypeOtherDescription": "",
	        "integratedDisclosureSectionType": "",
	        "regulationZPointsAndFeesIndicator": null,
	        "paymentIncludedInAPRIndicator": null,
	        "bpAtClosing": null,
	        "bpB4Closing": null,
	        "spAtClosing": null,
	        "spB4Closing": null,
	        "paidByOthers": null,
	        "lenderStatus": null
	      }
	    ]
	  }
	},
	{
	  "cashToCloses": [
	    {
	      "label": "",
	      "type": "",
	      "leFromBorrower": "",
	      "finalFromBorrower": "",
	      "dtcStatus": "",
	      "dtcDetail": "",
	      "index": "",
	      "closingCostsFinancedTotalAmount": ""
	    }
	  ],
	  "summariesofTransactions": ""
	};
}); 