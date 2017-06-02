'use strict';

app.controller('homeCtrl', function ($scope, $routeParams, $location) {
	$("#spinner").show();
	if($routeParams.purposeType != undefined) {
		localStorage.loanPurposeType = $routeParams.purposeType;
	}
	if($routeParams.formType != undefined) {
		localStorage.loanFormType = $routeParams.formType;
	}
	if($routeParams.documentType == 'loanestimate') {
		localStorage.documentType = $routeParams.documentType;
		$location.url( "/loanEstimate" );
	} else {
		$location.url( "/closingDisclosure");
	}

});