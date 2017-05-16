'use strict';

postLoginApp.controller('postLoginCtrl', function ($scope, $window, loginService, apiService, cdXML2JsonService, $log) {
    $scope.transactionType = 'new';
    $scope.purposeType = 'purchase';
    $scope.documentType = 'closingdisclosure';
    $scope.formType = 'standard';

    $('#SelectTransaction').modal('show');

    $scope.logUserOut = function() {
    	loginService.logout();
    	$window.location.href="login.html" + $window.location.search;
    }

    $scope.$watch('xmlfile', function(newValue, oldValue) {
         $scope.fileerror = undefined;
    });

    $scope.purposeTypeChange = function(){
        if($scope.purposeType == 'refinance'){
            $scope.formType = 'alternate';
        }
        else{
            $scope.formType = 'standard';
        }
    }
    
    $scope.clear = function() {
        if($scope.transactionType == 'new')
            $scope.purposeType = 'purchase';
        $scope.documentType = 'closingdisclosure';
        $scope.formType = 'standard';
        angular.element("input[type='file']").val('');
        $scope.xmlfile = undefined;
    }

    $scope.submit = function() {
        $("#spinner").show();
        if($scope.transactionType == 'new') {
            location.href = "index.html#/home?documentType="+$scope.documentType+"&purposeType="+$scope.purposeType+"&formType="+$scope.formType;
        } else if($scope.transactionType == 'existing') {
            if($scope.xmlfile != undefined && $scope.xmlfile != null) {
                cdXML2JsonService.getJsonFromXml($scope.xmlfile).success(function(data){
                    $scope.purposeType = data.termsOfLoan.loanPurposeType.toLowerCase();
                    localStorage.jsonData = JSON.stringify(data);
                    location.href = "index.html#/home?documentType="+$scope.documentType+"&purposeType="+$scope.purposeType+"&formType="+$scope.formType;
                }).error(function(data, status) {
                    $("#spinner").hide();
                });
            } else {
                $scope.fileerror = 'Please select valid xml file';
                $("#spinner").hide();
            }
        }
    }
});