function DeviceService($http, $q) {
    'ngInject';

    const service = {};
    //const hostURL = 'http://localhost:3039/SharedAspectsService';
    const hostURL = 'http://nbb.veripark.com';

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
                url: hostURL + '/mobileservice/deviceexistance',
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
    service.deleteDevice = function(deviceid) {
        //debugger;
        return new Promise((resolve, reject) => {
            $http({
                method: 'POST',
                data: {DeviceId: deviceid},
                url: hostURL + '/mobileservice/devicedelete',
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
                url: hostURL + '/mobileservice/softtokenregistration',
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
                url: hostURL + '/mobileservice/generatesofttoken',
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