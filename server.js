var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require("connect-flash");

var port = process.env.PORT || 5000;

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: "SirwanAfifi", resave: true, saveUninitialized: true }));
app.use(flash());

// use authentication
var auth = require("./auth");
auth.init(app);

var controllers = require('./controllers/index');
controllers.init(app);
//app.use(express.static(__dirname + "/public"));

app.all('/*', function (req, res, next) {
    if (/(\.)/g.test(req.originalUrl)) {
        res.sendFile(__dirname + '/public/' + req.originalUrl);
        console.log(req.originalUrl);
    } else {
        res.sendFile(__dirname + "/public/app/index.html");
        console.log(req.originalUrl);
    }
});

app.listen(port, function(err) {
    console.log('running server on the port ' + port);
});