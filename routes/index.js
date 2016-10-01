var scrapper = require('./middleware/scraper');
module.exports=function(app){
	
app.post('/',function(req,res){
	console.log("post request");
	var toWrite = new DatabaseUserInfo({
		email: "asdf@ucsd.edu",
		url: "www.google.com",
			
	})

	toWrite.save(function (err, fluffy) {
		if (err) return console.error(err);
	});
});


}