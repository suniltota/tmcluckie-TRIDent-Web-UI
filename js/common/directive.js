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
            $e.css("width", ($window.innerWidth - ($window.innerWidth/100*96)) + "px");
        }
    }
});
app.directive('sideBarHeight', function ($window) {
    return {
        compile: function (element) {
            var $e = angular.element(element);
            var $w = angular.element($window);
            $e.css("height", ($window.innerHeight - 150) + "px");
            $e.css("padding", 0);
            $w.on("resize", function () {
                $e.css("height", ($window.innerHeight) - 150 + "px");
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
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) {
                return;
            }

            ctrl.$parsers.unshift(function (viewValue) {
                var plainNumber = viewValue.replace(/[\-\.]/g, '');
                if (plainNumber.toString().length === 9) {
                    plainNumber = plainNumber.toString().slice(0, 5) + "-" + plainNumber.toString().slice(5);
                } else if (plainNumber.toString().length === 5) {
                    plainNumber = plainNumber.toString();
                }

                elem.val(plainNumber);

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
            var digits = val.replace(/[^0-9.]/g, '');
            var decimalSplitValues = digits.split('.');

            if (decimalSplitValues[1]!=undefined && decimalSplitValues[1].length > 2) {
              decimalSplitValues[1] = decimalSplitValues[1].substring(0, 2);
              digits = decimalSplitValues[0]+"."+decimalSplitValues[1];
            }
            

            if (digits !== val) {
              ctrl.$setViewValue(digits);
              ctrl.$render();
            }
            return parseFloat(digits);
          }
          return undefined;
        }            
        ctrl.$parsers.push(inputValue);
      }
    };
});

app.directive('negativeDigits', function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attr, ctrl) {
        function inputValue(val) {
          if (val) {
            var digits = val.replace(/[^0-9.]/g, '');
            var decimalSplitValues = digits.split('.');

            if (decimalSplitValues[1]!=undefined && decimalSplitValues[1].length > 2) {
              decimalSplitValues[1] = decimalSplitValues[1].substring(0, 2);
              digits = decimalSplitValues[0]+"."+decimalSplitValues[1];
            }
            

            if (digits !== val) {
              ctrl.$setViewValue(digits);
              ctrl.$render();
            }
            var negativeVal = 0-parseFloat(digits)

            return negativeVal;
          }
          return undefined;
        }            
        ctrl.$parsers.push(inputValue);
      }
    };
});