function OnRun($rootScope, AppSettings, formlyConfig, formlyValidationMessages) {
    'ngInject';

    // change page title based on state
    $rootScope.$on('$stateChangeSuccess', (event, toState) => {
        $rootScope.pageTitle = '';

        if (toState.title) {
            $rootScope.pageTitle += toState.title;
            $rootScope.pageTitle += ' \u2014 ';
        }

        $rootScope.pageTitle += AppSettings.appTitle;
    });

    formlyConfig.extras.errorExistsAndShouldBeVisibleExpression = 'fc.$touched || form.$submitted';
    formlyConfig.extras.ngModelAttrsManipulatorPreferBound = true;
    /*formlyValidationMessages.addStringMessage('required', 'This field is required');
    formlyValidationMessages.addStringMessage('maxlength', 'This field is required');
    formlyValidationMessages.addStringMessage('minlength', 'This field is required');*/

    formlyConfig.setWrapper({
        name: 'inputWrapper',
        types: ['customInput'],
        template: "<section><label class='input'><i class='{{to.classicon}}'></i><formly-transclude></formly-transclude></label></section>",
    });

    formlyConfig.setWrapper({
            name: 'passwordWrapper',
            types: ['customPassword'],
            template: "<section><label class='input'><i class='{{to.classicon}}'></i><formly-transclude></formly-transclude></label></section>",
        });

    formlyConfig.setWrapper({
        name: 'otpWrapper',
        types: ['customOTPInput'],
        template: "<section><label class='input width_60perc'><i class='{{to.classicon}}'></i><formly-transclude></formly-transclude></label></section>",
    });

    formlyConfig.setType({
            name: 'customInput',
            extends: 'input'
        });

    formlyConfig.setType({
        name: 'customOTPInput',
        extends: 'input'
    });

    formlyConfig.setType({
            name: 'customPassword',
            extends: 'input'
        });
}

export default OnRun;
