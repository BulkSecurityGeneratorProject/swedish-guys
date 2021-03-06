(function() {
    'use strict';

    angular
        .module('swedishguysApp')
        .directive('hasAnyAuthority', hasAnyAuthority);

    function hasAnyAuthority(Principal) {
        var directive = {
            restrict: 'A',
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, element, attrs) {
            var authorities = attrs.hasAnyAuthority.replace(/\s+/g, '').split(',');

            var setVisible = function () {
                    element.removeClass('hide');
                },
                setHidden = function () {
                    element.addClass('hide');
                },
                defineVisibility = function (reset) {
                    var result;
                    if (reset) {
                        setVisible();
                    }

                    result = Principal.hasAnyAuthority(authorities);
                    if (result) {
                        setVisible();
                    } else {
                        setHidden();
                    }
                };

            if (authorities.length > 0) {
                defineVisibility(true);

                scope.$watch(function() {
                    return Principal.isAuthenticated();
                }, function() {
                    defineVisibility(true);
                });
            }
        }
    }
})();
