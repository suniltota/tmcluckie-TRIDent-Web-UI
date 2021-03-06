﻿app.directive('dynamicHeight', function ($window) {
    return {
        compile: function (element) {
            var $e = angular.element(element);
            var $w = angular.element($window);
            $e.css("height", ($window.innerHeight - 100) + "px");
            $e.css("padding", 0);
            $w.on("resize", function () {
                $e.css("height", ($window.innerHeight) - 100 + "px");
            })
        }
    }
});

app.directive('dynamicHeightMin', function ($window) {
    return {
        compile: function (element) {
            var $e = angular.element(element);
            var $w = angular.element($window);
            $e.css("min-height", ($window.innerHeight - 100) + "px");
            $e.css("padding", 0);
            $w.on("resize", function () {
                $e.css("min-height", ($window.innerHeight) - 100 + "px");
            })
        }
    }
});

app.directive('dynamicHeightMinPageView', function ($window) {
     return {
         compile: function (element) {
             var $e = angular.element(element);
             var $w = angular.element($window);
             $e.css("min-height", ($window.innerHeight - 130) + "px");
             $w.on("resize", function () {
                 $e.css("min-height", ($window.innerHeight) - 130 + "px");
             })
         }
     }
 });

app.directive('pdfWidth', function ($window) {
    return {
        compile: function (element) {
            var $e = angular.element(element);
            var $w = angular.element($window);
            $e.css("width", ($window.innerWidth - ($window.innerWidth/100*4)) + "px");
            $e.css("left", ($window.innerWidth - ($window.innerWidth/100*96)) + "px");
            $e.css("padding", 0);
        }
    }
});

app.directive('sideBarWidth', function ($window) {
    return {
        compile: function (element) {
            var $e = angular.element(element);
            var $w = angular.element($window);
            $e.css("height", ($window.innerHeight - 180) + "px");
            $w.on("resize", function () {
                    $e.css("height", ($window.innerHeight - 180) + "px");
                   // $e.jScrollPane();
            })
        }
    }
});
app.directive('sideBarHeight', function ($window) {
    return {
        compile: function (element) {
            var $e = angular.element(element);
            var $w = angular.element($window);
            $e.css("height", ($window.innerHeight - 160) + "px");
            $e.css("width", ($window.innerWidth - ($window.innerWidth/100*85)) + "px");
            $w.on("resize", function () {
                $e.css("height", ($window.innerHeight) - 160 + "px");
                //$e.jScrollPane();
            })
        }
    }
});

app.directive('headerWidth', function ($window) {
    return {
        compile: function (element) {
            var $e = angular.element(element);
            var $w = angular.element($window);
            $e.css("width", ($window.innerWidth) + "px");
        }
    }
});
app.filter('range', function(){
    return function(n) {
        var res = [];
        for (var i = 0; i < n; i++) {
            res.push(i);
        }
        return res;
    };
});
app.directive('decimalPlaces',function(){
    return {
        link:function(scope,ele,attrs){
            ele.bind('keypress',function(e){
                var newVal=$(this).val()+(e.charCode!==0?String.fromCharCode(e.charCode):'');
                if($(this).val().search(/(.*)\.[0-9][0-9][0-9]/)===0 && newVal.length>$(this).val().length){
                    e.preventDefault();
                }
            });
        }
    };
});

app.directive('numberFormat', function ($filter) {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) {
                return;
            }

            ctrl.$parsers.unshift(function (viewValue) {
                var plainNumber = viewValue.replace(/[\,\.]/g, ''),
                    b = $filter('number')(plainNumber);
                    b = b==0 ? '' : b;

                elem.val(b);

                return plainNumber;
            });
        }
    };
});

app.directive('fileModel', ['$parse', function ($parse) {
    return {
       restrict: 'A',
       link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;
          
          element.bind('change', function(){
             scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
             });
          });
       }
    };
}]);

