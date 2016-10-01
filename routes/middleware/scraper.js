var fs = require('fs'),
    request = require('request'),
    cheerio = require('cheerio');
function scraper(url, data)
{	
    
request(url, function(error, response, html) {
    var price;
    var json = {
        price: ""
    };
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
		var selector = 'span.inlineBlock-display span.a-color-price'; //for amazon
        $(selector).each(function(i, element) {
            var el = $(this);
            var price = el.text();
            json.price = price;
			fs.readFile('price.json', function(err, data) {
				if (err) throw err;
				var obj = JSON.parse(data);
				if (obj.price != price) {
					console.log('Price has changed.');
					fs.writeFile('price.json', JSON.stringify(json, null, 4), function(err) {
						console.log('Price saved in price.json file');
					});
				}
			})
        })
    }
});
}
module.exports=scraper;

