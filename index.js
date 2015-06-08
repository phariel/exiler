var http = require("http");
var router = require("./router");

var localPort = 9527;

var Exiler = {};

Exiler.server = function (options, port) {
	!port && (port = localPort);

	router.init(options);

	http.createServer(function (req, res) {
		var resObj = router.parse(req.url);
		res.writeHead(resObj.httpStatus, {
			"Content-Type": resObj.mime
		});
		res.end(resObj.contentBody);
	}).listen(port);
};

module.exports = Exiler;