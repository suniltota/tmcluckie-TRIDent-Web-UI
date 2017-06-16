'use strict';

postLoginApp.controller('postLoginCtrl', function ($scope, $window, loginService, apiService, cdJsonService, $log) {
    $scope.transactionType = 'new';
    $scope.purposeType = 'purchase';
    $scope.documentType = 'closingdisclosure';
    $scope.formType = 'standard';

    $('#SelectTransaction').modal('show');

    $scope.logUserOut = function() {
    	loginService.logout();
    	$window.location.href="login.html" + $window.location.search;
    }

    $scope.$watch('uploadfile', function(newValue, oldValue) {
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
        $scope.uploadfile = undefined;
    }

    $scope.submit = function() {
        $("#spinner").show();
        if($scope.transactionType == 'new') {
            location.href = "index.html#/home?documentType="+$scope.documentType+"&purposeType="+$scope.purposeType+"&formType="+$scope.formType;
        } else if($scope.transactionType == 'existing') {
            if($scope.uploadfile != undefined && $scope.uploadfile != null) {
                cdJsonService.getJsonFromXml($scope.uploadfile).success(function(data){
                    $scope.purposeType = data.termsOfLoan.loanPurposeType.toLowerCase();
                    if($scope.purposeType == 'purchase')
                       $scope.formType = 'standard';
                    localStorage.jsonData = JSON.stringify(data);
                    console.log(localStorage.jsonData);
                    location.href = "index.html#/home?documentType="+$scope.documentType+"&purposeType="+$scope.purposeType+"&formType="+$scope.formType;
                }).error(function(data, status) {
                    $("#spinner").hide();
                });
            } else {
                $scope.fileerror = 'Please select valid xml file';
                $("#spinner").hide();
            }
        } else if($scope.transactionType == 'textTemplate') {
            if($scope.uploadfile != undefined && $scope.uploadfile != null) {
                cdJsonService.getXMLFromTextTemplate($scope.uploadfile).success(function(xmldata) {
                    var xmlstring = $.parseXML( xmldata );
                    var $xml = $(xmlstring);
                    var UCD_DOCUMENT = $xml.find( "UCD_DOCUMENT" );
                    $.each(UCD_DOCUMENT, function() {
                        var xml = $(this).html();
                        cdJsonService.getJsonFromXml(xml).success(function(jsondata){
                            $scope.purposeType = jsondata.termsOfLoan.loanPurposeType.toLowerCase();
                            if($scope.purposeType == 'purchase')
                               $scope.formType = 'standard';
                            localStorage.jsonData = JSON.stringify(jsondata);
                            console.log(localStorage.jsonData);
                            location.href = "index.html#/home?documentType="+$scope.documentType+"&purposeType="+$scope.purposeType+"&formType="+$scope.formType;
                        }).error(function(data, status) {
                            $("#spinner").hide();
                        });
                    });
                }).error(function(data, status) {
                    $("#spinner").hide();
                });
            } else {
                $scope.fileerror = 'Please select valid template file';
                $("#spinner").hide();
            }
        }
    }
});