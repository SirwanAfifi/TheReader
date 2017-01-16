(function (homeController) {
    
    var data = require("../data");

    homeController.init = function (app, nav) {
        
        /*app.get('/', function (req, res) {
            data.getLatestBooks(3, function (err, results) {
                res.render('index', {
                    title: 'Books', 
                    books: results,
                    nav: nav,
                    user: req.user
                });
            });
        });
        app.get('/single', function (req, res) {
                res.send('Hello Signle books');
        });*/
        
    };
})(module.exports);