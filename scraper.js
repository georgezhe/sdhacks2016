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
				if (price < oldPrice) {
					sendEmail(address, price);
				}

            }

        });
    }

};

function sendEmail(address, price){
    client.transmissions.send({
        transmissionBody: {
            content: {
                from: 'postmaster@yuy104.me',
                subject: 'Price Change!',
                html: '<html> <div class="container"> <head> <style> @import \'https://fonts.googleapis.com/css?family=Fredoka+One\';  #banner{ background: rgba(0, 158, 76, .8); padding: 10px; padding-left: 25px; margin: 5px; font-family: \'Fredoka One\', cursive; #font-family: "Georgia", serif; font-weight: bold; font-size: 50px; #color: #f2f2f2; color: #ffffff; }  #link, #notification{ font-family: "Georgia", serif; font-weight: bold; font-size: 22px; } </style> </head> <body bgcolor="#DEFFDD"> <p id="banner"> YUY104 </p> <p id="notification"> An item you were keeping track of has an updated price of: ' + price + '</p> <p id="link"> Check it out at: ' + address + '</p> </body> </div> </html>'
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

