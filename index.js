

var express = require('express'),
routes = require('routes');

var dbURL = 'mongodb://localhost:27017/database';
var mongoose = require('mongoose');

var db = mongoose.connect(dbURL);
mongoose.connection.once('connected', function() {
	console.log("Connected to database")
});

//define schema
var Schema = mongoose.Schema;

var userInfo = new Schema({
	email: String,
	url: String,
	id: String,
	value: String,
	upper_bound: String
});

var DatabaseUserInfo = mongoose.model("userinfo", userInfo);


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

//app.use(express.static(__dirname + '/public'));


//require('./routes/index');



app.post('/',function(req,res){
	console.log(req.body);
	var toWrite = new DatabaseUserInfo({

		email: req.body.email,
		url: req.body.url,
		id: req.body.id,
		value: req.body.value,
		upper_bound: req.body.upper_bound
	});


	toWrite.save(function (err, fluffy) {
		if (err) return console.error(err);
	});

	DatabaseUserInfo.find(function(err, database) {
		if (err) {
			console.log(err);
		}

	});
});

app.listen(2000, function() {
	console.log("Server is UP!!!!!!!!!!!!!");
});


var asdf = require('./scraper');
var cron = require('node-cron');
var task = cron.schedule('30  * * * * *', function() {
	DatabaseUserInfo.find(function(err, database) {
		if (err) {
			console.log(err);
		}
		for(var i = 0;i<database.length;i++){
			asdf.scraper(database[i].url, database[i].id, database[i].email, database[i].value);
		}

	});
});


task.start();