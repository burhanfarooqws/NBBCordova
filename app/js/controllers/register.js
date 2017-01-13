function RegisterCtrl($state, $scope, $rootScope, CordovaService, $cordovaDevice, DeviceService, $cordovaTouchID, $cordovaDialogs) {
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
    vm.tncchecked = false;
    vm.sendOTPText = 'Send OTP';
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
            function(data) {
                debugger;
                if(data != null && data.data.AuthenticationSuccess){
                    $cordovaDialogs.alert("OTP Send", 'NBB');

                    vm.showspinner = false;
                    //$state.go('auth');
                    //vm.deviceregister.SendOTP = true;
                    $scope.$apply();

                }
                else{
                    $cordovaDialogs.alert("unable to send OTP", 'NBB');
                    //vm.deviceregister.SendOTP = false;
                }
                vm.showspinner = false;
                $scope.$apply();
            }, function (error) {
                debugger;

                if(status == 400){
                    $cordovaDialogs.alert(error, 'NBB');
                }
                debugger;
                //vm.deviceregister.SendOTP = false;
                $cordovaDialogs.alert("error sending OTP", 'NBB');
                console.log('rejected');
                vm.showspinner = false;
                $scope.$apply();
            });
    };

    $scope.registerDeviceWithUser = function() {
        debugger;
        if(!vm.tncchecked){
            $cordovaDialogs.alert("please accept terms & condition.", 'NBB');
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
            function(data) {
            debugger;
            if(data != null && data.data.AuthenticationSuccess){
                $cordovaDialogs.alert("register user successful", 'NBB');

                vm.showspinner = false;
                $state.go('auth');
                $scope.$apply();

            }
            else{
                $cordovaDialogs.alert("unable to register device", 'NBB');
            }
            vm.showspinner = false;
            $scope.$apply();
        }, function (error) {
                debugger;

            if(status == 400){
                $cordovaDialogs.alert(error, 'NBB');
            }
            debugger;
                $cordovaDialogs.alert("unable to register device", 'NBB');
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
        if(vm.deviceuuid == null){
            vm.deviceuuid = '0123456789';
        }
        //window.alert(vm.deviceuuid);
        //vm.showspinner = true;
        var platform = $cordovaDevice.getPlatform();
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