function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $compileProvider) {
  'ngInject';

  /* This needs to remain disabled for bundled apps, as the base is disabled in the index.html */
  $locationProvider.html5Mode(false);

  $stateProvider
  .state('Home', {
    url: '/',
    //controller: 'ExampleCtrl as home',
    templateUrl: 'software-token.html',
    title: 'National Bank of Bahrain'
  }).state('gen', {
      url: '/gen',
      templateUrl: 'software-token-gen.html',
      title: 'National Bank of Bahrain'
  }).state('about', {
      url: '/about',
      controller: 'ExampleCtrl as about',
      templateUrl: 'about.html',
      title: 'about'
  });

  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);

  $urlRouterProvider.otherwise('/');

}

export default OnConfig;
