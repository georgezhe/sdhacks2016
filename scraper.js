var SparkPost = require('sparkpost');
var client = new SparkPost('7ffe9704ea4f16c7bf335e11e7cb2fa5656f0288');

module.exports={
    scraper: function(inputUrl, id, address, oldPrice){



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


            }

        });
    }

};

}

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

