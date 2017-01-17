function ValidationCtrl(CordovaService) {
    'ngInject';

    var vm = this;


    vm.onSubmit = onSubmit;
    vm.onSendOTP = onSendOTP;
    vm.sendOTPText = 'Send OTP';
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
                classicon: 'icon-append fa fa-user',
                friendlyname: 'User Id'
            },
            validation: {
                messages: {
                    required: function(viewValue, modelValue, scope) {
                        return scope.to.friendlyname +' is required'
                    }
                }
            }
        },
        {
            key: 'password',
            type: 'customInput',
            templateOptions: {
                type: 'password',
                placeholder: 'Password *',
                required: true,
                classicon: 'icon-append fa fa-lock',
                friendlyname: 'Password'
            },
            validation: {
                messages: {
                    required: function(viewValue, modelValue, scope) {
                        return scope.to.friendlyname +' is required'
                    }
                }
            }
        },
        {
            key: 'acctnumber',
            type: 'customInput',
            templateOptions: {
                type: 'text',
                placeholder: 'Account Number *',
                required: true,
                classicon: 'icon-append fa fa-briefcase',
                friendlyname: 'Account Number'
            },
            validation: {
                messages: {
                    required: function(viewValue, modelValue, scope) {
                        return scope.to.friendlyname +' is required'
                    }
                }
            }
        },
        {
            key: 'atmcardnumber',
            type: 'customInput',
            templateOptions: {
                type: 'text',
                placeholder: 'ATM Card Number *',
                required: true,
                classicon: 'icon-append fa fa-credit-card',
                friendlyname: 'ATM Card Number'
            },
            validation: {
                messages: {
                    required: function(viewValue, modelValue, scope) {
                        return scope.to.friendlyname +' is required'
                    }
                }
            }
        },
        {
            key: 'atmpin',
            type: 'customInput',
            templateOptions: {
                type: 'text',
                placeholder: 'ATM PIN *',
                required: true,
                classicon: 'icon-append fa fa-lock',
                friendlyname: 'ATM PIN'
            },
            validation: {
                messages: {
                    required: function(viewValue, modelValue, scope) {
                        return scope.to.friendlyname +' is required'
                    }
                }
            }
        },
        {
            key: 'stpassword',
            type: 'customInput',
            templateOptions: {
                type: 'password',
                placeholder: 'Soft Token Password *',
                required: true,
                maxlength: 6,
                minlength: 6,
                pattern:"[0-9]*",
                inputmode:"numeric",
                classicon: 'icon-append fa fa-lock',
                friendlyname: 'Soft Token Password'
            },
            validation: {
                messages: {
                    required: function(viewValue, modelValue, scope) {
                        return scope.to.friendlyname +' is required'
                    },
                    minlength: function(viewValue, modelValue, scope){
                        return scope.to.friendlyname +' should be 6 digits'
                    },
                    maxlength: function(viewValue, modelValue, scope){
                        return scope.to.friendlyname +' should be 6 digits'
                    }
                }
            }
        },
        {
            key: 'otp',
            type: 'customOTPInput',
            templateOptions: {
                type: 'text',
                placeholder: 'OTP *',
                required: true,
                maxlength: 6,
                minlength: 6,
                classicon: 'icon-append fa fa-mobile',
                classsection: 'col-xs-7 col-sm-7 col-md-7 col-lg-7',
                friendlyname: 'OTP'
            },
            validation: {
                messages: {
                    required: function(viewValue, modelValue, scope) {
                        return scope.to.friendlyname +' is required'
                    },
                    minlength: function(viewValue, modelValue, scope){
                        return scope.to.friendlyname +' should be 6 characters'
                    },
                    maxlength: function(viewValue, modelValue, scope){
                        return scope.to.friendlyname +' should be 6 characters'
                    }
                }
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