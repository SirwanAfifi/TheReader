(function (angular) {

    var account = function($http) {

        var accountUrl = '/account';

        var isUserAuthenticated = function() {
            return $http.get(accountUrl)
                .then(function(response) {
                    if (response.data === "ok") return true;
                    return false;
                });
        };

        var login = function (username, password) {
            return $http.post("/login", {
                    username: username,
                    password: password
                })
                .then(function (response) {
                    return response.data;
                });
        };

        return {
            isUserAuthenticated: isUserAuthenticated,
            login: login
        };
    };

    var module = angular.module('bookDb');
    module.factory('account', account);
})(window.angular);