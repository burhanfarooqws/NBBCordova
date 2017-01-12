function StartCtrl($state, $scope, $rootScope, CordovaService, $cordovaDevice, DeviceService, $cordovaDialogs) {
    'ngInject';

    // ViewModel
    var vm = this;

    vm.title = 'AngularJS, Cordova, Gulp, and Browserify! Written with keyboards and love!';
    vm.number = 1234;
    vm.deviceReady = false;
    vm.deviceReadyStatus = 'Cordova not loaded';
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

    $scope.init = function ()    {
        //window.alert("start");
        try {
            debugger;
            angular.isDefined($cordovaDevice.getDevice()); //unfortunately if the plugin is not installed calling this will cause fatal error
            vm.deviceInfo = $cordovaDevice.getDevice();
            vm.deviceuuid = $cordovaDevice.getUUID();
            //vm.deviceuuid = "6f0ff48e1d965eec";
            //window.alert(vm.deviceuuid);
            vm.deviceReady = true;

            DeviceService.findDevice(vm.deviceuuid).then(function (data) {
                debugger;
                vm.devicefound = data.data;
                vm.Isdevicefound = data.data.IsExisting;
                //console.log(data);
                //alert(vm);
                debugger;
                $state.go('auth');
                $scope.$apply();
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
            //window.alert(e);
            $cordovaDialogs.alert(e, 'NBB');
            vm.deviceReadyStatus += ' - Plugin not installed, please run "cordova plugin add cordova-plugin-device"';
        }
    };
}

export default {
    name: 'StartCtrl',
    fn: StartCtrl
};