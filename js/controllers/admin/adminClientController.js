app.controller('clientCtrl', function($rootScope, $scope, $window, apiService) {

    $scope.addEditClient = {};
    $scope.clientList = {};
    $scope.parentClientListUnderAdmin = [];
    $scope.originalavailableClientPermissions = [];

    $scope.originalavailableBussinessPermissions = [];

    $scope.GrantedClientPermissions = [];
    $scope.GrantedClientNmaes = $scope.GrantedClientPermissions;
    $scope.GrantedClientPermissionsName = function(GrantedGroupPermission) {
        return GrantedGroupPermission.serviceDisplayName;
    };

    $scope.GrantedBussinessPermissions = [];
    $scope.GrantedBussinessNmaes = $scope.GrantedBussinessPermissions;
    $scope.GrantedBussinessPermissionsName = function(GrantedBussinessPermission) {
        return GrantedBussinessPermission.serviceDisplayName;
    };


    $scope.newAdminTab = function(content) {
        $scope.viewContent = content; //'addClient';        
        if (content == 'viewClient' && $scope.clientList && !$scope.clientList.length) {
            $("#spinner").show();
            $scope.getClientData(true);
        } else if (content == 'addClient') {
            $scope.addEditClient = {
                'enabled': true
            };
            $scope.resetAddEditClientData();
        }
    }
    $rootScope.$on("loadClientData", function() {
        $scope.getClientData(false);
    });

    $scope.resetAddEditClientData = function() {
        console.log("Length of $scope.originalavailableClientPermissions : " + $scope.originalavailableClientPermissions.length);
        $scope.availableClientPermissions = $scope.originalavailableClientPermissions;
        $scope.GrantedClientPermissions = [];
        $scope.availableBussinessPermissions = $scope.originalavailableBussinessPermissions;
        $scope.GrantedBussinessPermissions = [];
    }

    $scope.getPermissionsData = function() {
        $("#spinner").show();
        apiService.request({
            apiMethod: 'actualize/transformx/services',
            httpMethod: 'GET'
        }).success(function(data, status) {
            $scope.originalavailableClientPermissions = data;
            $scope.availableClientPermissions = data;
            $scope.availableClientNmaes = $scope.availableClientPermissions;
            $scope.availableClientPermissionsName = function(availableClientPermissions) {
                return availableClientPermissions.serviceDisplayName;
            };
            //$("#spinner").hide();
        }).error(function(data, status) {
            $("#spinner").hide();
            console.log("API  'actualize/transformx/services' Error: " + data);
        });

        apiService.request({
            apiMethod: 'actualize/transformx/investors',
            httpMethod: 'GET'
        }).success(function(data, status) {
            $scope.availableBussinessPermissions = data;
            $scope.originalavailableBussinessPermissions = data;
            $scope.availableBussinessNmaes = $scope.availableBussinessPermissions;
            $scope.availableBussinessPermissionsName = function(availableBussinessPermissions) {
                return availableBussinessPermissions.investorName;
            };
            //$("#spinner").hide();
        }).error(function(data, status) {
            $("#spinner").hide();
            console.log("API  'actualize/transformx/investors' Error: " + data);
        });
    }


    $scope.getPermissionsData();
    $scope.getClientData = function(reLoad) {
        if (reLoad || ($scope.clientList && !$scope.clientList.length)) {
            $("#spinner").show();
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
        } else
            $("#spinner").hide();
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
                "servicesModel": ($scope.GrantedClientPermissions && $scope.GrantedClientPermissions.length > 0) ? $scope.GrantedClientPermissions : [],
                "investorModels": ($scope.GrantedBussinessPermissions && $scope.GrantedBussinessPermissions.length > 0) ? $scope.GrantedBussinessPermissions : [],
                "enabled": true
            };
            $("#spinner").show();
            var httpMethod = $scope.addEditClient.clientId ? 'PUT' : 'POST';
            apiService.request({
                apiMethod: 'actualize/transformx/clients',
                formData: $scope.clientDetails,
                httpMethod: httpMethod
            }).success(function(data, status) {
                $window.alert(data);
                $scope.getClientData(true);
                $scope.newAdminTab('viewClient');
            }).error(function(data, status) {
                $("#spinner").hide();
                console.log("API  'actualize/transformx/clients' Error: " + data);
            });
        } else {
            $scope.clientError = 'Please provide client name.'
        }
    }

    $scope.editClient = function(selectedClient) {
        $("#spinner").show();
        $scope.newAdminTab('addClient');
        $scope.resetAddEditClientData();

        apiService.request({
            apiMethod: 'actualize/transformx/clients/' + selectedClient.clientId,
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
            $scope.verifyExistedClientInfoPermissions(data.servicesModel);
            $scope.verifyExistedBussinessInfoPermissions(data.investorModels);
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
            $window.alert(data);
            $scope.getClientData(true);
        }).error(function(data, status) {
            $("#spinner").hide();
            console.log("deleteClient API  'actualize/transformx/clients' : " + data);
        });
    }

    $scope.activateClient = function(clientId) {
        $("#spinner").show();
        apiService.request({
            apiMethod: 'actualize/transformx/clients/active/' + clientId,
            httpMethod: 'POST'
        }).success(function(data, status) {
            $window.alert(data);
            $("#spinner").hide();
            $scope.getClientData(true);
        }).error(function(data, status) {
            $("#spinner").hide();
            console.log("API  activateClient Error: " + data);
        });
    }

    $scope.listbox_moveRight_clientInfo = function(sourceID, destID) {
        var src = document.getElementById(sourceID);
        var dest = document.getElementById(destID);

        for (var count = 0; count < src.options.length; count++) {

            if (src.options[count].selected == true) {
                var option = src.options[count];

                var newOption = document.createElement("option");
                newOption.value = option.value;
                newOption.text = option.text;
                newOption.selected = true;
                try {
                    dest.add(newOption, null); //Standard
                    src.remove(count, null);
                } catch (error) {
                    dest.add(newOption); // IE only
                    src.remove(count);
                }
                count--;

            }

        }
        $scope.availableClientPermissions = [];
        $scope.GrantedClientPermissions = [];
        for (var i = 0; i < src.options.length; i++) {
            $scope.availableClientPermissions.push({
                "serviceId": src.options[i].value.replace("string:", ""),
                "serviceDisplayName": src.options[i].text
            });
        }

        for (var j = 0; j < dest.options.length; j++) {
            $scope.GrantedClientPermissions.push({
                "serviceId": dest.options[j].value.replace("string:", ""),
                "serviceDisplayName": dest.options[j].text
            });
        }
        $scope.availableClientNmaes = $scope.availableClientPermissions;
        $scope.availableClientPermissionsName = function(availableClientPermissions) {
            return availableClientPermissions.serviceDisplayName;
        };

        $scope.GrantedClientNmaes = $scope.GrantedClientPermissions;
        $scope.GrantedClientPermissionsName = function(GrantedGroupPermission) {
            return GrantedGroupPermission.serviceDisplayName;
        };

    }

    $scope.verifyExistedClientInfoPermissions = function(item) {

        console.log("verify 0 Length of $scope.originalavailableClientPermissions : " + $scope.originalavailableClientPermissions.length);

        $scope.GrantedClientPermissions = item;
        var tempPermission = angular.copy($scope.availableClientPermissions);
        for (var i = tempPermission.length - 1; i >= 0; i--) {
            for (var j = 0; j < item.length; j++) {
                if ($scope.availableClientPermissions[i] && ($scope.availableClientPermissions[i].serviceId === item[j].serviceId)) {
                    tempPermission.splice(i, 1);
                }
            }
        }
        $scope.availableClientPermissions = tempPermission;

        $("#spinner").hide();
    }


    $scope.listbox_moveLeft_clientInfo = function(sourceID, destID) {
        var src = document.getElementById(sourceID);
        var dest = document.getElementById(destID);

        for (var count = 0; count < src.options.length; count++) {

            if (src.options[count].selected == true) {
                var option = src.options[count];

                var newOption = document.createElement("option");
                newOption.value = option.value;
                newOption.text = option.text;
                newOption.selected = true;
                try {
                    dest.add(newOption, null); //Standard
                    src.remove(count, null);
                } catch (error) {
                    dest.add(newOption); // IE only
                    src.remove(count);
                }
                count--;

            }

        }
        $scope.availableClientPermissions = [];
        $scope.GrantedClientPermissions = [];
        for (var i = 0; i < src.options.length; i++) {
            $scope.GrantedClientPermissions.push({
                "serviceId": src.options[i].value.replace("string:", ""),
                "serviceDisplayName": src.options[i].text
            });
        }

        for (var j = 0; j < dest.options.length; j++) {
            $scope.availableClientPermissions.push({
                "serviceId": dest.options[j].value.replace("string:", ""),
                "serviceDisplayName": dest.options[j].text
            });
        }
        $scope.availableClientNmaes = $scope.availableClientPermissions;
        $scope.availableClientPermissionsName = function(availableClientPermissions) {
            return availableClientPermissions.serviceDisplayName;
        };

        $scope.GrantedClientNmaes = $scope.GrantedClientPermissions;
        $scope.GrantedClientPermissionsName = function(GrantedGroupPermission) {
            return GrantedGroupPermission.serviceDisplayName;
        };

    }

    $scope.listbox_moveRight_bussinessInfo = function(sourceID, destID) {
        var src = document.getElementById(sourceID);
        var dest = document.getElementById(destID);

        for (var count = 0; count < src.options.length; count++) {

            if (src.options[count].selected == true) {
                var option = src.options[count];

                var newOption = document.createElement("option");
                newOption.value = option.value;
                newOption.text = option.text;
                newOption.selected = true;
                try {
                    dest.add(newOption, null); //Standard
                    src.remove(count, null);
                } catch (error) {
                    dest.add(newOption); // IE only
                    src.remove(count);
                }
                count--;

            }

        }
        $scope.availableBussinessPermissions = [];
        $scope.GrantedBussinessPermissions = [];
        for (var i = 0; i < src.options.length; i++) {
            $scope.availableBussinessPermissions.push({
                "investorId": src.options[i].value.replace("string:", ""),
                "investorName": src.options[i].text
            });
        }

        for (var j = 0; j < dest.options.length; j++) {
            $scope.GrantedBussinessPermissions.push({
                "investorId": dest.options[j].value.replace("string:", ""),
                "investorName": dest.options[j].text
            });
        }
        $scope.availableBussinessNmaes = $scope.availableBussinessPermissions;
        $scope.availableBussinessPermissionsName = function(availableBussinessPermissions) {
            return availableBussinessPermissions.investorName;
        };

        $scope.GrantedBussinessNmaes = $scope.GrantedBussinessPermissions;
        $scope.GrantedBussinessPermissionsName = function(GrantedBussinessPermission) {
            return GrantedBussinessPermission.investorName;
        };

    }

    $scope.verifyExistedBussinessInfoPermissions = function(item) {

        $scope.GrantedBussinessPermissions = item;
        var tempPermission = angular.copy($scope.availableBussinessPermissions);
        for (var i = $scope.availableBussinessPermissions.length - 1; i >= 0; i--) {
            for (var j = 0; j < item.length; j++) {
                if ($scope.availableBussinessPermissions[i] && ($scope.availableBussinessPermissions[i].investorId === item[j].investorId)) {
                    tempPermission.splice(i, 1);
                }
            }
        }
        $scope.availableBussinessPermissions = tempPermission;
        $("#spinner").hide();
    }

    $scope.listbox_moveLeft_bussinessInfo = function(sourceID, destID) {
        var src = document.getElementById(sourceID);
        var dest = document.getElementById(destID);

        for (var count = 0; count < src.options.length; count++) {

            if (src.options[count].selected == true) {
                var option = src.options[count];

                var newOption = document.createElement("option");
                newOption.value = option.value;
                newOption.text = option.text;
                newOption.selected = true;
                try {
                    dest.add(newOption, null); //Standard
                    src.remove(count, null);
                } catch (error) {
                    dest.add(newOption); // IE only
                    src.remove(count);
                }
                count--;

            }

        }
        $scope.availableBussinessPermissions = [];
        $scope.GrantedBussinessPermissions = [];
        for (var i = 0; i < src.options.length; i++) {
            $scope.GrantedBussinessPermissions.push({
                "investorId": src.options[i].value.replace("string:", ""),
                "investorName": src.options[i].text
            });
        }

        for (var j = 0; j < dest.options.length; j++) {
            $scope.availableBussinessPermissions.push({
                "investorId": dest.options[j].value.replace("string:", ""),
                "investorName": dest.options[j].text
            });
        }
        $scope.availableBussinessNmaes = $scope.availableBussinessPermissions;
        $scope.availableBussinessPermissionsName = function(availableBussinessPermissions) {
            return availableBussinessPermissions.investorName;
        };

        $scope.GrantedBussinessNmaes = $scope.GrantedBussinessPermissions;
        $scope.GrantedBussinessPermissionsName = function(GrantedBussinessPermission) {
            return GrantedBussinessPermission.investorName;
        };

    }

    $scope.getClientData(true);
    $("#spinner").show();
});