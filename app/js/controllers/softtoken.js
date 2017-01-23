function SoftTokenCtrl($state, $scope, $rootScope, $cordovaDevice, DeviceService, $window, $cordovaDialogs, $cordovaLocalNotification) {
    'ngInject';

    // ViewModel
    var vm = this;
    vm.generatedsofttoken = null;
    vm.deviceuuid = {};
    vm.show = false;
    vm.showspinner = false;

    $scope.$on('$locationChangeStart', function (event, next, current) {
        // Here you can take the control and call your own functions:
        //alert('Sorry ! Back Button is disabled');
        // Prevent the browser default action (Going back):
        event.preventDefault();
    });

    $scope.init = function () {
        /*vm.deviceuuid = $cordovaDevice.getUUID();
        window.alert(vm.deviceuuid);
        $scope.$apply();*/
        vm.showspinner = true;
        vm.regenerateSoftToken();
    };

    vm.setCodeExpireyLocalNotification = function () {
        $cordovaLocalNotification.clear(1, function () {
            //alert("clear");
        });
        var now = new Date().getTime(),
            _sec_from_now = new Date(now + 60 * 1000);
        $cordovaLocalNotification.schedule({
            id: 1,
            title: 'NBB Soft Token',
            text: 'Your soft token has expired',
            at: _sec_from_now
        });
    };

    $rootScope.$on('$cordovaLocalNotification:trigger',
        function (event, notification, state) {
            //alert("triggered: " + notification.id);
            vm.generatedsofttoken = null;
        });

    vm.regenerateSoftToken = function () {
        var generatesofttoken = $rootScope.generateSoftToken;
        debugger;
        //$rootScope.generateSoftToken = generatesofttoken;
        //usSpinnerService.spin('spinner-1');
        //window.alert("soft token "+ generatesofttoken);
        vm.showspinner = true;
        DeviceService.generateSoftToken(generatesofttoken).then(function (data) {
            debugger;
            if (data != null && data.data.OTP) {
                //$cordovaDialogs.alert("generated soft token successful", "NBB");
                //angularSpinner.stop('spinner-1');
                vm.generatedsofttoken = data.data.OTP;
                vm.showspinner = false;
                vm.show = true;
                vm.setCodeExpireyLocalNotification();
                $scope.$apply();
            }
            else {
                vm.showspinner = false;
                $cordovaDialogs.alert("you do not have any transaction which requires a security code, \n please initiate a transaction before generating a security code", "NBB").then(function () {
                    $state.go('auth');
                });
            }
            $scope.$apply();
        }, function (error) {
            debugger;
            vm.showspinner = false;
            if (error.status == 400) {
                var friendlyMessage = null;
                if (error.data.Message === 'DeviceNotExistException') {
                    friendlyMessage = 'Device not registered';
                }
                if (error.data.Message === 'WrongPassword') {
                    friendlyMessage = 'Invalid soft token password';
                }
                if (error.data.Message === 'NoOTPAvailable') {
                    friendlyMessage = "you do not have any transaction which requires a security code, \n please initiate a transaction before generating a security code";
                }
                if (error.data.Message === 'ServerError') {
                    friendlyMessage = "you do not have any transaction which requires a security code, \n please initiate a transaction before generating a security code";
                }
                $cordovaDialogs.alert(friendlyMessage, 'NBB').then(function () {
                    $state.go('auth');
                });
            } else {
                $cordovaDialogs.alert("you do not have any transaction which requires a security code, \n please initiate a transaction before generating a security code", 'NBB').then(function () {
                    $state.go('auth');
                });
            }
            console.log('rejected');
        });
    };

    vm.deleteDevice = function () {
        $cordovaDialogs.confirm('Are you sure you want to delete?', 'NBB')
            .then(function (buttonIndex) {
                // no button = 0, 'OK' = 1, 'Cancel' = 2
                debugger;
                if (buttonIndex == 1) {
                    vm.showspinner = true;
                    angular.isDefined($cordovaDevice.getDevice()); //unfortunately if the plugin is not installed calling this will cause fatal error
                    var deviceid = $cordovaDevice.getUUID();
                    /*if (deviceid == null) {
                        deviceid = '0123456789';
                    }*/
                    DeviceService.deleteDevice(deviceid).then(function (data) {
                        debugger;
                        if (data != null && data.data.IsExisting && data.data.IsDeleted) {
                            $cordovaDialogs.alert("Device deleted", "NBB").then(function () {
                                vm.showspinner = false;
                                $cordovaLocalNotification.clear(1, function () {
                                    //alert("clear");
                                });
                                $state.go('home');
                            });
                        }
                        else {
                            vm.showspinner = false;
                            $cordovaDialogs.alert("Delete failed", "NBB");
                        }
                        $scope.$apply();
                    }, function (error, status) {
                        //vm.Isdevicefound = false;
                        debugger;
                        vm.showspinner = false;
                        $cordovaDialogs.alert("Device not found", "NBB");
                        console.log('rejected');
                        $scope.$apply();
                    });
                }

            });
    };

}

export default {
    name: 'SoftTokenCtrl',
    fn: SoftTokenCtrl
};