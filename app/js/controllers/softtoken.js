function SoftTokenCtrl($state, $scope, $rootScope, $cordovaDevice, DeviceService) {
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
            }
            $scope.$apply();
        }, function (error, status) {
            //vm.Isdevicefound = false;
            debugger;
            window.alert("unable to generate softtoken");
            console.log('rejected');
            $scope.$apply();
        });

    };


}

export default {
    name: 'SoftTokenCtrl',
    fn: SoftTokenCtrl
};