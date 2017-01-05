function DeviceService($http, $q) {
    'ngInject';

    const service = {};
    const hostURL = 'http://192.168.148.103:8089/SharedAspectsService';
    //const hostURL = 'http://77.69.146.146/MB';

    //debugger;
    service.findDevice = function(deviceid) {
        var deferred = $q.defer();
        debugger;
        return $http({
            method: 'POST',
            data: {DeviceId: deviceid},
            url: hostURL + '/mobileservice/deviceexistance',
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            // promise is fulfilled
            deferred.resolve(response);
            // promise is returned
            return deferred.promise;
        }, function (response) {
            // the following line rejects the promise
            deferred.reject(response);
            // promise is returned
            return deferred.promise;
        });
    };

    //debugger;
    service.deleteDevice = function(deviceid) {
        var deferred = $q.defer();
        debugger;
        return $http({
            method: 'POST',
            data: {DeviceId: deviceid},
            url: hostURL + '/mobileservice/devicedelete',
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            // promise is fulfilled
            debugger;
            deferred.resolve(response);
            // promise is returned
            return deferred.promise;
        }, function (response) {
            // the following line rejects the promise
            debugger;
            deferred.reject(response);
            // promise is returned
            return deferred.promise;
        });
    };

    //debugger;
    service.registerDevice = function(data) {
        var deferred = $q.defer();
        debugger;
        return $http({
            method: 'POST',
            data: data,
            url: hostURL + '/mobileservice/softtokenregistration',
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            // promise is fulfilled
            debugger;
            deferred.resolve(response);
            // promise is returned
            return deferred.promise;
        }, function (response) {
            // the following line rejects the promise
            debugger;
            deferred.reject(response);
            // promise is returned
            return deferred.promise;
        });
    };

    //debugger;
    service.generateSoftToken = function(data) {
        var deferred = $q.defer();
        return $http({
            method: 'POST',
            data: data,
            url: hostURL + '/mobileservice/generatesofttoken',
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
                // promise is fulfilled
                deferred.resolve(response);
                // promise is returned
                return deferred.promise;
            }, function (response) {
                // the following line rejects the promise
                deferred.reject(response);
                // promise is returned
                return deferred.promise;
            });
    };

    return service;

}

export default {
    name: 'DeviceService',
    fn: DeviceService
};