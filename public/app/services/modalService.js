(function () {

    var injectParams = ['$uibModal'];

    var modalService = function ($modal) {

        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            templateUrl: 'app/partials/modal.html'
        };

        var modalOptions = {
            closeButtonText: 'Close',
            actionButtonText: 'OK',
            headerText: 'Proceed?',
            bodyText: 'Perform this action?',
            book: {
                id: '',
                bookName: 'Nothing',
                description: 'no description'
            }
        };

        this.showModal = function (customModalDefaults, customModalOptions) {
            if (!customModalDefaults) customModalDefaults = {};
            customModalDefaults.backdrop = 'static';
            customModalDefaults.size = 'lg';
            return this.show(customModalDefaults, customModalOptions);
        };

        this.show = function (customModalDefaults, customModalOptions) {
            //Create temp objects to work with since we're in a singleton service
            var tempModalDefaults = {};
            var tempModalOptions = {};

            //Map angular-ui modal custom defaults to modal defaults defined in this service
            angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

            //Map modal.html $scope custom properties to defaults defined in this service
            angular.extend(tempModalOptions, modalOptions, customModalOptions);

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = function ($scope, $modalInstance) {
                    $scope.modalOptions = tempModalOptions;
                    $scope.modalOptions.ok = function (result) {
                        $modalInstance.close('ok');
                    };
                    $scope.modalOptions.close = function (result) {
                        $modalInstance.close('cancel');
                    };
                };

                tempModalDefaults.controller.$inject = ['$scope', '$uibModalInstance'];
            }

            return $modal.open(tempModalDefaults).result;
        };
    };

    modalService.$inject = injectParams;

    angular.module('bookDb').service('modalService', modalService);

}());