app.directive('zipcodeFormat', function ($filter, $parse, $sce) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
           var allowedInput = false;
           var message = ""
            elem.bind('blur', function (e) {
              if(e.target.value){
                 e.target.value = formatValue(e.target.value, 'formxml');
                e.currentTarget.style.border="";
                message = "";
               }else {
               // e.target.value = '00000';
                $parse(attrs.ngModel).assign(scope, '00000');
                e.currentTarget.style.border="1px solid #f17777";
                message = "Must be a 5 or 9 digit value";
              }
              scope.htmlTooltip[e.target.name.toLocaleLowerCase()]=$sce.trustAsHtml(message);
            });
            if (!ctrl) {
                return;
            }

            ctrl.$formatters.push(function () {
                return formatValue(ctrl.$modelValue, 'formxml');
            });

            function formatValue(viewValue, sourcefrom) {
              if(viewValue) {
                var plainNumber = viewValue.replace(/[^0-9]/g, '');
                if (plainNumber.length >= 9) {
                    var plainNumber1 = plainNumber.slice(0, 5);
                    var plainNumber2 = plainNumber.slice(5);
                    if(plainNumber2.length>4) 
                      plainNumber2 = plainNumber2.slice(0,4);
                    plainNumber = plainNumber1 + "-" + plainNumber2;
                } else if (plainNumber.length > 5 && plainNumber.length < 9) {
                    var plainNumber1 = plainNumber.slice(0, 5);
                    var plainNumber2 = plainNumber.slice(5);
                    if(sourcefrom == 'formxml'){
                      for(var i=plainNumber2.length; i<4; i++) {
                        plainNumber2 = plainNumber2+"0";
                      }
                    }
                    plainNumber = plainNumber1 + "-" + plainNumber2;
                } else if (plainNumber.length === 5) {
                    plainNumber = plainNumber.toString();
                } else if (plainNumber.length < 5) {
                  if(sourcefrom == 'formxml'){
                    for(var i=plainNumber.length; i<5; i++) {
                      plainNumber = plainNumber+"0";
                    }
                  }
                  plainNumber = plainNumber.toString();
                }
                return plainNumber;
              }
              return undefined;
            }

            ctrl.$parsers.push(function (viewValue) {
                var plainNumber = viewValue.replace(/[^0-9]/g, '');
                plainNumber = plainNumber.toString();
                if (plainNumber.length >= 9) {
                  plainNumber = plainNumber.slice(0, 9);
                } else if(plainNumber>5) {
                  var diff = 9 - plainNumber.length;
                  for(var i=0; i<diff; i++) 
                    plainNumber = plainNumber+"0";
                } else if(plainNumber<5) {
                  var diff = 5 - plainNumber.length;
                  for(var i=0; i<diff; i++) 
                    plainNumber = plainNumber+"0";
                }
                ctrl.$setViewValue(formatValue(viewValue));
                ctrl.$render();
                return plainNumber;

            });
        }
    };
});

app.directive('phonenumberFormat', function ($filter, $parse, $sce) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
           var allowedInput = false;
           var message = ""
            elem.bind('blur', function (e) {
              if(e.target.value){
                 e.target.value = formatValue(e.target.value, 'formxml');
                e.currentTarget.style.border="";
                message = "";
               }else {
               // e.target.value = '00000';
                $parse(attrs.ngModel).assign(scope, '0000000000');
                e.currentTarget.style.border="1px solid #f17777";
                message = "Must be a 10 digit value";
              }
              scope.htmlTooltip[e.target.name.toLocaleLowerCase()]=$sce.trustAsHtml(message);
            });
            if (!ctrl) {
                return;
            }

            ctrl.$formatters.push(function () {
                return formatValue(ctrl.$modelValue, 'formxml');
            });

            function formatValue(viewValue, sourcefrom) {
              if(viewValue) {
                var plainNumber = viewValue.replace(/[^0-9]/g, '');
                if (plainNumber.length >= 11) {
                    var plainNumber1 = plainNumber.slice(0, 3);
                    var plainNumber2 = plainNumber.slice(3,6);
                    var plainNumber3= plainNumber.slice(6);
                    if(plainNumber3.length>2) 
                      plainNumber3 = plainNumber3.slice(0,4);
                    plainNumber = plainNumber1 + "-" + plainNumber2 +"-" +plainNumber3;
                } else if (plainNumber.length > 3 && plainNumber.length < 12) {
                    var plainNumber1 = plainNumber.slice(0, 3);
                    var plainNumber2 = plainNumber.slice(3,6);
                    var plainNumber3= plainNumber.slice(6);
                    if(sourcefrom == 'formxml'){
                      for(var i=plainNumber3.length; i<4; i++) {
                        plainNumber3 = plainNumber3+"0";
                      }
                    }
                    plainNumber = plainNumber1 + "-" + plainNumber2 + "-"+plainNumber3;
                } else if (plainNumber.length === 3) {
                    plainNumber = plainNumber.toString();
                } else if (plainNumber.length < 3) {
                  if(sourcefrom == 'formxml'){
                    for(var i=plainNumber.length; i<3; i++) {
                      plainNumber = plainNumber+"0";
                    }
                  }
                  plainNumber = plainNumber.toString();
                }
                return plainNumber;
              }
              return undefined;
            }

            ctrl.$parsers.push(function (viewValue) {
                var plainNumber = viewValue.replace(/[^0-9]/g, '');
                plainNumber = plainNumber.toString();
                if (plainNumber.length >= 10) {
                  plainNumber = plainNumber.slice(0, 10);
                } else if(plainNumber>3) {
                  var diff = 10 - plainNumber.length;
                  for(var i=0; i<diff; i++) 
                    plainNumber = plainNumber+"0";
                } else if(plainNumber<3) {
                  var diff = 3 - plainNumber.length;
                  for(var i=0; i<diff; i++) 
                    plainNumber = plainNumber+"0";
                }
                ctrl.$setViewValue(formatValue(viewValue));
                ctrl.$render();
                return plainNumber;

            });
        }
    };
});

