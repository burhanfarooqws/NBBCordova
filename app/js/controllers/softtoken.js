function SoftTokenCtrl($state, $scope, $rootScope, $cordovaDevice, DeviceService, $window, $cordovaDialogs) {
    'ngInject';

    // ViewModel
    var vm = this;
    vm.generatedsofttoken = null;
    vm.show = false;

    $scope.$on('$locationChangeStart', function(event, next, current){
        // Here you can take the control and call your own functions:
        //alert('Sorry ! Back Button is disabled');
        // Prevent the browser default action (Going back):
        event.preventDefault();
    });

    $scope.init = function() {
       vm.regenerateSoftToken();
    };

    vm.regenerateSoftToken = function () {
        var generatesofttoken = $rootScope.generateSoftToken;
        debugger;
        //$rootScope.generateSoftToken = generatesofttoken;
        //usSpinnerService.spin('spinner-1');
        //window.alert("soft token "+ generatesofttoken);
        DeviceService.generateSoftToken(generatesofttoken).then(function(data) {
            debugger;
            if(data != null && data.data.OTP){
                $cordovaDialogs.alert("generated soft token successful", "NBB");
                //angularSpinner.stop('spinner-1');
                vm.generatedsofttoken = data.data.OTP;
                vm.show = true;
                $scope.$apply();
            }
            else{
                $cordovaDialogs.alert("you do not have any transaction which requires a security code, \n please initiate a transaction before generating a security code", "NBB").then(function() {
                    $state.go('auth');
                    //$scope.$apply();
                });
            }
            $scope.$apply();
        }, function (error, status) {
            //vm.Isdevicefound = false;
            debugger;
            $cordovaDialogs.alert("you do not have any transaction which requires a security code, \n please initiate a transaction before generating a security code", "NBB").then(function() {
                $state.go('auth');
                //$scope.$apply();
            });
            console.log('rejected');
            //$scope.$apply();
        });
    }

    vm.deleteDevice = function(){
        $cordovaDialogs.confirm('Are you sure you want to delete?', 'NBB')
            .then(function(buttonIndex) {
            // no button = 0, 'OK' = 1, 'Cancel' = 2
                debugger;
                if (buttonIndex == 1) {
                    angular.isDefined($cordovaDevice.getDevice()); //unfortunately if the plugin is not installed calling this will cause fatal error
                    var deviceid = $cordovaDevice.getUUID();
                    if(deviceid == null){
                        deviceid = '0123456789';
                    }
                    DeviceService.deleteDevice(deviceid).then(function(data) {
                        debugger;
                        if(data != null && data.data.IsExisting && data.data.IsDeleted){
                            $cordovaDialogs.alert("Device deleted", "NBB").then(function() {
                                $state.go('home');
                            });
                        }
                        else{
                            $cordovaDialogs.alert("Delete failed", "NBB");
                        }
                        $scope.$apply();
                    }, function (error, status) {
                        //vm.Isdevicefound = false;
                        debugger;
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