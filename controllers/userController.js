(function (userController) {
    var data = require("../data"),
        auth = require("../auth");

    userController.init = function (app) {
        // API
        app.get('/user/all', function (req, res) {
            data.getAllUsers(function (err, results) {
                res.json(results);
            });
        });
    };

})(module.exports);