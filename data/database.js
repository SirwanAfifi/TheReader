(function (database) {
    var mongodb = require('mongodb');
    var mongoUrl = 'mongodb connection string';
    var theDb = null;
    database.getDb = function(next) {
        if (!theDb) {
            mongodb.MongoClient.connect(mongoUrl, function(err, db) {
                if (err) {
                    next(err, null);
                } else {
                    theDb = {
                        db: db, 
                        books: db.collection('books'),
                        users: db.collection('users')
                    };
                    next(null, theDb);
                }
            });
        } else {
            next(null, theDb);
        }
    };
})(module.exports);