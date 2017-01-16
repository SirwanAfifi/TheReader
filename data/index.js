(function(data) {
    var database = require("./database"),
        helper = require("../common/helpers.js"),
        moment = require("moment"),
        momentJalali = require('moment-jalaali');

    data.getLatestBooks = function(count, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
                db.books.find().sort({ addedAt: -1 }).limit(count)
                    .map(function (item) {
                        console.log(item);
                        return {
                            bookName: item.bookName,
                            id: item.id,
                            owner: item.owner,
                            image_url: item.imageUrl,
                            description: item.description != undefined ? helper.stripHTML(helper.getSummary(item.description, 100)) : 'no description',
                            full_description: item.description != undefined ? item.description : 'no description',
                            publication_year: item.publication_year,
                            publication_month: item.publication_month,
                            publication_day: item.publication_day,
                            language_code: item.language_code,
                            average_rating: item.average_rating,
                            num_pages: item.num_pages,
                            ratings_count: item.ratings_count,
                            text_reviews_count: item.text_reviews_count,
                            url: item.url,
                            addedAt: moment(item.addedAt).fromNow(),
                            addedAtFarsi: momentJalali(item.addedAt).format('jYYYY/jMM/jDD hh:mm'),
                            addedBy: item.addedBy
                        }
                    })
                    .toArray(function (err, results) {
                    if (err) {
                        next(err, null);
                    } else {
                        next(null, results);
                    }
                });
            }
        });
    };

    data.getBooks = function(next) {
        database.getDb(function(err, db) {
            if (err) {
                next(err, null);
            } else {
                db.books.find().toArray(function(err, results) {
                    if (err) {
                        next(err, null);
                    } else {
                        next(null, results);
                    }
                });
            }
        });
    };

    data.createBook = function(book, next) {
        database.getDb(function(err, db) {
            if (err) {
                next(err, null);
            } else {
                db.books.find({ bookName: book.bookName }).count(function(err, count) {
                    if (err) {
                        next(err);
                    } else {
                        if (count != 0) {
                            next('این کتاب قبلاً ثبت شده است');
                        } else {
                            db.books.insert(book, function (err, result) {
                                if (err) {
                                    next(err);
                                } else {

                                    var newResult = {
                                        bookName: result.ops[0].bookName,
                                        id: result.ops[0].id,
                                        owner: result.ops[0].owner,
                                        image_url: result.ops[0].imageUrl != undefined ? result.ops[0].imageUrl : '/img/book.png',
                                        description: result.ops[0].description != undefined ? helper.getSummary(result.ops[0].description, 100) : 'no description',
                                        full_description: result.ops[0].description != undefined ? result.ops[0].description : 'no description'
                                    };

                                    next(null, newResult);
                                }
                            });
                        }
                    }
                });
            }
        });
    };

    data.getBookById = function(bookId, next) {
        database.getDb(function(err, db) {
             if (err) {
                 next(err, null);
             } else {
                 db.books.findOne({ id: bookId }, next);
             }
        });
    };

    data.addUser = function (user, next) {
        database.getDb(function (err, db) {
            if (err) {
                console.log("Failed to add user: " + err);
            } else {
                db.users.insert(user, next);
            }
        });
    };

    data.getUser = function (username, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.users.findOne({ username: username }, next);
            }
        });
    };

    data.getAllUsers = function(next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
                db.users.find().toArray(function (err, results) {
                    if (err) {
                        next(err, null);
                    } else {
                        next(null, results);
                    }
                });
            }
        });
    };

})(module.exports);