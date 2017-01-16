(function() {
    var module = angular.module("bookDb");

    bookListController.$inject = ["book", "account", "modalService", "gravatarUrlBuilder", "toaster"];

    function bookListController(book, account, modalService, gravatarUrlBuilder, toaster) {
        var model = this;


        var onAccountComplete = function (data) {
            model.isUserAuthenticated = data;
        };
        var onBooksComplete = function (data) {
            model.loading = false;
            model.books = data;
            toaster.clear();
        };
        var onAddBookComplete = function (book) {
            model.books.unshift(book);
            model.newBook = createBlankBook();
        };
        var onError = function (reason) {
            toaster.pop('error', "error", reason, 5000, 'trustedHtml');
        };

        book.getBooks().then(onBooksComplete, onError);

        model.loading = true;

        model.newBook = {
            bookName: '',
            id: ''
        };

        model.save = function () {
            book.addBook(model.newBook).then(onAddBookComplete, onError);
        };

        model.detail = function (bookId) {

            book.getBookById(bookId).then(function (data) {
                var modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: '...',
                    headerText: 'Book details',
                    bodyText: '',
                    book: data
                };
                modalService.showModal({}, modalOptions).then(function (result) {

                });
            }, onError);

        };

        model.delete = function (bookId) {
            alert(bookId);
        };

        function createBlankBook() {
            return {
                bookName: '',
                id: ''
            };
        }

        model.getGravatarUrl = function (email) {
            return gravatarUrlBuilder.buildGravatarUrl(email);
        }

        //model.isUserAuthenticated = 
        account.isUserAuthenticated().then(onAccountComplete, onError);

        model.$onInit = function() {
            toaster.pop({ type: 'wait', title: "title", body: "text" });
        };
    };

    module.component("bookList", {
        templateUrl: "/app/components/book-list.component.html",
        controllerAs: "model",
        controller: ["book", "account", "modalService", "gravatarUrlBuilder", "toaster", bookListController]
    });


}());