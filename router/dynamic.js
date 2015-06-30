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
	var callback;
	var contentData;
	var templateFile;

	var exec = function () {
		if (!callback || !contentData) {
			return;
		}

		if (httpStatus === 404) {
			callback(errorHandler.getNotFound());
		} else {
			if (templateFile) {
				if (templateFile.indexOf(".ejs") > -1) {
					var file = ejsFolder + templateFile;
					file = file.replace(/\\/g, "\/");

					if (fs.existsSync(file)) {
						var cache = cacheHandler.getCache(templateFile);
						var template;

						if (cache) {
							template = cache;
						} else {
							template = fs.readFileSync(file, "utf8");
							cacheHandler.setCache(templateFile, template);
						}

						contentData = ejs.render(template, contentData);
						mime = MIME_HTML;
					}
				}
			}

			typeof contentData === "object" && (contentData = JSON.stringify(contentData));

			callback({
				mime: mime,
				httpStatus: httpStatus,
				contentBody: contentData
			});
		}
	};

	var resolve = function (data) {
		contentData = data;
		exec();
	};

	var done = function (cb) {
		cb && (callback = cb);
		exec();
	};

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

	if (loopObj) {
		contentBody = loopObj[KEY_DATA];
		templateFile = loopObj[KEY_TEMPLATE];

		if (typeof contentBody === "function") {
			contentBody(resolve, params);
		} else if (typeof contentBody === "object") {
			contentData = contentBody;
		}
	} else {
		contentData = "none";
	}

	return {
		done: done
	};
};

module.exports = DynamicModule;

