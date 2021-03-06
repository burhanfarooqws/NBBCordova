function SoftTokenCtrl($state, $scope, $rootScope, $interval, $log, $cordovaDevice, DeviceService, $window, $cordovaDialogs, $cordovaLocalNotification) {
    'ngInject';

    // ViewModel
    var vm = this;
    vm.generatedsofttoken = null;
    vm.deviceuuid = {};
    vm.show = false;
    vm.showspinner = false;
    vm.tokenIssueOn = null;

    $scope.$on('$locationChangeStart', function (event) {
        // Here you can take the control and call your own functions:
        //alert('Sorry ! Back Button is disabled');
        // Prevent the browser default action (Going back):
        event.preventDefault();
    });

    $scope.init = function () {
        vm.showspinner = true;
        vm.regenerateSoftToken();
    };

    vm.setCodeExpireyLocalNotification = function () {
        $cordovaLocalNotification.clear(1, function () {
            //alert("clear");
        });
        vm.tokenIssueOn = new Date();
        var now = vm.tokenIssueOn.getTime(),
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

    function IsTriggered() {
        try {
            $cordovaLocalNotification.isTriggered(1).then(function (isTriggered) {
                //alert(isTriggered);
                $log.log('Notification Triggered: '+ isTriggered);
                if(isTriggered == true){
                    vm.generatedsofttoken = null;
                }
                var diff =(vm.tokenIssueOn.getTime() - new Date().getTime()) / 1000;
                diff /= 60;
                var minutes = Math.abs(Math.round(diff));
                $log.log('vm.tokenIssueOn value: '+ vm.tokenIssueOn);
                $log.log('minutes value: '+ minutes);
                if(minutes > 9){
                    $scope.stop();
                    $state.go('auth');
                }
            });
        }
        catch(e){
            $log.log(e);
        }
    }

    // store the interval promise in this variable
    var promise;

    // simulated items array
    $scope.items = [];

    // starts the interval
    $scope.start = function() {
        // stops any running interval to avoid two intervals running at the same time
        $scope.stop();

        // store the interval promise
        promise = $interval(IsTriggered, 2000);
    };

    // stops the interval
    $scope.stop = function() {
        $interval.cancel(promise);
    };

    // starting the interval by default
    $scope.start();

    // stops the interval when the scope is destroyed,
    // this usually happens when a route is changed and
    // the ItemsController $scope gets destroyed. The
    // destruction of the ItemsController scope does not
    // guarantee the stopping of any intervals, you must
    // be responsible of stopping it when the scope is
    // is destroyed.
    $scope.$on('$destroy', function() {
        $scope.stop();
    });

    //$interval(vm.IsTriggered, 2000);

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
            }
            else {
                vm.showspinner = false;
                $cordovaDialogs.alert('you do not have any transaction which requires a security code, \nplease initiate a transaction before generating a security code', 'NBB').then(function () {
                    $scope.stop();//$interval.cancel(vm.IsTriggered);
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
                    $scope.stop();//$interval.cancel(vm.IsTriggered);
                    $state.go('auth');
                });
            } else {
                $cordovaDialogs.alert('you do not have any transaction which requires a security code, \nplease initiate a transaction before generating a security code', 'NBB').then(function () {
                    $scope.stop();//$interval.cancel(vm.IsTriggered);
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
                                $scope.stop();//$interval.cancel(vm.IsTriggered);
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
                        $log.log('rejected');
                        $log.log(error);
                        $scope.$apply();
                    });
                }

            });
    };

    vm.logOut = function () {
        $cordovaDialogs.confirm('Are you sure you want to logout?', 'NBB')
            .then(function (buttonIndex) {
                // no button = 0, 'OK' = 1, 'Cancel' = 2
                debugger; // eslint-disable-line
                if (buttonIndex == 1) {
                    $cordovaLocalNotification.cancel([1, 2], function() {
                        //alert("done");
                    });
                    $scope.stop();//$interval.cancel(vm.IsTriggered);
                    $state.go('auth');
                }
            });
    };
}

export default {
    name: 'SoftTokenCtrl',
    fn: SoftTokenCtrl
};