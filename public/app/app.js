(function () {
    var app = angular.module('bookDb',
        ['ngAnimate', 'toaster', 'ui.bootstrap', 'ngSanitize', 'ngComponentRouter']);

    app.value("$routerRootComponent", "bookApp");


    app.component("appAbout", {
         template: "The about page."
    });
})();
