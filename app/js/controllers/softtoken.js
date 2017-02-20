function SoftTokenCtrl($state, $scope, $rootScope, $interval, $cordovaDevice, DeviceService, $window, $cordovaDialogs, $cordovaLocalNotification) {
    'ngInject';

    // ViewModel
    var vm = this;
    vm.generatedsofttoken = null;
    vm.deviceuuid = {};
    vm.show = false;
    vm.showspinner = false;

    $scope.$on('$locationChangeStart', function (event) {
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
            secFromNow = new Date(now + 60 * 1000);
        $cordovaLocalNotification.schedule({
            id: 1,
            title: 'NBB Soft Token',
            text: 'Your soft token has expired',
            at: secFromNow
        });
    };

    vm.setCodeLocalNotification = function (code) {
        $cordovaLocalNotification.clear(2, function () {
            //alert("clear");
        });
        $cordovaLocalNotification.schedule({
            id: 2,
            title: 'NBB Soft Token',
            text: 'Your soft token is: ' + code
        });
    };

    vm.IsTriggered = function() {
        //alert('444');
        /*$cordovaLocalNotification.isTriggered(1, function (present) {
         // isScheduled() or isTriggered()
         alert(present);
         });*/
        try {
            $cordovaLocalNotification.isTriggered(1).then(function (isTriggered) {
                //alert(isTriggered);
                if(isTriggered == true){
                    $interval.cancel(vm.IsTriggered);
                    vm.generatedsofttoken = null;
                    $state.go('auth');
                }
            });
        }
        catch(e){
            //alert(e);
        }
    };

    /*$rootScope.$on('$cordovaLocalNotification:trigger',
     function (event, notification) {
     if(notification.id == 1){
     vm.generatedsofttoken = null;
     $state.go('auth');
     //$scope.$apply();
     }
     });*/

    $interval(vm.IsTriggered, 2000);

    vm.regenerateSoftToken = function () {
        var generatesofttoken = $rootScope.generateSoftToken;
        debugger; // eslint-disable-line
        vm.showspinner = true;
        DeviceService.generateSoftToken(generatesofttoken).then(function (data) {
            debugger; // eslint-disable-line
            if (data != null && data.data.OTP) {
                vm.generatedsofttoken = data.data.OTP;
                vm.showspinner = false;
                vm.show = true;
                vm.setCodeLocalNotification(vm.generatedsofttoken);
                vm.setCodeExpireyLocalNotification();

                //$scope.$apply();
            }
            else {
                vm.showspinner = false;
                $cordovaDialogs.alert('you do not have any transaction which requires a security code, \nplease initiate a transaction before generating a security code', 'NBB').then(function () {
                    $interval.cancel(vm.IsTriggered);
                    $state.go('auth');
                });
            }
            $scope.$apply();
        }, function (error) {
            debugger; // eslint-disable-line
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
                    friendlyMessage = 'you do not have any transaction which requires a security code, \nplease initiate a transaction before generating a security code';
                }
                if (error.data.Message === 'ServerError') {
                    friendlyMessage = 'you do not have any transaction which requires a security code, \nplease initiate a transaction before generating a security code';
                }
                $cordovaDialogs.alert(friendlyMessage, 'NBB').then(function () {
                    $interval.cancel(vm.IsTriggered);
                    $state.go('auth');
                });
            } else {
                $cordovaDialogs.alert('you do not have any transaction which requires a security code, \nplease initiate a transaction before generating a security code', 'NBB').then(function () {
                    $interval.cancel(vm.IsTriggered);
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
                debugger; // eslint-disable-line
                if (buttonIndex == 1) {
                    vm.showspinner = true;
                    angular.isDefined($cordovaDevice.getDevice()); //unfortunately if the plugin is not installed calling this will cause fatal error
                    var deviceid = $cordovaDevice.getUUID();
                    DeviceService.deleteDevice(deviceid).then(function (data) {
                        debugger; // eslint-disable-line
                        if (data != null && data.data.IsExisting && data.data.IsDeleted) {
                            $cordovaDialogs.alert('Device deleted', 'NBB').then(function () {
                                vm.showspinner = false;
                                $cordovaLocalNotification.cancel([1, 2], function() {
                                    //alert("done");
                                });
                                $interval.cancel(vm.IsTriggered);
                                $state.go('home');
                            });
                        }
                        else {
                            vm.showspinner = false;
                            $cordovaDialogs.alert('Delete failed', 'NBB');
                        }
                        $scope.$apply();
                    }, function (error) {
                        //vm.Isdevicefound = false;
                        debugger; // eslint-disable-line
                        vm.showspinner = false;
                        $cordovaDialogs.alert('Device not found', 'NBB');
                        console.log('rejected');
                        console.log(error);
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