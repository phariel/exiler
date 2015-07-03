var url = require("url");
var dynamicModule = require("./dynamic");
var staticModule = require("./static");

var publicUrl = "/public";

var _route;

var Router = {};


Router.init = function (options) {
	options.templateFolder && dynamicModule.initTemplateFolder(options.templateFolder);
	options.publicFolder && staticModule.initPublicFolder(options.publicFolder);

	options.publicUrl && (publicUrl = options.publicUrl);
	!publicUrl.match(/^\//) && (publicUrl = "/" + publicUrl);

	_route = options.route;
};

Router.parse = function (urlStr) {
	var urlObj = url.parse(urlStr);
	var path = urlObj.pathname;
	var staticReg = new RegExp(publicUrl);
	var returnObj;

	if (path.match(staticReg)) {
		returnObj = staticModule.parse(path.replace(staticReg, ""));
	} else {
		returnObj = dynamicModule.parse(path, _route);
	}

	return returnObj;
};

module.exports = Router;