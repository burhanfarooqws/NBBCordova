cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-android-fingerprint-auth.FingerprintAuth",
        "file": "plugins/cordova-plugin-android-fingerprint-auth/www/FingerprintAuth.js",
        "pluginId": "cordova-plugin-android-fingerprint-auth",
        "clobbers": [
            "FingerprintAuth"
        ]
    },
    {
        "id": "cordova-plugin-device.device",
        "file": "plugins/cordova-plugin-device/www/device.js",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "id": "cordova-plugin-dialogs.notification",
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "id": "cordova-plugin-touchid.TouchID",
        "file": "plugins/cordova-plugin-touchid/www/touchid.js",
        "pluginId": "cordova-plugin-touchid",
        "clobbers": [
            "touchid"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-android-fingerprint-auth": "1.2.4",
    "cordova-plugin-device": "1.1.4",
    "cordova-plugin-dialogs": "1.3.1",
    "cordova-plugin-splashscreen": "4.0.1",
    "cordova-plugin-touchid": "0.4.0",
    "cordova-plugin-whitelist": "1.3.1"
};
// BOTTOM OF METADATA
});