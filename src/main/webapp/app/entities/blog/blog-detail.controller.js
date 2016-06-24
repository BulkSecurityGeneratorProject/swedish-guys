(function() {
    'use strict';

    angular
        .module('swedishguysApp')
        .controller('BlogDetailController', BlogDetailController);

    BlogDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Blog', 'User', 'Entry'];

    function BlogDetailController($scope, $rootScope, $stateParams, entity, Blog, User, Entry) {
        var vm = this;
        vm.blog = entity;
        
        var unsubscribe = $rootScope.$on('swedishguysApp:blogUpdate', function(event, result) {
            vm.blog = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
