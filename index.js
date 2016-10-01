/**
 *Module dependencies
 */

 /*The Sever code*/


var express = require('express'),
	routes=require('routes');
/*
var dbURL = 'mongodb://localhost:27017/userinfo';
var mongoose = require('mongoose')
var db = mongoose.connect(dbURL);
mongoose.Promise = require('bluebird');
mongoose.connection.once('connected', function() {
    console.log("Connected to database")
});
*/
var bodyParser = require('body-parser');

var app = express();

app.set('yutong', __dirname + '/yutong');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('method-override')());
app.use(require('cookie-parser')());
app.use(require('express-session')({
    secret: 'my cookie',
    maxAge: 3600000,
    resave: true,
    saveUninitialized: true
}));

app.use(express.static(__dirname + '/public'));


require('./routes/index.js')(app);

app.listen(3000, function(){
	console.log("Server is UP!!!!!!!!!!!!!");
});
