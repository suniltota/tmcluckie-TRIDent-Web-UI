'use strict';

app.service('staticData', function($filter){
	this.purposes = [{"displayName":"Purchase","value":"Purchase"},{"displayName":"Refinance","value":"Refinance"},{"displayName":"HomeEquity","value":"HomeEquity"}];
	this.transformData = [{"documentType":{"loanType":"","standardView":true,"alternateView":false,"payoffsAndPayments":false,"refinanceTypeLoan":false,"homeEquityLoanIndicator":false,"sellerOnly":false,"loanId":""},"pageOne":{"closingInformation":{"dateIssued":"","closingDate":"","disbursementDate":"","settlementAgent":"","fileNo":null,"property":{"addressLineText":"","addressType":"","addressUnitDesignatorType":"","addressUnitIdentifier":"","cityName":"","countryCode":"","postalCode":"","stateCode":""},"salePrice":""},"transactionInformation":{"borrower":[{"isOrganizer":"i","borrowerFullName":"","address":{"addressLineText":"","addressType":"","addressUnitDesignatorType":"","addressUnitIdentifier":"","cityName":"","countryCode":"","postalCode":"","stateCode":""}}],"seller":[{"isOrganizer":"i", "sellerFullName":"","address":{"addressLineText":"","addressType":"Mailing","addressUnitDesignatorType":"","addressUnitIdentifier":"","cityName":"","countryCode":"","postalCode":"","stateCode":""}}],"lender":[{"isOrganizer":"i","lenderFullName":"","address":{"addressLineText":"","addressType":"","addressUnitDesignatorType":"","addressUnitIdentifier":"","cityName":"","countryCode":"","postalCode":"","stateCode":""}}]},"loanInformation":{"loanTerm":"","purpose":"","product":"","loanType":"","loanId":"","mic":""},"loanTerms":{"loanAmount":{"amount":"","status":"NO","details":null},"interestRate":{"interest":"","status":"YES","details":["Adjusts <b>every year","Can go <b>as high as 10.125%</b> in year 6","See <b>AIR Table on page 4</b> for details"]},"principalInterest":{"paymentFrequencyType":"Monthly","amount":"","status":"YES","details":["Adjusts <b>every year</b> starting in year 4","Can go <b>as high as 1,267.60</b> in year 6"]},"prepaymentPenalty":{"amount":null,"status":"NO","details":null},"balloonPayment":{"amount":null,"status":"NO","details":null}},"projectedPayments":{"paymentCalculation":["Years 1-3","Year 4","Year 5","Years 6-30"],"principalInterest":[{"minValue":"","maxValue":"0","interestOnly":null},{"minValue":"","maxValue":"","interestOnly":null},{"minValue":"","maxValue":"","interestOnly":null},{"minValue":"","maxValue":"","interestOnly":null}],"mortgageInsurance":["","","",""],"estimatedEscrow":["","","",""],"estimatedTotalPayment":["","","",""],"estimatedTotalPaymentType":"Monthly","etia":{"amount":"","frequencyType":"","propertyTaxesStatus":"false","homeownersInsuranceStatus":"false","otherStatus":"false","otherDescription":"","propertyTaxesInEscrow":"NO","homeownersInsuranceInEscrow":"NO","otherInEscrow":"NO"}},"costsAtClosing":{"ClosingCosts":{"amount":"","details":[],"totalLoanCosts":"","totalOtherCosts":"","lenderCredits":""},"CashToClose":{"amount":"","details":[],"docType":"true","fromType":"true","toType":null}}},"pageTwo":{"closingCostDetailsLoanCosts":{"ocTotalAmount":"","sbDidNotShopTotalAmount":"","sbDidShopTotalAmount":"","tlCostsTotalAmount":"","originationCharges":[],"tlCosts":{"feeType":'',"displayLabel":"Loan Costs Subtotals (A + B + C)","bpAtClosing":"0","bpB4Closing":"0","spAtClosing":null,"spB4Closing":null,"paidByOthers":null,"toEntity":null}},"closingCostDetailsOtherCosts":{"tOGovtFeesTotalAmount":"","prepaidsTotalAmount":"","iEPatClosingTotalAmount":"0","otherTotalAmount":"","totalOtherCostsTotalAmount":"","totalClosingCostsTotalAmount":"","tOGovtFeesList":[]}}}];
    
    this.amortizationType = [{"name":"AdjustableRate","id":"Adjustable Rate"},{"name":"Fixed","id":"Fixed"},{"name":"GEM","id":"GEM"},{"name":"GraduatedPaymentARM","id":"Graduated Payment ARM"},{"name":"Step","id":"Step"}];
 	this.mortgageType = ["Conventional","FHA","LocalAgency","PublicAndIndianHousing","StateAgency","USDARuralDevelopment","VA","Other"];
	this.paymentFrequencyType =["AtMaturity","Biweekly","Monthly","Quarterly","Semiannual","Semimonthly","Weekly"]
    this.state = {"stateCode" : ["AL","AK","AZ","AR","CF","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","AS","GU","MP","PR","VI","FM","MH","PW","AA","AE","AP","CM","CZ","NB","PI","TT"]};
    this.appraisalMethods = [{"name":"AutomatedValuationModel", "code":"AVM"},{"name":"DesktopAppraisal", "code":"DA"},{"name":"DriveBy", "code":"DB"},{"name":"FullAppraisal", "code":"FA"},{"name":"None", "code":"NA"},{"name":"Other", "code":"Other"},{"name":"PriorAppraisalUsed", "code":"PriorAppraisalUsed"}];
    
    this.partyRoleTypes = ["NotePayTo","MortgageBroker","RealEstateAgent","ClosingAgent","Borrower","NonTitleSpouse","TitleHolder","Other","NonTitleNonSpouseOwnershipInterest","PropertySeller","LoanDeliveryFilePreparer"];
    
    this.dateDisplayFormat = "MM/dd/yy";
    this.basicLoanInfo = {
		'loanPurposeType': 'purchase',
		'loanFormType': 'standard',
		'loanTransactionType': 'new'
	};

	this.dropDownBooleanOptions = [
		{ name: "Yes", id: true },
		{ name: "No", id: false }
	];

	this.countryCodes = [
		{
			"name":"United States",
			"code":"US"
		}
	];

	this.stateCodes=[
		{
			"name": "Alabama",
			"code": "AL",
		},
		{
			"name": "Alaska",
			"code": "AK",
		},
		{
			"name": "Arizona",
			"code": "AZ",
		},
		{
			"name": "Arkansas",
			"code": "AR",
		},
		{
			"name": "California",
			"code": "CA",
		},
		{
			"name": "Colorado",
			"code": "CO",
		},
		{
			"name": "Connecticut",
			"code": "CT",
		},
		{
			"name": "District of Columbia",
			"code": "DC",
		},
		{
			"name": "Delaware",
			"code": "DE",
		},
		{
			"name": "Florida",
			"code": "FL",
		},
		{
			"name": "Georgia",
			"code": "GA",
		},
		{
			"name": "Hawaii",
			"code": "HI",
		},
		{
			"name": "Idaho",
			"code": "ID",
		},
		{
			"name": "Illinois",
			"code": "IL",
		},
		{
			"name": "Indiana",
			"code": "IN",
		},
		{
			"name": "Iowa",
			"code": "IA",
		},
		{
			"name": "Kansas",
			"code": "KS",
		},
		{
			"name": "Kentucky",
			"code": "KY",
		},
		{
			"name": "Louisiana",
			"code": "LA",
		},
		{
			"name": "Maine",
			"code": "ME",
		},
		{
			"name": "Maryland",
			"code": "MD",
		},
		{
			"name": "Massachusetts",
			"code": "MA",
		},
		{
			"name": "Michigan",
			"code": "MI",
		},
		{
			"name": "Minnesota",
			"code": "MN",
		},
		{
			"name": "Mississippi",
			"code": "MS",
		},
		{
			"name": "Missouri",
			"code": "MO",
		},
		{
			"name": "Montana",
			"code": "MT",
		},
		{
			"name": "Nebraska",
			"code": "NE",
		},
		{
			"name": "Nevada",
			"code": "NV",
		},
		{
			"name": "New Hampshire",
			"code": "NH",
		},
		{
			"name": "New Jersey",
			"code": "NJ",
		},
		{
			"name": "New Mexico",
			"code": "NM",
		},
		{
			"name": "New York",
			"code": "NY",
		},
		{
			"name": "North Carolina",
			"code": "NC",
		},
		{
			"name": "North Dakota",
			"code": "ND",
		},
		{
			"name": "Ohio",
			"code": "OH",
		},
		{
			"name": "Oklahoma",
			"code": "OK",
		},
		{
			"name": "Oregon",
			"code": "OR",
		},
		{
			"name": "Pennsylvania",
			"code": "PA",
		},
		{
			"name": "Rhode Island",
			"code": "RI",
		},
		{
			"name": "South Carolina",
			"code": "SC",
		},
		{
			"name": "South Dakota",
			"code": "SD",
		},
		{
			"name": "Tennessee",
			"code": "TN",
		},
		{
			"name": "Texas",
			"code": "TX",
		},
		{
			"name": "Utah",
			"code": "UT",
		},
		{
			"name": "Vermont",
			"code": "VT",
		},
		{
			"name": "Virginia",
			"code": "VA",
		},
		{
			"name": "Washington",
			"code": "WA",
		},
		{
			"name": "West Virginia",
			"code": "WV",
		},
		{
			"name": "Wisconsin",
			"code": "WI",
		},
		{
			"name": "Wyoming",
			"code": "WY",
		}
	];

	this.borrowerPartyRoleTypes = [
		{
			"name" : "Borrower",
			"value": "Borrower"
		}
	];

	this.loanPeriodTypes = [
		{
			"name":"Months",
			"value": "Month"
		}
	];

	this.lienPriorityTypes = [
		{
			"name": "First",
			"value": "FirstLien"
		},
		{
			"name": "Second",
			"value": "SecondLien"
		},
		{
			"name": "Third",
			"value": "ThirdLien"
		},
		{
			"name": "Fourth",
			"value": "FourthLien"
		}
	];

	this.loanTypes = [
		{
			"name":"Conventional",
			"value": "Conventional"
		},
		{
			"name":"FHA",
			"value": "FHA"
		},
		{
			"name":"Local Agency",
			"value": "LocalAgency"
		},
		{
			"name":"Other",
			"value": "Other"
		},
		{
			"name":"Public And Indian Housing",
			"value": "PublicAndIndianHousing"
		},
		{
			"name":"State Agency",
			"value": "StateAgency"
		},
		{
			"name":"USDA Rural Development",
			"value": "USDARuralDevelopment"
		},
		{
			"name":"VA",
			"value": "VA"
		}
	];

	this.ausTypes = [
		{
			"name":"Assetwise",
			"value":"Assetwise"
		},
		{
			"name":"Capstone",
			"value":"Capstone"
		},
		{
			"name":"Clues",
			"value":"Clues"
		},
		{
			"name":"Desktop Underwriter",
			"value":"DesktopUnderwriter"
		},
		{
			"name":"ECS",
			"value":"ECS"
		},
		{
			"name":"FHA Scorecard",
			"value":"FHAScorecard"
		},
		{
			"name":"Loan Prospector",
			"value":"LoanProspector"
		},
		{
			"name":"Other",
			"value":"Other"
		},
		{
			"name":"Strategyware",
			"value":"Strategyware"
		},
		{
			"name":"Zippy",
			"value":"Zippy"
		}
	];

	this.propertyValuationMethodTypes = [
		{
			"name" : "Automated Valuation Model",
			"value": "AutomatedValuationModel"
		},
		{
			"name" : "Desktop Appraisal",
			"value": "DesktopAppraisal"
		},
		{
			"name" : "Drive By",
			"value": "DriveBy"
		},
		{
			"name" : "Full Appraisal",
			"value": "FullAppraisal"
		},
		{
			"name" : "Other",
			"value": "Other"
		},
		{
			"name" : "Prior Appraisal Used",
			"value": "PriorAppraisalUsed"
		}
	];
 
    this.cdformdata =
    {
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
	      "stateCode": "AL",
	      "unparsedLegalDescription": "",
	      "legalDescription":false
	    },
	    "salePrice": "",
	    "partyRoleType": "",
	    "salesContractDetail": {
	      "personalPropertyIndicator": false,
	      "personalPropertyAmount": "",
	      "realPropertyAmount": "",
	      "saleContractAmount": ""
	    },
	    "propertyValuationDetail": {
	      "propertyEstimatedValueAmount": "",
	      "propertyValuationAmount": "",
	      "propertyValuationMethodType": "",
	      "propertyValuationMethodTypeOtherDescription": "",
	      "propertyValue": "Appraised"
	    }
	  },
	  "transactionInformation": {
	    "borrowerDetails": [
	      {
	        "type": "I",
	        "nameModel": {
	          "firstName": "",
	          "lastName": "",
	          "middleName": "",
	          "suffixName": "",
	          "fullName": ""
	        },
	        "partyRoleType": "Borrower",
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
	    ],
	    "sellerDetails": [
	      {
	        "type": "I",
	        "nameModel": {
	          "firstName": "",
	          "lastName": "",
	          "middleName": "",
	          "suffixName": "",
	          "fullName": ""
	        },
	        "partyRoleType": "Seller",
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
	    ],
	    "lenderDetails": [
	      {
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
	    ]
	  },
	  "loanInformation": {
	    "loanTerm": "",
	    "purpose": "",
	    "product": "",
	    "loanType": "",
	    "loanId": "",
	    "constructionLoanType": "",
	    "constructionPeriodNumberOfMonthsCount": "",
	    "constructionLoanTotalTermMonthsCount": "",
	    "loanMaturityPeriodType": "Month",
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
	    "miCertificateIdentifier": "",
	    "automatedUnderwritings": [
	      {
	        "automatedUnderwritingCaseIdentifier": "",
	        "automatedUnderwritingSystemType": "",
	        "automatedUnderwritingSystemTypeOtherDescription": ""
	      }
	    ],
	    "loanManualUnderwritingIndicator": "false",
    	"interestRateIncreaseIndicator": "false",
    	"negativeAmoritzationIndicator": "false"
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