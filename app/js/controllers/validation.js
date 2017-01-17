function ValidationCtrl(CordovaService) {
    'ngInject';

    var vm = this;


    vm.onSubmit = onSubmit;
    vm.onSendOTP = onSendOTP;
    //vm.tncchecked = false;

    // The model object that we reference
    // on the <formly-form> element in index.html
    vm.rental = {
        tncchecked: false
    };

    // An array of our form fields with configuration
    // and options set. We make reference to this in
    // the 'fields' attribute on the <formly-form> element
    vm.rentalFields = [
        /*{
            key: 'ip',
            type: 'input',
            validators: {
                ipAddress: {
                    expression: function(viewValue, modelValue) {
                        var value = modelValue || viewValue;
                        return /(\d{1,3}\.){3}\d{1,3}/.test(value);
                    },
                    message: '$viewValue + " is not a valid IP Address"'
                }
            },
            templateOptions: {
                label: 'IP Address',
                required: true,
                type: 'text',
                placeholder: '127.0.0.1',
            },
            validation: {
                messages: {
                    required: function(viewValue, modelValue, scope) {
                        return scope.to.label + ' is required'
                    }
                }
            }
        },*/
        /*{
            key: 'firstName',
            type: 'input',
            templateOptions: {
                required: true,
                type: 'text',
                placeholder: 'First Name *',
                label: 'First Name'
            }
        },*/
        {
            key: 'user_id',
            type: 'customInput',
            templateOptions: {
                type: 'text',
                placeholder: 'User ID *',
                required: true,
                classicon: 'icon-append fa fa-user'
            }
        },
        {
            key: 'password',
            type: 'customInput',
            templateOptions: {
                type: 'password',
                placeholder: 'Password *',
                required: true,
                classicon: 'icon-append fa fa-lock'
            }
        },
        {
            key: 'acctnumber',
            type: 'customInput',
            templateOptions: {
                type: 'text',
                placeholder: 'Account Number *',
                required: true,
                classicon: 'icon-append fa fa-briefcase'
            }
        },
        {
            key: 'atmcardnumber',
            type: 'customInput',
            templateOptions: {
                type: 'text',
                placeholder: 'ATM Card Number *',
                required: true,
                classicon: 'icon-append fa fa-credit-card'
            }
        },
        {
            key: 'atmpin',
            type: 'customInput',
            templateOptions: {
                type: 'text',
                placeholder: 'ATM PIN *',
                required: true,
                classicon: 'icon-append fa fa-lock'
            }
        },
        {
            key: 'stpassword',
            type: 'customInput',
            templateOptions: {
                type: 'password',
                placeholder: 'Soft Token Password *',
                required: true,
                classicon: 'icon-append fa fa-lock'
            }
        },
        {
            key: 'otp',
            type: 'customInput',
            templateOptions: {
                type: 'text',
                placeholder: 'OTP *',
                required: true,
                classicon: 'icon-append fa fa-mobile'
            },
            expressionProperties: {
                'templateOptions.required': 'model.tncchecked'
            }
        }
    ];

    // function definition
    function onSubmit() {
        //debugger;
        vm.form.$submitted = true;
        if (vm.form.$valid) {
            //vm.options.updateInitialValue();
            alert('Form Submitted.');
        }
    }

    // function definition
    function onSendOTP() {
        //debugger;
        vm.rental.tncchecked = false;
        vm.form.$submitted = true;
        if (vm.form.$valid) {
            //vm.options.updateInitialValue();
            alert('Form Submitted.');
        }
    }

    let loadDeviceInfo = () => {

    };

    CordovaService.ready.then( () => loadDeviceInfo() );
}

export default {
    name: 'ValidationCtrl',
    fn: ValidationCtrl
};