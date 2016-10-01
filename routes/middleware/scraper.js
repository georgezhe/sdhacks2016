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
        var $ = cheerio.load('https://www.amazon.com/gp/product/B01G4SZSBW/ref=s9_cdeal_hd_bw_b24pU_i1?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=merchandised-search-5&pf_rd_r=ZXP33SBJA387HV3K36SQ&pf_rd_t=101&pf_rd_p=e8b2dbe3-4894-5132-8283-8e49c29a5c83&pf_rd_i=495224');
		var selector = 'span.inlineBlock-display span.a-color-price'; //for amazon
        //$(selector).each(function(i, element) {
            var el = $('#priceblock_dealprice');
            var price = el.text();
            json.price = price;
            console.log(price);
			fs.readFile('price.json', function(err, data) {
				if (err) throw err;
				var obj = JSON.parse(data);
				if (obj.price != price) {
					console.log('Price has changed.');
					fs.writeFile('price.json', JSON.stringify(json, null, 4), function(err) {
						console.log('Price saved in price.json file');
					});
				}
			});
       // })
    }
});
}
module.exports=scraper;

