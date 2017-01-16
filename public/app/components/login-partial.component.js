(function() {
    "use strict";

    var module = angular.module("bookDb");

    partialLoginController.$inject = ["$rootScope"];

    function partialLoginController($rootScope) {
        var model = this;
        model.isLoggedIn = false;

        $rootScope.$on('success', function (event, args) {
            model.isLoggedIn = args.data;
            console.log(args.data);
        }); 
    };

    module.component("loginPartial", {
        templateUrl: "/app/components/login-partial.component.html",
        controllerAs: "model",
        controller: ["$rootScope", partialLoginController]
    });
}());