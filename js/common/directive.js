app.directive('dynamicHeight', function ($window) {
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

app.directive('zipcodeFormat', function ($filter) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) {
                return;
            }

            ctrl.$formatters.push(function () {
                return formatValue(ctrl.$modelValue, 'formxml');
            });

            function formatValue(viewValue, sourcefrom) {
              if(viewValue) {
                var plainNumber = viewValue.replace(/[\-\.]/g, '');
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
                var plainNumber = formatValue(viewValue);

                ctrl.$setViewValue(plainNumber);
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
            if(ctrl.$modelValue)
              return $filter('number')(ctrl.$modelValue);
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

            return 0-parseFloat(digits);
          }
          return undefined;
        }            
        ctrl.$parsers.push(inputValue);
      }
    };
});

app.directive('decimalDigitsWithNumberFormat', function ($compile, $filter) {
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
      }
    };
});


app.directive('percentageFormat', function () {
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
        return Math.round(input);
    };
});

app.filter('ceil', function() {
    return function(input) {
        return Math.ceil(input);
    };
});
