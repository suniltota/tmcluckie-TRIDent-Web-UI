app.controller('clientCtrl', function($rootScope, $scope, $window, apiService) {

    $scope.addEditClient = {};
    $scope.clientList = {};
    $scope.parentClientListUnderAdmin = [];

    $scope.newAdminTab = function(content) {
        $scope.viewContent = content; //'addClient';        
        if (content == 'viewClient' && $scope.clientList && !$scope.clientList.length) {
            $("#spinner").show();
            $scope.getClientData();
        } else if (content == 'addClient') {
            $scope.addEditClient = {
                'enabled': true
            };
        }
    }
    $rootScope.$on("loadClientData", function() {
        $scope.getClientData();
    });
    $scope.getClientData = function() {
        apiService.request({
            apiMethod: 'actualize/transformx/clients',
            httpMethod: 'GET'
        }).success(function(data, status) {
            $scope.clientList = data;
            $scope.parentClientListUnderAdmin = [];
            for (var i = 0; i < data.length; i++) {
                $scope.parentClientListUnderAdmin.push({
                    "clientId": data[i].clientId,
                    "clientName": data[i].clientName
                });
            }
            $scope.prntClient = $scope.parentClientListUnderAdmin[0];
            $("#spinner").hide();
        }).error(function(data, status) {
            $("#spinner").hide();
            console.log("API  'actualize/transformx/clients' Error: " + data);
        });
    }

    $scope.saveClient = function() {
        if ($scope.addEditClient.clientName) {
            var clientContactDetails = [];
            if ($scope.addEditClient.techContactInfo) {
                var contactInfo = {
                    "contactType": "TECNICAL",
                    "name": $scope.addEditClient.techContactInfo.name,
                    "email": $scope.addEditClient.techContactInfo.email,
                    "phone": $scope.addEditClient.techContactInfo.pno
                };
                clientContactDetails.push(contactInfo);
            }
            if ($scope.addEditClient.bussContactInfo) {
                var businessContactInfo = {
                    "contactType": "BUSINESS",
                    "name": $scope.addEditClient.bussContactInfo.name,
                    "email": $scope.addEditClient.bussContactInfo.email,
                    "phone": $scope.addEditClient.bussContactInfo.pno
                };
                clientContactDetails.push(businessContactInfo);
            }
            $scope.clientDetails = {
                "clientId": $scope.addEditClient.clientId,
                "clientName": $scope.addEditClient.clientName,
                "address": $scope.addEditClient.address,
                "phoneNumber": $scope.addEditClient.phoneNumber,
                "clientContactInfo": clientContactDetails,
                "servicesModel": [],
                "enabled": $scope.addEditClient.enabled
            };
            $("#spinner").show();
            var httpMethod = $scope.addEditClient.clientId ? 'PUT' : 'POST';
            apiService.request({
                apiMethod: 'actualize/transformx/clients',
                formData: $scope.clientDetails,
                httpMethod: httpMethod
            }).success(function(data, status) {
                $scope.getClientData();
                $("#spinner").hide();
                $scope.newAdminTab('viewClient');
            }).error(function(data, status) {
                $("#spinner").hide();
                console.log("API  'actualize/transformx/clients' Error: " + data);
            });
        } else {
            $scope.clientError = 'Please provide client name.'
        }
    }

    $scope.editClient = function(clientId) {
        $("#spinner").show();
        $scope.newAdminTab('addClient');
        apiService.request({
            apiMethod: 'actualize/transformx/clients/' + clientId,
            httpMethod: 'GET'
        }).success(function(data, status) {
            $scope.addEditClient = data;
            $scope.addEditClient['techContactInfo'] = {};
            $scope.addEditClient['bussContactInfo'] = {};
            for (var i = 0; i < $scope.addEditClient.clientContactInfo.length; i++) {
                var contactInfo = $scope.addEditClient.clientContactInfo[i];
                if (contactInfo.contactType == 'TECNICAL') {
                    $scope.addEditClient.techContactInfo.name = contactInfo.name;
                    $scope.addEditClient.techContactInfo.email = contactInfo.email;
                    $scope.addEditClient.techContactInfo.pno = contactInfo.phone;
                } else if (contactInfo.contactType == 'BUSINESS') {
                    $scope.addEditClient.bussContactInfo.name = contactInfo.name;
                    $scope.addEditClient.bussContactInfo.email = contactInfo.email;
                    $scope.addEditClient.bussContactInfo.pno = contactInfo.phone;
                }
            }
            $("#spinner").hide();
        }).error(function(data, status) {
            $("#spinner").hide();
            console.log("API  editClient Error: " + data);
        });
    }

    $scope.deleteClient = function(clientId) {
        $("#spinner").show();
        apiService.request({
            apiMethod: 'actualize/transformx/clients/' + clientId,
            httpMethod: 'DELETE'
        }).success(function(data, status) {
            console.log("API actualize/transformx/clients : " + data);
            //$scope.groupList = data;
            $window.alert(data);
            $scope.getClientData();
            $("#spinner").hide();
        }).error(function(data, status) {
            $("#spinner").hide();
            console.log("API  'actualize/transformx/clients' Error: " + data);
        });
    }

    $scope.adminTableSearch = function() {
            var input, filter, table, tr, td, i;
            input = document.getElementById("clientSearch");
            filter = input.value.toUpperCase();
            table = document.getElementById("clientTable");
            tr = table.getElementsByTagName("tr");
            for (i = 0; i < tr.length; i++) {
              td = tr[i];
              if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                  tr[i].style.display = "";
                } else {
                  tr[i].style.display = "none";
                }
              }       
            }

        }

    $scope.availableClientPermissions = [{
        serviceId: "a041cfee-7c22-11e7-bb31-be2e44b06b34",
        serviceName: "JSONTOCDPDF",
        serviceDisplayName: "JSON to CD PDF"
    }, {
        serviceId: "a041d11a-7c22-11e7-bb31-be2e44b06b34",
        serviceName: "JSONTOLEPDF",
        serviceDisplayName: "JSON to LE PDF"
    }, {
        serviceId: "a041d2d2-7c22-11e7-bb31-be2e44b06b34",
        serviceName: "JSONTOCDJSONWithCalculations",
        serviceDisplayName: "JSON to CD JSON with Calculations"
    }];
    $scope.availableClientNmaes = $scope.availableClientPermissions;
    $scope.availableClientPermissionsName = function(availableClientPermissions) {
        return availableClientPermissions.serviceDisplayName;
    };

    $scope.getClientData();
    $("#spinner").show();
});


