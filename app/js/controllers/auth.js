function AuthCtrl($state, $scope, $rootScope, CordovaService, $cordovaDevice, DeviceService, $cordovaTouchID, $cordovaDialogs, $cordovaLocalNotification) {
    'ngInject';

    // ViewModel
    var vm = this;

    vm.title = 'AngularJS, Cordova, Gulp, and Browserify! Written with keyboards and love!';
    vm.number = 1234;
    vm.deviceReady = false;
    vm.deviceReadyStatus = 'Cordova not loaded';
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
    vm.generatesofttoken = {
        "AutoPassword": "12true12",
        "DeviceId": "12",
        "IsAuthenticatedWithFingerPrint": false,
        "IsFingerPrint": false,
        "Password": "2wsx'WSX"
    };
    vm.generatedsofttoken = null;
    vm.stpasswordauthenticate = false;
    vm.stpassword = null;
    //vm.showspinner = false;

    vm.model = {};

    vm.modelFields = [
        {
            key: 'stpassword',
            type: 'customInput',
            templateOptions: {
                type: 'number',
                placeholder: 'Soft Token Password *',
                onKeypress: function($viewValue, $modelValue, scope, $event) {
                    console.log($event);
                    var regex = new RegExp("[0-9]");
                    var key = String.fromCharCode(!$event.charCode ? $event.which : $event.charCode);

                    if (!regex.test(key)) {
                        $event.preventDefault();
                        return false;
                    }
                },
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
        }
    ];

    vm.generateSoftToken = function (IsFP) {
        debugger;
        var generatesofttoken = {};
        if (IsFP) {
            generatesofttoken = {
                "AutoPassword": vm.deviceuuid + "true" + vm.deviceuuid,
                "DeviceId": vm.deviceuuid,
                "IsAuthenticatedWithFingerPrint": vm.IsAuthenticatedWithFingerPrint,
                "IsFingerPrint": vm.IsFingerPrintSupport,
                "Password": null
            };
            $rootScope.generateSoftToken = generatesofttoken;
        }
        else {
            vm.stpasswordauthenticate = true;
            $scope.$apply();
        }
    };

    $scope.generateSoftTokenWithSTPassword = function () {
        debugger;
        vm.stpassword = vm.model.stpassword;
        vm.form.$submitted = true;
        if (vm.form.$valid) {
            $rootScope.generateSoftToken = {
                "AutoPassword": null,
                "DeviceId": vm.deviceuuid,
                "IsAuthenticatedWithFingerPrint": false,
                "IsFingerPrint": false,
                "Password": vm.stpassword
            };
            $state.go('gen');
        }
        /*debugger;
         if (!vm.stpassword) {
         $cordovaDialogs.alert("please enter soft token password, digits only", 'NBB');
         return;
         }*/
    };

    $scope.redirectRegister = function () {
        debugger;
        $state.go('register');
    };

    /*    $scope.limitKeypress = function ($event, value, maxLength) {
     if (value != undefined && value.toString().length >= maxLength) {
     $event.preventDefault();
     }
     };

     $scope.isNumber = function (evt) {
     evt = (evt) ? evt : window.event;
     var charCode = (evt.which) ? evt.which : evt.keyCode;
     if (charCode > 31 && (charCode < 48 || charCode > 57)) {
     return false;
     }
     return true;
     };*/

    $scope.$on('$locationChangeStart', function (event, next, current) {
        // Here you can take the control and call your own functions:
        //alert('Sorry ! Back Button is disabled');
        // Prevent the browser default action (Going back):
        event.preventDefault();
    });

    $scope.init = function () {
        //window.alert("start");
        try {
            debugger;
            angular.isDefined($cordovaDevice.getDevice()); //unfortunately if the plugin is not installed calling this will cause fatal error
            vm.deviceInfo = $cordovaDevice.getDevice();
            vm.deviceuuid = $cordovaDevice.getUUID();
            var platform = $cordovaDevice.getPlatform();
            $scope.$apply();
            /*if (vm.deviceuuid == null) {
                vm.deviceuuid = '126d40b744785968';
                platform = "Android";
            }*/
            //vm.deviceuuid = "6f0ff48e1d965eec";
            //window.alert(vm.deviceuuid);
            vm.deviceReady = true;
            if (platform == "iOS") {
                $cordovaTouchID.checkSupport().then(function () {
                    // success, TouchID supported
                }, function (error) {
                    //alert(error); // TouchID not supported
                });

                $cordovaTouchID.authenticate("NBB Mobile Authentication").then(function () {
                    // success
                    vm.IsAuthenticatedWithFingerPrint = true;
                    vm.IsFingerPrintSupport = true;
                    //window.alert("Successfully authenticated using a fingerprint");
                    vm.generateSoftToken(true);
                    $state.go('gen');
                    $scope.$apply();
                }, function () {
                    // error
                    vm.IsFingerPrintSupport = false;
                    vm.IsAuthenticatedWithFingerPrint = false;
                    vm.generateSoftToken(false);
                });
            }

            //window.alert(FingerprintAuth);
            if (platform == "Android") {
                try {
                    var dt = new Date().getTime();
                    var encryptConfig = {
                        clientId: "myAppName" + dt.toString(),
                        username: "currentUser" + dt.toString(),
                        password: "currentUserPassword" + dt.toString()
                    }; // See config object for required parameters
                    //window.alert(platform);
                    FingerprintAuth.isAvailable(function (result) {
                        //window.alert('isAvailable: '+result.isAvailable);
                        if (result.isAvailable) {
                            //vm.deviceregister.UseFingerPrint = true;
                            vm.IsFingerPrintSupport = true;
                            //window.alert('hasEnrolledFingerprints: '+result.hasEnrolledFingerprints);
                            if (result.hasEnrolledFingerprints) {
                                FingerprintAuth.encrypt(encryptConfig, function (result) {
                                    //window.alert('FingerprintAuth.show: '+ result);
                                    if (result.withFingerprint) {
                                        vm.IsAuthenticatedWithFingerPrint = true;
                                        //window.alert("Successfully authenticated using a fingerprint");
                                        vm.generateSoftToken(true);
                                        $state.go('gen');
                                        $scope.$apply();

                                    } else if (result.withBackup) {
                                        vm.IsAuthenticatedWithFingerPrint = false;
                                        //window.alert("Authenticated with backup password");
                                        vm.generateSoftToken(true);
                                        $state.go('gen');
                                        $scope.$apply();
                                    }
                                }, function (error) {
                                    //window.alert(error);
                                    vm.IsAuthenticatedWithFingerPrint = false;
                                    vm.generateSoftToken(false);
                                    console.log(error); // "Fingerprint authentication not available"
                                });
                            } else {
                                // window.alert("Fingerprint auth available, but no fingerprint registered on the device");
                                vm.IsAuthenticatedWithFingerPrint = false;
                                vm.generateSoftToken(false);
                            }
                        }
                        else {
                            //window.alert("else");
                            //vm.deviceregister.UseFingerPrint = false;
                            vm.IsFingerPrintSupport = false;
                            vm.IsAuthenticatedWithFingerPrint = false;
                            //window.alert(result.isAvailable);
                            //window.alert(result.hasEnrolledFingerprints);
                            vm.generateSoftToken(false);
                            //$state.go('gen');
                            //$scope.$apply();
                        }
                    }, function (message) {
                        //window.alert("Cannot detect fingerprint device : " + message);
                        //vm.deviceregister.UseFingerPrint = false;
                        vm.IsFingerPrintSupport = false;
                        vm.IsAuthenticatedWithFingerPrint = false;
                        vm.generateSoftToken(false);
                        //$state.go('gen');
                        //$scope.$apply();

                    });
                }
                catch (e) {
                    //window.alert(e);
                }
            }


        }
        catch (e) {
            vm.IsFingerPrintSupport = false;
            vm.IsAuthenticatedWithFingerPrint = false;
            vm.generateSoftToken(false);
            //window.alert(e);
            vm.deviceReadyStatus += ' - Plugin not installed, please run "cordova plugin add cordova-plugin-device"';
        }
    };
}

export default {
    name: 'AuthCtrl',
    fn: AuthCtrl
};