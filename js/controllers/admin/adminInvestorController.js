app.controller('investorCtrl', function($rootScope, $scope, $window, apiService) {

    $scope.viewContent = 'viewInvestor';
    $scope.investorList = {};

    $scope.newAdminTab = function(content) {
        $scope.viewContent = content; //'addClient';        
        if (content == 'viewInvestor' && $scope.investorList && !$scope.investorList.length) {
            $("#spinner").show();
            $scope.getInvestorData(true);
        } else if (content == 'addInvestor') {
            $scope.addEditInvestor = {};
        }
    }

    $rootScope.$on("loadInvestorData", function() {
        $scope.getInvestorData(false);
    });

    $scope.getInvestorData = function(reLoad) {
    	if (reLoad || ($scope.investorList && !$scope.investorList.length)) {
	        apiService.request({
	            apiMethod: 'actualize/transformx/investors',
	            httpMethod: 'GET'
	        }).success(function(data, status) {
	            $scope.investorList = data;
	            $scope.parentInvestorListUnderAdmin = [];
	            for (var i = 0; i < data.length; i++) {
	                $scope.parentInvestorListUnderAdmin.push({
	                    "investorId": data[i].investorId,
	                    "investorName": data[i].investorName
	                });
	            }
	            $scope.prntInvestor = $scope.parentInvestorListUnderAdmin[0];
	            $("#spinner").hide();
	        }).error(function(data, status) {
	            $("#spinner").hide();
	            console.log("API  'actualize/transformx/investors' Error: " + data);
	        });
	    }else
            $("#spinner").hide();
    }

    $scope.saveInvestor = function() {
        if (!$scope.addEditInvestor.length) {
            $scope.investorDetails = {
                "investorName": $scope.addEditInvestor.investorName,
                "investorUrl": $scope.addEditInvestor.investorUrl,
                "srevicesModel": $scope.addEditInvestor.srevicesModel
            };
            $("#spinner").show();
            apiService.request({
                apiMethod: 'actualize/transformx/investors',
                formData: $scope.investorDetails,
                httpMethod: 'POST'
            }).success(function(data, status) {

                $scope.getInvestorData(true);
                $("#spinner").hide();
                $scope.newAdminTab('viewInvestor');
            }).error(function(data, status) {
                $("#spinner").hide();
            });


        }
    }


    $scope.deleteInvestor = function(investorId) {
        $("#spinner").show();
        apiService.request({
            apiMethod: 'actualize/transformx/investors/' + investorId,
            httpMethod: 'DELETE'
        }).success(function(data, status) {
            //$scope.groupList = data;
            $scope.getInvestorData(true);
            $("#spinner").hide();
        }).error(function(data, status) {
            $("#spinner").hide();
        });
    }

});