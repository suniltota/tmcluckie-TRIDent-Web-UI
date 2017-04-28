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

    $scope.clear = function() {
        if($scope.transactionType == 'new')
            $scope.purposeType = 'purchase';
        $scope.documentType = 'closingdisclosure';
        $scope.formType = 'standard';
    }

    $scope.submit = function() {
        if($scope.transactionType == 'new') {
            location.href = "index.html#/home?transactionType="+$scope.transactionType+"&documentType="+$scope.documentType+"&purposeType="+$scope.purposeType+"&formType="+$scope.formType;
        } else if($scope.transactionType == 'existing') {
            cdXML2JsonService.getJsonFromXml($scope.xmlfile).success(function(data){
                $scope.purposeType = data.loanInformation.purpose.toLowerCase();
                localStorage.jsonData = JSON.stringify(data);
                location.href = "index.html#/home?transactionType="+$scope.transactionType+"&documentType="+$scope.documentType+"&purposeType="+$scope.purposeType+"&formType="+$scope.formType;
            });
        }
    }
});