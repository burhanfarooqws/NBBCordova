function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $compileProvider, formlyConfigProvider) {
    'ngInject';

    /* This needs to remain disabled for bundled apps, as the base is disabled in the index.html */
    $locationProvider.html5Mode(false);

    $stateProvider
        .state('home', {
           /* url: '/',
            controller: 'AuthCtrl as auth',
            templateUrl: 'auth.html',
            title: 'National Bank of Bahrain'*/
            url: '/',
            controller: 'DeviceCtrl as device',
            template: '<div></div>',
            title: 'National Bank of Bahrain'
        }).state('start', {
        url: '/start',
        controller: 'StartCtrl as start',
        templateUrl: 'start.html',
        title: 'National Bank of Bahrain'
    }).state('register', {
        url: '/register',
        controller: 'RegisterCtrl as register',
        templateUrl: 'software-token.html',
        title: 'National Bank of Bahrain'
    }).state('auth', {
        url: '/auth',
        controller: 'AuthCtrl as auth',
        templateUrl: 'auth.html',
        title: 'National Bank of Bahrain'
    }).state('gen', {
        url: '/gen',
        controller: 'SoftTokenCtrl as softtoken',
        templateUrl: 'software-token-gen.html',
        title: 'National Bank of Bahrain'
    }).state('about', {
        url: '/about',
        //controller: 'ExampleCtrl as about',
        templateUrl: 'about.html',
        title: 'about'
    });

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);

    $urlRouterProvider.otherwise('/');

    formlyConfigProvider.setWrapper({
        name: 'validation',
        types: ['input', 'customInput', 'customOTPInput'],
        templateUrl: 'error-messages.html'
    });
    //usSpinnerConfigProvider.setDefaults({color: 'blue'});

}

export default OnConfig;