app.directive('onlyDigits', function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attr, ctrl) {
        function inputValue(val) {
          if (val) {
            var digits = val.replace(/[^0-9]/g, '');
            
            if (digits !== val) {
              ctrl.$setViewValue(digits);
              ctrl.$render();
            }
            return parseInt(digits);
          }
          return undefined;
        }            
        ctrl.$parsers.push(inputValue);
      }
    };
});

app.directive('negativeDigits', function ($filter) {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attr, ctrl) {
        if (!ctrl) {
            return;
        }

        ctrl.$formatters.push(function () {
            if(ctrl.$modelValue) {
              if(ctrl.$modelValue.toString().indexOf("-")!=-1) {
                var value = ctrl.$modelValue.toString().replace(/[\-\,]/g, '');
                return $filter('number')(value, 2);
              } else {
                return $filter('number')(ctrl.$modelValue, 2);
              }
            } else
              return (ctrl.$modelValue);
        });

        function inputValue(val) {
          if (val) {
            var digits = val.replace(/[^0-9.]/g, '');
            var isContainsDecimal = digits.indexOf(".");
            var viewValue = "";
            if(isContainsDecimal != -1) {
                var decimalSplitValues = digits.split('.');
                if(decimalSplitValues[0].length>9)
                  decimalSplitValues[0] = decimalSplitValues[0].substring(0, 9);
                viewValue = $filter('number')(decimalSplitValues[0]);
                            
                if (decimalSplitValues[1]!="" && decimalSplitValues[1].length > 2) {
                  decimalSplitValues[1] = decimalSplitValues[1].substring(0, 2);
                  viewValue = viewValue + "." +decimalSplitValues[1];
                } else if(decimalSplitValues[1].length == 2 || decimalSplitValues[1].length < 2){
                   viewValue = viewValue + "." + decimalSplitValues[1];
                } else {
                  viewValue = viewValue + ".";
                }
                if(window.localStorage.documentType != 'closingdisclosure'){ 
                  digits = Math.round(decimalSplitValues[0] + "." +decimalSplitValues[1]);
                } else{ 
                  digits = decimalSplitValues[0] + "." +decimalSplitValues[1];
                }
            } else {
              if( digits.length>9)
                digits = digits.substring(0, 9);
              viewValue = $filter('number')(digits);
            }
            ctrl.$setViewValue(viewValue);
            ctrl.$render();

            return 0-parseFloat(digits);
          }
          return undefined;
        }            
        ctrl.$parsers.push(inputValue);
        element.on('blur', function (e) {
            var elementValue = e.target.value;
            if(elementValue) {
              elementValue = elementValue.replace(/[^0-9.]/g, '');
            if(window.localStorage.documentType != 'closingdisclosure'){ 
              e.target.value = $filter('number')(Math.round(elementValue), 2);
            }else{ 
              e.target.value = $filter('number')(elementValue, 2);
            }
              scope.$apply();
            }
        });
      }
    };
});

app.directive('decimalDigitsWithNumberFormat', function ($compile, $filter) {
     return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attr, ctrl) {
         var allowedInput = false;
           var message = ""
        if (!ctrl) {
            return;
        }

        ctrl.$formatters.push(function () {
            if(ctrl.$modelValue)
              return $filter('number')(ctrl.$modelValue, 2);
            else
              return (ctrl.$modelValue);
        });

        function inputValue(val) {
          if (val) {
            var digits = val.replace(/[^0-9.]/g, '');
            var isContainsDecimal = digits.indexOf(".");
            var viewValue = "";
            if(isContainsDecimal != -1) {
                var decimalSplitValues = digits.split('.');
                if(decimalSplitValues[0].length>9)
                  decimalSplitValues[0] = decimalSplitValues[0].substring(0, 9);
                viewValue = $filter('number')(decimalSplitValues[0]);                           
                if (decimalSplitValues[1]!="" && decimalSplitValues[1].length > 2) {
                  decimalSplitValues[1] = decimalSplitValues[1].substring(0, 2);
                  viewValue = viewValue + "." +decimalSplitValues[1];
                } else if(decimalSplitValues[1].length == 2 || decimalSplitValues[1].length < 2){
                   viewValue = viewValue + "." + decimalSplitValues[1];
                } else {
                  viewValue = viewValue + ".";
                }
                   digits = decimalSplitValues[0] + "." +decimalSplitValues[1];
            } else {
              if( digits.length>9)
                digits = digits.substring(0, 9);
              viewValue = $filter('number')(digits);
            }
            ctrl.$setViewValue(viewValue);
            ctrl.$render();
            return parseFloat(digits).toFixed(2);
          }
          return undefined;
        }            
        ctrl.$parsers.push(inputValue);

        element.on('blur', function (e) {
            var elementValue = e.target.value;
            if(elementValue) {
              elementValue = elementValue.replace(/[^0-9.]/g, '');
              e.target.value = $filter('number')(elementValue);
            
            }
        });
      }
    };
});

