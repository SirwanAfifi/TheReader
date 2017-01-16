(function(angular) {

    var book = function($http) {

        var booksUrl = '/allBooks';
        var latestBooksUrl = '/latestBooks';
        var addBooksUrl = '/addBook';
        var getBooksUrl = '/getBook';

        var getBooks = function() {
            return $http.get(booksUrl)
                .then(function(response) {
                    return response.data;
                });
        };

        var getLatestBooks = function(count) {
            return $http.get(latestBooksUrl, {
                params: {
                        count: count
                    }
                })
                .then(function (response) {
                    return response.data;
                });
        };

        var addBook = function(book) {
            return $http.post(addBooksUrl, book)
                .then(function(response) {
                    return response.data;
                });
        };

        var getBookById = function(bookId) {
            return $http.get(getBooksUrl + '/' + bookId)
                .then(function (response) {
                    return response.data;
                });
        };

        return {
            getBooks: getBooks,
            getLatestBooks: getLatestBooks,
            addBook: addBook,
            getBookById: getBookById
        };
    };

    var module = angular.module('bookDb');
    module.factory('book', book);

})(window.angular);