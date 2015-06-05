var url = require("url");
var _config;

var Router = {};


Router.init = function (config) {
	_config = config;
};

Router.parse = function (urlStr) {
	var urlObj = url.parse(urlStr);
	var urlArr = urlObj.pathname.split("/");
	var httpStatus = 200;
	var loopObj = _config;
	var contentBody;

	urlArr.shift();

	console.log(urlArr);

	urlArr.forEach(function (v, i) {
		loopObj = loopObj[v];
		if (!loopObj) {
			httpStatus = 404;
		}
	});

	contentBody = httpStatus === 404 ? "" : loopObj.ref();

	return {
		httpStatus: httpStatus,
		contentBody: contentBody
	}
};

module.exports = Router;