///
app.directive('decimalDigitsWithNumberFormatRound', function ($compile, $filter) {
     return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attr, ctrl) {

         var allowedInput = false;
           var message = "";
        if (!ctrl) {
            return;
        }
  
        ctrl.$formatters.push(function () {
            if(ctrl.$modelValue)
              return $filter('number')(Math.round(ctrl.$modelValue).toFixed(2));
            else
              return ctrl.$modelValue;
           
        });
        function inputValue(val) {
          if (val) {
            if(isFloat(val)==true){
               val=val.toString();
              var digits = val.replace(/[^0-9.]/g, '');
            } else{
              val=val.toString();
              var digits = val.replace(/[^0-9.]/g, '');
            }
            
            var isContainsDecimal = digits.indexOf(".");
            var viewValue = "";
            if(isContainsDecimal != -1) {
                var decimalSplitValues = digits.split('.');
                if(decimalSplitValues[0].length>9)
                  decimalSplitValues[0] = decimalSplitValues[0].substring(0, 9);
                viewValue = $filter('number')(decimalSplitValues[0]);
                            
                if (decimalSplitValues[1]!="" && decimalSplitValues[1].length > 2) {
                  decimalSplitValues[1] = decimalSplitValues[1].substring(0, 2);
                  viewValue = viewValue + "." +decimalSplitValues[1];
                } else if(decimalSplitValues[1].length == 2 || decimalSplitValues[1].length < 2){
                   viewValue = viewValue + "." + decimalSplitValues[1];
                } else {
                  viewValue = viewValue + ".";
                }
                if(window.localStorage.documentType != 'closingdisclosure'){ 
                  digits = Math.round(decimalSplitValues[0] + "." +decimalSplitValues[1]);
                } else{ 
                   digits = decimalSplitValues[0] + "." +decimalSplitValues[1];
                }
            } else {
              if( digits.length>9)
                digits = digits.substring(0, 9);
              viewValue = $filter('number')(digits);
            }
            ctrl.$setViewValue(viewValue);
            ctrl.$render();

            return parseFloat(digits).toFixed(2);
          }
          return undefined;
        }            
        function isFloat(n) {
          return n === +n && n !== (n|0);
          }
          function isInteger(n) {
            return n === +n && n === (n|0);
          }
        ctrl.$parsers.push(inputValue);
        ctrl.$formatters.push(inputValue);

        element.on('blur', function (e) {
            var elementValue = e.target.value;
            if(elementValue) {
              elementValue = elementValue.replace(/[^0-9.]/g, '');
              if(window.localStorage.documentType != 'closingdisclosure'){ 
              e.target.value = $filter('number')(Math.round(elementValue), 2);
            }else{ 
              e.target.value = $filter('number')(elementValue, 2);
            }
             // scope.$apply();
            }
        });
      }
    };
});

///
app.directive('decimalDigitsWithNumberFormatAllowNegative', function ($compile, $filter) {
     return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attr, ctrl) {
        if (!ctrl) {
            return;
        }

        ctrl.$formatters.push(function () {
            if(ctrl.$modelValue)
              return $filter('number')(ctrl.$modelValue, 2);

            else
              return (ctrl.$modelValue);
        });

        function inputValue(val) {
          if (val) {
            var digits = val.replace(/[^0-9.-]/g, '');
            if(digits.charAt(0)!='-')
              digits = digits.replace(/[^0-9.]/g, '');
            else
              digits = digits.charAt(0) + digits.substring(1, digits.length).replace(/[^0-9.]/g, '');
            var isContainsDecimal = digits.indexOf(".");
            var viewValue = "";
            if(isContainsDecimal != -1) {
                var decimalSplitValues = digits.split('.');
                if(decimalSplitValues[0].length>9)
                  decimalSplitValues[0] = decimalSplitValues[0].substring(0, 9);
                viewValue = $filter('number')(decimalSplitValues[0]);
                            
                if (decimalSplitValues[1]!="" && decimalSplitValues[1].length > 2) {
                  decimalSplitValues[1] = decimalSplitValues[1].substring(0, 2);
                  viewValue = viewValue + "." +decimalSplitValues[1];
                } else if(decimalSplitValues[1].length == 2 || decimalSplitValues[1].length < 2){
                   viewValue = viewValue + "." + decimalSplitValues[1];
                } else {
                  viewValue = viewValue + ".";
                }
                if(window.localStorage.documentType != 'closingdisclosure'){ 
                  digits = Math.round(decimalSplitValues[0] + "." +decimalSplitValues[1]);
                } else{ 
                  digits = decimalSplitValues[0] + "." +decimalSplitValues[1];
                }
            } else {
              if(digits.length==1 && digits.charAt(0)=='-') {
                viewValue = digits;
              } else {
                if( digits.length>9)
                  digits = digits.substring(0, 9);
                viewValue = $filter('number')(digits);
              }
            }
            ctrl.$setViewValue(viewValue);
            ctrl.$render();
            if(digits.length==1 && digits.charAt(0)=='-') {
              return parseFloat(0).toFixed(2);
            }
            return parseFloat(digits).toFixed(2);
          }
          return undefined;
        }
        ctrl.$parsers.push(inputValue);

        element.on('blur', function (e) {
            var elementValue = e.target.value;
            if(elementValue) {
              elementValue = elementValue.replace(/[^0-9.-]/g, '');
              if(window.localStorage.documentType != 'closingdisclosure'){ 
                e.target.value = $filter('number')(Math.round(elementValue), 2);
              }else{ 
                e.target.value = $filter('number')(elementValue, 2);
              }
              //scope.$apply();
            }
        });
      }
    };
});


