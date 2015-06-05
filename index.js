var http = require("http");
var router = require("./router/main");
var MIME_JSON = "application/json";

var Exiler = {};

Exiler.server = function (config, port) {
	!port && (port = 9527);

	router.init(config);

	http.createServer(function (req, res) {
		var resObj = router.parse(req.url);
		res.writeHead(resObj.httpStatus, {
			"Content-Type": MIME_JSON
		});
		res.end(JSON.stringify(resObj.contentBody));
	}).listen(port);
};

module.exports = Exiler;