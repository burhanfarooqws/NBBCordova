function DeviceService($http, $q) {
    'ngInject';

    const service = {};

    service.get = function() {
        return new Promise((resolve, reject) => {
            $http.get('apiPath').success((data) => {
                resolve(data);
            }).error((err, status) => {
                reject(err, status);
            });
        });
    };

    //debugger;
    service.findDevice = function(deviceid) {
        //debugger;
        return new Promise((resolve, reject) => {
            $http({
                method: 'POST',
                data: {DeviceId: deviceid},
                url: 'http://192.168.148.103:8089/SharedAspectsService/mobileservice/deviceexistance',
                headers: { 'Content-Type': 'application/json' }
            }).success((data) => {
                //debugger;
                resolve(data);
            }).error((err, status) => {
                //debugger;
                reject(err, status);
            });
        });
    };

    //debugger;
    service.registerDevice = function(data) {
        //debugger;
        return new Promise((resolve, reject) => {
            $http({
                method: 'POST',
                data: data,
                url: 'http://192.168.148.103:8089/SharedAspectsService/mobileservice/softtokenregistration',
                headers: { 'Content-Type': 'application/json' }
            }).success((data) => {
                //debugger;
                resolve(data);
            }).error((err, status) => {
                //debugger;
                reject(err, status);
            });
        });
    };

    //debugger;
    service.generateSoftToken = function(data) {
        //debugger;
        return new Promise((resolve, reject) => {
            $http({
                method: 'POST',
                data: data,
                url: 'http://192.168.148.103:8089/SharedAspectsService/mobileservice/generatesofttoken',
                headers: { 'Content-Type': 'application/json' }
            }).success((data) => {
                //debugger;
                resolve(data);
            }).error((err, status) => {
                //debugger;
                reject(err, status);
            });
        });
    };

    return service;

}

export default {
    name: 'DeviceService',
    fn: DeviceService
};