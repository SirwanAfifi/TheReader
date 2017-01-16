(function(goodReadsService) {

    var http = require('http');
    var xml2js = require('xml2js');
    var parser = xml2js.Parser({ explicitArray: false });
    
    goodReadsService.getBookById = function (id, next) {

        var options = {
            host: 'www.goodreads.com',
            path: `/book/show/${id}.xml?key=YOUR-API-KEY`
        };

        var callback = function (response) {
            var str = '';
            
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                parser.parseString(str,
                    function (err, result) {
                    next(null,
                        result.GoodreadsResponse.book);
                });
            });
        };
        
        http.request(options, callback).end();


    };
}) (module.exports);