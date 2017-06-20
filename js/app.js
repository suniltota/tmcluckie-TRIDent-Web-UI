/**
 * Main AngularJS Web Application
 */
var app = angular.module('actualizeWebApp', [
  'ngRoute',
  'ui.bootstrap',
  'httpServiceModule',
  'app.loginServices'
]);

/**
 * Configure the Routes
 */
app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    // Home
    .when("/home", {templateUrl: "partials/home.html", controller: "homeCtrl"})
    .when("/closingDisclosure", {templateUrl: "partials/closingDisclosureHome.html", controller: "closingDisclosureCtrl"})
    .when("/loanEstimate", {templateUrl: "partials/loanEstimateHome.html", controller: "loanEstimateCtrl"})
    .otherwise({ redirectTo: '/home' });
  $locationProvider.hashPrefix('');
}).run(['loginService', 'apiService', '$rootScope', '$window', function(loginService, apiService, $rootScope, $window){
    //executed once, after all modules are loaded
    $rootScope.alerts=[];
    apiService.setBasePath(localStorage.apiBasePath);
    loginService.setSessionId();
    var res= loginService.isUserLoggedIn();
    
    if(!res) {window.location.href="login.html" + $window.location.search}

    // Set $rootScope.userName.
    loginService.setUserName();

    //Below flag is to display Loading spinner while loading home page after login.
    $rootScope.showHomePageSpinner = true;
    
    $rootScope.safeDigest = function() {
        if (!$rootScope.$root.$$phase) {
            $rootScope.$root.$digest();
        }
    };

    function logUserOut(){
        loginService.logout();
        return apiService.request({
          apiMethod: "logout",
          httpMethod: 'POST'
        });
    }
}]);


/**
 * Controller for the validation
 */
app.controller('validateCtrl', function ($scope, $location, $http) {
  console.log("Blog Controller reporting for duty.");
});



