var ejs = require("ejs");
var fs = require("fs");
var errorHandler = require("../errorHandler");

var rootPath = process.cwd();
var ejsFolder = rootPath + "/template/";

var MIME_JSON = "application/json";
var MIME_HTML = "text/html";

var KEY_DATA = "ex_data";
var KEY_TEMPLATE = "ex_template";

var DynamicModule = {};

DynamicModule.parse = function (path, route) {
	path = path.toLowerCase();

	var loopObj = route;
	var httpStatus = 200;
	var contentBody;
	var mime = MIME_JSON;

	var urlArr = path.replace(/^\//, "").split("/");

	urlArr.every(function (v, i) {
		var hasValue = false;

		if (v.length === 0) {
			loopObj = loopObj["index"];
		} else {
			Object.keys(loopObj).forEach(function (keyname, j) {
				if (v === keyname.toLowerCase()) {
					loopObj = loopObj[keyname];
					hasValue = true;
				}
			});
			!hasValue && (loopObj = null);
		}

		if (!loopObj) {
			httpStatus = 404;
			return false;
		} else {
			return true;
		}
	});

	if (httpStatus === 404) {
		return errorHandler.getNotFound();
	}

	contentBody = loopObj[KEY_DATA];
	typeof contentBody === "function" && (contentBody = contentBody());
	!contentBody && (contentBody = {});

	var templateFile = loopObj[KEY_TEMPLATE];

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

