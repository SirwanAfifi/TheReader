(function () {

    "use strict"; 

    var module = angular.module("bookDb");

    function homeController(book) {
        var model = this;

        var onBooksComplete = function (data) {
            model.loading = false;
            model.books = data;
            console.log(data);
        };
        var onError = function(reason) {
            model.error = reason;
        };

        model.details = function(book) {
            return 'عنوان کتاب ' + book.bookName + '\n در تاریخ ' + book.addedAtFarsi + '\n توسط ' + book.addedBy;
        };

        model.$onInit = function () {
            book.getLatestBooks(5).then(onBooksComplete, onError);
        };

    };

    module.component("home", {
        templateUrl: '/app/components/home.component.html',
        controllerAs: "model",
        controller: ["book", homeController]
    });

} ());