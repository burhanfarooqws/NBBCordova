function RegisterCtrl($state, $scope, $rootScope, CordovaService, $cordovaDevice, DeviceService, $cordovaTouchID, $cordovaDialogs) {
    'ngInject';

    // ViewModel
    var vm = this;

    vm.onSubmit = onSubmit;
    vm.onSendOTP = onSendOTP;
    vm.sendOTPText = 'Send OTP';
    vm.registration = {
        tncchecked: false
    };

    vm.registrationFields = [
        {
            key: 'user_id',
            type: 'customInput',
            templateOptions: {
                type: 'text',
                placeholder: 'User ID *',
                onKeypress: function($viewValue, $modelValue, scope, $event) {
                    console.log($event);
                    var regex = new RegExp('[a-zA-Z0-9]');
                    var key = String.fromCharCode(!$event.charCode ? $event.which : $event.charCode);

                    if (!regex.test(key)) {
                        $event.preventDefault();
                        return false;
                    }
                },
                required: true,
                classicon: 'icon-append fa fa-user',
                friendlyname: 'User Id'
            },
            ngModelElAttrs: {
                'maxlength': '25'
            },
            validation: {
                messages: {
                    required: function(viewValue, modelValue, scope) {
                        return scope.to.friendlyname +' is required'
                    },
                    maxlength: function (viewValue, modelValue, scope) {
                        return scope.to.friendlyname + ' max 25 characters allowed'
                    }
                }
            }
        },
        {
            key: 'password',
            type: 'customInput',
            templateOptions: {
                type: 'password',
                placeholder: 'Password *',
                required: true,
                classicon: 'icon-append fa fa-lock',
                friendlyname: 'Password'
            },
            ngModelElAttrs: {
                'maxlength': '25'
            },
            validation: {
                messages: {
                    required: function (viewValue, modelValue, scope) {
                        return scope.to.friendlyname + ' is required'
                    },
                    maxlength: function (viewValue, modelValue, scope) {
                        return scope.to.friendlyname + ' max 25 characters allowed'
                    }
                }
            }
        },
        {
            key: 'acctnumber',
            type: 'customInput',
            templateOptions: {
                type: 'number',
                placeholder: 'Account Number *',
                pattern: '[0-9]*',
                inputmode: 'numeric',
                required: true,
                classicon: 'icon-append fa fa-briefcase',
                friendlyname: 'Account Number'
            },
            ngModelElAttrs: {
                'inputmode': 'numeric',
                'maxlength': '10',
                'phone-input': '',
                'limit-directive': '10'
            },
            validation: {
                messages: {
                    required: function(viewValue, modelValue, scope) {
                        return scope.to.friendlyname +' is required'
                    },
                    maxlength: function (viewValue, modelValue, scope) {
                        return scope.to.friendlyname + ' max 10 characters allowed'
                    }
                }
            }
        },
        {
            key: 'atmcardnumber',
            type: 'customInput',
            templateOptions: {
                type: 'number',
                placeholder: 'ATM Card Number *',
                required: true,
                pattern: '[0-9]*',
                inputmode: 'numeric',
                classicon: 'icon-append fa fa-credit-card',
                friendlyname: 'ATM Card Number'
            },
            validators: {
                onlyDigits: {
                    expression: function (viewValue, modelValue) {
                        var value = modelValue || viewValue;
                        return /^\d+$/.test(value);
                    },
                    message: 'only digits allowed'
                }
            },
            ngModelElAttrs: {
                'inputmode': 'numeric',
                'maxlength': '16',
                'phone-input': '',
                'limit-directive': '16'
            },
            validation: {
                messages: {
                    required: function(viewValue, modelValue, scope) {
                        return scope.to.friendlyname +' is required'
                    },
                    maxlength: function (viewValue, modelValue, scope) {
                        return scope.to.friendlyname + ' should be 16 digits'
                    }
                }
            }
        },
        {
            key: 'atmpin',
            type: 'customInput',
            templateOptions: {
                type: 'number',
                placeholder: 'ATM PIN *',
                required: true,
                pattern: '[0-9]*',
                inputmode: 'numeric',
                classicon: 'icon-append fa fa-lock',
                friendlyname: 'ATM PIN'
            },
            ngModelElAttrs: {
                'inputmode': 'numeric',
                'maxlength': '4',
                'minlength': '4',
                'limit-directive': '4',
                'phone-input': '',
                'style': '-webkit-text-security: circle'
            },
            validators: {
                onlyDigits: {
                    expression: function (viewValue, modelValue) {
                        var value = modelValue || viewValue;
                        return /^\d+$/.test(value);
                    },
                    message: 'only digits allowed'
                }
            },
            validation: {
                messages: {
                    required: function(viewValue, modelValue, scope) {
                        return scope.to.friendlyname +' is required'
                    },
                    minlength: function (viewValue, modelValue, scope) {
                        return scope.to.friendlyname + ' should be 4 digits'
                    },
                    maxlength: function (viewValue, modelValue, scope) {
                        return scope.to.friendlyname + ' should be 4 digits'
                    }
                }
            }
        },
        {
            key: 'stpassword',
            type: 'customInput',
            templateOptions: {
                type: 'number',
                placeholder: 'Soft Token Password *',
                required: true,
                pattern: '[0-9]*',
                inputmode: 'numeric',
                classicon: 'icon-append fa fa-lock',
                friendlyname: 'Soft Token Password'
            },
            ngModelElAttrs: {
                'inputmode': 'numeric',
                'maxlength': '6',
                'minlength': '6',
                'limit-directive': '6',
                'phone-input': '',
                'style': '-webkit-text-security: circle'
            },
            validators: {
                onlyDigits: {
                    expression: function (viewValue, modelValue) {
                        var value = modelValue || viewValue;
                        return /^\d+$/.test(value);
                    },
                    message: 'only digits allowed'
                }
            },
            validation: {
                messages: {
                    required: function (viewValue, modelValue, scope) {
                        return scope.to.friendlyname + ' is required'
                    },
                    minlength: function (viewValue, modelValue, scope) {
                        return scope.to.friendlyname + ' should be 6 digits'
                    },
                    maxlength: function (viewValue, modelValue, scope) {
                        return scope.to.friendlyname + ' should be 6 digits'
                    }
                }
            }
        },
        {
            key: 'otp',
            type: 'customOTPInput',
            templateOptions: {
                type: 'text',
                placeholder: 'OTP *',
                onKeypress: function($viewValue, $modelValue, scope, $event) {
                    console.log($event);
                    var regex = new RegExp('[a-zA-Z0-9]');
                    var key = String.fromCharCode(!$event.charCode ? $event.which : $event.charCode);

                    if (!regex.test(key)) {
                        $event.preventDefault();
                        return false;
                    }
                },
                required: true,
                classicon: 'icon-append fa fa-mobile',
                classsection: 'col-xs-7 col-sm-7 col-md-7 col-lg-7',
                friendlyname: 'OTP',
                class: 'mask-text'
            },
            ngModelElAttrs: {
                'maxlength': '6',
                'minlength': '6'
            },
            validation: {
                messages: {
                    required: function(viewValue, modelValue, scope) {
                        return scope.to.friendlyname +' is required'
                    },
                    minlength: function(viewValue, modelValue, scope){
                        return scope.to.friendlyname +' should be 6 characters'
                    },
                    maxlength: function(viewValue, modelValue, scope){
                        return scope.to.friendlyname +' should be 6 characters'
                    }
                }
            },
            expressionProperties: {
                'templateOptions.required': 'model.tncchecked'
            }
        }
    ];

    vm.setDeviceRegistrationObject= function () {
        vm.deviceregister.AccountNumber = vm.registration.acctnumber;
        vm.deviceregister.AtmCardNumber = vm.registration.atmcardnumber;
        vm.deviceregister.AtmPin = vm.registration.atmpin;
        vm.deviceregister.UserId = vm.registration.user_id;
        vm.deviceregister.OTP =  vm.registration.otp;
        vm.deviceregister.Password = vm.registration.password;
        vm.deviceregister.STPassword = vm.registration.stpassword;
    };

    function onSubmit() {
         debugger; // eslint-disable-line
        vm.form.$submitted = true;
        if (vm.form.$valid) {
            vm.setDeviceRegistrationObject();
            $scope.registerDeviceWithUser();
        }
    }

    function onSendOTP() {
         debugger; // eslint-disable-line
        vm.registration.tncchecked = false;
        vm.form.$submitted = true;
        if (vm.form.$valid) {
            vm.setDeviceRegistrationObject();
            $scope.sendOTP();
        }
    }

    vm.title = 'AngularJS, Cordova, Gulp, and Browserify! Written with keyboards and love!';
    vm.number = 1234;
    vm.deviceReady = false;
    vm.deviceReadyStatus  ='Cordova not loaded';
    vm.deviceInfo = {};
    vm.deviceuuid = {};
    vm.fingerprint = {};
    vm.registrationId = {};
    vm.devicefound = {};
    vm.IsFingerPrintSupport = false;
    vm.IsAuthenticatedWithFingerPrint = false;
    vm.Isdevicefound = true;
    vm.PubKeyB64 = 'n3/kUYfBDZyks/16oZAvBD4lAVboluOiW2HW26n5GDPCaE48ErTyF1DsLx2jm9Y3clApuc0lsUgU96nu1rWdTtvDN6OnNDrJQP20Wd9rG+Z/luurReJT+H+HUD9nwDGKEeiz2EYXNgyylOCH89XNYk6U5V5GsSxXvRkadlnfjj0=';
    vm.PubKeyExp = 'AQAB';
    vm.deviceregister = {
        'AccountNumber': null,
        'AtmCardNumber': null,
        'AtmPin': null,
        'UserId': null,
        'DeviceId': null,
        'OTP': null,
        'Password': null,
        'STPassword': null,
        'UseFingerPrint': null,
        'SendOTP': null,
        'EncryptedPassword': null
    };
    vm.showspinner = false;
    vm.clientEncrypt = function (value) {
        var key = CryptoJS.enc.Utf8.parse('8080808080808080');
        var iv = CryptoJS.enc.Utf8.parse('8080808080808080');
        var _encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
         debugger; // eslint-disable-line
        return _encrypted.toString();
    };
    vm.serverEncrypt = function (value) {
        var rsa = new RSAKey();
        var k = Convert(vm.PubKeyB64);
        //var m = Convert(vm.PubKeyExp);
        rsa.setPublic(k, '10001');
        var res = rsa.encrypt(value);
        return hex2b64(res);
    };

    $scope.sendOTP = function(){
        debugger; // eslint-disable-line
        vm.sendOTPText = 'Resend OTP';
        vm.showspinner = true;

        var registerAgain = false;
        if (angular.isDefined($rootScope.registrationMode)){
            if (angular.isDefined($rootScope.registrationMode.again)){
                registerAgain = true;
            }
        }

        var deviceregister = {
            'AccountNumber': vm.clientEncrypt(vm.deviceregister.AccountNumber),
            'AtmCardNumber': vm.clientEncrypt(vm.deviceregister.AtmCardNumber),
            'AtmPin': vm.serverEncrypt(vm.deviceregister.AtmPin),
            'UserId': vm.deviceregister.UserId,
            'DeviceId': vm.deviceuuid,
            'OTP': null,
            'Password': vm.serverEncrypt(vm.deviceregister.Password),
            'STPassword': vm.deviceregister.STPassword,
            'SendOTP': true,
            'UseFingerPrint': vm.IsFingerPrintSupport,
            'RegisterAgain': registerAgain
        };

        debugger; // eslint-disable-line
        DeviceService.registerDevice(deviceregister).then(
            function (data) {
                 debugger; // eslint-disable-line
                if (data != null && data.data.AuthenticationSuccess) {
                    $cordovaDialogs.alert('OTP Send', 'NBB');
                    vm.showspinner = false;
                }
                else {
                    $cordovaDialogs.alert('unable to send OTP', 'NBB');
                }
                vm.showspinner = false;
                //$scope.$apply();
            }, function (error) {
                 debugger; // eslint-disable-line
                if (error.status == 400) {
                    $cordovaDialogs.alert(error.data.Message, 'NBB');
                } else {
                    $cordovaDialogs.alert('error sending OTP', 'NBB');
                }
                console.log('rejected');
                vm.showspinner = false;
                //$scope.$apply();
            });
    };

    $scope.registerDeviceWithUser = function() {
        debugger; // eslint-disable-line
        vm.showspinner = true;

        var registerAgain = false;
        if (angular.isDefined($rootScope.registrationMode)){
            if (angular.isDefined($rootScope.registrationMode.again)){
                registerAgain = true;
            }
        }

        var deviceregister = {
            'AccountNumber': vm.clientEncrypt(vm.deviceregister.AccountNumber),
            'AtmCardNumber': vm.clientEncrypt(vm.deviceregister.AtmCardNumber),
            'AtmPin': vm.serverEncrypt(vm.deviceregister.AtmPin),
            'UserId': vm.deviceregister.UserId,
            'DeviceId': vm.deviceuuid,
            'OTP': vm.deviceregister.OTP,
            'Password': vm.serverEncrypt(vm.deviceregister.Password),
            'STPassword': vm.deviceregister.STPassword,
            'SendOTP': null,
            'UseFingerPrint': vm.IsFingerPrintSupport,
            'RegisterAgain': registerAgain
        };

        debugger; // eslint-disable-line
        DeviceService.registerDevice(deviceregister).then(
            function (data) {
                 debugger; // eslint-disable-line
                if (data != null && data.data.AuthenticationSuccess) {
                    $cordovaDialogs.alert('register user successful', 'NBB').then(function () {
                        vm.showspinner = false;
                        $state.go('auth');
                    });
                }
                else {
                    $cordovaDialogs.alert('unable to register device', 'NBB');
                }
                vm.showspinner = false;
                //$scope.$apply();
            }, function (error) {
                 debugger; // eslint-disable-line
                if (error.status == 400) {
                    $cordovaDialogs.alert(error.data.Message, 'NBB');
                } else {
                    $cordovaDialogs.alert('unable to register device', 'NBB');
                }
                console.log('rejected');
                vm.showspinner = false;
                //$scope.$apply();
            });

    };

    $scope.$on('$locationChangeStart', function(event){
        // Here you can take the control and call your own functions:
        //alert('Sorry ! Back Button is disabled');
        // Prevent the browser default action (Going back):
        event.preventDefault();
    });

    $scope.$on('$viewContentLoaded', function(){
        angular.isDefined($cordovaDevice.getDevice()); //unfortunately if the plugin is not installed calling this will cause fatal error
        vm.deviceInfo = $cordovaDevice.getDevice();
        vm.deviceuuid = '0123456789'; //$cordovaDevice.getUUID();
        var platform = $cordovaDevice.getPlatform();

        vm.IsFingerPrintSupport = false;
        if (platform == 'iOS') {
            $cordovaTouchID.checkSupport().then(function() {
                // success, TouchID supported
                vm.IsFingerPrintSupport = true;
            }, function (error) {
                //alert(error); // TouchID not supported
                console.log(error);
            });
        }

        if (platform == 'Android') {
            //var client_id = 'Your client ID';
            //var client_secret = 'A very secret client secret (once per device)';

            FingerprintAuth.isAvailable(function (result) {
                if (result.isAvailable) {
                    vm.IsFingerPrintSupport = true;
                }
                else {
                    vm.IsFingerPrintSupport = false;
                }
            }, function (message) {
                vm.IsFingerPrintSupport = false;
                console.log(message);
                //window.alert('Cannot detect fingerprint device : ' + message);
            });
        }

        // for testing purpose only comment on build
        /*vm.registration.acctnumber = '0099446529';
        vm.registration.atmcardnumber = '5274321118862000';
        vm.registration.atmpin = '1111';
        vm.registration.user_id = 'adurrani';
        vm.registration.otp = '555555';
        vm.registration.password = '1qaz!QAZ';
        vm.registration.stpassword = '555555';*/

    });
}

export default {
    name: 'RegisterCtrl',
    fn: RegisterCtrl
};