
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

//app.use(express.static(__dirname + '/public'));


//require('./routes/index');

/*var SparkPost = require('sparkpost');
var client = new SparkPost('7ffe9704ea4f16c7bf335e11e7cb2fa5656f0288');

client.transmissions.send({
  transmissionBody: {
    content: {
      from: 'postmaster@yuy104.me',
      subject: 'Hello, World!',
      html:'<html><body><p>Testing SparkPost - the world\'s most awesomest email service!</p></body></html>'
    },
    recipients: [
      {address: 'yutongyang1995@gmail.com'}
    ]
  }
}, function(err, res) {
  if (err) {
    console.log('Whoops! Something went wrong');
    console.log(err);
  } else {
    console.log('Woohoo! You just sent your first mailing!');
  }
});
*/

var cron = require('node-cron');
var task = cron.schedule('* * * * *', function() {
	console.log("asdf");
});

app.post('/',function(req,res){
	console.log("asdf");
	console.log(req.body);
	var toWrite = new DatabaseUserInfo({
		email: "asdf@ucsd.edu",
		url: "www.google.com",

	})

	toWrite.save(function (err, fluffy) {
		if (err) return console.error(err);
	});
});

app.listen(3000, function(){
	console.log("Server is UP!!!!!!!!!!!!!");
});