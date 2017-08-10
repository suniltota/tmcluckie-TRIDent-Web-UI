app.controller('adminCtrl', function ($scope, $window, apiService) {

	$scope.showTab = 'adminDashboard';
    $scope.viewContent = 'viewClient';
    $scope.addEditClient = {
                              "clientInfo": {
                                "name": "Full name",
                                "address": "Full mailing address",
                                "pno": "Phone Number",
                                "webPage": "Web URL"
                              },
                              "bussContactInfo": {
                                "name": "Full name",
                                "email": "Email address",
                                "pno": "Phone Number"
                              },
                              "techContactInfo": {
                                "name": "Full name",
                                "email": "Email address",
                                "pno": "Phone Number"
                              },
                              "passwordExpDate": "30 days",
                              "expirationDate": "12052017",
                              "sessionTimeout": "30 Mins"
                            };
    $scope.pwdExpList = [{"value":10,"label":"10 days"}, {"value":20,"label":"20 days"}, {"value":30,"label":"30 days"}];
    $scope.pwdExp = $scope.pwdExpList[2];
    $scope.sessTOutList = [{"value":10,"label":"10 Minutes"}, {"value":20,"label":"20 Minutes"}, {"value":30,"label":"30 Minutes"},{"value":40,"label":"40 Minutes"}, {"value":50,"label":"50 Minutes"}, {"value":60,"label":"60 Minutes"}];
    $scope.sessTOut = $scope.sessTOutList[2];
    $scope.addEditGroup = {};
    // $scope.parentGroupList = ["USB Bank", "YES Bank", "ICICI"];
    // $scope.prntGrp = $scope.parentGroupList[0];
    $scope.groupList = {};
    $scope.parentGroupListUnderAdmin = [];

    $scope.GrantedPermissions = [
            { name: "Administration"}, 
            { name: "OCR"},
            { name: "Submit to GSE"}
          ];
    $scope.GrantedNmaes = { owner: $scope.GrantedPermissions[0] };
    $scope.GrantedPermissionsName = function( GrantedPermission ) {
    	return GrantedPermission.name;
  	};

    $scope.AvailablePermissions = [
            { name: "Closing Disclosure PDF"}, 
            { name: "Loan Estimate PDF"},
            { name: "USD Validation"}
          ];
    $scope.AvailableNmaes = { owner: $scope.AvailablePermissions[0] };
    $scope.AvailablePermissionsName = function( AvailablePermission ) {
    	return AvailablePermission.name;
  	};

	$scope.addClient = function(content){
        //location.href = "index.html#/admin";
        $scope.viewContent = content;//'addClient';
        if(content == 'viewGroup' && $scope.groupList && !$scope.groupList.length){
            $("#spinner").show();
            $scope.getGroupData();
        }else if(content == 'addGroup'){
            $scope.addEditGroup = {};
        }
    }

	$scope.clientList = [
        {"keycolumn1":1,"originkey1":1,"datafield1":1},
        {"keycolumn1":2,"originkey1":2,"datafield1":2},
        {"keycolumn1":3,"originkey1":3,"datafield1":3},
        {"keycolumn1":4,"originkey1":4,"datafield1":4},
        {"keycolumn1":5,"originkey1":5,"datafield1":5},
        {"keycolumn1":11,"originkey1":11,"datafield1":11},
        {"keycolumn1":12,"originkey1":12,"datafield1":12},
        {"keycolumn1":13,"originkey1":13,"datafield1":13},
        {"keycolumn1":14,"originkey1":14,"datafield1":14},
        {"keycolumn1":15,"originkey1":15,"datafield1":15}
    ];

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

    $scope.saveGroup = function() {
        if(!$scope.addEditGroup.length){
            $scope.groupDetails = {"groupName":$scope.addEditGroup.groupName,"groupParentId":$scope.prntGrp.groupId,"sessionTimeOut":$scope.addEditGroup.groupName,"sessionTimeOut":$scope.addEditGroup.groupName};
                $("#spinner").show();
        }
        // apiService.request({apiMethod:'actualize/transformx/groups/',httpMethod:'PUT'}).success(function(data, status) {
        //     console.log("API actualize/transformx/groups : "+data);
        //     //$scope.groupList = data;
        //     $window.alert(data);
        //     $("#spinner").hide();
        // }).error(function(data, status) {
        //     $("#spinner").hide();
        //     console.log("API  'actualize/transformx/groups' Error: "+data);
        // });
    }

    $scope.editGroup = function(groupId) {
            $("#spinner").show();
            $scope.addClient('addGroup');
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
            $scope.addClient('addGroup');
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
    }])