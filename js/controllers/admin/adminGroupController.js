app.controller('groupCtrl', function($rootScope, $scope, $window, apiService) {
    $scope.viewContent = 'viewGroup';
    $scope.groupList = {};
    $scope.userRole = JSON.parse(localStorage.userDetails).user.role.roleName;
    $scope.groupNameExisted = true;
    $scope.selectedEditGroupName = "";

    $scope.originalAvailableGroupPermissions = [{
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
    $scope.pwdExpList = [{
        "value": 10,
        "label": "10 days"
    }, {
        "value": 20,
        "label": "20 days"
    }, {
        "value": 30,
        "label": "30 days"
    }];
    $scope.pwdExp = $scope.pwdExpList[2];
    $scope.sessTOutList = [{
        "value": 10,
        "label": "10 Minutes"
    }, {
        "value": 20,
        "label": "20 Minutes"
    }, {
        "value": 30,
        "label": "30 Minutes"
    }, {
        "value": 40,
        "label": "40 Minutes"
    }, {
        "value": 50,
        "label": "50 Minutes"
    }, {
        "value": 60,
        "label": "60 Minutes"
    }];
    $scope.sessTOut = $scope.sessTOutList[2];
    /*$scope.availableGroupPermissions = $scope.originalAvailableGroupPermissions;
    $scope.availableGroupNmaes = $scope.availableGroupPermissions;
    $scope.availableGroupPermissionsName = function(availableGroupPermissions) {
        return availableGroupPermissions.serviceDisplayName;
    };*/

    $scope.GrantedGroupPermissions = [];
    $scope.GrantedGroupNmaes = $scope.GrantedGroupPermissions;
    $scope.GrantedGroupPermissionsName = function(GrantedGroupPermission) {
        return GrantedGroupPermission.serviceDisplayName;
    };
    $scope.newAdminTab = function(content) {
        $scope.viewContent = content; //'addClient';        
        if (content == 'viewGroup' && $scope.groupList && !$scope.groupList.length) {
            $("#spinner").show();
            $scope.getGroupData();
        } else if (content == 'addGroup') {     
            $scope.selectedEditGroupName = "";       
            $scope.groupNameExisted = true;
            $scope.addEditGroup = {};
        }
    }
    $rootScope.$on("loadGroupData", function() {
        $scope.getGroupData(false);
    });
    $scope.getPermissions = function(type, id){
        var apiServiceStr = "";
        if(!id) 
          apiServiceStr = 'actualize/transformx/services';
        else if(type == "client")
          apiServiceStr = 'clients/services/'+id;
        else if(type == "parent")
          apiServiceStr = 'groups/services/'+id;

        apiService.request({
            apiMethod: apiServiceStr,
            httpMethod: 'GET'
        }).success(function(data, status) {               
            $scope.originalAvailableGroupPermissions = data;
            $scope.availableGroupPermissions = data;
            $scope.availableGroupNmaes = $scope.availableGroupPermissions;
            $scope.availableGroupPermissionsName = function(availableGroupPermissions) {
                return availableGroupPermissions.serviceDisplayName;
            };  
            //$("#spinner").hide();
        }).error(function(data, status) {
            $("#spinner").hide();
            console.log("getPermissions clients Error: " + data);
        });
    }
    $scope.getPermissions("client");
    $scope.getGroupData = function(reLoad) {
        if (reLoad || ($scope.groupList && !$scope.groupList.length)) {
            $("#spinner").show();
            apiService.request({
                apiMethod: 'actualize/transformx/groups',
                httpMethod: 'GET'
            }).success(function(data, status) {
                $scope.groupList = data;
                $scope.parentGroupListUnderAdmin = [];
                $scope.parentGroupListUnderAdmin.push({
                    "groupId": JSON.parse(localStorage.userDetails).user.clientId,
                    "groupName": "---Select---"
                });
                for (var i = 0; i < data.length; i++) {
                    $scope.parentGroupListUnderAdmin.push({
                        "groupId": data[i].groupId,
                        "groupName": data[i].groupName
                    });
                }
                $scope.prntGrp = $scope.parentGroupListUnderAdmin[0];
                $("#spinner").hide();
            }).error(function(data, status) {
                $("#spinner").hide();
                console.log("API  'actualize/transformx/groups' Error: " + data);
            });
        } else
            $("#spinner").hide();
    }
    $scope.parentGroupChange = function(selectedGroup) {
        $scope.prntGrp = selectedGroup;
        /*if(selectedGroup.groupId == JSON.parse(localStorage.userDetails).user.clientId)
            $scope.getPermissions("client", selectedGroup.groupId);
        else
            $scope.getPermissions("parent", selectedGroup.groupId);*/
    }
    $scope.saveGroup = function() {
        if (!$scope.addEditGroup.length) {
            $scope.groupDetails = {
                "groupId": ($scope.addEditGroup.groupId) ? $scope.addEditGroup.groupId : "",
                "groupName": $scope.addEditGroup.groupName,
                "groupParentId": $scope.prntGrp.groupId,
                "sessionTimeOut": $scope.sessTOut.value,
                "passwordExpireDays": $scope.pwdExp.value,
                "services": $scope.GrantedGroupPermissions,
                "enabled": true,
                "clientId": "a00deb64-7832-11e7-b5a5-be2e44b06b34"//JSON.parse(localStorage.userDetails).user.clientId
            };
            $("#spinner").show();
            if ($scope.addEditGroup.groupId) {
                apiService.request({
                    apiMethod: 'actualize/transformx/groups',
                    formData: $scope.groupDetails,
                    httpMethod: 'PUT'
                }).success(function(data, status) {
                    $window.alert(data);
                    $("#spinner").hide();
                    $scope.getGroupData(true);
                    $scope.newAdminTab('viewGroup');
                }).
                error(function(data, status) {
                    console.log("API actualize/transformx/groups : " + data);
                });
            } else {
                if($scope.groupNameExisted){
                    apiService.request({
                        apiMethod: 'actualize/transformx/groups',
                        formData: $scope.groupDetails,
                        httpMethod: 'POST'
                    }).success(function(data, status) {
                        $window.alert(data);
                        $("#spinner").hide();
                        $scope.getGroupData(true);
                        $scope.newAdminTab('viewGroup');
                    }).
                    error(function(data, status) {
                        console.log("API actualize/transformx/groups : " + data);
                    });
                }else{
                    $window.alert("Please provide unique group name");
                    $("#spinner").hide();
                }
            }
        }
    }

    $scope.editGroup = function(selectedGroup) {
        $("#spinner").show();
        $scope.newAdminTab('addGroup');
        $scope.addEditGroup = selectedGroup;
        var sessionPos = $scope.sessTOutList.map(function(o) {
            return o.value;
        }).indexOf(selectedGroup.sessionTimeOut);
        $scope.sessTOut = $scope.sessTOutList[(sessionPos >= 0) ? sessionPos : 0];
        var passwordPos = $scope.pwdExpList.map(function(o) {
            return o.value;
        }).indexOf(selectedGroup.passwordExpireDays);
        $scope.pwdExp = $scope.pwdExpList[(passwordPos >= 0) ? passwordPos : 0];
        var parentPos = $scope.parentGroupListUnderAdmin.map(function(o) {
            return o.groupName;
        }).indexOf(selectedGroup.parentGroupName);
        $scope.prntGrp = $scope.parentGroupListUnderAdmin[(parentPos >= 0) ? parentPos : 0];
        $scope.verifyExistedPermissions(selectedGroup.services);
        $scope.selectedEditGroupName = selectedGroup.groupName;
    }

    $scope.checkGroupNameExistRnot = function(){
        if($scope.addEditGroup.groupName != $scope.selectedEditGroupName){
            apiService.request({
                    apiMethod: 'actualize/transformx/group/isGroupNameAvailable/'+$scope.addEditGroup.groupName,
                    httpMethod: 'GET'
                }).success(function(data, status) {
                    $scope.groupNameExisted = data;
                }).
                error(function(data, status) {
                    console.log("API group/isGroupNameAvailable : " + data);
                });
        }
    }

    $scope.verifyExistedPermissions = function(item) {


        $scope.GrantedGroupPermissions = item;
        $scope.availableGroupPermissions = [{
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
        for (var i = $scope.availableGroupPermissions.length - 1; i >= 0; i--) {
            for (var j = 0; j < item.length; j++) {
                if ($scope.availableGroupPermissions[i] && ($scope.availableGroupPermissions[i].serviceId === item[j].serviceId)) {
                    $scope.availableGroupPermissions.splice(i, 1);
                }
            }
        }
        $("#spinner").hide();
    }

    $scope.updateGroup = function(groupId) {
        $("#spinner").show();
        $scope.newAdminTab('addGroup');
        apiService.request({
            apiMethod: 'actualize/transformx/groups/' + groupId,
            httpMethod: 'GET'
        }).success(function(data, status) {
            $scope.addEditGroup = data;
            $("#spinner").hide();
        }).error(function(data, status) {
            $("#spinner").hide();
            console.log("API  editGroup Error: " + data);
        });
    }

    $scope.activateGroup = function(groupId){
        $("#spinner").show();
        apiService.request({
                    apiMethod: 'actualize/transformx/groups/activate/' + groupId,
                    httpMethod: 'POST'
                }).success(function(data, status) {
                    $window.alert(data);
                    $("#spinner").hide();
                    $scope.getGroupData(true);
                }).error(function(data, status) {
                    $("#spinner").hide();
                    console.log("API  activateGroup Error: " + data);
                });
    }

    $scope.deleteGroup = function(groupId) {
        $("#spinner").show();
        apiService.request({
            apiMethod: 'actualize/transformx/groups/' + groupId,
            httpMethod: 'DELETE'
        }).success(function(data, status) {
            $scope.getGroupData(true);
            $window.alert(data);
            $("#spinner").hide();
        }).error(function(data, status) {
            $("#spinner").hide();
            console.log("API  'actualize/transformx/groups' Error: " + data);
        });
    }

    $scope.permissionDisplay = function(item) {
        var str = "";
        for (var i = 0; i < item.length; i++) {
            str += (i > 0) ? ", " + item[i].serviceDisplayName : item[i].serviceDisplayName;
        }
        return str;
    }



    $scope.listbox_moveRight = function(sourceID, destID) {
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
        $scope.availableGroupPermissions = [];
        $scope.GrantedGroupPermissions = [];
        for (var i = 0; i < src.options.length; i++) {
            $scope.availableGroupPermissions.push({
                "serviceId": src.options[i].value.replace("string:", ""),
                "serviceDisplayName": src.options[i].text
            });
        }

        for (var j = 0; j < dest.options.length; j++) {
            $scope.GrantedGroupPermissions.push({
                "serviceId": dest.options[j].value.replace("string:", ""),
                "serviceDisplayName": dest.options[j].text
            });
        }
        $scope.availableGroupNmaes = $scope.availableGroupPermissions;
        $scope.availableGroupPermissionsName = function(availableGroupPermissions) {
            return availableGroupPermissions.serviceDisplayName;
        };

        $scope.GrantedGroupNmaes = $scope.GrantedGroupPermissions;
        $scope.GrantedGroupPermissionsName = function(GrantedGroupPermission) {
            return GrantedGroupPermission.serviceDisplayName;
        };

    }


    $scope.listbox_moveLeft = function(sourceID, destID) {
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
        $scope.availableGroupPermissions = [];
        $scope.GrantedGroupPermissions = [];
        for (var i = 0; i < src.options.length; i++) {
            $scope.GrantedGroupPermissions.push({
                "serviceId": src.options[i].value.replace("string:", ""),
                "serviceDisplayName": src.options[i].text
            });
        }

        for (var j = 0; j < dest.options.length; j++) {
            $scope.availableGroupPermissions.push({
                "serviceId": dest.options[j].value.replace("string:", ""),
                "serviceDisplayName": dest.options[j].text
            });
        }
        $scope.availableGroupNmaes = $scope.availableGroupPermissions;
        $scope.availableGroupPermissionsName = function(availableGroupPermissions) {
            return availableGroupPermissions.serviceDisplayName;
        };

        $scope.GrantedGroupNmaes = $scope.GrantedGroupPermissions;
        $scope.GrantedGroupPermissionsName = function(GrantedGroupPermission) {
            return GrantedGroupPermission.serviceDisplayName;
        };

    }

    if($scope.userRole == 'CLIENT_ADMIN' || $scope.userRole == 'GROUP_ADMIN'){
        $scope.getGroupData(true);
    }
    

});