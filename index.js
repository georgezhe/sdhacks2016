


var express = require('express'),
routes=require('routes');

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
	url : String,
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

app.use(express.static(__dirname + '/public'));

var cron = require('node-cron');
var scraper = require('./routes/middleware/scraper');
var task = cron.schedule('* * * * *', function() {
  DatabaseUserInfo.find({}, function(err, database) {
        if (err) {
			console.log(err);
		}
		database.foreach(function(data)
		{
			scraper(data.url,data.data);
		});

    });
}, false);
 
task.start();

require('./routes/index');


app.listen(8080, function(){
	console.log("Server is UP!!!!!!!!!!!!!");
});

