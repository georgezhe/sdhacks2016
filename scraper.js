
module.exports={
    scraper: function(inputUrl, id){
        var fs = require('fs'),
        request = require('request'),
        cheerio = require('cheerio');
        var url = inputUrl;

        request(url, function(error, response, html) {
            var price;
            var json = {
                price: ""
            };
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                var selector = 'span.inlineBlock-display span.a-color-price'; 
                var el = $(id);
                var price = el.text();
                console.log(price);
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
             });

            }
        });
    }

};

