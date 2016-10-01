/**
 *Module dependencies
 */

 /*The Sever code*/

var express = require('express');

var bodyParser = require('body-parser');

var app = express();

app.set('yutong', __dirname + '/yutong');
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

app.listen(3000, function(){
	console.log("Server is UP!!!!!!!!!!!!!");
});
