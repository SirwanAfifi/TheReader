(function (angular) {
    "use strict";

    var user = function($http) {
        var userUrl = "/user";

        var getAllUsers = function() {
            return $http.get(userUrl + "/all")
                .then(function (response) {
                    return response.data;
                });
        };

        return {
            getAllUsers: getAllUsers
        };

    };

    var module = angular.module('bookDb');
    module.factory('user', user);

} (window.angular));