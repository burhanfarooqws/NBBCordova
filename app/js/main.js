import angular from 'angular';

// angular modules
import constants from './constants';
import onConfig  from './on_config';
import onRun     from './on_run';
import 'angular-ui-router';
import 'angular-messages';
import 'angular-animate';
import 'angular-formly';
import 'angular-formly-templates-bootstrap';
import './templates';
import './filters';
import './controllers';
import './services';
import './directives';

import 'ng-cordova';
import 'angular-spinners';

// create and bootstrap application
const requires = [
    'ui.router',
    'templates',
    'app.filters',
    'app.controllers',
    'app.services',
    'app.directives',
    'ngCordova',
    'formly',
    'formlyBootstrap',
    'ngMessages',
    'ngAnimate',
    'angularSpinners'
];

// mount on window for testing
window.app = angular.module('app', requires);

angular.module('app').constant('AppSettings', constants);

angular.module('app').config(onConfig);

angular.module('app').run(onRun);

angular.bootstrap(document, ['app'], {
  strictDi: true
});