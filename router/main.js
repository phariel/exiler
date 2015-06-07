var url = require("url");
var _config;
var _route;
var Router = {};

var MIME_JSON = "application/json",
    MIME_HTML="text/html";


Router.init = function (options) {
    options.route && (_route=options.route);
	_config = config;
};

Router.parse = function (urlStr) {
	var urlObj = url.parse(urlStr);
	var urlArr = urlObj.pathname.split("/");
	var httpStatus = 200;
	var loopObj = _config;
    var mime;
	var contentBody;

	urlArr.shift();

	console.log(urlArr);

	urlArr.forEach(function (v, i) {
		loopObj = loopObj[v];
		if (!loopObj) {
			httpStatus = 404;
		}
	});

	if(loopObj.file){
        if(loopObj.file.indexOf(".html")>-1){

        }
    }else{

    }

	contentBody = httpStatus === 404 ? "" : loopObj.data();

	return {
		httpStatus: httpStatus,
		contentBody: contentBody
	}
};

module.exports = Router;