angular.module('business').controller('commonController', ['$state', 'commonService', '$localStorage', '$window', '$timeout', '$rootScope', 'ngDialog', '$scope', '$location', '$http',

    function($state, commonService, $localStorage, $window, $timeout, $rootScope, ngDialog, $scope, $location, $http) {

        var str = $location.$$absUrl;
        var isNotValidUrl = true;
        $scope.htest = function() {
            var leftpanel = angular.element('.left_col');
            var rightPanel = angular.element('.right_col');
            var left_height = leftpanel[0].clientHeight;
            var right_height = rightPanel[0].clientHeight;
            if (left_height) {
                rightPanel.css('min-height', leftpanel[0].offsetHeight);
            }
        }

        $scope.logout = function() {
            var logout = {};
            logout.client_id = "1e2cd2a0-07bb-11e7-9a5a-1c3e841ec9f3";
            logout.client_key = "HZSGKdWJOQ5V3n7h0U+FACuP8Gc=";
            commonService.logOut(logout, $localStorage.accessToken).then(function(logOuts) {
                 console.log(logOuts, 'logOuts');
                 $localStorage.accessToken = "";
                 // $state.go('sign');
            });
            

        }



        if ($localStorage.username) {
            $scope.menu = {};
            commonService.userRoles($localStorage).then(function(userRoles) {
                var userRolingId = JSON.parse($localStorage.data.userrole);
                $scope.menu['userName'] = $localStorage.username;
                var roles = userRoles.Roles;
                if (userRolingId.role == 'Admin') {
                    $localStorage.userRole = true;
                }
                console.log(roles)
                for (var key in roles) {
                    console.log('userRolingId', userRolingId)

                    if (userRolingId.role == roles[key].role_name) {
                        $scope.menu[roles[key].role_name] = true;
                    }
                }
                console.log($scope.menu);
                $localStorage.roles = $scope.menu;
            });

        }




        $scope.leftmenu = {};
        if ($localStorage.data) {
            if ($localStorage.data.username == "user") {
                $scope.leftmenu['user'] = true;

            } else {
                $scope.leftmenu['user'] = false;
            }
        } else {
            $scope.leftmenu['user'] = false;
        }

        $timeout(checkmenu, 400);

        function checkmenu(url) {
            url = "#" + $location.$$path;
            $('#sidebar-menu li').each(function(index) {
                if ($(this).children('a').attr("href") == url) {
                    if ($(this).hasClass("child_menu")) {
                        $('#sidebar-menu li').removeClass('current-page');
                        $(this).addClass("current-page");
                        $(this).addClass("active");
                        $(this).addClass("nv");
                        isNotValidUrl = false;
                        return false;
                    }
                    $('#sidebar-menu li').removeClass('current-page');
                    $(this).addClass("current-page");
                    $(this).parent('ul').parent('li').addClass("active");
                    $(this).parent('ul').parent('li').addClass("nv");
                    $(this).parent('ul').slideDown();
                    isNotValidUrl = false;
                }

            })
        }
    }
]);




