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

    $scope.$on('$locationChangeStart', function(event, next, current){
        // Here you can take the control and call your own functions:
        //alert('Sorry ! Back Button is disabled');
        // Prevent the browser default action (Going back):
        event.preventDefault();
    });

    $scope.$on('$viewContentLoaded', function(){
        //window.alert(vm.deviceReadyStatus);
    });

    let loadDeviceInfo = () => {
        //if(vm.deviceReady == true) return;
        debugger;
        vm.deviceReady = true;
        vm.deviceReadyStatus = 'Device Ready';
        window.alert(vm.deviceReadyStatus);

        debugger;
        angular.isDefined($cordovaDevice.getDevice()); //unfortunately if the plugin is not installed calling this will cause fatal error
        vm.deviceInfo = $cordovaDevice.getDevice();
        vm.deviceuuid = $cordovaDevice.getUUID();
        //vm.deviceuuid = "2050a4079abc702b";
        window.alert(vm.deviceuuid);

        $state.go('start');
        $scope.$apply();

        /*try {
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
        }*/
    };

    CordovaService.ready.then( () => loadDeviceInfo() );
}

export default {
    name: 'DeviceCtrl',
    fn: DeviceCtrl
};