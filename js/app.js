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

  $scope.fileOpen = function(){
    xmlDestroy();
    pdfDestroy();
    angular.element($("#UCDXMLFILE")).scope().openUCDXMLFile();
  }
  $scope.saveFile = function(){
    xmlDestroy();
    pdfDestroy();
    angular.element($("#UCDXMLFILE")).scope().saveFile();
  }
  $scope.importFile = function(){
    xmlDestroy();
    pdfDestroy();
    angular.element($("#UCDXMLFILE")).scope().importFile();
  }
  $scope.generateXML = function() {
    xmlDestroy();
    pdfDestroy();
    if(!localStorage.documentType)
      angular.element($("#UCDXMLFILE")).scope().generateXML();
  }
  $scope.generatePDF = function(){
    xmlDestroy();
    pdfDestroy();
    if(!localStorage.documentType)
      angular.element($("#UCDXMLFILE")).scope().generatePDF();
  }
  $scope.closePdfView = function() {
    xmlDestroy();
    pdfDestroy();
  }
  var xmlDestroy = function(){
    $("#xmlView").hide();
  }
  
  var pdfDestroy = function(){
    $(".pdfSlider_button").click();
  }

  $scope.logout = function() {
      loginService.logout();
      $window.location.href="login.html" + $window.location.search;
  }
});