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
                required: true,
                classicon: 'icon-append fa fa-user',
                friendlyname: 'User Id'
            },
            validation: {
                messages: {
                    required: function(viewValue, modelValue, scope) {
                        return scope.to.friendlyname +' is required'
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
            validation: {
                messages: {
                    required: function(viewValue, modelValue, scope) {
                        return scope.to.friendlyname +' is required'
                    }
                }
            }
        },
        {
            key: 'acctnumber',
            type: 'customInput',
            templateOptions: {
                type: 'text',
                placeholder: 'Account Number *',
                required: true,
                classicon: 'icon-append fa fa-briefcase',
                friendlyname: 'Account Number'
            },
            validation: {
                messages: {
                    required: function(viewValue, modelValue, scope) {
                        return scope.to.friendlyname +' is required'
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
                pattern: "[0-9]*",
                inputmode: "numeric",
                classicon: 'icon-append fa fa-credit-card',
                friendlyname: 'ATM Card Number'
            },
            validators: {
                onlyDigits: {
                    expression: function (viewValue, modelValue) {
                        var value = modelValue || viewValue;
                        return /^\d+$/.test(value);
                    },
                    message: '"only digits allowed"'
                }
            },
            ngModelElAttrs: {
                'inputmode': 'numeric',
                'maxlength': '16',
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
                pattern: "[0-9]*",
                inputmode: "numeric",
                classicon: 'icon-append fa fa-lock',
                friendlyname: 'ATM PIN'
            },
            ngModelElAttrs: {
                'inputmode': 'numeric',
                'maxlength': '4',
                'minlength': '4',
                'limit-directive': '4',
            },
            validators: {
                onlyDigits: {
                    expression: function (viewValue, modelValue) {
                        var value = modelValue || viewValue;
                        return /^\d+$/.test(value);
                    },
                    message: '"only digits allowed"'
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
                pattern: "[0-9]*",
                inputmode: "numeric",
                classicon: 'icon-append fa fa-lock',
                friendlyname: 'Soft Token Password'
            },
            ngModelElAttrs: {
                'inputmode': 'numeric',
                'maxlength': '6',
                'minlength': '6',
                'limit-directive': '6',
                'style': '-webkit-text-security: circle'
            },
            validators: {
                onlyDigits: {
                    expression: function (viewValue, modelValue) {
                        var value = modelValue || viewValue;
                        return /^\d+$/.test(value);
                    },
                    message: '"only digits allowed"'
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
                required: true,
                classicon: 'icon-append fa fa-mobile',
                classsection: 'col-xs-7 col-sm-7 col-md-7 col-lg-7',
                friendlyname: 'OTP',
                class: 'mask-text'
            },
            ngModelElAttrs: {
                'maxlength': '6',
                'minlength': '6',
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

            /*vm.registration.user_id;
            vm.registration.password;
            vm.registration.acctnumber;
            vm.registration.atmcardnumber;
            vm.registration.atmpin;
            vm.registration.stpassword;
            vm.registration.otp;*/
    };

    function onSubmit() {
        debugger;
        vm.form.$submitted = true;
        if (vm.form.$valid) {
            vm.setDeviceRegistrationObject();
            $scope.registerDeviceWithUser();
            //alert('Form Submitted.');
        }
    }

    function onSendOTP() {
        debugger;
        vm.registration.tncchecked = false;
        vm.form.$submitted = true;
        if (vm.form.$valid) {
            vm.setDeviceRegistrationObject();
            $scope.sendOTP();
            //alert('Form Submitted.');
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
    vm.PubKeyB64 = "n3/kUYfBDZyks/16oZAvBD4lAVboluOiW2HW26n5GDPCaE48ErTyF1DsLx2jm9Y3clApuc0lsUgU96nu1rWdTtvDN6OnNDrJQP20Wd9rG+Z/luurReJT+H+HUD9nwDGKEeiz2EYXNgyylOCH89XNYk6U5V5GsSxXvRkadlnfjj0=";
    vm.PubKeyExp = "AQAB";
    vm.deviceregister = {
        "AccountNumber": null,
        "AtmCardNumber": null,
        "AtmPin": null,
        "UserId": null,
        "DeviceId": null,
        "OTP": null,
        "Password": null,
        "STPassword": null,
        "UseFingerPrint": null,
        "SendOTP": null,
        "EncryptedPassword": null
    };
    /*vm.deviceregister = {
        "AccountNumber": "1111",
        "AtmCardNumber": "1111",
        "AtmPin": "1111",
        "UserId": "sburhan",
        "DeviceId": null,
        "OTP": "988705",
        "Password": "2wsx'WSX",
        "STPassword": 123456,
        "UseFingerPrint": null,
        "SendOTP": null,
        "EncryptedPassword": null
    };*/
    vm.showspinner = false;
    /*vm.tncchecked = false;
    vm.sendOTPText = 'Send OTP';*/
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
        debugger;
        return _encrypted.toString();
    };

    $scope.sendOTP = function(){
        debugger;
        //$scope.mainform.userid.$validate();
        //alert("send OTP");
        //vm.deviceregister.SendOTP = true;
        vm.sendOTPText = 'Resend OTP';
        vm.showspinner = true;
        var rsa = new RSAKey();
        var k = Convert(vm.PubKeyB64);
        var m = Convert(vm.PubKeyExp);
        rsa.setPublic(k, '10001');
        var res = rsa.encrypt(vm.deviceregister.Password);
        vm.deviceregister.EncryptedPassword = hex2b64(res);

        var deviceregister = {
            "AccountNumber": vm.clientEncrypt(vm.deviceregister.AccountNumber),
            "AtmCardNumber": vm.clientEncrypt(vm.deviceregister.AtmCardNumber),
            "AtmPin": vm.clientEncrypt(vm.deviceregister.AtmPin),
            "UserId": vm.deviceregister.UserId,
            "DeviceId": vm.deviceuuid,
            "OTP": null,
            "Password": vm.deviceregister.EncryptedPassword,
            "STPassword": vm.deviceregister.STPassword,
            "SendOTP": true,
            "UseFingerPrint": vm.IsFingerPrintSupport
        };

        debugger;
        //usSpinnerService.spin('spinner-1');
        DeviceService.registerDevice(deviceregister).then(
            function (data) {
                debugger;
                if (data != null && data.data.AuthenticationSuccess) {
                    $cordovaDialogs.alert("OTP Send", 'NBB');

                    vm.showspinner = false;
                    //$state.go('auth');
                    //vm.deviceregister.SendOTP = true;
                    $scope.$apply();

                }
                else {
                    $cordovaDialogs.alert("unable to send OTP", 'NBB');
                    //vm.deviceregister.SendOTP = false;
                }
                vm.showspinner = false;
                $scope.$apply();
            }, function (error) {
                debugger;
                if (error.status == 400) {
                    $cordovaDialogs.alert(error.data.Message, 'NBB');
                } else {
                    $cordovaDialogs.alert("error sending OTP", 'NBB');
                }
                console.log('rejected');
                vm.showspinner = false;
                $scope.$apply();
            });
    };

    $scope.registerDeviceWithUser = function() {
        debugger;
        /*if(!vm.tncchecked){
            $cordovaDialogs.alert("please accept terms & condition.", 'NBB');
            return;
        }*/
        vm.showspinner = true;
        var rsa = new RSAKey();
        var k = Convert(vm.PubKeyB64);
        var m = Convert(vm.PubKeyExp);
        rsa.setPublic(k, '10001');
        var res = rsa.encrypt(vm.deviceregister.Password);
        vm.deviceregister.EncryptedPassword = hex2b64(res);

        var deviceregister = {
            "AccountNumber": vm.clientEncrypt(vm.deviceregister.AccountNumber),
            "AtmCardNumber": vm.clientEncrypt(vm.deviceregister.AtmCardNumber),
            "AtmPin": vm.clientEncrypt(vm.deviceregister.AtmPin),
            "UserId": vm.deviceregister.UserId,
            "DeviceId": vm.deviceuuid,
            "OTP": vm.deviceregister.OTP,
            "Password": vm.deviceregister.EncryptedPassword,
            "STPassword": vm.deviceregister.STPassword,
            "SendOTP": null,
            "UseFingerPrint": vm.IsFingerPrintSupport
        };

        debugger;
        //usSpinnerService.spin('spinner-1');
        DeviceService.registerDevice(deviceregister).then(
            function (data) {
                debugger;
                if (data != null && data.data.AuthenticationSuccess) {
                    $cordovaDialogs.alert("register user successful", 'NBB').then(function () {
                        vm.showspinner = false;
                        $state.go('auth');
                        $scope.$apply();
                    });
                }
                else {
                    $cordovaDialogs.alert("unable to register device", 'NBB');
                }
                vm.showspinner = false;
                $scope.$apply();
            }, function (error) {
                debugger;
                if (error.status == 400) {
                    $cordovaDialogs.alert(error.data.Message, 'NBB');
                } else {
                    $cordovaDialogs.alert("unable to register device", 'NBB');
                }
                console.log('rejected');
                vm.showspinner = false;
                $scope.$apply();
            });

    };

    $scope.$on('$locationChangeStart', function(event, next, current){
        // Here you can take the control and call your own functions:
        //alert('Sorry ! Back Button is disabled');
        // Prevent the browser default action (Going back):
        event.preventDefault();
    });

    $scope.$on('$viewContentLoaded', function(){
        angular.isDefined($cordovaDevice.getDevice()); //unfortunately if the plugin is not installed calling this will cause fatal error
        vm.deviceInfo = $cordovaDevice.getDevice();
        vm.deviceuuid = $cordovaDevice.getUUID();
        var platform = $cordovaDevice.getPlatform();
        $scope.$apply();
        /*if(vm.deviceuuid == null){
            vm.deviceuuid = '126d40b744785968';
            platform = "Android";
        }*/
        window.alert(vm.deviceuuid);
        //vm.showspinner = true;
        vm.IsFingerPrintSupport = false;
        if (platform == "iOS") {
            $cordovaTouchID.checkSupport().then(function() {
                // success, TouchID supported
                vm.IsFingerPrintSupport = true;
            }, function (error) {
                //alert(error); // TouchID not supported
            });
        }

        if (platform == "Android") {
            var client_id = "Your client ID";
            var client_secret = "A very secret client secret (once per device)";

            FingerprintAuth.isAvailable(function (result) {
                if (result.isAvailable) {
                    vm.IsFingerPrintSupport = true;
                }
                else {
                    vm.IsFingerPrintSupport = false;
                }
            }, function (message) {
                vm.IsFingerPrintSupport = false;
                //window.alert("Cannot detect fingerprint device : " + message);
            });
        }


        $scope.$apply();
    });
}

export default {
    name: 'RegisterCtrl',
    fn: RegisterCtrl
};