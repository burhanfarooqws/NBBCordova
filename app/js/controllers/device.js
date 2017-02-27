function DeviceCtrl($state, $scope, $rootScope, CordovaService, $cordovaDevice) {
    'ngInject';

    // ViewModel
    var vm = this;

    vm.title = 'AngularJS, Cordova, Gulp, and Browserify! Written with keyboards and love!';
    vm.number = 1234;
    vm.deviceReady = false;
    vm.deviceReadyStatus = 'Cordova not loaded';
    vm.deviceInfo = {};
    vm.fingerprint = {};
    vm.registrationId = {};
    vm.devicefound = {};
    vm.IsFingerPrintSupport = false;
    vm.IsAuthenticatedWithFingerPrint = false;
    vm.Isdevicefound = true;

    $scope.$on('$locationChangeStart', function (event) {
        // Here you can take the control and call your own functions:
        //alert('Sorry ! Back Button is disabled');
        // Prevent the browser default action (Going back):
        event.preventDefault();
    });

    $scope.$on('$viewContentLoaded', function () {
        //window.alert(vm.deviceReadyStatus);
    });

    let loadDeviceInfo = () => {
        debugger; // eslint-disable-line
        vm.deviceReady = true;
        vm.deviceReadyStatus = 'Device Ready';
        //window.alert(vm.deviceReadyStatus);

        if ($cordovaDevice.getPlatform() == 'iOS') {
            // $rootScope.deviceuuid = $cordovaDevice.getUUID();
            // navigator.splashscreen.hide();
            // $state.go('start');

            uniqueiosudid.getid(function (msg) {
                $rootScope.deviceuuid = msg;
                navigator.splashscreen.hide();
                $state.go('start');
            }, function (error) {
                $rootScope.deviceuuid = error;
                navigator.splashscreen.hide();
            });

        }
        if ($cordovaDevice.getPlatform() == 'Android') {
            $rootScope.deviceuuid = $cordovaDevice.getUUID();
            navigator.splashscreen.hide();
            $state.go('start');
        }


    };
    CordovaService.ready.then(() => loadDeviceInfo());
}

export default {
    name: 'DeviceCtrl',
    fn: DeviceCtrl
};