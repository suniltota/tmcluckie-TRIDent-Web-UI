'use strict';

postLoginApp.controller('postLoginCtrl', function ($scope, $window, loginService, apiService, cdJsonService,leJsonService, $log) {
    $scope.transactionType = 'new';
    $scope.purposeType = 'purchase';
    $scope.documentType = 'closingdisclosure';
    $scope.formType = 'standard';

    //$('#SelectTransaction').modal('show');

    $scope.logUserOut = function() {
        apiService.request({apiMethod: "logout",httpMethod: 'POST'});
        $window.location.href="login.html" + $window.location.search;
        loginService.logout();
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
    
    $scope.adminUser = function(){
        location.href = "index.html#/admin";
    }

    $scope.clear = function() {
        if($scope.transactionType == 'new')
            $scope.purposeType = 'purchase';
        $scope.documentType = 'closingdisclosure';
        $scope.formType = 'standard';
        angular.element("input[type='file']").val('');
        $scope.uploadfile = undefined;
    }

    $scope.docDetails = function(){

        $('#ChooseFormType').modal('hide');
        localStorage.removeItem("jsonData");
        localStorage.documentType = $scope.documentType;
        localStorage.loanPurposeType = $scope.purposeType;
        localStorage.loanFormType = $scope.formType;
        angular.element($("#menuCtrlId")).scope().documentType = $scope.documentType;
    }

    $scope.submit = function() {
        $("#spinner").show();
        if($scope.transactionType == 'new') {
            $scope.docDetails();
            location.href = "index.html#/home?documentType="+$scope.documentType+"&purposeType="+$scope.purposeType+"&formType="+$scope.formType;
        } else if($scope.transactionType == 'existing') {
            if($scope.uploadfile != undefined && $scope.uploadfile != null) {
                 if($scope.documentType=='closingdisclosure') { 
                cdJsonService.getJsonFromXml($scope.uploadfile).success(function(data){
                    $scope.purposeType = data.termsOfLoan.loanPurposeType.toLowerCase();
                    $scope.loanformtype = data.closingDisclosureDocDetails.formType;
                    if($scope.purposeType == 'purchase'){
                       $scope.formType = 'standard';
                    }
                    else if($scope.purposeType == 'refinance'){
                        if($scope.loanformtype == 'AlternateForm'){
                            $scope.formType = 'alternate';
                        }else if($scope.loanformtype == 'ModelForm'){
                            $scope.formType = 'standard';
                        }
                    }
                    $scope.docDetails();
                    localStorage.jsonData = JSON.stringify(data);
                    console.log(localStorage.jsonData);
                    location.href = "index.html#/home?documentType="+$scope.documentType+"&purposeType="+$scope.purposeType+"&formType="+$scope.formType;
                }).error(function(data, status) {
                    $scope.fileerror = 'There is a problem with xml file. Please select valid xml file';
                    $("#spinner").hide();
                });
            }else{
                leJsonService.getLeJsonFromXml($scope.uploadfile).success(function(data){
                   console.log(JSON.stringify(data));
                    $scope.purposeType = data.termsOfLoan.loanPurposeType.toLowerCase();
                    $scope.loanformtype = data.loanEstimateDocDetails.formType;
                    if($scope.purposeType == 'purchase'){
                       $scope.formType = 'standard';
                    }
                    else if($scope.purposeType == 'refinance'){
                        if($scope.loanformtype == 'AlternateForm'){
                            $scope.formType = 'alternate';
                        }else if($scope.loanformtype == 'ModelForm'){
                            $scope.formType = 'standard';
                        }
                    }
                    $scope.docDetails();
                    localStorage.jsonData = JSON.stringify(data);
                    location.href = "index.html#/home?documentType="+$scope.documentType+"&purposeType="+$scope.purposeType+"&formType="+$scope.formType;
                }).error(function(data, status) {
                    $scope.fileerror = 'There is a problem with xml file. Please select valid xml file';
                    $("#spinner").hide();
                });
            }
            } else {
                $scope.fileerror = 'Please select valid xml file';
                $("#spinner").hide();
            }
        } else if($scope.transactionType == 'textTemplate') {
            if($scope.uploadfile != undefined && $scope.uploadfile != null) {
                if($scope.documentType=='closingdisclosure') {
                    cdJsonService.generateJsonFromTemplate($scope.uploadfile).success(function(jsondata) {
                        $scope.purposeType = jsondata.termsOfLoan.loanPurposeType.toLowerCase();
                        $scope.loanformtype = jsondata.closingDisclosureDocDetails.formType;
                        if($scope.purposeType == 'purchase'){
                           $scope.formType = 'standard';
                        } else if($scope.purposeType == 'refinance'){
                            if($scope.loanformtype == 'AlternateForm'){
                                $scope.formType = 'alternate';
                            } else if($scope.loanformtype == 'ModelForm'){
                                $scope.formType = 'standard';
                            }
                        }
                        $scope.docDetails();
                        localStorage.jsonData = JSON.stringify(jsondata);
                        console.log(localStorage.jsonData);
                        location.href = "index.html#/home?documentType="+$scope.documentType+"&purposeType="+$scope.purposeType+"&formType="+$scope.formType;
                    }).error(function(data, status) {
                        $scope.fileerror = 'There is a problem with template file. Please select valid template file';
                        $("#spinner").hide();
                    });
                } else {
                    leJsonService.generateJsonFromTemplate($scope.uploadfile).success(function(jsondata) {
                        $scope.purposeType = jsondata.termsOfLoan.loanPurposeType.toLowerCase();
                        $scope.loanformtype = jsondata.loanEstimateDocDetails.formType;
                        if($scope.purposeType == 'purchase'){
                           $scope.formType = 'standard';
                        } else if($scope.purposeType == 'refinance'){
                            $scope.formType = 'alternate';
                            if($scope.loanformtype == 'AlternateForm'){
                                $scope.formType = 'alternate';
                            } else if($scope.loanformtype == 'ModelForm'){
                                $scope.formType = 'standard';
                            }
                        }
                        $scope.docDetails();
                        localStorage.jsonData = JSON.stringify(jsondata);
                        location.href = "index.html#/home?documentType="+$scope.documentType+"&purposeType="+$scope.purposeType+"&formType="+$scope.formType;
                    }).error(function(data, status) {
                        $scope.fileerror = 'There is a problem with template file. Please select valid template file';
                        $("#spinner").hide();
                    });
                }
            } else {
                $scope.fileerror = 'Please select valid template file';
                $("#spinner").hide();
            }
        }
    }
});