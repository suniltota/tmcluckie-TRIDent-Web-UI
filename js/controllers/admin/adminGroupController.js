
//Below controller is for Group tab
app.controller('groupCtrl', function ($rootScope, $scope, $window, apiService) {
    $scope.viewContent='viewGroup';
    //For Group
    $scope.availableGroupPermissions = [{
            serviceId: "a041cfee-7c22-11e7-bb31-be2e44b06b34",
            serviceName: "JSONTOCDPDF",
            serviceDisplayName: "JSON to CD PDF"        
        },{
            serviceId: "a041d11a-7c22-11e7-bb31-be2e44b06b34",
            serviceName: "JSONTOLEPDF",
            serviceDisplayName: "JSON to LE PDF"        
        },{
            serviceId: "a041d2d2-7c22-11e7-bb31-be2e44b06b34",
            serviceName: "JSONTOCDJSONWithCalculations",
            serviceDisplayName: "JSON to CD JSON with Calculations"        
        }];
    $scope.availableGroupNmaes = $scope.availableGroupPermissions;
    $scope.availableGroupPermissionsName = function( availableGroupPermissions ) {
        return availableGroupPermissions.serviceDisplayName;
    };

    $scope.GrantedGroupPermissions = [];
    $scope.GrantedGroupNmaes = $scope.GrantedGroupPermissions;
    $scope.GrantedGroupPermissionsName = function( GrantedGroupPermission ) {
        return GrantedGroupPermission.serviceDisplayName;
    };
     $scope.newAdminTab = function(content){
        $scope.viewContent = content;//'addClient';        
        if(content == 'viewGroup' && $scope.groupList && !$scope.groupList.length){
            $("#spinner").show();
            $scope.getGroupData();
        }else if(content == 'addGroup'){
            $scope.addEditGroup = {};
        }
    }
    $rootScope.$on("loadGroupData", function(){
           $scope.getGroupData();
        });
    $scope.getGroupData = function() {
        apiService.request({apiMethod:'actualize/transformx/groups',httpMethod:'GET'}).success(function(data, status) {
            $scope.groupList = data;
            $scope.parentGroupListUnderAdmin = [];
            for(var i=0;i<data.length;i++){
                $scope.parentGroupListUnderAdmin.push({"groupId":data[i].groupId, "groupName":data[i].groupName});
            }
            $scope.prntGrp = $scope.parentGroupListUnderAdmin[0];
            $("#spinner").hide();
        }).error(function(data, status) {
            $("#spinner").hide();
            console.log("API  'actualize/transformx/groups' Error: "+data);
        });
    }
$scope.parentGroupChange = function(selectedGroup){
    $scope.prntGrp = selectedGroup;
}
    $scope.saveGroup = function() {
        if(!$scope.addEditGroup.length){
              $scope.groupDetails = {"groupId":($scope.addEditGroup.groupId)?$scope.addEditGroup.groupId:"","groupName":$scope.addEditGroup.groupName,"groupParentId":$scope.prntGrp.groupId,"sessionTimeOut":$scope.sessTOut.value,"passwordExpireDays":$scope.pwdExp.value,"services":$scope.availableGroupPermissions,"clientId"  : "a00deb64-7832-11e7-b5a5-be2e44b06b34"};
                $("#spinner").show();
            if($scope.addEditGroup.groupId){
                apiService.request({apiMethod:'actualize/transformx/groups',formData:$scope.groupDetails,httpMethod:'PUT'}).success(function(data, status) {
                    $window.alert(data);
                    $("#spinner").hide();
                    $scope.getGroupData();
                    $scope.newAdminTab('viewGroup');
                }).
                error(function(data, status) {
                    console.log("API actualize/transformx/groups : "+data);
                });
            }else{
                apiService.request({apiMethod:'actualize/transformx/groups',formData:$scope.groupDetails,httpMethod:'POST'}).success(function(data, status) {
                    $window.alert(data);
                    $("#spinner").hide();
                    $scope.getGroupData();
                    $scope.newAdminTab('viewGroup');
                }).
                error(function(data, status) {
                    console.log("API actualize/transformx/groups : "+data);
                });
            }
        }
    }

    $scope.editGroup = function(groupId) {
            $("#spinner").show();
            $scope.newAdminTab('addGroup');
        apiService.request({apiMethod:'actualize/transformx/groups/'+groupId,httpMethod:'GET'}).success(function(data, status) {
            $scope.addEditGroup = data;
            $("#spinner").hide();
        }).error(function(data, status) {
            $("#spinner").hide();
            console.log("API  editGroup Error: "+data);
        });
    }

    $scope.updateGroup = function(groupId) {
            $("#spinner").show();
            $scope.newAdminTab('addGroup');
        apiService.request({apiMethod:'actualize/transformx/groups/'+groupId,httpMethod:'GET'}).success(function(data, status) {
            $scope.addEditGroup = data;
            $("#spinner").hide();
        }).error(function(data, status) {
            $("#spinner").hide();
            console.log("API  editGroup Error: "+data);
        });
    }

    $scope.deleteGroup = function(groupId) {
            $("#spinner").show();
        apiService.request({apiMethod:'actualize/transformx/groups/'+groupId,httpMethod:'DELETE'}).success(function(data, status) {
            console.log("API actualize/transformx/groups : "+data);
            //$scope.groupList = data;
            $window.alert(data);
            $("#spinner").hide();
        }).error(function(data, status) {
            $("#spinner").hide();
            console.log("API  'actualize/transformx/groups' Error: "+data);
        });
    }



        $scope.listbox_moveRight = function(sourceID, destID) {
            var src = document.getElementById(sourceID);
            var dest = document.getElementById(destID);

            for(var count=0; count < src.options.length; count++) {

                if(src.options[count].selected == true) {
                        var option = src.options[count];

                        var newOption = document.createElement("option");
                        newOption.value = option.value;
                        newOption.text = option.text;
                        newOption.selected = true;
                        try {
                                 dest.add(newOption, null); //Standard
                                 src.remove(count, null);
                         }catch(error) {
                                 dest.add(newOption); // IE only
                                 src.remove(count);
                         }
                        count--;

                }

            }
            $scope.availableGroupPermissions = [];
            $scope.GrantedGroupPermissions = [];
            for(var i=0; i < src.options.length; i++) {
                $scope.availableGroupPermissions.push({"serviceId":src.options[i].value.replace("string:",""),"serviceDisplayName":src.options[i].text});
            }

            for(var j=0; j < dest.options.length; j++) {
                $scope.GrantedGroupPermissions.push({"serviceId":dest.options[j].value.replace("string:",""),"serviceDisplayName":dest.options[j].text});
            }
            $scope.availableGroupNmaes = $scope.availableGroupPermissions;
            $scope.availableGroupPermissionsName = function( availableGroupPermissions ) {
                return availableGroupPermissions.serviceDisplayName;
            };

            $scope.GrantedGroupNmaes = $scope.GrantedGroupPermissions;
            $scope.GrantedGroupPermissionsName = function( GrantedGroupPermission ) {
                return GrantedGroupPermission.serviceDisplayName;
            };

        }


        $scope.listbox_moveLeft = function(sourceID, destID) {
            var src = document.getElementById(sourceID);
            var dest = document.getElementById(destID);

            for(var count=0; count < src.options.length; count++) {

                if(src.options[count].selected == true) {
                        var option = src.options[count];

                        var newOption = document.createElement("option");
                        newOption.value = option.value;
                        newOption.text = option.text;
                        newOption.selected = true;
                        try {
                                 dest.add(newOption, null); //Standard
                                 src.remove(count, null);
                         }catch(error) {
                                 dest.add(newOption); // IE only
                                 src.remove(count);
                         }
                        count--;

                }

            }
            $scope.availableGroupPermissions = [];
            $scope.GrantedGroupPermissions = [];
            for(var i=0; i < src.options.length; i++) {
                $scope.GrantedGroupPermissions.push({"serviceId":src.options[i].value.replace("string:",""),"serviceDisplayName":src.options[i].text});
            }

            for(var j=0; j < dest.options.length; j++) {
                $scope.availableGroupPermissions.push({"serviceId":dest.options[j].value.replace("string:",""),"serviceDisplayName":dest.options[j].text});
            }
            $scope.availableGroupNmaes = $scope.availableGroupPermissions;
            $scope.availableGroupPermissionsName = function( availableGroupPermissions ) {
                return availableGroupPermissions.serviceDisplayName;
            };

            $scope.GrantedGroupNmaes = $scope.GrantedGroupPermissions;
            $scope.GrantedGroupPermissionsName = function( GrantedGroupPermission ) {
                return GrantedGroupPermission.serviceDisplayName;
            };

        }

});
app.directive('ngConfirmClick', [
        function(){
            return {
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure?";
                    var clickAction = attr.confirmedClick;
                    element.bind('click',function (event) {
                        if ( window.confirm(msg) ) {
                            scope.$eval(clickAction)
                        }
                    });
                }
            };
    }]);

