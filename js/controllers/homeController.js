'use strict';

app.controller('homeCtrl', function ($scope, $routeParams, $location, staticData) {

	if($routeParams.transactionType != undefined) {
		staticData.basicLoanInfo.loanTransactionType = $routeParams.transactionType;
	}
	if($routeParams.purposeType != undefined) {
		staticData.basicLoanInfo.loanPurposeType = $routeParams.purposeType;
	}
	if($routeParams.formType != undefined) {
		staticData.basicLoanInfo.loanFormType = $routeParams.formType;
	}
	if($routeParams.documentType == 'LoanEstimate') {
		$location.url( "/loanEstimate" );
	} else {
		$location.url( "/closingDisclosure");
	}

});