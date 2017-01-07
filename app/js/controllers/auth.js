function AuthCtrl($state, $scope, $rootScope, CordovaService, $cordovaDevice, DeviceService, $cordovaTouchID) {
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
    vm.generatedsofttoken = "00000";
    vm.stpasswordauthenticate = false;
    vm.stpassword = "2wsx'WSX"//null;

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
        //vm.showspinner = true;
        debugger;
        $rootScope.generateSoftToken = {
            "AutoPassword": null,
            "DeviceId": vm.deviceuuid,
            "IsAuthenticatedWithFingerPrint": false,
            "IsFingerPrint": false,
            "Password": vm.stpassword
        };

        $state.go('gen');

    };

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
            //vm.deviceuuid = "2050a4079abc702b";
            //window.alert(vm.deviceuuid);
            vm.deviceReady = true;
            var platform = $cordovaDevice.getPlatform();

            if (platform == "iOS") {
                $cordovaTouchID.checkSupport().then(function() {
                    // success, TouchID supported
                }, function (error) {
                    alert(error); // TouchID not supported
                });

                $cordovaTouchID.authenticate("NBB Mobile Authentication").then(function() {
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
                var client_id = "Your client ID";
                var client_secret = "A very secret client secret (once per device)";

                FingerprintAuth.isAvailable(function (result) {
                    if (result.isAvailable) {
                        //vm.deviceregister.UseFingerPrint = true;
                        vm.IsFingerPrintSupport = true;
                        if (result.hasEnrolledFingerprints) {
                            FingerprintAuth.show({
                                clientId: client_id,
                                clientSecret: client_secret
                            }, function (result) {
                                if (result.withFingerprint) {
                                    vm.IsAuthenticatedWithFingerPrint = true;
                                    //window.alert("Successfully authenticated using a fingerprint");
                                    vm.generateSoftToken(true);
                                    $state.go('gen');
                                    $scope.$apply();

                                } else if (result.withPassword) {
                                    vm.IsAuthenticatedWithFingerPrint = false;
                                    //window.alert("Authenticated with backup password");
                                    vm.generateSoftToken(true);
                                    $state.go('gen');
                                    $scope.$apply();
                                }
                            }, function (error) {
                                vm.IsAuthenticatedWithFingerPrint = false;
                                vm.generateSoftToken(false);
                                console.log(error); // "Fingerprint authentication not available"
                            });
                        } else {
                            vm.IsAuthenticatedWithFingerPrint = false;
                            vm.generateSoftToken(false);
                            //window.alert("Fingerprint auth available, but no fingerprint registered on the device");
                        }
                    }
                    else {
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
                    //vm.deviceregister.UseFingerPrint = false;
                    vm.IsFingerPrintSupport = false;
                    vm.IsAuthenticatedWithFingerPrint = false;
                    vm.generateSoftToken(false);
                    //$state.go('gen');
                    //$scope.$apply();
                    //window.alert("Cannot detect fingerprint device : " + message);
                });
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