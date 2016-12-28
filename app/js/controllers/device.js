function DeviceCtrl($state, $scope, $rootScope, CordovaService, $cordovaDevice, DeviceService) {
    'ngInject';

    // ViewModel
    var vm = this;

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
        "AccountNumber": "1111",
        "AtmCardNumber": "1111",
        "AtmPin": "1111",
        "UserId": "sburhan",
        "DeviceId": "12",
        "OTP": "710786",
        "Password": "2wsx'WSX",
        "STPassword": "2wsx'WSX",
        "UseFingerPrint": true,
        "EncryptedPassword": null
        };
    vm.generatesofttoken = {
        "AutoPassword": "12true12",
        "DeviceId": "12",
        "IsAuthenticatedWithFingerPrint": false,
        "IsFingerPrint": false,
        "Password": "2wsx'WSX"
    };
    vm.generatedsofttoken = "00000"

    vm.generateSoftToken = function() {
        var generatesofttoken = {
            "AutoPassword": vm.deviceuuid+"true"+vm.deviceuuid,
            "DeviceId": vm.deviceuuid,
            "IsAuthenticatedWithFingerPrint": vm.IsAuthenticatedWithFingerPrint,
            "IsFingerPrint": vm.IsFingerPrintSupport,
            "Password": "2wsx'WSX"
        };
        $rootScope.generateSoftToken = generatesofttoken;
    };

    $scope.registerDeviceWithUser = function() {
        var rsa = new RSAKey();
        var k = Convert(vm.PubKeyB64);
        var m = Convert(vm.PubKeyExp);
        rsa.setPublic(k, '10001');
        var res = rsa.encrypt(vm.deviceregister.Password);
        vm.deviceregister.EncryptedPassword = hex2b64(res);
        var newGuid = vm.getGUID();

        var deviceregister = {
            "AccountNumber": vm.deviceregister.AccountNumber,
            "AtmCardNumber": vm.deviceregister.AtmCardNumber,
            "AtmPin": vm.deviceregister.AtmPin,
            "UserId": vm.deviceregister.UserId,
            "DeviceId": vm.deviceuuid,
            "OTP": vm.deviceregister.OTP,
            "Password": vm.deviceregister.EncryptedPassword,
            "STPassword": vm.deviceregister.STPassword,
            "UseFingerPrint": vm.IsFingerPrintSupport
        };

        debugger;
        //usSpinnerService.spin('spinner-1');
        DeviceService.registerDevice(deviceregister).then(function(data) {
            debugger;
            if(data != null && data.AuthenticationSuccess){
                window.alert("register device successful");
                //angularSpinner.stop('spinner-1');

            }
            else{
                window.alert("unable to register device");
            }
            $scope.$apply();
        }, function (error, status) {
            //vm.Isdevicefound = false;
            debugger;
            window.alert("unable to register device");
            console.log('rejected');
            $scope.$apply();
        });

    };

    vm.generatePart = function () {
        var guidPartNumber = (Math.random() * 0x10000) | 0;
        return (guidPartNumber + 0x10000).toString(16).substring(1).toUpperCase();
    };

    vm.getGUID = function () {
        return vm.generatePart()
            + '-'
            + vm.generatePart()
            + '-'
            + vm.generatePart()
            + '-'
            + vm.generatePart()
            + '-'
            + vm.generatePart()
            + vm.generatePart()
            + vm.generatePart();
    };

    let loadDeviceInfo = () => {
        //if(vm.deviceReady == true) return;

        vm.deviceReady = true;
        vm.deviceReadyStatus = 'Device Ready';

        try {
            //debugger;
            angular.isDefined($cordovaDevice.getDevice()); //unfortunately if the plugin is not installed calling this will cause fatal error
            vm.deviceInfo = $cordovaDevice.getDevice();
            vm.deviceuuid = $cordovaDevice.getUUID();
            //vm.deviceuuid = "2050a4079abc702b";
            //window.alert(vm.deviceuuid);

            var newGuid = vm.getGUID();
            //newGuid = "12";
            //vm.deviceuuid = "DA83-13CB-0582-5A78-88C9EFA7EB00";
            DeviceService.findDevice(vm.deviceuuid).then(function (data) {
                //debugger;
                vm.devicefound = data;
                vm.Isdevicefound = data.IsExisting;
                //console.log(data);
                //alert(vm);
                //debugger;
                $scope.$apply();

                //window.alert(FingerprintAuth);

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
                                    window.alert("Successfully authenticated using a fingerprint");
                                    vm.generateSoftToken();
                                    $state.go('gen');
                                    $scope.$apply();

                                } else if (result.withPassword) {
                                    vm.IsAuthenticatedWithFingerPrint = false;
                                    window.alert("Authenticated with backup password");
                                }
                            }, function (error) {
                                vm.IsAuthenticatedWithFingerPrint = false;
                                console.log(error); // "Fingerprint authentication not available"
                            });
                        } else {
                            vm.IsAuthenticatedWithFingerPrint = false;
                            window.alert("Fingerprint auth available, but no fingerprint registered on the device");
                        }
                    }
                    else {
                        //vm.deviceregister.UseFingerPrint = false;
                        vm.IsFingerPrintSupport = false;
                        vm.IsAuthenticatedWithFingerPrint = false;
                        //window.alert(result.isAvailable);
                        //window.alert(result.hasEnrolledFingerprints);
                        vm.generateSoftToken();
                        $state.go('gen');
                        $scope.$apply();
                    }
                }, function (message) {
                    //vm.deviceregister.UseFingerPrint = false;
                    vm.IsFingerPrintSupport = false;
                    vm.IsAuthenticatedWithFingerPrint = false;
                    vm.generateSoftToken();
                    $state.go('gen');
                    $scope.$apply();
                    window.alert("Cannot detect fingerprint device : " + message);
                });

                debugger;

            }, function (error, status) {
                vm.Isdevicefound = false;
                debugger;
                console.log('rejected');
                $state.go('register');
                $scope.$apply();
            });

        }
        catch (e) {
            window.alert(e);
            vm.deviceReadyStatus += ' - Plugin not installed, please run "cordova plugin add cordova-plugin-device"';
        }
    };

    CordovaService.ready.then( () => loadDeviceInfo() );
}

export default {
    name: 'DeviceCtrl',
    fn: DeviceCtrl
};