function RegisterCtrl($state, $scope, $rootScope, CordovaService, $cordovaDevice, DeviceService) {
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

    vm.showspinner = false;

    $scope.registerDeviceWithUser = function() {
        vm.showspinner = true;
        var rsa = new RSAKey();
        var k = Convert(vm.PubKeyB64);
        var m = Convert(vm.PubKeyExp);
        rsa.setPublic(k, '10001');
        var res = rsa.encrypt(vm.deviceregister.Password);
        vm.deviceregister.EncryptedPassword = hex2b64(res);


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

                vm.showspinner = false;
                $scope.$apply();
                $state.go('auth');
            }
            else{
                window.alert("unable to register device");
            }
            vm.showspinner = false;
            $scope.$apply();
        }, function (error, status) {

            debugger;
            window.alert("unable to register device");
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
        window.alert(vm.deviceuuid);
        //vm.showspinner = true;

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
            window.alert("Cannot detect fingerprint device : " + message);
        });

        $scope.$apply();
    });


}

export default {
    name: 'RegisterCtrl',
    fn: RegisterCtrl
};