app.directive('percentageFormat', function ($filter, $sce) {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attr, ctrl) {

        if (!ctrl) {
            return;
        }

        ctrl.$formatters.push(function () {
            return inputValue(ctrl.$modelValue);
        });

        function inputValue(val) {
          if (val) {
            val = val.toString();
            var digits = val.replace(/[^0-9.]/g, '');
            var decimalSplitValues = digits.split('.');
            if(decimalSplitValues[0].length>3)
              decimalSplitValues[0] = decimalSplitValues[0].substring(0, 3);
                        
            if (decimalSplitValues[1]!=undefined && decimalSplitValues[1].length > 4) {
              decimalSplitValues[1] = decimalSplitValues[1].substring(0, 4);
            }

            if(decimalSplitValues.length==2)
                digits = decimalSplitValues[0] +"."+decimalSplitValues[1];
            else if (decimalSplitValues.length==1)
                digits = decimalSplitValues[0];
            
            if (digits !== val) {
              ctrl.$setViewValue(digits);
              ctrl.$render();
            }
            return digits;
          }
          return undefined;
        }
        ctrl.$parsers.push(inputValue);

        element.on('blur', function (e) {
            var elementValue = e.target.value;
            if(elementValue != ""){
            var elementValue = elementValue.replace(/[^0-9.]/g, '');
            var decimalSplitValues = elementValue.split('.');
            if(decimalSplitValues[0] == 25){
                decimalSplitValues[1] = "00"
                elementValue = decimalSplitValues[0] + '.'+ decimalSplitValues[1]
              }
            if(decimalSplitValues[0].length <= 3 && decimalSplitValues[0] <= 25 && elementValue != "") {
              elementValue = elementValue.replace(/[^0-9.-]/g, '');
              e.target.value = $filter('number')(elementValue, 4);
              e.currentTarget.style.border=""
              message = "";
              scope.$apply();
            }else{
              e.currentTarget.style.border="1px solid #f17777"
              message = "Please enter a vaild percentage value between 0 to 25";
              //e.target.value = "";
              scope.$apply();
            }
            if(e.currentTarget.name == 'lefeeSummaryTotalInterestPercent'){
                e.target.value = $filter('number')(elementValue, 4);
                e.currentTarget.style.border=""
                message = "";
                scope.$apply();

            }
            scope.htmlTooltip[e.target.name.toLocaleLowerCase()]=$sce.trustAsHtml(message);
          }
        });
      }
    };
});

app.directive('months2years', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ctrl) {

     if (!ctrl) {
          return;
      }
      ctrl.$formatters.push(function () {
          if(ctrl.$modelValue) {
            return Math.round((ctrl.$modelValue)/12);
          } else{
            return ctrl.$modelValue;
          }
      });
      function inputValue(val) {
        if(val) {
          ctrl.$setViewValue(Math.round(val/12));
          ctrl.$render();
        }
        return val;
      }
      ctrl.$parsers.push(inputValue);
    }
  };
});




app.filter('round', function() {
    return function(input) {
      if(input)
        return Math.round(input).toFixed(2);
      else
        return input;
    };
});

app.filter('ceil', function() {
    return function(input) {
       if(input)
        return Math.ceil(input);
      else
        return input;
    };
});

app.filter('num', function() {
    return function(input) {
      if(input)
        return parseInt(input, 10);
      else
        return input;
    };
});
app.directive('number', function() {
  var NUMBER_REGEXP = /^(\d+)$/;
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.number = function(modelValue, viewValue) {
        return NUMBER_REGEXP.test(viewValue);
      };
    }
  };
});
app.directive('alpha', function() {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, elem, attr, ngModel) {

      var validator = function(value) {
        if (/^[a-zA-Z]*$/.test(value)) {
          ngModel.$setValidity('alpha', true);
          return value;
        } else {
          ngModel.$setValidity('alpha', false);
          return undefined;
        }
      };
      ngModel.$parsers.unshift(validator);
      ngModel.$formatters.unshift(validator);
    }
  };
});