app.controller('menuCtrl', function ($scope, loginService, staticData, $window) {
  
  $scope.fileNew = function(){
    closeAllViews();
    var postLoginScope = angular.element($("#ChooseFormType")).scope();
    postLoginScope.transactionType = "new";
    $('#ChooseFormType').modal('show');
  }
  $scope.fileOpen = function(){
    closeAllViews();
    var postLoginScope = angular.element($("#ChooseFormType")).scope();
    postLoginScope.transactionType = "existing";
    $('#ChooseFormType').modal('show');
  }
  
  $scope.importFile = function(){
    closeAllViews();
    var postLoginScope = angular.element($("#ChooseFormType")).scope();
    postLoginScope.transactionType = "existing";
    $('#ChooseFormType').modal('show');
  }

  $scope.generateXML = function() {
    closeAllViews();
    if(!localStorage.documentType){
      var viewMenuScope = angular.element($("#ChooseEmbeddedPDF")).scope();
      viewMenuScope.xmlTitle = "XML";
      viewMenuScope.embeddedPDF=true;
      $('#ChooseEmbeddedPDF').modal('show');    
    }
  }

  $scope.generateUCDXML = function() {
    closeAllViews();
    if(!localStorage.documentType){
      var viewMenuScope = angular.element($("#ChooseEmbeddedPDF")).scope();
      viewMenuScope.xmlTitle = "UCD XML";
      viewMenuScope.embeddedPDF=true;
      $('#ChooseEmbeddedPDF').modal('show');
    }
  }

  $scope.generatePDF = function(){
    closeAllViews();
    if(!localStorage.documentType)
      angular.element($("#UCDXMLFILE")).scope().generatePDF();
  }
  var closeAllViews = function() {
    xmlDestroy();
    pdfDestroy();
    ucdXmlDestroy();
  }
  var xmlDestroy = function(){
    $("#xmlView").hide();
  }
  var ucdXmlDestroy = function(){
    $("#ucdXmlView").hide();
  }
  var pdfDestroy = function(){
    $(".pdfSlider_button").click();
  }
  $scope.logout = function() {
      loginService.logout();
      $window.location.href="login.html" + $window.location.search;
  }
});
app.controller('fileMenuCtrl', function($scope, $window, loginService, apiService, cdService,leService, $log){

    $scope.transactionType = 'new';
    $scope.purposeType = 'purchase';
    $scope.documentType = 'closingdisclosure';
    $scope.formType = 'standard';

    $scope.$watch('uploadfile', function(newValue, oldValue) {
         $scope.fileerror = undefined;
    });

    $scope.purposeTypeChange = function(){
        if($scope.purposeType == 'refinance'){
            $scope.formType = 'alternate';
        }
        else{
            $scope.formType = 'standard';
        }
    }
    
    $scope.clear = function() {
        if($scope.transactionType == 'new')
            $scope.purposeType = 'purchase';
        $scope.documentType = 'closingdisclosure';
        $scope.formType = 'standard';
        angular.element("input[type='file']").val('');
        $scope.uploadfile = undefined;
    }

    $scope.submit = function() {
        $("#spinner").show();
        $('#ChooseFormType').modal('hide');
        localStorage.removeItem("jsonData");
        if($scope.transactionType == 'new') {
            location.href = "index.html#/home?documentType="+$scope.documentType+"&purposeType="+$scope.purposeType+"&formType="+$scope.formType;
        } else if($scope.transactionType == 'existing') {
            if($scope.uploadfile != undefined && $scope.uploadfile != null) {
                 if($scope.documentType=='closingdisclosure') { 
                cdService.loadTransformData($scope.uploadfile).success(function(data){
                    $scope.purposeType = data.termsOfLoan.loanPurposeType.toLowerCase();
                    if($scope.purposeType == 'purchase')
                       $scope.formType = 'standard';
                    localStorage.jsonData = JSON.stringify(data);
                    //console.log(localStorage.jsonData);
                    location.href = "index.html#/home?documentType="+$scope.documentType+"&purposeType="+$scope.purposeType+"&formType="+$scope.formType;
                }).error(function(data, status) {
                    $("#spinner").hide();
                });
            }else{
                leService.loadTransformData($scope.uploadfile).success(function(data){
                   //console.log(JSON.stringify(data));
                    $scope.purposeType = data.termsOfLoan.loanPurposeType.toLowerCase();
                    if($scope.purposeType == 'purchase')
                       $scope.formType = 'standard';
                    localStorage.jsonData = JSON.stringify(data);
                    
                    location.href = "index.html#/home?documentType="+$scope.documentType+"&purposeType="+$scope.purposeType+"&formType="+$scope.formType;
                }).error(function(data, status) {
                    $("#spinner").hide();
                });
            }
            } else {
                $scope.fileerror = 'Please select valid xml file';
                $("#spinner").hide();
            }
        } else if($scope.transactionType == 'textTemplate') {
            if($scope.uploadfile != undefined && $scope.uploadfile != null) {
                cdService.transformText2XML($scope.uploadfile).success(function(xmldata) {
                    var xmlstring = $.parseXML( xmldata );
                    var $xml = $(xmlstring);
                    var UCD_DOCUMENT = $xml.find( "UCD_DOCUMENT" );
                    $.each(UCD_DOCUMENT, function() {
                        var xml = $(this).html();
                        cdService.loadTransformData(xml).success(function(jsondata){
                            $scope.purposeType = jsondata.termsOfLoan.loanPurposeType.toLowerCase();
                            if($scope.purposeType == 'purchase')
                               $scope.formType = 'standard';
                            localStorage.jsonData = JSON.stringify(jsondata);
                            //console.log(localStorage.jsonData);
                            location.href = "index.html#/home?documentType="+$scope.documentType+"&purposeType="+$scope.purposeType+"&formType="+$scope.formType;
                        }).error(function(data, status) {
                            $("#spinner").hide();
                        });
                    });
                }).error(function(data, status) {
                    $("#spinner").hide();
                });
            } else {
                $scope.fileerror = 'Please select valid template file';
                $("#spinner").hide();
            }
        }
    }
});
app.controller('viewMenuCtrl', function($scope, staticData){
  $scope.dropDownBooleanOptions = staticData.dropDownBooleanOptions;
  $scope.embeddedPDF = true;
  $scope.generateXMLPDF= function(title){
    $('#ChooseEmbeddedPDF').modal('hide');
    if(title == "XML")
      angular.element($("#UCDXMLFILE")).scope().generateXML($scope.embeddedPDF);
    else
      angular.element($("#UCDXMLFILE")).scope().generateUCDXML($scope.embeddedPDF);
  }
});