var ejs = require("ejs");
var fs = require("fs");
var errorHandler = require("../errorHandler");
var cacheHandler = require("../cacheHandler");

var rootPath = process.cwd();
var ejsFolder = rootPath + "/template/";

var MIME_JSON = "application/json";
var MIME_HTML = "text/html";

var KEY_DATA = "ex_data";
var KEY_TEMPLATE = "ex_template";
var KEY_PARAM_REG = /^ex_param_/;

var DynamicModule = {};

DynamicModule.parse = function (path, route) {
	path = path.toLowerCase();

	var loopObj = route;
	var httpStatus = 200;
	var contentBody;
	var mime = MIME_JSON;
	var params = {};

	var urlArr = path.replace(/^\//, "").split("/");

	urlArr.every(function (v, i) {
		var hasValue = false;

		if (v.length === 0) {
			loopObj = loopObj["index"];
		} else {
			Object.keys(loopObj).every(function (keyname, j) {
				if (v === keyname.toLowerCase()) {
					loopObj = loopObj[keyname];
					hasValue = true;
					return false;
				}
				else if (keyname.match(KEY_PARAM_REG)) {
					params[keyname.replace(KEY_PARAM_REG, "")] = v;
					loopObj = loopObj[keyname];
					hasValue = true;
					return false;
				}
				return true;
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
	typeof contentBody === "function" && (contentBody = contentBody(params));
	!contentBody && (contentBody = {});

	var templateFile = loopObj[KEY_TEMPLATE];

	if (templateFile) {
		if (templateFile.indexOf(".ejs") > -1) {
			var file = ejsFolder + templateFile;
			file = file.replace(/\\/g, "\/");

			if (fs.existsSync(file)) {
				var cache = cacheHandler.getCache(path);
				var template;

				if (cache) {
					template = cache;
				} else {
					template = fs.readFileSync(file, "utf8");
					cacheHandler.setCache(path, template);
				}

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

