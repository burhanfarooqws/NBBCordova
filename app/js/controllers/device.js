function DeviceCtrl($state, $scope, $rootScope, CordovaService, $cordovaDevice, DeviceService, $cordovaDialogs) {
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
        debugger;
        vm.deviceReady = true;
        vm.deviceReadyStatus = 'Device Ready';
        //window.alert(vm.deviceReadyStatus);

        debugger;
        angular.isDefined($cordovaDevice.getDevice()); //unfortunately if the plugin is not installed calling this will cause fatal error
        vm.deviceInfo = $cordovaDevice.getDevice();
        vm.deviceuuid = $cordovaDevice.getUUID();
        /*if(vm.deviceuuid == null){
            vm.deviceuuid = '126d40b744785968';
        }*/
        //window.alert(vm.deviceuuid);
        navigator.splashscreen.hide();

        $state.go('start');
        $scope.$apply();
    };
    CordovaService.ready.then( () => loadDeviceInfo() );
}

export default {
    name: 'DeviceCtrl',
    fn: DeviceCtrl
};