app.directive('requireField', function($sce) {
  return {
    require: 'ngModel',
    link: function(scope, elem, attr, ngModel) {
      var toolTipPos ="top";
      var message = ""

      elem.on('blur', function (e) {
        var fieldValue = e.target.value;
          if(fieldValue == ""){
              e.currentTarget.style.border="1px solid #f17777"
              message = "This is a required field";
          }else{
            e.currentTarget.style.border=""
              message = "";
          }
          scope.htmlTooltip[e.target.name.toLocaleLowerCase()]=$sce.trustAsHtml(message);
      });

      elem.on('change', function (e) {
        var fieldValue = e.target.value;
          if(fieldValue == ""){
              e.currentTarget.style.border="1px solid #f17777"
              message = "This is a required field";
          }else{
            e.currentTarget.style.border=""
              message = "";
          }
          scope.htmlTooltip[e.target.name.toLocaleLowerCase()]=$sce.trustAsHtml(message);
      });
    }
  };
});

app.directive('minMaxValue', function($sce) {
  return {
    require: 'ngModel',
    link: function(scope, elem, attr, ngModel) {
      elem.on('blur', function (e) {
        if(attr.minVal != undefined && attr.maxVal != undefined){
          var min = parseInt(attr.minVal);
          var max = parseInt(attr.maxVal);
          var value = parseInt(e.target.value);
          if(!isNaN(value)){
          if(value < min || value > max){
              if(value < min){
                e.target.value = "";
                e.currentTarget.style.border="1px solid #f17777"
                message = "Min value should be " + min;
              }
              if(value > max){
                e.target.value = "";
                e.currentTarget.style.border="1px solid #f17777"
                message = "Max value should be " + max;
              }
          }else{
            e.currentTarget.style.border=""
            message = "";
          }
          scope.htmlTooltip[e.target.name.toLocaleLowerCase()]=$sce.trustAsHtml(message);
        }
          
        }
      });

    }
  };
});

app.directive('minAndMaxCheck', function($sce, $compile) {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, elem, attr, ngModel) {
       elem.on('blur', function (e) {
        var min = parseFloat(scope.$eval(attr.minVal));
        var max = parseFloat(scope.$eval(attr.maxVal));
        var targetElemValue = e.target.value ? e.target.value.replace(/[^0-9.]/g, '') : e.target.value;
        var value = parseFloat(targetElemValue);
        if(!isNaN(value)){
        if(value > max){
           e.currentTarget.style.border="1px solid #f17777"
            if(attr.name == "initialPrincipalAndInterestPaymentAmount"){
            message = "value should be greater than loan amount";
           }else{
             message = "value should be less than maximum value " + max;
             }

        }else if(value < min){
           e.currentTarget.style.border="1px solid #f17777"
           message = "value should be greater than minimum value " + min;
        }else{
          e.currentTarget.style.border=""
          message = "";
        }
        }else{
          e.currentTarget.style.border=""
          message = "";
        }
        scope.htmlTooltip[e.target.name.toLocaleLowerCase()]=$sce.trustAsHtml(message);
        $compile(elem.contents())(scope);
      })

    }
  };
});


app.directive('checkLoanTermBalloon', function ($sce, $compile)
{ 
  return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModel)
        {
           element.on('blur', function (e) {
              var years = scope.cdformdata.loanInformation.loanTermYears;
              var months = scope.cdformdata.loanInformation.loanTermMonths;
              if(years == undefined){
                years = 0;
              }
              if(months == undefined){
                months = 0;
              }
              var loanYears = Number(years);
              var loanMonths = Number(months);
              var targetVal = Number(e.target.value);
              var finalMonths = (loanYears*12) + loanMonths;
              var finalYears = loanYears + (loanMonths/12);
              if(targetVal <  finalMonths && e.target.name =='loanAmortizationPeriodMonthCount'){
                    e.currentTarget.style.border="1px solid #f17777"
                    message = "Amortization Period Count should be greater than loan term (" + finalMonths + " months)";
                    scope.$apply();
              }
              else if(targetVal <  finalYears && e.target.name =='loanAmortizationPeriodYearCount'){
                    e.currentTarget.style.border="1px solid #f17777"
                    message = "Amortization Period Count should be greater than loan term (" + finalYears + " years)";
                    scope.$apply();
              }else{
                e.currentTarget.style.border=""
                    message = "";
                    scope.$apply();
              }
              scope.htmlTooltip[e.target.name.toLocaleLowerCase()]=$sce.trustAsHtml(message);
              $compile(element.contents())(scope);
          });

        }
    }
});

