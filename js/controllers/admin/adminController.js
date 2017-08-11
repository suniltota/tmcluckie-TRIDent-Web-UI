app.controller('adminCtrl', function ($rootScope, $scope, $window, apiService) {

    $scope.showTab = 'adminDashboard';
    $scope.viewContent = 'viewClient';
    
    $scope.pwdExpList = [{"value":10,"label":"10 days"}, {"value":20,"label":"20 days"}, {"value":30,"label":"30 days"}];
    $scope.pwdExp = $scope.pwdExpList[2];
    $scope.sessTOutList = [{"value":10,"label":"10 Minutes"}, {"value":20,"label":"20 Minutes"}, {"value":30,"label":"30 Minutes"},{"value":40,"label":"40 Minutes"}, {"value":50,"label":"50 Minutes"}, {"value":60,"label":"60 Minutes"}];
    $scope.sessTOut = $scope.sessTOutList[2];
    $scope.addEditGroup = {};
    $scope.addEditClient = {};
    // $scope.parentGroupList = ["USB Bank", "YES Bank", "ICICI"];
    // $scope.prntGrp = $scope.parentGroupList[0];
    $scope.clientList = {};
    $scope.groupList = {};
    $scope.parentClientListUnderAdmin = [];
    $scope.parentGroupListUnderAdmin = [];

    $scope.GrantedPermissions = [
            { name: "Administration", id:1, label: ''}, 
            { name: "OCR", id:2, label: ''},
            { name: "Submit to GSE", id:3, label: ''}
          ];
    $scope.GrantedNmaes = $scope.GrantedPermissions;
    $scope.GrantedPermissionsName = function( GrantedPermission ) {
        return GrantedPermission.name;
    };

    $scope.AvailablePermissions = [
            { name: "Closing Disclosure PDF", id:1, label: ''}, 
            { name: "Loan Estimate PDF", id:2, label: ''},
            { name: "USD Validation", id:3, label: ''}
          ];
    $scope.AvailableNmaes = $scope.AvailablePermissions;
    $scope.AvailablePermissionsName = function( AvailablePermission ) {
        return AvailablePermission.name;
    };
    
    $scope.newAdminTab = function(content){
        //location.href = "index.html#/admin";
        $scope.viewContent = content;//'addClient';
        if(content == 'viewClient' && $scope.clientList && !$scope.clientList.length){
           $("#spinner").show();
          $scope.getClientData();
        }else if(content == 'addClient'){
            $scope.addEditClient = {};
        }
        if(content == 'viewGroup' && $scope.groupList && !$scope.groupList.length){
            $("#spinner").show();
            $rootScope.$emit("loadGroupData", {});
            //$scope.getGroupData();
        }else if(content == 'addGroup'){
            $scope.addEditGroup = {};
        }else if(content == 'viewUser'){
            $("#spinner").show();
            $scope.getUserData();
        }else if(content == 'addUser'){
            $scope.addEditUser = {};
        }
    }

   

        $scope.listbox_move = function(listID, direction) {

            var listbox = document.getElementById(listID);
            var selIndex = listbox.selectedIndex;

            if(-1 == selIndex) {
                alert("Please select an option to move.");
                return;
            }

            var increment = -1;
            if(direction == 'up')
                increment = -1;
            else
                increment = 1;

            if((selIndex + increment) < 0 ||
                (selIndex + increment) > (listbox.options.length-1)) {
                return;
            }

            var selValue = listbox.options[selIndex].value;
            var selText = listbox.options[selIndex].text;
            listbox.options[selIndex].value = listbox.options[selIndex + increment].value
            listbox.options[selIndex].text = listbox.options[selIndex + increment].text

            listbox.options[selIndex + increment].value = selValue;
            listbox.options[selIndex + increment].text = selText;

            listbox.selectedIndex = selIndex + increment;
        }

        $scope.listbox_moveacross = function(sourceID, destID) {
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

        }
        $scope.listbox_selectall = function(listID, isSelect) {

            var listbox = document.getElementById(listID);
            for(var count=0; count < listbox.options.length; count++) {

                listbox.options[count].selected = isSelect;

            }
        }

/// User Start

    $scope.UsersList=[];
    $scope.getUserData = function() {
               apiService.request({apiMethod:'actualize/transformx/users',httpMethod:'GET'}).success(function(data, status) {
                    $scope.userList = data;
                    for(var i=0;i<data.length;i++){
                        $scope.UsersList.push({"username":data[i].username, "firstName":data[i].firstName,
                            "lastName":data[i].lastName, "email":data[i].email, "passwordExpiryDate":data[i].passwordExpiryDate});
                    }
                    $scope.prntGrp = $scope.parentGroupListUnderAdmin[0];
                   $("#spinner").hide();
                }).error(function(data, status) {
                    $("#spinner").hide();
                    console.log("API  'actualize/transformx/groups' Error: "+data);
                });
            }

    $scope.saveUser = function() {
        if(!$scope.addEditUser.length){
          $scope.UsersListdata={"firstName":$scope.addEditUser.firstName, "lastName":$scope.addEditUser.lastName,
                         "username":$scope.addEditUser.username,  "email":$scope.addEditUser.email, 
                         "password":$scope.addEditUser.password,  "accountNonLocked":true,"credentialsNonExpired":true, 
                       "failedLoginAttempts":0, "resetPassword":true,"enabled":true,
                           "group": {"groupId":'9a93bb62-d57b-488e-8d61-ed1f6d01b621'},
                           "role": {"roleId": "416373c2-75c6-11e7-b5a5-be2e44b06b34"},
                           "lastSuccessfulLogin":"09-08-2017 23:34:43", "lastSuccessfulLogout":"09-08-2017 23;45:23",
                           "authorities": ["abc"]};
                $("#spinner").show();
               apiService.request({apiMethod:'actualize/transformx/users',formData:$scope.UsersListdata, httpMethod:'POST'}).success(function(data, status) {
                        $window.alert(data);
                        $("#spinner").hide();
                    }).error(function(data, status) {
                        $("#spinner").hide();
                        console.log("API  'actualize/transformx/users' Error: "+data);
                    });
        }
        
    }
     $scope.editUser = function(userId) {
            $scope.addEditUser.userId="416373c2-75c6-11e7-b5a5-be2e44b06b34";
                    $("#spinner").show();
                    $scope.newAdminTab('addUser');
                apiService.request({apiMethod:'actualize/transformx/users/'+userId,httpMethod:'GET'}).success(function(data, status) {
                    $scope.addEditUser = data;
                    $("#spinner").hide();
                }).error(function(data, status) {
                    $("#spinner").hide();
                    console.log("API  editClient Error: "+data);
                });
            }
    //$scope.copyEmailAsUsernameStatus=false;
     $scope.sameAsUserName = function () {     
       if ($scope.addEditUser.sameAsUserName) {
           $scope.addEditUser.username=$scope.addEditUser.email;
        }else{
           $scope.addEditUser.username='';
        }
     };
        //// User End

        $scope.getClientData = function() {
		        apiService.request({apiMethod:'actualize/transformx/clients',httpMethod:'GET'}).success(function(data, status) {
		            $scope.clientList = data;
		            $scope.parentClientListUnderAdmin = [];
		            for(var i=0;i<data.length;i++){
		                $scope.parentClientListUnderAdmin.push({"clientId":data[i].clientId, "clientName":data[i].clientName});
		            }
		            $scope.prntClient = $scope.parentClientListUnderAdmin[0];
		            $("#spinner").hide();
		        }).error(function(data, status) {
		            $("#spinner").hide();
		            console.log("API  'actualize/transformx/clients' Error: "+data);
		        });
		    }

		    $scope.saveClient = function() {
                if($scope.addEditClient){
                    var clientContactDetails = [];
                    var contactInfo = {
                        "contactType": "TECNICAL",
                        "name": $scope.addEditClient.techContactInfo.name,
                        "email": $scope.addEditClient.techContactInfo.email,
                        "phone": $scope.addEditClient.techContactInfo.pno
                    };
                    clientContactDetails.push(contactInfo);
                    var businessContactInfo = {
                        "contactType": "BUSINESS",
                        "name": $scope.addEditClient.bussContactInfo.name,
                        "email": $scope.addEditClient.bussContactInfo.email,
                        "phone": $scope.addEditClient.bussContactInfo.pno
                    };
                    clientContactDetails.push(businessContactInfo);
                    $scope.clientDetails = {
                        "clientId": $scope.addEditClient.clientId,
                        "clientName":$scope.addEditClient.clientName, 
                        "address":$scope.addEditClient.address, 
                        "phoneNumber":$scope.addEditClient.phoneNumber,
                        "clientContactInfo": clientContactDetails,
                        "servicesModel": [],
                        "enabled":$scope.addEditClient.enabled
                    };
                    $("#spinner").show();
                    var httpMethod = $scope.addEditClient.clientId ? 'PUT' : 'POST';
                    apiService.request({apiMethod:'actualize/transformx/clients',formData:$scope.clientDetails, httpMethod:httpMethod}).success(function(data, status) {
                        $scope.getClientData();
                        $("#spinner").hide();
                        $scope.newAdminTab('viewClient');
                    }).error(function(data, status) {
                        $("#spinner").hide();
                        console.log("API  'actualize/transformx/clients' Error: "+data);
                    });
                }
            }

            $scope.editClient = function(clientId) {
                    $("#spinner").show();
                    $scope.newAdminTab('addClient');
                apiService.request({apiMethod:'actualize/transformx/clients/'+clientId,httpMethod:'GET'}).success(function(data, status) {
                    $scope.addEditClient = data;
                    $scope.addEditClient['techContactInfo'] = {};
                    $scope.addEditClient['bussContactInfo'] = {};
                    for(var i=0; i<$scope.addEditClient.clientContactInfo.length; i++) {
                        var contactInfo = $scope.addEditClient.clientContactInfo[i];
                        if(contactInfo.contactType == 'TECNICAL') {
                            $scope.addEditClient.techContactInfo.name = contactInfo.name;
                            $scope.addEditClient.techContactInfo.email = contactInfo.email;
                            $scope.addEditClient.techContactInfo.pno = contactInfo.phone;
                        } else if(contactInfo.contactType == 'BUSINESS') {
                            $scope.addEditClient.bussContactInfo.name = contactInfo.name;
                            $scope.addEditClient.bussContactInfo.email = contactInfo.email;
                            $scope.addEditClient.bussContactInfo.pno = contactInfo.phone;
                        }
                    }
                    $("#spinner").hide();
                }).error(function(data, status) {
                    $("#spinner").hide();
                    console.log("API  editClient Error: "+data);
                });
            }

		    $scope.deleteClient = function(clientId) {
			            $("#spinner").show();
			        apiService.request({apiMethod:'actualize/transformx/clients/'+clientId,httpMethod:'DELETE'}).success(function(data, status) {
			            console.log("API actualize/transformx/clients : "+data);
			            //$scope.groupList = data;
			            $window.alert(data);
			            $scope.getClientData();
			            $("#spinner").hide();
			        }).error(function(data, status) {
			            $("#spinner").hide();
			            console.log("API  'actualize/transformx/clients' Error: "+data);
			        });
			    }

		    $scope.availableClientPermissions = [{
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
	    $scope.availableClientNmaes = $scope.availableClientPermissions;
	    $scope.availableClientPermissionsName = function( availableClientPermissions ) {
	        return availableClientPermissions.serviceDisplayName;
	    };

		    $scope.getClientData();
		    $("#spinner").show();

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
