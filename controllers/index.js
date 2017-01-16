(function (controllers) {
    // Nav menu item    
    var nav = [
        {
            Link: '/Books',
            Text: 'Books'
        }
    ];

    var homeController = require('./homeController');
    var bookController = require('./bookController');
    var userController = require('./userController');

    controllers.init = function(app) {
        homeController.init(app, nav);
        bookController.init(app, nav);
        userController.init(app);
    };
})(module.exports);