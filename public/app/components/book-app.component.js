(function() {
    "use strict";

    var module = angular.module("bookDb");

    module.component("bookApp", {
        templateUrl: "/app/components/book-app.component.html",
        controllerAs: "model",
        controller: function () {
            var model = this;
        },
        $routeConfig: [
            { path: "/list", component: "bookList", name: "List" },
            { path: "/home", component: "home", name: "Home" },
            { path: "/login", component: "login", name: "Login" },
            { path: "/**", redirectTo: [ "List" ] }
        ]
    });

} ());