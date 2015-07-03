var fs = require("fs");
var path = require("path");

var ErrorHandler = {};

var httpStatus = 200;

ErrorHandler.getNotFound = function () {
	httpStatus = 404;

	return {
		httpStatus: httpStatus,
		mime: "text/html",
		contentBody: fs.readFileSync(path.join(__dirname, "../template/404.html"), "utf8")
	};
};

ErrorHandler.isNormal = function () {
	return httpStatus === 200;
};

module.exports = ErrorHandler;