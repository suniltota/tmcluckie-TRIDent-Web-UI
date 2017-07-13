'use strict';

app.service('staticData', function($filter){
	this.purposes = [{"displayName":"Purchase","value":"Purchase"},{"displayName":"Refinance","value":"Refinance"},{"displayName":"HomeEquity","value":"HomeEquity"}];
	this.transformData = [{"documentType":{"loanType":"","standardView":true,"alternateView":false,"payoffsAndPayments":false,"refinanceTypeLoan":false,"homeEquityLoanIndicator":false,"sellerOnly":false,"loanId":""},"pageOne":{"closingInformation":{"dateIssued":"","closingDate":"","disbursementDate":"","settlementAgent":"","fileNo":null,"property":{"addressLineText":"","addressType":"","addressUnitDesignatorType":"","addressUnitIdentifier":"","cityName":"","countryCode":"","postalCode":"","stateCode":""},"salePrice":""},"transactionInformation":{"borrower":[{"isOrganizer":"i","borrowerFullName":"","address":{"addressLineText":"","addressType":"","addressUnitDesignatorType":"","addressUnitIdentifier":"","cityName":"","countryCode":"","postalCode":"","stateCode":""}}],"seller":[{"isOrganizer":"i", "sellerFullName":"","address":{"addressLineText":"","addressType":"Mailing","addressUnitDesignatorType":"","addressUnitIdentifier":"","cityName":"","countryCode":"","postalCode":"","stateCode":""}}],"lender":[{"isOrganizer":"i","lenderFullName":"","address":{"addressLineText":"","addressType":"","addressUnitDesignatorType":"","addressUnitIdentifier":"","cityName":"","countryCode":"","postalCode":"","stateCode":""}}]},"loanInformation":{"loanTerm":"","purpose":"","product":"","loanType":"","loanId":"","mic":""},"loanTerms":{"loanAmount":{"amount":"","status":"NO","details":null},"interestRate":{"interest":"","status":"YES","details":["Adjusts <b>every year","Can go <b>as high as 10.125%</b> in year 6","See <b>AIR Table on page 4</b> for details"]},"principalInterest":{"paymentFrequencyType":"Monthly","amount":"","status":"YES","details":["Adjusts <b>every year</b> starting in year 4","Can go <b>as high as 1,267.60</b> in year 6"]},"prepaymentPenalty":{"amount":null,"status":"NO","details":null},"balloonPayment":{"amount":null,"status":"NO","details":null}},"projectedPayments":{"paymentCalculation":["Years 1-3","Year 4","Year 5","Years 6-30"],"principalInterest":[{"minValue":"","maxValue":"0","interestOnly":null},{"minValue":"","maxValue":"","interestOnly":null},{"minValue":"","maxValue":"","interestOnly":null},{"minValue":"","maxValue":"","interestOnly":null}],"mortgageInsurance":["","","",""],"estimatedEscrow":["","","",""],"estimatedTotalPayment":["","","",""],"estimatedTotalPaymentType":"Monthly","etia":{"amount":"","frequencyType":"","propertyTaxesStatus":"false","homeownersInsuranceStatus":"false","otherStatus":"false","otherDescription":"","propertyTaxesInEscrow":"NO","homeownersInsuranceInEscrow":"NO","otherInEscrow":"NO"}},"costsAtClosing":{"ClosingCosts":{"amount":"","details":[],"totalLoanCosts":"","totalOtherCosts":"","lenderCredits":""},"CashToClose":{"amount":"","details":[],"docType":"true","fromType":"true","toType":null}}},"pageTwo":{"closingCostDetailsLoanCosts":{"ocTotalAmount":"","sbDidNotShopTotalAmount":"","sbDidShopTotalAmount":"","tlCostsTotalAmount":"","originationCharges":[],"tlCosts":{"feeType":'',"displayLabel":"Loan Costs Subtotals (A + B + C)","bpAtClosing":"0","bpB4Closing":"0","spAtClosing":null,"spB4Closing":null,"paidByOthers":null,"toEntity":null}},"closingCostDetailsOtherCosts":{"tOGovtFeesTotalAmount":"","prepaidsTotalAmount":"","escrowItemsTotalAmount":"0","otherTotalAmount":"","totalOtherCostsTotalAmount":"","totalClosingCostsTotalAmount":"","tOGovtFeesList":[]}}}];
    
    this.amortizationType = [{"name":"AdjustableRate","id":"Adjustable Rate"},{"name":"Fixed","id":"Fixed"},{"name":"GEM","id":"GEM"},{"name":"GraduatedPaymentARM","id":"Graduated Payment ARM"},{"name":"Step","id":"Step"}];
 	this.mortgageType = ["Conventional","FHA","LocalAgency","PublicAndIndianHousing","StateAgency","USDARuralDevelopment","VA","Other"];
	this.paymentFrequencyType =["AtMaturity","Biweekly","Monthly","Quarterly","Semiannual","Semimonthly","Weekly"]
    this.state = {"stateCode" : ["AL","AK","AZ","AR","CF","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","AS","GU","MP","PR","VI","FM","MH","PW","AA","AE","AP","CM","CZ","NB","PI","TT"]};
    this.appraisalMethods = [{"name":"AutomatedValuationModel", "code":"AVM"},{"name":"DesktopAppraisal", "code":"DA"},{"name":"DriveBy", "code":"DB"},{"name":"FullAppraisal", "code":"FA"},{"name":"None", "code":"NA"},{"name":"Other", "code":"Other"},{"name":"PriorAppraisalUsed", "code":"PriorAppraisalUsed"}];
    
    this.partyRoleTypes = ["NotePayTo","MortgageBroker","RealEstateAgent","ClosingAgent","Borrower","NonTitleSpouse","TitleHolder","Other","NonTitleNonSpouseOwnershipInterest","PropertySeller","LoanDeliveryFilePreparer"];
    
    this.dateDisplayFormat = "MM/dd/yyyy";
    this.basicLoanInfo = {
		'loanPurposeType': 'purchase',
		'loanFormType': 'standard',
		'loanTransactionType': 'new'
	};

	this.dropDownBooleanOptions = [
		{ name: "Yes", id: true },
		{ name: "No", id: false }
	];
	this.escrowDropDownBooleanOptions = [
		{ name: "Yes", id: "Escrowed" },
		{ name: "No", id: "NotEscrowed" }
	];

	this.escrowDropDownBooleanOptionsWithSome = [
		{ name: "Yes", id: "Yes" },
		{ name: "No", id: "No" },
		{ name: "Some", id: "Some" }
	];

	this.countryCodes = [
		{
			"name":"United States",
			"code":"US"
		},
		{
			"name":"Canada",
			"code":"CA"
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
    
    this.usstateCodes=[
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

    this.canadaStateCodes = [   
	    {
			"name": "Alberta",
			"code": "AB",
		},
		{
			"name": "British Columbia",
			"code": "BC",
		},
		{
			"name": "Manitoba",
			"code": "MB",
		},
		{
			"name": "New Brunswick",
			"code": "NB",
		},
		{
			"name": "Newfoundland and Labrador",
			"code": "NL",
		},
		{
			"name": "Northwest Territories",
			"code": "NT",
		},
		{
			"name": "Nova Scotia",
			"code": "NS",
		},
		{
			"name": "Nunavut",
			"code": "NU",
		},
		{
			"name": "Ontario",
			"code": "ON",
		},
		{
			"name": "Prince Edward Island",
			"code": "PE",
		},
		{
			"name": "Quebec",
			"code": "QC",
		},
		{
			"name": "Saskatchewan",
			"code": "SK",
		},
		{
			"name": "Yukon",
			"code": "YT",
		}
		
	];

	this.borrowerPartyRoleTypes = [
		{
			"name" : "Borrower",
			"value": "Borrower"
		},
		{
			'name':'Non Title Spouse',
			'value':'NonTitleSpouse'
		},
		{
			'name':'Title Holder',
			'value':'TitleHolder'
		},
		{
			'name':'Other',
			'value':'Other'
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

	this.amortizationTypes = [
		{
			"name":"Adjustable Rate",
			"value":"AdjustableRate"
		},
		{
			"name":"Fixed",
			"value":"Fixed"
		},
		{
			"name":"GEM",
			"value":"GEM"
		},
		{
			"name":"GPM",
			"value":"GPM"
		},
		{
			"name":"Graduated Payment ARM",
			"value":"GraduatedPaymentARM"
		},
		{
			"name":"Step",
			"value":"Step"
		}
	];
	this.constructionLoanTypes = [
		{
			"name":"Construction Only",
			"value":"ConstructionOnly"
		},
		{
			"name":"Construction to Permanent",
			"value":"ConstructionToPermanent"
		},
	];
	this.negativeAmortizationTypes = [
		{
			"name":"Scheduled",
			"value":"ScheduledNegativeAmortization"
		},
		{
			"name":"Potential",
			"value":"PotentialNegativeAmortization"
		}
	];

	this.miCompanyNameTypes = [
		{
			"name":"CMG",
			"value":"CMG"
		},
		{
			"name":"Essent",
			"value":"Essent"
		},
		{
			"name":"Genworth",
			"value":"Genworth"
		},
		{
			"name":"MGIC",
			"value":"MGIC"
		},
		{
			"name":"NationalMI",
			"value":"NationalMI"
		},
		{
			"name":"Other",
			"value":"Other"
		},
		{
			"name":"PMI",
			"value":"PMI"
		},
		{
			"name":"Radian",
			"value":"Radian"
		},
		{
			"name":"RMIC",
			"value":"RMIC"
		},
		{
			"name":"Triad",
			"value":"Triad"
		},
		{
			"name":"UGI",
			"value":"UGI"
		}
	];

	this.ETIAComponentTypes = [
		{
			"name":"Condominium Association Dues",
			"value":"CondominiumAssociationDues",
			'disabled': false
		},
		{
			"name":"Condominium Association Special Assessment",
			"value":"CondominiumAssociationSpecialAssessment",
			'disabled': false
		},
		{
			"name":"Cooperative Association Dues",
			"value":"CooperativeAssociationDues",
			'disabled': false
		},
		{
			"name":"Cooperative Association Special Assessment",
			"value":"CooperativeAssociationSpecialAssessment",
			'disabled': false
		},
		{
			"name":"Ground Rent",
			"value":"GroundRent",
			'disabled': false
		},
		{
			"name":"Homeowners Association Dues",
			"value":"HomeownersAssociationDues",
			'disabled': false
		},
		{
			"name":"Homeowners Association Special Assessment",
			"value":"HomeownersAssociationSpecialAssessment",
			'disabled': false
		},
		{
			"name":"Leasehold Payment",
			"value":"LeaseholdPayment",
			'disabled': false
		},
		{
			"name":"Other",
			"value":"Other",
			'disabled': false
		}
	];

	this.sectionAfeeTypes = [
		{
		 "name":"203K Architectural And Engineering Fee",
		 "value":"203KArchitecturalAndEngineeringFee",
		 "disabled":false
		},
		{
		"name":"203K Consultant Fee",
		"value":"203KConsultantFee",
		"disabled":false
		},
		{
		"name":"203K Discount On Repairs",
		"value":"203KDiscountOnRepairs",
		"disabled":false
		},
		{
		"name":"203K Inspection Fee",
		"value":"203KInspectionFee",
		"disabled":false
		},
		{
		"name":"203K Permits",
		"value":"203KPermits",
		"disabled":false
		},
		{
		"name":"203K Supplemental Origination Fee",
		"value":"203KSupplementalOriginationFee",
		"disabled":false
		},
		{
		"name":"Application Fee",
		"value":"ApplicationFee",
		"disabled":false
		},
		{
		"name":"Appraisal Desk Review Fee",
		"value":"AppraisalDeskReviewFee",
		"disabled":false
		},
		{
		"name":"Appraisal Fee",
		"value":"AppraisalFee",
		"disabled":false
		},
		{
		"name":"Appraisal Field Review Fee",
		"value":"AppraisalFieldReviewFee",
		"disabled":false
		},
		{
		"name":"Appraisal Management Company Fee",
		"value":"AppraisalManagementCompanyFee",
		"disabled":false
		},
		{
		"name":"Assumption Fee",
		"value":"AssumptionFee",
		"disabled":false
		},
		{
		"name":"Automated Underwriting Fee",
		"value":"AutomatedUnderwritingFee",
		"disabled":false
		},
		{
		"name":"AVM Fee",
		"value":"AVMFee",
		"disabled":false
		},
		{
		"name":"Bond Fee",
		"value":"BondFee",
		"disabled":false
		},
		{
		"name":"Certification Fee",
		"value":"CertificationFee",
		"disabled":false
		},
		{
		"name":"Copy Or Fax Fee",
		"value":"CopyOrFaxFee",
		"disabled":false
		},
		{
		"name":"Courier Fee",
		"value":"CourierFee",
		"disabled":false
		},
		{
		"name":"Credit Report Fee",
		"value":"CreditReportFee",
		"disabled":false
		},
		{
		"name":"Document Preparation Fee",
		"value":"DocumentPreparationFee",
		"disabled":false
		},
		{
		"name":"Electronic Document Delivery Fee",
		"value":"ElectronicDocumentDeliveryFee",
		"disabled":false
		},
		{
		"name":"Escrow Waiver Fee",
		"value":"EscrowWaiverFee",
		"disabled":false
		},
		{
		"name":"Filing Fee",
		"value":"FilingFee",
		"disabled":false
		},
		{
		"name":"High Cost Mortgage Counseling Fee",
		"value":"HighCostMortgageCounselingFee",
		"disabled":false
		},
		{
		"name":"Loan Discount Points",
		"value":"LoanDiscountPoints",
		"disabled":false
		},
		{
		"name":"Loan Level Price Adjustment",
		"value":"LoanLevelPriceAdjustment",
		"disabled":false
		},
		{
		"name":"Loan Origination Fee",
		"value":"LoanOriginationFee",
		"disabled":false
		},
		{
		"name":"Loan Originator Compensation",
		"value":"LoanOriginatorCompensation",
		"disabled":false
		},
		{
		"name":"Manual Underwriting Fee",
		"value":"ManualUnderwritingFee",
		"disabled":false
		},
		{
		"name":"MERS Registration Fee",
		"value":"MERSRegistrationFee",
		"disabled":false
		},
		{
		"name":"Notary Fee",
		"value":"NotaryFee",
		"disabled":false
		},
		{
		"name":"Other",
		"value":"Other",
		"disabled":false
		},
		{
		"name":"Power Of Attorney Preparation Fee",
		"value":"PowerOfAttorneyPreparationFee",
		"disabled":false
		},
		{
		"name":"Power Of Attorney Recording Fee",
		"value":"PowerOfAttorneyRecordingFee",
		"disabled":false
		},
		{
		"name":"Preclosing Verification Control Fee",
		"value":"PreclosingVerificationControlFee",
		"disabled":false
		},
		{
		"name":"Processing Fee",
		"value":"ProcessingFee",
		"disabled":false
		},
		{
		"name":"Rate Lock Fee",
		"value":"RateLockFee",
		"disabled":false
		},
		{
		"name":"Reinspection Fee",
		"value":"ReinspectionFee",
		"disabled":false
		},
		{
		"name":"Subordination Fee",
		"value":"SubordinationFee",
		"disabled":false
		},
		{
		"name":"Temporary Buydown Administration Fee",
		"value":"TemporaryBuydownAdministrationFee",
		"disabled":false
		},
		{
		"name":"Temporary Buydown Points",
		"value":"TemporaryBuydownPoints",
		"disabled":false
		},
		{
		"name":"Verification Of Assets Fee",
		"value":"VerificationOfAssetsFee",
		"disabled":false
		},
		{
		"name":"Verification Of Employment Fee",
		"value":"VerificationOfEmploymentFee",
		"disabled":false
		},
		{
		"name":"Verification Of Income Fee",
		"value":"VerificationOfIncomeFee",
		"disabled":false
		},
		{
		"name":"Verification Of Residency Status Fee",
		"value":"VerificationOfResidencyStatusFee",
		"disabled":false
		},
		{
		"name":"Verification Of Taxpayer Identification Fee",
		"value":"VerificationOfTaxpayerIdentificationFee",
		"disabled":false
		},
		{
		"name":"Verification Of Tax Return Fee",
		"value":"VerificationOfTaxReturnFee",
		"disabled":false
		},
		{
		"name":"Wire Transfer Fee",
		"value":"WireTransferFee",
		"disabled":false
		}
    ];
    
   this.sectionBfeeTypes = [
		{
		 "name":"203K Architectural And Engineering Fee",
		 "value":"203KArchitecturalAndEngineeringFee",
		 "disabled":false
		},
		{
		"name":"203K Consultant Fee",
		"value":"203KConsultantFee",
		"disabled":false
		},
		{
		"name":"203K Inspection Fee",
		"value":"203KInspectionFee",
		"disabled":false
		},
		{
		"name":"203K Permits",
		"value":"203KPermits",
		"disabled":false
		},
		{
		"name":"203K Title Update",
		"value":"203KTitleUpdate",
		"disabled":false
		},
		{
		"name":"Application Fee",
		"value":"ApplicationFee",
		"disabled":false
		},
		{
		"name":"Appraisal Desk Review Fee",
		"value":"AppraisalDeskReviewFee",
		"disabled":false
		},
		{
		"name":"Appraisal Fee",
		"value":"AppraisalFee",
		"disabled":false
		},
		{
		"name":"Appraisal Field Review Fee",
		"value":"AppraisalFieldReviewFee",
		"disabled":false
		},
		{
		"name":"Appraisal Management Company Fee",
		"value":"AppraisalManagementCompanyFee",
		"disabled":false
		},
		{
		"name":"Asbestos Inspection Fee",
		"value":"AsbestosInspectionFee",
		"disabled":false
		},
		{
		"name":"Assumption Fee",
		"value":"AssumptionFee",
		"disabled":false
		},
		{
		"name":"Automated Underwriting Fee",
		"value":"AutomatedUnderwritingFee",
		"disabled":false
		},
		{
		"name":"AVM Fee",
		"value":"AVMFee",
		"disabled":false
		},
		{
		"name":"Bond Fee",
		"value":"BondFee",
		"disabled":false
		},
		{
		"name":"Certification Fee",
		"value":"CertificationFee",
		"disabled":false
		},
		{
		"name":"Copy Or Fax Fee",
		"value":"CopyOrFaxFee",
		"disabled":false
		},
		{
		"name":"Courier Fee",
		"value":"CourierFee",
		"disabled":false
		},
		{
		"name":"Credit Report Fee",
		"value":"CreditReportFee",
		"disabled":false
		},
		{
		"name":"Disaster Inspection Fee",
		"value":"DisasterInspectionFee",
		"disabled":false
		},
		{
		"name":"Document Preparation Fee",
		"value":"DocumentPreparationFee",
		"disabled":false
		},
		{
		"name":"Dry Wall Inspection Fee",
		"value":"DryWallInspectionFee",
		"disabled":false
		},
		{
		"name":"Electrical Inspection Fee",
		"value":"ElectricalInspectionFee",
		"disabled":false
		},
		{
		"name":"Electronic Document Delivery Fee",
		"value":"ElectronicDocumentDeliveryFee",
		"disabled":false
		},
		{
		"name":"Environmental Inspection Fee",
		"value":"EnvironmentalInspectionFee",
		"disabled":false
		},
		{
		"name":"Escrow Service Fee",
		"value":"EscrowServiceFee",
		"disabled":false
		},
		{
		"name":"Escrow Waiver Fee",
		"value":"EscrowWaiverFee",
		"disabled":false
		},
		{
		"name":"Filing Fee",
		"value":"FilingFee",
		"disabled":false
		},
		{
		"name":"Flood Certification",
		"value":"FloodCertification",
		"disabled":false
		},
		{
		"name":"Foundation Inspection Fee",
		"value":"FoundationInspectionFee",
		"disabled":false
		},
		{
		"name":"Heating Cooling Inspection Fee",
		"value":"HeatingCoolingInspectionFee",
		"disabled":false
		},
		{
		"name":"High Cost Mortgage Counseling Fee",
		"value":"HighCostMortgageCounselingFee",
		"disabled":false
		},
		{
		"name":"Home Inspection Fee",
		"value":"HomeInspectionFee",
		"disabled":false
		},
		{
		"name":"Lead Inspection Fee",
		"value":"LeadInspectionFee",
		"disabled":false
		},
		{
		"name":"Lenders Attorney Fee",
		"value":"LendersAttorneyFee",
		"disabled":false
		},
		{
		"name":"Manual Underwriting Fee",
		"value":"ManualUnderwritingFee",
		"disabled":false
		},
		{
		"name":"MERS Registration Fee",
		"value":"MERSRegistrationFee",
		"disabled":false
		},
		{
		"name":"MI Upfront Premium",
		"value":"MIUpfrontPremium",
		"disabled":false
		},
		{
		"name":"Mold Inspection Fee",
		"value":"MoldInspectionFee",
		"disabled":false
		},
		{
		"name":"Notary Fee",
		"value":"NotaryFee",
		"disabled":false
		},
		{
		"name":"Other",
		"value":"Other",
		"disabled":false
		},
		{
		"name":"Pest Inspection Fee",
		"value":"PestInspectionFee",
		"disabled":false
		},
		{
		"name":"Plumbing Inspection Fee",
		"value":"PlumbingInspectionFee",
		"disabled":false
		},
		{
		"name":"Power Of Attorney Preparation Fee",
		"value":"PowerOfAttorneyPreparationFee",
		"disabled":false
		},
		{
		"name":"Power Of Attorney Recording Fee",
		"value":"PowerOfAttorneyRecordingFee",
		"disabled":false
		},
		{
		"name":"Preclosing Verification Control Fee",
		"value":"PreclosingVerificationControlFee",
		"disabled":false
		},
		{
		"name":"Processing Fee",
		"value":"ProcessingFee",
		"disabled":false
		},
		{
		"name":"Property Inspection Waiver Fee",
		"value":"PropertyInspectionWaiverFee",
		"disabled":false
		},
		{
		"name":"Property Tax Status Research Fee",
		"value":"PropertyTaxStatusResearchFee",
		"disabled":false
		},
		{
		"name":"Radon Inspection Fee",
		"value":"RadonInspectionFee",
		"disabled":false
		},
		{
		"name":"Reinspection Fee",
		"value":"ReinspectionFee",
		"disabled":false
		},
		{
		"name":"Roof Inspection Fee",
		"value":"RoofInspectionFee",
		"disabled":false
		},
		{
		"name":"Septic Inspection Fee",
		"value":"SepticInspectionFee",
		"disabled":false
		},
		{
		"name":"Settlement Fee",
		"value":"SettlementFee",
		"disabled":false
		},
		{
		"name":"Smoke Detector Inspection Fee",
		"value":"SmokeDetectorInspectionFee",
		"disabled":false
		},
		{
		"name":"Structural Inspection Fee",
		"value":"StructuralInspectionFee",
		"disabled":false
		},
		{
		"name":"Subordination Fee",
		"value":"SubordinationFee",
		"disabled":false
		},
		{
		"name":"Survey Fee",
		"value":"SurveyFee",
		"disabled":false
		},
		{
		"name":"Temporary Buydown Administration Fee",
		"value":"TemporaryBuydownAdministrationFee",
		"disabled":false
		},
		{
		"name":"Title Closing Fee",
		"value":"TitleClosingFee",
		"disabled":false
		},
		{
		"name":"Title Closing Protection Letter Fee",
		"value":"TitleClosingProtectionLetterFee",
		"disabled":false
		},
		{
		"name":"Title Document Preparation Fee",
		"value":"TitleDocumentPreparationFee","disabled":false
		},
		{
		"name":"Title Endorsement Fee",
		"value":"TitleEndorsementFee",
		"disabled":false
		},
		{
		"name":"Title Examination Fee",
		"value":"TitleExaminationFee",
		"disabled":false
		},
		{
		"name":"Title Insurance Binder Fee",
		"value":"TitleInsuranceBinderFee",
		"disabled":false
		},
		{
		"name":"Title Lenders Coverage Premium",
		"value":"TitleLendersCoveragePremium",
		"disabled":false
		},
		{
		"name":"Title Notary Fee",
		"value":"TitleNotaryFee",
		"disabled":false
		},
		{
		"name":"Title Underwriting Issue Resolution Fee",
		"value":"TitleUnderwritingIssueResolutionFee",
		"disabled":false
		},
		{
		"name":"USDA Rural Development Guarantee Fee",
		"value":"USDARuralDevelopmentGuaranteeFee",
		"disabled":false
		},
		{
		"name":"VAFunding Fee",
		"value":"VAFundingFee",
		"disabled":false
		}, 
		{
		"name":"Verification Of Assets Fee",
		"value":"VerificationOfAssetsFee",
		"disabled":false
		},
		{
		"name":"Verification Of Employment Fee",
		"value":"VerificationOfEmploymentFee",
		"disabled":false
		},
		{
		"name":"Verification Of Income Fee",
		"value":"VerificationOfIncomeFee",
		"disabled":false
		},
		{
		"name":"Verification Of Residency Status Fee",
		"value":"VerificationOfResidencyStatusFee",
		"disabled":false
		},
		{
		"name":"Verification Of Taxpayer Identification Fee",
		"value":"VerificationOfTaxpayerIdentificationFee",
		"disabled":false
		},
		{
		"name":"Verification Of Tax Return Fee",
		"value":"VerificationOfTaxReturnFee",
		"disabled":false
		},
		{
		"name":"Water Testing Fee",
		"value":"WaterTestingFee",
		"disabled":false
		},
		{
		"name":"Well Inspection Fee",
		"value":"WellInspectionFee",
		"disabled":false
		},
		{
		"name":"Wire Transfer Fee",
		"value":"WireTransferFee",
		"disabled":false
		}
	];
    
    this.sectionCfeeTypes = [
		{
		 "name":"203K Architectural And Engineering Fee",
		 "value":"203KArchitecturalAndEngineeringFee",
		 "disabled":false
		},
		{
		"name":"203K Consultant Fee",
		"value":"203KConsultantFee",
		"disabled":false
		},
		{
		"name":"203K Inspection Fee",
		"value":"203KInspectionFee",
		"disabled":false
		},
		{
		"name":"203K Permits",
		"value":"203KPermits",
		"disabled":false
		},
		{
		"name":"203K Title Update",
		"value":"203KTitleUpdate",
		"disabled":false
		},
		{
		"name":"Application Fee",
		"value":"ApplicationFee",
		"disabled":false
		},
		{
		"name":"Appraisal Desk Review Fee",
		"value":"AppraisalDeskReviewFee",
		"disabled":false
		},
		{
		"name":"Appraisal Fee",
		"value":"AppraisalFee",
		"disabled":false
		},
		{
		"name":"Appraisal Field Review Fee",
		"value":"AppraisalFieldReviewFee",
		"disabled":false
		},
		{
		"name":"Appraisal Management Company Fee",
		"value":"AppraisalManagementCompanyFee",
		"disabled":false
		},
		{
		"name":"Asbestos Inspection Fee",
		"value":"AsbestosInspectionFee",
		"disabled":false
		},
		{
		"name":"Assumption Fee",
		"value":"AssumptionFee",
		"disabled":false
		},
		{
		"name":"Automated Underwriting Fee",
		"value":"AutomatedUnderwritingFee",
		"disabled":false
		},
		{
		"name":"AVM Fee",
		"value":"AVMFee",
		"disabled":false
		},
		{
		"name":"Bond Fee",
		"value":"BondFee",
		"disabled":false
		},
		{
		"name":"Certification Fee",
		"value":"CertificationFee",
		"disabled":false
		},
		{
		"name":"Copy Or Fax Fee",
		"value":"CopyOrFaxFee",
		"disabled":false
		},
		{
		"name":"Courier Fee",
		"value":"CourierFee",
		"disabled":false
		},
		{
		"name":"Credit Report Fee",
		"value":"CreditReportFee",
		"disabled":false
		},
		{
		"name":"Disaster Inspection Fee",
		"value":"DisasterInspectionFee",
		"disabled":false
		},
		{
		"name":"Document Preparation Fee",
		"value":"DocumentPreparationFee",
		"disabled":false
		},
		{
		"name":"Dry Wall Inspection Fee",
		"value":"DryWallInspectionFee",
		"disabled":false
		},
		{
		"name":"Electrical Inspection Fee",
		"value":"ElectricalInspectionFee",
		"disabled":false
		},
		{
		"name":"Electronic Document Delivery Fee",
		"value":"ElectronicDocumentDeliveryFee",
		"disabled":false
		},
		{
		"name":"Environmental Inspection Fee",
		"value":"EnvironmentalInspectionFee",
		"disabled":false
		},
		{
		"name":"Escrow Service Fee",
		"value":"EscrowServiceFee",
		"disabled":false
		},
		{
		"name":"Escrow Waiver Fee",
		"value":"EscrowWaiverFee",
		"disabled":false
		},
		{
		"name":"Filing Fee",
		"value":"FilingFee",
		"disabled":false
		},
		{
		"name":"Flood Certification",
		"value":"FloodCertification",
		"disabled":false
		},
		{
		"name":"Foundation Inspection Fee",
		"value":"FoundationInspectionFee",
		"disabled":false
		},
		{
		"name":"Heating Cooling Inspection Fee",
		"value":"HeatingCoolingInspectionFee",
		"disabled":false
		},
		{
		"name":"High Cost Mortgage Counseling Fee",
		"value":"HighCostMortgageCounselingFee",
		"disabled":false
		},
		{
		"name":"Home Inspection Fee",
		"value":"HomeInspectionFee",
		"disabled":false
		},
		{
		"name":"Lead Inspection Fee",
		"value":"LeadInspectionFee",
		"disabled":false
		},
		{
		"name":"Lenders Attorney Fee",
		"value":"LendersAttorneyFee",
		"disabled":false
		},
		{
		"name":"Manual Underwriting Fee",
		"value":"ManualUnderwritingFee",
		"disabled":false
		},
		{
		"name":"MERS Registration Fee",
		"value":"MERSRegistrationFee",
		"disabled":false
		},
		{
		"name":"MI Upfront Premium",
		"value":"MIUpfrontPremium",
		"disabled":false
		},
		{
		"name":"Mold Inspection Fee",
		"value":"MoldInspectionFee",
		"disabled":false
		},
		{
		"name":"Notary Fee",
		"value":"NotaryFee",
		"disabled":false
		},
		{
		"name":"Other",
		"value":"Other",
		"disabled":false
		},
		{
		"name":"Pest Inspection Fee",
		"value":"PestInspectionFee",
		"disabled":false
		},
		{
		"name":"Plumbing Inspection Fee",
		"value":"PlumbingInspectionFee",
		"disabled":false
		},
		{
		"name":"Power Of Attorney Preparation Fee",
		"value":"PowerOfAttorneyPreparationFee",
		"disabled":false
		},
		{
		"name":"Power Of Attorney Recording Fee",
		"value":"PowerOfAttorneyRecordingFee",
		"disabled":false
		},
		{
		"name":"Preclosing Verification Control Fee",
		"value":"PreclosingVerificationControlFee",
		"disabled":false
		},
		{
		"name":"Processing Fee",
		"value":"ProcessingFee",
		"disabled":false
		},
		{
		"name":"Property Inspection Waiver Fee",
		"value":"PropertyInspectionWaiverFee",
		"disabled":false
		},
		{
		"name":"Property Tax Status Research Fee",
		"value":"PropertyTaxStatusResearchFee",
		"disabled":false
		},
		{
		"name":"Radon Inspection Fee",
		"value":"RadonInspectionFee",
		"disabled":false
		},
		{
		"name":"Reinspection Fee",
		"value":"ReinspectionFee",
		"disabled":false
		},
		{
		"name":"Roof Inspection Fee",
		"value":"RoofInspectionFee",
		"disabled":false
		},
		{
		"name":"Septic Inspection Fee",
		"value":"SepticInspectionFee",
		"disabled":false
		},
		{
		"name":"Settlement Fee",
		"value":"SettlementFee",
		"disabled":false
		},
		{
		"name":"Smoke Detector Inspection Fee",
		"value":"SmokeDetectorInspectionFee",
		"disabled":false
		},
		{
		"name":"Structural Inspection Fee",
		"value":"StructuralInspectionFee",
		"disabled":false
		},
		{
		"name":"Subordination Fee",
		"value":"SubordinationFee",
		"disabled":false
		},
		{
		"name":"Survey Fee",
		"value":"SurveyFee",
		"disabled":false
		},
		{
		"name":"Temporary Buydown Administration Fee",
		"value":"TemporaryBuydownAdministrationFee",
		"disabled":false
		},
		{
		"name":"Title Closing Fee",
		"value":"TitleClosingFee",
		"disabled":false
		},
		{
		"name":"Title Closing Protection Letter Fee",
		"value":"TitleClosingProtectionLetterFee",
		"disabled":false
		},
		{
		"name":"Title Document Preparation Fee",
		"value":"TitleDocumentPreparationFee","disabled":false
		},
		{
		"name":"Title Endorsement Fee",
		"value":"TitleEndorsementFee",
		"disabled":false
		},
		{
		"name":"Title Examination Fee",
		"value":"TitleExaminationFee",
		"disabled":false
		},
		{
		"name":"Title Insurance Binder Fee",
		"value":"TitleInsuranceBinderFee",
		"disabled":false
		},
		{
		"name":"Title Lenders Coverage Premium",
		"value":"TitleLendersCoveragePremium",
		"disabled":false
		},
		{
		"name":"Title Notary Fee",
		"value":"TitleNotaryFee",
		"disabled":false
		},
		{
		"name":"Title Underwriting Issue Resolution Fee",
		"value":"TitleUnderwritingIssueResolutionFee",
		"disabled":false
		},
		{
		"name":"Verification Of Assets Fee",
		"value":"VerificationOfAssetsFee",
		"disabled":false
		},
		{
		"name":"Verification Of Employment Fee",
		"value":"VerificationOfEmploymentFee",
		"disabled":false
		},
		{
		"name":"Verification Of Income Fee",
		"value":"VerificationOfIncomeFee",
		"disabled":false
		},
		{
		"name":"Verification Of Residency Status Fee",
		"value":"VerificationOfResidencyStatusFee",
		"disabled":false
		},
		{
		"name":"Verification Of Taxpayer Identification Fee",
		"value":"VerificationOfTaxpayerIdentificationFee",
		"disabled":false
		},
		{
		"name":"Verification Of Tax Return Fee",
		"value":"VerificationOfTaxReturnFee",
		"disabled":false
		},
		{
		"name":"Water Testing Fee",
		"value":"WaterTestingFee",
		"disabled":false
		},
		{
		"name":"Well Inspection Fee",
		"value":"WellInspectionFee",
		"disabled":false
		},
		{
		"name":"Wire Transfer Fee",
		"value":"WireTransferFee",
		"disabled":false
		}
	];
    
    this.sectionEfeeTypes = [
        {
	        "name":"Mortgage Surcharge County Or Parish",
	        "value":"MortgageSurchargeCountyOrParish",
	        "disabled":false
        },
        {
	        "name":"Mortgage Surcharge Municipal",
	        "value":"MortgageSurchargeMunicipal",
	        "disabled":false
        },
        {
	        "name":"Mortgage Surcharge State",
	        "value":"MortgageSurchargeState",
	        "disabled":false
        },
        {
	        "name":"Other",
	        "value":"Other",
	        "disabled":false
        },
        {
	        "name":"Transfer Tax Total",
	        "value":"TransferTaxTotal",
	        'disabled': false
        }
	];
	
	this.sectionHfeeTypes = [                                                                                                 
	     {
		 "name":"Asbestos Inspection Fee",
		 "value":"AsbestosInspectionFee",
		 "disabled":false
		 }, 
	     {
		 "name":"Condominium Association Dues",
		 "value":"CondominiumAssociationDues",
		 "disabled":false
		 }, 
	     {
		 "name":"Condominium AssociationSpecial Assessment",
		 "value":"CondominiumAssociationSpecialAssessment",
		 "disabled":false
		 }, 
	     {
		 "name":"Cooperative Association Dues",            
		 "value":"CooperativeAssociationDues",
		 "disabled":false
		 }, 
	     {
		 "name":"Cooperative Association Special Assessment",
		 "value":"CooperativeAssociationSpecialAssessment",
		 "disabled":false
		 }, 
	     {
		 "name":"Credit Disability Insurance Premium",
		 "value":"CreditDisabilityInsurancePremium",
		 "disabled":false
		 }, 
	     {
		 "name":"Credit LifeInsurance Premium",
		 "value":"CreditLifeInsurancePremium",
		 "disabled":false
		 }, 
	     {
		 "name":"Credit Property Insurance Premium",
		 "value":"CreditPropertyInsurancePremium", 
		 "disabled":false
		 }, 
	     {
		 "name":"Credit Unemployment Insurance Premium",
		 "value":"CreditUnemploymentInsurancePremium",
	     "disabled":false
		 }, 
	     {
		 "name":"Debt Cancellation Insurance Premium",
		 "value":"DebtCancellationInsurancePremium",
		 "disabled":false
		 }, 
	     {
		 "name":"Disaster Inspection Fee",
		 "value":"DisasterInspectionFee",
		 "disabled":false
		 }, 
	     {
		 "name":"Dry Wall Inspection Fee",
		 "value":"DryWallInspectionFee", 
		 "disabled":false
		 }, 
	     {
		 "name":"Electrical Inspection Fee",
		 "value":"ElectricalInspectionFee",
		 "disabled":false
		 }, 
	     {
		 "name":"Environmental Inspection Fee",
		 "value":"EnvironmentalInspectionFee",
		 "disabled":false
		 }, 
	     {
		 "name":"Foundation Inspection Fee",
		 "value":"FoundationInspectionFee", 
		 "disabled":false
		 }, 
	     {
		 "name":"Heating Cooling Inspection Fee",
		 "value":"HeatingCoolingInspectionFee",
		 "disabled":false
		 }, 
	     {
		 "name":"Home Inspection Fee", 
		 "value":"HomeInspectionFee",
		 "disabled":false
		 }, 
	     {
		 "name":"Homeowners Association Dues",
		 "value":"HomeownersAssociationDues",
		 "disabled":false
		 }, 
	     {
		 "name":"Homeowners Association Special Assessment",
		 "value":"HomeownersAssociationSpecialAssessment", 
		 "disabled":false
		 }, 
	     {
		 "name":"Home Warranty Fee",  
		 "value":"HomeWarrantyFee",
		 "disabled":false
		 }, 
	     {
		 "name":"Lead Inspection Fee",    
		 "value":"LeadInspectionFee",  
		 "disabled":false
		 }, 
	     {
		 "name":"Mold Inspection Fee", 
		 "value":"MoldInspectionFee", 
		 "disabled":false
		 }, 
	     {
		 "name":"Municipal Lien Certificate Fee", 
		 "value":"MunicipalLienCertificateFee",
		 "disabled":false
		 }, 
	     {
		 "name":"Other",   
		 "value":"Other", 
		 "disabled":false
		 }, 
	     {
		 "name":"Pest Inspection Fee", 
		 "value":"PestInspectionFee",  
		 "disabled":false
		 }, 
	     {
		 "name":"Plumbing Inspection Fee",    
		 "value":"PlumbingInspectionFee", 
		 "disabled":false
		 }, 
	     {
		 "name":"Radon Inspection Fee",
		 "value":"RadonInspectionFee",  
		 "disabled":false
		 }, 
	     {
		 "name":"Real Estate Commission Buyers Broker",
		 "value":"RealEstateCommissionBuyersBroker",   
		 "disabled":false
		 }, 
	     {
		 "name":"Real Estate Commission Sellers Broker", 
		 "value":"RealEstateCommissionSellersBroker", 
	     "disabled":false
		 }, 
	     {
		 "name":"Reconveyance Fee",    
		 "value":"ReconveyanceFee",  
		 "disabled":false
		 }, 
	     {
		 "name":"Roof Inspection Fee",   
		 "value":"RoofInspectionFee", 
		 "disabled":false
		 }, 
	     {
		 "name":"Septic Inspection Fee", 
		 "value":"SepticInspectionFee", 
		 "disabled":false
		 }, 
	     {
		 "name":"Signing AgentFee",   
		 "value":"SigningAgentFee", 
		 "disabled":false
		 }, 
	     {
		 "name":"Smoke Detector Inspection Fee",
		 "value":"SmokeDetectorInspectionFee",
		 "disabled":false
		 },
	     {
		 "name":"Structural Inspection Fee",
		 "value":"StructuralInspectionFee",
		 "disabled":false
		 }, 
	     {
		 "name":"Title Owners Coverage Premium",
		 "value":"TitleOwnersCoveragePremium",
		 "disabled":false
		 }, 
	     {
		 "name":"Water Testing Fee",
		 "value":"WaterTestingFee", 
		 "disabled":false
		 }, 
	     {
		 "name":"Well Inspection Fee",
		 "value":"WellInspectionFee",
		 "disabled":false
		 } 
	]; 

	this.feePaidToTypes = [
		{
			'name' : 'Broker',
			'value':'Broker'
		},
		{
			'name' : 'Investor',
			'value':'Investor'
		},
		{
			'name' : 'Lender',
			'value':'Lender'
		},
		{
			'name' : 'Other',
			'value':'Other'
		},
		{
			'name' : 'Third Party Provider',
			'value':'ThirdPartyProvider'
		}
	];

    this.feePaidToTypeDescription = [
		{
			'name' : 'Broker Affiliate',
			'value':'BrokerAffiliate'
		},
		{
			'name' : 'Lender Affiliate',
			'value':'LenderAffiliate'
		}
	];

	this.calendarMonths = ['Jan','Feb','Mar', 'Apr', 'May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    this.prepaidItems = [
		{
		'name':'Borough Property Tax',                     
		'value':'BoroughPropertyTax',
		'disabled':false,
		},
		{
		'name':'City Property Tax',                        
		'value':'CityPropertyTax',                         
		'disabled':false,
		},
		{
		'name':'Condominium Association Dues', 
		'value':'CondominiumAssociationDues', 
		'disabled':false
		},
		{
		'name':'Condominium Association Special Assessment',
		'value':'CondominiumAssociationSpecialAssessment', 
		'disabled':false
		},
		{
		'name':'Cooperative Association Dues', 
		'value':'CooperativeAssociationDues', 
		'disabled':false
		},
		{
		'name':'Cooperative Association Special Assessment',
		'value':'CooperativeAssociationSpecialAssessment',
		'disabled':false
		},
		{
		'name':'County Property Tax',   
		'value':'CountyPropertyTax',   
		'disabled':false
		},
		{
		'name':'District Property Tax', 
		'value':'DistrictPropertyTax',  
		'disabled':false
		},
		{
		'name':'Earthquake Insurance Premium',  
		'value':'EarthquakeInsurancePremium',
		'disabled':false
		},
		{
		'name':'FloodInsurance Premium', 
		'value':'FloodInsurancePremium', 
		'disabled':false
		},
		{
		'name':'Hail Insurance Premium',
		'value':'HailInsurancePremium', 
		'disabled':false
		},
		{
		'name':'Hazard Insurance Premium',
		'value':'HazardInsurancePremium', 
		'disabled':false
		},
		{
		'name':'Homeowners Association Dues',
		'value':'HomeownersAssociationDues',
		'disabled':false
		},
		{
		'name':'Homeowners Association Special Assessment', 
		'value':'HomeownersAssociationSpecialAssessment',
		'disabled':false
		},
		{
		'name':'Other',               
		'value':'Other',         
		'disabled':false
		},
		{
		'name':'State Property Tax',   
		'value':'StatePropertyTax',  
		'disabled':false
		},
		{
		'name':'Town Property Tax',  
		'value':'TownPropertyTax',
		'disabled':false
		},
		{
		'name':'Volcano Insurance Premium',  
		'value':'VolcanoInsurancePremium',  
		'disabled':false
		},
		{
		'name':'Wind And Storm Insurance Premium', 
		'value':'WindAndStormInsurancePremium', 
		'disabled':false
		}
	];
    
    this.escrowItemTypes = [
        {
        	'name':'Assessment Tax',                          
        	'value':'AssessmentTax',                            
        	'disabled':false
        },
		{
			'name':'City Bond Tax',   
			'value':'CityBondTax', 
			'disabled':false
		},
		{
			'name':'City Property Tax',
			'value':'CityPropertyTax',
			'disabled':false
		},
		{ 
			'name':'Condominium Association Dues',
			'value':'CondominiumAssociationDues',
			'disabled':false
		},
		{
			'name':'Condominium Association Special Assessment',
			'value':'CondominiumAssociationSpecialAssessment', 
			'disabled':false
		},
		{
			'name':'Cooperative Association Dues', 
			'value':'CooperativeAssociationDues',
			'disabled':false
		},
		{
			'name':'Cooperative Association Special Assessment',
			'value':'CooperativeAssociationSpecialAssessment', 
			'disabled':false
		},
		{
			'name':'County Bond Tax',
			'value':'CountyBondTax',
			'disabled':false
		},
		{ 
			'name':'County Property Tax',
			'value':'CountyPropertyTax',
			'disabled':false
		},
		{
			'name':'District Property Tax', 
			'value':'DistrictPropertyTax', 
			'disabled':false
		},
		{
			'name':'Earthquake Insurance',     
			'value':'EarthquakeInsurance',  
			'disabled':false
		},
		{
			'name':'Energy Efficient Improvement Funds', 
			'value':'EnergyEfficientImprovementFunds',         
			'disabled':false
		},
		{
			'name':'Flood Insurance',
			'value':'FloodInsurance',
			'disabled':false
		},
		{
			'name':'Hail Insurance Premium',
			'value':'HailInsurancePremium',
			'disabled':false
		},
		{
			'name':'Hazard Insurance',
			'value':'HazardInsurance',
			'disabled':false
		},
		{
			'name':'Homeowners Association Dues',
			'value':'HomeownersAssociationDues',
			'disabled':false
		},
		{
			'name':'Homeowners Association Special Assessment', 
			'value':'HomeownersAssociationSpecialAssessment', 
			'disabled':false
		},
		{
			'name':'Other',  
			'value':'Other',  
			'disabled':false
		},
		{
			'name':'Parish Tax', 
			'value':'ParishTax',
			'disabled':false
		},
		{ 
			'name':'Pest Insurance',
			'value':'PestInsurance',
			'disabled':false
		},
		{
			'name':'Rehabilitation Funds',
			'value':'RehabilitationFunds',   
			'disabled':false
		},
		{
			'name':'School Property Tax',
			'value':'SchoolPropertyTax', 
			'disabled':false
		},
		{
			'name':'State Property Tax',
			'value':'StatePropertyTax',
			'disabled':false
		},
		{ 
			'name':'Town Property Tax', 
			'value':'TownPropertyTax',
			'disabled':false
		},
		{
			'name':'Township Property Tax', 
			'value':'TownshipPropertyTax',
			'disabled':false
		},
		{
			'name':'Village Property Tax', 
			'value':'VillagePropertyTax',
			'disabled':false
		},
		{
			'name':'Volcano Insurance',
			'value':'VolcanoInsurance',
			'disabled':false
		},
		{
			'name':'Windstorm Insurance',
			'value':'WindstormInsurance', 
		    'disabled':false
		}
    ];
    
    this.licenseAuthorityLevelTypes = [
		{
			"name":"Private",
			"value":"Private"
		},
		{
			"name":"Public Federal",
			"value":"PublicFederal"
		},
		{
			"name":"Public Local",
			"value":"PublicLocal"
		},
		{
			"name":"Public State",
			"value":"PublicState"
		}
    ];

    this.repayMethodType = [
	     {
	        "name":"General",
	        "value":"General"
	     },
	     {
	        "name":"Exempt",
	        "value":"Exempt"
	     }
    ];

    this.repayExemptionReasonType = [
	     {
	        "name":"Loan Program",
	        "value":"LoanProgram"
	     },
	     {
	        "name":"Property Usage",
	        "value":"PropertyUsage"
	     }
    ];

    this.liabilityTypes = [
    	{
    		"name":"Borrower Estimated Total Monthly Liability Payment",
	        "value":"BorrowerEstimatedTotalMonthlyLiabilityPayment",
	        "disabled":false
    	},
    	{
    		"name":"Collections Judgments And Liens",
	        "value":"CollectionsJudgmentsAndLiens",
	        "disabled":false
    	},
    	{
    		"name":"Deferred Student Loan",
	        "value":"DeferredStudentLoan",
	        "disabled":false
    	},
    	{
    		"name":"Delinquent Taxes",
	        "value":"DelinquentTaxes",
	        "disabled":false
    	},
    	{
    		"name":"First Position Mortgage Lien",
	        "value":"FirstPositionMortgageLien",
	        "disabled":false
    	},
    	{
    		"name":"Garnishments",
	        "value":"Garnishments",
	        "disabled":false
    	},
    	{
    		"name":"HELOC",
	        "value":"HELOC",
	        "disabled":false
    	},
    	{
    		"name":"Homeowners Association Lien",
	        "value":"HomeownersAssociationLien",
	        "disabled":false
    	},
    	{
    		"name":"Installment",
	        "value":"Installment",
	        "disabled":false
    	},
    	{
    		"name":"Lease Payment",
	        "value":"LeasePayment",
	        "disabled":false
    	},
    	{
    		"name":"Mortgage Loan",
	        "value":"MortgageLoan",
	        "disabled":false
    	},
    	{
    		"name":"Open 30Day Charge Account",
	        "value":"Open30DayChargeAccount",
	        "disabled":false
    	},
    	{
    		"name":"Other",
	        "value":"Other",
	        "disabled":false
    	},
    	{
    		"name":"Personal Loan",
	        "value":"PersonalLoan",
	        "disabled":false
    	},
    	{
    		"name":"Revolving",
	        "value":"Revolving",
	        "disabled":false
    	},
    	{
    		"name":"Second Position Mortgage Lien",
	        "value":"SecondPositionMortgageLien",
	        "disabled":false
    	},
    	{
    		"name":"Taxes",
	        "value":"Taxes",
	        "disabled":false
    	},
    	{
    		"name":"Tax Lien",
	        "value":"TaxLien",
	        "disabled":false
    	},
    	{
    		"name":"Third Position Mortgage Lien",
	        "value":"ThirdPositionMortgageLien",
	        "disabled":false
    	},
    	{
    		"name":"Unsecured Home Improvement Loan Installment",
	        "value":"UnsecuredHomeImprovementLoanInstallment",
	        "disabled":false
    	},
    	{
    		"name":"Unsecured Home Improvement Loan Revolving",
	        "value":"UnsecuredHomeImprovementLoanRevolving",
	        "disabled":false
    	}
    ];

    this.adjustmentTypes = [
        {
    		"name":"Fuel Costs",
            "value":"FuelCosts",
	        "disabled":false
    	},
    	{
    		"name":"Other",
            "value":"Other",
	        "disabled":false
    	},
    	{
    		"name":"Repairs",
            "value":"Repairs",
	        "disabled":false
    	},
    	{
    		"name":"Sellers Escrow Assumption",
            "value":"SellersEscrowAssumption",
	        "disabled":false
    	},
    	{
    		"name":"Sellers Mortgage Insurance Assumption",
            "value":"SellersMortgageInsuranceAssumption",
	        "disabled":false
    	},
    	{
    		"name":"Tenant Security Deposit",
            "value":"TenantSecurityDeposit",
	        "disabled":false
    	},
    	{
    		"name":"Seller Credit",
            "value":"SellerCredit",
	        "disabled":false
    	},
    	{
    		"name":"Gift",
            "value":"Gift",
	        "disabled":false
    	},
    	{
    		"name":"Grant",
            "value":"Grant",
	        "disabled":false
    	},
    	{
    		"name":"Rebate Credit",
            "value":"RebateCredit",
	        "disabled":false
    	},
    	{
    		"name":"Unpaid Utility Escrow Holdback",
            "value":"UnpaidUtilityEscrowHoldback",
	        "disabled":false
    	},
    	{
    		"name":"Trade Equity",
            "value":"TradeEquity",
	        "disabled":false
    	},
    	{
    		"name":"Sweat Equity",
            "value":"SweatEquity",
	        "disabled":false
    	},
    	{
    		"name":"Repair Completion Escrow Holdback",
            "value":"RepairCompletionEscrowHoldback",
	        "disabled":false
    	},
    	{
    		"name":"Relocation Funds",
            "value":"RelocationFunds",
	        "disabled":false
    	}
    ];
    
    this.liabilityTypesPayoff = [
    	{
    		"name":"Collections Judgments And Liens",
	        "value":"CollectionsJudgmentsAndLiens",
	        "disabled":false
    	},
    	{
    		"name":"Deferred Student Loan",
	        "value":"DeferredStudentLoan",
	        "disabled":false
    	},
    	{
    		"name":"Delinquent Taxes",
	        "value":"DelinquentTaxes",
	        "disabled":false
    	},
    	{
    		"name":"First Position Mortgage Lien",
	        "value":"FirstPositionMortgageLien",
	        "disabled":false
    	},
    	{
    		"name":"Garnishments",
	        "value":"Garnishments",
	        "disabled":false
    	},
    	{
    		"name":"HELOC",
	        "value":"HELOC",
	        "disabled":false
    	},
    	{
    		"name":"Installment",
	        "value":"Installment",
	        "disabled":false
    	},
    	{
    		"name":"Lease Payment",
	        "value":"LeasePayment",
	        "disabled":false
    	},
    	{
    		"name":"Open 30Day Charge Account",
	        "value":"Open30DayChargeAccount",
	        "disabled":false
    	},
    	{
    		"name":"Other",
	        "value":"Other",
	        "disabled":false
    	},
    	{
    		"name":"Personal Loan",
	        "value":"PersonalLoan",
	        "disabled":false
    	},
    	{
    		"name":"Revolving",
	        "value":"Revolving",
	        "disabled":false
    	},
    	{
    		"name":"Second Position Mortgage Lien",
	        "value":"SecondPositionMortgageLien",
	        "disabled":false
    	},
    	{
    		"name":"Taxes",
	        "value":"Taxes",
	        "disabled":false
    	},
    	{
    		"name":"Tax Lien",
	        "value":"TaxLien",
	        "disabled":false
    	},
    	{
    		"name":"Third Position Mortgage Lien",
	        "value":"ThirdPositionMortgageLien",
	        "disabled":false
    	},
    	{
    		"name":"Unsecured Home Improvement Loan Installment",
	        "value":"UnsecuredHomeImprovementLoanInstallment",
	        "disabled":false
    	},
    	{
    		"name":"Unsecured Home Improvement Loan Revolving",
	        "value":"UnsecuredHomeImprovementLoanRevolving",
	        "disabled":false
    	}
    ];

    this.sectionNliabilityTypes = [
    	{
    		"name":"Collections Judgments And Liens",
	        "value":"CollectionsJudgmentsAndLiens",
	        "disabled":false
    	},
    	{
    		"name":"Deferred Student Loan",
	        "value":"DeferredStudentLoan",
	        "disabled":false
    	},
    	{
    		"name":"Delinquent Taxes",
	        "value":"DelinquentTaxes",
	        "disabled":false
    	},
    	{
    		"name":"Garnishments",
	        "value":"Garnishments",
	        "disabled":false
    	},
    	{
    		"name":"HELOC",
	        "value":"HELOC",
	        "disabled":false
    	},
    	{
    		"name":"Installment",
	        "value":"Installment",
	        "disabled":false
    	},
    	{
    		"name":"Open 30Day Charge Account",
	        "value":"Open30DayChargeAccount",
	        "disabled":false
    	},
    	{
    		"name":"Other",
	        "value":"Other",
	        "disabled":false
    	},
    	{
    		"name":"Personal Loan",
	        "value":"PersonalLoan",
	        "disabled":false
    	},
    	{
    		"name":"Revolving",
	        "value":"Revolving",
	        "disabled":false
    	},
    	{
    		"name":"Taxes",
	        "value":"Taxes",
	        "disabled":false
    	},
    	{
    		"name":"Tax Lien",
	        "value":"TaxLien",
	        "disabled":false
    	},
    	{
    		"name":"Third Position Mortgage Lien",
	        "value":"ThirdPositionMortgageLien",
	        "disabled":false
    	},
    	{
    		"name":"Unsecured Home Improvement Loan Installment",
	        "value":"UnsecuredHomeImprovementLoanInstallment",
	        "disabled":false
    	}
    ];

    this.sectionKadjustmentTypes = [
        {
    		"name":"Fuel Costs",
            "value":"FuelCosts",
	        "disabled":false
    	},
    	{
    		"name":"Other",
            "value":"Other",
	        "disabled":false
    	},
    	{
    		"name":"Repairs",
            "value":"Repairs",
	        "disabled":false
    	},
    	{
    		"name":"Sellers Escrow Assumption",
            "value":"SellersEscrowAssumption",
	        "disabled":false
    	},
    	{
    		"name":"Sellers Mortgage Insurance Assumption",
            "value":"SellersMortgageInsuranceAssumption",
	        "disabled":false
    	},
    	{
    		"name":"Tenant Security Deposit",
            "value":"TenantSecurityDeposit",
	        "disabled":false
    	}
    ];

    this.sectionLadjustmentTypes = [
        {
    		"name":"Other",
            "value":"Other",
	        "disabled":false
    	},
    	{
    		"name":"Relocation Funds",
            "value":"RelocationFunds",
	        "disabled":false
    	},
    	{
    		"name":"Sweat Equity",
            "value":"SweatEquity",
	        "disabled":false
    	},
    	{
    		"name":"Trade Equity",
            "value":"TradeEquity",
	        "disabled":false
    	}
    ];	

    this.sectionNadjustmentTypes = [
        {
    		"name":"Other",
            "value":"Other",
	        "disabled":false
    	},
		{
    		"name":"Repair Completion Escrow Holdback",
            "value":"RepairCompletionEscrowHoldback",
	        "disabled":false
    	},
		{
    		"name":"Tenant Security Deposit",
            "value":"TenantSecurityDeposit",
	        "disabled":false
    	},
    	{
    		"name":"Trade Equity",
            "value":"TradeEquity",
	        "disabled":false
    	},
		{
    		"name":"Unpaid Utility Escrow Holdback",
            "value":"UnpaidUtilityEscrowHoldback",
	        "disabled":false
    	}
    ];
    this.prorationItemTypes=[
	    {
		    "name": "Borough Property Tax",
		    "value": "BoroughPropertyTax",
		    'disabled': false
		},
		{
		    "name": "City Property Tax",
		    "value": "CityPropertyTax",
		    'disabled': false
		},
		{
		    "name": "County Property Tax",
		    "value": "CountyPropertyTax",
		    'disabled': false
		},
		{
		    "name": "Condominium Association Dues",
		    "value": "CondominiumAssociationDues",
		    'disabled': false
		},
		{
		    "name": "Condominium Association Special Assessment",
		    "value": "CondominiumAssociationSpecialAssessment",
		    'disabled': false
		},
		{
		    "name": "Cooperative Association Dues",
		    "value": "CooperativeAssociationDues",
		    'disabled': false
		},
		{
		    "name": "Cooperative Association Special Assessment",
		    "value": "CooperativeAssociationSpecialAssessment",
		    'disabled': false
		},
		{
		    "name": "District Property Tax",
		    "value": "DistrictPropertyTax",
		    'disabled': false
		},
		{
		    "name": "Earthquake Insurance Premium",
		    "value": "EarthquakeInsurancePremium",
		    'disabled': false
		},
		{
		    "name": "Flood Insurance Premium",
		    "value": "FloodInsurancePremium",
		    'disabled': false
		},
		{
		    "name": "Ground Rent",
		    "value": "GroundRent",
		    'disabled': false
		},
		{
		    "name": "Hail Insurance Premium",
		    "value": "HailInsurancePremium",
		    'disabled': false
		},
		{
		    "name": "Hazard Insurance Premium",
		    "value": "HazardInsurancePremium",
		    'disabled': false
		},
		{
		    "name": "Homeowners Association Dues",
		    "value": "HomeownersAssociationDues",
		    'disabled': false
		},
		{
		    "name": "Homeowners Association Special Assessment",
		    "value": "HomeownersAssociationSpecialAssessment",
		    'disabled': false
		},
		{
		    "name": "Homeowners Insurance Premium",
		    "value": "HomeownersInsurancePremium",
		    'disabled': false
		},
		{
		    "name": "Interest On Loan Assumption",
		    "value": "InterestOnLoanAssumption",
		    'disabled': false
		},
		{
		    "name": "Mortgage Insurance Premium",
		    "value": "MortgageInsurancePremium",
		    'disabled': false
		},
		{
		    "name": "Other",
		    "value": "Other",
		    'disabled': false
		},
		{
		    "name": "Past Due Property Tax",
		    "value": "PastDuePropertyTax",
		    'disabled': false
		},
		{
		    "name": "Rent From Subject Property",
		    "value": "RentFromSubjectProperty",
		    'disabled': false
		},
		{
		    "name": "State Property Tax",
		    "value": "StatePropertyTax",
		    'disabled': false
		},
		{
		    "name": "Town Property Tax",
		    "value": "TownPropertyTax",
		    'disabled': false
		},
		{
		    "name": "Utilities",
		    "value": "Utilities",
		    'disabled': false
		},
		{
		    "name": "Volcano Insurance Premium",
		    "value": "VolcanoInsurancePremium",
		    'disabled': false
		},
		{
		    "name": "Wind And Storm Insurance Premium",
		    "value": "WindAndStormInsurancePremium",
		    'disabled': false
		}
    ];
    this.prorationItemAssesmentTypes=[
    	{
		    "name": "Condominium Association Special Assessment",
		    "value": "CondominiumAssociationSpecialAssessment",
		    'disabled': false
		},
		{
		    "name": "Cooperative Association Special Assessment",
		    "value": "CooperativeAssociationSpecialAssessment",
		    'disabled': false
		},
		{
		    "name": "Homeowners Association Special Assessment",
		    "value": "HomeownersAssociationSpecialAssessment",
		    'disabled': false
		},
		{
		    "name": "Other",
		    "value": "Other",
		    'disabled': false
		}
    ];

	this.subordinateLiens = [ 
		{ 
			"name" : "Other",
			"value": "Other",  
			'disabled': false
		},
		{
			"name" : "Proceeds Of Subordinate Liens",
			"value":"ProceedsOfSubordinateLiens",  
			'disabled': false
		}
	];

	this.otherCredits = [ 
		{ 
			"name" : "Other",
			"value": "Other"  
		},
		{
			"name" : "Gift",
			"value":"Gift"
		},
		{
			"name" : "Grant",
			"value":"Grant"
		},
	    {
			"name" : "Rebate Credit",
			"value":"RebateCredit"
		}
	];

    this.payeeTypes = [
        {
        	"name":"Individual",
        	"value":"Individual"
        },
        {
        	"name":"Organization",
        	"value":"Organization"
        }
    ];

    this.liabilityadjustments = [
    	{
    		"name":"Borrower Estimated Total Monthly Liability Payment",
	        "value":"BorrowerEstimatedTotalMonthlyLiabilityPayment",
	        "disabled":false,
			"type":"liability"
    	},
    	{
    		"name":"Collections Judgments And Liens",
	        "value":"CollectionsJudgmentsAndLiens",
	        "disabled":false,
			"type":"liability"
    	},
    	{
    		"name":"Deferred Student Loan",
	        "value":"DeferredStudentLoan",
	        "disabled":false,
			"type":"liability"
    	},
    	{
    		"name":"Delinquent Taxes",
	        "value":"DelinquentTaxes",
	        "disabled":false,
			"type":"liability"
    	},
    	{
    		"name":"First Position Mortgage Lien",
	        "value":"FirstPositionMortgageLien",
	        "disabled":false,
			"type":"liability"
    	},
    	{
    		"name":"Garnishments",
	        "value":"Garnishments",
	        "disabled":false,
			"type":"liability"
    	},
    	{
    		"name":"HELOC",
	        "value":"HELOC",
	        "disabled":false,
			"type":"liability"
    	},
    	{
    		"name":"Homeowners Association Lien",
	        "value":"HomeownersAssociationLien",
	        "disabled":false,
			"type":"liability"
    	},
    	{
    		"name":"Installment",
	        "value":"Installment",
	        "disabled":false,
			"type":"liability"
    	},
    	{
    		"name":"Lease Payment",
	        "value":"LeasePayment",
	        "disabled":false,
			"type":"liability"
    	},
    	{
    		"name":"Mortgage Loan",
	        "value":"MortgageLoan",
	        "disabled":false,
			"type":"liability"
    	},
    	{
    		"name":"Open 30Day Charge Account",
	        "value":"Open30DayChargeAccount",
	        "disabled":false,
			"type":"liability"
    	},
    	{
    		"name":"Other",
	        "value":"Other",
	        "disabled":false,
			"type":"liability"
    	},
    	{
    		"name":"Personal Loan",
	        "value":"PersonalLoan",
	        "disabled":false,
			"type":"liability"
    	},
    	{
    		"name":"Revolving",
	        "value":"Revolving",
	        "disabled":false,
			"type":"liability"
    	},
    	{
    		"name":"Second Position Mortgage Lien",
	        "value":"SecondPositionMortgageLien",
	        "disabled":false,
			"type":"liability"
    	},
    	{
    		"name":"Taxes",
	        "value":"Taxes",
	        "disabled":false,
			"type":"liability"
    	},
    	{
    		"name":"Tax Lien",
	        "value":"TaxLien",
	        "disabled":false,
			"type":"liability"
    	},
    	{
    		"name":"Third Position Mortgage Lien",
	        "value":"ThirdPositionMortgageLien",
	        "disabled":false,
			"type":"liability"
    	},
    	{
    		"name":"Unsecured Home Improvement Loan Installment",
	        "value":"UnsecuredHomeImprovementLoanInstallment",
	        "disabled":false,
			"type":"liability"
    	},
    	{
    		"name":"Unsecured Home Improvement Loan Revolving",
	        "value":"UnsecuredHomeImprovementLoanRevolving",
	        "disabled":false,
			"type":"liability"
    	},
        {
    		"name":"Fuel Costs",
            "value":"FuelCosts",
	        "disabled":false,
			"type":"adjustment"
    	},
    	{
    		"name":"Other",
            "value":"Other",
	        "disabled":false,
			"type":"adjustment"
    	},
    	{
    		"name":"Repairs",
            "value":"Repairs",
	        "disabled":false,
			"type":"adjustment"
    	},
    	{
    		"name":"Sellers Escrow Assumption",
            "value":"SellersEscrowAssumption",
	        "disabled":false,
			"type":"adjustment"
    	},
    	{
    		"name":"Sellers Mortgage Insurance Assumption",
            "value":"SellersMortgageInsuranceAssumption",
	        "disabled":false,
			"type":"adjustment"
    	},
    	{
    		"name":"Tenant Security Deposit",
            "value":"TenantSecurityDeposit",
	        "disabled":false,
			"type":"adjustment"
    	},
    	{
    		"name":"Seller Credit",
            "value":"SellerCredit",
	        "disabled":false,
			"type":"adjustment"
    	},
    	{
    		"name":"Gift",
            "value":"Gift",
	        "disabled":false,
			"type":"adjustment"
    	},
    	{
    		"name":"Grant",
            "value":"Grant",
	        "disabled":false,
			"type":"adjustment"
    	},
    	{
    		"name":"Rebate Credit",
            "value":"RebateCredit",
	        "disabled":false,
			"type":"adjustment"
    	},
    	{
    		"name":"Unpaid Utility Escrow Holdback",
            "value":"UnpaidUtilityEscrowHoldback",
	        "disabled":false,
			"type":"adjustment"
    	},
    	{
    		"name":"Trade Equity",
            "value":"TradeEquity",
	        "disabled":false,
			"type":"adjustment"
    	},
    	{
    		"name":"Sweat Equity",
            "value":"SweatEquity",
	        "disabled":false,
			"type":"adjustment"
    	},
    	{
    		"name":"Repair Completion Escrow Holdback",
            "value":"RepairCompletionEscrowHoldback",
	        "disabled":false,
			"type":"adjustment"
    	},
    	{
    		"name":"Relocation Funds",
            "value":"RelocationFunds",
	        "disabled":false,
			"type":"adjustment"
    	}
    ];

    this.liabilityOrAdjustments = [
        {
        	"name":"Liability",
        	"value":"Liability",
        	"disabled":false,
        },
        {
        	"name":"Adjustment",
        	"value":"Adjustment",
        	"disabled":false,
        }
    ];

    this.indexTypes = [
	    {
	     	"name":"Bank Prime Loan",
	        "value":"BankPrimeLoan"
	    },
	    {
	     	"name":"Certificate Of DepositIndex",
	        "value":"CertificateOfDepositIndex"
	    },
	    {
	     	"name":"Constant Maturity Treasury",
	        "value":"ConstantMaturityTreasury"
	    },
	    {
	     	"name":"Cost Of Savings Index",
	        "value":"CostOfSavingsIndex"
	    },
	    {
	     	"name":"Eleventh District Cost Of Funds Index",
	        "value":"EleventhDistrictCostOfFundsIndex"
	    },
	    {
	     	"name":"Twelve Month Treasury Average",
	        "value":"TwelveMonthTreasuryAverage"
	    },
	    {
	     	"name":"Treasury Bill",
	        "value":"TreasuryBill"
	    },
	    {
	     	"name":"Other",
	        "value":"Other"
	    },
	    {
	     	"name":"LIBOR",
	        "value":"LIBOR"
	    }
    ];

    this.lateChargeTypes = [
		{
		   "name":"Flat Dollar Amount",
		   "value":"FlatDollarAmount"
		},
		{
		   "name":"No Late Charges",
		   "value":"NoLateCharges"
		},
		{
		   "name":"Percentage Of Delinquent Interest",
		   "value":"PercentageOfDelinquentInterest"
		},
		{
		   "name":"Percentage Of Net Payment",
		   "value":"PercentageOfNetPayment"
		},
		{
		   "name":"Percentage Of Principal Balance",
		   "value":"PercentageOfPrincipalBalance"
		},
		{
		   "name":"Percentage Of Total Payment",
		   "value":"PercentageOfTotalPayment"
		},
		{
		   "name":"Percent Of Principal And Interest",
		   "value":"PercentOfPrincipalAndInterest"
		}
	];

	this.partialPaymentTypes = [
        {
            "name":"Apply Partial Payment",
            "value":"ApplyPartialPayment" 
        },
        {
            "name":"Hold Until Complete Amount",
            "value":"HoldUntilCompleteAmount" 
        },
        {
            "name":"Other",
            "value":"Other" 
        }
	];

	this.escrowAbsenceReasons =[
        {
        	"name":"Borrower Declined",
        	"value":"BorrowerDeclined"
        },
        {
        	"name":"Lender Does Not Offer",
        	"value":"LenderDoesNotOffer"
        }
	];
    
    this.paymentFrequencyTypes = [
        {
        	"name":"Annual",
        	"value":"Annual"
        },
        {
        	"name":"At Maturity",
        	"value":"AtMaturity"
        },
        {
        	"name":"Biweekly",
        	"value":"Biweekly"
        },
        {
        	"name":"Monthly",
        	"value":"Monthly"
        },
        {
        	"name":"Quarterly",
        	"value":"Quarterly"
        },
        {
        	"name":"Semiannual",
        	"value":"Semiannual"
        },
        {
        	"name":"Semimonthly",
        	"value":"Semimonthly"
        },
        {
            "name":"Weekly",
        	"value":"Weekly" 
        }
    ];

    this.loanMaturityPeriodTypes = [
        {
        	"name":"Month",
        	"value":"Month"
        },
        {
         	"name":"Year",
         	"value":"Year"
        }
    ];

    this.stateProperty = [
		{
		"state":"AL",
		"flag":"NO",
		"value":false
		},
		{
		"state":"AK",
		"flag":"YES",
		"value":true
		},
		{
		"state":"AZ",
		"flag":"YES",
		"value":true
		},
		{
		"state":"AR",
		"flag":"YES",
		"value":true
		},
		{
		"state":"CA",
		"flag":"YES",
		"value":true
		},
		{
		"state":"CO",
		"flag":"YES",
		"value":true
		},
		{
		"state":"CT",
		"flag":"YES",
		"value":true
		},
		{
		"state":"DC",
		"flag":"NO",
		"value":false 
		},
		{
		"state":"DE",
		"flag":"NO",
		"value":false 
		},
		{
		"state":"FL",
		"flag":"YES",
		"value":true
		},
		{
		"state":"GA",
		"flag":"YES",
		"value":true
		},
		{
		"state":"HI",
		"flag":"YES",
		"value":true
		},
		{
		"state":"ID",
		"flag":"YES",
		"value":true
		},
		{
		"state":"IL",
		"flag":"YES",
		"value":true
		},
		{
		"state":"IN",
		"flag":"NO",
		"value":false 
		},
		{
		"state":"IA",
		"flag":"YES",
		"value":true
		},
		{
		"state":"KS",
		"flag":"YES",
		"value":true
		},
		{
		"state":"KY",
		"flag":"NO",
		"value":false 
		},
		{
		"state":"LA",
		"flag":"YES",
		"value":true
		},
		{
		"state":"ME",
		"flag":"YES",
		"value":true
		},
		{
		"state":"MD",
		"flag":"NO",
		"value":false 
		},
		{
		"state":"MA",
		"flag":"YES",
		"value":true
		},
		{
		"state":"MI",
		"flag":"NO",
		"value":false 
		},
		{
		"state":"MN",
		"flag":"YES",
		"value":true
		},
		{
		"state":"MS",
		"flag":"NO",
		"value":false 
		},
		{
		"state":"MO",
		"flag":"NO",
		"value":false 
		},
		{
		"state":"MT",
		"flag":"YES",
		"value":true
		},
		{
		"state":"NE",
		"flag":"YES",
		"value":true
		},
		{
		"state":"NV",
		"flag":"YES",
		"value":true
		},
		{
		"state":"NH",
		"flag":"NO",
		"value":false 
		},
		{
		"state":"NJ",
		"flag":"YES",
		"value":true
		},
		{
		"state":"NM",
		"flag":"YES",
		"value":true
		},
		{
		"state":"NY",
		"flag":"YES",
		"value":true
		},
		{
		"state":"NC",
		"flag":"YES",
		"value":true
		},
		{
		"state":"ND",
		"flag":"YES",
		"value":true
		},
		{
		"state":"OH",
		"flag":"YES",
		"value":true
		},
		{
		"state":"OK",
		"flag":"YES",
		"value":true
		},
		{
		"state":"OR",
		"flag":"YES",
		"value":true
		},
		{
		"state":"PA",
		"flag":"YES",
		"value":true
		},
		{
		"state":"RI",
		"flag":"NO",
		"value":false 
		},
		{
		"state":"SC",
		"flag":"YES",
		"value":true
		},
		{
		"state":"SD",
		"flag":"YES",
		"value":true
		},
		{
		"state":"TN",
		"flag":"YES",
		"value":true
		},
		{
		"state":"TX",
		"flag":"YES",
		"value":true
		},
		{
		"state":"UT",
		"flag":"YES",
		"value":true
		},
		{
		"state":"VT",
		"flag":"YES",
		"value":true
		},
		{
		"state":"VA",
		"flag":"NO",
		"value":false 
		},
		{
		"state":"WA",
		"flag":"YES",
		"value":true
		},
		{
		"state":"WV",
		"flag":"NO",
		"value":false 
		},
		{
		"state":"WI",
		"flag":"YES",
		"value":true
		},
		{
		"state":"WY",
		"flag":"NO",
		"value":false 
		}
    ];

this.cdformdata={
		"closingDisclosureDocDetails":
	    {
	        "transactionType": null,
	        "documentType": "",
	        "formType": "",
	        "escrowAggregateAccountingAdjustmentAmount": "",
	        "escrowAggregateAccountingAdjustmentAmountSellerPaid":"",
	        "escrowAggregateAccountingAdjustmentAmountOthersPaid":""
	    },
		"loanDetail": {
		    "assumabilityIndicator": false,
		    "balloonIndicator": false,
		    "balloonPaymentAmount": "",
		    "buydownTemporarySubsidyFundingIndicator": false,
		    "constructionLoanIndicator": false,
		    "creditorServicingOfLoanStatementType": "",
		    "demandFeatureIndicator": false,
		    "escrowAbsenceReasonType": "",
		    "escrowIndicator": false,
		    "interestOnlyIndicator": false,
		    "interestRateIncreaseIndicator": false,
		    "loanAmountIncreaseIndicator": false,
		    "miRequiredIndicator": false,
		    "negativeAmortizationIndicator": false,
		    "paymentIncreaseIndicator": false,
		    "prepaymentPenaltyIndicator": false,
		    "seasonalPaymentFeatureIndicator": false,
		    "stepPaymentsFeatureDescription": "",
		    "totalSubordinateFinancingAmount": "",
		    "subordinateFinancingIsNewIndicator":false
		},
		"termsOfLoan": {
		    "assumedLoanAmount": "",
		    "disclosedFullyIndexedRatePercent": "",
		    "lienPriorityType": "FirstLien",
		    "loanPurposeType": "",
		    "mortgageType": "Conventional",
		    "mortgageTypeOtherDescription": "",
		    "noteAmount": "",
		    "noteRatePercent": "",
		    "weightedAverageInterestRatePercent": ""
		},
		"documentClassification": {
		    "documentType": "",
		    "documentTypeOtherDescription": "",
		    "documentFormIssuingEntityNameType": "",
		    "documentFormIssuingEntityVersionIdentifier": "",
		    "documentSignatureRequiredIndicator": false
		},
		"closingInformation": {
		    "dateIssued": "",
		    "property": {
		      "addressLineText": "",
		      "addressType": "",
		      "addressUnitDesignatorType": "",
		      "addressUnitIdentifier": "",
		      "cityName": "",
		      "countryCode": "",
		      "postalCode": "",
		      "stateCode": "",
		      "unparsedLegalDescription": "",
		      "legalDescription": false
		    },
		    "salePrice": "",
		    "partyRoleType": "",
		    "propertyValuationDetail": {
		    	"appraisalIdentifier":"",
		    	"identifierOwnerURI": "",
		      	"propertyEstimatedValueAmount": "",
		      	"propertyValuationAmount": "",
		      	"propertyValuationMethodType": "AutomatedValuationModel",
		      	"propertyValuationMethodTypeOtherDescription": "",
		      	"propertyValue": "Appraised"
		    }
		},
		"closingInformationDetail": {
		    "cashFromBorrowerAtClosingAmount": "",
		    "cashFromSellerAtClosingAmount": "",
		    "cashToBorrowerAtClosingAmount": "",
		    "cashToSellerAtClosingAmount": "",
		    "closingAgentOrderNumberIdentifier": "",
		    "closingDate": "",
		    "closingRateSetDate": "",
		    "currentRateSetDate": "",
		    "disbursementDate": "",
		    "documentOrderClassificationType": ""
		},
		"construction": {
		    "constructionLoanTotalTermMonthsCount": "",
		    "constructionLoanType": "",
		    "constructionPeriodNumberOfMonthsCount": ""
		},
		"miDataDetail": {
		    "miCertificateIdentifier": "",
		    "miCompanyNameType": "",
		    "miCompanyNameTypeOtherDescription": "",
		    "miScheduledTerminationDate": "",
		    "miInitialPremiumAmount": ""
		},
		"transactionInformation": {
			"refinanceSameLenderIndicator" : null,
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
					"addressType": "Mailing",
					"addressUnitDesignatorType": "",
					"addressUnitIdentifier": "",
					"cityName": "",
					"countryCode": "",
					"postalCode": "",
					"stateCode": "",
					"unparsedLegalDescription": "",
                    "legalDescription": false
				}
			}
			],
			"sellerDetails": [{
				"type": "I",
				"nameModel": {
					"firstName": "",
					"lastName": "",
					"middleName": "",
					"suffixName": "",
					"fullName": ""
				},
				"partyRoleType": "PropertySeller",
				"partyRoleOtherDescription": "",
				"address": {
					"addressLineText": "",
					"addressType": "Mailing",
					"addressUnitDesignatorType": "",
					"addressUnitIdentifier": "",
					"cityName": "",
					"countryCode": "",
					"postalCode": "",
					"stateCode": "",
					"unparsedLegalDescription": "",
                    "legalDescription": false
				}
			}],
			"lenderDetails": [{
				"type": "O",
				"nameModel": {
					"firstName": "",
					"lastName": "",
					"middleName": "",
					"suffixName": "",
					"fullName": "",
					"refinanceSameLender" : true
				},
				"partyRoleType": "NotePayTo",
				"partyRoleOtherDescription": "",
				"address": {
					"addressLineText": "",
					"addressType": "Mailing",
					"addressUnitDesignatorType": "",
					"addressUnitIdentifier": "",
					"cityName": "",
					"countryCode": "",
					"postalCode": "",
					"stateCode": "",
					"unparsedLegalDescription": "",
                    "legalDescription": false
				}
			}
		  ]
		},
       "loanInformation": {
		    "amortizationType": "Fixed",
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
		    "automatedUnderwritings": [
		      {
		        "automatedUnderwritingCaseIdentifier": "",
		        "automatedUnderwritingSystemType": "",
		        "automatedUnderwritingSystemTypeOtherDescription": ""
		      }
		    ],
		    "loanManualUnderwritingIndicator": false
		},
		"salesContractDetail": {
		    "personalPropertyIndicator": null,
		    "personalPropertyAmount": "",
		    "realPropertyAmount": "",
		    "saleContractAmount": ""
		},
		"integratedDisclosureDetail": {
		    "firstYearTotalEscrowPaymentAmount": "",
		    "firstYearTotalEscrowPaymentDescription": "",
		    "firstYearTotalNonEscrowPaymentAmount": "",
		    "firstYearTotalNonEscrowPaymentDescription": "",
		    "integratedDisclosureHomeEquityLoanIndicator": false,
		    "integratedDisclosureIssuedDate": "",
		    "integratedDisclosureLoanProductDescription": ""
		},
		"negativeAmortization": {
		    "negativeAmortizationLimitMonthsCount": "",
		    "negativeAmortizationMaximumLoanBalanceAmount": "",
		    "negativeAmortizationType": ""
		},
		"interestOnly": {
		    "interestOnlyTermMonthsCount": ""
		},
		"maturityRule": {
		    "loanMaturityPeriodCount": "",
		    "loanMaturityPeriodType": "Month",
		    "loanTermMaximumMonthsCount": ""
		},
		"loanProduct": {
		    "loanPriceQuoteInterestRatePercent": ""
		},
		"loanTerms": {
		    "prepaymentPenalty": {
		      "prepaymentPenaltyMaximumLifeOfLoanAmount": "",
		      "prepaymentPenaltyExpirationMonthsCount": ""
		    },
		    "temporaryBuydown": {
		      "buydownInitialEffectiveInterestRatePercent": "",
		      "gseBuydownReflectedInNoteIndicator": null,
		      "rateAfterBuydownApplied": "",
		      "buydownChangeFrequencyMonthsCount": "",
		      "totalNumberOfMonths": "",
		      "buydownIncreaseRatePercent": ""
		    }
		},
		"projectedPayments":
	    {
	        "paymentFrequencyType": "Monthly",
	        "miMonthsDuration": "",
	        "miPaymentAmount":"",
	        "paymentCalculation":
	        [
	            {
	                "sequenceNumber": "",
	                "projectedPaymentCalculationPeriodEndNumber": "",
	                "projectedPaymentCalculationPeriodStartNumber": "",
	                "projectedPaymentCalculationPeriodTermType": "",
	                "projectedPaymentCalculationPeriodTermTypeOtherDescription": ""
	            }
	        ],
	        "principalInterest":
	        [
	            {
	                "projectedPaymentPrincipalAndInterestMaximumPaymentAmount": "",
	                "projectedPaymentPrincipalAndInterestMinimumPaymentAmount": "",
	                "interestOnlyStatus": false
	            }
	        ],
	        "mortgageInsurance":
	        [
	            {
	                "projectedPaymentMIPaymentAmount": ""
	            }
	        ],
	        "estimatedEscrow":
	        [
	            {
	                "projectedPaymentEstimatedEscrowPaymentAmount": ""
	            }
	        ],
	        "estimatedTotal":
	        [
	            {
	                "projectedPaymentEstimatedTotalMaximumPaymentAmount": "",
	                "projectedPaymentEstimatedTotalMinimumPaymentAmount": ""
	            }
	        ]
	    },
	    "etiaSection":
	    {   
	    	"displayLabel":"",
	    	"escrowTypes":
	        [
	        ],
	        "projectedPaymentEstimatedTaxesInsuranceAssessmentTotalAmount": "",
	        "etiaValues":
	        [
	            {
	                "projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType": "",
	                "projectedPaymentEstimatedTaxesInsuranceAssessmentComponentTypeOtherDescription": "",
	                "projectedPaymentEscrowedType": ""
	            }
	        ]
	    },
	    "closingCostDetailsLoanCosts":
	    {
	        "ocTotalAmount": "",
	        "sbDidNotShopTotalAmount": "",
	        "sbDidShopTotalAmount": "",
	        "tlCostsTotalAmount": "",
	        "originationCharges":
	        [
	            {
	                "bpAtClosing": "",
	                "bpB4Closing": "",
	                "spAtClosing": "",
	                "spB4Closing": "",
	                "paidByOthers": "",
	                "lenderStatus": false,
	                "displayLabel": "",
	                "gseDisplayLabel": "",
	                "feeEstimatedTotalAmount":"",
	                "feePaidToFullName": "",
	                "feeActualTotalAmount": "",
	                "feePaidToType": "Lender",
	                "feePaidToTypeOtherDescription": "",
	                "feePercentBasisType": "",
	                "feeTotalPercent": "",
	                "feeType": "",
	                "feeTypeOtherDescription": "",
	                "integratedDisclosureSectionType": "OriginationCharges",
	                "optionalCostIndicator": null,
	                "regulationZPointsAndFeesIndicator": true,
	                "paymentIncludedInAPRIndicator": true
	            }
	        ],
	        "sbDidNotShopFors":
	        [
	            {
	                "bpAtClosing": "",
	                "bpB4Closing": "",
	                "spAtClosing": "",
	                "spB4Closing": "",
	                "paidByOthers": "",
	                "lenderStatus": false,
	                "displayLabel": "",
	                "gseDisplayLabel": "",
	                "feeEstimatedTotalAmount":"",
	                "feePaidToFullName": "",
	                "feeActualTotalAmount": "",
	                "feePaidToType": "ThirdPartyProvider",
	                "feePaidToTypeOtherDescription": "",
	                "feePercentBasisType": "",
	                "feeTotalPercent": "",
	                "feeType": "",
	                "feeTypeOtherDescription": "",
	                "integratedDisclosureSectionType": "ServicesBorrowerDidNotShopFor",
	                "optionalCostIndicator": null,
	                "regulationZPointsAndFeesIndicator": true,
	                "paymentIncludedInAPRIndicator": true
	            }
	        ],
	        "sbDidShopFors":
	        [
	            {
	                "bpAtClosing": "",
	                "bpB4Closing": "",
	                "spAtClosing": "",
	                "spB4Closing": "",
	                "paidByOthers": "",
	                "lenderStatus": false,
	                "displayLabel": "",
	                "gseDisplayLabel": "",
	                "feeEstimatedTotalAmount":"",
	                "feePaidToFullName": "",
	                "feeActualTotalAmount": "",
	                "feePaidToType": "ThirdPartyProvider",
	                "feePaidToTypeOtherDescription": "",
	                "feePercentBasisType": "",
	                "feeTotalPercent": "",
	                "feeType": "",
	                "feeTypeOtherDescription": "",
	                "integratedDisclosureSectionType": "ServicesBorrowerDidShopFor",
	                "optionalCostIndicator": null,
	                "regulationZPointsAndFeesIndicator": false,
	                "paymentIncludedInAPRIndicator": false
	            }
	        ],
	        "tlCosts":
	        {
	            "bpAtClosing": "",
	            "bpB4Closing": "",
	            "spAtClosing": "",
	            "spB4Closing": "",
	            "paidByOthers": "",
	            "lenderStatus": false
	        }
	    },
	    "closingCostDetailsOtherCosts":
	    {
	        "tOGovtFeesTotalAmount": "",
	        "prepaidsTotalAmount": "",
	        "escrowItemsTotalAmount": "",
	        "otherTotalAmount": "",
	        "totalOtherCostsTotalAmount": "",
	        "totalOtherCosts":
	        {
	            "bpAtClosing": "",
	            "bpB4Closing": "",
	            "spAtClosing": "",
	            "spB4Closing": "",
	            "paidByOthers": "",
	            "lenderStatus": false
	        },
	        "tOGovtFeesList":
	        [
	            {
	                "bpAtClosing": "",
	                "bpB4Closing": "",
	                "spAtClosing": "",
	                "spB4Closing": "",
	                "paidByOthers": "",
	                "lenderStatus": false,
	                "displayLabel": "",
	                "gseDisplayLabel": "",
	                "feeEstimatedTotalAmount":"",
	                "feePaidToFullName": "",
	                "feeActualTotalAmount": "",
	                "feePaidToType": "ThirdPartyProvider",
	                "feePaidToTypeOtherDescription": "",
	                "feePercentBasisType": "",
	                "feeTotalPercent": "",
	                "feeType": "",
	                "feeTypeOtherDescription": "",
	                "integratedDisclosureSectionType": "TaxesAndOtherGovernmentFees",
	                "optionalCostIndicator": null,
	                "regulationZPointsAndFeesIndicator": null,
	                "paymentIncludedInAPRIndicator": false
	            }
	        ],
	        "prepaidsList":
	        [
	            {
	                "bpAtClosing": "",
	                "bpB4Closing": "",
	                "spAtClosing": "",
	                "spB4Closing": "",
	                "paidByOthers": "",
	                "lenderStatus": false,
	                "gseDisplayLabelText": "",
	                "displayLabelText": "",
	                "feePaidToType": "ThirdPartyProvider",
	                "feePaidToTypeOtherDescription": "",
	                "integratedDisclosureSectionType": "Prepaids",
	                "prepaidItemEstimatedTotalAmount":"",
	                "prepaidItemMonthsPaidCount": "",
	                "prepaidItemPaidFromDate": "",
	                "prepaidItemPaidThroughDate": "",
	                "prepaidItemPerDiemAmount": "",
	                "prepaidItemPerDiemCalculationMethodType": "",
	                "prepaidItemType": "",
	                "prepaidItemTypeOtherDescription": "",
	                "regulationZPointsAndFeesIndicator": false,
	                "paymentIncludedInAPRIndicator": false,
	                "prepaidPaidToFullName": ""
	            }
	        ],
	        "escrowItemsList":
	        [
	            {
	               	"bpAtClosing": "",
			        "bpB4Closing": "",
			        "spAtClosing": "",
			        "spB4Closing": "",
			        "paidByOthers": "",
			        "lenderStatus": false,
			        "displayLabel": "",
			        "escrowCollectedNumberOfMonthsCount": "",
			        "escrowItemEstimatedTotalAmount":"",
			        "escrowItemType": "",
			        "escrowItemTypeOtherDescription": "",
			        "escrowMonthlyPaymentAmount": "",
			        "feePaidToType": "ThirdPartyProvider",
			        "feePaidToTypeOtherDescription": "",
			        "integratedDisclosureSectionType": "InitialEscrowPaymentAtClosing",
			        "regulationZPointsAndFeesIndicator": false,
			        "paymentIncludedInAPRIndicator": false
	            }
	        ],
	        "otherCostsList":
	        [
	            {
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
	                "feeEstimatedTotalAmount":"",
	                "feePaidToType": "ThirdPartyProvider",
	                "feePaidToTypeOtherDescription": "",
	                "feePercentBasisType": "",
	                "feeTotalPercent": "",
	                "feeType": "",
	                "feeTypeOtherDescription": "",
	                "integratedDisclosureSectionType": "OtherCosts",
	                "optionalCostIndicator": false,
	                "regulationZPointsAndFeesIndicator": false,
	                "paymentIncludedInAPRIndicator": false
	            }
	        ]
	    },
	    "closingCostsTotal": {
		    "totalClosingCosts": "",
		    "closingCostsSubtotal": {
		      "bpAtClosing": "",
		      "bpB4Closing": "",
		      "spAtClosing": "",
		      "spB4Closing": "",
		      "paidByOthers": "",
		      "lenderStatus": false
		    },
		    "lenderCredits": "",
		    "lenderCreditToleranceCureAmount": ""
	  },
	  "cashToCloses":
    {
        "loanAmount":
        {
            "integratedDisclosureCashToCloseItemAmountChangedIndicator": false,
            "integratedDisclosureCashToCloseItemChangeDescription": "",
            "integratedDisclosureCashToCloseItemEstimatedAmount": "",
            "integratedDisclosureCashToCloseItemFinalAmount": "",
            "integratedDisclosureCashToCloseItemPaymentType": "",
            "integratedDisclosureCashToCloseItemType": "LoanAmount",
            "index": ""
        },
        "totalClosingCosts":
        {
            "integratedDisclosureCashToCloseItemAmountChangedIndicator": false,
            "integratedDisclosureCashToCloseItemChangeDescription": "",
            "integratedDisclosureCashToCloseItemEstimatedAmount": "",
            "integratedDisclosureCashToCloseItemFinalAmount": "",
            "integratedDisclosureCashToCloseItemPaymentType": "",
            "integratedDisclosureCashToCloseItemType": "TotalClosingCosts",
            "index": ""
        },
        "closingCostsPaidBeforeClosing":
        {
            "integratedDisclosureCashToCloseItemAmountChangedIndicator": false,
            "integratedDisclosureCashToCloseItemChangeDescription": "",
            "integratedDisclosureCashToCloseItemEstimatedAmount": "",
            "integratedDisclosureCashToCloseItemFinalAmount": "",
            "integratedDisclosureCashToCloseItemPaymentType": "",
            "integratedDisclosureCashToCloseItemType": "ClosingCostsPaidBeforeClosing",
            "index": ""
        },
        "closingCostsFinanced":
        {
            "integratedDisclosureCashToCloseItemAmountChangedIndicator": false,
            "integratedDisclosureCashToCloseItemChangeDescription": "",
            "integratedDisclosureCashToCloseItemEstimatedAmount": "",
            "integratedDisclosureCashToCloseItemFinalAmount": "",
            "integratedDisclosureCashToCloseItemPaymentType": "",
            "integratedDisclosureCashToCloseItemType": "ClosingCostsFinanced",
            "index": ""
        },
        "downPayment":
        {
            "integratedDisclosureCashToCloseItemAmountChangedIndicator": false,
            "integratedDisclosureCashToCloseItemChangeDescription": "",
            "integratedDisclosureCashToCloseItemEstimatedAmount": "",
            "integratedDisclosureCashToCloseItemFinalAmount": "",
            "integratedDisclosureCashToCloseItemPaymentType": "",
            "integratedDisclosureCashToCloseItemType": "DownPayment",
            "index": ""
        },
        "totalPayoffsAndPayments": 
        {
            "integratedDisclosureCashToCloseItemAmountChangedIndicator": false,
            "integratedDisclosureCashToCloseItemChangeDescription": "",
            "integratedDisclosureCashToCloseItemEstimatedAmount": "",
            "integratedDisclosureCashToCloseItemFinalAmount": "",
            "integratedDisclosureCashToCloseItemPaymentType": "",
            "integratedDisclosureCashToCloseItemType": "TotalPayoffsAndPayments",
            "index": ""
        },
        "deposit":
        {
            "integratedDisclosureCashToCloseItemAmountChangedIndicator": false,
            "integratedDisclosureCashToCloseItemChangeDescription": "",
            "integratedDisclosureCashToCloseItemEstimatedAmount": "",
            "integratedDisclosureCashToCloseItemFinalAmount": "",
            "integratedDisclosureCashToCloseItemPaymentType": "",
            "integratedDisclosureCashToCloseItemType": "Deposit",
            "index": ""
        },
        "fundsForBorrower":
        {
            "integratedDisclosureCashToCloseItemAmountChangedIndicator": false,
            "integratedDisclosureCashToCloseItemChangeDescription": "",
            "integratedDisclosureCashToCloseItemEstimatedAmount": "",
            "integratedDisclosureCashToCloseItemFinalAmount": "",
            "integratedDisclosureCashToCloseItemPaymentType": "",
            "integratedDisclosureCashToCloseItemType": "FundsForBorrower",
            "index": ""
        },
        "sellerCredits":
        {
            "integratedDisclosureCashToCloseItemAmountChangedIndicator": false,
            "integratedDisclosureCashToCloseItemChangeDescription": "",
            "integratedDisclosureCashToCloseItemEstimatedAmount": "",
            "integratedDisclosureCashToCloseItemFinalAmount": "",
            "integratedDisclosureCashToCloseItemPaymentType": "",
            "integratedDisclosureCashToCloseItemType": "SellerCredits",
            "index": ""
        },
        "adjustmentsAndOtherCredits":
        {
            "integratedDisclosureCashToCloseItemAmountChangedIndicator": false,
            "integratedDisclosureCashToCloseItemChangeDescription": "",
            "integratedDisclosureCashToCloseItemEstimatedAmount": "",
            "integratedDisclosureCashToCloseItemFinalAmount": "",
            "integratedDisclosureCashToCloseItemPaymentType": "",
            "integratedDisclosureCashToCloseItemType": "AdjustmentsAndOtherCredits",
            "index": ""
        },
        "cashToCloseTotal":
        [
            {
                "integratedDisclosureCashToCloseItemAmountChangedIndicator": false,
                "integratedDisclosureCashToCloseItemChangeDescription": "",
                "integratedDisclosureCashToCloseItemEstimatedAmount": "",
                "integratedDisclosureCashToCloseItemFinalAmount": "",
                "integratedDisclosureCashToCloseItemPaymentType": "",
                "integratedDisclosureCashToCloseItemType": "CashToCloseTotal",
                "index": ""
            },
            {
                "integratedDisclosureCashToCloseItemAmountChangedIndicator": false,
                "integratedDisclosureCashToCloseItemChangeDescription": "",
                "integratedDisclosureCashToCloseItemEstimatedAmount": "",
                "integratedDisclosureCashToCloseItemFinalAmount": "",
                "integratedDisclosureCashToCloseItemPaymentType": "",
                "integratedDisclosureCashToCloseItemType": "CashToCloseTotal",
                "index": ""
            }
        ],
        "alternateView": false
    },
	"prorationsList" : [
	    {
	      "displayLabel": "",
 	      "integratedDisclosureSectionType": "",
 	      "integratedDisclosureSubsectionType": "",
 	      "prorationItemAmount": "",
 	      "prorationItemPaidFromDate": "",
 	      "prorationItemPaidThroughDate": "",
 	      "prorationItemType": "",
 	      "prorationItemTypeOtherDescription": ""
     	}
    ],
    "liabilityList":
    [
        {
            "displayLabel": "",
            "liabilityDescription": "",
            "liabilityType": "",
            "liabilityTypeOtherDescription": "",
            "integratedDisclosureSectionType": "",
            "liabilitySecuredBySubjectPropertyIndicator": false,
            "liabilityHolderFullName": "",
            "payoffAmount": "",
            "payoffPrepaymentPenaltyAmount": "",
            "payoffPartialIndicator":false
        }
	],
	"closingAdjustmentItemList":
    [
        {
            "displayLabel": "",
            "closingAdjustmentItemAmount": "",
            "closingAdjustmentItemPaidOutsideOfClosingIndicator": false,
            "closingAdjustmentItemType": "",
            "closingAdjustmentItemTypeOtherDescription": "",
            "integratedDisclosureSectionType": "",
            "integratedDisclosureSubsectionType": "Adjustments",
            "paidByIndividualFullName": "",
            "paidByEntityFullName": "",
            "paidToEntityFullName": ""
        }
    ],
	"closingCostFundList":
    [
        {
            "displayLabel": null,
            "closingCostFundAmount": "",
            "fundsType": "ExcessDeposit",
            "integratedDisclosureSectionType": "DueFromSellerAtClosing"
        },
        {
            "displayLabel": null,
            "closingCostFundAmount": "",
            "fundsType": "DepositOnSalesContract",
            "integratedDisclosureSectionType": "PaidAlreadyByOrOnBehalfOfBorrowerAtClosing"
        }
    ],
    "prorationList":
    [
        {
            "displayLabel": "City/Town Taxes",
            "integratedDisclosureSectionType": "DueFromBorrowerAtClosing",
            "integratedDisclosureSubsectionType": "AdjustmentsForItemsPaidBySellerInAdvance",
            "prorationItemAmount": "",
            "prorationItemPaidFromDate": "",
            "prorationItemPaidThroughDate": "",
            "prorationItemType": "CityPropertyTax",
            "prorationItemTypeOtherDescription": ""
        }
    ],
    "summariesofTransactions":
    {
        "borrowerTransaction": {
	      "dueFromBorrowerAtClosing": {
	        "integratedDisclosureSectionSummaryDetailModel": {
	          "integratedDisclosureSectionTotalAmount": "",
	          "integratedDisclosureSectionType": "DueFromBorrowerAtClosing",
	          "integratedDisclosureSubsectionTotalAmount": "",
	          "integratedDisclosureSubsectionType": "",
	          "integratedDisclosureSubsectionTypeOtherDescription": "",
	          "lenderCreditToleranceCureAmount": ""
	        },
	        "integratedDisclosureSubsectionPayments": []
	      },
	      "paidAlreadyByOrOnBehalfOfBorrowerAtClosing": {
	        "integratedDisclosureSectionSummaryDetailModel": {
	          "integratedDisclosureSectionTotalAmount": "",
	          "integratedDisclosureSectionType": "PaidAlreadyByOrOnBehalfOfBorrowerAtClosing",
	          "integratedDisclosureSubsectionTotalAmount": "",
	          "integratedDisclosureSubsectionType": "",
	          "integratedDisclosureSubsectionTypeOtherDescription": "",
	          "lenderCreditToleranceCureAmount": ""
	        },
	        "integratedDisclosureSubsectionPayments": []
	      }
	    },
	    "sellerTransaction": {
	      "toSellerAtClosing": {
	        "integratedDisclosureSectionSummaryDetailModel": {
	          "integratedDisclosureSectionTotalAmount": "",
	          "integratedDisclosureSectionType": "DueToSellerAtClosing",
	          "integratedDisclosureSubsectionTotalAmount": "",
	          "integratedDisclosureSubsectionType": "",
	          "integratedDisclosureSubsectionTypeOtherDescription": "",
	          "lenderCreditToleranceCureAmount": ""
	        },
	        "integratedDisclosureSubsectionPayments": []
	      },
	      "fromSellerAtClosing": {
	        "integratedDisclosureSectionSummaryDetailModel": {
	          "integratedDisclosureSectionTotalAmount": "",
	          "integratedDisclosureSectionType": "DueFromSellerAtClosing",
	          "integratedDisclosureSubsectionTotalAmount": "",
	          "integratedDisclosureSubsectionType": "",
	          "integratedDisclosureSubsectionTypeOtherDescription": "",
	          "lenderCreditToleranceCureAmount": ""
	        },
	        "integratedDisclosureSubsectionPayments": []
	      }
	    }
    },
	"payoffsAndPayments":
    {
        "integratedDisclosureSectionSummary": 
        {
            "integratedDisclosureSectionSummaryDetailModel":
            {
                "integratedDisclosureSectionTotalAmount": "",
                "integratedDisclosureSectionType": "",
                "integratedDisclosureSubsectionTotalAmount": "",
                "integratedDisclosureSubsectionType": "",
                "integratedDisclosureSubsectionTypeOtherDescription": "",
                "lenderCreditToleranceCureAmount": ""
            },
            "integratedDisclosureSubsectionPayments":
            [
                {
                    "integratedDisclosureSubsectionPaidByType": "",
                    "integratedDisclosureSubsectionPaymentAmount": "",
                    "integratedDisclosureSubsectionPaymentTimingType": ""
                }
            ]
        }
    },
    "interestRateAdjustment":
    {
        "indexType": "",
        "indexTypeOtherDescription": "",
        "ceilingRatePercent": "",
        "ceilingRatePercentEarliestEffectiveMonthsCount": "",
        "firstRateChangeMonthsCount": "",
        "floorRatePercent": "",
        "marginRatePercent": "",
        "totalStepCount": "",
        "firstAdjustmentRule": "",
        "subsequentAdjustmentRule": "",
        "firstPerChangeMaximumIncreaseRatePercent": "",
        "firstPerChangeRateAdjustmentFrequencyMonthsCount": "",
        "subsequentPerChangeMaximumIncreaseRatePercent": "",
        "subsequentPerChangeRateAdjustmentFrequencyMonthsCount": ""
    },
    "principalAndInterestPaymentAdjustment":
    {
        "firstPrincipalAndInterestPaymentChangeMonthsCount": "",
        "principalAndInterestPaymentMaximumAmount": "",
        "principalAndInterestPaymentMaximumAmountEarliestEffectiveMonthsCount": "",
        "firstAdjustmentRuleType": "",
        "firstPerChangeMaximumPrincipalAndInterestPaymentAmount": "",
        "firstPerChangeMinimumPrincipalAndInterestPaymentAmount": "",
        "firstPerChangePrincipalAndInterestPaymentAdjustmentFrequencyMonthsCount": "",
        "subsequentAdjustmentRuleType": "",
        "subsequentPerChangeMaximumPrincipalAndInterestPaymentAmount": "",
        "subsequentPerChangeMinimumPrincipalAndInterestPaymentAmount": "",
        "subsequentPerChangePrincipalAndInterestPaymentAdjustmentFrequencyMonthsCount": ""
    },
    "payment":
    {
        "partialPayments":
        {
            "partialPaymentModels":
            [
               {
               	'partialPaymentApplicationMethodType':'',
               	'partialPaymentApplicationMethodTypeOtherDescription':''
               }
            ]
        },
        "paymentRule":
        {
            "fullyIndexedInitialPrincipalAndInterestPaymentAmount": "",
            "initialPrincipalAndInterestPaymentAmount": "",
            "partialPaymentAllowedIndicator": false,
            "paymentFrequencyType": "Monthly",
            "paymentOptionIndicator": false,
            "seasonalPaymentPeriodEndMonth": "",
            "seasonalPaymentPeriodStartMonth": "",
            "totalOptionalPaymentCount": "",
            "totalStepPaymentCount": ""
        }
    },
    "lateChargeRule":
    {
        "lateChargeAmount": "",
        "lateChargeGracePeriodDaysCount": "",
        "lateChargeRatePercent": "",
        "lateChargeType": "PercentOfPrincipalAndInterest"
    },
    "loanCalculationsQualifiedMortgage":
    {
        "loanCalculationModel":
        {
            "aprPercent": "",
            "feeSummaryTotalAmountFinancedAmount": "",
            "feeSummaryTotalFinanceChargeAmount": "",
            "feeSummaryTotalInterestPercent": "",
            "feeSummaryTotalOfAllPaymentsAmount": "",
            "deficiencyRightsPreservedIndicator":false
        },
        "qualifiedMortgage":
        {
            "regulationZExcludedBonaFideDiscountPointsIndicator": false,
            "regulationZExcludedBonaFideDiscountPointsPercent": "",
            "regulationZTotalAffiliateFeesAmount": "",
            "regulationZTotalLoanAmount": "",
            "regulationZTotalPointsAndFeesAmount": "",
            "averagePrimeOfferRatePercent": "",
            "abilityToRepayMethodType":"",
            "abilityToRepayExemptionReasonType":""
        }
    },
    "contactInformation":
    {
        "lender":
        {
            "partyRoleType": "NotePayTo",
            "organizationName": "",
            "address":
            {
                "addressLineText": "",
                "addressType": "Mailing",
                "addressUnitDesignatorType": "",
                "addressUnitIdentifier": "",
                "cityName": "",
                "countryCode": "",
                "postalCode": "",
                "stateCode": "",
                "unparsedLegalDescription": "",
                "legalDescription": false
            },
            "organizationLicenseDetail":
            {
                "licenseAuthorityLevelType": "",
                "licenseIdentifier": "",
                "identifierOwnerURI": "mmousebanker@fed.org",
                "licenseIssueDate": "",
                "licenseIssuingAuthorityName": "",
                "licenseIssuingAuthorityStateCode": ""
            },
            "name":
            {
                "firstName": "",
                "lastName": "",
                "middleName": "",
                "suffixName": "",
                "fullName": ""
            },
            "individualLicenseDetail":
            {
                "licenseAuthorityLevelType": "",
                "licenseIdentifier": "",
                "identifierOwnerURI": "mmousebanker@fed.org",
                "licenseIssueDate": "",
                "licenseIssuingAuthorityName": "",
                "licenseIssuingAuthorityStateCode": ""
            },
            "individualEmail": "",
            "individualPhone": ""
        },
        "mortagageBroker":
        {
            "partyRoleType": "MortgageBroker",
            "organizationName": "",
            "address":
            {
                "addressLineText": "",
                "addressType": "Mailing",
                "addressUnitDesignatorType": "",
                "addressUnitIdentifier": "",
                "cityName": "",
                "countryCode": "",
                "postalCode": "",
                "stateCode": "",
                "unparsedLegalDescription": "",
                "legalDescription": false
            },
            "organizationLicenseDetail":
            {
                "licenseAuthorityLevelType": "",
                "licenseIdentifier": "",
                "identifierOwnerURI": "mmousebanker@fed.org",
                "licenseIssueDate": "",
                "licenseIssuingAuthorityName": "",
                "licenseIssuingAuthorityStateCode": ""
            },
            "name":
            {
                "firstName": "",
                "lastName": "",
                "middleName": "",
                "suffixName": "",
                "fullName": ""
            },
            "individualLicenseDetail":
            {
                "licenseAuthorityLevelType": "",
                "licenseIdentifier": "",
                "identifierOwnerURI": "mmousebanker@fed.org",
                "licenseIssueDate": "",
                "licenseIssuingAuthorityName": "",
                "licenseIssuingAuthorityStateCode": ""
            },
            "individualEmail": "",
            "individualPhone": ""
        },
        "realEstateBrokerB": {
            "partyRoleType": "RealEstateAgent",
            "organizationName": "",
            "address":
            {
                "addressLineText": "",
                "addressType": "Mailing",
                "addressUnitDesignatorType": "",
                "addressUnitIdentifier": "",
                "cityName": "",
                "countryCode": "",
                "postalCode": "",
                "stateCode": "",
                "unparsedLegalDescription": "",
                "legalDescription": false
            },
            "organizationLicenseDetail":
            {
                "licenseAuthorityLevelType": "",
                "licenseIdentifier": "",
                "identifierOwnerURI": "",
                "licenseIssueDate": "",
                "licenseIssuingAuthorityName": "",
                "licenseIssuingAuthorityStateCode": ""
            },
            "name":
            {
                "firstName": "",
                "lastName": "",
                "middleName": "",
                "suffixName": "",
                "fullName": ""
            },
            "individualLicenseDetail":
            {
                "licenseAuthorityLevelType": "",
                "licenseIdentifier": "",
                "identifierOwnerURI": "",
                "licenseIssueDate": "",
                "licenseIssuingAuthorityName": "",
                "licenseIssuingAuthorityStateCode": ""
            },
            "individualEmail": "",
            "individualPhone": ""
        },
        "realEstateBrokerS": {
            "partyRoleType": "RealEstateAgent",
            "organizationName": "",
            "address":
            {
                "addressLineText": "",
                "addressType": "Mailing",
                "addressUnitDesignatorType": "",
                "addressUnitIdentifier": "",
                "cityName": "",
                "countryCode": "",
                "postalCode": "",
                "stateCode": "",
                "unparsedLegalDescription": "",
                "legalDescription": false
            },
            "organizationLicenseDetail":
            {
                "licenseAuthorityLevelType": "",
                "licenseIdentifier": "",
                "identifierOwnerURI": "",
                "licenseIssueDate": "",
                "licenseIssuingAuthorityName": "",
                "licenseIssuingAuthorityStateCode": ""
            },
            "name":
            {
                "firstName": "",
                "lastName": "",
                "middleName": "",
                "suffixName": "",
                "fullName": ""
            },
            "individualLicenseDetail":
            {
                "licenseAuthorityLevelType": "",
                "licenseIdentifier": "",
                "identifierOwnerURI": "",
                "licenseIssueDate": "",
                "licenseIssuingAuthorityName": "",
                "licenseIssuingAuthorityStateCode": ""
            },
            "individualEmail": "",
            "individualPhone": ""
        },
        "settlementAgent":
        {
            "partyRoleType": "ClosingAgent",
            "organizationName": "",
            "address":
            {
                "addressLineText": "",
                "addressType": "Mailing",
                "addressUnitDesignatorType": "",
                "addressUnitIdentifier": "",
                "cityName": "",
                "countryCode": "",
                "postalCode": "",
                "stateCode": "",
                "unparsedLegalDescription": "",
                "legalDescription": false
            },
            "organizationLicenseDetail":
            {
                "licenseAuthorityLevelType": "",
                "licenseIdentifier": "",
                "identifierOwnerURI": "",
                "licenseIssueDate": "",
                "licenseIssuingAuthorityName": "",
                "licenseIssuingAuthorityStateCode": ""
            },
            "name":
            {
                "firstName": "",
                "lastName": "",
                "middleName": "",
                "suffixName": "",
                "fullName": ""
            },
            "individualLicenseDetail":
            {
                "licenseAuthorityLevelType": "",
                "licenseIdentifier": "",
                "identifierOwnerURI": "",
                "licenseIssueDate": "",
                "licenseIssuingAuthorityName": "",
                "licenseIssuingAuthorityStateCode": ""
            },
            "individualEmail": "",
            "individualPhone": ""
        }
    }
  
	};

	
	/// Start leformdata
	this.leformdata ={
		
		"loanEstimateDocDetails":
	    {
	        "transactionType": "",
	        "documentType": "LoanEstimate",
	        "formType": ""
	    },
		"loanDetail": {
		    "assumabilityIndicator": false,
		    "balloonIndicator": false,
		    "balloonPaymentAmount": "",
		    "buydownTemporarySubsidyFundingIndicator": false,
		    "constructionLoanIndicator": false,
		    "creditorServicingOfLoanStatementType": "",
		    "demandFeatureIndicator": false,
		    "escrowAbsenceReasonType": "",
		    "escrowIndicator": false,
		    "interestOnlyIndicator": false,
		    "interestRateIncreaseIndicator": false,
		    "loanAmountIncreaseIndicator": false,
		    "miRequiredIndicator": false,
		    "negativeAmortizationIndicator": false,
		    "paymentIncreaseIndicator": false,
		    "prepaymentPenaltyIndicator": false,
		    "seasonalPaymentFeatureIndicator": false,
		    "stepPaymentsFeatureDescription": "",
		    "totalSubordinateFinancingAmount": "",
		    "subordinateFinancingIsNewIndicator":false
		},
		"termsOfLoan": {
		    "assumedLoanAmount": "",
		    "disclosedFullyIndexedRatePercent": "",
		    "lienPriorityType": "FirstLien",
		    "loanPurposeType": "",
		    "mortgageType": "Conventional",
		    "mortgageTypeOtherDescription": "",
		    "noteAmount": "",
		    "noteRatePercent": "",
		    "weightedAverageInterestRatePercent": ""
		},
		"documentClassification": {
		    "documentType": "",
		    "documentTypeOtherDescription": "",
		    "documentFormIssuingEntityNameType": "",
		    "documentFormIssuingEntityVersionIdentifier": "",
		    "documentSignatureRequiredIndicator": false
		},
		"closingInformation": {
		    "property": {
		      "addressLineText": "",
		      "addressType": "",
		      "addressUnitDesignatorType": "",
		      "addressUnitIdentifier": "",
		      "cityName": "",
		      "countryCode": "",
		      "postalCode": "",
		      "stateCode": "",
		      "unparsedLegalDescription": "",
		      "legalDescription": false
		    },
		    "salePrice": "",
		    "partyRoleType": "",
		    "propertyValuationDetail": {
		    	"appraisalIdentifier":"",
		    	"identifierOwnerURI": "",
		      	"propertyEstimatedValueAmount": "",
		      	"propertyValuationAmount": "",
		      	"propertyValuationMethodType": "AutomatedValuationModel",
		      	"propertyValuationMethodTypeOtherDescription": "",
		      	"propertyValue": "Appraised"
		    }
		},
		"closingInformationDetail": {
		    "dateIssued": "",
			"lenderName":"Ficus Bank",
			"closingCostExpirationDate":"",
		    "cashFromBorrowerAtClosingAmount": "",
		    "cashFromSellerAtClosingAmount": "",
		    "cashToBorrowerAtClosingAmount": "",
		    "cashToSellerAtClosingAmount": "",
		    "closingAgentOrderNumberIdentifier": "",
		    "closingDate": "",
		    "closingRateSetDate": "",
		    "currentRateSetDate": "",
		    "disbursementDate": "",
		    "documentOrderClassificationType": ""
		},
		"construction": {
		    "constructionLoanTotalTermMonthsCount": "",
		    "constructionLoanType": "",
		    "constructionPeriodNumberOfMonthsCount": ""
		},
		"miDataDetail": {
		    "miCertificateIdentifier": "",
		    "miCompanyNameType": "",
		    "miCompanyNameTypeOtherDescription": "",
		    "miScheduledTerminationDate": "",
		    "miInitialPremiumAmount": "",
		    "miMonthlyAmount": "",
		    "miFirstFactor": "",
            "miSecondFactorPercentage": "",

		},
		"transactionInformation": {
			"refinanceSameLenderIndicator" : false,
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
					"stateCode": "",
					"unparsedLegalDescription": "",
                    "legalDescription": false
				}
			}
			],
			"sellerDetails": [{
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
					"stateCode": "",
					"unparsedLegalDescription": "",
                    "legalDescription": false
				}
			}],
			"lenderDetails": [{
				"type": "O",
				"nameModel": {
					"firstName": "",
					"lastName": "",
					"middleName": "",
					"suffixName": "",
					"fullName": "",
					"refinanceSameLender" : true
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
					"stateCode": "",
					"unparsedLegalDescription": "",
                    "legalDescription": false
				}
			}
		  ]
		},
       "loanInformation": {
		    "amortizationType": "Fixed",
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
		    "automatedUnderwritings": [
		      {
		        "automatedUnderwritingCaseIdentifier": "",
		        "automatedUnderwritingSystemType": "",
		        "automatedUnderwritingSystemTypeOtherDescription": ""
		      }
		    ],
		    "loanManualUnderwritingIndicator": false
		},
		"salesContractDetail": {
		    "personalPropertyIndicator": "",
		    "personalPropertyAmount": "",
		    "realPropertyAmount": "",
		    "saleContractAmount": ""
		},
		"integratedDisclosureDetail": {
		    "firstYearTotalEscrowPaymentAmount": "",
		    "firstYearTotalEscrowPaymentDescription": "",
		    "firstYearTotalNonEscrowPaymentAmount": "",
		    "firstYearTotalNonEscrowPaymentDescription": "",
		    "integratedDisclosureHomeEquityLoanIndicator": false,
		    "integratedDisclosureIssuedDate": "",
		    "integratedDisclosureLoanProductDescription": "",
		    "fiveYearTotalOfPaymentsComparisonAmount":"",
            "fiveYearPrincipalReductionComparisonAmount":"",
            "integratedDisclosureEstimatedClosingCostsExpirationDatetime":""

		},
		"negativeAmortization": {
		    "negativeAmortizationLimitMonthsCount": "",
		    "negativeAmortizationMaximumLoanBalanceAmount": "",
		    "negativeAmortizationType": ""
		},
		"interestOnly": {
		    "interestOnlyTermMonthsCount": ""
		},
		"maturityRule": {
		    "loanMaturityPeriodCount": "",
		    "loanMaturityPeriodType": "Month",
		    "loanTermMaximumMonthsCount": ""
		},
		"loanProduct":
	    {
	        "loanPriceQuoteInterestRatePercent": "",
	        "lock":
	        {
	            "lockExpirationDatetime": "",
	            "lockStatusType": "None",
	            "lockExpirationTimezoneType": ""
	        }
	    },
		"loanTerms": {
		    "prepaymentPenalty": {
		      "prepaymentPenaltyMaximumLifeOfLoanAmount": "",
		      "prepaymentPenaltyExpirationMonthsCount": ""
		    },
		    "temporaryBuydown": {
		      "buydownInitialEffectiveInterestRatePercent": "",
		      "gseBuydownReflectedInNoteIndicator": false,
		      "rateAfterBuydownApplied": "",
		      "buydownChangeFrequencyMonthsCount": "",
		      "totalNumberOfMonths": "",
		      "buydownIncreaseRatePercent": ""
		    }
		},
		"projectedPayments":
	    {
	        "paymentFrequencyType": "",
	        "miMonthsDuration": "",
	        "paymentCalculation":
	        [
	            {
	                "sequenceNumber": "",
	                "projectedPaymentCalculationPeriodEndNumber": "",
	                "projectedPaymentCalculationPeriodStartNumber": "",
	                "projectedPaymentCalculationPeriodTermType": "",
	                "projectedPaymentCalculationPeriodTermTypeOtherDescription": ""
	            }
	        ],
	        "principalInterest":
	        [
	            {
	                "projectedPaymentPrincipalAndInterestMaximumPaymentAmount": "",
	                "projectedPaymentPrincipalAndInterestMinimumPaymentAmount": "",
	                "interestOnlyStatus": false
	            }
	        ],
	        "mortgageInsurance":
	        [
	            {
	                "projectedPaymentMIPaymentAmount": ""
	            }
	        ],
	        "estimatedEscrow":
	        [
	            {
	                "projectedPaymentEstimatedEscrowPaymentAmount": ""
	            }
	        ],
	        "estimatedTotal":
	        [
	            {
	                "projectedPaymentEstimatedTotalMaximumPaymentAmount": "",
	                "projectedPaymentEstimatedTotalMinimumPaymentAmount": ""
	            }
	        ]
	    },
	    "etiaSection":
	    {   
	    	"displayLabel":"",
	    	"escrowTypes":
	        [
	        ],
	        "projectedPaymentEstimatedTaxesInsuranceAssessmentTotalAmount": "",
	        "etiaValues":
	        [
	            {
	                "projectedPaymentEstimatedTaxesInsuranceAssessmentComponentType": "",
	                "projectedPaymentEstimatedTaxesInsuranceAssessmentComponentTypeOtherDescription": "",
	                "projectedPaymentEscrowedType": "NotEscrowed"
	            }
	        ]
	    },
	    "closingCostDetailsLoanCosts":
	    {
	        "ocTotalAmount": "",
	        "sbDidNotShopTotalAmount": "",
	        "sbDidShopTotalAmount": "",
	        "tlCostsTotalAmount": "",
	        "originationCharges":
	        [
	            {
	                "displayLabel": "",
	                "gseDisplayLabel": "",
	                "feePaidToFullName": "",
	                "feeActualTotalAmount": "",
	                "feeEstimatedTotalAmount":"",
	                "feePaidToType": "Lender",
	                "feePaidToTypeOtherDescription": "",
	                "feePercentBasisType": "",
	                "feeTotalPercent": "",
	                "feeType": "",
	                "feeTypeOtherDescription": "",
	                "integratedDisclosureSectionType": "OriginationCharges",
	                "optionalCostIndicator": null,
	                "regulationZPointsAndFeesIndicator": null,
	                "paymentIncludedInAPRIndicator": true
	            }
	        ],
	        "sbDidNotShopFors":
	        [
	            {
	                "displayLabel": "",
	                "gseDisplayLabel": "",
	                "feePaidToFullName": "",
	                "feeActualTotalAmount": "",
	                "feeEstimatedTotalAmount":"",
	                "feePaidToType": "ThirdPartyProvider",
	                "feePaidToTypeOtherDescription": "",
	                "feePercentBasisType": "",
	                "feeTotalPercent": "",
	                "feeType": "",
	                "feeTypeOtherDescription": "",
	                "integratedDisclosureSectionType": "ServicesYouCannotShopFor",
	                "optionalCostIndicator": null,
	                "regulationZPointsAndFeesIndicator": null,
	                "paymentIncludedInAPRIndicator": true
	            }
	        ],
	        "sbDidShopFors":
	        [
	            {
	                "displayLabel": "",
	                "gseDisplayLabel": "",
	                "feePaidToFullName": "",
	                "feeActualTotalAmount": "",
	                "feeEstimatedTotalAmount":"",
	                "feePaidToType": "ThirdPartyProvider",
	                "feePaidToTypeOtherDescription": "",
	                "feePercentBasisType": "",
	                "feeTotalPercent": "",
	                "feeType": "",
	                "feeTypeOtherDescription": "",
	                "integratedDisclosureSectionType": "ServicesYouCanShopFor",
	                "optionalCostIndicator": null,
	                "regulationZPointsAndFeesIndicator": null,
	                "paymentIncludedInAPRIndicator": true
	            }
	        ],
	        "tlCosts":
	        {
	            "bpAtClosing": "",
	            "bpB4Closing": "",
	            "spAtClosing": "",
	            "spB4Closing": "",
	            "paidByOthers": "",
	            "lenderStatus": false
	        }
	    },
	    "closingCostDetailsOtherCosts":
	    {
	        "tOGovtFeesTotalAmount": "",
	        "prepaidsTotalAmount": "",
	        "escrowItemsTotalAmount": "",
	        "otherTotalAmount": "",
	        "totalOtherCostsTotalAmount": "",
	        "tOGovtFeesList":
	        [
	            {
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
	                "integratedDisclosureSectionType": "TaxesAndOtherGovernmentFees",
	                "optionalCostIndicator": null,
	                "regulationZPointsAndFeesIndicator": null,
	                "paymentIncludedInAPRIndicator": false
	            }
	        ],
	        "prepaidsList":
	        [
	            {
	                "gseDisplayLabelText": "",
	                "displayLabelText": "",
	                "feePaidToType": "ThirdPartyProvider",
	                "feePaidToTypeOtherDescription": "",
	                "integratedDisclosureSectionType": "Prepaids",
	                "prepaidItemEstimatedTotalAmount": "",
	                "prepaidItemMonthsPaidCount": "",
	                "prepaidItemPaidFromDate": "",
	                "prepaidItemPaidThroughDate": "",
	                "prepaidItemPerDiemAmount": "",
	                "prepaidItemPerDiemCalculationMethodType": "",
	                "prepaidItemType": "",
	                "prepaidItemTypeOtherDescription": "",
	                "regulationZPointsAndFeesIndicator": null,
	                "paymentIncludedInAPRIndicator": false,
			        "optionalCostIndicator": null,
	                "prepaidPaidToFullName": "",
	                "perDiemAmount":"",
	                "numberOfDays":"",
	                "prepaidInterestRate":""

	            }
	        ],
	        "escrowItemsList":
	        [
	            {
			        "displayLabel": "",
			        "escrowCollectedNumberOfMonthsCount": "",
			        "escrowItemEstimatedTotalAmount":"",
			        "escrowItemType": "",
			        "escrowItemTypeOtherDescription": "",
			        "escrowMonthlyPaymentAmount": "",
			        "feePaidToType": "ThirdPartyProvider",
			        "feePaidToTypeOtherDescription": "",
			        "integratedDisclosureSectionType": "InitialEscrowPaymentAtClosing",
			        "regulationZPointsAndFeesIndicator": null,
			        "paymentIncludedInAPRIndicator": false,
			        "optionalCostIndicator": null
	            }
	        ],
	        "otherCostsList":
	        [
	            {
	                "displayLabel": "",
	                "gseDisplayLabel": "",
	                "feePaidToFullName": "",
	                "feeActualTotalAmount": "",
	                "feeEstimatedTotalAmount":"",
	                "feePaidToType": "ThirdPartyProvider",
	                "feePaidToTypeOtherDescription": "",
	                "feePercentBasisType": "",
	                "feeTotalPercent": "",
	                "feeType": "",
	                "feeTypeOtherDescription": "",
	                "integratedDisclosureSectionType": "OtherCosts",
	                "optionalCostIndicator": null,
	                "regulationZPointsAndFeesIndicator": null,
	                "paymentIncludedInAPRIndicator": false
	            }
	        ]
	    },
	    "closingCostsTotal": {
		    "totalClosingCosts": "",
		    "closingCostsSubtotal": {
		      "bpAtClosing": "",
		      "bpB4Closing": "",
		      "spAtClosing": "",
		      "spB4Closing": "",
		      "paidByOthers": "",
		      "lenderStatus": false
		    },
		    "lenderCredits": "",
		    "lenderCreditToleranceCureAmount": ""
	  },
	  "cashToCloses":
    {
        "loanAmount":
        {
            "integratedDisclosureCashToCloseItemAmountChangedIndicator": false,
            "integratedDisclosureCashToCloseItemChangeDescription": "",
            "integratedDisclosureCashToCloseItemEstimatedAmount": "",
            "integratedDisclosureCashToCloseItemFinalAmount": "",
            "integratedDisclosureCashToCloseItemPaymentType": "",
            "integratedDisclosureCashToCloseItemType": "Deposit",
            "index": ""
        },
        "totalClosingCosts":
        {
            "integratedDisclosureCashToCloseItemAmountChangedIndicator": false,
            "integratedDisclosureCashToCloseItemChangeDescription": "",
            "integratedDisclosureCashToCloseItemEstimatedAmount": "",
            "integratedDisclosureCashToCloseItemFinalAmount": "",
            "integratedDisclosureCashToCloseItemPaymentType": "",
            "integratedDisclosureCashToCloseItemType": "TotalClosingCosts",
            "index": ""
        },
        "closingCostsPaidBeforeClosing":
        {
            "integratedDisclosureCashToCloseItemAmountChangedIndicator": false,
            "integratedDisclosureCashToCloseItemChangeDescription": "",
            "integratedDisclosureCashToCloseItemEstimatedAmount": "",
            "integratedDisclosureCashToCloseItemFinalAmount": "",
            "integratedDisclosureCashToCloseItemPaymentType": "",
            "integratedDisclosureCashToCloseItemType": "ClosingCostsPaidBeforeClosing",
            "index": ""
        },
        "closingCostsFinanced":
        {
            "integratedDisclosureCashToCloseItemAmountChangedIndicator": false,
            "integratedDisclosureCashToCloseItemChangeDescription": "",
            "integratedDisclosureCashToCloseItemEstimatedAmount": "",
            "integratedDisclosureCashToCloseItemFinalAmount": "",
            "integratedDisclosureCashToCloseItemPaymentType": "",
            "integratedDisclosureCashToCloseItemType": "ClosingCostsFinanced",
            "index": ""
        },
        "downPayment":
        {
            "integratedDisclosureCashToCloseItemAmountChangedIndicator": false,
            "integratedDisclosureCashToCloseItemChangeDescription": "",
            "integratedDisclosureCashToCloseItemEstimatedAmount": "",
            "integratedDisclosureCashToCloseItemFinalAmount": "",
            "integratedDisclosureCashToCloseItemPaymentType": "",
            "integratedDisclosureCashToCloseItemType": "DownPayment",
            "index": ""
        },
        "totalPayoffsAndPayments": 
        {
            "integratedDisclosureCashToCloseItemAmountChangedIndicator": false,
            "integratedDisclosureCashToCloseItemChangeDescription": "",
            "integratedDisclosureCashToCloseItemEstimatedAmount": "",
            "integratedDisclosureCashToCloseItemFinalAmount": "",
            "integratedDisclosureCashToCloseItemPaymentType": "",
            "integratedDisclosureCashToCloseItemType": "Deposit",
            "index": ""
        },
        "deposit":
        {
            "integratedDisclosureCashToCloseItemAmountChangedIndicator": false,
            "integratedDisclosureCashToCloseItemChangeDescription": "",
            "integratedDisclosureCashToCloseItemEstimatedAmount": "",
            "integratedDisclosureCashToCloseItemFinalAmount": "",
            "integratedDisclosureCashToCloseItemPaymentType": "",
            "integratedDisclosureCashToCloseItemType": "Deposit",
            "index": ""
        },
        "fundsForBorrower":
        {
            "integratedDisclosureCashToCloseItemAmountChangedIndicator": false,
            "integratedDisclosureCashToCloseItemChangeDescription": "",
            "integratedDisclosureCashToCloseItemEstimatedAmount": "",
            "integratedDisclosureCashToCloseItemFinalAmount": "",
            "integratedDisclosureCashToCloseItemPaymentType": "",
            "integratedDisclosureCashToCloseItemType": "FundsForBorrower",
            "index": ""
        },
        "sellerCredits":
        {
            "integratedDisclosureCashToCloseItemAmountChangedIndicator": false,
            "integratedDisclosureCashToCloseItemChangeDescription": "",
            "integratedDisclosureCashToCloseItemEstimatedAmount": "",
            "integratedDisclosureCashToCloseItemFinalAmount": "",
            "integratedDisclosureCashToCloseItemPaymentType": "",
            "integratedDisclosureCashToCloseItemType": "SellerCredits",
            "index": ""
        },
        "adjustmentsAndOtherCredits":
        {
            "integratedDisclosureCashToCloseItemAmountChangedIndicator": false,
            "integratedDisclosureCashToCloseItemChangeDescription": "",
            "integratedDisclosureCashToCloseItemEstimatedAmount": "",
            "integratedDisclosureCashToCloseItemFinalAmount": "",
            "integratedDisclosureCashToCloseItemPaymentType": "",
            "integratedDisclosureCashToCloseItemType": "AdjustmentsAndOtherCredits",
            "index": ""
        },
        "cashToCloseTotal":
        [
            {
                "integratedDisclosureCashToCloseItemAmountChangedIndicator": false,
                "integratedDisclosureCashToCloseItemChangeDescription": "",
                "integratedDisclosureCashToCloseItemEstimatedAmount": "",
                "integratedDisclosureCashToCloseItemFinalAmount": "",
                "integratedDisclosureCashToCloseItemPaymentType": "",
                "integratedDisclosureCashToCloseItemType": "CashToCloseTotal",
                "index": ""
            },
            {
                "integratedDisclosureCashToCloseItemAmountChangedIndicator": false,
                "integratedDisclosureCashToCloseItemChangeDescription": "",
                "integratedDisclosureCashToCloseItemEstimatedAmount": "",
                "integratedDisclosureCashToCloseItemFinalAmount": "",
                "integratedDisclosureCashToCloseItemPaymentType": "",
                "integratedDisclosureCashToCloseItemType": "CashToCloseTotal",
                "index": ""
            }
        ],
        "alternateView": false
    },
	"prorationsList" : [
	    {
	      "displayLabel": "",
 	      "integratedDisclosureSectionType": "",
 	      "integratedDisclosureSubsectionType": "",
 	      "prorationItemAmount": "",
 	      "prorationItemPaidFromDate": "",
 	      "prorationItemPaidThroughDate": "",
 	      "prorationItemType": "",
 	      "prorationItemTypeOtherDescription": ""
     	}
    ],
    "liabilityList":
    [
        {
            "displayLabel": "",
            "liabilityDescription": "",
            "liabilityType": "",
            "liabilityTypeOtherDescription": "",
            "integratedDisclosureSectionType": "",
            "liabilitySecuredBySubjectPropertyIndicator": false,
            "liabilityHolderFullName": "",
            "payoffAmount": "",
            "payoffPrepaymentPenaltyAmount": "",
            "payoffPartialIndicator":false
        }
	],
	"closingAdjustmentItemList":
    [
        {
            "displayLabel": "",
            "closingAdjustmentItemAmount": "",
            "closingAdjustmentItemPaidOutsideOfClosingIndicator": false,
            "closingAdjustmentItemType": "",
            "closingAdjustmentItemTypeOtherDescription": "",
            "integratedDisclosureSectionType": "",
            "integratedDisclosureSubsectionType": "Adjustments",
            "paidByIndividualFullName": "",
            "paidByEntityFullName": "",
            "paidToEntityFullName": ""
        }
    ],
	"closingCostFundList":
    [
        {
            "displayLabel": null,
            "closingCostFundAmount": "",
            "fundsType": "ExcessDeposit",
            "integratedDisclosureSectionType": "DueFromSellerAtClosing"
        },
        {
            "displayLabel": null,
            "closingCostFundAmount": "",
            "fundsType": "DepositOnSalesContract",
            "integratedDisclosureSectionType": "PaidAlreadyByOrOnBehalfOfBorrowerAtClosing"
        }
    ],
    "prorationList":
    [
        {
            "displayLabel": "City/Town Taxes",
            "integratedDisclosureSectionType": "DueFromBorrowerAtClosing",
            "integratedDisclosureSubsectionType": "AdjustmentsForItemsPaidBySellerInAdvance",
            "prorationItemAmount": "",
            "prorationItemPaidFromDate": "",
            "prorationItemPaidThroughDate": "",
            "prorationItemType": "CityPropertyTax",
            "prorationItemTypeOtherDescription": ""
        }
    ],
    "summariesofTransactions":
    {
        "borrowerTransaction": {
	      "dueFromBorrowerAtClosing": {
	        "integratedDisclosureSectionSummaryDetailModel": {
	          "integratedDisclosureSectionTotalAmount": "",
	          "integratedDisclosureSectionType": "DueFromBorrowerAtClosing",
	          "integratedDisclosureSubsectionTotalAmount": "",
	          "integratedDisclosureSubsectionType": "",
	          "integratedDisclosureSubsectionTypeOtherDescription": "",
	          "lenderCreditToleranceCureAmount": ""
	        },
	        "integratedDisclosureSubsectionPayments": []
	      },
	      "paidAlreadyByOrOnBehalfOfBorrowerAtClosing": {
	        "integratedDisclosureSectionSummaryDetailModel": {
	          "integratedDisclosureSectionTotalAmount": "",
	          "integratedDisclosureSectionType": "PaidAlreadyByOrOnBehalfOfBorrowerAtClosing",
	          "integratedDisclosureSubsectionTotalAmount": "",
	          "integratedDisclosureSubsectionType": "",
	          "integratedDisclosureSubsectionTypeOtherDescription": "",
	          "lenderCreditToleranceCureAmount": ""
	        },
	        "integratedDisclosureSubsectionPayments": []
	      }
	    },
	    "sellerTransaction": {
	      "toSellerAtClosing": {
	        "integratedDisclosureSectionSummaryDetailModel": {
	          "integratedDisclosureSectionTotalAmount": "",
	          "integratedDisclosureSectionType": "DueToSellerAtClosing",
	          "integratedDisclosureSubsectionTotalAmount": "",
	          "integratedDisclosureSubsectionType": "",
	          "integratedDisclosureSubsectionTypeOtherDescription": "",
	          "lenderCreditToleranceCureAmount": ""
	        },
	        "integratedDisclosureSubsectionPayments": []
	      },
	      "fromSellerAtClosing": {
	        "integratedDisclosureSectionSummaryDetailModel": {
	          "integratedDisclosureSectionTotalAmount": "",
	          "integratedDisclosureSectionType": "DueFromSellerAtClosing",
	          "integratedDisclosureSubsectionTotalAmount": "",
	          "integratedDisclosureSubsectionType": "",
	          "integratedDisclosureSubsectionTypeOtherDescription": "",
	          "lenderCreditToleranceCureAmount": ""
	        },
	        "integratedDisclosureSubsectionPayments": []
	      }
	    }
    },
	"payoffsAndPayments":
    {
        "integratedDisclosureSectionSummary": 
        {
            "integratedDisclosureSectionSummaryDetailModel":
            {
                "integratedDisclosureSectionTotalAmount": "",
                "integratedDisclosureSectionType": "",
                "integratedDisclosureSubsectionTotalAmount": "",
                "integratedDisclosureSubsectionType": "",
                "integratedDisclosureSubsectionTypeOtherDescription": "",
                "lenderCreditToleranceCureAmount": ""
            },
            "integratedDisclosureSubsectionPayments":
            [
                {
                    "integratedDisclosureSubsectionPaidByType": "",
                    "integratedDisclosureSubsectionPaymentAmount": "",
                    "integratedDisclosureSubsectionPaymentTimingType": ""
                }
            ]
        }
    },
    "interestRateAdjustment":
    {
        "indexType": "",
        "indexTypeOtherDescription": "",
        "ceilingRatePercent": "",
        "ceilingRatePercentEarliestEffectiveMonthsCount": "",
        "firstRateChangeMonthsCount": "",
        "floorRatePercent": "",
        "marginRatePercent": "",
        "totalStepCount": "",
        "firstAdjustmentRule": "",
        "subsequentAdjustmentRule": "",
        "firstPerChangeMaximumIncreaseRatePercent": "",
        "firstPerChangeRateAdjustmentFrequencyMonthsCount": "",
        "subsequentPerChangeMaximumIncreaseRatePercent": "",
        "subsequentPerChangeRateAdjustmentFrequencyMonthsCount": ""
    },
    "principalAndInterestPaymentAdjustment":
    {
        "firstPrincipalAndInterestPaymentChangeMonthsCount": "",
        "principalAndInterestPaymentMaximumAmount": "",
        "principalAndInterestPaymentMaximumAmountEarliestEffectiveMonthsCount": "",
        "firstAdjustmentRuleType": "",
        "firstPerChangeMaximumPrincipalAndInterestPaymentAmount": "",
        "firstPerChangeMinimumPrincipalAndInterestPaymentAmount": "",
        "firstPerChangePrincipalAndInterestPaymentAdjustmentFrequencyMonthsCount": "",
        "subsequentAdjustmentRuleType": "",
        "subsequentPerChangeMaximumPrincipalAndInterestPaymentAmount": "",
        "subsequentPerChangeMinimumPrincipalAndInterestPaymentAmount": "",
        "subsequentPerChangePrincipalAndInterestPaymentAdjustmentFrequencyMonthsCount": ""
    },
    "payment":
    {
        "partialPayments":
        {
            "partialPaymentModels": []
        },
        "paymentRule":
        {
            "fullyIndexedInitialPrincipalAndInterestPaymentAmount": "",
            "initialPrincipalAndInterestPaymentAmount": "",
            "partialPaymentAllowedIndicator": false,
            "paymentFrequencyType": "Monthly",
            "paymentOptionIndicator": false,
            "seasonalPaymentPeriodEndMonth": "",
            "seasonalPaymentPeriodStartMonth": "",
            "totalOptionalPaymentCount": "",
            "totalStepPaymentCount": ""
        }
    },
    "lateChargeRule":
    {
        "lateChargeAmount": "",
        "lateChargeGracePeriodDaysCount": "",
        "lateChargeRatePercent": "",
        "lateChargeType": "PercentOfPrincipalAndInterest"
    },
    "loanCalculationsQualifiedMortgage":
    {
        "loanCalculationModel":
        {
            "aprPercent": "",
            "feeSummaryTotalAmountFinancedAmount": "",
            "feeSummaryTotalFinanceChargeAmount": "",
            "feeSummaryTotalInterestPercent": "",
            "feeSummaryTotalOfAllPaymentsAmount": "",
            "deficiencyRightsPreservedIndicator":false
        },
        "qualifiedMortgage":
        {
            "regulationZExcludedBonaFideDiscountPointsIndicator": false,
            "regulationZExcludedBonaFideDiscountPointsPercent": "",
            "regulationZTotalAffiliateFeesAmount": "",
            "regulationZTotalLoanAmount": "",
            "regulationZTotalPointsAndFeesAmount": "",
            "averagePrimeOfferRatePercent": "",
            "abilityToRepayMethodType":"",
            "abilityToRepayExemptionReasonType":""
        }
    },
    "contactInformation":
    {
        "lender":
        {
            "partyRoleType": "NotePayTo",
            "organizationName": "",
            "address":
            {
                "addressLineText": "",
                "addressType": "",
                "addressUnitDesignatorType": "",
                "addressUnitIdentifier": "",
                "cityName": "",
                "countryCode": "",
                "postalCode": "",
                "stateCode": "",
                "unparsedLegalDescription": "",
                "legalDescription": false
            },
            "organizationLicenseDetail":
            {
                "licenseAuthorityLevelType": "",
                "licenseIdentifier": "",
                "identifierOwnerURI": "mmousebanker@fed.org",
                "licenseIssueDate": "",
                "licenseIssuingAuthorityName": "",
                "licenseIssuingAuthorityStateCode": ""
            },
            "name":
            {
                "firstName": "",
                "lastName": "",
                "middleName": "",
                "suffixName": "",
                "fullName": ""
            },
            "individualLicenseDetail":
            {
                "licenseAuthorityLevelType": "",
                "licenseIdentifier": "",
                "identifierOwnerURI": "mmousebanker@fed.org",
                "licenseIssueDate": "",
                "licenseIssuingAuthorityName": "",
                "licenseIssuingAuthorityStateCode": ""
            },
            "individualEmail": "",
            "individualPhone": ""
        },
        "mortagageBroker":
        {
            "partyRoleType": "MortgageBroker",
            "organizationName": "",
            "address":
            {
                "addressLineText": "",
                "addressType": "",
                "addressUnitDesignatorType": "",
                "addressUnitIdentifier": "",
                "cityName": "",
                "countryCode": "",
                "postalCode": "",
                "stateCode": "",
                "unparsedLegalDescription": "",
                "legalDescription": false
            },
            "organizationLicenseDetail":
            {
                "licenseAuthorityLevelType": "",
                "licenseIdentifier": "",
                "identifierOwnerURI": "mmousebanker@fed.org",
                "licenseIssueDate": "",
                "licenseIssuingAuthorityName": "",
                "licenseIssuingAuthorityStateCode": ""
            },
            "name":
            {
                "firstName": "",
                "lastName": "",
                "middleName": "",
                "suffixName": "",
                "fullName": ""
            },
            "individualLicenseDetail":
            {
                "licenseAuthorityLevelType": "",
                "licenseIdentifier": "",
                "identifierOwnerURI": "mmousebanker@fed.org",
                "licenseIssueDate": "",
                "licenseIssuingAuthorityName": "",
                "licenseIssuingAuthorityStateCode": ""
            },
            "individualEmail": "",
            "individualPhone": ""
        },
        "realEstateBrokerB": {
            "partyRoleType": "RealEstateAgent",
            "organizationName": "",
            "address":
            {
                "addressLineText": "",
                "addressType": "",
                "addressUnitDesignatorType": "",
                "addressUnitIdentifier": "",
                "cityName": "",
                "countryCode": "",
                "postalCode": "",
                "stateCode": "",
                "unparsedLegalDescription": "",
                "legalDescription": false
            },
            "organizationLicenseDetail":
            {
                "licenseAuthorityLevelType": "",
                "licenseIdentifier": "",
                "identifierOwnerURI": "",
                "licenseIssueDate": "",
                "licenseIssuingAuthorityName": "",
                "licenseIssuingAuthorityStateCode": ""
            },
            "name":
            {
                "firstName": "",
                "lastName": "",
                "middleName": "",
                "suffixName": "",
                "fullName": ""
            },
            "individualLicenseDetail":
            {
                "licenseAuthorityLevelType": "",
                "licenseIdentifier": "",
                "identifierOwnerURI": "",
                "licenseIssueDate": "",
                "licenseIssuingAuthorityName": "",
                "licenseIssuingAuthorityStateCode": ""
            },
            "individualEmail": "",
            "individualPhone": ""
        },
        "realEstateBrokerS": {
            "partyRoleType": "RealEstateAgent",
            "organizationName": "",
            "address":
            {
                "addressLineText": "",
                "addressType": "",
                "addressUnitDesignatorType": "",
                "addressUnitIdentifier": "",
                "cityName": "",
                "countryCode": "",
                "postalCode": "",
                "stateCode": "",
                "unparsedLegalDescription": "",
                "legalDescription": false
            },
            "organizationLicenseDetail":
            {
                "licenseAuthorityLevelType": "",
                "licenseIdentifier": "",
                "identifierOwnerURI": "",
                "licenseIssueDate": "",
                "licenseIssuingAuthorityName": "",
                "licenseIssuingAuthorityStateCode": ""
            },
            "name":
            {
                "firstName": "",
                "lastName": "",
                "middleName": "",
                "suffixName": "",
                "fullName": ""
            },
            "individualLicenseDetail":
            {
                "licenseAuthorityLevelType": "",
                "licenseIdentifier": "",
                "identifierOwnerURI": "",
                "licenseIssueDate": "",
                "licenseIssuingAuthorityName": "",
                "licenseIssuingAuthorityStateCode": ""
            },
            "individualEmail": "",
            "individualPhone": ""
        },
        "settlementAgent":
        {
            "partyRoleType": "ClosingAgent",
            "organizationName": "",
            "address":
            {
                "addressLineText": "",
                "addressType": "",
                "addressUnitDesignatorType": "",
                "addressUnitIdentifier": "",
                "cityName": "",
                "countryCode": "",
                "postalCode": "",
                "stateCode": "",
                "unparsedLegalDescription": "",
                "legalDescription": false
            },
            "organizationLicenseDetail":
            {
                "licenseAuthorityLevelType": "",
                "licenseIdentifier": "",
                "identifierOwnerURI": "",
                "licenseIssueDate": "",
                "licenseIssuingAuthorityName": "",
                "licenseIssuingAuthorityStateCode": ""
            },
            "name":
            {
                "firstName": "",
                "lastName": "",
                "middleName": "",
                "suffixName": "",
                "fullName": ""
            },
            "individualLicenseDetail":
            {
                "licenseAuthorityLevelType": "",
                "licenseIdentifier": "",
                "identifierOwnerURI": "",
                "licenseIssueDate": "",
                "licenseIssuingAuthorityName": "",
                "licenseIssuingAuthorityStateCode": ""
            },
            "individualEmail": "",
            "individualPhone": ""
        },
        "comparison":{
        	"totalInterestsForFiveYears":"",
        	"principalInterestsForFiveYears":"",
        	"annualPercentageRate":"",
        	"totalInterestPercentage":""
        }
    }
	};
	/// End leformdata

 });