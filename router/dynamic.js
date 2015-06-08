var ejs = require("ejs");
var fs = require("fs");
var errorHandler = require("../errorHandler");

var rootPath = process.cwd();
var ejsFolder = rootPath + "/template/";

var MIME_JSON = "application/json";
var MIME_HTML = "text/html";

var DynamicModule = {};

DynamicModule.parse = function (path, route) {
	var loopObj = route;
	var httpStatus = 200;
	var contentBody;
	var mime = MIME_JSON;

	var urlArr = path.replace(/^\//, "").split("/");

	urlArr.forEach(function (v, i) {
		loopObj = v.length === 0 ? loopObj["index"] : loopObj[v];
		if (!loopObj) {
			httpStatus = 404;
		}
	});

	if (httpStatus === 404) {
		return errorHandler.getNotFound();
	}

	contentBody = (typeof loopObj.data === "function") ? loopObj.data() : loopObj.data;

	var templateFile = loopObj.template;

	if (templateFile) {
		if (templateFile.indexOf(".ejs") > -1) {
			var file = ejsFolder + templateFile;
			file = file.replace(/\\/g, "\/");

			if (fs.existsSync(file)) {
				var template = fs.readFileSync(file, "utf8");
				contentBody = ejs.render(template, contentBody);
				mime = MIME_HTML;
			}
		}
	}

	typeof contentBody === "object" && (contentBody = JSON.stringify(contentBody));

	return {
		mime: mime,
		httpStatus: httpStatus,
		contentBody: contentBody
	};
};

module.exports = DynamicModule;

