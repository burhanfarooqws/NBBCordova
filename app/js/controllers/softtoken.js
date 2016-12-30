function SoftTokenCtrl($state, $scope, $rootScope, $cordovaDevice, DeviceService, $window) {
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
        var generatesofttoken = $rootScope.generateSoftToken;
        debugger;
        //$rootScope.generateSoftToken = generatesofttoken;
        //usSpinnerService.spin('spinner-1');
        //window.alert("soft token "+ generatesofttoken);
        DeviceService.generateSoftToken(generatesofttoken).then(function(data) {
            debugger;
            if(data != null && data.OTP){
                window.alert("generated softtoken successful");
                //angularSpinner.stop('spinner-1');
                vm.generatedsofttoken = data.OTP;
                vm.show = true;
                $scope.$apply();
            }
            else{
                window.alert("unable to generate softtoken");
                $state.go('auth');
                //$scope.$apply();
            }
            $scope.$apply();
        }, function (error, status) {
            //vm.Isdevicefound = false;
            debugger;
            window.alert("unable to generate softtoken");
            $state.go('auth');
            console.log('rejected');
            //$scope.$apply();
        });

    };

    vm.deleteDevice = function(){
        var _deleteDevice = $window.confirm('Are you sure you want to delete?');
        debugger;
        if (_deleteDevice) {
            angular.isDefined($cordovaDevice.getDevice()); //unfortunately if the plugin is not installed calling this will cause fatal error
            var deviceid = $cordovaDevice.getUUID();
            DeviceService.deleteDevice(deviceid).then(function(data) {
                debugger;
                if(data != null && data.IsExisting && data.IsDeleted){
                    window.alert("Device deleted");
                    $state.go('home');
                }
                else{
                    window.alert("Delete failed");
                }
                $scope.$apply();
            }, function (error, status) {
                //vm.Isdevicefound = false;
                debugger;
                window.alert("Device not found");
                console.log('rejected');
                $scope.$apply();
            });
        }
    };

}

export default {
    name: 'SoftTokenCtrl',
    fn: SoftTokenCtrl
};