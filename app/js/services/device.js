function DeviceService($http, $q) {
    'ngInject';

    const service = {};
    //const hostURL = 'http://192.168.5.33:8009/SharedAspectsService';
    const hostURL = 'http://private-5ae12-lead1.apiary-proxy.com'; 
	
    //const hostURL = 'https://personal.nbbonline.com/SoftToken';

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
    service.sendOTPDevice = function(data) {
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