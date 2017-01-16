(function(bookController) {
    var forEachAsync = require('forEachAsync').forEachAsync,
        data = require("../data"),
        bookService = require("../services/goodReadsService.js"),
        helper = require("../common/helpers.js"),
        auth = require("../auth");

    bookController.init = function (app, nav) {
        // API
        app.get('/account', auth.ensureApiAuthenticated, function (req, res) {
            // Do something with user via req.user
        });
        
        app.get('/allBooks', function (req, res) {
            data.getLatestBooks(50, function (err, results) {
                res.set("Content-Type", "application/json");
                res.send(results);
            });
        });
        app.get('/latestBooks', function (req, res) {
            var count = parseInt(req.query.count);
            console.log('count is: ' + count);
            data.getLatestBooks(count, function (err, results) {
                res.set("Content-Type", "application/json");
                res.send(results);
            });
        });
        app.post('/addBook', function(req, res) {
            var bookName = req.body.bookName;
            var id = req.body.id;
            var owner = req.user.name;

            bookService.getBookById(id, function (err, result) {
                var book = {};
                if (err) {
                    book = {
                        bookName: bookName,
                        id: id,
                        owner: owner
                    };
                } else {
                    book = {
                        bookName: bookName,
                        id: id,
                        owner: owner,
                        imageUrl: result.image_url,
                        description: result.description,
                        //authors: result.authors,
                        publication_year: result.publication_year,
                        publication_month: result.publication_month,
                        publication_day: result.publication_day,
                        language_code: result.language_code,
                        average_rating: result.average_rating,
                        num_pages: result.num_pages,
                        ratings_count: result.ratings_count,
                        text_reviews_count: result.text_reviews_count,
                        url: result.url,
                        addedAt: new Date().toISOString(),
                        addedBy: req.user.email
                    };
                }
                data.createBook(book, function (err, result) {
                    if (err) {
                        res.status(400).send("Failed to add note to data store");
                    } else {
                        res.set("Content-Type", "application/json");
                        res.status(201).send(result);
                    }
                });
            });
        });
        app.get('/getBook/:bookId', function (req, res) {
            var bookId = req.params.bookId;
            data.getBookById(bookId, function (err, book) {
                if (err) {
                    res.send(400, err);
                } else {
                    res.set("Content-Type", "application/json");
                    res.send(book);
                }
            });
        });
        // Normal
        app.get('/books', function (req, res) {
            data.getLatestBooks(3, function (err, results) {
                res.render('book/book', {
                    title: 'Books',
                    books: results,
                    nav: nav,
                    newBookError: req.flash('newBook'),
                    user: req.user
                });
            });
        });
        app.post('/newBook', function (req, res) {

            var bookName = req.body.bookName;
            var id = req.body.id;
            var owner = req.user.name;

            bookService.getBookById(id, function(err, result) {
                var book = {};
                if (err) {
                    book = {
                        bookName: bookName,
                        id: id,
                        owner: owner
                    };
                } else {
                    book = {
                        bookName: bookName,
                        id: id,
                        owner: owner,
                        imageUrl: result.image_url,
                        description: result.description,
                        //authors: result.authors,
                        publication_year: result.publication_year,
                        publication_month: result.publication_month,
                        publication_day: result.publication_day,
                        language_code: result.language_code,
                        average_rating: result.average_rating,
                        num_pages: result.num_pages,
                        ratings_count: result.ratings_count,
                        text_reviews_count: result.text_reviews_count,
                        url: result.url
                    };
                }
                data.createBook(book, function (err) {
                    if (err) {
                        console.log(err);
                        req.flash('newBook', err);
                        res.redirect('/books');
                    } else {
                        res.redirect('/');
                    }
                });
            });
        });
    };

})(module.exports);