/*var scrapper = require('./middleware/scraper');
module.exports=function(app){
	
<<<<<<< HEAD
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
=======
app.post('/',function(req,res){
	console.log("post request");
	var toWrite = new DatabaseUserInfo({
		email: "asdf@ucsd.edu",
		url: "www.google.com",

	});

	toWrite.save(function (err, fluffy) {
		if (err) return console.error(err);
>>>>>>> 4198ef85c66b1fe854fdbbe3eb1755be4aa69790
	});
});


}*/