angular.module('business').controller('userController', ['$alert', '$state', '$localStorage', '$window', '$timeout', '$rootScope', 'ngDialog', '$scope', '$location', '$http', 'commonService', 'billingService',
    function($alert, $state, $localStorage, $window, $timeout, $rootScope, ngDialog, $scope, $location, $http, commonService, billingService) {

        $scope.itemsPerPage = 6;
        $scope.total_count = 12;
        $scope.pluginselected = [];
        $scope.email = false;
        $scope.popups = false;
        $scope.emptyArray = [{
            "key": "",
            "index": 1,
            "value": ""
        }];
        $scope.previousbuttons = false; 
        // $localStorage.baseURL = "http://dev.palazzoinc.com";
        $localStorage.baseURL = "http://business-insights.local";
        $scope.finalJson = {};
        $scope.finalJson.credentials = [{ 
            key: "",
            value: ""
        }];

        $scope.billingbuttonName = "Choose";


        $scope.addCredentials = function(insertDetails) {
            $scope.finalJson[insertDetails].push({});
        }
        $scope.removecredentials = function(credentials, index) {
            $scope.finalJson[credentials].splice(index, 1);
        }


        anonymousTokenGenerate();
        function anonymousTokenGenerate() {
            var anonymous = {};
            anonymous.client_id = "1e2cd2a0-07bb-11e7-9a5a-1c3e841ec9f3";
            anonymous.client_key = "HZSGKdWJOQ5V3n7h0U+FACuP8Gc=";
            commonService.anonymousToken(anonymous).then(function(anonymousToken) {
                if(anonymousToken.status == 200){
                    console.log(anonymousToken, 'anonymousToken');
                $localStorage.accessToken = anonymousToken.access_token;
                }
                else{
                commonService.alertMessage('Api Failed To Load', 'error', $alert);
                }
                
            });
        }


 // MTQ5MzA5NzEzNTE2MDpiNWY2MWQ0Zi1iYmZkLTRjM2QtOTkyMi02ZDAzZGYyNzExY2Y6MWUyY2QyYTAtMDdiYi0xMWU3LTlhNWEtMWMzZTg0MWVjOWYz
//Anonymous//  MTQ5MzA5NzExNzkxMTphbm9ueW1vdXM6MWUyY2QyYTAtMDdiYi0xMWU3LTlhNWEtMWMzZTg0MWVjOWYz
        $scope.login = function() {
             $scope.isLoad = true;
            if ($scope.loginDetails) {
                $scope.loginDetails.client_id = "1e2cd2a0-07bb-11e7-9a5a-1c3e841ec9f3";
                $scope.loginDetails.client_key = "HZSGKdWJOQ5V3n7h0U+FACuP8Gc=";
                commonService.userLogin($scope.loginDetails, $localStorage.accessToken).then(function(data) {
                    console.log(data);
                    if (data.status == 200 && !data.message) {
                         $scope.isLoad = false;
                        $localStorage.accessToken = data.access_token;
                        $localStorage.username = data.username;
                        $localStorage.data = data;
                        // console.log('afterLogins',$localStorage.accessToken);
                        commonService.alertMessage('Welcome to Palazzo application', 'success', $alert)
                        $state.go('home');
                    } else {
                        $scope.isLoad = false;
                        commonService.alertMessage('Enter valid credentials', 'error', $alert)
                    }
                })
            } else {
                $scope.isLoad = false;
                commonService.alertMessage('Please enter user details', 'error', $alert)
            }
        }

        // mailSending();
        function mailSending() {
            var mails = {};
            mails.from = "ashok.s@bambeeq.com";
            mails.to = "kumarkvmashok@gmail.com";
            mails.token = "MTQ4OTU2OTI1ODk4ODpjNTAxMmJmOC0wOTVmLTExZTctOGI3ZS0xYzNlODQxZWM5ZjM6MWUyY2QyYTAtMDdiYi0xMWU3LTlhNWEtMWMzZTg0MWVjOWYz";
            mails.text = "This is mailSend-ing function";
            commonService.sendingMail(mails).then(function(mails) {
                console.log('mails', mails);
            })
        }

        $scope.popups = false;
        $scope.finalJson = {};
        $scope.signUp = function() {
            $scope.ownValidation = true;
            $scope.user = {};
            billingService.billingplans($localStorage.accessToken).then(function(billingplan) {
                angular.forEach(billingplan.billingPlans, function(formateJson) {
                    var removejson = formateJson.plugins.value.toString();
                    var index = 0;
                    removejson = removejson.substr(0, index) + "[" + removejson.substr(index + 1);
                    removejson = removejson.substr(0, removejson.length - 1) + "]";
                    var array = JSON.parse(removejson.toString());
                    formateJson.plugins = array;
                });
                console.log(billingplan.billingPlans);
                $scope.billingPlan = billingplan;
            })
        }
      


        $scope.forgetPassword = function() {
            console.log('servicefrget password')
            ngDialog.openConfirm({
                template: 'cancel',
                className: '',
                scope: $scope
            }).then(function(template_name) {
                if (action == "create")
                    createVendor();
                else if (action == "update")
                    editVendor();
            });
        }

    
         $scope.userData  = {};
        $scope.userRegisteration = function() {
             $scope.isLoad = true;
            $scope.user.client_id = "1e2cd2a0-07bb-11e7-9a5a-1c3e841ec9f3";
            $scope.user.client_key = "HZSGKdWJOQ5V3n7h0U+FACuP8Gc=";
            $scope.user.thumbnail = 2234;
            $scope.user.status = "active";
            $scope.user.billingPlan = $scope.pluginselected;
            $scope.user.access_token_validity = 1200;
            $scope.userData.user = $scope.user;
            console.log(JSON.stringify($scope.userData));
            commonService.userRegistration($scope.userData, $localStorage.accessToken).then(function(data) {
                if (data.status == 201) {
                     $scope.isLoad = false;
                    commonService.alertMessage('User Registeration  Sucessfully', 'success', $alert)
                     $window.location.reload();
                } else {
                    $scope.isLoad = false;
                    commonService.alertMessage('User Registeration Failed', 'error', $alert)
                }
            });
        }



        $scope.returning = false;
        $scope.emailCheck = function() {
            $('#rootwizard').bootstrapWizard({
                'tabClass': 'nav nav-pills',
                'onNext': function(tab, navigation, index) {
                    var checkWhile =true
                    var afterAjex = false;
                     // $scope.isLoad = true;
                    if (index == 1) {
                        var $valid = $("#commentForm").valid();
                        if ($scope.user) {
                            if ($scope.user.email_id) {
                                $valid = false;
                                commonService.findEmail($scope.user, $localStorage.accessToken).then(function(email) {
                                    console.log(email, $scope.previousbuttons, 'previous');
                                    if (email) {
                                        if (email.email_id) {
                                            $scope.isLoad = false;
                                            $scope.email = true;
                                            $scope.returning = false;
                                        }
                                    } else {
                                        $scope.isLoad = false;
                                        $scope.previousbuttons = true;
                                        $valid = true;
                                        $scope.email = false;
                                        $scope.returning = true
                                    }
                                    afterAjex = true;
                                });
                            }
                        }
                        return true;
                        
                    }
                    if (index == 2) {
                   
                       if($scope.pluginselected.length != 0) {return true;}else {return true;}
                    }

                    if (!$valid && $scope.returning == false) {
                        return false;
                    }
                }

            });
        }

        $scope.selectedPlugin = function(data) {
            if (data.class) {
                data.class = false;
                $scope.pluginselected.push(data);
            } else {
                data.class = true;
                $scope.pluginselected.push(data);
            }
            var newArr = [];
            console.log($scope.pluginselected);
            angular.forEach($scope.pluginselected, function(value, key) {
                var exists = false;
                angular.forEach(newArr, function(val2, key) {
                    if (angular.equals(value.billing_id, val2.billing_id)) {
                        exists = true;
                        angular.forEach(newArr, function(duplicates) {
                            if (value.billing_id == duplicates.billing_id) {
                                var index = newArr.indexOf(duplicates);
                                newArr.splice(index, 1);
                            }
                        });
                    };
                });
                if (exists == false && value.billing_id != "") {
                    newArr.push(value);
                    // $scope.billingbuttonName = "Remove";
                }
            });
            $scope.pluginselected = newArr;
           
            console.log('pluginselected ::', $scope.pluginselected);
        }


        var vm = this;
        $scope.validateForClass = function(name, modelValue) {
            var str = '';
            if (vm.formValidate && vm.formValidate[name]) {
                var input = vm.formValidate[name];
                modelValue = modelValue ? modelValue + "" : modelValue;
                if (modelValue == " " || modelValue == "  ") {
                    modelValue = ""
                }
                str += (input.$valid && modelValue && (modelValue.length > 0)) ? 'has-success' : (input.$invalid || !modelValue) ? 'is-empty' : '';
                return str;
            }
        };


        $scope.addCredent = function(datacredentials, index) {
            var service =  {};
            service.pluginId = datacredentials.plugin_id;
            service.fromName = "credentials";
            commonService.pluginCredential(service).then(function(pluginConfig){
                   console.log(pluginConfig);
                   var arrays = [];
                   for (var key in pluginConfig.config) {                            
                        arrays.push({'key': key,  'value': ""});                           
                   }                      
                    $scope.arraysList = arrays;
                    console.log($scope.finalJson.credentials);
                    ngDialog.openConfirm({
                    template: 'credent',
                    className: 'ngdialog-theme-default',
                    scope: $scope
                }).then(function(template_name) {
                    var definitionArray = {};                   
                    $scope.arraysList.forEach(function(result) {
                        definitionArray[result.key] = result.value;
                    });
                    datacredentials.config = definitionArray;                
                    console.log('credentials :::', datacredentials);
                });
            });
        }
    }
]);