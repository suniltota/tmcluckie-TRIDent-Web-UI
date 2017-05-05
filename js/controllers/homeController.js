'use strict';

app.controller('homeCtrl', function ($scope, $routeParams, $location) {

	if($routeParams.transactionType != undefined) {
		localStorage.loanTransactionType = $routeParams.transactionType;
	}
	if($routeParams.purposeType != undefined) {
		localStorage.loanPurposeType = $routeParams.purposeType;
	}
	if($routeParams.formType != undefined) {
		localStorage.loanFormType = $routeParams.formType;
	}
	if($routeParams.documentType == 'LoanEstimate') {
		$location.url( "/loanEstimate" );
	} else {
		$location.url( "/closingDisclosure");
	}

});