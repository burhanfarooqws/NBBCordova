function ExampleCtrl(CordovaService, $cordovaDevice, $cordovaTouchID, $cordovaPushV5) {
  'ngInject';

  // ViewModel
  const vm = this;

  vm.title = 'AngularJS, Cordova, Gulp, and Browserify! Written with keyboards and love!';
  vm.number = 1234;
  vm.deviceReady = false;
  vm.deviceReadyStatus  ='Cordova not loaded';
  vm.deviceInfo = {};
  vm.deviceuuid = {};
  vm.fingerprint = {};
    vm.registrationId = {};

  let loadDeviceInfo = () => {
    vm.deviceReady = true;
    vm.deviceReadyStatus = 'Device Ready';

    try {
      angular.isDefined($cordovaDevice.getDevice()); //unfortunately if the plugin is not installed calling this will cause fatal error
      vm.deviceInfo = $cordovaDevice.getDevice();
      vm.deviceuuid = $cordovaDevice.getUUID();

        /*$cordovaLocalNotification.schedule({
            id: 1,
            title: 'Production Jour fixe',
            text: 'Duration 1h',
            every: 'minute',
            data: { meetingId: '123#fg8' }
        });*/

        /*$cordovaTouchID.checkSupport().then(function() {
            window.alert('Supported');
        }, function (error) {
            window.alert('Not supported' + error); // TouchID not supported
        });*/

        //debugger;
        /* window.alert(FingerprintAuth); */

        /*var client_id = "Your client ID";
        var client_secret = "A very secret client secret (once per device)";

        FingerprintAuth.isAvailable(function (result) {
            if (result.isAvailable) {
                if (result.hasEnrolledFingerprints) {
                    FingerprintAuth.show({
                        clientId: client_id,
                        clientSecret: client_secret
                    }, function (result) {
                        if (result.withFingerprint) {
                            window.alert("Successfully authenticated using a fingerprint");
                        } else if (result.withPassword) {
                            window.alert("Authenticated with backup password");
                        }
                    }, function (error) {
                        console.log(error); // "Fingerprint authentication not available"
                    });
                } else {
                    window.alert("Fingerprint auth available, but no fingerprint registered on the device");
                }
            }
        }, function (message) {
            window.alert("Cannot detect fingerprint device : " + message);
        });*/

        debugger;

        var options = {
            android: {
                senderID: "887434837300"
            },
            ios: {
                alert: "true",
                badge: "true",
                sound: "true"
            },
            windows: {}
        };

        // initialize
        $cordovaPushV5.initialize(options).then(function() {
            // start listening for new notifications
            $cordovaPushV5.onNotification();
            // start listening for errors
            $cordovaPushV5.onError();

            // register to get registrationId
            $cordovaPushV5.register().then(function(registrationId) {
                // save `registrationId` somewhere;
                vm.registrationId = registrationId;
                window.alert(registrationId);
            })
        });

        /*FingerprintAuth.isAvailable()
            .then((result)=> {
                if(result.isAvailable){
                    // it is available

                    FingerprintAuth.show({ clientId: 'myAppName', clientSecret: 'so_encrypted_much_secure_very_secret' })
                        .then(result => {
                            if(result.withFingerprint) {
                                console.log('Successfully authenticated with fingerprint!');
                            } else if(result.withPassword) {
                                console.log('Successfully authenticated with backup password!');
                            } else console.log('Didn\'t authenticate!');
                        })
                        .catch(error => console.error(error));

                } else {
                    window.alert('Not');
                }
            })
            .catch(error => console.error(error));*/
    }
    catch (e) {
        window.alert(e);
      vm.deviceReadyStatus += ' - Plugin not installed, please run "cordova plugin add cordova-plugin-device"';
    }
  };

  CordovaService.ready.then( () => loadDeviceInfo() );
}

export default {
  name: 'ExampleCtrl',
  fn: ExampleCtrl
};
