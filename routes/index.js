module.exports=function(app){
	
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


}