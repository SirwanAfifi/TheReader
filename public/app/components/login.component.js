(function() {
    "use strict";

    var module = angular.module("bookDb");

    loginController.$inject = ["account", "toaster", "$location", "$rootScope"];

    function loginController(account, toaster, $location, $rootScope) {
        var model = this;

        var onComplete = function (data) {
            if (data === "ok") {
                $rootScope.$emit('success', { data: true });
                $location.url('/list');
            }
            else toaster.pop('warning', "error", "اشتباه است", 5000, 'trustedHtml');
        };
        var onError = function (reason) {
            toaster.pop('warning', "error", "اشتباه است", 5000, 'trustedHtml');
        };

        model.login = function (userName, password) {
            account.login(userName, password)
                .then(onComplete, onError);
        };

    };

    function checkUser(account) {
        return account.isUserAuthenticated().then(function (data) {
            if (data) {
                return  false;
            } else {
                return true;
            }
        });
    }

    module.component("login", {
        templateUrl: "/app/components/login.component.html",
        $canActivate: ["account", function (account) {
            return checkUser(account);
        }],
        controllerAs: "model",
        controller: ["account", "toaster", "$location", "$rootScope", loginController]
    });
}());