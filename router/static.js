var mimeLib = require("mime");
var fs = require("fs");
var errorHandler = require("../errorHandler");

var StaticModule = {};
var rootPath = process.cwd();
var localPath = rootPath + "/public";

StaticModule.parse = function (path) {
	var httpStatus = 200;
	var mime;
	var contentBody;
	var file;

	file = localPath + (path.match(/^\//) ? path : "/" + path);

	if (fs.existsSync(file)) {
		mime = mimeLib.lookup(file);
		contentBody = fs.readFileSync(file, "utf8");
	} else {
		return errorHandler.getNotFound();
	}

	return {
		mime: mime,
		httpStatus: httpStatus,
		contentBody: contentBody
	}
};

module.exports = StaticModule;