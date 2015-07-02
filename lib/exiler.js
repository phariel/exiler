var http = require("http");
var router = require("./router");

var localPort = 9527;

var Exiler = {};

Exiler.server = function (options, port) {
	!port && (port = localPort);

	router.init(options);

	http.createServer(function (req, res) {
		var resObj = router.parse(req.url);
		resObj.done(function (data) {
			res.writeHead(data.httpStatus, {
				"Content-Type": data.mime
			});
			res.end(data.contentBody);
		});
	}).listen(port);
};

module.exports = Exiler;