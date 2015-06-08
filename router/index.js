var url = require("url");
var dynamicModule = require("./dynamic");
var staticModule = require("./static");

var staticUrl = "/public";

var _route;

var Router = {};


Router.init = function (options) {
	_route = options.route;
	options.staticUrl && (staticUrl = options.staticUrl);
	!staticUrl.match(/^\//) && (staticUrl = "/" + staticUrl);
};

Router.parse = function (urlStr) {
	var urlObj = url.parse(urlStr);
	var path = urlObj.pathname;
	var staticReg = new RegExp(staticUrl);
	var returnObj;

	if (path.match(staticReg)) {
		returnObj = staticModule.parse(path.replace(staticReg, ""));
	} else {
		returnObj = dynamicModule.parse(path, _route);
	}

	return returnObj;
};

module.exports = Router;