function LimitDirective() {

    return {
        restrict: "EA",
        link: function(scope, elem, attrs) {
            var limit = parseInt(attrs.limitDirective);
            angular.element(elem).on("keypress", function(e) {
                if (this.value.length == limit) e.preventDefault(); return false;
            });
        }
    };
}

export default {
    name: 'limitDirective',
    fn: LimitDirective
};