app.directive('actualizeDate', function ($timeout, $filter, staticData, $parse, $sce, $compile)
{
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModel)
        {
            var regexp = /^(?:(?:(?:0?[13578]|1[02])(\/)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
            var viewDateFormat = staticData.dateDisplayFormat;
            var xmlDateFormat = "yyyy-MM-dd";
            var allowedInput = false;
            var message = ""
            var toolTipPos =  "top";

            ngModel.$parsers.push(function(value){
                if(value && !isNaN(Date.parse(value))) {
                  return $filter('date')(new Date(Date.parse(value)), xmlDateFormat);
                } else {
                   return undefined;
                }
            });

            element.on('blur', function (e) {
                var dateVal = e.target.value;
                var minDateVal = scope.$eval(attr.minDate);
                var maxDateVal = scope.$eval(attr.maxDate);

                if(dateVal) {
                  if(!(regexp.test(dateVal) && !isNaN(Date.parse(dateVal)))) {
                    ngModel.$modelValue = undefined;
                    e.currentTarget.style.border="1px solid #f17777"
                    message = "The date format is not valid. Valid Format is: MM/DD/YYYY";
                    scope.$apply();
                  }else{
                    dateVal = dateVal.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
                    var targetVal = new Date(dateVal);
                    var targetmindate = new Date(minDateVal);
                    var targetmaxdate = new Date(maxDateVal);
                    if(targetVal < targetmindate && attr.name == "disbursementDate"){
                      e.currentTarget.style.border="1px solid #f17777"
                      message = "date cannot occur prior to Closing Date";
                      scope.$apply();
                    } else if(targetVal < targetmindate && attr.name == "closingDate"){
                      e.currentTarget.style.border="1px solid #f17777"
                      message = "date cannot occur prior to Issued Date";
                      scope.$apply();
                    } else if(targetVal < targetmindate){
                      e.currentTarget.style.border="1px solid #f17777"
                      message = "date cannot occur prior to "+$filter('date')(targetmindate, viewDateFormat);
                      scope.$apply();
                    } else if(targetVal > targetmaxdate){
                      e.currentTarget.style.border="1px solid #f17777"
                      message = "date cannot occur after to "+$filter('date')(targetmaxdate, viewDateFormat);
                      scope.$apply();
                    } else {
                      $parse(attr.ngModel).assign(scope, $filter('date')(new Date(Date.parse(dateVal)), xmlDateFormat));
                      e.currentTarget.style.border=""
                      message = "";
                      scope.$apply();
                    }
                  }
                  scope.htmlTooltip[e.target.name.toLocaleLowerCase()]=$sce.trustAsHtml(message);
                  $compile(element.contents())(scope);
                }
            });
        }
    };
});

app.directive('actualizeInput', function($compile, $sce, staticData, $parse, $timeout, $filter) {
  return {
    require: 'ngModel',
    link: function($scope, elem, attr, ngModel) {
      var allowedInput = false;
      var toolTipPos =  "top";
       
      if(attr.tooltippos)
        toolTipPos =  attr.tooltippos;
        var message = "";
      
      if($scope.htmlTooltip == undefined)
        $scope.htmlTooltip = {}
      $scope.htmlTooltip[attr.name.toLowerCase()] = $sce.trustAsHtml(message);
      
      var template='<div>';
      if(attr.type != undefined && attr.type == "date"){
        if($scope.dateValidate ==  undefined)
          $scope.dateValidate={}
        $scope.dateValidate[attr.name.toLowerCase()] = {"maxDate": new Date(attr.maxDate)}
        template += '<input type="text" id="input_'+attr.id+'" uib-datepicker-popup="'+attr.dateformat+'" ng-change="'+attr.ngChange+'"  ng-blur="'+attr.ngBlur+'" ng-model="'+attr.ngModel+'" max-date="dateValidate.'+attr.name.toLowerCase()+'.maxDate" is-open="'+attr.isOpen+'" datepicker-options="dateOptions" ng-required="'+attr.ngRequired+'" close-text="Close" placeholder="'+attr.placeholder+'" name="'+attr.name+'" class="form-control InputTooltip calenderInput" tooltip-placement="'+toolTipPos+'"  tooltip-trigger="focus" uib-tooltip-html="htmlTooltip.'+attr.name.toLowerCase()+'"';
        if(attr.minDateVar){
           template += 'min-date="'+attr.minDateVar+'"';
        }else{
            $scope.dateValidate[attr.name.toLowerCase()].minDate=new Date(attr.minDate);
            template += 'min-date="dateValidate.'+attr.name.toLowerCase()+'.minDate"';
        }
        //template += '<input type="text" id="input_'+attr.id+'" uib-datepicker-popup="'+attr.dateformat+'" ng-change="'+attr.ngChange+'"  ng-blur="'+attr.ngBlur+'" ng-model="'+attr.ngModel+'" min-date="dateValidate.'+attr.name.toLowerCase()+'.minDate" max-date="dateValidate.'+attr.name.toLowerCase()+'.maxDate" is-open="'+attr.isOpen+'" datepicker-options="dateOptions" ng-required="'+attr.ngRequired+'" close-text="Close" placeholder="'+attr.placeholder+'" name="'+attr.name+'" class="form-control InputTooltip calenderInput" tooltip-placement="'+toolTipPos+'"  tooltip-trigger="focus" uib-tooltip-html="htmlTooltip.'+attr.name.toLowerCase()+'"';
      }else{
        template += '<input type="text" ng-model="'+attr.ngModel+'" ng-disabled="'+attr.ngDisabled+'" min-val="'+attr.minVal+'" max-val="'+attr.maxVal+'" ng-blur="'+attr.ngBlur+'" ng-keyup="'+attr.ngKeyup+'" ng-change="'+attr.ngChange+'" maxlength="'+attr.maxlength+'" name="'+attr.name+'" class="form-control InputTooltip" tooltip-placement="'+toolTipPos+'"  tooltip-trigger="focus" uib-tooltip-html="htmlTooltip.'+attr.name.toLowerCase()+'"';
      }

      if(attr.dependencies)
      template +=attr.dependencies;
      template +='>';
      template += '</div>';
      elem.html(template);
      $compile(elem.contents())($scope);
    }
  };
});


