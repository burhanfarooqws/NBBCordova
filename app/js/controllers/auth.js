function AuthCtrl($state, $scope, $rootScope, CordovaService, $cordovaDevice, DeviceService, $cordovaTouchID, $cordovaDialogs) {
    'ngInject';

    var vm = this;

    vm.IsFingerPrintSupport = false;
    vm.IsAuthenticatedWithFingerPrint = false;
    vm.stpassword = null;
    vm.model = {};
    vm.modelFields = [
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
                'phone-input': '',
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
        if (IsFP) {
            var deviceuuid = $cordovaDevice.getUUID();
            $rootScope.generateSoftToken = {
                "AutoPassword": deviceuuid + "true" + deviceuuid,
                "DeviceId": deviceuuid,
                "IsAuthenticatedWithFingerPrint": vm.IsAuthenticatedWithFingerPrint,
                "IsFingerPrint": vm.IsFingerPrintSupport,
                "Password": null
            };
        }
        else {
        }
    };

    $scope.generateSoftTokenWithSTPassword = function () {
        debugger;
        vm.stpassword = vm.model.stpassword;
        vm.form.$submitted = true;
        if (vm.form.$valid) {
            var deviceuuid = $cordovaDevice.getUUID();
            $rootScope.generateSoftToken = {
                "AutoPassword": null,
                "DeviceId": deviceuuid,
                "IsAuthenticatedWithFingerPrint": false,
                "IsFingerPrint": false,
                "Password": vm.stpassword
            };
            $state.go('gen');
        }
    };

    $scope.redirectRegister = function () {
        debugger;
        $cordovaDialogs.confirm('Are you sure you want to register again?', 'NBB')
            .then(function (buttonIndex) {
                // no button = 0, 'OK' = 1, 'Cancel' = 2
                debugger;
                if (buttonIndex == 1) {
                    $state.go('register');
                }
            });
    };

    $scope.$on('$locationChangeStart', function (event, next, current) {
        // Here you can take the control and call your own functions:
        //alert('Sorry ! Back Button is disabled');
        // Prevent the browser default action (Going back):
        event.preventDefault();
    });

    $scope.init = function () {
        try {
            debugger;
            var platform = $cordovaDevice.getPlatform();
            if (platform == "iOS") {
                $cordovaTouchID.checkSupport().then(function () {
                    // success, TouchID supported
                    vm.IsAuthenticatedWithFingerPrint = true;
                    vm.IsFingerPrintSupport = true;
                }, function (error) {
                    vm.IsFingerPrintSupport = false;
                    vm.IsAuthenticatedWithFingerPrint = false;
                });
            }

            if (platform == "Android") {
                try {
                    var dt = new Date().getTime();
                    var encryptConfig = {
                        clientId: "myAppName" + dt.toString(),
                        username: "currentUser" + dt.toString(),
                        password: "currentUserPassword" + dt.toString()
                    };
                    FingerprintAuth.isAvailable(function (result) {
                        if (result.isAvailable) {
                            if (result.hasEnrolledFingerprints) {
                                vm.IsAuthenticatedWithFingerPrint = true;
                                vm.IsFingerPrintSupport = true;
                            } else {
                                vm.IsFingerPrintSupport = false;
                                vm.IsAuthenticatedWithFingerPrint = false;
                            }
                        }
                        else {
                            vm.IsFingerPrintSupport = false;
                            vm.IsAuthenticatedWithFingerPrint = false;
                        }
                    }, function (message) {
                        console.log(message);
                        vm.IsFingerPrintSupport = false;
                        vm.IsAuthenticatedWithFingerPrint = false;
                    });
                }
                catch (e) {
                    console.log(e);
                    vm.IsFingerPrintSupport = false;
                    vm.IsAuthenticatedWithFingerPrint = false;
                }
            }
        }
        catch (e) {
            console.log(e);
            vm.IsFingerPrintSupport = false;
            vm.IsAuthenticatedWithFingerPrint = false;
        }
    };

    $scope.showFingerPrint = function () {
        if (vm.IsFingerPrintSupport == true) {
            try {
                debugger;
                var platform = $cordovaDevice.getPlatform();
                if (platform == "iOS") {
                    $cordovaTouchID.authenticate("NBB Mobile Authentication").then(function () {
                        // success
                        vm.generateSoftToken(true);
                        $state.go('gen');
                    }, function () {
                        // error
                        vm.IsAuthenticatedWithFingerPrint = false;
                    });
                }
                if (platform == "Android") {
                    try {
                        var dt = new Date().getTime();
                        var encryptConfig = {
                            clientId: "myAppName" + dt.toString(),
                            username: "currentUser" + dt.toString(),
                            password: "currentUserPassword" + dt.toString()
                        };
                        FingerprintAuth.encrypt(encryptConfig, function (result) {
                            if (result.withFingerprint) {
                                // success
                                vm.IsAuthenticatedWithFingerPrint = true;
                                vm.generateSoftToken(true);
                                $state.go('gen');

                            } else if (result.withBackup) {
                                vm.IsAuthenticatedWithFingerPrint = false;
                                vm.generateSoftToken(true);
                                $state.go('gen');
                            }
                        }, function (error) {
                            // error
                            vm.IsAuthenticatedWithFingerPrint = false;
                            console.log(error);
                        });
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
            }
            catch (e) {
                console.log(e);
            }
        } else {
            $cordovaDialogs.alert("Finger print authentication not supported", 'NBB').then(function () {

            });
        }
    };
}

export default {
    name: 'AuthCtrl',
    fn: AuthCtrl
};