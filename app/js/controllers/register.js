function RegisterCtrl($state, $scope, $rootScope, CordovaService, $cordovaDevice, DeviceService, $cordovaTouchID) {
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
    vm.showspinner = false;
    vm.tncchecked = false;
    vm.sendOTPText = 'Send OTP';

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
            "AccountNumber": vm.deviceregister.AccountNumber,
            "AtmCardNumber": vm.deviceregister.AtmCardNumber,
            "AtmPin": vm.deviceregister.AtmPin,
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
            function(data) {
                debugger;
                if(data != null && data.data.AuthenticationSuccess){
                    window.alert("OTP Send");

                    vm.showspinner = false;
                    //$state.go('auth');
                    //vm.deviceregister.SendOTP = true;
                    $scope.$apply();

                }
                else{
                    window.alert("unable to send OTP");
                    //vm.deviceregister.SendOTP = false;
                }
                vm.showspinner = false;
                $scope.$apply();
            }, function (error) {
                debugger;

                if(status == 400){
                    window.alert(error);
                }
                debugger;
                //vm.deviceregister.SendOTP = false;
                window.alert("error sending OTP");
                console.log('rejected');
                vm.showspinner = false;
                $scope.$apply();
            });
    };

    $scope.registerDeviceWithUser = function() {
        debugger;
        if(!vm.tncchecked){
            window.alert("please accept terms & condition.");
            return;
        }
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
            "SendOTP": null,
            "UseFingerPrint": vm.IsFingerPrintSupport
        };

        debugger;
        //usSpinnerService.spin('spinner-1');
        DeviceService.registerDevice(deviceregister).then(
            function(data) {
            debugger;
            if(data != null && data.data.AuthenticationSuccess){
                window.alert("register user successful");

                vm.showspinner = false;
                $state.go('auth');
                $scope.$apply();

            }
            else{
                window.alert("unable to register device");
            }
            vm.showspinner = false;
            $scope.$apply();
        }, function (error) {
                debugger;

            if(status == 400){
                window.alert(error);
            }
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
        //window.alert(vm.deviceuuid);
        //vm.showspinner = true;
        var platform = $cordovaDevice.getPlatform();
        vm.IsFingerPrintSupport = false;

        if (platform == "iOS") {
            $cordovaTouchID.checkSupport().then(function() {
                // success, TouchID supported
                vm.IsFingerPrintSupport = true;
            }, function (error) {
                alert(error); // TouchID not supported
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