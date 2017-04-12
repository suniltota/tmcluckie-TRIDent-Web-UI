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
    .when("/loginProcess", {templateUrl: "partials/loginProcess.html", controller: "transformCtrl"})
    .when("/home", {templateUrl: "partials/home.html", controller: "transformCtrl"})
    .otherwise({ redirectTo: '/loginProcess' });
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
        window.location.href="login.html" + $window.location.search;
    }
}]);


/**
 * Controller for the validation
 */
app.controller('validateCtrl', function ($scope, $location, $http) {
  console.log("Blog Controller reporting for duty.");
});



app.controller('menuCtrl', function ($scope, staticData) {

  $scope.fileOpen = function(){
    pdfDestroy();
    angular.element($("#UCDXMLFILE")).scope().openUCDXMLFile();
  }
  $scope.saveFile = function(){
    pdfDestroy();
    angular.element($("#UCDXMLFILE")).scope().saveFile();
  }
  $scope.importFile = function(){
    pdfDestroy();
    angular.element($("#UCDXMLFILE")).scope().importFile();
  }
  $scope.generatePDF = function(){
    pdfDestroy();
    angular.element($("#UCDXMLFILE")).scope().generatePDF();    
  }
  $scope.closePdfView = function() {
    pdfDestroy();
  }
  
  var pdfDestroy = function(){
    $(".pdfSlider_button").click();
  }
});