app.directive('helpVerbiage', function ($window, $compile, $sce) {
    return {
      restrict: 'EA',
      link: function (scope, elem, attr) {
        var currentname = attr.name;
        var getDynamicTemplate = function(){
          var classTemp="";
          if(attr.title == "help_tooltip"){
              classTemp ='<span class="helpText tooltip-msg" ng-mouseover="renderHelpText(\''+currentname+'\')"> ? <span>';
          }else if(attr.title == "help_tooltip_text"){
              classTemp ='<span class="helpText tooltip-msg tooltip_text" ng-mouseover="renderHelpText(\''+currentname+'\')"> ? <span>';
          }else if(attr.title == "help_tooltip_textLeft"){
              classTemp ='<span class="helpText tooltip-msg tooltip_textLeft" ng-mouseover="renderHelpText(\''+currentname+'\')"> ? <span>';
          }else if(attr.title == "help_tooltip_textTop"){
              classTemp ='<span class="helpText tooltip-msg tooltip_textTop" ng-mouseover="renderHelpText(\''+currentname+'\')"> ? <span>';
          }else if(attr.title == "help_tooltip_padding"){
              classTemp ='<span class="helpText tooltip-msg tooltip_padding" ng-mouseover="renderHelpText(\''+currentname+'\')"> ? <span>';
          }else if(attr.title == "help_tooltip_padding_left"){
              classTemp ='<span class="helpText tooltip-msg tooltip_padding_left" ng-mouseover="renderHelpText(\''+currentname+'\')"> ? <span>';
          }else if(attr.title == "calenderInput"){
              classTemp ='<span class="helpText tooltip-msg calenderInput" ng-mouseover="renderHelpText(\''+currentname+'\')"> ? <span>';
          }else if(attr.title == "leftTooltip"){
              classTemp ='<span class="helpText tooltip-msg left" ng-mouseover="renderHelpText(\''+currentname+'\')"> ? <span>';
          }else if(attr.title == "leftTooltip_select"){
              classTemp ='<span class="helpText tooltip-msg select_help" ng-mouseover="renderHelpText(\''+currentname+'\')"> ? <span>';
          }else if(attr.title == "leftTooltip_selectPadding"){
              classTemp ='<span class="helpText tooltip-msg select_helpPadding" ng-mouseover="renderHelpText(\''+currentname+'\')"> ? <span>';
          }else if(attr.title == "topTooltip"){
              classTemp ='<span class="helpText tooltip-msg top" ng-mouseover="renderHelpText(\''+currentname+'\')"> ? <span>';
          }else if(attr.title == "topPaddingTooltip"){
              classTemp ='<span class="helpText tooltip-msg topPadding" ng-mouseover="renderHelpText(\''+currentname+'\')"> ? <span>';
          }else if(attr.title == "help_tooltip_lg"){
              classTemp ='<span class="helpText tooltip-msg tooltip_lg" ng-mouseover="renderHelpText(\''+currentname+'\')"> ? <span>';
          }
          return classTemp + '<b></b>';
        }
        var template = getDynamicTemplate() + '</span></span>';
        elem.html(template);
        $compile(elem.contents())(scope);
      }
  };
});

app.directive('keyCapture', [function() {
    return {
      link: function (scope, element, attrs, controller) {
          element.on('keydown', function(e){
              scope.$root.uiKeyOrMouseEventTime = new Date().getTime();
          });
          element.on('click', function(e){
              scope.$root.uiKeyOrMouseEventTime = new Date().getTime();
          });
          element.on('mousewheel', function(e){
              scope.$root.uiKeyOrMouseEventTime = new Date().getTime();
          });
      }
    }
  }]
);