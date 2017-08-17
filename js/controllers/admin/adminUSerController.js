app.controller('userCtrl', function($rootScope, $scope, $window, apiService) {

    /// User Start

    $scope.UsersList = [];
    $scope.parentClientListUnderAdmin = [];

    $scope.newAdminTab = function(content) {
        $scope.viewContent = content; //'addClient';        
        if (content == 'viewUser' && $scope.UsersList && !$scope.UsersList.length) {
            $("#spinner").show();
            $scope.getUserData(true);
        } else if (content == 'addUser') {
            $scope.addEditUser = {};
        }
    }
    $rootScope.$on("loadUserData", function() {
        $scope.getUserData('false');
    });
    $scope.getUserData = function(reLoad) {
        if (reLoad || ($scope.UsersList && !$scope.UsersList.length)) {
            $scope.usernameFiledDisabled = false;
            $scope.getRoles();
            apiService.request({
                apiMethod: 'actualize/transformx/users',
                httpMethod: 'GET'
            }).success(function(data, status) {
                $scope.UsersList = data;
                //$scope.prntGrp = $scope.parentGroupListUnderAdmin[0];
                //$("#spinner").hide();
            }).error(function(data, status) {
                $("#spinner").hide();
                console.log("API  'actualize/transformx/groups' Error: " + data);
            });
        }else
            $("#spinner").hide();
    }

    $scope.saveUser = function() {
        $scope.usernameFiledDisabled = false;
        if ($scope.addEditUser) {
            $("#spinner").show();
            if ($scope.addEditUser.userId) {
                apiService.request({
                    apiMethod: 'actualize/transformx/users',
                    formData: $scope.addEditUser,
                    httpMethod: 'PUT'
                }).success(function(data, status) {
                    $window.alert(data);
                    $("#spinner").hide();
                    $scope.getUserData(true);
                    $scope.newAdminTab('viewUser');
                }).error(function(data, status) {
                    $("#spinner").hide();
                });
            } else {
                apiService.request({
                    apiMethod: 'actualize/transformx/users',
                    formData: $scope.addEditUser,
                    httpMethod: 'POST'
                }).success(function(data, status) {
                    $window.alert(data);
                    $("#spinner").hide();
                    $scope.getUserData(true);
                    $scope.newAdminTab('viewUser');
                }).error(function(data, status) {
                    $("#spinner").hide();
                });
            }
        }
    }

    $scope.editUser = function(user) {
        $scope.usernameFiledDisabled = true;
        $scope.getRoles();
        $("#spinner").show();
        $scope.newAdminTab('addUser');
        apiService.request({
            apiMethod: 'actualize/transformx/users/' + user.userId,
            httpMethod: 'GET'
        }).success(function(data, status) {
            $scope.addEditUser = data;
            //$("#spinner").hide();
        }).error(function(data, status) {
            $("#spinner").hide();
        });
    }

    $scope.deleteUser = function(userId) {
        $("#spinner").show();
        apiService.request({
            apiMethod: 'actualize/transformx/users/' + userId,
            httpMethod: 'DELETE'
        }).success(function(data, status) {
            $window.alert(data);
            $("#spinner").hide();
            $scope.getUserData(true);
            $scope.newAdminTab('viewUser');
        }).error(function(data, status) {
            $("#spinner").hide();
        });
    }

    $scope.sameAsUserName = function() {
        if ($scope.addEditUser.sameAsUserName) {
            $scope.addEditUser.username = $scope.addEditUser.email;
        } else {
            $scope.addEditUser.username = '';
        }
    };

    $scope.userRoles = [];
    $scope.getRoles = function() {
        var roleId = "416373c2-75c6-11e7-b5a5-be2e44b06b34";
        apiService.request({
            apiMethod: 'actualize/transformx/roles',
            formData: roleId,
            httpMethod: 'GET'
        }).success(function(data, status) {
            $scope.userRoles = data;
            $("#spinner").hide();
        }).error(function(data, status) {
            $("#spinner").hide();
        });
    }
    //// User End
});