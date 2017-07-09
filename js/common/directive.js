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
        element.on('blur', function (e) {
            var elementValue = e.target.value;
            if(elementValue) {
              elementValue = elementValue.replace(/[^0-9.]/g, '');
              e.target.value = $filter('number')(elementValue, 2);
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
              e.target.value = $filter('number')(elementValue, 2);
              scope.$apply();
            }
        });
      }
    };
});


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
                digits = decimalSplitValues[0] + "." +decimalSplitValues[1];
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
              e.target.value = $filter('number')(elementValue, 2);
              scope.$apply();
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
            scope.htmlTooltip[e.target.name.toLocaleLowerCase()]=$sce.trustAsHtml(message);
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
        return Math.round(input);
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
      });

    }
  };
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
                if(dateVal) {
                  if(!(regexp.test(dateVal) && !isNaN(Date.parse(dateVal)))) {
                    ngModel.$modelValue = undefined;
                    e.currentTarget.style.border="1px solid #f17777"
                    message = "The date format is not valid. Valid Format is: MM/DD/YYYY";
                    scope.$apply();
                  } else {
                    $parse(attr.ngModel).assign(scope, $filter('date')(new Date(Date.parse(dateVal)), xmlDateFormat));
                    e.currentTarget.style.border=""
                    message = "";
                    scope.$apply();
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


app.directive('helpVerbiage', function ($window, $compile) {
    return {
      restrict: 'EA',
      link: function (scope, elem, attr) {
        var currentname = attr.name;
        if(attr.title == "help_tooltip"){
              var template ='<span class="helpText tooltip-msg"> ? <span><b></b><span>';
          }
          if(attr.title == "help_tooltip_text"){
              var template ='<span class="helpText tooltip-msg tooltip_text"> ? <span><b></b><span>';
          }
           if(attr.title == "help_tooltip_padding"){
              var template ='<span class="helpText tooltip-msg tooltip_padding"> ? <span><b></b><span>';
          }
          if(attr.title == "help_tooltip_padding_left"){
              var template ='<span class="helpText tooltip-msg tooltip_padding_left"> ? <span><b></b><span>';
          }
          if(attr.title == "calenderInput"){
              var template ='<span class="helpText tooltip-msg calenderInput"> ? <span><b></b><span>';
          }
          if(attr.title == "leftTooltip"){
              var template ='<span class="helpText tooltip-msg left"> ? <span><b></b><span>';
          }
          if(attr.title == "topTooltip"){
              var template ='<span class="helpText tooltip-msg top"> ? <span><b></b><span>';
          }
        template += '</span></span></span>'
        elem.html(template);
        $compile(elem.contents())(scope);

        elem.on('mouseenter', function (e) {
          var helpgetid = $("#"+attr.name).html();
          if(attr.title == "help_tooltip"){
              var template ='<span class="helpText tooltip-msg"> ? <span><b></b><span>';
          }
          if(attr.title == "help_tooltip_text"){
              var template ='<span class="helpText tooltip-msg tooltip_text"> ? <span><b></b><span>';
          }
           if(attr.title == "help_tooltip_padding"){
              var template ='<span class="helpText tooltip-msg tooltip_padding"> ? <span><b></b><span>';
          }
          if(attr.title == "help_tooltip_padding_left"){
              var template ='<span class="helpText tooltip-msg tooltip_padding_left"> ? <span><b></b><span>';
          }
          if(attr.title == "calenderInput"){
              var template ='<span class="helpText tooltip-msg calenderInput"> ? <span><b></b><span>';
          }
          if(attr.title == "leftTooltip"){
              var template ='<span class="helpText tooltip-msg left"> ? <span><b></b><span>';
          }
          if(attr.title == "topTooltip"){
              var template ='<span class="helpText tooltip-msg top"> ? <span><b></b><span>';
          }
          template += helpgetid
          template += '</span></span></span>'
          elem.html(template);
          $compile(elem.contents())(scope);
        });

        elem.on('mouseleave', function (e) {
          var template ='<span class="helpText tooltip-msg"> ? <span><b></b><span>';
          template += '</span></span></span>'
          elem.html(template);
          $compile(elem.contents())(scope);
        });
                
      }
  };
});