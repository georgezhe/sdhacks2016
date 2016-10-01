var scrapper = require('./middleware/scraper');
module.exports=function(app){
	

app.post("/", function(req,res,next){
	console.log(req.body)
	scrapper(req.body.url,req.body.data);

});


}