app.controller('adminCtrl', function ($scope) {

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
                            }
        

	$scope.addClient = function(){
        //location.href = "index.html#/admin";
        $scope.viewContent = 'addClient';
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
});