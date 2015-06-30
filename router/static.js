var mimeLib = require("mime");
var fs = require("fs");
var errorHandler = require("../errorHandler");
var cacheHandler = require("../cacheHandler");

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
		var cache = cacheHandler.getCache(path);
		if (cache) {
			contentBody = cache;
		} else {
			contentBody = fs.readFileSync(file, "utf8");
			cacheHandler.setCache(path, contentBody);
		}
	} else {
		var notFound = errorHandler.getNotFound();
		mime = notFound.mime;
		httpStatus = notFound.httpStatus;
		contentBody = notFound.contentBody;
	}

	var done = function (cb) {
		cb({
			mime: mime,
			httpStatus: httpStatus,
			contentBody: contentBody
		});
	};

	return {
		done: done
	};
};

module.exports = StaticModule;