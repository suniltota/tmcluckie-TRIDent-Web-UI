app.controller('adminCtrl', function($rootScope, $scope, $window, apiService) {

    $scope.showTab = 'adminDashboard';
    $scope.viewContent = 'viewClient';
    $scope.usernameFiledDisabled = false;
    $scope.userRole = JSON.parse(localStorage.userDetails).user.role.roleName;


    // $scope.pwdExpList = [{"value":10,"label":"10 days"}, {"value":20,"label":"20 days"}, {"value":30,"label":"30 days"}];
    // $scope.pwdExp = $scope.pwdExpList[2];
    // $scope.sessTOutList = [{"value":10,"label":"10 Minutes"}, {"value":20,"label":"20 Minutes"}, {"value":30,"label":"30 Minutes"},{"value":40,"label":"40 Minutes"}, {"value":50,"label":"50 Minutes"}, {"value":60,"label":"60 Minutes"}];
    // $scope.sessTOut = $scope.sessTOutList[2];
    //$scope.addEditGroup = {};
    //$scope.addEditClient = {};
    //$scope.addEditInvestor = {};
    // $scope.parentGroupList = ["USB Bank", "YES Bank", "ICICI"];
    // $scope.prntGrp = $scope.parentGroupList[0];
    //$scope.clientList = {};
    //$scope.groupList = {};
    //$scope.investorList = {};
    //$scope.parentClientListUnderAdmin = [];
    //$scope.parentGroupListUnderAdmin = [];
    //$scope.parentInvestorListUnderAdmin = [];

    $scope.activeTab = function() {
        if($scope.userRole == 'SUPER_ADMIN'){
            $('#clientContainer').addClass('in active');
            $('#clientTab').addClass('active');
        }
        if($scope.userRole == 'CLIENT_ADMIN'){
            $('#groupContainer').addClass('in active')
            $('#GroupTab').addClass('active');
        }
        if($scope.userRole == 'GROUP_ADMIN'){
            $('#groupContainer').addClass('in active')
            $('#GroupTab').addClass('active');
        }
    };


    $scope.GrantedPermissions = [{
            name: "Administration",
            id: 1,
            label: ''
        },
        {
            name: "OCR",
            id: 2,
            label: ''
        },
        {
            name: "Submit to GSE",
            id: 3,
            label: ''
        }
    ];
    $scope.GrantedNmaes = $scope.GrantedPermissions;
    $scope.GrantedPermissionsName = function(GrantedPermission) {
        return GrantedPermission.name;
    };

    $scope.AvailablePermissions = [{
            name: "Closing Disclosure PDF",
            id: 1,
            label: ''
        },
        {
            name: "Loan Estimate PDF",
            id: 2,
            label: ''
        },
        {
            name: "USD Validation",
            id: 3,
            label: ''
        }
    ];
    $scope.AvailableNmaes = $scope.AvailablePermissions;
    $scope.AvailablePermissionsName = function(AvailablePermission) {
        return AvailablePermission.name;
    };

    $scope.newAdminTab = function(content) {
        //location.href = "index.html#/admin";
        $scope.viewContent = content; //'addClient';
        if (content == 'viewClient') { // && $scope.clientList && !$scope.clientList.length
            $("#spinner").show();
            //$scope.getClientData();
            $rootScope.$emit("loadClientData", {});
        } else if (content == 'addClient') {
            $scope.addEditClient = {};
        }
        if (content == 'viewGroup') {
            $("#spinner").show();
            $rootScope.$emit("loadGroupData", {});
            //$scope.getGroupData();
        } else if (content == 'addGroup') {
            $scope.addEditGroup = {};
        } else if (content == 'viewUser') {
            $("#spinner").show();
            $rootScope.$emit("loadUserData", {});
            //$scope.getUserData();
            //$scope.getRoles();
        } else if (content == 'addUser') {
            $scope.addEditUser = {};
        } else if (content == 'viewInvestor') { // && $scope.investorList && !$scope.investorList.length
            $("#spinner").show();
            $rootScope.$emit("loadInvestorData", {});
        } else if (content == 'addInvestor') {
            $scope.addEditInvestor = {};
        }
    }


    $scope.listbox_move = function(listID, direction) {

        var listbox = document.getElementById(listID);
        var selIndex = listbox.selectedIndex;

        if (-1 == selIndex) {
            alert("Please select an option to move.");
            return;
        }

        var increment = -1;
        if (direction == 'up')
            increment = -1;
        else
            increment = 1;

        if ((selIndex + increment) < 0 ||
            (selIndex + increment) > (listbox.options.length - 1)) {
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

    }
    $scope.listbox_selectall = function(listID, isSelect) {

        var listbox = document.getElementById(listID);
        for (var count = 0; count < listbox.options.length; count++) {

            listbox.options[count].selected = isSelect;

        }
    }


});
app.directive('ngConfirmClick', [
    function() {
        return {
            link: function(scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('click', function(event) {
                    if (window.confirm(msg)) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
    }
]);