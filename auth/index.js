// auth/index.js
(function (auth) {

    var nav = [
        {
            Link: '/Books',
            Text: 'Books'
        }
    ];

    var data = require("../data");
    var hasher = require("./hasher");

    var passport = require("passport");
    var localStrategy = require("passport-local").Strategy;

    function userVerify(username, password, next) {
        data.getUser(username, function (err, user) {
            if (!err && user) {
                var testHash = hasher.computeHash(password, user.salt);
                if (testHash === user.passwordHash) {
                    next(null, user);
                    return;
                }
            }
            next(null, false, { message: "Invalid Credentials." });
        });
    }

    auth.ensureAuthenticated = function (req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect("/login");
        }
    };

    auth.ensureApiAuthenticated = function (req, res, next) {
        if (req.isAuthenticated()) {
            res.json("ok");
        } else {
            res.json("no");
        }
    };

    auth.init = function (app) {

        // setup passport authentication

        passport.use(new localStrategy(userVerify));
        passport.serializeUser(function (user, next) {
            next(null, user.username);
        });
        passport.deserializeUser(function (key, next) {
            data.getUser(key, function (err, user) {
                if (err || !user) {
                    next(null, false, { message: "Could not find user" });
                } else {
                    next(null, user);
                }
            });
        });


        app.use(passport.initialize());
        app.use(passport.session());

        app.get("/login", function (req, res) {
            res.render("login", {
                title: "Login to The Book Database",
                message: req.flash("loginError"),
                nav: nav
            });
        });

        app.post("/login", function (req, res, next) {
            var authFunction = passport.authenticate("local", function (err, user, info) {
                if (err) {
                    next(err);
                } else {
                    req.logIn(user, function (err) {
                        if (err) {
                            res.json("no");
                        } else {
                            if (req.body.remember) {
                                var oneHour = 3600000;
                                res.cookie('userid', req.user.id, { maxAge: 2592000000 });  // Expires in one month
                            } else {
                                req.session.cookie.expires = false;
                            }
                            res.json("ok");
                        }
                    });
                }
            });
            authFunction(req, res, next);
        });

        app.get("/register", function (req, res) {
            res.render("register", {
                title: "Register for the Board",
                message: req.flash("registrationError"),
                nav: nav
            });
        });

        app.post("/register", function (req, res) {

            var salt = hasher.createSalt();

            var user = {
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                passwordHash: hasher.computeHash(req.body.password, salt),
                salt: salt
            };

            data.addUser(user, function (err) {
                if (err) {
                    req.flash("registrationError", "Could not save user to database.");
                    res.redirect("/register");
                } else {
                    res.redirect("/login");
                }
            });
        });

        app.get("/account", auth.ensureApiAuthenticated, function(req, res) {
            
        });
    };

})(module.exports);