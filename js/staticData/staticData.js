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

	this.feeTypes = [
		'203KArchitecturalAndEngineeringFee',
		'203KConsultantFee',
		'203KDiscountOnRepairs',
		'203KInspectionFee',
		'203KPermits',
		'203KSupplementalOriginationFee',
		'ApplicationFee',
		'AppraisalDeskReviewFee',
		'AppraisalFee',
		'AppraisalFieldReviewFee',
		'AppraisalManagementCompanyFee',
		'AssumptionFee',
		'AutomatedUnderwritingFee',
		'AVMFee',
		'BondFee',
		'CertificationFee',
		'CopyOrFaxFee',
		'CourierFee',
		'CreditReportFee',
		'DocumentPreparationFee',
		'ElectronicDocumentDeliveryFee',
		'EscrowWaiverFee',
		'FilingFee',
		'HighCostMortgageCounselingFee',
		'LoanLevelPriceAdjustment',
		'LoanOriginationFee',
		'LoanOriginatorCompensation',
		'ManualUnderwritingFee',
		'MERSRegistrationFee',
		'NotaryFee',
		'Other',
		'PowerOfAttorneyPreparationFee',
		'PowerOfAttorneyRecordingFee',
		'PreclosingVerificationControlFee',
		'ProcessingFee',
		'RateLockFee',
		'ReinspectionFee',
		'SubordinationFee',
		'TemporaryBuydownAdministrationFee',
		'TemporaryBuydownPoints',
		'VerificationOfAssetsFee',
		'VerificationOfEmploymentFee',
		'VerificationOfIncomeFee',
		'VerificationOfResidencyStatusFee',
		'VerificationOfTaxpayerIdentificationFee',
		'VerificationOfTaxReturnFee',
		'WireTransferFee',
		'203KArchitecturalAndEngineeringFee',
		'203KConsultantFee',
		'203KInspectionFee',
		'203KPermits',
		'203KTitleUpdate',
		'ApplicationFee',
		'AppraisalDeskReviewFee',
		'AppraisalFee',
		'AppraisalFieldReviewFee',
		'AppraisalManagementCompanyFee',
		'AsbestosInspectionFee',
		'AssumptionFee',
		'AutomatedUnderwritingFee',
		'AVMFee',
		'BondFee',
		'CertificationFee',
		'CopyOrFaxFee',
		'CourierFee',
		'CreditReportFee',
		'DisasterInspectionFee',
		'DocumentPreparationFee',
		'DryWallInspectionFee',
		'ElectricalInspectionFee',
		'ElectronicDocumentDeliveryFee',
		'EnvironmentalInspectionFee',
		'EscrowServiceFee',
		'EscrowWaiverFee',
		'FilingFee',
		'FloodCertification',
		'FoundationInspectionFee',
		'HeatingCoolingInspectionFee',
		'HighCostMortgageCounselingFee',
		'HomeInspectionFee',
		'LeadInspectionFee',
		'LendersAttorneyFee',
		'ManualUnderwritingFee',
		'MERSRegistrationFee',
		'MIUpfrontPremium',
		'MoldInspectionFee',
		'NotaryFee',
		'Other',
		'PestInspectionFee',
		'PlumbingInspectionFee',
		'PowerOfAttorneyPreparationFee',
		'PowerOfAttorneyRecordingFee',
		'PreclosingVerificationControlFee',
		'ProcessingFee',
		'PropertyInspectionWaiverFee',
		'PropertyTaxStatusResearchFee',
		'RadonInspectionFee',
		'ReinspectionFee',
		'RoofInspectionFee',
		'SepticInspectionFee',
		'SettlementFee',
		'SmokeDetectorInspectionFee',
		'StructuralInspectionFee',
		'SubordinationFee',
		'SurveyFee',
		'TemporaryBuydownAdministrationFee',
		'TitleClosingFee',
		'TitleClosingProtectionLetterFee',
		'TitleDocumentPreparationFee',
		'TitleEndorsementFee',
		'TitleExaminationFee',
		'TitleInsuranceBinderFee',
		'TitleLendersCoveragePremium',
		'TitleNotaryFee',
		'TitleUnderwritingIssueResolutionFee',
		'USDARuralDevelopmentGuaranteeFee',
		'VAFundingFee',
		'VerificationOfAssetsFee',
		'VerificationOfEmploymentFee',
		'VerificationOfIncomeFee',
		'VerificationOfResidencyStatusFee',
		'VerificationOfTaxpayerIdentificationFee',
		'VerificationOfTaxReturnFee',
		'WaterTestingFee',
		'WellInspectionFee',
		'WireTransferFee',
		'203KArchitecturalAndEngineeringFee',
		'203KConsultantFee',
		'203KInspectionFee',
		'203KPermits',
		'203KTitleUpdate',
		'ApplicationFee',
		'AppraisalDeskReviewFee',
		'AppraisalFee',
		'AppraisalFieldReviewFee',
		'AppraisalManagementCompanyFee',
		'AsbestosInspectionFee',
		'AssumptionFee',
		'AutomatedUnderwritingFee',
		'AVMFee',
		'BondFee',
		'CertificationFee',
		'CopyOrFaxFee',
		'CourierFee',
		'CreditReportFee',
		'DisasterInspectionFee',
		'DocumentPreparationFee',
		'DryWallInspectionFee',
		'ElectricalInspectionFee',
		'ElectronicDocumentDeliveryFee',
		'EnvironmentalInspectionFee',
		'EscrowServiceFee',
		'EscrowWaiverFee',
		'FilingFee',
		'FloodCertification',
		'FoundationInspectionFee',
		'HeatingCoolingInspectionFee',
		'HighCostMortgageCounselingFee',
		'HomeInspectionFee',
		'LeadInspectionFee',
		'LendersAttorneyFee',
		'ManualUnderwritingFee',
		'MERSRegistrationFee',
		'MIUpfrontPremium',
		'MoldInspectionFee',
		'NotaryFee',
		'Other',
		'PestInspectionFee',
		'PlumbingInspectionFee',
		'PowerOfAttorneyPreparationFee',
		'PowerOfAttorneyRecordingFee',
		'PreclosingVerificationControlFee',
		'ProcessingFee',
		'PropertyInspectionWaiverFee',
		'PropertyTaxStatusResearchFee',
		'RadonInspectionFee',
		'ReinspectionFee',
		'RoofInspectionFee',
		'SepticInspectionFee',
		'SettlementFee',
		'SmokeDetectorInspectionFee',
		'StructuralInspectionFee',
		'SubordinationFee',
		'SurveyFee',
		'TemporaryBuydownAdministrationFee',
		'TitleClosingFee',
		'TitleClosingProtectionLetterFee',
		'TitleDocumentPreparationFee',
		'TitleEndorsementFee',
		'TitleExaminationFee',
		'TitleInsuranceBinderFee',
		'TitleLendersCoveragePremium',
		'TitleNotaryFee',
		'TitleUnderwritingIssueResolutionFee',
		'VerificationOfAssetsFee',
		'VerificationOfEmploymentFee',
		'VerificationOfIncomeFee',
		'VerificationOfResidencyStatusFee',
		'VerificationOfTaxpayerIdentificationFee',
		'VerificationOfTaxReturnFee',
		'WaterTestingFee',
		'WellInspectionFee',
		'WireTransferFee',
		'RecordingFeeForDeed',
		'RecordingFeeForMortgage',
		'RecordingFeeTotal',
		'MortgageSurchargeCountyOrParish',
		'MortgageSurchargeMunicipal',
		'MortgageSurchargeState',
		'Other',
		'TransferTaxTotal',
		'AsbestosInspectionFee',
		'CondominiumAssociationDues',
		'CondominiumAssociationSpecialAssessment',
		'CooperativeAssociationDues',
		'CooperativeAssociationSpecialAssessment',
		'CreditDisabilityInsurancePremium',
		'CreditLifeInsurancePremium',
		'CreditPropertyInsurancePremium',
		'CreditUnemploymentInsurancePremium',
		'DebtCancellationInsurancePremium',
		'DisasterInspectionFee',
		'DryWallInspectionFee',
		'ElectricalInspectionFee',
		'EnvironmentalInspectionFee',
		'FoundationInspectionFee',
		'HeatingCoolingInspectionFee',
		'HomeInspectionFee',
		'HomeownersAssociationDues',
		'HomeownersAssociationSpecialAssessment',
		'HomeWarrantyFee',
		'LeadInspectionFee',
		'MoldInspectionFee',
		'MunicipalLienCertificateFee',
		'Other',
		'PestInspectionFee',
		'PlumbingInspectionFee',
		'RadonInspectionFee',
		'RealEstateCommissionBuyersBroker',
		'RealEstateCommissionSellersBroker',
		'ReconveyanceFee',
		'RoofInspectionFee',
		'SepticInspectionFee',
		'SigningAgentFee',
		'SmokeDetectorInspectionFee',
		'StructuralInspectionFee',
		'TitleOwnersCoveragePremium',
		'WaterTestingFee',
		'WellInspectionFee'
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

	this.calendarMonths = ['Jan','Feb','Mar', 'Apr', 'May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    this.prepaidItems = [
        'PrepaidInterest',
		'BoroughPropertyTax',
		'CityPropertyTax',
		'CondominiumAssociationDues',
		'CondominiumAssociationSpecialAssessment',
		'CooperativeAssociationDues',
		'CooperativeAssociationSpecialAssessment',
		'CountyPropertyTax',
		'DistrictPropertyTax',
		'EarthquakeInsurancePremium',
		'FloodInsurancePremium',
		'HailInsurancePremium',
		'HazardInsurancePremium',
		'HomeownersAssociationDues',
		'HomeownersAssociationSpecialAssessment',
		'HomeownersInsurancePremium',
		'MortgageInsurancePremium',
		'Other',
		'StatePropertyTax',
		'TownPropertyTax',
		'VolcanoInsurancePremium',
		'WindAndStormInsurancePremium'
		];
    
    this.escrowItemTypes = [
        'AssessmentTax',
		'CityBondTax',
		'CityPropertyTax',
		'CondominiumAssociationDues',
		'CondominiumAssociationSpecialAssessment',
		'CooperativeAssociationDues',
		'CooperativeAssociationSpecialAssessment',
		'CountyBondTax',
		'CountyPropertyTax',
		'DistrictPropertyTax',
		'EarthquakeInsurance',
		'EnergyEfficientImprovementFunds',
		'FloodInsurance',
		'HailInsurancePremium',
		'HazardInsurance',
		'HomeownersAssociationDues',
		'HomeownersAssociationSpecialAssessment',
		'HomeownersInsurance',
		'MortgageInsurance',
		'Other',
		'ParishTax',
		'PestInsurance',
		'RehabilitationFunds',
		'SchoolPropertyTax',
		'StatePropertyTax',
		'TownPropertyTax',
		'TownshipPropertyTax',
		'VillagePropertyTax',
		'VolcanoInsurance',
		'WindstormInsurance',
		'BoroughPropertyTax'
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

	this.subordinateLiens = [ 
		{ 
			"name" : "Other",
			"value": "Other"  
		},
		{
			"name" : "Proceeds Of Subordinate Liens",
			"value":"ProceedsOfSubordinateLiens"
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
this.cdformdata={
		"closingDisclosureDocType": {
		    "transactionType": null,
		    "documentType": null,
		    "standard": false,
		    "sellerOnly": false,
		    "alternativeView": false
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
		    "totalSubordinateFinancingAmount": ""
		},
		"termsOfLoan": {
		    "assumedLoanAmount": "",
		    "disclosedFullyIndexedRatePercent": "",
		    "lienPriorityType": "",
		    "loanPurposeType": "",
		    "mortgageType": "",
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
		    "amortizationType": "",
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
		    "personalPropertyIndicator": false,
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
		      "gseBuydownReflectedInNoteIndicator": false,
		      "rateAfterBuydownApplied": null,
		      "buydownChangeFrequencyMonthsCount": "",
		      "totalNumberOfMonths": null,
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
	                "bpAtClosing": "",
	                "bpB4Closing": "",
	                "spAtClosing": "",
	                "spB4Closing": "",
	                "paidByOthers": "",
	                "lenderStatus": false,
	                "displayLabel": "",
	                "gseDisplayLabel": "",
	                "feePaidTo": "",
	                "feePaidToType": "",
	                "feePaidToTypeOtherDescription": "",
	                "feePercentBasisType": "",
	                "feeTotalPercent": "",
	                "feeType": "",
	                "feeTypeOtherDescription": "",
	                "integratedDisclosureSectionType": "OriginationCharges",
	                "optionalCostIndicator": false,
	                "regulationZPointsAndFeesIndicator": false,
	                "paymentIncludedInAPRIndicator": false
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
	                "feePaidTo": "",
	                "feePaidToType": "",
	                "feePaidToTypeOtherDescription": "",
	                "feePercentBasisType": "",
	                "feeTotalPercent": "",
	                "feeType": "",
	                "feeTypeOtherDescription": "",
	                "integratedDisclosureSectionType": "ServicesBorrowerDidNotShopFor",
	                "optionalCostIndicator": false,
	                "regulationZPointsAndFeesIndicator": false,
	                "paymentIncludedInAPRIndicator": false
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
	                "feePaidTo": "",
	                "feePaidToType": "",
	                "feePaidToTypeOtherDescription": "",
	                "feePercentBasisType": "",
	                "feeTotalPercent": "",
	                "feeType": "",
	                "feeTypeOtherDescription": "",
	                "integratedDisclosureSectionType": "ServicesBorrowerDidShopFor",
	                "optionalCostIndicator": false,
	                "regulationZPointsAndFeesIndicator": false,
	                "paymentIncludedInAPRIndicator": false
	            }
	        ],
	        "tlCosts":
	        {
	            "bpAtClosing": null,
	            "bpB4Closing": null,
	            "spAtClosing": null,
	            "spB4Closing": null,
	            "paidByOthers": null,
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
	            "bpAtClosing": null,
	            "bpB4Closing": null,
	            "spAtClosing": null,
	            "spB4Closing": null,
	            "paidByOthers": null,
	            "lenderStatus": false
	        },
	        "tOGovtFeesList":
	        [
	            {
	                "bpAtClosing": null,
	                "bpB4Closing": null,
	                "spAtClosing": null,
	                "spB4Closing": null,
	                "paidByOthers": null,
	                "lenderStatus": false,
	                "displayLabel": "",
	                "gseDisplayLabel": "",
	                "feePaidToFullName": "",
	                "feeActualTotalAmount": "",
	                "feePaidToType": "",
	                "feePaidToTypeOtherDescription": "",
	                "feePercentBasisType": "",
	                "feeTotalPercent": "",
	                "feeType": "",
	                "feeTypeOtherDescription": "",
	                "integratedDisclosureSectionType": "TaxesAndOtherGovernmentFees",
	                "optionalCostIndicator": false,
	                "regulationZPointsAndFeesIndicator": false,
	                "paymentIncludedInAPRIndicator": false
	            }
	        ],
	        "prepaidsList":
	        [
	            {
	                "bpAtClosing": null,
	                "bpB4Closing": null,
	                "spAtClosing": null,
	                "spB4Closing": null,
	                "paidByOthers": null,
	                "lenderStatus": false,
	                "gseDisplayLabelText": "",
	                "displayLabelText": "",
	                "feePaidToType": "",
	                "feePaidToTypeOtherDescription": "",
	                "integratedDisclosureSectionType": "Prepaids",
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
	                "displayLabel": "",
	                "gseDisplayLabel": "",
	                "escrowCollectedNumberOfMonthsCount": "",
	                "escrowItemType": "HomeownersInsurance",
	                "escrowItemTypeOtherDescription": "",
	                "escrowMonthlyPaymentAmount": "",
	                "feePaidToType": "",
	                "feePaidToTypeOtherDescription": "",
	                "integratedDisclosureSectionType": "",
	                "regulationZPointsAndFeesIndicator": "false",
	                "paymentIncludedInAPRIndicator": "false",
	                "bpAtClosing": "",
	                "bpB4Closing": null,
	                "spAtClosing": null,
	                "spB4Closing": null,
	                "paidByOthers": null,
	                "lenderStatus": false
	            },
	            {
	                "displayLabel": "",
	                "gseDisplayLabel": "",
	                "escrowCollectedNumberOfMonthsCount": "",
	                "escrowItemType": "MortgageInsurance",
	                "escrowItemTypeOtherDescription": "",
	                "escrowMonthlyPaymentAmount": "",
	                "feePaidToType": "",
	                "feePaidToTypeOtherDescription": "",
	                "integratedDisclosureSectionType": "",
	                "regulationZPointsAndFeesIndicator": "false",
	                "paymentIncludedInAPRIndicator": "false",
	                "bpAtClosing": "",
	                "bpB4Closing": null,
	                "spAtClosing": null,
	                "spB4Closing": null,
	                "paidByOthers": null,
	                "lenderStatus": false
	            },
	            {
	                "displayLabel": "Property Taxes",
	                "gseDisplayLabel": "",
	                "escrowCollectedNumberOfMonthsCount": "",
	                "escrowItemType": "",
	                "escrowItemTypeOtherDescription": "",
	                "escrowMonthlyPaymentAmount": "",
	                "feePaidToType": "",
	                "feePaidToTypeOtherDescription": "",
	                "integratedDisclosureSectionType": "",
	                "regulationZPointsAndFeesIndicator": "false",
	                "paymentIncludedInAPRIndicator": "false",
	                "bpAtClosing": "",
	                "bpB4Closing": null,
	                "spAtClosing": null,
	                "spB4Closing": null,
	                "paidByOthers": null,
	                "lenderStatus": false
	            },
	            {
	                "displayLabel": "",
	                "gseDisplayLabel": "",
	                "escrowCollectedNumberOfMonthsCount": "",
	                "escrowItemType": "",
	                "escrowItemTypeOtherDescription": "",
	                "escrowMonthlyPaymentAmount": "",
	                "feePaidToType": "",
	                "feePaidToTypeOtherDescription": "",
	                "integratedDisclosureSectionType": "",
	                "regulationZPointsAndFeesIndicator": "false",
	                "paymentIncludedInAPRIndicator": "false",
	                "bpAtClosing": "",
	                "bpB4Closing": null,
	                "spAtClosing": null,
	                "spB4Closing": null,
	                "paidByOthers": null,
	                "lenderStatus": false
	            }
	        ],
	        "otherCostsList":
	        [
	            {
	                "bpAtClosing": "",
	                "bpB4Closing": null,
	                "spAtClosing": null,
	                "spB4Closing": null,
	                "paidByOthers": null,
	                "lenderStatus": false,
	                "displayLabel": "",
	                "gseDisplayLabel": "",
	                "feePaidToFullName": "",
	                "feeActualTotalAmount": "",
	                "feePaidToType": "",
	                "feePaidToTypeOtherDescription": "",
	                "feePercentBasisType": "",
	                "feeTotalPercent": "",
	                "feeType": "",
	                "feeTypeOtherDescription": "",
	                "integratedDisclosureSectionType": "",
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
	"prorationsList" : [{
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
	          "integratedDisclosureSectionTotalAmount": "221495.00",
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
	          "integratedDisclosureSectionTotalAmount": "224737.00",
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
	          "integratedDisclosureSectionTotalAmount": "202800.00",
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
	          "integratedDisclosureSectionTotalAmount": "105552.00",
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
        "subsequentAdjustmentRule": null,
        "firstPerChangeMaximumIncreaseRatePercent": "",
        "firstPerChangeRateAdjustmentFrequencyMonthsCount": "",
        "subsequentPerChangeMaximumIncreaseRatePercent": null,
        "subsequentPerChangeRateAdjustmentFrequencyMonthsCount": null
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
        "subsequentAdjustmentRuleType": null,
        "subsequentPerChangeMaximumPrincipalAndInterestPaymentAmount": null,
        "subsequentPerChangeMinimumPrincipalAndInterestPaymentAmount": null,
        "subsequentPerChangePrincipalAndInterestPaymentAdjustmentFrequencyMonthsCount": null
    },
    "payment":
    {
        "partialPayments":
        {
            "partialPaymentModels":
            [
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
            "aprPercent": null,
            "feeSummaryTotalAmountFinancedAmount": null,
            "feeSummaryTotalFinanceChargeAmount": null,
            "feeSummaryTotalInterestPercent": null,
            "feeSummaryTotalOfAllPaymentsAmount": null,
            "deficiencyRightsPreservedIndicator":false
        },
        "qualifiedMortgage":
        {
            "regulationZExcludedBonaFideDiscountPointsIndicator": false,
            "regulationZExcludedBonaFideDiscountPointsPercent": null,
            "regulationZTotalAffiliateFeesAmount": null,
            "regulationZTotalLoanAmount": null,
            "regulationZTotalPointsAndFeesAmount": null,
            "averagePrimeOfferRatePercent": null,
            "abilityToRepayMethodType":null,
            "abilityToRepayExemptionReasonType":null
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
        }
    }
  
	};

 });