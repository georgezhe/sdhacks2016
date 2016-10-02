function sendEmail(address){
	client.transmissions.send({
		transmissionBody: {
			content: {
				from: 'postmaster@yuy104.me',
				subject: 'Hello, World!',
				html:'<html><body><p>Testing SparkPost - the world\'s most awesomest email service!</p></body></html>'
			},
			recipients: [
			{address: address}
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
}


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

var SparkPost = require('sparkpost');
var client = new SparkPost('7ffe9704ea4f16c7bf335e11e7cb2fa5656f0288');


app.post('/',function(req,res){
	console.log(req.body);
	var toWrite = new DatabaseUserInfo({
		email: req.body.email,
		url: req.body.url,
		xpath: req.body.xpath,
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
		console.log(database + "\n");

	});
});



/*var asdf = require('./scraper');
var cron = require('node-cron');
var task = cron.schedule('* * * * * *', function() {
	    DatabaseUserInfo.find(function(err, database) {
        if (err) {
            console.log(err);
        }
        console.log(database);

    });
	//asdf.scraper('https://www.amazon.com/gp/product/B00ZV9PXP2/ref=s9_acss_bw_cg_odsbnc_1a1?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=merchandised-search-2&pf_rd_r=RTZCBHZ5M8ZFBK9SJQRT&pf_rd_t=101&pf_rd_p=226099ad-0078-48a7-828f-90708e221209&pf_rd_i=6669702011', '#priceblock_ourprice');	
});*/


task.start();